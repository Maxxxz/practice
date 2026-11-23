#!/usr/bin/env bash
#
# 将 Node.js 更新到 22.x 最新稳定版
# 用法: bash update-node-22.sh
#       或: chmod +x update-node-22.sh && ./update-node-22.sh
#
set -euo pipefail

NODE_MAJOR=22

log()  { printf '\033[1;32m==>\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m!!>\033[0m %s\n' "$*" >&2; }
die()  { printf '\033[1;31mERR>\033[0m %s\n' "$*" >&2; exit 1; }

verify_node() {
  local version
  version="$(node -v 2>/dev/null || true)"
  [[ "$version" =~ ^v${NODE_MAJOR}\. ]] || die "当前 Node 版本不符合预期: ${version:-未安装}"
  log "Node  $(node -v)"
  log "npm   $(npm -v)"
}

# --- nvm ---
load_nvm() {
  export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
  [[ -s "$NVM_DIR/nvm.sh" ]] && source "$NVM_DIR/nvm.sh"
}

install_nvm() {
  log "未检测到 nvm，正在安装..."
  curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
  load_nvm
  command -v nvm &>/dev/null || die "nvm 安装失败"
}

update_with_nvm() {
  load_nvm
  if ! command -v nvm &>/dev/null; then
    install_nvm
  fi

  log "使用 nvm 安装 Node ${NODE_MAJOR} 最新稳定版..."
  nvm install "${NODE_MAJOR}" --latest-npm
  nvm alias default "${NODE_MAJOR}"
  nvm use "${NODE_MAJOR}"
}

# --- fnm ---
update_with_fnm() {
  log "使用 fnm 安装 Node ${NODE_MAJOR} 最新稳定版..."
  fnm install "${NODE_MAJOR}" --latest
  fnm default "${NODE_MAJOR}"
  fnm use "${NODE_MAJOR}"
}

# --- n ---
update_with_n() {
  log "使用 n 安装 Node ${NODE_MAJOR} 最新稳定版..."
  if [[ "$(id -u)" -ne 0 ]]; then
    sudo n "${NODE_MAJOR}"
  else
    n "${NODE_MAJOR}"
  fi
}

# --- Homebrew (macOS) ---
update_with_brew() {
  log "使用 Homebrew 安装 node@${NODE_MAJOR}..."
  brew update
  brew install "node@${NODE_MAJOR}" || brew upgrade "node@${NODE_MAJOR}"

  local brew_prefix
  brew_prefix="$(brew --prefix "node@${NODE_MAJOR}")"
  local brew_bin="${brew_prefix}/bin"

  if [[ ":$PATH:" != *":${brew_bin}:"* ]]; then
    warn "请将以下内容加入 ~/.zshrc 或 ~/.bashrc："
    echo "  export PATH=\"${brew_bin}:\$PATH\""
    export PATH="${brew_bin}:$PATH"
  fi

  # 若存在通用 node formula 且版本不对，提示 unlink
  if brew list node &>/dev/null; then
    warn "检测到 brew 的 node formula，可能与 node@${NODE_MAJOR} 冲突。"
    warn "如需切换，可执行: brew unlink node && brew link --overwrite --force node@${NODE_MAJOR}"
  fi
}

# --- NodeSource (Linux apt) ---
update_with_nodesource() {
  command -v apt-get &>/dev/null || die "当前系统不支持 NodeSource 安装方式"

  log "使用 NodeSource 安装 Node ${NODE_MAJOR}.x..."
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | sudo -E bash -
  sudo apt-get install -y nodejs
}

pick_method() {
  load_nvm
  if command -v nvm &>/dev/null; then
    echo nvm
  elif command -v fnm &>/dev/null; then
    echo fnm
  elif command -v n &>/dev/null; then
    echo n
  elif [[ "$(uname -s)" == "Darwin" ]] && command -v brew &>/dev/null; then
    echo brew
  elif [[ -f /etc/debian_version ]] && command -v curl &>/dev/null; then
    echo nodesource
  else
    echo nvm
  fi
}

main() {
  log "目标: Node.js ${NODE_MAJOR}.x 最新稳定版"

  local method
  method="$(pick_method)"
  log "检测到安装方式: ${method}"

  case "$method" in
    nvm)        update_with_nvm ;;
    fnm)        update_with_fnm ;;
    n)          update_with_n ;;
    brew)       update_with_brew ;;
    nodesource) update_with_nodesource ;;
    *)          die "未知安装方式: ${method}" ;;
  esac

  verify_node
  log "完成！"
}

main "$@"
