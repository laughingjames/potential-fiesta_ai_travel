#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
NGINX_SITE=""
NGINX_LINK=""

if [[ "${EUID}" -ne 0 ]]; then
  echo "请使用 root 运行：sudo bash deploy/server-setup.sh"
  exit 1
fi

install_packages() {
  if command -v apt-get >/dev/null 2>&1; then
    export DEBIAN_FRONTEND=noninteractive
    apt-get update
    apt-get install -y curl nginx rsync
    return
  fi

  if command -v dnf >/dev/null 2>&1; then
    dnf install -y curl nginx rsync
    return
  fi

  if command -v yum >/dev/null 2>&1; then
    yum install -y curl nginx rsync
    return
  fi

  echo "未找到支持的包管理器，请手动安装 curl、nginx、rsync。"
  exit 1
}

install_node() {
  if command -v node >/dev/null 2>&1; then
    return
  fi

  if command -v apt-get >/dev/null 2>&1; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
    return
  fi

  if command -v dnf >/dev/null 2>&1; then
    if curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -; then
      dnf install -y nodejs
    else
      echo "NodeSource 不支持当前系统，改用系统仓库安装 nodejs/npm。"
      dnf install -y nodejs npm
    fi
    return
  fi

  if command -v yum >/dev/null 2>&1; then
    if curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -; then
      yum install -y nodejs
    else
      echo "NodeSource 不支持当前系统，改用系统仓库安装 nodejs/npm。"
      yum install -y nodejs npm
    fi
    return
  fi

  echo "未找到支持的包管理器，请手动安装 Node.js 20。"
  exit 1
}

configure_nginx_paths() {
  if [[ -d /etc/nginx/sites-available && -d /etc/nginx/sites-enabled ]]; then
    NGINX_SITE="/etc/nginx/sites-available/trip-planner"
    NGINX_LINK="/etc/nginx/sites-enabled/trip-planner"
    return
  fi

  mkdir -p /etc/nginx/conf.d
  NGINX_SITE="/etc/nginx/conf.d/trip-planner.conf"
  NGINX_LINK=""
}

install_packages
install_node

if ! command -v pm2 >/dev/null 2>&1; then
  npm install -g pm2
fi

mkdir -p "${APP_DIR}"

if [[ ! -f "${APP_DIR}/.env" && -f "${APP_DIR}/.env.example" ]]; then
  cp "${APP_DIR}/.env.example" "${APP_DIR}/.env"
  echo "已在 ${APP_DIR}/.env 创建环境变量模板，请填写 DEEPSEEK_API_KEY"
fi

configure_nginx_paths
cp "${SCRIPT_DIR}/nginx-trip-planner.conf" "${NGINX_SITE}"
if [[ -n "${NGINX_LINK}" ]]; then
  ln -sf "${NGINX_SITE}" "${NGINX_LINK}"
  rm -f /etc/nginx/sites-enabled/default
fi
nginx -t
systemctl enable nginx
systemctl restart nginx

if [[ -f "${APP_DIR}/deploy/ecosystem.config.cjs" ]]; then
  cd "${APP_DIR}"
  pm2 start "${APP_DIR}/deploy/ecosystem.config.cjs" || pm2 restart trip-planner
  pm2 save
  pm2 startup systemd -u root --hp /root >/tmp/pm2-startup.txt 2>/dev/null || true
fi

echo "服务器环境已就绪，应用目录：${APP_DIR}"
echo "下一步：在本机执行 deploy/publish.sh 同步代码并重启服务。"
