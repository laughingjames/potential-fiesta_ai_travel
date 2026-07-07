import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { pathToFileURL } from "node:url";
import { readJsonBody, writeJson } from "./src/server/http.js";
import { callMcpTool, readMcpServerConfig } from "./src/server/mcpClient.js";
import * as imageService from "./src/server/imageService.js";
import { createApiRouter } from "./src/server/router.js";
import { getMemoryCache, setMemoryCache } from "./src/server/memoryCache.js";
import { handleFlyAiSearch } from "./src/server/flyaiService.js";

const preferredPort = Number(process.env.PORT || 5173);
const host = process.env.HOST || (process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1");
const root = process.cwd();

await loadLocalEnv();

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon"
};

const deepSeekApiUrl = process.env.DEEPSEEK_API_URL || "https://api.deepseek.com/chat/completions";
const deepSeekModel = process.env.DEEPSEEK_MODEL || "deepseek-chat";
const amapRouteQueryLimit = Math.max(1, Number(process.env.AMAP_ROUTE_QUERY_LIMIT || 24));
const amapGeoMemoryCache = new Map();
const amapPoiMemoryCache = new Map();
const CACHE_TTL = {
  amapGeo: 1000 * 60 * 60 * 12,
  amapPoi: 1000 * 60 * 60 * 12
};

const routeApiRequest = createApiRouter([
  { method: "POST", path: "/api/deepseek/chat", handler: handleDeepSeekChat },
  { method: "POST", path: "/api/rollinggo/hotels", handler: handleRollingGoHotelSearch },
  { method: "POST", path: "/api/flyai/search", handler: handleFlyAiSearch },
  { method: "POST", path: "/api/amap/routes", handler: handleAmapRoutes },
  { method: "POST", path: "/api/amap/geocode", handler: handleAmapGeocode },
  { method: "GET", path: "/api/amap/config", handler: handleAmapConfig },
  { method: "POST", path: "/api/travel-images/resolve", handler: imageService.handleTravelImagesResolve },
  { method: "GET", path: "/api/travel-image-fallback", handler: imageService.handleTravelImageFallback },
  {
    method: "GET",
    path: "/api/travel-image-proxy",
    handler: (req, res) => imageService.handleTravelImageProxy(req, res, { host })
  }
]);

async function loadLocalEnv() {
  const candidates = [".env.local", ".env"];
  for (const file of candidates) {
    try {
      const source = await readFile(join(root, file), "utf8");
      source
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("#") && line.includes("="))
        .forEach((line) => {
          const index = line.indexOf("=");
          const key = line.slice(0, index).trim();
          const value = line.slice(index + 1).trim().replace(/^["']|["']$/g, "");
          if (key && process.env[key] === undefined) process.env[key] = value;
        });
    } catch {
      // Local env files are optional.
    }
  }
}

function resolvePath(url) {
  const pathname = decodeURIComponent(new URL(url, `http://${host}`).pathname);
  const requested = pathname === "/" ? "/index.html" : pathname;
  const normalized = normalize(requested).replace(/^(\.\.[/\\])+/, "");
  return join(root, normalized);
}

export async function handleAppRequest(req, res) {
  try {
    if (await routeApiRequest(req, res)) return;

    const filePath = resolvePath(req.url || "/");
    const body = await readFile(filePath);
    res.writeHead(200, {
      "Content-Type": contentTypes[extname(filePath)] || "application/octet-stream",
      ...getCacheHeaders(filePath)
    });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
}

function createAppServer() {
  return createServer(handleAppRequest);
}

function getCacheHeaders(filePath) {
  const extension = extname(filePath);
  if ([".html", ".js", ".css"].includes(extension)) {
    return {
      "Cache-Control": "no-store, max-age=0"
    };
  }
  return {};
}

async function handleDeepSeekChat(req, res) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    writeJson(res, 503, {
      error: "DeepSeek API Key 未配置。请设置 DEEPSEEK_API_KEY 后重启项目。"
    });
    return;
  }

  let payload;
  try {
    payload = await readJsonBody(req);
  } catch {
    writeJson(res, 400, { error: "请求体不是有效 JSON。" });
    return;
  }

  const messages = buildDeepSeekMessages(payload);

  try {
    const response = await fetch(deepSeekApiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: deepSeekModel,
        messages,
        response_format: { type: "json_object" },
        temperature: 0.3,
        max_tokens: 8000
      })
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      writeJson(res, response.status, {
        error: data.error?.message || "DeepSeek 请求失败。"
      });
      return;
    }

    const content = data.choices?.[0]?.message?.content || "";
    const parsed = parseModelJson(content);
    const normalizedReply = normalizeModelReply(parsed.reply || content);

    writeJson(res, 200, {
      message: normalizedReply || "我暂时没有生成到有效回复。",
      updates: sanitizeUpdates(parsed.updates),
      insert: sanitizeInsert(parsed.insert),
      validation: sanitizeOrderValidation(parsed.validation)
    });
  } catch {
    writeJson(res, 502, { error: "无法连接 DeepSeek 服务，请检查网络或 API 配置。" });
  }
}

async function handleRollingGoHotelSearch(req, res) {
  let payload;
  try {
    payload = await readJsonBody(req);
  } catch {
    writeJson(res, 400, { error: "请求体不是有效 JSON。" });
    return;
  }

  const serverConfig = await readMcpServerConfig("RollingGo-Hotel");
  if (!serverConfig?.url || !serverConfig?.headers?.Authorization) {
    writeJson(res, 503, { error: "RollingGo Hotel MCP 未配置，请检查 .mcp.local.json。" });
    return;
  }

  const searchParams = buildHotelSearchParams(payload);

  try {
    const mcpResponse = await callMcpTool(serverConfig, "searchHotels", searchParams);
    const hotels = normalizeHotelResults(mcpResponse, searchParams);
    writeJson(res, 200, {
      context: {
        focusPlace: searchParams.place,
        placeType: searchParams.placeType,
        originQuery: searchParams.originQuery
      },
      hotels
    });
  } catch (error) {
    writeJson(res, 502, {
      error: error.message || "RollingGo Hotel MCP 查询失败。",
      context: {
        focusPlace: searchParams.place,
        placeType: searchParams.placeType,
        originQuery: searchParams.originQuery
      }
    });
  }
}

async function handleAmapGeocode(req, res) {
  let payload;
  try {
    payload = await readJsonBody(req);
  } catch {
    writeJson(res, 400, { error: "请求体不是有效 JSON。" });
    return;
  }

  const serverConfig = await readMcpServerConfig("amap-maps-streamableHTTP");
  if (!serverConfig?.url) {
    writeJson(res, 503, { error: "高德地图 MCP 未配置，请检查 .mcp.local.json。" });
    return;
  }

  const places = Array.isArray(payload?.places) ? payload.places.slice(0, 10) : [];
  const geoCache = new Map();
  const results = [];

  for (const place of places) {
    const name = stringOrUndefined(place?.name);
    if (!name) continue;
    const city = stringOrUndefined(place?.city || place?.region);
    const geo = await geocodeAmapPlace(serverConfig, geoCache, name, city, { quick: true });
    if (!geo?.location) continue;
    const [lng, lat] = String(geo.location).split(",").map(Number);
    if (!Number.isFinite(lng) || !Number.isFinite(lat)) continue;
    results.push({
      name,
      lng,
      lat,
      region: stringifyAmapField(geo.province) || stringifyAmapField(geo.city) || city || ""
    });
  }

  writeJson(res, 200, { places: results });
}

async function handleAmapRoutes(req, res) {
  let payload;
  try {
    payload = await readJsonBody(req);
  } catch {
    writeJson(res, 400, { error: "请求体不是有效 JSON。" });
    return;
  }

  const serverConfig = await readMcpServerConfig("amap-maps-streamableHTTP");
  if (!serverConfig?.url) {
    writeJson(res, 503, { error: "高德地图 MCP 未配置，请检查 .mcp.local.json。" });
    return;
  }

  const mapMode = payload?.mapMode === "full" ? "full" : "markers";
  const geoCache = new Map();
  const itineraryPoints = await buildAmapItineraryPoints(serverConfig, geoCache, payload);
  const allSegments = buildAmapSegmentsFromPoints(itineraryPoints, payload);
  const segments = mapMode === "full" ? allSegments.slice(0, amapRouteQueryLimit) : allSegments;
  if (segments.some((segment) => isAmapUnsupportedTripText(`${segment.city || ""} ${segment.from} ${segment.to}`))) {
    writeJson(res, 200, {
      routes: [],
      map: buildAmapCustomMap([], []),
      error: "当前行程包含海外目的地，高德 MCP 对海外 POI 解析不稳定，已停止自动查询以避免错误路线。"
    });
    return;
  }

  if (!segments.length || mapMode === "markers") {
    writeJson(res, 200, {
      provider: "高德 MCP",
      routes: [],
      map: buildAmapCustomMap(itineraryPoints, []),
      mapMode,
      error: itineraryPoints.length ? "" : "当前行程没有可用于地图路线查询的 A -> B 路段。"
    });
    return;
  }

  const routes = [];

  for (const segment of segments) {
    try {
      if (routes.some((route) => route.status === "rate_limited")) {
        routes.push({
          ...segment,
          status: "skipped",
          message: "已暂停后续路线查询，避免继续触发高德 MCP 限流。"
        });
        continue;
      }

      if (isUnsupportedAmapMode(segment.mode)) {
        routes.push({
          ...segment,
          status: "unsupported",
          message: "该路段更接近航班、轮渡或跨境移动，高德 MCP 暂不适合确认。"
        });
        continue;
      }

      const originSearchName = buildAmapItinerarySearchName({ title: segment.from }, { city: segment.city });
      const destinationSearchName = buildAmapItinerarySearchName({ title: segment.to }, { city: segment.city });
      const originGeo = segment.origin || await geocodeAmapPlace(serverConfig, geoCache, originSearchName || segment.from, segment.city);
      const destinationGeo = segment.destination || await geocodeAmapPlace(serverConfig, geoCache, destinationSearchName || segment.to, segment.city);
      if (!originGeo || !destinationGeo) {
        routes.push({
          ...segment,
          status: "unresolved",
          message: "高德 MCP 未能可靠解析该路段的起终点。"
        });
        continue;
      }

      const toolName = pickAmapDirectionTool(segment.mode);
      const args = {
        origin: originGeo.location,
        destination: destinationGeo.location
      };
      if (toolName === "maps_direction_transit_integrated") {
        args.city = segment.city || originGeo.city || originGeo.province || "";
        args.cityd = segment.cityd || segment.city || destinationGeo.city || destinationGeo.province || args.city;
      }

      const direction = await callAmapMcpTool(serverConfig, toolName, args);
      routes.push(normalizeAmapDirection(segment, originGeo, destinationGeo, direction, toolName));
    } catch (error) {
      routes.push({
        ...segment,
        status: isAmapRateLimitError(error) ? "rate_limited" : "error",
        message: isAmapRateLimitError(error)
          ? "高德 MCP 当前触发限流，请稍后重试或只查询关键路段。"
          : normalizeAmapErrorMessage(error)
      });
    }
  }

  writeJson(res, 200, {
    provider: "高德 MCP",
    routes,
    map: buildAmapCustomMap(itineraryPoints, routes)
  });
}

