import { Routes } from '@angular/router';
import { MainPageComponent } from './core/main-page/main-page.component';
import { AboutCardListItemComponent } from './core/about-card-list-item/about-card-list-item.component';

export const routes: Routes = [
    {path:'', component: MainPageComponent},
    {path:'card-list-item/:id', component: AboutCardListItemComponent},
];
