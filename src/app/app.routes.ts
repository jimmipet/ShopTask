import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/main/main-page/main-page.component').then(c => c.MainPageComponent),
    },
    {
        path: 'card-list-item/:id',
        loadComponent: () => import('./features/about-card-list-item/about-card-list-item.component').then(c => c.AboutCardListItemComponent)
    },
    {
        path: 'cart',
        loadComponent: () => import('./features/cart/cart/cart.component').then(c => c.CartComponent)
    },
    {
        path: 'add-product',
        loadComponent: ()=> import ('./features/add-edit-product/add-edit-product.component').then(c=> c.AddEditProductComponent)
    }
];
