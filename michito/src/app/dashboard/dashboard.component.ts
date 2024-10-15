import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
import { KpisService } from '../Services/kpis.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgxChartsModule, BarraLateralComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

  view: number[] = [700, 400];
  colorScheme = 'nightLights';

  tratamientosTotales = [{ name: 'Tratamientos Durante el Último Mes', value: 150 }];
  tratamientosPorMedicamento: { name: string; value: number }[] = [];
  veterinariosActivosInactivos: { name: string; value: number; }[] = [];
  mascotasActivas= [{ name: 'Mascotas Activas', value: 150 }];
  totalMascotas = [{ name: 'Total Mascotas', value: 1 }];

  constructor(private kpisService: KpisService) {}

  ngOnInit(): void {
    // Total de mascotas
    this.kpisService.getTotalMascotas().subscribe(
      (data) => {
        const totalMascotas = data as number;
        this.totalMascotas = [{ name: 'Total Mascotas', value: totalMascotas }];
      },
      (error) => console.error('Error al obtener total de mascotas', error)
    );

    // Llamar al servicio para obtener los datos de tratamientos
    this.kpisService.getTratamientosUltimoMes().subscribe(
      (data) => {
        const totalTratamientos = data as number;
        this.tratamientosTotales = [{ name: 'Tratamientos Durante el Último Mes', value: totalTratamientos }];
      },
      (error) => console.error('Error al obtener tratamientos totales', error)
    );

    // Mascotas activas
    this.kpisService.getMascotasActivas().subscribe(
      (data) => {
        const mascotasActivas = data as number;
        this.mascotasActivas = [{ name: 'Mascotas Activas', value: mascotasActivas }];
      },
      (error) => console.error('Error al obtener mascotas activas', error)
    );

    // Veterinarios activos
    this.kpisService.getVeterinariosActivos().subscribe(
      (data) => {
        const totalVeterinariosActivos = data as number;
        this.veterinariosActivosInactivos.push({
          name: 'Activos',
          value: totalVeterinariosActivos,
        });
        console.log('Veterinarios activos:', totalVeterinariosActivos);
      },
      (error) => console.error('Error al obtener veterinarios activos', error)
    );

    //Veterinarios inactivos
    this.kpisService.getVeterinariosInactivos().subscribe(
      (data) =>{
        const totalVeterinariosinactivos = data as number;
        this.veterinariosActivosInactivos.push({
          name: 'Inactivos',
          value: totalVeterinariosinactivos,
        });
        console.log('Veterinarios inactivos:', totalVeterinariosinactivos);
      },
      (error) => console.error('Error al obtener veterinarios inactivos', error)
    );


  }
}
