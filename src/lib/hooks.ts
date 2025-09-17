// React Hooks风格的API封装
import type { Ref } from 'vue'
import type { GatewayConfig, RegistryEntry, UdpToken } from './api'
import { ref, watch } from 'vue'
import { GatewayAPI, PerformanceMonitorAPI, RegistryAPI, UdpBroadcastAPI } from './api'

/**
 * 网关Hook
 * @param name 网关名称
 * @returns 网关相关状态和方法
 */
export function useGateway(name?: string) {
  const gatewayId: Ref<string | null> = ref(null)
  const isRunning: Ref<boolean> = ref(false)
  const stats: Ref<[number, number] | null> = ref(null)
  const error: Ref<string | null> = ref(null)

  // 创建网关
  const create = async (gatewayName: string) => {
    try {
      error.value = null
      gatewayId.value = await GatewayAPI.createGateway(gatewayName)
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create gateway'
    }
  }

  // 使用配置创建网关
  const createWithConfig = async (config: GatewayConfig) => {
    try {
      error.value = null
      gatewayId.value = await GatewayAPI.createGatewayWithConfig(config)
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create gateway with config'
    }
  }

  // 启动网关
  const start = async () => {
    if (!gatewayId.value) {
      error.value = 'Gateway not created'
      return
    }

    try {
      error.value = null
      await GatewayAPI.startGateway(gatewayId.value)
      isRunning.value = true
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to start gateway'
    }
  }

  // 停止网关
  const stop = async () => {
    if (!gatewayId.value) {
      error.value = 'Gateway not created'
      return
    }

    try {
      error.value = null
      await GatewayAPI.stopGateway(gatewayId.value)
      isRunning.value = false
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to stop gateway'
    }
  }

  // 获取统计信息
  const getStats = async () => {
    if (!gatewayId.value) {
      error.value = 'Gateway not created'
      return
    }

    try {
      error.value = null
      stats.value = await GatewayAPI.getGatewayStats(gatewayId.value)
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to get gateway stats'
    }
  }

  // 挂载目录
  const mountDirectory = async (name: string, path: string) => {
    if (!gatewayId.value) {
      error.value = 'Gateway not created'
      return
    }

    try {
      error.value = null
      await GatewayAPI.mountDirectory(gatewayId.value, name, path)
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to mount directory'
    }
  }

  // 如果提供了名称，自动创建网关
  if (name) {
    create(name)
  }

  return {
    gatewayId,
    isRunning,
    stats,
    error,
    create,
    createWithConfig,
    start,
    stop,
    getStats,
    mountDirectory,
  }
}

/**
 * UDP广播Hook
 * @param localAddr 本地地址
 * @returns UDP广播相关状态和方法
 */
export function useUdpBroadcast(localAddr?: string) {
  const managerId: Ref<string | null> = ref(null)
  const error: Ref<string | null> = ref(null)

  // 创建管理器
  const create = async (addr: string) => {
    try {
      error.value = null
      managerId.value = await UdpBroadcastAPI.createManager(addr)
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create UDP manager'
    }
  }

  // 广播令牌
  const broadcastToken = async (token: UdpToken) => {
    if (!managerId.value) {
      error.value = 'UDP manager not created'
      return
    }

    try {
      error.value = null
      return await UdpBroadcastAPI.broadcastToken(managerId.value, token)
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to broadcast token'
      throw err
    }
  }

  // 发送令牌到指定地址
  const sendTokenTo = async (token: UdpToken, target: string) => {
    if (!managerId.value) {
      error.value = 'UDP manager not created'
      return
    }

    try {
      error.value = null
      await UdpBroadcastAPI.sendTokenTo(managerId.value, token, target)
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to send token'
    }
  }

  // 挂载目录
  const mountDirectory = async (name: string, path: string) => {
    if (!managerId.value) {
      error.value = 'UDP manager not created'
      return
    }

    try {
      error.value = null
      await UdpBroadcastAPI.mountDirectory(managerId.value, name, path)
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to mount directory'
    }
  }

  // 搜索文件
  const searchFiles = async (keywords: string[]) => {
    if (!managerId.value) {
      error.value = 'UDP manager not created'
      return []
    }

    try {
      error.value = null
      return await UdpBroadcastAPI.searchFiles(managerId.value, keywords)
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to search files'
      return []
    }
  }

  // 如果提供了地址，自动创建管理器
  if (localAddr) {
    create(localAddr)
  }

  return {
    managerId,
    error,
    create,
    broadcastToken,
    sendTokenTo,
    mountDirectory,
    searchFiles,
  }
}

