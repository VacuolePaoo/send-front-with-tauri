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

### 5. 发送页面文件图标映射功能

- **功能描述**
  - 为发送页面的文件列表添加了文件类型图标与格式映射功能，根据文件扩展名显示对应类型的图标，提高用户体验和文件类型识别度。

- **实现细节**
  - 创建了 `src/lib/file-icons.ts` 文件，定义了文件类型图标映射逻辑
  - 支持多种常见文件格式，包括：
    - 文档文件 (doc, docx, pdf, txt等)
    - 表格文件 (xls, xlsx, csv等)
    - 演示文稿 (ppt, pptx等)
    - 图片文件 (jpg, png, gif, svg等)
    - 音视频文件 (mp3, mp4, avi等)
    - 压缩文件 (zip, rar, 7z等)
    - 代码文件 (js, ts, html, css, vue等)
    - 可执行文件 (exe, app等)
    - 数据库文件 (db, sqlite等)
  - 为每种文件类型提供了专门的图标和颜色
  - 修改了 `src/pages/send.vue` 页面，使用新的图标映射功能

- **文件变更**
  - 新增: `src/lib/file-icons.ts` - 文件图标映射逻辑
  - 修改: `src/pages/send.vue` - 使用文件图标映射功能

- **图标映射规则**
  - 文件夹使用黄色文件夹图标
  - 文本内容使用蓝色对话图标
  - 其他文件根据扩展名匹配对应图标和颜色
  - 未匹配到的文件使用默认灰色文件图标
