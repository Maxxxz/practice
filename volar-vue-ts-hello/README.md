# Vue + TypeScript Hello World (Volar)

基于 [volarjs/starter](https://github.com/volarjs/starter) 模板搭建的 Vue 3 + TypeScript 语言工具与 Hello World 示例项目。

## 项目结构

```
├── packages/
│   ├── language-server/   # Volar 语言服务（解析 .vue SFC）
│   └── vscode/            # VS Code 扩展
└── sample/                # Vue 3 + TS Hello World 示例应用
```

## 功能

- **Volar 语言服务**：为 `.vue` 单文件组件提供 HTML / CSS / TypeScript 嵌入式语言支持
- **Hello World 示例**：点击 "Hello World" 文字弹出 tips 提示框

## 快速开始

### 1. 安装依赖

```bash
pnpm install
cd sample && npm install
```

### 2. 运行 Hello World 示例（浏览器）

```bash
cd sample
npm run dev
```

打开浏览器访问显示的地址，点击 **Hello World** 即可看到 tips 弹窗。

### 3. 调试 Volar 语言扩展（VS Code）

1. 在根目录执行 `pnpm install`
2. 用 VS Code 打开本文件夹
3. 按 `Ctrl+Shift+B` 编译扩展
4. 切换到 Debug 视图，选择 `Launch Client` 并运行
5. 在 Extension Development Host 中打开 `sample/src/components/HelloWorld.vue` 体验智能提示

## 打包 .vsix

```bash
pnpm run pack
```

生成 `packages/vscode/vscode-vue-hello-0.0.1.vsix`，可手动安装到 VS Code。

## 参考

- [Volar Starter](https://github.com/volarjs/starter)
- [VS Code Embedded Languages](https://code.visualstudio.com/api/language-extensions/embedded-languages)
