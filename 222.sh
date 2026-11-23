#!/usr/bin/env bash
set -e
echo "=== 切换 Node 22 ==="
npm install -g n
n 22
# 让 n 安装的 node 优先生效
export PATH="/usr/local/bin:$PATH"
hash -r
echo "Node: $(node -v) ($(which node))"
node -v | grep -q '^v22\.' || { echo "Node 切换失败"; exit 1; }
# 全局 npm bin 也要进 PATH
export PATH="$(npm prefix -g)/bin:$PATH"
echo "=== 安装依赖 ==="
npm install -g @tencent/mcporter-internal
npm install -g codebase-memory-mcp@0.8.1
echo "mcporter-internal: $(command -v mcporter-internal)"
mcporter-internal --version 2>/dev/null || true
echo "完成"