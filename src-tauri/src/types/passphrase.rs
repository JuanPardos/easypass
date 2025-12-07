use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct PassphraseConfig {
    pub dict_english: bool,
    pub dict_spanish: bool,
    pub words: usize,
    pub min_length: usize,
    pub max_length: usize,
    pub separator: String,
    pub salt: bool,
}

#[derive(Serialize)]
pub struct PassphraseResult {
    pub passphrase: String,
    pub strength: f64,
}