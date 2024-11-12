import { Component } from '@angular/core';
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
import { KpisService } from '../Services/kpis.service';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BarraLateralComponent, CommonModule,ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  colorScheme = 'nightLights';

  // Datos para las gráficas
  tratamientosTotales: any;
  tratamientosPorMedicamento: any;
  topTratamientos: any;
  veterinariosActivosInactivos: any;
  mascotasActivas: any;
  totalMascotas: any;
  gananciasTotales: any;
  ventasTotales: any;


  tratamientosPorMes: any; 
  tratamientosPorVeterinario: any; 
  //
  totalVeterinarios = 0; // Total de veterinarios
  porcentajeActivos = 0;
  porcentajeInactivos = 0;
  //


  chartOptions: any = {
    cutout: 120, // Cambiado a número
    plugins: {
      legend: {
        display: false, // Oculta la leyenda
      },
    },
  };

  
  constructor(private kpisService: KpisService) {}

  ngOnInit(): void {
    this.consultarKpis();
  }

  consultarKpis(): void {
    this.kpisService.getTotalMascotas().subscribe({
      next: (data) => {
        this.totalMascotas = {
          labels: ['Total Mascotas'],
          datasets: [{ data: [data], backgroundColor: ['#42A5F5'] }],
        };
      },
    });

    this.kpisService.getTratamientosUltimoMes().subscribe({
      next: (data) => {
        this.tratamientosTotales = {
          labels: ['Tratamientos Último Mes'],
          datasets: [{ data: [data], backgroundColor: ['#66BB6A'] }],
        };
      },
    });

    this.kpisService.getMascotasActivas().subscribe({
      next: (data) => {
        this.mascotasActivas = {
          labels: ['Mascotas Activas'],
          datasets: [{ data: [data], backgroundColor: ['#FFA726'] }],
        };
      },
    });

    this.kpisService.getVeterinariosActivos().subscribe({
      next: (activos) => {
        this.kpisService.getVeterinariosInactivos().subscribe({
          next: (inactivos) => {
            this.veterinariosActivosInactivos = {
              labels: ['Activos', 'Inactivos'],
              datasets: [{ data: [activos, inactivos], backgroundColor: ['#4CAF50', '#FF5722'] }],
            };
          },
        });
      },
    });

    this.kpisService.getTratamientosPorMedicamento().subscribe({
        next: (data: any) => {
          const labels = data.map((item: any[]) => item[0]); // Nombres de los medicamentos
          const values = data.map((item: any[]) => item[1]); // Cantidad de tratamientos por medicamento
          this.tratamientosPorMedicamento = {
            labels,
            datasets: [{ data: values, backgroundColor: ['#29B6F6', '#FFCA28', '#AB47BC', '#66BB6A', '#FF7043'] }],
          };
        },
        error: (err) => console.error("Error al obtener tratamientos por medicamento:", err),
      });
      
      

    this.kpisService.getTotalGanancias().subscribe({
      next: (data) => {
        this.gananciasTotales = {
          labels: ['Ganancias Totales'],
          datasets: [{ data: [data], backgroundColor: ['#FF7043'] }],
        };
      },
    });

    this.kpisService.getTotalVentas().subscribe({
      next: (data) => {
        this.ventasTotales = {
          labels: ['Ventas Totales'],
          datasets: [{ data: [data], backgroundColor: ['#7E57C2'] }],
        };
      },
    });

    this.kpisService.getTopTratamientos().subscribe({
      next: (data: any) => {
        const labels = data.map((item: any) => item[0]);
        const values = data.map((item: any) => item[1]);
        this.topTratamientos = {
          labels,
          datasets: [{ data: values, backgroundColor: ['#8E24AA', '#FFEB3B', '#009688'] }],
        };
      },
    });

    //Nueva barras
    this.kpisService.getTratamientosPorVeterinario().subscribe({
        next: (data: any) => {
          const labels = data.map((item: any[]) => item[0]); // Nombres de los veterinarios
          const values = data.map((item: any[]) => item[1]); // Cantidad de tratamientos
          this.tratamientosPorVeterinario = {
            labels,
            datasets: [
              {
                label: 'Cantidad de Tratamientos por Veterinario',
                data: values,
                backgroundColor: '#FFA726',
              },
            ],
          };
        },
        error: (err) => console.error("Error al obtener tratamientos por veterinario:", err),
      });
    //Nueba lineas
    this.kpisService.getTratamientosPorMes().subscribe({
        next: (data: any) => {
          const labels = data.map((item: any[]) => `${item[1]}-${item[0]}`); // Formato "Año-Mes"
          const values = data.map((item: any[]) => item[2]); // Cantidad de tratamientos
          this.tratamientosPorMes = {
            labels,
            datasets: [
              {
                label: 'Tratamientos por Mes',
                data: values,
                fill: false,
                borderColor: '#42A5F5',
                tension: 0.1,
              },
            ],
          };
        },
        error: (err) => console.error("Error al obtener tratamientos por mes:", err),
      });








     
        
      this.kpisService.getVeterinariosActivos().subscribe({
        next: (activos) => {
          this.kpisService.getVeterinariosInactivos().subscribe({
            next: (inactivos) => {
                this.totalVeterinarios = Math.ceil(activos + inactivos);
              this.porcentajeActivos = parseFloat(((activos / this.totalVeterinarios) * 100).toFixed(1)); // Conversión a número
              this.porcentajeInactivos = parseFloat(((inactivos / this.totalVeterinarios) * 100).toFixed(1));
  
              this.veterinariosActivosInactivos = [
                {
                  labels: ['Activos'],
                  datasets: [
                    {
                      data: [activos, inactivos],
                      backgroundColor: ['#6a1b9a', '#d1c4e9'],
                      hoverBackgroundColor: ['#7b1fa2', '#b39ddb'],
                    },
                  ],
                },
                {
                  labels: ['Inactivos'],
                  datasets: [
                    {
                      data: [inactivos, activos],
                      backgroundColor: ['#9c27b0', '#ede7f6'],
                      hoverBackgroundColor: ['#ab47bc', '#d1c4e9'],
                    },
                  ],
                },
              ];
            },
          });
        },
      });













  }
}
