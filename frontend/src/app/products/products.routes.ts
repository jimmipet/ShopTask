import type { CanMatchFn, Routes } from '@angular/router';

const isProductId: CanMatchFn = (_route, [segment]) => /^[1-9]\d*$/.test(segment?.path ?? '');

const productsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./product-list/product-list.component'),
  },
  {
    path: 'new',
    loadComponent: () => import('./product-editor/product-editor.component'),
  },
  {
    path: ':id',
    canMatch: [isProductId],
    loadComponent: () => import('./product-details/product-details.component'),
  },
  {
    path: ':id/edit',
    canMatch: [isProductId],
    loadComponent: () => import('./product-editor/product-editor.component'),
  },
];

export default productsRoutes;
