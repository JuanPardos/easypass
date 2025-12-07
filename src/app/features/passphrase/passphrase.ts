import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { invoke } from "@tauri-apps/api/core";
import { I18nService } from '@utils/i18nService';
import { PassphraseConfig, PassphraseResult } from '../../types/passphrase';

@Component({
  selector: 'app-passphrase',
  imports: [CommonModule, FormsModule],
  templateUrl: './passphrase.html',
  styleUrl: './passphrase.css',
})
export class Passphrase {
  words: number = 4;
  dict_english: boolean = false;
  dict_spanish: boolean = false;
  min_length: number = 3;
  max_length: number = 8;
  separator: string | null = null;
  salt: boolean = false;
  showToast: boolean = false;
  toastMessage: string = '';
  result: PassphraseResult | null = null;

  constructor(public i18n: I18nService) {}

  generate() {
    if (this.min_length > this.max_length) {
      this.showToastMessage(this.i18n.t('messages.invalid') ?? 'Min length should be <= max length');
      return;
    }
    if (this.words < 2) {
      this.showToastMessage(this.i18n.t('messages.noWords') ?? 'Please choose at least 2 words');
      return;
    }
    if (!this.dict_english && !this.dict_spanish) {
      this.showToastMessage(this.i18n.t('messages.noDict') ?? 'Please select at least one dictionary');
      return;
    }

    const config: PassphraseConfig = {
      dict_english: this.dict_english,
      dict_spanish: this.dict_spanish,
      words: this.words,
      min_length: this.min_length,
      max_length: this.max_length,
      separator: this.separator || ' ',
      salt: this.salt,
    };

    invoke<PassphraseResult>('generate_passphrase', { config })
      .then((res) => {
        this.result = res;
      })
      .catch((err) => {
        console.error('generate_passphrase failed', err);
        this.showToastMessage(this.i18n.t('messages.error') ?? 'Error generating passphrase');
      });
  }

  async copyToClipboard() {
    try {
      if (!this.result) return;
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(this.result.passphrase);
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
