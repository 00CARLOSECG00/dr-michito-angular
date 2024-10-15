import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
import { KpisService } from '../Services/kpis.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgxChartsModule, BarraLateralComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  view: number[] = [700, 400];
  colorScheme = 'nightLights';

  tratamientosTotales = [
    { name: 'Tratamientos Durante el Último Mes', value: 0 },
  ];
  tratamientosPorMedicamento: { name: string; value: number }[] = [];
  topTratamientos: { name: string; value: number }[] = [];
  veterinariosActivosInactivos: { name: string; value: number }[] = [];
  mascotasActivas = [{ name: 'Mascotas Activas', value: 0 }];
  totalMascotas = [{ name: 'Total Mascotas', value: 1 }];
  gananciasTotales: { name: string; value: number }[] = [];
  ventasTotales: { name: string; value: number }[] = [];

  constructor(private kpisService: KpisService) {}

  ngOnInit(): void {
    // Llamar al servicio para obtener los datos de tratamientos y demas cuando se inicia
    this.consultarKpis();
  }

  ngOnCharged(): void {
    // Llamar al service para obtener los datos de tratamiento cuando se carga
    this.consultarKpis();
  }

  consultarKpis(): void {
    // Total de mascotas
    this.kpisService.getTotalMascotas().subscribe({
        next: (data) => {
            const totalMascotas = data as number;
            this.totalMascotas = [{ name: 'Total Mascotas', value: totalMascotas }];
        },
        error: (error) => console.error('Error al obtener total de mascotas', error),
        complete: () => console.log('Consulta de total de mascotas completada')
    });

    // Llamar al servicio para obtener los datos de tratamientos
    this.kpisService.getTratamientosUltimoMes().subscribe({
        next: (data) => {
            const totalTratamientos = data as number;
            this.tratamientosTotales = [
                {
                    name: 'Tratamientos Durante el Último Mes',
                    value: totalTratamientos,
                },
            ];
        },
        error: (error) => console.error('Error al obtener tratamientos totales', error),
        complete: () => console.log('Consulta de tratamientos completada')
    });

    // Mascotas activas
    this.kpisService.getMascotasActivas().subscribe({
        next: (data) => {
            const mascotasActivas = data as number;
            this.mascotasActivas = [
                { name: 'Mascotas Activas', value: mascotasActivas },
            ];
        },
        error: (error) => console.error('Error al obtener mascotas activas', error),
        complete: () => console.log('Consulta de mascotas activas completada')
    });

    // Veterinarios activos
    this.kpisService.getVeterinariosActivos().subscribe({
        next: (data) => {
            const totalVeterinariosActivos = data as number;
            this.veterinariosActivosInactivos.push({
                name: 'Activos',
                value: totalVeterinariosActivos,
            });
        },
        error: (error) => console.error('Error al obtener veterinarios activos', error),
        complete: () => console.log('Consulta de veterinarios activos completada')
    });

    // Veterinarios inactivos
    this.kpisService.getVeterinariosInactivos().subscribe({
        next: (data) => {
            const totalVeterinariosinactivos = data as number;
            this.veterinariosActivosInactivos.push({
                name: 'Inactivos',
                value: totalVeterinariosinactivos,
            });
        },
        error: (error) => console.error('Error al obtener veterinarios inactivos', error),
        complete: () => console.log('Consulta de veterinarios inactivos completada')
    });

    // Medicamentos y cantidad suministrada en el último mes
    this.kpisService.getTratamientosPorMedicamento().subscribe({
        next: (data: any) => {
            // Transformar los datos en el formato requerido por ngx-charts
            this.tratamientosPorMedicamento = data.map((item: any[]) => {
                return { name: item[0], value: item[1] };
            });
        },
        error: (error) => console.error('Error al obtener tratamientos por medicamento', error),
        complete: () => console.log('Consulta de tratamientos por medicamento completada')
    });

    this.kpisService.getTotalGanancias().subscribe({
        next: (data) => {
            const totalGanancias = data as number;
            this.gananciasTotales = [                {
              name: 'Ganancias Totales',
              value: totalGanancias,
          },];
        },
        error: (error) => console.error('Error al obtener total de ganancias', error),
        complete: () => console.log('Consulta de total de ganancias completada')
    });

    this.kpisService.getTotalVentas().subscribe({
        next: (data) => {
            const totalVentas = data as number;
            this.ventasTotales = [                {
              name: 'Ventas Totales',
              value: totalVentas,
          },];
        },
        error: (error) => console.error('Error al obtener total de ventas', error),
        complete: () => console.log('Consulta de total de ventas completada')
    });

    this.kpisService.getTopTratamientos().subscribe({
        next: (data: any) => {
          this.topTratamientos = data.map((item: any) => {
            return { name: item[0], value: item[1] };
          });
          console.log(this.topTratamientos);
        },
        error: (error) => console.error('Error al obtener tratamientos por medicamento', error),
        complete: () => console.log('Consulta de tratamientos por medicamento completada')
      });

  }
}
