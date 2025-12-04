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

    let mut password = String::new();

    if let Some(entropy_str) = config.entropy {
        let entropy_bytes = entropy_str.as_bytes();

        let mut os_seed = [0u8; 32];
        let mut os_seed_rng = ChaCha20Rng::from_os_rng();
        os_seed_rng.fill_bytes(&mut os_seed);

        let hk = Hkdf::<Sha256>::new(None, &os_seed);
        let mut seed = [0u8; 32];
        hk.expand(entropy_bytes, &mut seed).expect("HKDF expand failure");

        let mut rng = ChaCha20Rng::from_seed(seed);

        for _ in 0..config.length {
            let idx = rng.random_range(0..charset_len);
            password.push(charset_vec[idx]);
        }
    } else {
        let mut rng = ChaCha20Rng::from_os_rng();
    
        for _ in 0..config.length {
            let idx = rng.random_range(0..charset_len);
            password.push(charset_vec[idx]);
        }
    }
    password
}
