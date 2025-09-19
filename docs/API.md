# WDIC 网关 API 文档

本文档详细说明了 WDIC 网关的所有后端接口，以及如何从前端通过 Tauri IPC 机制调用这些接口。

## 通信机制

前后端通信基于 Tauri IPC 机制，通过 `invoke` 函数直接调用后端 Rust 命令。这种方式避免了网络开销，提升了性能和安全性。

## 调用模式

所有调用均为异步操作，需使用 async/await 或 Promise 处理异常和执行顺序；不使用 GET/POST 等 HTTP 方法。

## 接口列表

### 1. 网关核心功能接口 (Gateway API)

#### 1.1 start_gateway

启动网关服务

**前端调用方式:**

```typescript
import { invoke } from '@tauri-apps/api/core'

await invoke('start_gateway', { config: gatewayConfig })
```

**参数:**

- `config`: GatewayConfig - 网关配置对象

**返回值:**

- `Promise<void>` - 成功时无返回值，失败时抛出错误

#### 1.2 stop_gateway

停止网关服务

**前端调用方式:**

```typescript
const result = await invoke('stop_gateway')
```

**参数:**

- 无

**返回值:**

- `Promise<string>` - 操作结果描述

#### 1.3 restart_gateway

重启网关服务

**前端调用方式:**

```typescript
await invoke('restart_gateway', { config: gatewayConfig })
```

**参数:**

- `config`: GatewayConfig (可选) - 新的网关配置对象

**返回值:**

- `Promise<void>` - 成功时无返回值，失败时抛出错误

#### 1.4 get_gateway_status

获取网关状态

**前端调用方式:**

```typescript
const status = await invoke('get_gateway_status')
```

**参数:**

- 无

**返回值:**

- `Promise<GatewayStatus>` - 网关状态对象

**GatewayStatus 格式:**

```typescript
{
  is_running: boolean,        // 是否运行中
  start_time: string | null,  // 启动时间 (ISO 8601格式)
  config: GatewayConfig | null, // 当前配置
  active_connections: number, // 活跃连接数
  total_requests: number,     // 总请求数
  error_count: number,        // 错误数量
  uptime_seconds: number      // 运行时长（秒）
}
```

### 2. 配置管理接口 (Configuration API)

#### 2.1 get_gateway_config

获取网关配置

**前端调用方式:**

```typescript
const config = await invoke('get_gateway_config')
```

**参数:**

- 无

**返回值:**

- `Promise<GatewayConfig>` - 网关配置对象

**GatewayConfig 格式:**

```typescript
{
  name: string,               // 网关名称
  port: number,               // 监听端口
  broadcast_interval: number, // 广播间隔（秒）
  heartbeat_interval: number, // 心跳间隔（秒）
  connection_timeout: number, // 连接超时（秒）
  registry_cleanup_interval: number // 注册表清理间隔（秒）
}
```

#### 2.2 update_gateway_config

更新网关配置

**前端调用方式:**

```typescript
await invoke('update_gateway_config', { config: newConfig })
```

**参数:**

- `config`: GatewayConfig - 新的网关配置对象

**返回值:**

- `Promise<void>` - 成功时无返回值，失败时抛出错误

### 3. 目录和文件操作接口 (Directory API)

#### 3.1 mount_directory

挂载目录

**前端调用方式:**

```typescript
await invoke('mount_directory', { name: 'shared', path: '/path/to/directory' })
```

**参数:**

- `name`: string - 挂载点名称
- `path`: string - 本地目录路径

**返回值:**

- `Promise<void>` - 成功时无返回值，失败时抛出错误

#### 3.2 unmount_directory

卸载目录

**前端调用方式:**

```typescript
await invoke('unmount_directory', { name: 'shared' })
```

**参数:**

- `name`: string - 挂载点名称

**返回值:**

- `Promise<void>` - 成功时无返回值，失败时抛出错误

#### 3.3 list_mounted_directories

列出已挂载目录

**前端调用方式:**

```typescript
const directories = await invoke('list_mounted_directories')
```

**参数:**

- 无

**返回值:**

- `Promise<MountPoint[]>` - 挂载点数组

**MountPoint 格式:**

```typescript
{
  id: string,          // 挂载点 ID
  local_path: string,  // 本地路径
  mount_name: string,  // 挂载名称
  read_only: boolean,  // 是否只读
  mount_time: string,  // 挂载时间 (ISO 8601格式)
  file_count: number,  // 文件数量
  total_size: number   // 总大小（字节）
}
```

### 4. 网络通信接口 (Network API)

#### 4.1 get_network_status

获取网络状态

**前端调用方式:**

```typescript
const status = await invoke('get_network_status')
```

**参数:**

- 无

**返回值:**

- `Promise<NetworkStatus>` - 网络状态对象

**NetworkStatus 格式:**

```typescript
{
  local_ip: string,              // 本地 IP 地址
  listen_port: number,           // 监听端口
  network_interfaces: NetworkInterface[], // 网络接口列表
  p2p_discovery_enabled: boolean, // P2P 发现是否启用
  discovered_nodes: number       // 已发现节点数量
}
```

