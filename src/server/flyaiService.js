import { execFile } from "node:child_process";
import { join } from "node:path";
import { promisify } from "node:util";
import { readJsonBody, writeJson } from "./http.js";

const execFileAsync = promisify(execFile);
const flyAiScript = join(process.cwd(), "node_modules", "@fly-ai", "flyai-cli", "dist", "flyai-bundle.cjs");
const supportedKinds = new Set(["hotels", "flights", "trains", "tickets"]);

export async function handleFlyAiSearch(req, res) {
  let payload;
  try {
    payload = await readJsonBody(req);
  } catch {
    writeJson(res, 400, { error: "请求体不是有效 JSON。" });
    return;
  }

  const kind = clean(payload?.kind);
  if (!supportedKinds.has(kind)) {
    writeJson(res, 400, { error: "不支持的实时查询类型。" });
    return;
  }

  try {
    const invocation = buildInvocation(kind, payload);
    const { raw, items } = await runFlyAiInvocation(invocation);

    writeJson(res, 200, {
      source: "实时预订服务",
      systemMessage: stripProviderBrand(raw.systemMessage),
      items
    });
  } catch (error) {
    const status = error?.code === "MISSING_CONTEXT" ? 422 : 502;
    writeJson(res, status, {
      error: normalizeFlyAiError(error)
    });
  }
}

async function runFlyAiInvocation(invocation) {
  const attempts = [invocation.args];
  if (Array.isArray(invocation.fallbackArgs) && invocation.fallbackArgs.length) {
    attempts.push(invocation.fallbackArgs);
  }

  let lastError = null;
  for (let index = 0; index < attempts.length; index += 1) {
    try {
      const raw = await execFlyAiCli(attempts[index]);
      const items = normalizeItems(invocation.mode, raw.data?.itemList, invocation);
      const shouldRetryWithoutPoiFilter = invocation.mode === "hotels"
        && index === 0
        && attempts.length > 1
        && !items.length;
      if (shouldRetryWithoutPoiFilter) continue;
      return { raw, items };
    } catch (error) {
      lastError = error;
      const shouldRetryWithoutPoiFilter = invocation.mode === "hotels"
        && index === 0
        && attempts.length > 1
        && isRetryableHotelSearchError(error);
      if (shouldRetryWithoutPoiFilter) continue;
      throw error;
    }
  }

  throw lastError || new Error("实时查询失败。");
}

async function execFlyAiCli(args) {
  const { stdout } = await execFileAsync(process.execPath, [flyAiScript, ...args], {
    timeout: 30_000,
    maxBuffer: 8 * 1024 * 1024,
    env: process.env
  });
  const raw = JSON.parse(String(stdout || "{}").trim() || "{}");
  if (Number(raw.status) !== 0) {
    throw new Error(stripProviderBrand(raw.message) || "实时查询失败。");
  }
  return raw;
}

function buildInvocation(kind, payload) {
  const city = clean(payload?.city);
  const origin = clean(payload?.origin);
  const destination = clean(payload?.destination) || city;
  const query = clean(payload?.query);
  const date = validDate(payload?.date);
  const checkOutDate = validDate(payload?.checkOutDate);

  if (kind === "hotels") {
    requireValue(city, "请先补充目的地，再查询酒店。");
    const hotelDestination = normalizeHotelDestinationName(destination || city);
    const poiName = normalizeHotelPoiQuery(query, city);
    return {
      mode: "hotels",
      destinationName: hotelDestination,
      args: buildHotelSearchArgs({ destName: hotelDestination, poiName, date, checkOutDate }),
      fallbackArgs: poiName ? buildHotelSearchArgs({ destName: hotelDestination, date, checkOutDate }) : null
    };
  }

  if (kind === "flights" || kind === "trains") {
    requireValue(origin, `请先告诉旅行助手你的出发地，再查询${kind === "flights" ? "机票" : "火车票"}。`);
    requireValue(destination, "请先补充目的地。 ");
    const command = kind === "flights" ? "search-flight" : "search-train";
    const args = [command, "--origin", origin, "--destination", destination, "--sort-type", "2"];
    if (date) args.push("--dep-date", date);
    return { mode: kind, args };
  }

  requireValue(city, "请先补充目的地，再查询门票或体验。");
  if (/(船|游轮|邮轮|出海|轮渡|浮潜)/.test(query)) {
    return {
      mode: "keyword",
      args: ["keyword-search", "--query", `${city} ${query || "游船"} 预订`]
    };
  }
  const args = ["search-poi", "--city-name", city];
  if (query) args.push("--keyword", query);
  return { mode: "tickets", args };
}

