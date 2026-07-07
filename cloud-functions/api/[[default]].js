import { Readable, Writable } from "node:stream";
import { handleAppRequest } from "../../server.mjs";

export async function onRequest({ request }) {
  return handleEdgeOneRequest(request);
}

async function handleEdgeOneRequest(request) {
  const req = createNodeRequest(request);
  const res = createNodeResponse();

  await handleAppRequest(req, res);

  return res.toResponse();
}

function createNodeRequest(request) {
  const url = new URL(request.url);
  const body = request.body ? Readable.fromWeb(request.body) : Readable.from([]);
  body.method = request.method;
  body.url = `${url.pathname}${url.search}`;
  body.headers = Object.fromEntries(request.headers.entries());
  return body;
}

function createNodeResponse() {
  const headers = new Headers();
  let status = 200;
  let ended = false;
  const chunks = [];
  const waiters = [];

  const resolveWaiters = () => {
    while (waiters.length) waiters.shift()();
  };

  const res = new Writable({
    write(chunk, _encoding, callback) {
      if (chunk !== undefined) chunks.push(toUint8Array(chunk));
      callback();
    },
    final(callback) {
      ended = true;
      resolveWaiters();
      callback();
    }
  });

  res.headersSent = false;
  res.writeHead = (nextStatus, nextHeaders = {}) => {
    status = nextStatus || status;
    Object.entries(nextHeaders || {}).forEach(([key, value]) => {
      if (value !== undefined) headers.set(key, String(value));
    });
    res.headersSent = true;
    return res;
  };
  res.setHeader = (key, value) => {
    if (value !== undefined) headers.set(key, String(value));
    return res;
  };
  res.getHeader = (key) => headers.get(key);

  const originalEnd = res.end.bind(res);
  res.end = (chunk, encoding, callback) => {
    if (chunk !== undefined) chunks.push(toUint8Array(chunk));
    ended = true;
    resolveWaiters();
    return originalEnd(null, encoding, callback);
  };

  res.toResponse = async () => {
    if (!ended) {
      await new Promise((resolve) => waiters.push(resolve));
    }
    return new Response(chunks.length ? new Blob(chunks) : null, {
      status,
      headers
    });
  };

  return res;
}

function toUint8Array(chunk) {
  if (chunk instanceof Uint8Array) return chunk;
  if (chunk instanceof ArrayBuffer) return new Uint8Array(chunk);
  if (Buffer.isBuffer(chunk)) return chunk;
  return Buffer.from(String(chunk));
}
