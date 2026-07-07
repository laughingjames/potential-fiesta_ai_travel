import { readJsonBody, writeJson } from "./http.js";
import { readMcpServerConfig } from "./mcpClient.js";
import { getMemoryCache, setMemoryCache } from "./memoryCache.js";
import { Readable } from "node:stream";

const travelImageMemoryCache = new Map();
const travelImageBlobCache = new Map();
let amapPhotoQueue = Promise.resolve();
let nextAmapPhotoRequestAt = 0;
const CACHE_TTL = {
  travelImage: 1000 * 60 * 60 * 24,
  travelImageBlob: 1000 * 60 * 60 * 24
};

export async function handleTravelImagesResolve(req, res) {
  let payload;
  try {
    payload = await readJsonBody(req);
  } catch {
    writeJson(res, 400, { error: "请求体不是有效 JSON。" });
    return;
  }

  const items = Array.isArray(payload?.items) ? payload.items.slice(0, 80) : [];
  if (!items.length) {
    writeJson(res, 200, { images: {} });
    return;
  }

  const amapKey = await getAmapWebServiceKey();
  const unsplashKey = process.env.UNSPLASH_ACCESS_KEY || "";
  const images = {};

  await mapWithConcurrency(items, 8, async (item) => {
    const key = stringOrUndefined(item?.key);
    const query = stringOrUndefined(item?.query);
    const city = stringOrUndefined(item?.city);
    const kind = normalizeTravelImageKind(item?.kind, query);
    if (!key || !query || images[key]) return;

    const international = Boolean(item?.international) || isAmapUnsupportedTripText(`${city || ""} ${query}`);
    const cacheKey = createTravelImageCacheKey(query, city, international, kind);
    const cached = getMemoryCache(travelImageMemoryCache, cacheKey);
    if (cached) {
      if (cached.url) images[key] = cached;
      return;
    }
    const result = await withTimeout(
      resolveTravelImage({ amapKey, unsplashKey, query, city, international, kind }),
      8_000,
      null
    ).catch(() => null);
    if (result) {
      const normalized = normalizeTravelImageResult(result);
      setMemoryCache(travelImageMemoryCache, cacheKey, normalized, CACHE_TTL.travelImage, 240);
      images[key] = normalized;
    } else {
      setMemoryCache(travelImageMemoryCache, cacheKey, { missing: true }, 1000 * 60 * 30, 240);
    }
  });

  writeJson(res, 200, { images });
}

export function handleTravelImageFallback(req, res, { host = "127.0.0.1" } = {}) {
  const theme = sanitizeTravelFallbackTheme(
    new URL(req.url || "/", `http://${host}`).searchParams.get("theme") || ""
  );
  res.writeHead(200, {
    "Content-Type": "image/svg+xml; charset=utf-8",
    "Cache-Control": "public, max-age=86400"
  });
  res.end(renderTravelFallbackSvg(theme));
}

export async function handleTravelImageProxy(req, res, { host = "127.0.0.1" } = {}) {
  let target;
  let targetUrl;
  try {
    target = new URL(req.url || "", `http://${host}`).searchParams.get("url") || "";
    targetUrl = new URL(target);
    if (!/^https?:$/.test(targetUrl.protocol)) throw new Error("unsupported");
  } catch {
    writeJson(res, 400, { error: "图片地址无效。" });
    return;
  }

  const cacheKey = target;
  const cached = getMemoryCache(travelImageBlobCache, cacheKey);
  if (cached?.body) {
    res.writeHead(200, {
      "Content-Type": cached.contentType || "image/jpeg",
      "Cache-Control": "public, max-age=86400"
    });
    res.end(cached.body);
    return;
  }

  try {
    const response = await fetchWithTimeout(target, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/537.36 Chrome Safari",
        "Referer": /alicdn|tbcdn|fliggy/i.test(targetUrl.hostname)
          ? "https://www.fliggy.com/"
          : "https://www.amap.com/"
      }
    }, 8_000);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const contentType = response.headers.get("content-type") || "image/jpeg";
    if (!contentType.startsWith("image/")) throw new Error("not image");
    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400"
    });
    const chunks = [];
    let byteLength = 0;
    const stream = Readable.fromWeb(response.body);
    stream.on("data", (chunk) => {
      byteLength += chunk.length;
      if (byteLength <= 5_000_000) chunks.push(chunk);
    });
    stream.on("end", () => {
      if (byteLength <= 5_000_000) {
        const body = Buffer.concat(chunks);
        setMemoryCache(travelImageBlobCache, cacheKey, { body, contentType }, CACHE_TTL.travelImageBlob, 240);
      }
    });
    stream.pipe(res);
  } catch {
    if (res.headersSent) {
      res.end();
      return;
    }
    res.writeHead(502, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("image unavailable");
  }
}

