import { Component, OnInit } from '@angular/core';
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
import { Mascota } from '../mascota';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CreateMascotaComponent } from '../create-mascota/create-mascota.component';
import { MascotaService } from '../mascota.service';

@Component({
  selector: 'app-tabla-mascotas',
  standalone: true,
  imports: [
    BarraLateralComponent,
    CommonModule,
    RouterModule,
    CreateMascotaComponent,
  ],
  templateUrl: './tabla-mascotas.component.html',
  styleUrl: './tabla-mascotas.component.css',
})
export class TablaMascotasComponent {

  mascotas!: Mascota[];
  cantInicialMascotas!: number;
  mascotaSeleccionada!: Mascota | null;
  modoEdicion: boolean = false;


  constructor(private mascotaService: MascotaService, private router: Router) {}

  
  verMascota(mascota: Mascota) {
    this.mascotaService.seleccionarMascota(mascota); // Pasar la mascota al servicio para verla
    this.router.navigate(['/detalles-mascota']); // Navegar al componente de detalles
  }

  editarMascota(mascota: Mascota) {
    this.mascotaSeleccionada = { ...mascota }; // Clona la mascota seleccionada
    this.modoEdicion = true; // Activa el modo edición
  }

  actualizarMascotaActualizada(mascotaActualizada: Mascota) {
    const index = this.mascotas.findIndex(m => m.ID === mascotaActualizada.ID);
    if (index !== -1) {
      this.mascotas[index] = mascotaActualizada;
    }
    this.mascotaSeleccionada = null;
    this.modoEdicion = false;
  }

  eliminarMascota(mascota: Mascota) {
    const confirmacion = confirm(
      `¿Estás seguro de que deseas eliminar a ${mascota.nombre}?`
    );
    if (confirmacion) {
      // Filtra el array de mascotas eliminando la mascota seleccionada
      this.mascotas = this.mascotas.filter((m) => m.ID !== mascota.ID);
    }
  }
  agregarMascota(nuevaMascota: Mascota): void {
    this.mascotaSeleccionada = null;
    this.modoEdicion = false;

    this.cantInicialMascotas++;
    nuevaMascota.ID = this.cantInicialMascotas;

    this.mascotas.push(nuevaMascota);
    console.log('Tabla componente Mascota agregada:', nuevaMascota);
  }

  
  ngOnInit(): void {
    this.mascotaService.obtenerMascotas().subscribe((mascotas) => {
      this.mascotas = mascotas; // Asigna el arreglo de mascotas al componente
      console.log('Mascotas obtenidas:', this.mascotas);
    });
  }
}
