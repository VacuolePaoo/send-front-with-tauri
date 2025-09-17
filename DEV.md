# 开发文档 (Development Documentation)

## 项目结构

```
gui/
├── src/
│   ├── assets/           # 静态资源
│   ├── components/       # 组件
│   ├── i18n/             # 国际化
│   ├── lib/              # 工具库和API封装
│   ├── pages/            # 页面组件
│   ├── router/           # 路由配置
│   ├── stores/           # 状态管理
│   └── App.vue           # 根组件
└── src-tauri/            # Tauri后端代码
```

## API封装

### 已添加API封装

1. **GatewayAPI** - 网关核心功能API
   - createGateway(name: string): Promise<string>
   - createGatewayWithConfig(config: GatewayConfig): Promise<string>
   - startGateway(gatewayId: string): Promise<void>
   - stopGateway(gatewayId: string): Promise<void>
   - getGatewayStats(gatewayId: string): Promise<[number, number]>
   - mountDirectory(gatewayId: string, name: string, path: string): Promise<void>
   - broadcastDirectorySearch(gatewayId: string, keywords: string[]): Promise<number>
   - broadcastInfoMessage(gatewayId: string, content: string): Promise<number>
   - runPerformanceTest(gatewayId: string, testType: string, dataSize: number): Promise<number>

2. **UdpBroadcastAPI** - UDP广播功能API
   - createManager(localAddr: string): Promise<string>
   - broadcastToken(managerId: string, token: UdpToken): Promise<number>
   - sendTokenTo(managerId: string, token: UdpToken, target: string): Promise<void>
   - mountDirectory(managerId: string, name: string, path: string): Promise<void>
   - searchFiles(managerId: string, keywords: string[]): Promise<string[]>

3. **DirectoryIndexAPI** - 目录索引功能API
   - generateIndex(path: string): Promise<DirectoryIndex>
   - saveIndexToFile(index: DirectoryIndex, filePath: string): Promise<void>
   - loadIndexFromFile(filePath: string): Promise<DirectoryIndex>
   - searchInIndex(index: DirectoryIndex, keywords: string[]): Promise<string[]>

4. **RegistryAPI** - 注册表管理API
   - createRegistry(name: string, address: string): Promise<string>
   - addOrUpdateEntry(registryId: string, entry: RegistryEntry): Promise<void>
   - getAllEntries(registryId: string): Promise<RegistryEntry[]>
   - getEntryByAddress(registryId: string, address: string): Promise<RegistryEntry | null>
   - removeEntry(registryId: string, address: string): Promise<boolean>
   - cleanupExpiredEntries(registryId: string, timeoutSeconds: number): Promise<number>

5. **PerformanceMonitorAPI** - 性能监控API
   - createMonitor(): Promise<string>
   - recordLatency(monitorId: string, operation: string, latency: number): Promise<void>
   - recordThroughput(monitorId: string, operation: string, bytesPerSecond: number): Promise<void>
   - generateReport(monitorId: string): Promise<string>

### 已添加React Hooks风格封装

1. **useGateway** - 网关Hook
2. **useUdpBroadcast** - UDP广播Hook
3. **useRegistry** - 注册表Hook
4. **usePerformanceMonitor** - 性能监控Hook

## 国际化

### 语言文件

- `zh.json` - 中文语言包
- `en.json` - 英文语言包

### 使用方法

```vue
<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <h1>{{ t('home.label') }}</h1>
</template>
```

## 组件库

使用 [shadcn-vue](https://www.shadcn-vue.com/) 组件库，基于 [Radix Vue](https://www.radix-vue.com/) 和 [Tailwind CSS](https://tailwindcss.com/)。

### 已安装组件

- Accordion
- Alert
- AlertDialog
- AspectRatio
- AutoForm
- Avatar
- Badge
- Breadcrumb
- Button
- Calendar
- Card
- Carousel
- Chart
- Checkbox
- Collapsible
- Combobox
- Command
- ContextMenu
- Dialog
- Drawer
- DropdownMenu
- Form
- HoverCard
- Input
- Label
- Menubar
- NavigationMenu
- NumberField
- Pagination
- PinInput
- Popover
- Progress
- RadioGroup
- RangeCalendar
- Resizable
- ScrollArea
- Select
- Separator
- Sheet
- Sidebar
- Skeleton
- Slider
- Sonner
- Stepper
- Switch
- Table
- Tabs
- TagsInput
- Textarea
- Toggle
- ToggleGroup
- Tooltip

## 路由

路由配置在 `src/router/index.ts` 文件中。

### 当前路由

- `/` - 首页（接收文件）
- `/send` - 发送文件
- `/settings` - 设置
- `/dev` - 开发工具

## 状态管理

使用 [Pinia](https://pinia.vuejs.org/) 进行状态管理。

### 当前Store

- `settings` - 应用设置

## 样式

使用 [Tailwind CSS](https://tailwindcss.com/) 进行样式设计。

### 主题

- light - 浅色主题
- dark - 深色主题
