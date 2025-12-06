import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { invoke } from "@tauri-apps/api/core";
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
	activeTab: String = 'password';
  dictsLoaded: boolean = false;

	constructor(public i18n: I18nService) {}
    
  async setTab(tab: String) {
    this.activeTab = tab;
    if (tab === 'passphrase' && !this.dictsLoaded) {
      await invoke('load_dictionaries');
      this.dictsLoaded = true;
    }
  }
}