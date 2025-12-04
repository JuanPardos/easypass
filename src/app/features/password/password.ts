import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { invoke } from "@tauri-apps/api/core";
import { I18nService } from '@utils/i18nService';
import { PasswordConfig } from '../../types/passwordConfig';


@Component({
	selector: 'app-password',
	imports: [CommonModule, FormsModule],
	templateUrl: './password.html',
	styleUrl: './password.css',
})
export class Password {
	length = 12;
	useSymbols = false;
	useNumbers = true;
	useLowercase = false;
	useUppercase = false;
	useOthers = false;
	others = '';
	showToast = false;
	toastMessage = '';
	result = '';

	constructor(public i18n: I18nService) {}

	generate() {
		const config: PasswordConfig = {
			length: this.length,
			symbols: this.useSymbols,
			numbers: this.useNumbers,
			lowercase: this.useLowercase,
			uppercase: this.useUppercase,
			others: this.useOthers && this.others ? this.others : null,
		};

		invoke<string>('generate', { config })
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
				await navigator.clipboard.writeText(this.result);
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
