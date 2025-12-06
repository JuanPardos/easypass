mod service {
    pub mod passphrase;
    pub mod password;
}

mod types {
    pub mod password;
}

mod utils {
    pub mod security;
    pub mod runtime;
}

use types::password::{PasswordConfig, PasswordResult};
use utils::runtime;
use service::password;

#[tauri::command]
fn generate(config: PasswordConfig) -> PasswordResult {
    password::generate_password(config)
}

#[tauri::command]
async fn load_dictionaries() {
    runtime::load_dictionaries().await;
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![generate, load_dictionaries])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
