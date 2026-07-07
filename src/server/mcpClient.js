import { readFile } from "node:fs/promises";
import { join } from "node:path";

const DEFAULT_MCP_URLS = {
  "RollingGo-Hotel": "https://mcp.rollinggo.cn/mcp",
  "RollingGo-Flight": "https://mcp.rollinggo.cn/mcp/flight",
  "amap-maps-streamableHTTP": "https://mcp.amap.com/mcp"
};

export async function readMcpServerConfig(name, root = process.cwd()) {
  return readMcpServerConfigFromEnv(name) || (await readMcpServerConfigFromFile(name, root));
}

function readMcpServerConfigFromEnv(name) {
  if (name === "RollingGo-Hotel") {
    return buildBearerMcpConfig({
      key: process.env.ROLLINGGO_HOTEL_KEY || process.env.ROLLINGGO_MCP_KEY,
      token: process.env.ROLLINGGO_HOTEL_TOKEN || process.env.ROLLINGGO_MCP_TOKEN,
      url: process.env.ROLLINGGO_HOTEL_MCP_URL || process.env.ROLLINGGO_MCP_URL || DEFAULT_MCP_URLS[name]
    });
  }

  if (name === "RollingGo-Flight") {
    return buildBearerMcpConfig({
      key: process.env.ROLLINGGO_FLIGHT_KEY || process.env.ROLLINGGO_MCP_KEY,
      token: process.env.ROLLINGGO_FLIGHT_TOKEN || process.env.ROLLINGGO_MCP_TOKEN,
      url: process.env.ROLLINGGO_FLIGHT_MCP_URL || DEFAULT_MCP_URLS[name]
    });
  }

  if (name === "amap-maps-streamableHTTP") {
    const key = cleanEnvValue(process.env.AMAP_MCP_KEY || process.env.AMAP_KEY || process.env.AMAP_WEB_SERVICE_KEY);
    const url = cleanEnvValue(process.env.AMAP_MCP_URL || DEFAULT_MCP_URLS[name]);
    if (!key && !process.env.AMAP_MCP_URL) return null;
    return {
      url: appendQueryParam(url, "key", key),
      type: "http"
    };
  }

  return null;
}

function buildBearerMcpConfig({ key, token, url }) {
  const credential = cleanEnvValue(token || key);
  if (!credential) return null;
  return {
    url: cleanEnvValue(url),
    type: "http",
    headers: {
      Authorization: credential.startsWith("Bearer ") ? credential : `Bearer ${credential}`
    }
  };
}

async function readMcpServerConfigFromFile(name, root) {
  try {
    const source = await readFile(join(root, ".mcp.local.json"), "utf8");
    const config = JSON.parse(source);
    return config?.mcpServers?.[name];
  } catch {
    return null;
  }
}

function appendQueryParam(url, key, value) {
  if (!value) return url;
  const parsed = new URL(url);
  if (!parsed.searchParams.has(key)) parsed.searchParams.set(key, value);
  return parsed.toString();
}

function cleanEnvValue(value) {
  return String(value || "").trim();
}

export async function callMcpTool(serverConfig, toolName, args) {
  const response = await fetch(serverConfig.url, {
    method: "POST",
    headers: {
      ...serverConfig.headers,
      "Content-Type": "application/json",
      "Accept": "application/json, text/event-stream"
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: Date.now(),
      method: "tools/call",
      params: {
        name: toolName,
        arguments: args
      }
    })
  });

  const text = await response.text();
  const data = parseJsonOrNull(text) || {};
  if (!response.ok || data.error) {
    throw new Error(data.error?.message || `MCP 请求失败：${response.status}`);
  }
  if (data.result?.isError) {
    throw new Error(extractMcpErrorText(data.result) || "MCP 工具返回错误。");
  }
  return data.result || data;
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
