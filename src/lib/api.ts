// 与后端Rust服务通信的API封装
import { invoke } from '@tauri-apps/api/core'

/**
 * 网关API封装
 * 提供与后端WDIC Gateway服务的通信接口
 */
export class GatewayAPI {
  /**
   * 创建新的网关实例
   * @param name 网关名称
   * @returns 网关实例ID
   */
  static async createGateway(name: string): Promise<string> {
    return await invoke('create_gateway', { name })
  }

  /**
   * 使用自定义配置创建网关实例
   * @param config 网关配置
   * @returns 网关实例ID
   */
  static async createGatewayWithConfig(config: GatewayConfig): Promise<string> {
    return await invoke('create_gateway_with_config', { config })
  }

  /**
   * 启动网关服务
   * @param gatewayId 网关实例ID
   */
  static async startGateway(gatewayId: string): Promise<void> {
    return await invoke('start_gateway', { gatewayId })
  }

  /**
   * 停止网关服务
   * @param gatewayId 网关实例ID
   */
  static async stopGateway(gatewayId: string): Promise<void> {
    return await invoke('stop_gateway', { gatewayId })
  }

  /**
   * 获取网关统计信息
   * @param gatewayId 网关实例ID
   * @returns [注册表大小, 活跃连接数]
   */
  static async getGatewayStats(gatewayId: string): Promise<[number, number]> {
    return await invoke('get_gateway_stats', { gatewayId })
  }

  /**
   * 挂载目录到网关
   * @param gatewayId 网关实例ID
   * @param name 目录别名
   * @param path 实际目录路径
   */
  static async mountDirectory(gatewayId: string, name: string, path: string): Promise<void> {
    return await invoke('mount_directory', { gatewayId, name, path })
  }

  /**
   * 广播目录搜索请求
   * @param gatewayId 网关实例ID
   * @param keywords 搜索关键词列表
   * @returns 发送的消息数量
   */
  static async broadcastDirectorySearch(gatewayId: string, keywords: string[]): Promise<number> {
    return await invoke('broadcast_directory_search', { gatewayId, keywords })
  }

  /**
   * 广播信息消息
   * @param gatewayId 网关实例ID
   * @param content 消息内容
   * @returns 发送的消息数量
   */
  static async broadcastInfoMessage(gatewayId: string, content: string): Promise<number> {
    return await invoke('broadcast_info_message', { gatewayId, content })
  }

  /**
   * 运行性能测试
   * @param gatewayId 网关实例ID
   * @param testType 测试类型
   * @param dataSize 测试数据大小
   * @returns 测试延迟
   */
  static async runPerformanceTest(gatewayId: string, testType: string, dataSize: number): Promise<number> {
    return await invoke('run_performance_test', { gatewayId, testType, dataSize })
  }
}

/**
 * UDP广播管理器API封装
 */
export class UdpBroadcastAPI {
  /**
   * 创建UDP广播管理器
   * @param localAddr 本地地址
   * @returns 管理器实例ID
   */
  static async createManager(localAddr: string): Promise<string> {
    return await invoke('create_udp_manager', { localAddr })
  }

  /**
   * 广播令牌到网络
   * @param managerId 管理器实例ID
   * @param token 令牌数据
   * @returns 发送的消息数量
   */
  static async broadcastToken(managerId: string, token: UdpToken): Promise<number> {
    return await invoke('broadcast_token', { managerId, token })
  }

  /**
   * 向指定地址发送令牌
   * @param managerId 管理器实例ID
   * @param token 令牌数据
   * @param target 目标地址
   */
  static async sendTokenTo(managerId: string, token: UdpToken, target: string): Promise<void> {
    return await invoke('send_token_to', { managerId, token, target })
  }

  /**
   * 挂载目录并生成索引
   * @param managerId 管理器实例ID
   * @param name 目录别名
   * @param path 目录路径
   */
  static async mountDirectory(managerId: string, name: string, path: string): Promise<void> {
    return await invoke('udp_mount_directory', { managerId, name, path })
  }

  /**
   * 在已挂载的目录中搜索文件
   * @param managerId 管理器实例ID
   * @param keywords 搜索关键词
   * @returns 匹配的文件路径列表
   */
  static async searchFiles(managerId: string, keywords: string[]): Promise<string[]> {
    return await invoke('search_files', { managerId, keywords })
  }
}

/**
 * 目录索引API封装
 */
export class DirectoryIndexAPI {
  /**
   * 生成指定路径的目录索引
   * @param path 目录路径
   * @returns 索引数据
   */
  static async generateIndex(path: string): Promise<DirectoryIndex> {
    return await invoke('generate_index', { path })
  }

