import { Routes } from '@angular/router';
import { LAISCOUTINHO_NAV_ITEMS, LANDINGPAGE_NAV_ITEMS } from './types/navitems.types';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing-page/landing-page').then(m => m.LandingPage),
    data: {
      nav: LANDINGPAGE_NAV_ITEMS
    }
  },
  {
    path: 'laiscoutinho',
    loadComponent: () => import('./pages/founder/laiscoutinho/laiscoutinho').then(m => m.Laiscoutinho),
    data: {
      nav: LAISCOUTINHO_NAV_ITEMS
    }
  },
  {
    path: 'error',
    loadComponent: () => import('./pages/errors/error-page/error-page').then(m => m.ErrorPage)
  }
];
