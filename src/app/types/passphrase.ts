export interface PassphraseConfig {
    dict_english: boolean | false;
    dict_spanish: boolean | false;
    words: number;
    min_length: number;
    max_length: number;
    separator: string | ' ';
    salt: boolean | false;
}

export interface PassphraseResult {
    passphrase: string;
    strength: number | null;
}
