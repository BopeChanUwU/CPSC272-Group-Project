import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { Myrecipes } from "./profile/myrecipes/myrecipes";
import { Settings } from "./profile/settings/settings";
import { Savedrecipes } from "./profile/savedrecipes/savedrecipes";
import { Createrecipe } from "./profile/createrecipe/createrecipe";
import { About } from './profile/about/about';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'home', 
        component: Home,
        /* canActivate: [authGuard] */ //auth guard to protect route
    },
    {path: 'login', 
        component: Login
    },
    {path: 'settings', 
        component: Settings,
        /* canActivate: [authGuard] */ //auth guard to protect route
    },
    {path: 'saved_recipes', 
        component:Savedrecipes,
        /* canActivate: [authGuard] */ //auth guard to protect route
    },
    {path: 'about', 
        component:About,
        /* canActivate: [authGuard] */ //auth guard to protect route
    },
    {path: 'create_recipe', 
        component: Createrecipe,
        /* canActivate: [authGuard] */ //auth guard to protect route
    },
    {path: 'my_recipes', 
        component:Myrecipes,
        /* canActivate: [authGuard] */ //auth guard to protect route
    },
];
