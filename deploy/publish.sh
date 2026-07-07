#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DEPLOY_CONFIG_FILE="${DEPLOY_CONFIG_FILE:-${ROOT_DIR}/deploy/.deploy.local}"

ENV_DEPLOY_SERVER="${DEPLOY_SERVER:-}"
ENV_REMOTE_DIR="${REMOTE_DIR:-}"
ENV_RUN_SETUP="${RUN_SETUP:-}"
ENV_DEPLOY_SSH_PORT="${DEPLOY_SSH_PORT:-}"
ENV_DEPLOY_IDENTITY_FILE="${DEPLOY_IDENTITY_FILE:-}"

DEPLOY_SERVER=""
REMOTE_DIR="/var/www/trip-planner"
RUN_SETUP="auto"
DEPLOY_SSH_PORT=""
DEPLOY_IDENTITY_FILE=""

if [[ -f "${DEPLOY_CONFIG_FILE}" ]]; then
  # shellcheck disable=SC1090
  source "${DEPLOY_CONFIG_FILE}"
fi

DEPLOY_SERVER="${ENV_DEPLOY_SERVER:-${DEPLOY_SERVER:-}}"
REMOTE_DIR="${ENV_REMOTE_DIR:-${REMOTE_DIR:-/var/www/trip-planner}}"
RUN_SETUP="${ENV_RUN_SETUP:-${RUN_SETUP:-auto}}"
DEPLOY_SSH_PORT="${ENV_DEPLOY_SSH_PORT:-${DEPLOY_SSH_PORT:-}}"
DEPLOY_IDENTITY_FILE="${ENV_DEPLOY_IDENTITY_FILE:-${DEPLOY_IDENTITY_FILE:-}}"

if [[ -n "${DEPLOY_IDENTITY_FILE}" ]]; then
  if [[ "${DEPLOY_IDENTITY_FILE}" == "~/"* ]]; then
    DEPLOY_IDENTITY_FILE="${HOME}/${DEPLOY_IDENTITY_FILE#"~/"}"
  elif [[ "${DEPLOY_IDENTITY_FILE}" != /* ]]; then
    DEPLOY_IDENTITY_FILE="${ROOT_DIR}/${DEPLOY_IDENTITY_FILE}"
  fi
fi

SSH_OPTS=()
if [[ -n "${DEPLOY_SSH_PORT}" ]]; then
  SSH_OPTS+=("-p" "${DEPLOY_SSH_PORT}")
fi
if [[ -n "${DEPLOY_IDENTITY_FILE}" ]]; then
  SSH_OPTS+=("-i" "${DEPLOY_IDENTITY_FILE}")
fi

build_rsync_ssh_command() {
  local parts=("ssh")
  local arg=""
  for arg in "${SSH_OPTS[@]}"; do
    parts+=("$(printf "%q" "${arg}")")
  done
  printf "%s " "${parts[@]}"
}

RSYNC_SSH="$(build_rsync_ssh_command)"
RSYNC_SSH="${RSYNC_SSH% }"

if [[ -z "${DEPLOY_SERVER}" ]]; then
  echo "缺少部署目标。"
  echo "可以直接执行：DEPLOY_SERVER=root@你的公网IP bash deploy/publish.sh"
  echo "或在 ${DEPLOY_CONFIG_FILE} 里配置 DEPLOY_SERVER 后直接运行：bash deploy/publish.sh"
  exit 1
fi

echo "同步代码到 ${DEPLOY_SERVER}:${REMOTE_DIR}"
if [[ -f "${DEPLOY_CONFIG_FILE}" ]]; then
  echo "已加载部署配置：${DEPLOY_CONFIG_FILE}"
fi

ssh "${SSH_OPTS[@]}" "${DEPLOY_SERVER}" "mkdir -p '${REMOTE_DIR}' && if ! command -v rsync >/dev/null 2>&1; then apt-get update && apt-get install -y rsync; fi"

rsync -avz --delete \
  -e "${RSYNC_SSH}" \
  --exclude ".git" \
  --exclude ".DS_Store" \
  --exclude "node_modules" \
  --exclude ".env" \
  --exclude ".env.local" \
  --exclude ".mcp.local.json" \
  --exclude "deploy/.deploy.local" \
  --exclude "deploy/.ssh/" \
  "${ROOT_DIR}/" "${DEPLOY_SERVER}:${REMOTE_DIR}/"

ssh "${SSH_OPTS[@]}" "${DEPLOY_SERVER}" "bash -s" <<EOF
set -euo pipefail
cd "${REMOTE_DIR}"

if [[ "${RUN_SETUP}" == "always" ]] || [[ "${RUN_SETUP}" == "auto" && ( ! -x "\$(command -v node)" || ! -x "\$(command -v pm2)" || ! -x "\$(command -v nginx)" ) ]]; then
  bash deploy/server-setup.sh
fi

if [[ ! -f .env ]]; then
  cp .env.example .env
  echo "已在服务器创建 ${REMOTE_DIR}/.env，请填写 DEEPSEEK_API_KEY 后重新发布。"
fi

if [[ -f package-lock.json ]]; then
  npm ci --omit=dev
else
  npm install --omit=dev
fi

pm2 start deploy/ecosystem.config.cjs || pm2 restart trip-planner
pm2 save
EOF

echo "发布完成。访问：http://${DEPLOY_SERVER#*@}"
