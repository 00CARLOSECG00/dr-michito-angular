import { Routes } from '@angular/router';
import{MainPageComponent} from'./main-page/main-page.component'
import{LoginComponent}from'./login/login.component'
import{LoginPortalInternoComponent}from'./login-portal-interno/login-portal-interno.component'
import {TablaMascotasComponent} from './tabla-mascotas/tabla-mascotas.component'
import { DetallesMascotaComponent } from './detalles-mascota/detalles-mascota.component';
import { CreateMascotaComponent } from './create-mascota/create-mascota.component';
import { TablaClientesComponent } from './tabla-clientes/tabla-clientes.component';
import { CreateClienteComponent } from './create-cliente/create-cliente.component';
import { TablaMedicamentosComponent } from './tabla-medicamentos/tabla-medicamentos.component';
import {TablaVeterinariosComponent} from './tabla-veterinarios/tabla-veterinarios.component'
import {CreateVeterinarioComponent} from './create-veterinario/create-veterinario.component'
import { DetallesVeterinarioComponent } from './detalles-veterinario/detalles-veterinario.component';
import { UpdateMedicamentoComponent } from './update-medicamento/update-medicamento.component';
import { VistaMascotasClienteComponent } from './vista-mascotas-cliente/vista-mascotas-cliente.component';

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
        path: 'Mascotas', 
        component: TablaMascotasComponent
    },
    {
        path: 'Clientes',
        component: TablaClientesComponent
    },
    {
        path: 'DetalleMascota',
        component: DetallesMascotaComponent
    },
    {
        path: 'AgregarMascota',
        component: CreateMascotaComponent
    },
    {
        path: 'Create-Cliente',
        component: CreateClienteComponent
    },
    {
        path: 'Medicamentos',
        component: TablaMedicamentosComponent
    },
    {
        path: 'personal',
        component: TablaVeterinariosComponent
    },
    {
        path: 'Create-Veterinario',
        component: CreateVeterinarioComponent
    },
    {
        path: 'DetalleVeterinario',
        component: DetallesVeterinarioComponent
    },
    {
        path: 'UpdateMedicamento',
        component: UpdateMedicamentoComponent
    },
    {
        path: 'mascotasCliente',
        component: VistaMascotasClienteComponent
    }
];
