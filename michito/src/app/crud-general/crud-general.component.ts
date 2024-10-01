import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Asegúrate de importar ActivatedRoute correctamente
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';  // Asegúrate de importar HttpClientModule
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
import { TablaClientesComponent } from '../tabla-clientes/tabla-clientes.component';  
import { TablaMascotasComponent } from '../tabla-mascotas/tabla-mascotas.component';
import { DetallesMascotaComponent } from "../detalles-mascota/detalles-mascota.component";
import { TablaMedicamentosComponent } from "../tabla-medicamentos/tabla-medicamentos.component";

@Component({
  selector: 'app-crud-general',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule, // HttpClientModule aquí
    BarraLateralComponent,
    TablaClientesComponent,
    TablaMascotasComponent,
    TablaMedicamentosComponent
],
  templateUrl: './crud-general.component.html',
  styleUrls: ['./crud-general.component.css']
})
export class CrudGeneralComponent implements OnInit {
  tipoUsuario: string = '';
  componenteSeleccionado: string = '';

  constructor(private route: ActivatedRoute) {}  // La inyección de ActivatedRoute debe estar aquí

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.tipoUsuario = params['usuario'];  // Asegúrate de que 'usuario' esté disponible en los parámetros
    });
  }

  seleccionarComponente(componente: string): void {
    this.componenteSeleccionado = componente;
    console.log('Componente seleccionado:', this.componenteSeleccionado);
  }
}