function normalizeSearchText(value) {
  return String(value || "")
    .replace(/[市区县省特别行政区\s·・,，。:：()（）-]/g, "")
    .trim();
}

function createAmapGeoCacheKey(place, city, quick) {
  return [
    quick ? "quick" : "full",
    normalizeSearchText(cleanRoutePointName(place)),
    normalizeSearchText(city)
  ].join("|");
}

async function handleAmapConfig(req, res) {
  const serverConfig = await readMcpServerConfig("amap-maps-streamableHTTP");
  const key = process.env.AMAP_JS_API_KEY || extractAmapKeyFromUrl(serverConfig?.url);
  if (!key) {
    writeJson(res, 503, {
      error: "高德 JS API Key 未配置。请设置 AMAP_JS_API_KEY，或在 .mcp.local.json 的高德 MCP URL 中提供 key。"
    });
    return;
  }

  writeJson(res, 200, {
    key,
    securityJsCode: process.env.AMAP_SECURITY_JS_CODE || "",
    version: "2.0"
  });
}

function extractAmapKeyFromUrl(url) {
  try {
    return new URL(url).searchParams.get("key") || "";
  } catch {
    return "";
  }
}

async function callAmapMcpTool(serverConfig, toolName, args) {
  await sleep(120);
  try {
    return await callMcpTool(serverConfig, toolName, args);
  } catch (error) {
    if (isAmapRateLimitError(error)) {
      const rateLimitError = new Error("高德 MCP 当前触发限流，请稍后重试或只查询关键路段。");
      rateLimitError.code = "AMAP_RATE_LIMIT";
      throw rateLimitError;
    }
    throw error;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isAmapRateLimitError(error) {
  return /CUQPS_HAS_EXCEEDED_THE_LIMIT|QPS|限流|频率/.test(error?.message || error?.code || "");
}

function normalizeAmapErrorMessage(error) {
  const message = error?.message || "高德 MCP 路线查询失败。";
  if (/ENGINE_RESPONSE_DATA_ERROR/.test(message)) return "高德 MCP 未返回有效路线数据，该路段暂无法确认。";
  return message.replace(/^API 调用失败：/, "高德 MCP 调用失败：");
}

function buildAmapSegmentsFromPoints(points, payload) {
  const days = Array.isArray(payload?.days) ? payload.days : [];
  const dayByNumber = new Map(days.map((day) => [Number(day.day) || 1, day]));
  const segments = [];
  for (const [day, dayPoints] of groupBy(points, (point) => Number(point.day) || 1).entries()) {
    const sorted = [...dayPoints].sort((a, b) => a.order - b.order);
    for (let index = 0; index < sorted.length - 1; index += 1) {
      const from = sorted[index];
      const to = sorted[index + 1];
      segments.push({
        day: Number(day),
        city: from.city || to.city || stringOrUndefined(dayByNumber.get(Number(day))?.city),
        from: from.name,
        to: to.name,
        origin: createAmapGeoFromPoint(from),
        destination: createAmapGeoFromPoint(to),
        mode: stringOrUndefined(dayByNumber.get(Number(day))?.transport) || "驾车"
      });
    }
  }
  return segments;
}

function createAmapGeoFromPoint(point) {
  return {
    name: point.name,
    location: `${point.lng},${point.lat}`,
    city: point.city || "",
    district: point.district || ""
  };
}

async function buildAmapItineraryPoints(serverConfig, geoCache, payload) {
  const days = Array.isArray(payload?.days) ? payload.days : [];
  const candidates = [];

  for (const day of days) {
    const mapItems = extractAmapItineraryPoiItems(day).slice(0, 10);
    mapItems.forEach((item) => candidates.push({ day, item }));
  }

  const assigned = new Map();
  candidates.forEach((candidate) => {
    const key = normalizeSearchText(candidate.item.title);
    const current = assigned.get(key);
    if (!current || getAmapPoiAssignmentPriority(candidate) > getAmapPoiAssignmentPriority(current)) {
      assigned.set(key, candidate);
    }
  });

  const dayOrders = new Map();
  const jobs = [...assigned.values()]
    .map((candidate) => reassignAmapPoiToSemanticDay(candidate, days))
    .sort((a, b) => (Number(a.day.day) - Number(b.day.day)) || (a.item.index - b.item.index) || (a.item.subIndex - b.item.subIndex))
    .map(({ day, item }) => {
      const dayNumber = Number(day.day) || 1;
      const mapOrder = (dayOrders.get(dayNumber) || 0) + 1;
      dayOrders.set(dayNumber, mapOrder);
      return { day, item: { ...item, mapOrder } };
    });

  const resolveCandidate = async ({ day, item }) => {
    try {
      const geo = await resolveAmapItineraryPoi(serverConfig, geoCache, item.title, day.city);
      const location = parseAmapLocation(geo?.location);
      if (!geo || !location) return null;
      return {
        id: `d${Number(day.day) || 0}-p${item.index}-${item.subIndex || 0}`,
        day: Number(day.day) || 1,
        city: stringOrUndefined(day.city) || "",
        cityId: stringOrUndefined(day.cityId) || "",
        order: item.mapOrder,
        time: item.time,
        name: item.title,
        detail: item.detail,
        lng: location.lng,
        lat: location.lat,
        district: geo.district || "",
        source: "高德 MCP"
      };
    } catch {
      return null;
    }
  };

  const results = await mapWithConcurrency(jobs, 6, resolveCandidate);
  const resolvedByName = new Map();
  results.filter(Boolean).forEach((point) => {
    const key = normalizeSearchText(point.name);
    const current = resolvedByName.get(key);
    if (!current) {
      resolvedByName.set(key, point);
      return;
    }
    const pointDay = days.find((day) => Number(day.day) === Number(point.day));
    const currentDay = days.find((day) => Number(day.day) === Number(current.day));
    if (getAmapPoiDaySemanticScore(pointDay, point.name) > getAmapPoiDaySemanticScore(currentDay, current.name)) {
      resolvedByName.set(key, point);
    }
  });
  const resolved = [...resolvedByName.values()];

  // Global semantic de-duplication keeps one POI from leaking into several days,
  // but it must never leave a day with no marker at all. If that happens, fall
  // back to the best concrete candidate originally extracted from that day.
  const coveredDays = new Set(resolved.map((point) => Number(point.day)));
  const usedNames = new Set(resolved.map((point) => normalizeSearchText(point.name)));
  for (const day of days) {
    const dayNumber = Number(day.day) || 1;
    if (coveredDays.has(dayNumber)) continue;

    const fallbacks = candidates
      .filter((candidate) => Number(candidate.day.day) === dayNumber)
      .sort((a, b) => getAmapPoiAssignmentPriority(b) - getAmapPoiAssignmentPriority(a));
    const preferred = fallbacks.find((candidate) => !usedNames.has(normalizeSearchText(candidate.item.title)))
      || fallbacks[0];
    if (!preferred) continue;

    const point = await resolveCandidate({
      day,
      item: { ...preferred.item, mapOrder: 1 }
    });
    if (!point) continue;
    resolved.push(point);
    coveredDays.add(dayNumber);
    usedNames.add(normalizeSearchText(point.name));
  }

  return resolved.sort((a, b) => (a.day - b.day) || (a.order - b.order));
}

function getAmapPoiAssignmentPriority({ day, item }) {
  let score = item.source === "schedule" ? 100 : 10;
  score += getAmapPoiDaySemanticScore(day, item.title);
  return score;
}

function reassignAmapPoiToSemanticDay(candidate, days) {
  let bestDay = candidate.day;
  let bestScore = getAmapPoiDaySemanticScore(bestDay, candidate.item.title);
  days.forEach((day) => {
    const score = getAmapPoiDaySemanticScore(day, candidate.item.title);
    if (score > bestScore) {
      bestDay = day;
      bestScore = score;
    }
  });
  return bestDay === candidate.day ? candidate : { ...candidate, day: bestDay };
}

function getAmapPoiDaySemanticScore(day, poiName) {
  const title = normalizeSearchText(day?.title);
  const summary = normalizeSearchText(day?.summary);
  const tokens = getAmapPoiAssignmentTokens(poiName);
  let score = 0;
  tokens.forEach((token) => {
    if (title.includes(token)) score = Math.max(score, 400 + token.length);
    if (summary.includes(token)) score = Math.max(score, 200 + token.length);
  });
  return score;
}

function getAmapPoiAssignmentTokens(value) {
  const raw = String(value || "").replace(/^千岛湖/, "");
  const parts = raw.split(/[、,，&＋+\/]|(?:与|及|或)/).map((item) => item.trim()).filter(Boolean);
  const tokens = parts.flatMap((part) => {
    const stem = part
      .replace(/(?:风景区|景区|旅游码头|游船码头|码头|游客中心|观景平台|观景台|附近|逛吃|逛街)$/g, "")
      .trim();
    return [part, stem];
  });
  return [...new Set(tokens.map(normalizeSearchText).filter((item) => item.length >= 2))];
}

function extractAmapItineraryPoiItems(day) {
  const schedule = Array.isArray(day?.schedule) ? day.schedule : [];
  const stops = Array.isArray(day?.stops) ? day.stops : [];
  const candidates = [];

  schedule.forEach((item, index) => {
    extractAmapPoiNames(item?.title, day?.city).forEach((title, subIndex) => {
      candidates.push({
        index,
        subIndex,
        source: "schedule",
        time: stringOrUndefined(item?.time) || "",
        title,
        detail: stringOrUndefined(item?.detail) || ""
      });
    });
  });

  stops.forEach((stop, stopIndex) => {
    extractAmapPoiNames(stop, day?.city).forEach((title, subIndex) => {
      candidates.push({
        index: schedule.length + stopIndex,
        subIndex,
        source: "stop",
        time: "",
        title,
        detail: "行程关键点"
      });
    });
  });

  const seen = new Set();
  const seenNames = [];
  return candidates.filter((item) => {
    const key = normalizeSearchText(item.title);
    if (!key || seen.has(key)) return false;
    const duplicate = seenNames.some((existingName) => areAmapPoiNamesEquivalent(existingName, item.title));
    if (duplicate) return false;
    seen.add(key);
    seenNames.push(item.title);
    return true;
  });
}

function areAmapPoiNamesEquivalent(left, right) {
  const normalize = (value) => String(value || "")
    .replace(/(?:风景区|景区|旅游码头|游船码头|游客中心|观景平台|观景台|环岛|步行街)$/g, "")
    .replace(/^(?:漫步|游览|参观|打卡)/, "")
    .trim();
  const a = normalize(left);
  const b = normalize(right);
  if (!a || !b) return false;
  return a === b || (Math.min(a.length, b.length) >= 3 && (a.includes(b) || b.includes(a)));
}

function extractAmapPoiNames(value, city = "") {
  const text = String(value || "")
    .replace(/[（(].*?[）)]/g, "")
    .replace(/^[\d]+[.、]\s*/, "")
    .replace(/^(上午|中午|下午|傍晚|晚上|午餐|晚餐|早餐)\s*[:：-]?\s*/, "")
    .trim();
  if (!text || isGenericRoutePoint(text)) return [];

  return splitAmapPoiText(text, city)
    .map((part) => normalizeAmapPoiName(part, city))
    .filter(Boolean);
}

function splitAmapPoiText(text, city) {
  return String(text || "")
    .split(/[、,，&＋+\/]|(?:与|及|或)/)
    .flatMap((part) => {
      const pieces = part.split("和").map((item) => item.trim()).filter(Boolean);
      if (pieces.length > 1 && pieces.every((item) => normalizeAmapPoiName(item, city))) return pieces;
      return [part];
    });
}

function extractNarrativeAmapPoiName(value) {
  const parts = String(value || "")
    .split(
      /(?:返回(?:到)?(?:市区|城区|主城区|市中心)?|回到(?:市区|城区|主城区|市中心)?|前往|出发前往|入住|住在|住进|下榻|浅住|夜宿|宿在|落脚|安顿|回酒店|回民宿|回住处|赶往|去往|转往|再去|再到|到达后|抵达后)/
    )
    .map((item) => item.trim())
    .filter(Boolean);
  return parts.at(-1) || String(value || "").trim();
}

function stripAmapPoiContext(value) {
  return String(value || "")
    .replace(/^(?:市区|城区|主城区|市中心|核心城区)\s*/, "")
    .replace(/(?:酒店|民宿|客栈|旅馆|度假村|住宿区|住宿区域|酒店区|酒店片区|住宿片区|住处|落脚点|一带|附近|周边)+$/g, "")
    .trim();
}

function normalizeAmapPoiName(value, city = "") {
  let name = cleanRoutePointName(value)
    .replace(/^(?:抵达|到达|前往|出发前往|返回|游览|参观|打卡|漫步)\s*/, "")
    .replace(/(?:深度游|半日游|一日游|环湖骑行|环湖|骑行|登顶|游船|乘船|夜景|拍照|漫步|参观|游览|打卡|休整)$/g, "")
    .trim();
  name = stripAmapPoiContext(extractNarrativeAmapPoiName(name));
  if (!name || isGenericRoutePoint(name)) return "";

  const context = `${city || ""} ${name}`;
  if (/喀什/.test(context)) {
    if (/开城仪式/.test(name)) name = "喀什古城东门";
    else if (/古城街巷|古城漫步|古城游览|古城内/.test(name)) name = "喀什古城";
  }
  if (/(千岛湖|淳安)/.test(context)) {
    if (/中心湖区/.test(name)) name = "千岛湖中心湖区旅游码头";
    else if (/东南湖区/.test(name)) name = "千岛湖东南湖区旅游码头";
    else if (/梅峰/.test(name)) name = "梅峰岛";
    else if (/天屿/.test(name)) name = "天屿山观景台";
  }

  const normalizedCity = normalizeSearchText(city);
  const normalizedName = normalizeSearchText(name);
  if (!normalizedName || normalizedName === normalizedCity) return "";
  if (/(环湖|自由活动|休息|用餐|餐饮|美食|酒店|住宿|返程|浅住|夜宿|住在|下榻|落脚|安顿)/.test(name)) return "";
  return isConcreteAmapPoiName(name) ? name : "";
}

function isConcreteAmapPoiName(name) {
  return /(景区|湖区|码头|游客中心|岛|山|峰|谷|沟|湾|海|滩|港|桥|塔|宫|庙|寺|馆|博物馆|美术馆|公园|广场|古镇|古城|街|巷|路|观景台|乐园|故居|书院|教堂|大楼|大厦|步行街|半岛|沙滩)$/.test(name)
    || /^(豫园|外滩|西湖|故宫|长城)$/.test(name)
    || (name.length >= 3 && !/(环湖|游船|骑行|漫步|体验|观景|购物|逛街|打卡|自由活动|美食|餐饮|酒店|住宿|返程|浅住|夜宿|住在|下榻|落脚|安顿)/.test(name));
}

function buildAmapItinerarySearchName(item, day) {
  const title = cleanRoutePointName(item?.title);
  if (!title) return "";

  const afterColon = title.split(/[：:]/).map((part) => part.trim()).filter(Boolean).at(-1) || title;
  const primaryPlace = afterColon
    .split(/(?:与|和|及|、|\/)/)
    .map((part) => part.trim())
    .find((part) => part.length >= 2 && !isGenericRoutePoint(part)) || afterColon;
  if (/^(?:淳安)?千岛湖(?:景区|风景区)?$/.test(primaryPlace)) {
    return "淳安千岛湖中心湖区旅游码头";
  }
  const city = stringOrUndefined(day?.city) || "";
  return city && !primaryPlace.includes(city) ? `${city}${primaryPlace}` : primaryPlace;
}

async function mapWithConcurrency(items, limit, mapper) {
  if (!items.length) return [];
  const results = new Array(items.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await mapper(items[index], index);
    }
  });
  await Promise.all(workers);
  return results;
}