async function resolveTravelImage({ amapKey, unsplashKey, query, city, international, kind }) {
  if (!international && amapKey) {
    const amapResult = await fetchAmapPlacePhoto(amapKey, query, city, kind);
    if (amapResult) return amapResult;
  }

  const fallbackQuery = buildTravelImageQuery(query, city, true);
  const fallbackResults = await Promise.allSettled([
    unsplashKey ? fetchUnsplashPhoto(unsplashKey, fallbackQuery) : Promise.resolve(null),
    fetchWikimediaPhoto(fallbackQuery)
  ]);
  const unsplashResult = fallbackResults[0].status === "fulfilled" ? fallbackResults[0].value : null;
  const wikimediaResult = fallbackResults[1].status === "fulfilled" ? fallbackResults[1].value : null;
  return unsplashResult || wikimediaResult;
}

async function getAmapWebServiceKey() {
  const serverConfig = await readMcpServerConfig("amap-maps-streamableHTTP");
  return process.env.AMAP_WEB_SERVICE_KEY
    || process.env.AMAP_JS_API_KEY
    || extractAmapKeyFromUrl(serverConfig?.url);
}

function normalizeTravelImageResult(image) {
  if (!image?.url) return image;
  const rawUrl = String(image.url || "").replace(/^http:\/\//, "https://");
  return {
    ...image,
    rawUrl,
    url: `/api/travel-image-proxy?url=${encodeURIComponent(rawUrl)}`
  };
}

function sanitizeTravelFallbackTheme(value) {
  const theme = String(value || "").trim().toLowerCase();
  return TRAVEL_FALLBACK_THEMES[theme] ? theme : "coast";
}

const TRAVEL_FALLBACK_THEMES = {
  coast: {
    sky: "#d8ecff",
    glow: "#fff4b8",
    horizon: "#98d3ff",
    ground: "#1c72d8",
    accent: "#f9c15d",
    detail: "#f4f9ff"
  },
  harbor: {
    sky: "#d7ecff",
    glow: "#ffddb0",
    horizon: "#7dc9ff",
    ground: "#0b58ba",
    accent: "#ff9f43",
    detail: "#f7fbff"
  },
  mountain: {
    sky: "#e6f1ff",
    glow: "#ffe5b8",
    horizon: "#b3d2ff",
    ground: "#215ec4",
    accent: "#6f92da",
    detail: "#f7fbff"
  },
  desert: {
    sky: "#fff1d9",
    glow: "#ffd28a",
    horizon: "#ffd093",
    ground: "#d9772b",
    accent: "#ffb14d",
    detail: "#fff7eb"
  },
  rock: {
    sky: "#edf2ff",
    glow: "#ffd7a7",
    horizon: "#c6d6ff",
    ground: "#4f73d7",
    accent: "#d08b49",
    detail: "#f9fbff"
  },
  laneway: {
    sky: "#eef4ff",
    glow: "#ffd2b0",
    horizon: "#b1cbff",
    ground: "#163f8c",
    accent: "#f28f6b",
    detail: "#f8fbff"
  },
  road: {
    sky: "#e3f2ff",
    glow: "#ffe39d",
    horizon: "#88cbff",
    ground: "#0b67c8",
    accent: "#ffd86c",
    detail: "#f4faff"
  },
  penguin: {
    sky: "#ebf6ff",
    glow: "#fff6d2",
    horizon: "#cadbea",
    ground: "#173456",
    accent: "#9fc1dc",
    detail: "#ffffff"
  },
  reef: {
    sky: "#dbf6ff",
    glow: "#fff3b7",
    horizon: "#69dcf0",
    ground: "#0b6dc2",
    accent: "#ff9f7f",
    detail: "#effcff"
  },
  rainforest: {
    sky: "#e4f5ff",
    glow: "#fff0b3",
    horizon: "#9fd0b8",
    ground: "#0d54a8",
    accent: "#4ca46a",
    detail: "#f4fff7"
  }
};

function renderTravelFallbackSvg(theme) {
  const palette = TRAVEL_FALLBACK_THEMES[theme] || TRAVEL_FALLBACK_THEMES.coast;
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" role="img" aria-label="travel fallback">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${palette.sky}" />
      <stop offset="100%" stop-color="${palette.horizon}" />
    </linearGradient>
    <linearGradient id="ground" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${palette.accent}" />
      <stop offset="100%" stop-color="${palette.ground}" />
    </linearGradient>
    <linearGradient id="card" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="rgba(255,255,255,0.58)" />
      <stop offset="100%" stop-color="rgba(255,255,255,0.12)" />
    </linearGradient>
  </defs>
  <rect width="1200" height="720" fill="url(#sky)" />
  <circle cx="942" cy="146" r="72" fill="${palette.glow}" opacity="0.88" />
  <path d="M0 482C132 422 226 404 362 430C508 458 608 532 756 548C910 564 1040 486 1200 426V720H0Z" fill="${palette.detail}" opacity="0.44" />
  <path d="M0 544C156 454 278 430 410 450C540 468 650 554 786 578C930 602 1048 552 1200 470V720H0Z" fill="url(#ground)" />
  <path d="M140 478L290 300L430 478Z" fill="${palette.detail}" opacity="0.82" />
  <path d="M352 496L530 250L724 496Z" fill="${palette.detail}" opacity="0.56" />
  <path d="M640 508L796 332L942 508Z" fill="${palette.detail}" opacity="0.68" />
  <path d="M802 538C892 470 970 452 1082 462C1138 468 1178 482 1200 494V720H802Z" fill="${palette.ground}" opacity="0.34" />
  <rect x="92" y="88" width="240" height="92" rx="28" fill="rgba(6,23,53,0.14)" />
  <rect x="118" y="116" width="118" height="16" rx="8" fill="rgba(255,255,255,0.7)" />
  <rect x="118" y="144" width="166" height="12" rx="6" fill="rgba(255,255,255,0.48)" />
  <rect x="864" y="498" width="182" height="132" rx="22" fill="rgba(255,255,255,0.18)" />
  <rect x="886" y="522" width="62" height="62" rx="20" fill="rgba(255,255,255,0.24)" />
  <rect x="962" y="526" width="58" height="12" rx="6" fill="rgba(255,255,255,0.52)" />
  <rect x="962" y="548" width="44" height="10" rx="5" fill="rgba(255,255,255,0.38)" />
</svg>`.trim();
}

function buildTravelImageQuery(query, city, international = false) {
  const searchQueries = buildTravelImageSearchQueries(query, city);
  const cleanQuery = searchQueries[0] || cleanTravelImageSearchQuery(query);
  const cleanCity = cleanTravelImageSearchQuery(city);
  if (!cleanCity || cleanQuery.includes(cleanCity)) return `${cleanQuery} travel landmark photo`.trim();
  return international
    ? `${cleanQuery} ${cleanCity} travel landmark photo`.trim()
    : `${cleanCity} ${cleanQuery}`.trim();
}

async function fetchAmapPlacePhoto(key, query, city, kind = "poi") {
  const searchQueries = buildTravelImageSearchQueries(query, city).slice(0, kind === "cover" ? 3 : 2);
  const responses = await Promise.allSettled(searchQueries.map(async (keywords) => {
    const params = new URLSearchParams({
      key,
      keywords,
      offset: "20",
      page: "1",
      extensions: "all"
    });
    const normalizedCity = normalizeAmapPhotoSearchCity(city);
    if (normalizedCity) params.set("city", normalizedCity);
    const response = await scheduleAmapPhotoRequest(() =>
      fetchWithTimeout(`https://restapi.amap.com/v3/place/text?${params.toString()}`, {}, 3_500)
    );
    if (!response.ok) return [];
    const data = await response.json().catch(() => ({}));
    return Array.isArray(data.pois) ? data.pois : [];
  }));
  const pois = responses.flatMap((result) => result.status === "fulfilled" ? result.value : []);
  const scored = pois
    .map((poi) => {
      const photos = normalizeAmapPhotoList(poi.photos);
      const photoQualityScore = Math.max(0, ...photos.map((photo) => scoreAmapPhotoCandidate(photo, kind)));
      return {
        poi,
        photos,
        score: scoreAmapPhotoPoi(poi, query, city, kind) + photoQualityScore
      };
    })
    .filter((item) => item.score >= 8 && item.photos.length)
    .sort((a, b) => b.score - a.score);
  const match = scored[0];
  const photo = pickBestAmapPhoto(match?.photos, kind);
  return photo ? {
    url: photo.url,
    source: "amap",
    title: photo.title || match?.poi?.name || query,
    provider: "高德 POI"
  } : null;
}

