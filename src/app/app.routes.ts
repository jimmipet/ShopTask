import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./core/main-page/main-page.component').then(c => c.MainPageComponent)
    },
    {
        path: 'card-list-item/:id',
        loadComponent: () => import('./core/about-card-list-item/about-card-list-item.component').then(c => c.AboutCardListItemComponent)
    },
    {
        path: 'busket',
        loadComponent: () => import('./core/busket/busket.component').then(c => c.BusketComponent)
    }
];