function buildAmapCustomMap(points, routes) {
  const normalizedPoints = Array.isArray(points) ? points : [];
  const routePaths = buildAmapCustomRoutePaths(normalizedPoints, routes);
  const boundsPoints = [
    ...normalizedPoints,
    ...routePaths.flatMap((route) => route.path || [])
  ].filter((point) => Number.isFinite(Number(point.lng)) && Number.isFinite(Number(point.lat)));

  return {
    provider: "高德 MCP",
    renderMode: "custom",
    points: normalizedPoints,
    days: groupAmapPointsByDay(normalizedPoints, routePaths),
    segments: routePaths,
    bounds: createAmapBounds(boundsPoints)
  };
}

function buildAmapCustomRoutePaths(points, routes) {
  const routeByDayPair = new Map();
  (Array.isArray(routes) ? routes : []).forEach((route) => {
    if (!route?.day) return;
    routeByDayPair.set(`${route.day}|${route.from}|${route.to}`, route);
  });

  const byDay = groupBy(points, (point) => point.day);
  const segments = [];
  for (const [day, dayPoints] of byDay.entries()) {
    const sorted = [...dayPoints].sort((a, b) => a.order - b.order);
    for (let index = 0; index < sorted.length - 1; index += 1) {
      const from = sorted[index];
      const to = sorted[index + 1];
      const route = routeByDayPair.get(`${day}|${from.name}|${to.name}`);
      const path = Array.isArray(route?.path) && route.path.length
        ? route.path
        : [{ lng: from.lng, lat: from.lat }, { lng: to.lng, lat: to.lat }];
      segments.push({
        day: Number(day),
        from: from.name,
        to: to.name,
        status: route?.status || "custom",
        distanceText: route?.distanceText || "",
        durationText: route?.durationText || "",
        path
      });
    }
  }
  return segments;
}

function groupAmapPointsByDay(points, segments) {
  return [...groupBy(points, (point) => point.day).entries()]
    .map(([day, dayPoints]) => ({
      day: Number(day),
      points: [...dayPoints].sort((a, b) => a.order - b.order),
      segments: (segments || []).filter((segment) => Number(segment.day) === Number(day))
    }))
    .sort((a, b) => a.day - b.day);
}

function groupBy(items, getKey) {
  const map = new Map();
  items.forEach((item) => {
    const key = getKey(item);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(item);
  });
  return map;
}

function createAmapBounds(points) {
  if (!points.length) return null;
  const lngs = points.map((point) => Number(point.lng));
  const lats = points.map((point) => Number(point.lat));
  return {
    minLng: Math.min(...lngs),
    maxLng: Math.max(...lngs),
    minLat: Math.min(...lats),
    maxLat: Math.max(...lats)
  };
}

