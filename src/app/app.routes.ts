import { Routes } from '@angular/router';
import { Login } from './login/login';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'home', loadComponent: () => import('./home/home').then(c => c.Home)},
    {path: 'profile', loadComponent: () => import('./profile/profile').then(c => c.Profile)},
    {path: 'login', component: Login},
    //{path: 'saved_recipes', loadComponent:() => import('./myrecipes/myrecipes').then(c => c.Myrecipes)}
    //{path: 'profile_settings', loadComponent:() => import('./myrecipes/myrecipes').then(c => c.Myrecipes)}
    //{path: 'about', loadComponent:() => import('./myrecipes/myrecipes').then(c => c.Myrecipes)},
    //{path: 'create_recipe', loadComponent:() => import('./create-recipe/create-recipe').then(c => c.CreateRecipe)}
];
