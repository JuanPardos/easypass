use rand::Rng;
use rand::SeedableRng;
use rand::RngCore;
use rand_chacha::ChaCha20Rng;

use crate::utils::runtime::{DICT_EN, DICT_ES};
use crate::types::passphrase::{PassphraseConfig, PassphraseResult};
use crate::utils::security;

pub fn generate_passphrase(config: PassphraseConfig) -> PassphraseResult {
    let mut word_list: Vec<String> = Vec::new();

    if config.dict_english {
        word_list.extend(DICT_EN.iter().cloned());
    }
    if config.dict_spanish {
        word_list.extend(DICT_ES.iter().cloned());
    }

    let filtered_words: Vec<&String> = word_list
        .iter()
        .filter(|word| {
            let len = word.len();
            len >= config.min_length && len <= config.max_length
        })
        .collect();

    if filtered_words.is_empty() || config.words == 0 {
        return PassphraseResult {
            passphrase: String::new(),
            strength: 0.0,
        };
    }

    let mut os_seed = [0u8; 32];
    ChaCha20Rng::from_os_rng().fill_bytes(&mut os_seed);

    let mut rng = ChaCha20Rng::from_seed(os_seed);

    let mut passphrase_words: Vec<String> = Vec::new();

    for _ in 0..config.words {
        let index = rng.random_range(0..filtered_words.len());
        passphrase_words.push(filtered_words[index].to_string().to_lowercase());
    }

    let mut passphrase = passphrase_words.join(&config.separator);

    if config.salt {
        let symbols = "!@#$€%&?+=";
        let numbers = "0123456789";
        let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

        let symbol_vec: Vec<char> = symbols.chars().collect();
        let number_vec: Vec<char> = numbers.chars().collect();
        let letter_vec: Vec<char> = letters.chars().collect();

        let rng_symbol = rng.random_range(0..symbol_vec.len());
        let rng_number = rng.random_range(0..number_vec.len());
        let rng_letter = rng.random_range(0..letter_vec.len());

        let symbol = symbol_vec[rng_symbol].to_string();
        let number = number_vec[rng_number].to_string();
        let letter = letter_vec[rng_letter].to_string();

        let salt_final = format!("{}{}{}", symbol, number, letter);
        passphrase = format!("{}{}", salt_final, passphrase);
    }

    let strength = security::evaluate_passphrase_strength(config);

    PassphraseResult {
        passphrase,
        strength,
    }
}