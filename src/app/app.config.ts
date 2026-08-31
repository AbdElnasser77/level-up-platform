import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { defaultPreset } from '@/core/themes/defaultPreset';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { provideLucideConfig } from '@lucide/angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: defaultPreset,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng, components, utilities',
          },
          darkModeSelector: '.dark',
        },
      },
    }),
    provideLucideConfig({ size: '1.25em', strokeWidth: 1.75 }),
  ],
};
