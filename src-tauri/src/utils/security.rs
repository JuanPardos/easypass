use crate::types::passphrase::{PassphraseConfig};

fn estimate_charset_size(password: &str) -> usize {
    let mut size = 0;
    
    if password.chars().any(|c| c.is_lowercase()) {
        size += 26;
    }
    if password.chars().any(|c| c.is_uppercase()) {
        size += 26;
    }
    if password.chars().any(|c| c.is_numeric()) {
        size += 10;
    }
    if password.chars().any(|c| !c.is_alphanumeric()) {
        size += 10;
    }
    
    size
}

pub fn evaluate_password_strength(password: &str) -> f64 {
    let charset_size = estimate_charset_size(password);
    let length = password.len();
    
    if charset_size > 0 && length > 0 {
        (length as f64) * (charset_size as f64).log2()
    } else {
        0.0
    }
}

pub fn evaluate_passphrase_strength(config: PassphraseConfig) -> f64 {
    let mut security = 0.0;

    security += (config.words as f64 / 4.0) * 30.0;
    security += (config.min_length as f64 / 4.0) * 15.0;
    security += (config.max_length as f64 / 8.0) * 15.0;

    if config.salt {
        security += 15.0;
    }

    if config.dict_english && config.dict_spanish {
        security += 15.0;
    }

    if config.separator != " " {
        security += 10.0;
    }

    return security.min(100.0);
}