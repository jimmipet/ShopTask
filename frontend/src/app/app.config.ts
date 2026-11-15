import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  type ApplicationConfig,
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { MAT_ICON_DEFAULT_OPTIONS } from '@angular/material/icon';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { apiInterceptor } from './core/api.interceptor';

registerLocaleData(localeRu);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([apiInterceptor])),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
    ),
    { provide: MAT_ICON_DEFAULT_OPTIONS, useValue: { fontSet: 'material-symbols-outlined' } },
    { provide: LOCALE_ID, useValue: 'ru' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'USD' },
  ],
};
