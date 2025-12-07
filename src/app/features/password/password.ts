import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { invoke } from "@tauri-apps/api/core";
import { I18nService } from '@utils/i18nService';
import { PasswordConfig, PasswordResult } from '../../types/password';


@Component({
    selector: 'app-password',
    imports: [CommonModule, FormsModule],
    templateUrl: './password.html',
    styleUrl: './password.css',
})
export class Password {
    length: number = 12;
    useSymbols: boolean = false;
    useNumbers: boolean = true;
    useLowercase: boolean = false;
    useUppercase: boolean = false;
    useOthers: boolean = false;
    others: string = '';
    showToast: boolean = false;
    toastMessage: string = '';
    result: PasswordResult | null = null;
    useEntropy: boolean = false;
    entropyMenuOpen: boolean = false;
    entropyModalOpen: boolean = false;
    entropyText: string = '';

    constructor(public i18n: I18nService) {}

    toggleEntropyMenu() {
        this.entropyMenuOpen = !this.entropyMenuOpen;
    }

    openEntropyModal() {
        this.entropyMenuOpen = false;
        this.entropyText = '';
        this.entropyModalOpen = true;
        setTimeout(() => {
            const el = document.getElementById('entropyInput') as HTMLInputElement | null;
            if (el) el.focus();
        });
    }

    cancelEntropyModal() {
        this.entropyModalOpen = false;
        this.entropyText = '';
    }

    confirmEntropy() {
        this.entropyModalOpen = false;
        this.generate(true);
    }

    generate(entropyOverride?: boolean) {
        this.entropyMenuOpen = false;
        this.entropyModalOpen = false;
        const useEntropy = entropyOverride ?? this.useEntropy;
        const config: PasswordConfig = {
            length: this.length,
            symbols: this.useSymbols,
            numbers: this.useNumbers,
            lowercase: this.useLowercase,
            uppercase: this.useUppercase,
            others: this.useOthers && this.others ? this.others : null,
			entropy: useEntropy ? this.entropyText : null,
        };

        invoke<PasswordResult>('generate_password', { config })
            .then((text) => {
                this.result = text;
            })
            .catch((err) => {
                console.error('generate failed', err);
                this.showToastMessage(this.i18n.t('messages.error') ?? 'Error generating password');
            });
    }

    async copyToClipboard() {
        try {
            if (!this.result) return;
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(this.result.password);
            }
        } catch (e) {
            console.error('Copy failed', e);
        }
        this.showToastMessage(this.i18n.t('messages.copied'));
    }

    showToastMessage(msg: string, duration = 2000) {
        this.toastMessage = msg;
        this.showToast = true;
        setTimeout(() => {
            this.showToast = false;
        }, duration);
    }
}
