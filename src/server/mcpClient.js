import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function readMcpServerConfig(name, root = process.cwd()) {
  try {
    const source = await readFile(join(root, ".mcp.local.json"), "utf8");
    const config = JSON.parse(source);
    return config?.mcpServers?.[name];
  } catch {
    return null;
  }
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
