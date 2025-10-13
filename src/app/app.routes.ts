import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { Profile } from './profile/profile';
import { Settings } from "./profile/settings/settings";
import { Savedrecipes } from "./profile/savedrecipes/savedrecipes";
import { Createrecipe } from "./profile/createrecipe/createrecipe";
import { About } from './profile/about/about';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'home', component: Home},
    /* {path: 'profile', component: Profile}, */
    {path: 'login', component: Login},
    {path: 'settings', component: Settings},
    {path: 'saved_recipes', component:Savedrecipes},
    {path: 'about', component:About},
    {path: 'create_recipe', component: Createrecipe}
];
