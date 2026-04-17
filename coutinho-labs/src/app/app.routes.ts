import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing-page/landing-page').then(m => m.LandingPage)
  },
  {
    path: 'error',
    // loadComponent: () => import('./error/error').then(m => m.ErrorComponent)
  }
];
