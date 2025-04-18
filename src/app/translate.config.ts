// src/app/translate.config.ts
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom,EnvironmentProviders } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule,TranslateService  } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

export const provideTranslate = (): EnvironmentProviders =>
  importProvidersFrom(
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'fr',
    })
  );
