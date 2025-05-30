import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import {provideRouter, RouteReuseStrategy, withComponentInputBinding} from '@angular/router';

import { routes } from './app.routes';
import {IonicRouteStrategy, provideIonicAngular} from '@ionic/angular/standalone';
import {options} from 'ionicons/icons';
import {config} from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular({
      mode:"ios"
    }),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding())
  ]
};
