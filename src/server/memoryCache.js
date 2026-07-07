export function getMemoryCache(cache, key) {
  const entry = cache.get(key);
  if (!entry) return undefined;
  if (entry.expiresAt <= Date.now()) {
    cache.delete(key);
    return undefined;
  }
  return entry.value;
}

export function setMemoryCache(cache, key, value, ttl, maxSize = 600) {
  cache.set(key, {
    value,
    expiresAt: Date.now() + ttl
  });
  trimMemoryCache(cache, maxSize);
}

function trimMemoryCache(cache, maxSize) {
  const now = Date.now();
  for (const [key, entry] of cache.entries()) {
    if (entry.expiresAt <= now || cache.size > maxSize) cache.delete(key);
    if (cache.size <= maxSize) break;
  }
}
