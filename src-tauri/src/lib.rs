mod autostart;

use autostart::{change_autostart, enable_autostart};
use plugins::logging;
use tauri::Manager;
use tauri_plugin_autostart::MacosLauncher;
use tauri_plugin_decorum::WebviewWindowExt;

pub mod plugins;

// 引入后端命令
mod tauri_commands;
use tauri_commands::*;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let mut builder = tauri::Builder::default()
        .plugin(tauri_plugin_autostart::Builder::new().build())
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_single_instance::init(|_, _, _| {}));

    // CrabNebula DevTools prevents other logging plugins from working
    // https://docs.crabnebula.dev/devtools/troubleshoot/log-plugins/
    #[cfg(debug_assertions)]
    {
        let devtools = tauri_plugin_devtools::init();
        builder = builder.plugin(devtools);
    }

    #[cfg(not(debug_assertions))]
    {
        builder = builder.plugin(logging::tauri_plugin_logging());
    }
    builder
        .plugin(tauri_plugin_decorum::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .plugin(tauri_plugin_dialog::init())
        // 注册后端命令
        .invoke_handler(tauri::generate_handler![
            // Autostart commands
            change_autostart,
            // Gateway core commands
            start_gateway,
            stop_gateway,
            restart_gateway,
            get_gateway_status,
            // Configuration commands
            get_gateway_config,
            update_gateway_config,
            // Directory commands
            mount_directory,
            unmount_directory,
            list_mounted_directories,
            // Network commands
            get_network_status,
            get_network_interfaces,
            // Performance commands
            get_performance_report,
            // Cache commands
            get_cache_stats,
            clear_cache,
            // Security commands
            get_security_config,
            update_security_config,
            // Registry commands
            get_registry_entries,
            add_registry_entry,
            remove_registry_entry,
        ])
        .setup(|app| {
            // Create a custom titlebar for main window
            // On Windows this hides decoration and creates custom window controls
            // On macOS it needs hiddenTitle: true and titleBarStyle: overlay
            let main_window = app.get_webview_window("main").unwrap();
            main_window.create_overlay_titlebar().unwrap();

            // Some macOS-specific helpers
            #[cfg(target_os = "macos")]
            {
                // Set a custom inset to the traffic lights
                main_window.set_traffic_lights_inset(12.0, 16.0).unwrap();

                // Make window transparent without privateApi
                main_window.make_transparent().unwrap();
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}