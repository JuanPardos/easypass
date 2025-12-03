import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class I18nService {

    constructor(private translate: TranslateService) {
        this.translate.addLangs(['es', 'en']);
        this.translate.setFallbackLang('en');
        this.translate.use('es');
    }

    t(key: string, params?: any): string {
        return this.translate.instant(key, params);
    }

    stream(key: string, params?: any) {
        return this.translate.stream(key, params);
    }

    changeLanguage(lang: string) {
		this.translate.use(lang);
    }

}