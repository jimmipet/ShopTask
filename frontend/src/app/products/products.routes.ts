import type { CanMatchFn, Routes } from '@angular/router';

const isProductId: CanMatchFn = (_route, [segment]) => /^[1-9]\d*$/.test(segment?.path ?? '');

const productsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./product-list/product-list'),
  },
  {
    path: 'new',
    loadComponent: () => import('./product-editor/product-editor'),
  },
  {
    path: ':id',
    canMatch: [isProductId],
    loadComponent: () => import('./product-details/product-details'),
  },
  {
    path: ':id/edit',
    canMatch: [isProductId],
    loadComponent: () => import('./product-editor/product-editor'),
  },
];

export default productsRoutes;
