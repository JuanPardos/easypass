use rand::Rng;
use rand::RngCore;
use rand_chacha::ChaCha20Rng;
use rand::SeedableRng;
use hkdf::Hkdf;
use sha2::Sha256;

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
        charset.push_str("!@#$%&?+");
    }
    if let Some(ref others) = config.others {
        charset.push_str(others);
    }

    if charset.is_empty() {
        return String::new();
    }

    let charset_vec: Vec<char> = charset.chars().collect();
    let charset_len = charset_vec.len();
    if charset_len == 0 || config.length == 0 {
        return String::new();
    }

    let mut os_seed = [0u8; 32];
    ChaCha20Rng::from_os_rng().fill_bytes(&mut os_seed);

    let rng = if let Some(ref entropy_str) = config.entropy {
        let user_entropy = entropy_str.as_bytes();
        let hk = Hkdf::<Sha256>::new(Some(user_entropy), &os_seed);
        let mut seed = [0u8; 32];

        hk.expand(b"easypass-password-generation-v1", &mut seed)
            .expect("HKDF expand failure");

        ChaCha20Rng::from_seed(seed)
    } else {
        ChaCha20Rng::from_seed(os_seed)
    };
    generate_from_charset(rng, &charset_vec, config.length)
}

fn generate_from_charset(mut rng: ChaCha20Rng, charset: &[char], length: usize) -> String {
    let charset_len = charset.len();
    let mut password = String::with_capacity(length);

    for _ in 0..length {
        let idx = rng.random_range(0..charset_len);
        password.push(charset[idx]);
    }
    
    password
}