function cleanRoutePointName(value) {
  return String(value || "")
    .replace(/^\d+[.、]\s*/, "")
    .replace(/^(抵达|到达|前往|出发前往|返回|入住|游览|参观|打卡|安排|推荐|午餐[:：]?|晚餐[:：]?|早餐[:：]?)/, "")
    .replace(/[（(].*?[）)]/g, "")
    .replace(/(深度游|半日游|一日游|骑行|环湖|观景|拍照|漫步|休整|自由活动)$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isGenericRoutePoint(name) {
  return /^(自由活动|新的安排|酒店休息|返程|无|待定)$/.test(name)
    || /^(核心景点|代表景点|代表体验|核心体验|当地美食|特色美食|美食体验|市区酒店|交通便利区域|住宿落点|与安顿|安顿|核心街区探索|夜间散步)$/.test(name)
    || /(安顿|散步|街区探索|酒店周边|自由逛|简单逛逛|浅住|夜宿|住在|下榻|落脚)$/.test(name)
    || /(午餐|晚餐|早餐|小吃|咖啡|下午茶|鱼头|鱼宴|餐厅|饭店|酒楼|农家|土菜|美食街|夜市)$/.test(name)
    || /(当地美食|特色餐饮|街区漫步|自由探索|酒店办理|办理入住|休息调整|整理行李|品尝|用餐|鱼头|鱼宴|餐厅|饭店|酒楼|农家|土菜|美食街|夜市)/.test(name)
    || /(入住|酒店|民宿|旅馆|客栈|Hotel)$/i.test(name)
    || /^(.*?)(午餐|晚餐|早餐)$/.test(name);
}

function isAmapUnsupportedTripText(text) {
  return /(日本|东京|大阪|京都|北海道|冲绳|韩国|济州|首尔|釜山|泰国|曼谷|清迈|普吉|新加坡|澳洲|澳大利亚|悉尼|墨尔本|欧洲|美国|英国|法国|意大利)/.test(text || "");
}

function isUnsupportedAmapMode(mode) {
  return /(航班|飞机|轮渡|船|跨境|国际|城际航班)/.test(mode || "");
}

function pickAmapDirectionTool(mode) {
  const text = String(mode || "");
  if (/(步行|徒步|walking)/i.test(text)) return "maps_direction_walking";
  if (/(公交|地铁|公共交通|火车|高铁|transit)/i.test(text)) return "maps_direction_transit_integrated";
  if (/(骑行|自行车|bike|bicycle)/i.test(text)) return "maps_direction_bicycling";
  return "maps_direction_driving";
}

async function resolveAmapItineraryPoi(serverConfig, cache, place, city) {
  const poi = await searchAmapPoi(serverConfig, place, city);
  if (poi) return poi;
  return geocodeAmapPlace(serverConfig, cache, place, city, { quick: true });
}

async function searchAmapPoi(serverConfig, place, city) {
  const cacheKey = `${normalizeSearchText(city)}|${normalizeSearchText(place)}`;
  const cached = getMemoryCache(amapPoiMemoryCache, cacheKey);
  if (cached !== undefined) return cached;

  const key = process.env.AMAP_JS_API_KEY || extractAmapKeyFromUrl(serverConfig?.url);
  if (!key) return null;
  const params = new URLSearchParams({
    key,
    keywords: place,
    offset: "20",
    page: "1",
    extensions: "base"
  });
  const searchCity = normalizeAmapPoiSearchCity(city);
  if (searchCity) {
    params.set("city", searchCity);
    params.set("citylimit", "true");
  }

  let normalized = null;
  try {
    const response = await fetch(`https://restapi.amap.com/v3/place/text?${params.toString()}`);
    const data = await response.json().catch(() => ({}));
    const scored = (Array.isArray(data.pois) ? data.pois : [])
      .map((candidate) => ({ candidate, score: scoreAmapPoiCandidate(candidate, place, city) }))
      .filter((item) => item.score >= 50)
      .sort((a, b) => b.score - a.score);
    const candidate = scored[0]?.candidate;
    if (candidate?.location) {
      normalized = {
        name: candidate.name || place,
        query: place,
        location: candidate.location,
        country: "中国",
        province: stringifyAmapField(candidate.pname),
        city: stringifyAmapField(candidate.cityname),
        district: stringifyAmapField(candidate.adname),
        adcode: stringifyAmapField(candidate.adcode),
        level: "兴趣点"
      };
    }
  } catch {
    normalized = null;
  }

  setMemoryCache(amapPoiMemoryCache, cacheKey, normalized, CACHE_TTL.amapPoi);
  return normalized;
}

function normalizeAmapPoiSearchCity(city) {
  const value = String(city || "").trim();
  if (/(千岛湖|淳安)/.test(value)) return "淳安县";
  if (/(烟台|蓬莱|养马岛)/.test(value)) return "烟台";
  if (/(塔什库尔干|塔县|帕米尔)/.test(value)) return "塔什库尔干塔吉克自治县";
  if (/(川西|四姑娘山)/.test(value)) return "";
  return value.replace(/[市]$/, "");
}

function scoreAmapPoiCandidate(candidate, query, city) {
  const name = normalizeSearchText(candidate?.name);
  const target = normalizeSearchText(query);
  if (!name || !target || !candidate?.location) return -Infinity;

  let score = 0;
  if (name === target) score += 140;
  else if (name.includes(target) || target.includes(name)) score += 90;
  const queryTokens = String(query || "")
    .split(/[\s、,，&＋+\/]|(?:与|和|及)/)
    .map(normalizeSearchText)
    .filter((item) => item.length >= 2);
  queryTokens.forEach((token) => {
    if (name.includes(token)) score += 24;
  });

  const region = [candidate.pname, candidate.cityname, candidate.adname].flat().filter(Boolean).join("");
  const requestedCity = String(city || "").replace(/[市区县省特别行政区]/g, "").trim();
  if (requestedCity) {
    const compatible = getAmapRegionHints(requestedCity).some((hint) => region.includes(hint));
    score += compatible ? 35 : -120;
  }
  if (/(景区|风景|公园|博物馆|码头|广场|街区|寺|庙|山|湖|岛|观景台)/.test(`${candidate.type || ""}${candidate.name || ""}`)) score += 12;
  return score;
}

async function geocodeAmapPlace(serverConfig, cache, place, city, options = {}) {
  const key = `${city || ""}|${place}`;
  if (cache.has(key)) return cache.get(key);
  const sharedKey = createAmapGeoCacheKey(place, city, options.quick);
  const sharedCached = getMemoryCache(amapGeoMemoryCache, sharedKey);
  if (sharedCached !== undefined) {
    cache.set(key, sharedCached);
    return sharedCached;
  }

  let normalized = null;
  let fallback = null;
  let fallbackScore = -Infinity;
  const queries = getAmapPlaceQueries(place, city);
  const searchQueries = options.quick ? queries.slice(0, 2) : queries;
  for (const query of searchQueries) {
    const cityScopes = city && isStrongAmapPlaceQuery(query) && !options.quick ? [city, ""] : [city || ""];
    for (const cityScope of cityScopes) {
      let result;
      try {
        result = await callAmapMcpTool(serverConfig, "maps_geo", {
          address: query,
          city: cityScope || undefined
        });
      } catch (error) {
        if (isAmapRateLimitError(error)) await sleep(450);
        continue;
      }
      const parsed = parseMcpTextContent(result) || {};
      const candidate = selectBestAmapGeoCandidate(parsed.results, city, query);
      const score = scoreAmapGeoCandidate(candidate, city, query);
      if (candidate?.location && isAcceptableAmapGeoFallback(candidate, city, query) && score > fallbackScore) {
        fallback = normalizeAmapGeoCandidate(place, query, candidate);
        fallbackScore = score;
      }
      if (!isConfidentAmapGeoCandidate(candidate, city, query)) continue;
      normalized = normalizeAmapGeoCandidate(place, query, candidate);
      break;
    }
    if (normalized) break;
  }

  normalized = normalized || fallback;
  cache.set(key, normalized);
  setMemoryCache(amapGeoMemoryCache, sharedKey, normalized, CACHE_TTL.amapGeo);
  return normalized;
}

function selectBestAmapGeoCandidate(results, city, query) {
  const candidates = Array.isArray(results) ? results : [];
  let best = null;
  let bestScore = -Infinity;
  for (const candidate of candidates) {
    const score = scoreAmapGeoCandidate(candidate, city, query);
    if (score > bestScore) {
      best = candidate;
      bestScore = score;
    }
  }
  return bestScore > -Infinity ? best : null;
}

function scoreAmapGeoCandidate(candidate, city, query) {
  if (!candidate?.location) return -Infinity;
  if (!isAcceptableAmapGeoFallback(candidate, city, query)) return -Infinity;

  const normalizedCity = String(city || "").replace(/[市区县省特别行政区]/g, "").trim();
  const text = [candidate.province, candidate.city, candidate.district].flat().filter(Boolean).join("");
  let score = 0;
  if (isReliableAmapGeo(candidate, city)) score += 80;
  if (hasCompatibleAmapRegion(candidate, normalizedCity)) score += 100;
  if (isAdministrativeAmapLevel(candidate.level)) score -= 70;
  if (/兴趣点/.test(stringifyAmapField(candidate.level))) score += 25;
  if (/村庄|住宅区/.test(stringifyAmapField(candidate.level))) score -= 10;
  if (/(克孜勒苏|阿克陶|塔什库尔干|喀什)/.test(text) && /(白沙湖|卡拉库里|喀拉库勒|帕米尔|慕士塔格)/.test(query)) score += 80;
  if (/(阿勒泰|哈巴河|伊犁|尼勒克)/.test(text) && /(白沙湖|卡拉库里|喀拉库勒|帕米尔|慕士塔格)/.test(query)) score -= 140;
  return score;
}

function isAdministrativeAmapLevel(level) {
  return /^(国家|省|市|区县)$/.test(stringifyAmapField(level));
}

function isConfidentAmapGeoCandidate(candidate, requestedCity, query) {
  if (!candidate?.location || isAdministrativeAmapLevel(candidate.level)) return false;
  if (isReliableAmapGeo(candidate, requestedCity)) return true;
  const city = String(requestedCity || "").replace(/[市区县省特别行政区]/g, "").trim();
  return Boolean(city && isStrongAmapPlaceQuery(query) && hasCompatibleAmapRegion(candidate, city));
}

function isAcceptableAmapGeoFallback(candidate, requestedCity, query = "") {
  if (!candidate?.location) return false;
  if (isReliableAmapGeo(candidate, requestedCity)) return true;
  if (!String(requestedCity || "").trim()) return true;
  const city = String(requestedCity || "").replace(/[市区县省特别行政区]/g, "").trim();
  if (!city) return true;
  if (isStrongAmapPlaceQuery(query) && hasCompatibleAmapRegion(candidate, city)) return true;
  return false;
}

function isStrongAmapPlaceQuery(query) {
  const value = String(query || "").trim();
  if (isGenericRoutePoint(value)) return false;
  return value.length >= 3 && /(古城|清真寺|寺|湖|峰|山|谷|沟|湾|岛|桥|塔|宫|庙|馆|园|景区|公园|广场|口岸|村|镇|街|巷)/.test(value);
}

function hasCompatibleAmapRegion(candidate, normalizedRequestedCity) {
  const text = [
    candidate.country,
    candidate.province,
    candidate.city,
    candidate.district
  ].flat().filter(Boolean).join("");
  const regionHints = getAmapRegionHints(normalizedRequestedCity);
  return regionHints.some((hint) => text.includes(hint));
}

function getAmapRegionHints(city) {
  if (/喀什|塔什库尔干|塔县|帕米尔/.test(city)) return ["喀什", "克孜勒苏", "塔什库尔干", "阿克陶"];
  if (/杭州|千岛湖|淳安/.test(city)) return ["杭州", "淳安"];
  if (/烟台|蓬莱|养马岛/.test(city)) return ["烟台", "蓬莱", "牟平", "芝罘"];
  if (/青岛|崂山/.test(city)) return ["青岛", "崂山", "黄岛", "市南", "市北"];
  if (/成都|川西|康定|新都桥|四姑娘山/.test(city)) return ["四川", "成都", "阿坝", "甘孜"];
  if (/大理|丽江|云南/.test(city)) return ["云南", "大理", "丽江"];
  return [city];
}

function normalizeAmapGeoCandidate(place, query, candidate) {
  return {
    name: place,
    query,
    location: candidate.location,
    country: stringifyAmapField(candidate.country),
    province: stringifyAmapField(candidate.province),
    city: stringifyAmapField(candidate.city),
    district: stringifyAmapField(candidate.district),
    adcode: stringifyAmapField(candidate.adcode),
    level: stringifyAmapField(candidate.level)
  };
}

function getAmapPlaceQueries(place, city = "") {
  const original = String(place || "").trim();
  const simplified = original
    .replace(/[（(].*?[）)]/g, "")
    .replace(/(登顶|揽胜|俯瞰|漫步|骑行|游船|乘船|出发|返回|参观|游览|打卡|拍照|体验|休整|入住|到达).*/, "")
    .replace(/(景区|游客中心|码头|古镇|岛|湖区|草原|广场|寺|塔|山|湖).+$/, "$1")
    .trim();
  const dockQuery = buildAmapDockQuery(original, simplified, city);
  const activityQuery = buildAmapActivityPlaceQuery(original, simplified, city);
  const qiandaoLakeQuery = simplified
    && !/千岛湖/.test(simplified)
    && /(岛|湖|码头|黄山尖|梅峰)/.test(simplified)
    ? `千岛湖${simplified}`
    : "";
  const hangzhouQiandaoQuery = qiandaoLakeQuery ? `杭州${qiandaoLakeQuery}` : "";
  const chunAnQuery = simplified ? `淳安${simplified}` : "";
  const regionalQueries = getRegionalAmapPlaceQueries(simplified || original, city);
  const cityQualifiedQuery = city && simplified && !simplified.includes(city) ? `${city}${simplified}` : "";
  return [...new Set([dockQuery, activityQuery, ...regionalQueries, cityQualifiedQuery, qiandaoLakeQuery, hangzhouQiandaoQuery, chunAnQuery, original, simplified].filter((item) => item && item.length >= 2))];
}

function buildAmapDockQuery(original, simplified, city = "") {
  const text = `${city || ""} ${original || ""} ${simplified || ""}`;
  if (!/(千岛湖|淳安|中心湖区|东南湖区|梅峰|黄山尖)/.test(text)) return "";
  if (/中心湖区/.test(text)) return "千岛湖中心湖区码头";
  if (/东南湖区/.test(text)) return "千岛湖东南湖区码头";
  if (/梅峰/.test(text)) return "千岛湖梅峰岛码头";
  if (/黄山尖/.test(text)) return "千岛湖黄山尖码头";
  if (/(游船|乘船|码头)/.test(text)) return "千岛湖中心湖区旅游码头";
  return "";
}

function buildAmapActivityPlaceQuery(original, simplified, city = "") {
  const text = `${city || ""} ${original || ""} ${simplified || ""}`;
  if (!/(千岛湖|淳安)/.test(text)) return "";
  if (/(环湖|骑行|绿道)/.test(text)) return "千岛湖绿道";
  if (/天屿/.test(text)) return "千岛湖天屿山观景台";
  if (/中心湖区/.test(text)) return "千岛湖中心湖区旅游码头";
  if (/东南湖区/.test(text)) return "千岛湖东南湖区旅游码头";
  return "";
}

function getRegionalAmapPlaceQueries(place, city = "") {
  const value = String(place || "").trim();
  const cityText = String(city || "");
  if (!value) return [];
  if (/(喀什|塔什库尔干|塔县|帕米尔)/.test(cityText) || /(白沙湖|卡拉库里|慕士塔格|塔什库尔干|塔县|帕米尔)/.test(value)) {
    const queries = [];
    if (/白沙湖/.test(value)) queries.push("布伦口白沙湖", "克州白沙湖景区", "帕米尔白沙湖景区");
    if (/卡拉库里/.test(value)) queries.push("慕士塔格峰喀拉库勒湖", "喀拉库勒湖景区", "喀拉库勒湖", "慕士塔格卡拉库里湖", "塔什库尔干卡拉库里湖");
    queries.push(`喀什${value}`, `帕米尔${value}`, `新疆${value}`);
    return queries;
  }
  return [];
}

function isReliableAmapGeo(candidate, requestedCity) {
  if (!candidate?.location) return false;
  const city = String(requestedCity || "").replace(/[市区县省特别行政区]/g, "").trim();
  if (!city) return true;
  const candidateText = [
    candidate.country,
    candidate.province,
    candidate.city,
    candidate.district
  ].flat().filter(Boolean).join("");
  return candidateText.includes(city);
}

function stringifyAmapField(value) {
  if (Array.isArray(value)) return value.join("");
  if (value === undefined || value === null) return "";
  return String(value);
}

function normalizeAmapDirection(segment, originGeo, destinationGeo, result, toolName) {
  const parsed = parseMcpTextContent(result) || {};
  const route = parsed.route || {};
  const path = Array.isArray(route.paths) ? route.paths[0] : null;
  const transit = Array.isArray(route.transits) ? route.transits[0] : null;
  const detail = path || transit || {};
  const distance = Number(detail.distance || route.distance || 0);
  const duration = Number(detail.duration || route.duration || 0);
  const steps = Array.isArray(detail.steps)
    ? detail.steps.map((step) => step.instruction || step.road).filter(Boolean).slice(0, 4)
    : Array.isArray(detail.segments)
      ? detail.segments.map((item) => item.instruction || item.walking?.instruction || item.bus?.buslines?.[0]?.name).filter(Boolean).slice(0, 4)
      : [];
  const routePathPoints = extractAmapPathPoints(detail);

  return {
    ...segment,
    status: "ok",
    provider: "高德 MCP",
    tool: toolName,
    origin: originGeo,
    destination: destinationGeo,
    distanceMeters: distance || undefined,
    durationSeconds: duration || undefined,
    distanceText: formatMeters(distance),
    durationText: formatSeconds(duration),
    path: routePathPoints,
    steps
  };
}

function extractAmapPathPoints(detail) {
  const rawPolylines = [];
  if (Array.isArray(detail?.steps)) {
    detail.steps.forEach((step) => {
      if (step?.polyline) rawPolylines.push(step.polyline);
    });
  }
  if (Array.isArray(detail?.segments)) {
    detail.segments.forEach((segment) => {
      if (segment?.walking?.steps) {
        segment.walking.steps.forEach((step) => {
          if (step?.polyline) rawPolylines.push(step.polyline);
        });
      }
      if (Array.isArray(segment?.bus?.buslines)) {
        segment.bus.buslines.forEach((line) => {
          if (line?.polyline) rawPolylines.push(line.polyline);
        });
      }
    });
  }

  return rawPolylines
    .flatMap((polyline) => String(polyline).split(";"))
    .map(parseAmapLocation)
    .filter(Boolean);
}

function buildAmapMcpMap(routes) {
  const points = [];
  const pathPoints = [];
  const segments = [];
  const seen = new Set();

  for (const route of routes) {
    const origin = createAmapMapPoint(route.origin, route.from, "origin");
    const destination = createAmapMapPoint(route.destination, route.to, "destination");

    for (const point of [origin, destination]) {
      if (!point) continue;
      const key = `${point.lng},${point.lat},${point.name}`;
      if (!seen.has(key)) {
        points.push(point);
        seen.add(key);
      }
    }

    if (origin && destination) {
      const path = Array.isArray(route.path) && route.path.length
        ? route.path.map((point) => ({ lng: point.lng, lat: point.lat }))
        : [origin, destination];
      pathPoints.push(...path);
      segments.push({
        day: route.day,
        from: route.from,
        to: route.to,
        status: route.status,
        distanceText: route.distanceText,
        durationText: route.durationText,
        origin,
        destination,
        path
      });
    }
  }

  const boundsPoints = [...points, ...pathPoints];
  if (!boundsPoints.length) {
    return {
      provider: "高德 MCP",
      points: [],
      segments: [],
      bounds: null
    };
  }

  const lngs = boundsPoints.map((point) => point.lng);
  const lats = boundsPoints.map((point) => point.lat);
  return {
    provider: "高德 MCP",
    points,
    segments,
    bounds: {
      minLng: Math.min(...lngs),
      maxLng: Math.max(...lngs),
      minLat: Math.min(...lats),
      maxLat: Math.max(...lats)
    }
  };
}

function createAmapMapPoint(geo, fallbackName, role) {
  const location = parseAmapLocation(geo?.location);
  if (!location) return null;
  return {
    id: `${role}-${fallbackName || geo?.name || location.lng}-${location.lat}`,
    name: geo?.name || fallbackName || "高德点位",
    role,
    lng: location.lng,
    lat: location.lat,
    city: geo?.city || geo?.province || "",
    district: geo?.district || ""
  };
}

function parseAmapLocation(location) {
  const [lng, lat] = String(location || "")
    .split(",")
    .map((value) => Number(value.trim()));
  if (!Number.isFinite(lng) || !Number.isFinite(lat)) return null;
  return { lng, lat };
}

function formatMeters(value) {
  const meters = Number(value);
  if (!Number.isFinite(meters) || meters <= 0) return "待确认";
  if (meters < 1000) return `${Math.round(meters)} 米`;
  return `${(meters / 1000).toFixed(1)} 公里`;
}

function formatSeconds(value) {
  const seconds = Number(value);
  if (!Number.isFinite(seconds) || seconds <= 0) return "待确认";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} 分钟`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours} 小时 ${rest} 分钟` : `${hours} 小时`;
}

function buildHotelSearchParams(payload) {
  const context = payload?.context || {};
  const city = payload?.city || context.route?.[0] || {};
  const cityName = String(city.city || payload?.cityName || "目的地").trim();
  const days = Array.isArray(context.days) ? context.days : [];
  const cityDays = days.filter((day) => !city.id || day.cityId === city.id || day.city === cityName);
  const relevantDays = cityDays.length ? cityDays : days;
  const focusPlace = pickHotelFocusPlace(city, relevantDays, cityName);
  const routeSummary = Array.isArray(context.route)
    ? context.route.map((item) => `${item.city || "目的地"}${item.days ? `${item.days}天` : ""}`).join("，")
    : cityName;
  const daySummary = relevantDays
    .slice(0, 4)
    .map((day) => {
      const stops = Array.isArray(day.stops) ? day.stops.join("、") : "";
      const tail = getDayEndpoint(day);
      return `D${day.day || "?"} ${day.city || cityName}：${day.title || stops || "自由活动"}${tail ? `，终点${tail}` : ""}`;
    })
    .filter(Boolean)
    .join("；");
  const originQuery = [
    "旅行预订助手正在基于当前路书定向查询酒店。",
    `路线：${routeSummary || cityName}`,
    daySummary ? `日程：${daySummary}` : "",
    `重点位置：${focusPlace.name}`,
    `住宿诉求：靠近当前行程动线、减少折返、真实可订，优先高评分、交通方便${prefersSea(relevantDays, city) ? "、海景或近海岸" : ""}${prefersAirportTransfer(relevantDays) ? "、接送机便利" : ""}。`
  ].filter(Boolean).join("\n");

  return {
    originQuery,
    place: focusPlace.name,
    placeType: focusPlace.type,
    countryCode: inferCountryCode(`${cityName} ${originQuery}`),
    checkInParam: {
      adultCount: Number(payload?.adultCount) || 2,
      stayNights: Math.max(1, Number(city.days) || relevantDays.length || 1)
    },
    filterOptions: {
      distanceInMeter: focusPlace.type === "城市" ? 12000 : 5000,
      starRatings: [3.5, 5]
    },
    hotelTags: {
      preferredTags: buildPreferredHotelTags(relevantDays, city),
      maxPricePerNight: Number(payload?.maxPricePerNight) || 1500
    },
    size: 8
  };
}

function pickHotelFocusPlace(city, days, cityName) {
  const candidates = [];
  const endpoints = [];
  days.forEach((day) => {
    (Array.isArray(day.stops) ? day.stops : []).forEach((stop) => candidates.push(String(stop)));
    const endpoint = getDayEndpoint(day);
    if (endpoint) {
      endpoints.push(endpoint);
      candidates.push(endpoint);
    }
    (Array.isArray(day.schedule) ? day.schedule : []).forEach((item) => {
      if (item?.title) candidates.push(String(item.title));
    });
  });
  (Array.isArray(city.stops) ? city.stops : []).forEach((stop) => candidates.push(String(stop)));

  const exactIntent = candidates.find((item) => /(涉地可支|莲洞商圈|海岸|海滩|机场|火车站|商圈|街区)/.test(item));
  const stayEndpoint = endpoints.find((item) => item && item.length <= 18);
  const scenic = candidates.find((item) => /(湖|山|峰|岛|景区|美术馆|博物馆)/.test(item));
  const fallback = candidates.find((item) => item && item.length <= 18);
  const name = (exactIntent || stayEndpoint || scenic || fallback || cityName || "目的地").replace(/^到\s*/, "").trim();
  return {
    name,
    type: name === cityName ? "城市" : inferPlaceType(name)
  };
}

function getDayEndpoint(day) {
  if (day?.stay) return String(day.stay).trim();
  const schedule = Array.isArray(day?.schedule) ? day.schedule : [];
  const last = [...schedule].reverse().find((item) => item?.title || item?.detail);
  if (!last) return "";
  const title = String(last.title || "").replace(/^入住\s*/, "").trim();
  const detail = String(last.detail || "").trim();
  const match = detail.match(/(?:到|至|终点|入住)\s*([\u4e00-\u9fa5A-Za-z0-9 ·\-()（）]{2,24})/);
  return title || match?.[1] || "";
}

function inferPlaceType(place) {
  if (/(机场|Airport|航站楼)/i.test(place)) return "机场";
  if (/(站|火车|高铁|地铁)/.test(place)) return "火车站";
  if (/(酒店|Hotel|民宿|Resort|Pension)/i.test(place)) return "酒店";
  if (/(商圈|区|县|街区)/.test(place)) return "区/县";
  return "景点";
}

function inferCountryCode(text) {
  if (/(济州|首尔|釜山|韩国|涉地可支|莲洞)/.test(text)) return "KR";
  if (/(日本|东京|大阪|京都|北海道|冲绳)/.test(text)) return "JP";
  if (/(澳洲|澳大利亚|悉尼|墨尔本|布里斯班)/.test(text)) return "AU";
  if (/(泰国|曼谷|清迈|普吉)/.test(text)) return "TH";
  if (/(新加坡)/.test(text)) return "SG";
  if (/(中国|上海|北京|广州|深圳|成都|杭州)/.test(text)) return "CN";
  return undefined;
}

function buildPreferredHotelTags(days, city) {
  const text = `${city?.city || ""} ${JSON.stringify(days)}`;
  const tags = ["高评分", "近景点", "交通方便"];
  if (/(海|海岸|海滩|岛|涉地可支|济州)/.test(text)) tags.push("海景");
  if (/(机场|航班|抵达|离境|接送)/.test(text)) tags.push("接送机");
  if (/(亲子|儿童|家庭)/.test(text)) tags.push("亲子");
  if (/(商圈|购物|夜市|餐厅|美食)/.test(text)) tags.push("商圈");
  return [...new Set(tags)];
}

function prefersSea(days, city) {
  return /(海|海岸|海滩|岛|涉地可支|济州)/.test(`${city?.city || ""} ${JSON.stringify(days)}`);
}

function prefersAirportTransfer(days) {
  return /(机场|航班|抵达|离境|接送)/.test(JSON.stringify(days));
}

function normalizeHotelResults(result, searchParams) {
  const structured = result?.structuredContent || parseMcpTextContent(result) || {};
  const list = Array.isArray(structured.hotelInformationList)
    ? structured.hotelInformationList
    : findHotelArray(structured);

  return list.slice(0, 8).map((hotel, index) => {
    const distanceTag = formatDistanceTag(searchParams.place, hotel.distanceInMeters);
    const score = Number(hotel.score || hotel.rating || hotel.starRating);
    const price = hotel.price?.hasPrice
      ? `${hotel.price.currency === "CNY" ? "¥" : hotel.price.currency} ${Math.round(hotel.price.lowestPrice)} 起 / 晚`
      : "实时查价";
    const tags = [
      distanceTag,
      hotel.starRating ? `${hotel.starRating} 星/钻` : "",
      score ? `评分 ${score}` : "",
      ...(Array.isArray(hotel.hotelAmenities) ? hotel.hotelAmenities.slice(0, 2) : []),
      ...(Array.isArray(hotel.tags) ? hotel.tags.slice(0, 2) : [])
    ].filter(Boolean).slice(0, 5);
    return {
      id: String(hotel.hotelId || hotel.id || hotel.name || `mcp-${index}`),
      badge: index === 0 ? "行程强相关" : index === 1 ? "动线备选" : "真实可订",
      name: String(hotel.name || hotel.hotelName || "酒店方案"),
      tags,
      highlight: buildHotelHighlight(hotel, searchParams),
      price,
      source: "RollingGo MCP",
      imageUrl: hotel.imageUrl || "",
      bookingUrl: hotel.bookingUrl || "",
      raw: {
        hotelId: hotel.hotelId,
        address: hotel.address,
        latitude: hotel.latitude,
        longitude: hotel.longitude
      }
    };
  });
}

function parseMcpTextContent(result) {
  const content = Array.isArray(result?.content) ? result.content : [];
  for (const item of content) {
    const parsed = parseJsonOrNull(item?.text);
    if (parsed) return parsed;
  }
  return null;
}

function findHotelArray(value) {
  if (Array.isArray(value)) {
    if (value.some((item) => item && typeof item === "object" && (item.hotelId || item.name || item.hotelName))) return value;
    return [];
  }
  if (!value || typeof value !== "object") return [];
  for (const item of Object.values(value)) {
    const result = findHotelArray(item);
    if (result.length) return result;
  }
  return [];
}

function buildHotelHighlight(hotel, searchParams) {
  const parts = [];
  if (hotel.address) parts.push(`地址：${stripHtml(hotel.address)}`);
  if (hotel.distanceInMeters) parts.push(`距离${searchParams.place}约 ${formatDistance(hotel.distanceInMeters)}`);
  if (hotel.price?.hasPrice) parts.push(`最低价约 ${Math.round(hotel.price.lowestPrice)} ${hotel.price.currency}`);
  if (Array.isArray(hotel.hotelAmenities) && hotel.hotelAmenities.length) parts.push(`设施：${hotel.hotelAmenities.slice(0, 3).join("、")}`);
  return parts.join("。") || "已按当前行程动线定向匹配，可加入路书后继续调整入住时间。";
}

function formatDistanceTag(place, distance) {
  if (!Number(distance)) return `靠近【${place}】`;
  return `距离【${place}】约 ${formatDistance(distance)}`;
}

function formatDistance(distance) {
  const meters = Number(distance);
  if (!Number.isFinite(meters)) return "";
  if (meters < 1000) return `${Math.round(meters)} 米`;
  return `${(meters / 1000).toFixed(1)} 公里`;
}

function isValidInspirationDestinationName(name) {
  const value = String(name || "").trim();
  if (!value || value.length < 2 || value.length > 10) return false;
  const blocked = /(?:哪|怎|什么|为何|如何|打算|想去|告诉我|请问|补充|确认|规划|选择|推荐|考虑|适合|有没有|去哪|哪里|怎么|为您|便于|方便|您|你|我|他|她|这|那|去爬|爬)/;
  if (blocked.test(value)) return false;
  const exactBlocked = /^(好的|可以|了解|收到|感谢|谢谢|不错|当然|没问题|欢迎|您好|你好|是的|不是|以下|如下|首先|其次|建议|推荐|考虑|选择|需要|想要|希望|如果|或者|以及|还有|等等|比如|例如|其中|适合|非常|特别|一些|几个|多个|方便|告诉|补充|确认|规划|出发|预算|交通|天数|经典|热门|人气|特色|体验|活动|景点|景区|风景|自然|人文|历史|文化|当地|本地|打算|哪里|去哪|爬山)$/;
  if (exactBlocked.test(value)) return false;
  if (/^[\u4e00-\u9fa5]{1,6}(?:山|岛|湖|州|城|镇|湾|江|岭|谷|岩|峰|屿|浦|滩|港|澳|门|溪|涧|潭|泉|洞|崖|峡|沟|坡|坪|川|海|滨|岸|堤|墟|里|坊|圩|甸|道|口|源|林|森|坝|关|庄|寨|原)$/.test(value)) {
    return true;
  }
  if (/^[\u4e00-\u9fa5]{2,8}(?:沙漠|湿地|草原|国家公园|古城|古镇|老街|湖区|景区|公园)$/.test(value)) {
    return true;
  }
  return false;
}

function stripHtml(value) {
  return String(value || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function extractMcpErrorText(result) {
  return (Array.isArray(result?.content) ? result.content : [])
    .map((item) => item?.text)
    .filter(Boolean)
    .join("\n");
}

function parseJsonOrNull(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function buildDeepSeekMessages(payload) {
  if (payload?.intent === "insert_plan") {
    return buildInsertPlanMessages(payload);
  }
  if (payload?.intent === "validate_day_order") {
    return buildValidateDayOrderMessages(payload);
  }

  const chat = Array.isArray(payload?.chat) ? payload.chat.slice(-8) : [];
  const userMessage = String(payload?.message || "").trim();
  const context = payload?.context || {};

  return [
    {
      role: "system",
      content: [
        "你是 Trip Planner 里的资深中文旅行攻略专家，擅长真实可执行的自由行路书、动线优化、住宿选址、交通衔接和避坑提醒。",
        "你必须优先依据用户传入的 itinerary、bookings、budget、notes 等上下文回答。",
        "不要编造实时航班余票、酒店库存、门票价格、营业时间或签证政策。",
        "如果问题依赖实时信息，明确说明需要通过预订面板或真实供应商确认，并给出下一步操作。",
        "你需要判断用户意图是全量重建还是局部修改：",
        "1. 如果用户变更目的地、天数、国家/城市、旅行主题，或者当前没有任何行程，且 context.needsTripPlanningDetails 不为 true，使用 updates.mode='replace'，并返回完整 route 与 days。",
        "2. 如果用户只是删除景点、调整某天、减少/增加某类活动、改酒店或交通，使用 updates.mode='patch'，只返回受影响的 days。",
        "3. 如果用户只是询问建议，不需要修改 Trip Planner，可以返回 updates.mode='none'。",
        "4. 当 context.exploringDestinations 为 true，或 hasTrip 为 false 且用户在找/推荐目的地时，必须使用 updates.mode='none'，不要返回 route/days；必须在 guide.inspiration.destinations 返回 4 到 8 个与用户意图高度匹配的目的地，每项含 name、region、tagline、highlights；name 必须是真实地名（如黄山、泰山），不能是口语词（如好的、可以、建议）；推荐必须紧扣用户诉求（如用户说爬山/登山，应推荐黄山、泰山、武功山等，不要推荐三亚等无关海边城市）；reply 简要说明推荐理由即可。",
        "4b. 当 context.isConcreteTripRequest 为 true，或用户已同时给出明确目的地与天数（如「西安五日游」「杭州3天」），且 context.exploringDestinations 为 false 时，必须使用 updates.mode='replace' 返回完整 route 与 days，禁止走灵感探索。",
        "4c. 用户给出明确目的地和有边界的时间表达（如「周五晚上出发去千岛湖过周末」「周末去杭州，安排一下」）时，也属于直接行程请求；应按实际覆盖的自然日生成行程，禁止返回目的地探索卡片。",
        "5. 当 context.selectedDestination 有值且 context.needsTripPlanningDetails 为 true（用户刚选定目的地，如「我选择泰山」「厦门吧」，但尚未说明天数/预算等），优先追问：打算玩几天、预算范围、出发城市、出发日期、同行人员等；此时使用 updates.mode='none' 且不得返回 route/days。若你已决定直接生成行程，必须使用 updates.mode='replace' 返回完整 route 与 days，reply 中声称已规划时也必须带上完整数据。",
        "5b. 用户用口语确认目的地（如「厦门吧」「就杭州」「去成都好了」）且你回复已规划/已生成行程时，必须使用 updates.mode='replace' 返回完整 route 与 days，不能只写文字。",
        "6. 当 reply 中出现「请告诉我几天」「出发城市」「出发日期」等追问时，必须使用 updates.mode='none'，且不得返回 route/days。",
        "7. 只有当用户已明确天数（context.hasTripDays 为 true）且目的地清晰时，才使用 updates.mode='replace' 生成完整 route 与 days。",
        "8. 如果用户在追问后补充了天数/预算等信息，可以返回 updates.mode='replace' 与完整 route/days。",
        "9. reply 中若声称已生成完整路书，必须同时返回 updates.mode='replace' 与完整 route、days，不能只写文字。",
        "10. 当 context.hasTripOrigin=false 时，用户没有提供出发地：禁止猜测出发城市，禁止生成高铁/航班/自驾等跨城大交通，guide.transport.intercity 必须为空；D1 schedule 应直接从目的地内部的第一个景点、餐饮或入住安排开始，不得写“出发前往目的地”“从某地抵达”“抵达与安顿”等虚构首段。只有 context.hasTripOrigin=true 时，才能依据 context.tripOrigin 生成出发大交通。",
        "只返回 JSON，不要返回 Markdown。JSON 格式：",
        "{\"reply\":\"给用户看的简短说明\",\"updates\":{\"mode\":\"replace|patch|none\",\"route\":[...],\"days\":[...],\"guide\":{\"overview\":{\"title\":\"\",\"dateRange\":\"\",\"destinations\":\"\",\"companions\":\"\",\"travelStyle\":\"度假游|平衡游|深度游|特种兵\",\"emergencyContact\":\"\",\"summary\":\"\"},\"essentials\":{\"timezone\":\"\",\"voltage\":\"\",\"visa\":\"\",\"insurance\":\"\",\"embassy\":\"\",\"items\":[{\"title\":\"\",\"detail\":\"\"}]},\"inspiration\":{\"destinations\":[{\"name\":\"\",\"region\":\"\",\"tagline\":\"\",\"highlights\":[\"\"]}],\"activities\":[\"\"],\"foods\":[\"\"],\"places\":[\"\"],\"notes\":\"\"},\"transport\":{\"intercity\":[{\"type\":\"航班|高铁|巴士|租车\",\"title\":\"\",\"detail\":\"\"}],\"localSummary\":\"\",\"localTips\":[{\"title\":\"\",\"detail\":\"\"}]},\"accommodation\":{\"nights\":[{\"day\":1,\"city\":\"\",\"name\":\"\",\"area\":\"\",\"checkIn\":\"\",\"checkOut\":\"\",\"note\":\"\"}],\"tips\":[\"\"]},\"dining\":{\"mustTry\":[{\"name\":\"\",\"specialty\":\"\",\"budget\":\"\",\"note\":\"\"}],\"markets\":[\"\"],\"dietaryNotes\":\"\"},\"activities\":{\"highlights\":[{\"name\":\"\",\"openHours\":\"\",\"ticket\":\"\",\"booking\":\"\",\"note\":\"\"}],\"backup\":[{\"title\":\"\",\"detail\":\"\"}]},\"budget\":{\"categories\":[{\"label\":\"\",\"estimate\":\"\",\"detail\":\"\"}],\"paymentTips\":\"\",\"prepaid\":[\"\"]},\"preparation\":{\"packing\":[{\"category\":\"\",\"items\":[\"\"]}],\"todos\":[{\"task\":\"\",\"detail\":\"\"}],\"devices\":[\"\"]},\"communication\":{\"phrases\":[{\"phrase\":\"\",\"meaning\":\"\"}],\"apps\":[{\"name\":\"\",\"use\":\"\"}],\"emergency\":[\"\"]}}}}",
        "mode=replace 时必须返回完整 route、days，并尽量返回完整 guide（参考 travel-plan 文件夹：主文档、交通、住宿、餐饮、活动、预算、行前准备、通讯工具）。",
        "guide 内容要具体、可执行，结合目的地常识；不确定的价格/政策写“待确认”并说明如何核实。",
        "replace 时 route 和 days 都要完整；patch 时 days 只包含需要改动的天。",
        "生成或重建行程时，每一天都必须填写 day.stay，表示当晚入住酒店/民宿/住宿区域；只有最后一天明确是返程、离开目的地或回家时，day.stay 才可以写“返程/不住宿”。",
        "除最后一天返程外，每一天 schedule 的最后一个时间段必须体现住宿落点，title 使用“入住 XXX”或“到 XXX 住宿区”，detail 说明为什么住这里、交通便利性或第二天衔接。",
        "如果用户只说高铁、自驾或当天跨城移动，也不能省略入住信息；到达当天仍要给出当晚住宿区域。",
        "每一天 schedule 保持 2 到 3 个时间段，包含景点、餐饮、交通衔接、住宿落点、避坑或预约提醒等足够全面的旅行信息。",
        "内容要具体、真实、少空话，像专业旅行攻略而不是泛泛建议。"
      ].join("\n")
    },
    {
      role: "user",
      content: `当前 Trip Planner 上下文：\n${JSON.stringify(context, null, 2)}`
    },
    ...chat.map((item) => ({
      role: item.role === "user" ? "user" : "assistant",
      content: String(item.text || "")
    })),
    { role: "user", content: userMessage }
  ];
}

function buildValidateDayOrderMessages(payload) {
  const dayOrder = Array.isArray(payload?.dayOrder) ? payload.dayOrder : [];

  return [
    {
      role: "system",
      content: [
        "你是 Trip Planner 的行程顺序审查助手。",
        "用户刚刚在画布视图里调整了 Day 卡片的顺序，你需要判断新顺序是否合理。",
        "重点检查：返程/送机/退房离开是否仍在最后；抵达/入境/到酒店是否不应被放到返程之后；跨城转场是否前后颠倒；同一城市重复抵达；明显违反时间线逻辑的安排。",
        "只返回 JSON，不要返回 Markdown。格式：",
        '{"reply":"给用户看的简短说明","validation":{"status":"ok|warn|error","title":"标题","message":"摘要","issues":["问题1"],"suggestions":["建议1"]}}',
        "status=ok 表示基本合理；warn 表示有风险但可接受；error 表示明显不合理，必须提示用户撤销或调整。"
      ].join("\n")
    },
    {
      role: "user",
      content: JSON.stringify(
        {
          dayOrder,
          tripContext: payload?.context || null
        },
        null,
        2
      )
    }
  ];
}

function sanitizeOrderValidation(validation) {
  if (!validation || typeof validation !== "object") return null;
  const status = ["ok", "warn", "error"].includes(validation.status) ? validation.status : "warn";
  return {
    status,
    title: stringOrUndefined(validation.title) || "顺序检查结果",
    message: stringOrUndefined(validation.message) || "",
    issues: Array.isArray(validation.issues)
      ? validation.issues.map(stringOrUndefined).filter(Boolean).slice(0, 6)
      : [],
    suggestions: Array.isArray(validation.suggestions)
      ? validation.suggestions.map(stringOrUndefined).filter(Boolean).slice(0, 4)
      : []
  };
}

function buildInsertPlanMessages(payload) {
  const plan = payload?.plan || {};
  const targetDay = payload?.targetDay || {};

  return [
    {
      role: "system",
      content: [
        "你是 Trip Planner 的行程编排助手。",
        "用户要在指定日子的 schedule 中插入一条新计划。",
        "根据分类、标题、备注和当天现有 schedule，判断最合适的插入位置 index（0 表示第一个位置，1 表示第二个位置，以此类推）。",
        "为该计划生成合理的 time（HH:MM）、title、detail。title 优先使用用户提供的标题，detail 要融合备注并补充可执行信息。",
        "不要改动当天其他已有安排，只决定插入位置和生成新条目。",
        "只返回 JSON，不要返回 Markdown。格式：",
        '{"reply":"简短说明","insert":{"day":1,"index":1,"activity":{"time":"14:00","title":"标题","detail":"详情"}}}',
        "分类含义：景点=白天参观；美食=午餐/晚餐；交通=接驳/移动；住宿=入住；体验=活动/演出；购物=商圈；其他=灵活安排。",
        "index 必须落在 0 到当前 schedule 长度之间，并与前后时间段衔接合理。"
      ].join("\n")
    },
    {
      role: "user",
      content: JSON.stringify(
        {
          plan,
          targetDay,
          tripContext: payload?.context || null
        },
        null,
        2
      )
    }
  ];
}

function sanitizeInsert(insert) {
  if (!insert || typeof insert !== "object") return null;

  const day = Number(insert.day);
  const index = Number(insert.index);
  if (!Number.isInteger(day) || day <= 0) return null;
  if (!Number.isInteger(index) || index < 0) return null;

  const activity = insert.activity || {};
  return {
    day,
    index,
    activity: {
      time: stringOrUndefined(activity.time) || "待定",
      title: stringOrUndefined(activity.title) || "新的安排",
      detail: stringOrUndefined(activity.detail) || "用户添加的计划。"
    }
  };
}

function parseModelJson(content) {
  try {
    return JSON.parse(content);
  } catch {
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) return { reply: content, updates: null };
    try {
      return JSON.parse(match[0]);
    } catch {
      return { reply: content, updates: null };
    }
  }
}

function normalizeModelReply(value) {
  const text = stringOrUndefined(value);
  if (!text) return "";

  const parsed = parseJsonOrNull(text);
  if (parsed && typeof parsed === "object") {
    return normalizeModelReply(parsed.reply || parsed.message || "");
  }

  const embedded = text.match(/^\s*\{[\s\S]*\"(?:reply|message)\"\s*:/);
  if (embedded) {
    const objectMatch = text.match(/\{[\s\S]*\}/);
    const parsedObject = objectMatch ? parseJsonOrNull(objectMatch[0]) : null;
    if (parsedObject && typeof parsedObject === "object") {
      return normalizeModelReply(parsedObject.reply || parsedObject.message || "");
    }
  }

  return text
    .replace(/^\s*```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .replace(/\n?\s*\"updates\"\s*:\s*\{[\s\S]*$/i, "")
    .replace(/\n?\s*,?\s*\"insert\"\s*:\s*\{[\s\S]*$/i, "")
    .replace(/\n?\s*,?\s*\"validation\"\s*:\s*\{[\s\S]*$/i, "")
    .trim();
}

function sanitizeUpdates(updates) {
  if (!updates || typeof updates !== "object") return null;
  const days = Array.isArray(updates.days) ? updates.days : [];
  return {
    mode: ["replace", "patch", "none"].includes(updates.mode) ? updates.mode : undefined,
    route: Array.isArray(updates.route)
      ? updates.route.map((city) => ({
          id: stringOrUndefined(city.id),
          city: stringOrUndefined(city.city),
          days: Number(city.days) || 1,
          intent: stringOrUndefined(city.intent),
          stops: Array.isArray(city.stops) ? city.stops.map(stringOrUndefined).filter(Boolean).slice(0, 8) : []
        })).filter((city) => city.city)
      : undefined,
    days: days
      .map((day) => ({
        day: Number(day.day),
        city: stringOrUndefined(day.city),
        title: stringOrUndefined(day.title),
        summary: stringOrUndefined(day.summary),
        pace: stringOrUndefined(day.pace),
        transport: stringOrUndefined(day.transport),
        stay: stringOrUndefined(day.stay),
        stops: Array.isArray(day.stops) ? day.stops.map(stringOrUndefined).filter(Boolean).slice(0, 8) : undefined,
        schedule: Array.isArray(day.schedule)
          ? day.schedule.slice(0, 6).map((item) => ({
              time: stringOrUndefined(item.time) || "待定",
              title: stringOrUndefined(item.title) || "新的安排",
              detail: stringOrUndefined(item.detail) || "根据旅行攻略专家建议补充。"
            }))
          : undefined
      }))
      .filter((day) => Number.isInteger(day.day) && day.day > 0),
    guide: sanitizeGuide(updates.guide)
  };
}

function sanitizeGuide(guide) {
  if (!guide || typeof guide !== "object") return undefined;

  const list = (value, limit = 8) =>
    Array.isArray(value) ? value.map(stringOrUndefined).filter(Boolean).slice(0, limit) : undefined;

  const objectList = (value, limit = 8, mapper = (item) => item) =>
    Array.isArray(value) ? value.slice(0, limit).map(mapper).filter(Boolean) : undefined;

  return {
    overview: guide.overview
      ? {
          title: stringOrUndefined(guide.overview.title),
          dateRange: stringOrUndefined(guide.overview.dateRange),
          destinations: stringOrUndefined(guide.overview.destinations),
          companions: stringOrUndefined(guide.overview.companions),
          travelStyle: stringOrUndefined(guide.overview.travelStyle),
          emergencyContact: stringOrUndefined(guide.overview.emergencyContact),
          summary: stringOrUndefined(guide.overview.summary)
        }
      : undefined,
    essentials: guide.essentials
      ? {
          timezone: stringOrUndefined(guide.essentials.timezone),
          voltage: stringOrUndefined(guide.essentials.voltage),
          visa: stringOrUndefined(guide.essentials.visa),
          insurance: stringOrUndefined(guide.essentials.insurance),
          embassy: stringOrUndefined(guide.essentials.embassy),
          items: objectList(guide.essentials.items, 8, (item) => ({
            title: stringOrUndefined(item?.title),
            detail: stringOrUndefined(item?.detail)
          }))?.filter((item) => item.title)
        }
      : undefined,
    inspiration: guide.inspiration
      ? {
          destinations: objectList(guide.inspiration.destinations, 8, (item) => ({
            name: stringOrUndefined(item?.name),
            region: stringOrUndefined(item?.region),
            tagline: stringOrUndefined(item?.tagline),
            highlights: list(item?.highlights, 4)
          }))?.filter((item) => item.name && isValidInspirationDestinationName(item.name)),
          activities: list(guide.inspiration.activities, 10),
          foods: list(guide.inspiration.foods, 10),
          places: list(guide.inspiration.places, 10),
          notes: stringOrUndefined(guide.inspiration.notes)
        }
      : undefined,
    transport: guide.transport
      ? {
          intercity: objectList(guide.transport.intercity, 6, (item) => ({
            type: stringOrUndefined(item?.type),
            title: stringOrUndefined(item?.title),
            detail: stringOrUndefined(item?.detail)
          }))?.filter((item) => item.title),
          localSummary: stringOrUndefined(guide.transport.localSummary),
          localTips: objectList(guide.transport.localTips, 6, (item) => ({
            title: stringOrUndefined(item?.title),
            detail: stringOrUndefined(item?.detail)
          }))?.filter((item) => item.title)
        }
      : undefined,
    accommodation: guide.accommodation
      ? {
          nights: objectList(guide.accommodation.nights, 12, (item) => ({
            day: Number(item?.day) || undefined,
            city: stringOrUndefined(item?.city),
            name: stringOrUndefined(item?.name),
            area: stringOrUndefined(item?.area),
            checkIn: stringOrUndefined(item?.checkIn),
            checkOut: stringOrUndefined(item?.checkOut),
            note: stringOrUndefined(item?.note)
          }))?.filter((item) => item.city || item.name),
          tips: list(guide.accommodation.tips, 6)
        }
      : undefined,
    dining: guide.dining
      ? {
          mustTry: objectList(guide.dining.mustTry, 8, (item) => ({
            name: stringOrUndefined(item?.name),
            specialty: stringOrUndefined(item?.specialty),
            budget: stringOrUndefined(item?.budget),
            note: stringOrUndefined(item?.note)
          }))?.filter((item) => item.name),
          markets: list(guide.dining.markets, 8),
          dietaryNotes: stringOrUndefined(guide.dining.dietaryNotes)
        }
      : undefined,
    activities: guide.activities
      ? {
          highlights: objectList(guide.activities.highlights, 10, (item) => ({
            name: stringOrUndefined(item?.name),
            openHours: stringOrUndefined(item?.openHours),
            ticket: stringOrUndefined(item?.ticket),
            booking: stringOrUndefined(item?.booking),
            note: stringOrUndefined(item?.note)
          }))?.filter((item) => item.name),
          backup: objectList(guide.activities.backup, 6, (item) => ({
            title: stringOrUndefined(item?.title),
            detail: stringOrUndefined(item?.detail)
          }))?.filter((item) => item.title)
        }
      : undefined,
    budget: guide.budget
      ? {
          categories: objectList(guide.budget.categories, 8, (item) => ({
            label: stringOrUndefined(item?.label),
            estimate: stringOrUndefined(item?.estimate),
            detail: stringOrUndefined(item?.detail)
          }))?.filter((item) => item.label),
          paymentTips: stringOrUndefined(guide.budget.paymentTips),
          prepaid: list(guide.budget.prepaid, 8)
        }
      : undefined,
    preparation: guide.preparation
      ? {
          packing: objectList(guide.preparation.packing, 6, (item) => ({
            category: stringOrUndefined(item?.category),
            items: list(item?.items, 12)
          }))?.filter((item) => item.category),
          todos: objectList(guide.preparation.todos, 8, (item) => ({
            task: stringOrUndefined(item?.task),
            detail: stringOrUndefined(item?.detail)
          }))?.filter((item) => item.task),
          devices: list(guide.preparation.devices, 8)
        }
      : undefined,
    communication: guide.communication
      ? {
          phrases: objectList(guide.communication.phrases, 8, (item) => ({
            phrase: stringOrUndefined(item?.phrase),
            meaning: stringOrUndefined(item?.meaning)
          }))?.filter((item) => item.phrase),
          apps: objectList(guide.communication.apps, 8, (item) => ({
            name: stringOrUndefined(item?.name),
            use: stringOrUndefined(item?.use)
          }))?.filter((item) => item.name),
          emergency: list(guide.communication.emergency, 6)
        }
      : undefined
  };
}

function stringOrUndefined(value) {
  const text = extractLooseText(value);
  return text || undefined;
}

function extractLooseText(value, depth = 0) {
  if (value === undefined || value === null || depth > 3) return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value).replace(/\[object Object\]/g, " ").trim();
  }
  if (Array.isArray(value)) {
    return value
      .map((item) => extractLooseText(item, depth + 1))
      .filter(Boolean)
      .join(" · ")
      .trim();
  }
  if (typeof value === "object") {
    const preferredKeys = [
      "name",
      "title",
      "label",
      "text",
      "value",
      "content",
      "description",
      "detail",
      "summary",
      "city",
      "area",
      "address",
      "note",
      "remark"
    ];
    for (const key of preferredKeys) {
      const text = extractLooseText(value[key], depth + 1);
      if (text) return text;
    }
    for (const nested of Object.values(value).slice(0, 6)) {
      const text = extractLooseText(nested, depth + 1);
      if (text) return text;
    }
  }
  return "";
}

function listen(port) {
  const server = createAppServer();

  server.once("error", (error) => {
    if (error.code === "EADDRINUSE" && port < preferredPort + 20) {
      listen(port + 1);
      return;
    }
    throw error;
  });

  server.listen(port, host, () => {
    console.log(`AI Travel is running at http://${host}:${port}`);
  });
}

const serverlessServer = createAppServer();
const isDirectRun = Boolean(process.argv[1]) && import.meta.url === pathToFileURL(process.argv[1]).href;

export default serverlessServer;

if (isDirectRun) {
  listen(preferredPort);
}
