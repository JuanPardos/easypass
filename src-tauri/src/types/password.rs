use serde::Deserialize;

#[derive(Deserialize)]
pub struct PasswordConfig {
    pub length: usize,
    pub symbols: bool,
    pub numbers: bool,
    pub lowercase: bool,
    pub uppercase: bool,
    pub others: Option<String>,
}