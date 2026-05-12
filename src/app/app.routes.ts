import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

  { path: '', redirectTo: 'cataleg', pathMatch: 'full' },

  {
    path: 'cataleg',
    loadComponent: () =>
      import('./pages/cataleg/cataleg.component')
        .then(m => m.CatalegComponent)
  },

  {
    path: 'cerca',
    loadComponent: () =>
      import('./pages/cerca/cerca.component')
        .then(m => m.CercaComponent)
  },

  {
    path: 'detall/:id',
    loadComponent: () =>
      import('./pages/detall/detall.component')
        .then(m => m.DetallComponent)
  },

  {
    path: 'preferits',
    loadComponent: () =>
      import('./pages/preferits/preferits.component')
        .then(m => m.PreferitsComponent),
    canActivate: [authGuard]
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component')
        .then(m => m.LoginComponent)
  },

  { path: '**', redirectTo: 'cataleg' }

];