import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products',
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.routes'),
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart-page/cart-page'),
  },
  {
    path: '**',
    redirectTo: 'products',
  },
];
