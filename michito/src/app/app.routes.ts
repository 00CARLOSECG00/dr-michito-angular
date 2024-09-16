import { Routes } from '@angular/router';
import{MainPageComponent} from'./main-page/main-page.component'
import{LoginComponent}from'./login/login.component'
import{LoginPortalInternoComponent}from'./login-portal-interno/login-portal-interno.component'
import{TablaMascotasComponent}from'./tabla-mascotas/tabla-mascotas.component'


export const routes: Routes = [
    {
        path: '',
        component: TablaMascotasComponent
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
        path: 'mascotas',
        component: TablaMascotasComponent
    }
];