  /**
   * 将索引保存到二进制文件
   * @param index 索引数据
   * @param filePath 文件路径
   */
  static async saveIndexToFile(index: DirectoryIndex, filePath: string): Promise<void> {
    return await invoke('save_index_to_file', { index, filePath })
  }

  /**
   * 从二进制文件加载索引
   * @param filePath 文件路径
   * @returns 索引数据
   */
  static async loadIndexFromFile(filePath: string): Promise<DirectoryIndex> {
    return await invoke('load_index_from_file', { filePath })
  }

  /**
   * 搜索匹配关键词的文件
   * @param index 索引数据
   * @param keywords 搜索关键词
   * @returns 匹配的文件路径列表
   */
  static async searchInIndex(index: DirectoryIndex, keywords: string[]): Promise<string[]> {
    return await invoke('search_in_index', { index, keywords })
  }
}

/**
 * 注册表管理API封装
 */
export class RegistryAPI {
  /**
   * 创建新的注册表
   * @param name 网关名称
   * @param address 网关地址
   * @returns 注册表实例ID
   */
  static async createRegistry(name: string, address: string): Promise<string> {
    return await invoke('create_registry', { name, address })
  }

  /**
   * 添加或更新网关条目
   * @param registryId 注册表实例ID
   * @param entry 注册表条目
   */
  static async addOrUpdateEntry(registryId: string, entry: RegistryEntry): Promise<void> {
    return await invoke('add_or_update_entry', { registryId, entry })
  }

  /**
   * 获取所有注册的网关条目
   * @param registryId 注册表实例ID
   * @returns 注册表条目列表
   */
  static async getAllEntries(registryId: string): Promise<RegistryEntry[]> {
    return await invoke('get_all_entries', { registryId })
  }

  /**
   * 根据地址获取网关条目
   * @param registryId 注册表实例ID
   * @param address 网关地址
   * @returns 注册表条目
   */
  static async getEntryByAddress(registryId: string, address: string): Promise<RegistryEntry | null> {
    return await invoke('get_entry_by_address', { registryId, address })
  }

  /**
   * 移除指定地址的网关条目
   * @param registryId 注册表实例ID
   * @param address 网关地址
   * @returns 是否成功移除
   */
  static async removeEntry(registryId: string, address: string): Promise<boolean> {
    return await invoke('remove_entry', { registryId, address })
  }

  /**
   * 清理过期的网关条目
   * @param registryId 注册表实例ID
   * @param timeoutSeconds 超时时间（秒）
   * @returns 清理的条目数量
   */
  static async cleanupExpiredEntries(registryId: string, timeoutSeconds: number): Promise<number> {
    return await invoke('cleanup_expired_entries', { registryId, timeoutSeconds })
  }
}

/**
 * 性能监控API封装
 */
export class PerformanceMonitorAPI {
  /**
   * 创建性能监控器
   * @returns 监控器实例ID
   */
  static async createMonitor(): Promise<string> {
    return await invoke('create_performance_monitor')
  }

  /**
   * 记录操作延迟
   * @param monitorId 监控器实例ID
   * @param operation 操作名称
   * @param latency 延迟（毫秒）
   */
  static async recordLatency(monitorId: string, operation: string, latency: number): Promise<void> {
    return await invoke('record_latency', { monitorId, operation, latency })
  }

  /**
   * 记录吞吐量
   * @param monitorId 监控器实例ID
   * @param operation 操作名称
   * @param bytesPerSecond 每秒字节数
   */
  static async recordThroughput(monitorId: string, operation: string, bytesPerSecond: number): Promise<void> {
    return await invoke('record_throughput', { monitorId, operation, bytesPerSecond })
  }

  /**
   * 生成性能报告
   * @param monitorId 监控器实例ID
   * @returns 性能报告
   */
  static async generateReport(monitorId: string): Promise<string> {
    return await invoke('generate_report', { monitorId })
  }
}

// 数据类型定义
export interface GatewayConfig {
  name: string
  port: number
  broadcastInterval: number
  heartbeatInterval: number
  connectionTimeout: number
  registryCleanupInterval: number
}

export type UdpToken
  = | { type: 'DirectorySearch', searcherId: string, keywords: string[], searchId: string }
    | { type: 'DirectorySearchResponse', responderId: string, searchId: string, results: string[] }
    | { type: 'FileRequest', requesterId: string, filePath: string, requestId: string }
    | { type: 'FileResponse', responderId: string, requestId: string, fileData: string, fileName: string }
    | { type: 'InfoMessage', senderId: string, content: string, messageId: string }
    | { type: 'PerformanceTest', testerId: string, testType: string, dataSize: number, startTime: number }

export interface DirectoryIndex {
  path: string
  files: string[]
  subdirectories: DirectoryIndex[]
}

export interface RegistryEntry {
  id: string
  name: string
  address: string
  lastSeen: number // Unix timestamp
}
