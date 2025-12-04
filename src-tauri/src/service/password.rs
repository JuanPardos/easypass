use rand::Rng;
use rand_chacha::ChaCha20Rng;
use rand::SeedableRng;

use crate::types::password::PasswordConfig;

pub fn generate_password(config: PasswordConfig) -> String {
    let mut charset = String::new();

    if config.lowercase {
        charset.push_str("abcdefghijklmnopqrstuvwxyz");
    }
    if config.uppercase {
        charset.push_str("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    }
    if config.numbers {
        charset.push_str("0123456789");
    }
    if config.symbols {
        charset.push_str("!@#$%&()+=[]{}<>?");
    }
    if let Some(ref others) = config.others {
        charset.push_str(others);
    }

    if charset.is_empty() {
        return String::new();
    }

    //TODO: Add entropy to RNG
    let mut rng = ChaCha20Rng::from_os_rng();

    let charset_vec: Vec<char> = charset.chars().collect();
    let charset_len = charset_vec.len();
    if charset_len == 0 || config.length == 0 {
        return String::new();
    }

    let mut password = String::with_capacity(config.length);
    for _ in 0..config.length {
        let idx = rng.random_range(0..charset_len);
        password.push(charset_vec[idx]);
    }

    password
}
