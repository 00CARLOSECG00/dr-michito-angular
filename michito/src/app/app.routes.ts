import { Routes } from '@angular/router';
import{MainPageComponent} from'./main-page/main-page.component'
import{LoginComponent}from'./login/login.component'
import{LoginPortalInternoComponent}from'./login-portal-interno/login-portal-interno.component'
import { CrudGeneralComponent } from './crud-general/crud-general.component';


export const routes: Routes = [
    {
        path: '',
        component: MainPageComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'loginPortalInterno',
        component: LoginPortalInternoComponent
    },
    { 
        path: 'crud-general', 
        component: CrudGeneralComponent
    }
];
