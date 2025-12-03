import { Component } from '@angular/core';
import { I18nService } from '@utils/i18nService';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {

  constructor(public i18n: I18nService) {}

}
