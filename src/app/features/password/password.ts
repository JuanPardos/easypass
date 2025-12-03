import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { I18nService } from '@utils/i18nService';

@Component({
	selector: 'app-password',
	imports: [CommonModule, FormsModule],
	templateUrl: './password.html',
	styleUrl: './password.css',
})
export class Password {
	length = 12;
	useSymbols = true;
	useNumbers = true;
	useLowercase = true;
	useUppercase = true;
	useOthers = false;
	others = '';
	showToast = false;
	toastMessage = '';
	result = '';

	constructor(public i18n: I18nService) {}

	//TODO: Rust implementation backend
	generate() {
		let charset = '';
		if (this.useLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
		if (this.useUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		if (this.useNumbers) charset += '0123456789';
		if (this.useSymbols) charset += '!@#$%&()+=[]{}<>?';
		if (this.useOthers && this.others) charset += this.others;

		if (!charset) {
			this.result = '';
			this.showToastMessage(this.i18n.t('messages.noCharset'));
			return;
		}

		const arr = [] as string[];
		for (let i = 0; i < this.length; i++) {
			const idx = Math.floor(Math.random() * charset.length);
			arr.push(charset[idx]);
		}
		this.result = arr.join('');
	}

	async copyToClipboard() {
		try {
			if (!this.result) return;
			if (navigator?.clipboard?.writeText) {
				await navigator.clipboard.writeText(this.result);
			} else {
				const textarea = document.createElement('textarea');
				textarea.value = this.result;
				document.body.appendChild(textarea);
				textarea.select();
				document.execCommand('copy');
				textarea.remove();
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
