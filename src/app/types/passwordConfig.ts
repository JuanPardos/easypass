export interface PasswordConfig {
    length: number;
    symbols: boolean;
    numbers: boolean;
    lowercase: boolean;
    uppercase: boolean;
    others: string | null;
    entropy: string | null;
}