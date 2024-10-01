import { Component, OnInit } from '@angular/core';
import { Mascota } from '../Model/mascota';
import { HttpClient } from '@angular/common/http';  // Importamos HttpClient para hacer peticiones
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreateMascotaComponent } from '../create-mascota/create-mascota.component';
import { DetallesMascotaComponent } from '../detalles-mascota/detalles-mascota.component';
@Component({
  selector: 'app-tabla-mascotas',
  standalone: true,
  imports: [CommonModule, CreateMascotaComponent, DetallesMascotaComponent],
  templateUrl: './tabla-mascotas.component.html',
  styleUrl: './tabla-mascotas.component.css',
})
export class TablaMascotasComponent implements OnInit {

  mascotas!: Mascota[];
  mascotaSeleccionada!: Mascota | null;
  modoEdicion: boolean = false;
  modoCreacion: boolean = false;
  modoVer: boolean = false;
  private ROOT_URL = 'http://localhost:8080/Mascotas';  // URL base del backend

  constructor(private http: HttpClient, private router: Router) {}

  /*** Navegar a la vista de detalles de la mascota seleccionada
  verMascota(mascota: Mascota) {
    this.http.get<Mascota>(`${this.ROOT_URL}/vistaDetalle/${mascota.id}`).subscribe({
      next: (detallesMascota) => {
        this.mascotaSeleccionada = detallesMascota;
        this.modoVer = true;
      },
      error: (error) => {
        console.error('Error al cargar detalles de la mascota:', error);
      }
    });
  }*/
 verMascota(mascota: Mascota) {
   this.mascotaSeleccionada = { ...mascota };
   this.modoVer = true;
   console.log('Mascota seleccionada:', this.mascotaSeleccionada); // Debugging
 }
  // Activar el modo edición para editar la mascota seleccionada
  editarMascota(mascota: Mascota) {
    this.mascotaSeleccionada = { ...mascota };  // Clona la mascota seleccionada
    this.modoEdicion = true;  // Activa el modo edición
  }

  // Actualiza la mascota después de la edición
  actualizarMascotaActualizada(mascotaActualizada: Mascota) {
    const index = this.mascotas.findIndex(m => m.id === mascotaActualizada.id);
    if (index !== -1) {
      this.mascotas[index] = mascotaActualizada;
    }
    this.mascotaSeleccionada = null;
    this.modoEdicion = false;
  }

  // Elimina la mascota haciendo una petición DELETE al backend
  eliminarMascota(mascota: Mascota) {
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar a ${mascota.nombre}?`);
    if (confirmacion) {
      this.http.delete(`${this.ROOT_URL}/eliminar/${mascota.id}`).subscribe({
        next: () => {
          // Eliminar la mascota localmente después de la eliminación exitosa
          this.mascotas = this.mascotas.filter((m) => m.id !== mascota.id);
          this.listarMascotas();
        }
      });
    }
  }

  // Agregar una nueva mascota haciendo una petición POST al backend
  agregarMascota(nuevaMascota: Mascota): void {
    this.mascotaSeleccionada = null;
    this.modoEdicion = false;

    this.http.post<Mascota>(`${this.ROOT_URL}/agregar`, nuevaMascota).subscribe({
      next: (mascotaAgregada) => {
        this.mascotas.push(mascotaAgregada);
        console.log('Mascota agregada:', mascotaAgregada);
      },
      error: (error) => {
        console.error('Error al agregar la mascota:', error);
      }
    });
  }

  // Inicializa el componente cargando las mascotas desde el backend
  ngOnInit(): void {
   this.listarMascotas();
  }
  listarMascotas(){
    this.http.get<Mascota[]>(`${this.ROOT_URL}/all`).subscribe({
      next: (mascotas) => {
        this.mascotas = mascotas;  // Asigna el arreglo de mascotas al componente
        console.log('Mascotas obtenidas:', this.mascotas);
      },
      error: (error) => {
        console.error('Error al obtener las mascotas:', error);
      }
    });
  }
}
