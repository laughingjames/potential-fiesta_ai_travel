export function createApiRouter(routes) {
  const normalizedRoutes = routes.map((route) => ({
    method: route.method?.toUpperCase(),
    path: route.path,
    handler: route.handler
  }));

  return async function routeApiRequest(req, res) {
    const method = String(req.method || "GET").toUpperCase();
    const pathname = new URL(req.url || "/", "http://localhost").pathname;
    const route = normalizedRoutes.find((candidate) =>
      (!candidate.method || candidate.method === method) && candidate.path === pathname
    );

    if (!route) return false;
    await route.handler(req, res);
    return true;
  };
}