**NetworkInterface 格式:**

```typescript
{
  name: string,        // 接口名称
  ip_address: string,  // IP 地址
  is_active: boolean,  // 是否活跃
  interface_type: string // 接口类型
}
```

#### 4.2 get_network_interfaces

获取网络接口列表

**前端调用方式:**

```typescript
const interfaces = await invoke('get_network_interfaces')
```

**参数:**

- 无

**返回值:**

- `Promise<NetworkInterface[]>` - 网络接口数组

### 5. 性能监控接口 (Performance API)

#### 5.1 get_performance_report

获取性能报告

**前端调用方式:**

```typescript
const report = await invoke('get_performance_report')
```

**参数:**

- 无

**返回值:**

- `Promise<PerformanceReport>` - 性能报告对象

**PerformanceReport 格式:**

```typescript
{
  current_connections: number, // 当前连接数
  total_requests: number,      // 总请求数
  error_count: number,         // 错误数量
  uptime_seconds: number,      // 运行时长（秒）
  avg_response_time: number,   // 平均响应时间（毫秒）
  total_data_transferred: number, // 总数据传输量（字节）
  current_throughput: number   // 当前吞吐量（字节/秒）
}
```

### 6. 缓存管理接口 (Cache API)

#### 6.1 get_cache_stats

获取缓存统计信息

**前端调用方式:**

```typescript
const stats = await invoke('get_cache_stats')
```

**参数:**

- 无

**返回值:**

- `Promise<CacheStats>` - 缓存统计信息对象

**CacheStats 格式:**

```typescript
{
  item_count: number,     // 缓存项数量
  hit_count: number,      // 命中次数
  miss_count: number,     // 未命中次数
  hit_rate: number,       // 命中率
  memory_usage: number,   // 内存使用（字节）
  max_capacity: number    // 最大容量（字节）
}
```

#### 6.2 clear_cache

清空缓存

**前端调用方式:**

```typescript
const result = await invoke('clear_cache')
```

**参数:**

- 无

**返回值:**

- `Promise<string>` - 操作结果描述

### 7. 安全管理接口 (Security API)

#### 7.1 get_security_config

获取安全配置

**前端调用方式:**

```typescript
const config = await invoke('get_security_config')
```

**参数:**

- 无

**返回值:**

- `Promise<SecurityConfig>` - 安全配置对象

**SecurityConfig 格式:**

```typescript
{
  tls_enabled: boolean,          // 是否启用 TLS
  cert_path: string | null,      // 证书路径
  key_path: string | null,       // 私钥路径
  ca_cert_path: string | null,   // CA 证书路径
  verify_client_cert: boolean,   // 是否验证客户端证书
  allowed_clients: string[],     // 允许的客户端列表
  access_control_rules: AccessRule[] // 访问控制规则列表
}
```

**AccessRule 格式:**

```typescript
{
  id: string,           // 规则 ID
  name: string,         // 规则名称
  client: string,       // 客户端 IP 或主机名
  allowed_paths: string[], // 允许的路径
  permissions: string[],   // 权限（read, write, admin）
  enabled: boolean      // 是否启用
}
```

#### 7.2 update_security_config

更新安全配置

**前端调用方式:**

```typescript
await invoke('update_security_config', { config: newSecurityConfig })
```

**参数:**

- `config`: SecurityConfig - 新的安全配置对象

**返回值:**

- `Promise<void>` - 成功时无返回值，失败时抛出错误

### 8. 注册表管理接口 (Registry API)

#### 8.1 get_registry_entries

获取注册表条目列表

**前端调用方式:**

```typescript
const entries = await invoke('get_registry_entries')
```

**参数:**

- 无

**返回值:**

- `Promise<RegistryEntry[]>` - 注册表条目数组

**RegistryEntry 格式:**

```typescript
{
  id: string,        // 条目 ID
  name: string,      // 网关名称
  address: string,   // 网络地址
  last_seen: number  // 最后发现时间（Unix 时间戳）
}
```

#### 8.2 add_registry_entry

添加注册表条目

**前端调用方式:**

```typescript
await invoke('add_registry_entry', { entry: newEntry })
```

**参数:**

- `entry`: RegistryEntry - 新的注册表条目对象

**返回值:**

- `Promise<void>` - 成功时无返回值，失败时抛出错误

#### 8.3 remove_registry_entry

移除注册表条目

**前端调用方式:**

```typescript
await invoke('remove_registry_entry', { id: entryId })
```

**参数:**

- `id`: string - 要移除的条目 ID

**返回值:**

- `Promise<void>` - 成功时无返回值，失败时抛出错误

### 9. 自动启动接口 (Autostart API)

#### 9.1 change_autostart

更改开机自启动状态

**前端调用方式:**

```typescript
await invoke('change_autostart', { open: true })
```

**参数:**

- `open`: boolean - 是否启用开机自启动

**返回值:**

- `Promise<void>` - 成功时无返回值，失败时抛出错误
