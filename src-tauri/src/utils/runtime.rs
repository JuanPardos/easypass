use once_cell::sync::Lazy;
use zstd::stream::read::Decoder;
use std::io::Read;
use tokio::task;


pub static DICT_EN: Lazy<Vec<String>> = Lazy::new(|| {
    let mut decoder = Decoder::new(&include_bytes!("dict_en.txt.zst")[..]).unwrap();
    let mut s = String::new();
    decoder.read_to_string(&mut s).unwrap();
    s.lines().map(|l| l.to_string()).collect()
});

pub static DICT_ES: Lazy<Vec<String>> = Lazy::new(|| {
    let mut decoder = Decoder::new(&include_bytes!("dict_es.txt.zst")[..]).unwrap();
    let mut s = String::new();
    decoder.read_to_string(&mut s).unwrap();
    s.lines().map(|l| l.to_string()).collect()
});

pub async fn load_dictionaries() {
    task::spawn_blocking(|| {
        Lazy::force(&DICT_EN);
        Lazy::force(&DICT_ES);
    }).await.unwrap();
}