function buildHotelSearchArgs({ destName, poiName = "", date = "", checkOutDate = "" }) {
  const args = ["search-hotel", "--dest-name", destName, "--sort", "rate_desc"];
  if (poiName) args.push("--poi-name", poiName);
  if (date) args.push("--check-in-date", date);
  if (checkOutDate) args.push("--check-out-date", checkOutDate);
  return args;
}

function normalizeHotelDestinationName(value) {
  const text = clean(value);
  if (/(千岛湖|淳安)/.test(text)) return "淳安千岛湖";
  return text;
}

function normalizeHotelPoiQuery(query, city = "") {
  const text = clean(query)
    .replace(/^(?:入住|住在|住进|预订|订|安排|前往|抵达|到达)/, "")
    .replace(/(?:附近|周边|一带|片区|酒店|民宿|客栈|住宿|落脚点|推荐)$/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return "";

  const normalizedText = normalizeSearchToken(text);
  const normalizedCity = normalizeSearchToken(city);
  if (!normalizedText || normalizedText === normalizedCity) return "";
  if (/^(市区|城区|主城区|市中心|中心区域|中心地带|交通便利|核心区域)$/.test(text)) return "";
  if (/^(湖景|江景|海景|山景|园景|景观|景致|度假|精品|轻奢|高端|亲子|温泉|泳池|民宿风|ins风)$/.test(text)) return "";
  if (/^[\u4e00-\u9fa5]{2,4}(镇|乡|村|市区|城区)$/.test(text) && !/(湖区|景区|公园|码头|古镇|古城|山|岛|街|巷|观景台)/.test(text)) {
    return "";
  }
  return text;
}

function normalizeSearchToken(value) {
  return String(value || "")
    .replace(/[市区县镇乡村省特别行政区\s·・,，。:：()（）-]/g, "")
    .trim();
}

function normalizeItems(mode, items, options = {}) {
  const normalized = (Array.isArray(items) ? items : [])
    .map((item, index) => normalizeItem(mode, item, index))
    .filter(Boolean);

  if (mode === "hotels") {
    return sortHotelItemsByDestination(normalized, options.destinationName || "").slice(0, 8);
  }
  return normalized.slice(0, 8);
}

function sortHotelItemsByDestination(items, destinationName = "") {
  const scored = items.map((item, index) => ({
    item,
    index,
    score: scoreHotelItemForDestination(item, destinationName)
  }));
  return scored
    .sort((left, right) => right.score - left.score || left.index - right.index)
    .map((entry) => entry.item);
}

function scoreHotelItemForDestination(item, destinationName = "") {
  const text = [
    item.name,
    item.meta,
    item.detail,
    ...(Array.isArray(item.tags) ? item.tags : [])
  ].map(clean).join(" ");
  if (!text) return 0;

  let score = 0;
  const normalizedText = normalizeSearchToken(text);
  const hints = getHotelDestinationHints(destinationName);
  hints.forEach((hint) => {
    const normalizedHint = normalizeSearchToken(hint);
    if (!normalizedHint) return;
    if (normalizedText.includes(normalizedHint)) score += normalizedHint.length >= 3 ? 12 : 6;
  });
  if (/千岛湖/.test(text)) score += 20;
  if (/淳安/.test(text)) score += 12;
  if (/杭州奥体|紫金港|萧山|临安|余杭|拱墅|滨江|地铁站|购物中心/.test(text)) score -= 18;
  return score;
}

function getHotelDestinationHints(destinationName = "") {
  const text = clean(destinationName);
  if (/(千岛湖|淳安)/.test(text)) {
    return ["千岛湖", "淳安", "中心湖区", "东南湖区", "秀水广场", "骑龙巷"];
  }
  return text ? [text] : [];
}

function normalizeItem(mode, raw, index) {
  const item = mode === "keyword" ? raw?.info || raw : raw;
  if (!item || typeof item !== "object") return null;

  if (mode === "hotels") {
    return {
      id: clean(item.shId) || `hotel-${index}`,
      name: clean(item.name) || "酒店方案",
      meta: [clean(item.star), clean(item.scoreDesc), clean(item.score)].filter(Boolean).join(" · ") || "可订酒店",
      detail: [clean(item.interestsPoi), clean(item.address), clean(item.review)].filter(Boolean).join("；"),
      price: clean(item.price) || "实时查价",
      imageUrl: safeUrl(item.mainPic),
      bookingUrl: safeUrl(item.detailUrl),
      tags: [clean(item.brandName), clean(item.star), clean(item.interestsPoi)].filter(Boolean).slice(0, 3)
    };
  }

  if (mode === "flights" || mode === "trains") {
    const journey = item.journeys?.[0] || {};
    const segment = journey.segments?.[0] || {};
    const number = clean(segment.marketingTransportNo);
    const operator = clean(segment.marketingTransportName);
    const dep = formatDateTime(segment.depDateTime);
    const arr = formatDateTime(segment.arrDateTime);
    return {
      id: `${mode}-${number || index}`,
      name: [operator, number].filter(Boolean).join(" ") || (mode === "flights" ? "航班方案" : "车次方案"),
      meta: [clean(journey.journeyType), clean(segment.seatClassName), clean(item.adultPrice)].filter(Boolean).join(" · "),
      detail: `${clean(segment.depStationName) || clean(segment.depCityName) || "出发"} ${dep} → ${clean(segment.arrStationName) || clean(segment.arrCityName) || "到达"} ${arr}${clean(journey.totalDuration || item.totalDuration) ? ` · ${formatDuration(journey.totalDuration || item.totalDuration)}` : ""}`,
      price: clean(item.adultPrice) || "实时查价",
      imageUrl: safeUrl(item.picUrl),
      bookingUrl: safeUrl(item.jumpUrl),
      tags: [clean(segment.seatClassName), clean(journey.journeyType)].filter(Boolean)
    };
  }

  const ticket = item.ticketInfo || {};
  return {
    id: clean(item.id) || `ticket-${index}`,
    name: clean(item.name || item.title) || "门票体验",
    meta: [clean(ticket.ticketName), clean(item.scoreDesc), clean(item.star)].filter(Boolean).join(" · ") || "可订门票",
    detail: clean(item.address) || (Array.isArray(item.tags) ? item.tags.map(clean).filter(Boolean).join(" · ") : ""),
    price: clean(ticket.price || item.price) || (item.freePoiStatus ? clean(item.freePoiStatus) : "实时查价"),
    imageUrl: safeUrl(item.mainPic || item.picUrl),
    bookingUrl: safeUrl(item.jumpUrl),
    tags: Array.isArray(item.tags) ? item.tags.map(clean).filter(Boolean).slice(0, 3) : []
  };
}

function formatDateTime(value) {
  const text = clean(value);
  const match = text.match(/(\d{2}-\d{2})\s+(\d{2}:\d{2})/);
  return match ? `${match[1]} ${match[2]}` : text;
}

function formatDuration(value) {
  const text = clean(value);
  return /^\d+$/.test(text) ? `${text} 分钟` : text;
}

function requireValue(value, message) {
  if (value) return;
  const error = new Error(message);
  error.code = "MISSING_CONTEXT";
  throw error;
}

function validDate(value) {
  const text = clean(value);
  return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : "";
}

function safeUrl(value) {
  const text = clean(value);
  return /^https:\/\//i.test(text) ? text : "";
}

function clean(value) {
  return extractLooseText(value);
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

function stripProviderBrand(value) {
  return clean(value)
    .replace(/飞猪|FlyAI|fly\.ai|Fliggy/gi, "")
    .replace(/^[\s·|｜:：-]+|[\s·|｜:：-]+$/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function isRetryableHotelSearchError(error) {
  const raw = [
    error?.message,
    error?.stderr,
    error?.stdout,
    error?.cause?.message,
    error?.cause?.code
  ].map(clean).filter(Boolean).join(" ");

  if (!raw) return true;
  if (/MISSING_CONTEXT/.test(raw)) return false;
  if (/spawn\s+EPERM|operation not permitted/i.test(raw)) return false;
  if (/ENOTFOUND|EAI_AGAIN|getaddrinfo|fetch failed/i.test(raw)) return false;
  if (/401|403|unauthorized|forbidden|api key|token/i.test(raw)) return false;
  return true;
}

function normalizeFlyAiError(error) {
  const raw = [
    error?.message,
    error?.stderr,
    error?.stdout,
    error?.cause?.message,
    error?.cause?.code
  ].map(clean).filter(Boolean).join(" ");

  if (/MISSING_CONTEXT/.test(raw)) {
    return stripProviderBrand(error?.message) || "请先补充查询信息。";
  }
  if (/spawn\s+EPERM|operation not permitted/i.test(raw)) {
    return "实时预订服务启动失败，请稍后重试。";
  }
  if (/ENOTFOUND|EAI_AGAIN|getaddrinfo|fetch failed/i.test(raw)) {
    return "实时预订服务当前无法联网，请先使用行程内建议酒店。";
  }
  if (/401|403|unauthorized|forbidden|api key|token/i.test(raw)) {
    return "实时预订服务尚未完成配置，请稍后再试。";
  }
  return stripProviderBrand(raw) || "实时服务暂时无法完成查询，请稍后重试。";
}
