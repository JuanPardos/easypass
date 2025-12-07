mod service {
    pub mod passphrase;
    pub mod password;
}

mod types {
    pub mod password;
    pub mod passphrase;
}

mod utils {
    pub mod security;
    pub mod runtime;
}

use types::password::{PasswordConfig, PasswordResult};
use types::passphrase::{PassphraseConfig, PassphraseResult};
use utils::runtime;
use service::password;
use service::passphrase;

#[tauri::command]
fn generate_password(config: PasswordConfig) -> PasswordResult {
    password::generate_password(config)
}

#[tauri::command]
fn generate_passphrase(config: PassphraseConfig) -> PassphraseResult {
    passphrase::generate_passphrase(config)
}

#[tauri::command]
async fn load_dictionaries() {
    runtime::load_dictionaries().await;
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![generate_password, generate_passphrase, load_dictionaries])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