function normalizeAmapPhotoList(photos) {
  if (!Array.isArray(photos)) return [];
  return photos
    .map((photo) => ({
      url: String(photo?.url || photo || "").replace(/^http:\/\//, "https://"),
      title: String(photo?.title || "").trim()
    }))
    .filter((photo) => photo.url);
}

function cleanTravelImageSearchQuery(value) {
  return String(value || "")
    .replace(/[·•|｜]/g, " ")
    .replace(/^(上午|中午|下午|傍晚|晚上|午餐|晚餐|早餐|入住|返回|返程|抵达|前往|到|回到|去往|赶往|住在|下榻)\s*[:：-]?\s*/g, "")
    .replace(/^(D\d+\s*[·.-]\s*)/i, "")
    .replace(/\d+\s*(?:日|天)游|深度攻略|旅行攻略|旅游攻略/g, "")
    .replace(/(?:或|\/|、)?\s*(?:自由活动|休整|待定|可选.*)$/g, "")
    .replace(/(?:酒店|民宿|客栈|旅馆|度假村|住宿区|住宿区域|酒店区|酒店片区|住处)$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function buildTravelImageSearchQueries(query, city) {
  const cleaned = cleanTravelImageSearchQuery(query);
  const cleanCity = cleanTravelImageSearchQuery(city);
  const queries = [];
  if (cleaned) queries.push(cleaned);
  getRegionalTravelImageQueries(cleaned, cleanCity).forEach((item) => queries.push(item));
  getCompoundTravelImageQueries(cleaned, cleanCity).forEach((item) => queries.push(item));
  if (cleanCity && cleaned && !cleaned.includes(cleanCity)) queries.push(`${cleanCity} ${cleaned}`);
  return [...new Set(queries.filter(Boolean))].slice(0, 8);
}

function getCompoundTravelImageQueries(query, city) {
  const value = String(query || "");
  const parts = value
    .split(/[、,，&＋+和与及或/]/)
    .map((item) => cleanTravelImageSearchQuery(item))
    .filter((item) => item && item.length >= 2);
  const cityPrefix = city ? `${city} ` : "";
  return parts.flatMap((part) => [
    part,
    `${cityPrefix}${part}`.trim()
  ]);
}

function getRegionalTravelImageQueries(query, city = "") {
  const cleaned = cleanTravelImageSearchQuery(query);
  const cityName = cleanTravelImageSearchQuery(city);
  const text = `${cityName} ${cleaned}`;
  const queries = [];

  if (/(千岛湖|杭州)/.test(text)) {
    if (/中心湖区/.test(cleaned)) queries.push("千岛湖中心湖区", "千岛湖中心湖区旅游码头");
    if (/东南湖区/.test(cleaned)) queries.push("千岛湖东南湖区", "千岛湖东南湖区旅游码头");
    if (/天屿/.test(cleaned)) queries.push("千岛湖天屿山", "千岛湖天屿山观景台");
    if (/梅峰/.test(cleaned)) queries.push("千岛湖梅峰岛");
    if (/环湖/.test(cleaned)) queries.push("千岛湖绿道", "千岛湖环湖骑行");
  }

  return queries.filter(Boolean);
}

function normalizeAmapPhotoSearchCity(city) {
  const normalized = String(city || "")
    .replace(/市$|区$|县$/g, "")
    .trim();
  const destinationCityAliases = {
    千岛湖: "杭州",
    崇礼: "张家口",
    九寨沟: "阿坝",
    长白山: "白山",
    香格里拉: "迪庆",
    莫干山: "湖州"
  };
  return destinationCityAliases[normalized] || normalized;
}

function scoreAmapPhotoPoi(poi, query, city, kind = "poi") {
  const name = normalizeSearchText(poi?.name);
  const address = normalizeSearchText(poi?.address);
  const type = normalizeSearchText(poi?.type);
  const cityName = normalizeSearchText(city);
  const cleanQuery = normalizeSearchText(cleanTravelImageSearchQuery(query));
  const semanticQuery = cityName && cleanQuery.startsWith(cityName)
    ? cleanQuery.slice(cityName.length) || cleanQuery
    : cleanQuery;
  const coreQuery = semanticQuery.replace(/(?:游览|游船|骑行|徒步|体验|打卡|探秘|深度游|一日游|半日游|观景|美食)$/g, "");
  const tokens = getPhotoQueryTokens(query, city);
  let score = 0;
  if (!name) return 0;
  if (isLowQualityAmapPoi(name, type)) return -100;
  if (cleanQuery && name === cleanQuery) score += 32;
  else if (coreQuery && name.includes(coreQuery)) score += 18;
  else if (coreQuery && coreQuery.includes(name) && name.length >= 3) score += 12;
  tokens.forEach((token) => {
    if (name.includes(token)) score += 7;
    if (address.includes(token)) score += 2;
    if (type.includes(token)) score += 1;
  });
  if (cityName && (address.includes(cityName) || normalizeSearchText(poi?.cityname).includes(cityName))) score += 3;
  if (kind === "hotel" && /酒店|宾馆|民宿|客栈|度假村/.test(type + name)) score += 12;
  if (kind === "food" && /餐饮|美食|餐厅|饭店|酒楼|小吃/.test(type + name)) score += 10;
  if (["poi", "cover", "experience"].includes(kind) && /景区|风景|公园|博物馆|码头|广场|街区|寺|庙|山|湖|岛|古镇|古村/.test(type + name)) score += 10;
  if (kind === "cover" && /风景名胜|旅游景点|国家级景点|景区|公园|岛屿|湖泊/.test(type + name)) score += 32;
  if (kind === "cover" && /交通设施服务|港口码头|人渡口|客运港|游客中心|咨询服务|售票处/.test(type + name)) score -= 24;
  return score;
}

function getPhotoQueryTokens(query, city = "") {
  const cityName = normalizeSearchText(city);
  return String(query || "")
    .split(/[、,，&＋+和与及/\s]+/)
    .map((value) => cleanTravelImageSearchQuery(value))
    .map(normalizeSearchText)
    .map((value) => {
      if (!cityName || value === cityName) return value;
      return value.startsWith(cityName) ? value.slice(cityName.length) : value;
    })
    .filter((item) => item && item.length >= 2);
}

function isLowQualityAmapPoi(name, type) {
  return /停车场|停车点|收费站|收费处|出入口|入口处|售票处|卫生间|厕所|便利店|充电站|公交站|内部道路|物业|管理处|办公区/.test(`${name}${type}`);
}

function pickBestAmapPhoto(photos, kind) {
  const ranked = (Array.isArray(photos) ? photos : [])
    .map((photo, index) => ({ photo, score: scoreAmapPhotoCandidate(photo, kind) - index * 0.2 }))
    .filter((item) => item.score > -30)
    .sort((a, b) => b.score - a.score);
  return ranked[0]?.photo || null;
}

function scoreAmapPhotoCandidate(photo, kind) {
  const title = normalizeSearchText(photo?.title);
  if (!title) return 0;
  if (/停车|收费|告示|公告|导览图|指示牌|路牌|入口|售票|招牌|菜单|二维码|卫生间|厕所/.test(title)) return -100;
  let score = 0;
  if (/全景|风景|景色|湖景|山景|航拍|夜景|外观|景区|园景/.test(title)) score += 12;
  if (kind === "hotel" && /客房|房间|大堂|外观|酒店/.test(title)) score += 8;
  if (kind === "food" && /菜品|环境|餐厅|美食/.test(title)) score += 8;
  return score;
}

function normalizeSearchText(value) {
  return String(value || "").toLowerCase().replace(/\s+/g, "");
}

async function fetchUnsplashPhoto(accessKey, query) {
  const params = new URLSearchParams({
    query,
    orientation: "landscape",
    per_page: "1",
    client_id: accessKey
  });
  const response = await fetchWithTimeout(`https://api.unsplash.com/search/photos?${params.toString()}`, {}, 4_000);
  if (!response.ok) return null;
  const data = await response.json().catch(() => ({}));
  const photo = data.results?.[0];
  if (!photo?.urls?.regular) return null;
  return {
    url: photo.urls.regular,
    source: "unsplash",
    title: photo.alt_description || query,
    provider: "Unsplash"
  };
}

async function fetchWikimediaPhoto(query) {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: query,
    gsrnamespace: "6",
    gsrlimit: "1",
    prop: "imageinfo",
    iiprop: "url",
    iiurlwidth: "1000",
    format: "json",
    origin: "*"
  });
  const response = await fetchWithTimeout(`https://commons.wikimedia.org/w/api.php?${params.toString()}`, {}, 4_000);
  if (!response.ok) return null;
  const data = await response.json().catch(() => ({}));
  const page = Object.values(data.query?.pages || {})[0];
  const info = page?.imageinfo?.[0];
  const url = info?.thumburl || info?.url;
  if (!url) return null;
  return {
    url,
    source: "wikimedia",
    title: page?.title || query,
    provider: "Wikimedia Commons"
  };
}

async function mapWithConcurrency(items, limit, mapper) {
  const results = [];
  let index = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (index < items.length) {
      const currentIndex = index;
      index += 1;
      results[currentIndex] = await mapper(items[currentIndex], currentIndex);
    }
  });
  await Promise.all(workers);
  return results;
}

