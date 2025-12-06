use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct PasswordConfig {
    pub length: usize,
    pub symbols: bool,
    pub numbers: bool,
    pub lowercase: bool,
    pub uppercase: bool,
    pub others: Option<String>,
    pub entropy: Option<String>,
}

#[derive(Serialize)]
pub struct PasswordResult {
    pub password: String,
    pub strength: f64,
}