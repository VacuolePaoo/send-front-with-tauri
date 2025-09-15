# Send Front

一个基于 Tauri v2 和 Vue.js 3 的跨平台局域网文件传输桌面应用程序。

## 简介

Send Front 是一个简洁、高效的局域网文件传输工具，允许用户在本地网络中的设备之间快速传输文件。该应用程序提供了直观的用户界面，支持多种文件类型传输，并确保传输过程的安全性。

## 功能特性

- 局域网文件传输
- 跨平台支持（Windows、macOS、Linux）
- 直观的用户界面
- 多语言支持（中/英文）
- 深色/浅色主题切换
- 设备发现与连接

## 技术栈

- 前端：Vue.js 3, TypeScript, Tailwind CSS v4
- UI 组件库：Shadcn Vue
- 桌面应用框架：Tauri v2
- 国际化：Vue I18n
- 状态管理：Pinia
- 构建工具：Vite, pnpm

## 开发

### 环境要求

- Node.js 18+
- pnpm
- Rust

### 安装依赖

```bash
pnpm install
```

### 本地开发

```bash
pnpm tauri dev
```

### 构建应用

```bash
pnpm tauri build
```

## 许可证

[MIT License](./LICENSE.md)