function scheduleAmapPhotoRequest(task) {
  const scheduled = amapPhotoQueue.then(async () => {
    const waitMs = Math.max(0, nextAmapPhotoRequestAt - Date.now());
    if (waitMs) await new Promise((resolve) => setTimeout(resolve, waitMs));
    nextAmapPhotoRequestAt = Date.now() + 220;
    return task();
  });
  amapPhotoQueue = scheduled.catch(() => {});
  return scheduled;
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 5_000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function withTimeout(promise, timeoutMs, fallback) {
  let timer;
  try {
    return await Promise.race([
      promise,
      new Promise((resolve) => {
        timer = setTimeout(() => resolve(fallback), timeoutMs);
      })
    ]);
  } finally {
    clearTimeout(timer);
  }
}

function createTravelImageCacheKey(query, city, international, kind) {
  return ["v6", international ? "intl" : "cn", kind, cleanTravelImageSearchQuery(city), cleanTravelImageSearchQuery(query)]
    .filter(Boolean)
    .join("|")
    .toLowerCase();
}

function normalizeTravelImageKind(value, query = "") {
  const kind = String(value || "").trim().toLowerCase();
  if (["cover", "poi", "experience", "hotel", "food", "transport"].includes(kind)) return kind;
  const text = String(query || "");
  if (/酒店|宾馆|民宿|客栈|住宿|度假村/.test(text)) return "hotel";
  if (/早餐|午餐|晚餐|餐厅|饭店|酒楼|小吃|美食|鱼头|咖啡|茶馆/.test(text)) return "food";
  if (/高铁|火车|机场|车站|航班|交通|返程/.test(text)) return "transport";
  if (/体验|游船|骑行|徒步|演出|温泉/.test(text)) return "experience";
  return "poi";
}

function isAmapUnsupportedTripText(text) {
  return /欧洲|亚洲|非洲|美洲|大洋洲|日本|韩国|泰国|新加坡|马来西亚|印尼|越南|菲律宾|美国|英国|法国|德国|意大利|西班牙|瑞士|澳大利亚|新西兰|加拿大|俄罗斯|冰岛|挪威|芬兰|瑞典|丹麦|土耳其|埃及|摩洛哥|迪拜|阿联酋/.test(String(text || ""));
}

function extractAmapKeyFromUrl(url) {
  try {
    return new URL(url).searchParams.get("key") || "";
  } catch {
    return "";
  }
}

function stringOrUndefined(value) {
  if (value === undefined || value === null) return undefined;
  const text = String(value).trim();
  return text || undefined;
}
