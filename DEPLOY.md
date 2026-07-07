# 腾讯云部署说明

适用方案：腾讯云 CVM（Ubuntu）+ Node.js + PM2 + Nginx。

## 1. 准备腾讯云服务器

在腾讯云 CVM 控制台准备一台 Ubuntu 服务器，并在安全组放行：

- `22`：SSH 登录
- `80`：HTTP 访问
- `443`：HTTPS，后续绑定域名和证书时使用

记下服务器公网 IP，例如 `1.2.3.4`。

## 2. 首次发布

推荐先在本机配置一个本地部署文件：

```bash
cp deploy/.deploy.local.example deploy/.deploy.local
```

然后编辑 `deploy/.deploy.local`：

```bash
DEPLOY_SERVER=root@1.2.3.4
REMOTE_DIR=/var/www/trip-planner
RUN_SETUP=auto

# 可选：如果你使用私钥登录
# DEPLOY_IDENTITY_FILE=~/.ssh/tencent-cvm-ai-travel

# 可选：如果 SSH 端口不是 22
# DEPLOY_SSH_PORT=22
```

配置好后，首次发布直接在本机项目根目录执行：

```bash
bash deploy/publish.sh
```

脚本支持相对路径、绝对路径，以及 `~/.ssh/...` 这种家目录写法。

如果你暂时不想写配置文件，也可以继续临时传环境变量：

```bash
DEPLOY_SERVER=root@1.2.3.4 bash deploy/publish.sh
```

脚本会同步代码到服务器的 `/var/www/trip-planner`，并在服务器缺少依赖时自动安装：

- Node.js 20
- Nginx
- PM2
- rsync

发布完成后访问：

```text
http://1.2.3.4
```

## 3. 配置环境变量

首次发布会在服务器创建 `/var/www/trip-planner/.env`。登录服务器后填写真实配置：

```bash
ssh root@1.2.3.4
cd /var/www/trip-planner
nano .env
```

至少需要配置：

```bash
DEEPSEEK_API_KEY=你的真实 Key
DEEPSEEK_API_URL=https://api.deepseek.com/chat/completions
DEEPSEEK_MODEL=deepseek-chat
HOST=127.0.0.1
PORT=5173
NODE_ENV=production
```

保存后重启服务：

```bash
pm2 restart trip-planner
```

## 4. 后续更新

每次本地改完代码后，直接执行：

```bash
bash deploy/publish.sh
```

如果你想临时覆盖某个配置，也可以：

```bash
DEPLOY_SERVER=root@1.2.3.4 bash deploy/publish.sh
```

## 5. 常用排查命令

```bash
pm2 status
pm2 logs trip-planner
nginx -t
systemctl status nginx
curl -I http://127.0.0.1:5173
curl -I http://127.0.0.1
```

## 6. 绑定域名

如果有域名，将域名 A 记录解析到腾讯云服务器公网 IP，然后把 `deploy/nginx-trip-planner.conf` 里的：

```nginx
server_name _;
```

改成你的域名，例如：

```nginx
server_name example.com www.example.com;
```

再重新发布或在服务器执行：

```bash
cp deploy/nginx-trip-planner.conf /etc/nginx/sites-available/trip-planner
nginx -t
systemctl reload nginx
```