/**
 * 注册表Hook
 * @param name 网关名称
 * @param address 网关地址
 * @returns 注册表相关状态和方法
 */
export function useRegistry(name?: string, address?: string) {
  const registryId: Ref<string | null> = ref(null)
  const entries: Ref<RegistryEntry[]> = ref([])
  const error: Ref<string | null> = ref(null)

  // 创建注册表
  const create = async (registryName: string, addr: string) => {
    try {
      error.value = null
      registryId.value = await RegistryAPI.createRegistry(registryName, addr)
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create registry'
    }
  }

  // 获取所有条目
  const getAllEntries = async () => {
    if (!registryId.value) {
      error.value = 'Registry not created'
      return
    }

    try {
      error.value = null
      entries.value = await RegistryAPI.getAllEntries(registryId.value)
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to get registry entries'
    }
  }

  // 添加或更新条目
  const addOrUpdateEntry = async (entry: RegistryEntry) => {
    if (!registryId.value) {
      error.value = 'Registry not created'
      return
    }

    try {
      error.value = null
      await RegistryAPI.addOrUpdateEntry(registryId.value, entry)
      // 更新后重新获取所有条目
      await getAllEntries()
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to add or update entry'
    }
  }

  // 移除条目
  const removeEntry = async (address: string) => {
    if (!registryId.value) {
      error.value = 'Registry not created'
      return
    }

    try {
      error.value = null
      const success = await RegistryAPI.removeEntry(registryId.value, address)
      if (success) {
        // 更新后重新获取所有条目
        await getAllEntries()
      }
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to remove entry'
    }
  }

  // 如果提供了参数，自动创建注册表
  if (name && address) {
    create(name, address)
  }

  return {
    registryId,
    entries,
    error,
    create,
    getAllEntries,
    addOrUpdateEntry,
    removeEntry,
  }
}

/**
 * 性能监控Hook
 * @returns 性能监控相关状态和方法
 */
export function usePerformanceMonitor() {
  const monitorId: Ref<string | null> = ref(null)
  const report: Ref<string | null> = ref(null)
  const error: Ref<string | null> = ref(null)

  // 创建监控器
  const create = async () => {
    try {
      error.value = null
      monitorId.value = await PerformanceMonitorAPI.createMonitor()
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create performance monitor'
    }
  }

  // 记录延迟
  const recordLatency = async (operation: string, latency: number) => {
    if (!monitorId.value) {
      error.value = 'Performance monitor not created'
      return
    }

    try {
      error.value = null
      await PerformanceMonitorAPI.recordLatency(monitorId.value, operation, latency)
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to record latency'
    }
  }

  // 记录吞吐量
  const recordThroughput = async (operation: string, bytesPerSecond: number) => {
    if (!monitorId.value) {
      error.value = 'Performance monitor not created'
      return
    }

    try {
      error.value = null
      await PerformanceMonitorAPI.recordThroughput(monitorId.value, operation, bytesPerSecond)
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to record throughput'
    }
  }

  // 生成报告
  const generateReport = async () => {
    if (!monitorId.value) {
      error.value = 'Performance monitor not created'
      return
    }

    try {
      error.value = null
      report.value = await PerformanceMonitorAPI.generateReport(monitorId.value)
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to generate report'
    }
  }

  // 自动创建监控器
  create()

  return {
    monitorId,
    report,
    error,
    recordLatency,
    recordThroughput,
    generateReport,
  }
}
