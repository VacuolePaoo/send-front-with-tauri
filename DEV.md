# 页面与后端接口对接需求

### 0. 窗口配置

- **窗口最小尺寸限制**
  - 说明：为避免窗口过小导致内容显示不完整，已配置窗口最小尺寸
  - 配置：最小宽度800px，最小高度600px
  - 文件：`src-tauri/tauri.conf.json`

---

### 1. 发送文件页面（src/pages/send.vue）

- **设备列表接口**
  - 说明：获取当前局域网内可用的设备列表。
  - 需求：替换前端模拟的 `devices` 数组。
  - 返回字段：`id`, `name`, `ip`, `status`
  - 建议接口：`GET /api/devices`

- **文件/文件夹选择与发送接口**
  - 说明：将选中的文件/文件夹/文本发送到指定设备。
  - 需求：点击“发送”按钮时，调用后端接口进行实际传输。
  - 建议接口：`POST /api/send`，参数包括目标设备ID、文件/文件夹/文本内容等。

---

### 2. 接收文件页面（src/pages/receive.vue）

- **本机设备信息接口**
  - 说明：获取本机设备名称和IP，显示在页面上。
  - 需求：替换 `{{ t('receive.deviceNamePlaceholder') }}` 和 `{{ t('receive.deviceIpPlaceholder') }}`
  - 建议接口：`GET /api/device-info`

---

### 3. 文件传输状态页面（src/pages/receive-progress.vue）

- **发送端/接收端设备信息接口**
  - 说明：获取当前传输会话中，发送端和接收端的设备名称与IP。
  - 需求：替换 `senderInfo` 和 `receiverInfo` 的占位符。
  - 建议接口：`GET /api/transfer/session-info`

- **文件列表与进度接口**
  - 说明：获取当前正在传输的文件列表及每个文件的进度。
  - 需求：替换 `fileList` 数组和每个文件的 `progress` 字段。
  - 建议接口：`GET /api/transfer/files`，返回每个文件的 `id`, `name`, `size`, `type`, `progress`

- **总体进度接口**
  - 说明：获取所有文件的总体传输进度。
  - 需求：替换页面底部进度条的进度值。
  - 建议接口：可与上面接口合并，或单独 `GET /api/transfer/progress`

- **操作类接口**
  - 说明：取消单个文件/全部文件的传输、全部接收等。
  - 建议接口：
    - 取消单个文件：`POST /api/transfer/cancel-file`
    - 取消全部：`POST /api/transfer/cancel-all`
    - 全部接收：`POST /api/transfer/accept-all`

---

### 4. 设置页面（src/pages/settings.vue）

- **语言/主题设置**
  - 目前为本地存储，无需后端接口，除非有云同步需求。

---
