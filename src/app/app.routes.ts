import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () =>
      import('@/layouts/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
    loadChildren: () => import('@/features/auth/auth.routes').then((m) => m.authRoutes),
  },
];
