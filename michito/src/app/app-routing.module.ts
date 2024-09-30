import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{MainPageComponent} from'./main-page/main-page.component'


const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Ruta por defecto
  { path: '**', redirectTo: '/login' } // Ruta no encontrada
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }