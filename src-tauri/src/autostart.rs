use std::{fs::create_dir, io::Read};
use tauri::{Manager, Runtime};
use tauri_plugin_autostart::ManagerExt;

// 根据配置启用或关闭开机自启动功能
pub fn enable_autostart(app: &mut tauri::App) {
    use tauri_plugin_autostart::MacosLauncher;

    // 初始化 tauri-plugin-autostart 插件，使用 macOS 的 AppleScript 启动器
    app.handle()
        .plugin(tauri_plugin_autostart::init(
            MacosLauncher::AppleScript,
            None, // None 表示不指定额外的配置路径
        ))
        .unwrap();

    let autostart_manager = app.autolaunch(); // 获取自动启动管理器实例

    // 如果需要直接关闭自启动，可以在这里调用 disable 并提前返回
    // autostart_manager.disable().unwrap();
    // return;

    // 根据当前的自启动状态和本地配置文件的记录，启用或禁用自启动
    match (
        autostart_manager.is_enabled(),      // 检查当前自启动是否已启用
        current_autostart(app.app_handle()), // 检查本地配置中是否应该启用自启动
    ) {
        (Ok(false), Ok(true)) => match autostart_manager.enable() {
            Ok(_) => println!("Autostart enabled successfully."), // 启用成功
            Err(err) => eprintln!("Failed to enable autostart: {}", err), // 启用失败
        },
        (Ok(true), Ok(false)) => match autostart_manager.disable() {
            Ok(_) => println!("Autostart disabled successfully."), // 禁用成功
            Err(err) => eprintln!("Failed to disable autostart: {}", err), // 禁用失败
        },
        _ => (), // 状态一致，无需操作
    }
}

// 检查当前的本地自启动配置状态
fn current_autostart<R: Runtime>(app: &tauri::AppHandle<R>) -> Result<bool, String> {
    use std::fs::File;

    let path = app.path().app_config_dir().unwrap(); // 获取应用的配置目录
    let mut old_value = true; // 默认值为 true

    // 如果配置目录存在
    if path.exists() {
        let file_path = path.join("autostart.txt"); // 配置文件路径
        if file_path.exists() {
            let mut file = File::open(file_path).unwrap(); // 打开配置文件
            let mut data = String::new();
            if let Ok(_) = file.read_to_string(&mut data) {
                if !data.is_empty() {
                    old_value = data.parse().unwrap_or(true); // 解析文件内容为布尔值
                }
            }
        }
    };

    Ok(old_value) // 返回结果
}

// 提供一个命令供前端调用，用于动态更改开机自启动状态
#[tauri::command]
pub fn change_autostart<R: Runtime>(app: tauri::AppHandle<R>, open: bool) -> Result<(), String> {
    use std::fs::File;
    use std::io::Write;

    let autostart_manager = app.autolaunch(); // 获取自动启动管理器实例

    // 内部的状态修改函数，根据 open 参数启用或禁用自启动
    let change = |open: bool| -> Result<(), String> {
        #[allow(unused_assignments)]
        let mut open_str = String::from("");
        if open {
            // 启用自启动
            autostart_manager
                .enable()
                .map_err(|_| "enable autostart failed".to_owned())?;

            open_str = "true".to_owned(); // 记录为启用状态
        } else {
            // 禁用自启动
            autostart_manager
                .disable()
                .map_err(|_| "disable autostart failed".to_owned())?;

            open_str = "false".to_owned(); // 记录为禁用状态
        }

        // 获取应用的配置目录
        let path = app
            .path()
            .app_config_dir()
            .map_err(|_| "not found app config directory".to_owned())?;
        if !path.exists() {
            // 如果配置目录不存在，创建它
            create_dir(&path).map_err(|_| "creating app config directory failed".to_owned())?;
        }

        // 将新的自启动状态写入配置文件
        let file_path = path.join("autostart.txt");
        let mut file = File::create(file_path).unwrap();
        file.write_all(open_str.as_bytes()).unwrap();

        Ok(())
    };

    // 根据当前状态和传入参数决定是否需要更改状态
    match (autostart_manager.is_enabled().unwrap(), open) {
        (false, true) => change(true),    // 从禁用改为启用
        (true, false) => change(false),   // 从启用改为禁用
        _ => Err("no change".to_owned()), // 状态未改变
    }
}
