//! Tauri commands module
//!
//! This module re-exports the Tauri commands from the main gateway crate
//! to make them available to the GUI application.

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use tauri::command;

// Re-export types that are used in command signatures
pub use wdic_gateway::{
    AccessRule, CacheStats, GatewayConfig, GatewayStatus, MountPoint, NetworkInterface,
    NetworkStatus, PerformanceReport, RegistryEntry, SecurityConfig,
};

// ============================================================================
// 网关核心功能接口 (Gateway API)
// ============================================================================

#[command]
pub async fn start_gateway(config: GatewayConfig) -> Result<(), String> {
    wdic_gateway::tauri_api::start_gateway(config).await
}

#[command]
pub async fn stop_gateway() -> Result<String, String> {
    wdic_gateway::tauri_api::stop_gateway().await
}

#[command]
pub async fn restart_gateway(config: Option<GatewayConfig>) -> Result<(), String> {
    wdic_gateway::tauri_api::restart_gateway(config).await
}

#[command]
pub async fn get_gateway_status() -> Result<GatewayStatus, String> {
    wdic_gateway::tauri_api::get_gateway_status().await
}

// ============================================================================
// 配置管理接口 (Configuration API)
// ============================================================================

#[command]
pub async fn get_gateway_config() -> Result<GatewayConfig, String> {
    wdic_gateway::tauri_api::get_gateway_config().await
}

#[command]
pub async fn update_gateway_config(config: GatewayConfig) -> Result<(), String> {
    wdic_gateway::tauri_api::update_gateway_config(config).await
}

// ============================================================================
// 目录和文件操作接口 (Directory API)
// ============================================================================

#[command]
pub async fn mount_directory(name: String, path: String) -> Result<(), String> {
    wdic_gateway::tauri_api::mount_directory(name, path).await
}

#[command]
pub async fn unmount_directory(name: String) -> Result<(), String> {
    wdic_gateway::tauri_api::unmount_directory(name).await
}

#[command]
pub async fn list_mounted_directories() -> Result<Vec<MountPoint>, String> {
    wdic_gateway::tauri_api::list_mounted_directories().await
}

// ============================================================================
// 网络通信接口 (Network API)
// ============================================================================

#[command]
pub async fn get_network_status() -> Result<NetworkStatus, String> {
    wdic_gateway::tauri_api::get_network_status().await
}

#[command]
pub async fn get_network_interfaces() -> Result<Vec<NetworkInterface>, String> {
    wdic_gateway::tauri_api::get_network_interfaces().await
}

// ============================================================================
// 性能监控接口 (Performance API)
// ============================================================================

#[command]
pub async fn get_performance_report() -> Result<PerformanceReport, String> {
    wdic_gateway::tauri_api::get_performance_report().await
}

// ============================================================================
// 缓存管理接口 (Cache API)
// ============================================================================

#[command]
pub async fn get_cache_stats() -> Result<CacheStats, String> {
    wdic_gateway::tauri_api::get_cache_stats().await
}

#[command]
pub async fn clear_cache() -> Result<String, String> {
    wdic_gateway::tauri_api::clear_cache().await
}

// ============================================================================
// 安全管理接口 (Security API)
// ============================================================================

#[command]
pub async fn get_security_config() -> Result<SecurityConfig, String> {
    wdic_gateway::tauri_api::get_security_config().await
}

#[command]
pub async fn update_security_config(config: SecurityConfig) -> Result<(), String> {
    wdic_gateway::tauri_api::update_security_config(config).await
}

// ============================================================================
// 注册表管理接口 (Registry API)
// ============================================================================

#[command]
pub async fn get_registry_entries() -> Result<Vec<RegistryEntry>, String> {
    wdic_gateway::tauri_api::get_registry_entries().await
}

#[command]
pub async fn add_registry_entry(entry: RegistryEntry) -> Result<(), String> {
    wdic_gateway::tauri_api::add_registry_entry(entry).await
}

#[command]
pub async fn remove_registry_entry(id: String) -> Result<(), String> {
    wdic_gateway::tauri_api::remove_registry_entry(id).await
}
