import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { I18nService } from '@utils/i18nService';
import { Passphrase } from '../passphrase/passphrase';
import { Password } from '../password/password';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Password, Passphrase],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
	activeTab: 'password' | 'passphrase' = 'password';

	constructor(public i18n: I18nService) {}
}