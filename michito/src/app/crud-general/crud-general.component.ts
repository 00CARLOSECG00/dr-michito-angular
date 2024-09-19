import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
import { TablaClientesComponent } from '../tabla-clientes/tabla-clientes.component';  
import { TablaMascotasComponent } from '../tabla-mascotas/tabla-mascotas.component';
import { DetallesMascotaComponent } from "../detalles-mascota/detalles-mascota.component";
@Component({
  selector: 'app-crud-general',
  standalone: true,
  imports: [CommonModule, BarraLateralComponent, TablaMascotasComponent, TablaClientesComponent, DetallesMascotaComponent],
  templateUrl: './crud-general.component.html',
  styleUrls: ['./crud-general.component.css']
})
export class CrudGeneralComponent {
  tipoUsuario: string = '';
  componenteSeleccionado: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.tipoUsuario = params['usuario'];  // Recibe el tipo de usuario
    });
  }


  seleccionarComponente(componente: string): void {
    console.log('Componente seleccionado:', componente);
    this.componenteSeleccionado = componente;
  }

}
