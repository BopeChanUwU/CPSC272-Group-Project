import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'home', loadComponent: () => import('./home/home').then(c => c.Home)},
    {path: 'profile', loadComponent: () => import('./profile/profile').then(c => c.Profile)},
    {path: 'login', loadComponent:() => import('./login/login').then(c => c.Login)},
];
