# 开发笔记

## 项目结构

```
src/
├── assets/           # 静态资源
├── components/       # 公共组件
├── i18n/             # 国际化配置
├── lib/              # 工具库和配置
├── pages/            # 页面组件
├── router/           # 路由配置
├── stores/           # 状态管理
├── App.vue           # 根组件
├── main.ts           # 入口文件
src-tauri/
├── capabilities/     # Tauri 权限配置
├── src/              # Rust 源码
├── Cargo.toml        # Rust 依赖配置
├── tauri.conf.json   # Tauri 配置
```

## 开发任务清单

### 已完成

- [x] 项目初始化和基本架构搭建
- [x] 国际化支持配置 (Vue I18n)
- [x] 主题切换功能实现
- [x] 首页和设置页面创建
- [x] 接收文件页面初版实现
- [x] 侧边栏导航配置
- [x] 文件传输状态页面创建

### 待办事项

- [ ] 实现局域网设备发现功能
- [ ] 开发文件发送功能页面
- [ ] 实现文件传输核心功能
- [ ] 添加文件传输状态管理
- [ ] 实现系统托盘功能
- [ ] 添加传输历史记录功能
- [ ] 实现传输速度显示
- [ ] 添加文件校验功能

## 组件开发规范

1. 所有组件使用 `<script setup lang="ts">` 语法
2. 组件命名使用 PascalCase
3. 组件文件名与组件名保持一致
4. 使用 Tailwind CSS 进行样式设计
5. 国际化文本使用 `useI18n` 钩子

## 国际化规范

1. 所有显示文本需要支持国际化
2. 翻译内容分别维护在 `src/i18n/locales/` 目录下的对应 JSON 文件中
3. 中文为默认语言
4. 添加新页面时需要同时更新所有语言包

## 技术要点

### Tauri 集成

- 使用 Tauri v2 版本
- 通过插件扩展功能（Store、Log 等）
- 权限管理通过 capabilities 配置

### 状态管理

- 使用 Pinia 进行状态管理
- 设置相关的状态保存在 settings store 中

### 样式设计

- 使用 Tailwind CSS v4
- 遵循 Shadcn Vue 组件设计规范
- 支持深色和浅色主题

## 演示数据和占位符

### 接收文件页面 (src/pages/receive.vue)

1. **设备名称占位符**：
   - 位置：页面中的设备信息区域
   - 当前文本：`{{ t('receive.deviceNamePlaceholder') }}`
   - 对应翻译：zh.json 中的 "设备名称将在此显示"，en.json 中的 "Device name will be displayed here"
   - 后端对接：需要替换为实际的设备名称，来自系统信息

2. **设备IP占位符**：
   - 位置：页面中的设备信息区域
   - 当前文本：`{{ t('receive.deviceIpPlaceholder') }}`
   - 对应翻译：zh.json 中的 "设备IP将在此显示"，en.json 中的 "Device IP will be displayed here"
   - 后端对接：需要替换为实际的设备IP地址，通过网络接口获取

### 文件传输状态页面 (src/pages/receive-progress.vue)

1. **发送端信息占位符**：
   - 位置：页面中的发送端信息区域
   - 当前文本：`{{ t('receiveProgress.senderInfo.namePlaceholder') }}` 和 `{{ t('receiveProgress.senderInfo.ipPlaceholder') }}`
   - 对应翻译：zh.json 中的 "发送端名称将在此显示" 和 "发送端IP将在此显示"，en.json 中的 "Sender device name will be displayed here" 和 "Sender device IP will be displayed here"
   - 后端对接：需要替换为实际的发送端设备名称和IP地址

2. **文件列表数据**：
   - 位置：页面中的文件列表区域
   - 当前数据：在 `fileList` 数组中包含3个模拟文件对象
   - 后端对接：需要替换为从后端获取的实际文件列表数据

3. **总体进度数据**：
   - 位置：页面中的总体进度区域
   - 当前数据：`totalProgress` 变量设置为 35
   - 后端对接：需要替换为从后端获取的实际传输进度数据

4. **文件进度数据**：
   - 位置：文件列表中每个文件的进度条
   - 当前数据：每个文件对象中的 `progress` 属性
   - 后端对接：需要替换为从后端获取的各文件实际传输进度

### 国际化占位符

所有页面标题和描述文本当前都通过 `useI18n` 的 `t()` 函数获取，这些不是演示数据，是完整的国际化实现，无需替换。

## 常见问题及解决方案

### 开发环境问题

1. Rust 环境配置
2. 依赖安装问题
3. 平台特定的构建问题

### 调试技巧

1. 使用 Tauri DevTools 进行调试
2. 查看控制台日志
3. 使用 Rust 日志系统

## 版本更新记录

### v0.1.0

- 基础框架搭建
- 国际化支持
- 主题切换
- 基本页面结构
