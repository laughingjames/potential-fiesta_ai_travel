module.exports = {
  apps: [
    {
      name: "trip-planner",
      script: "server.mjs",
      cwd: "/var/www/trip-planner",
      instances: 1,
      autorestart: true,
      max_memory_restart: "300M",
      env: {
        NODE_ENV: "production",
        HOST: "127.0.0.1",
        PORT: "5173"
      }
    }
  ]
};
