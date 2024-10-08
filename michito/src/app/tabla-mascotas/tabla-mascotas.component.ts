import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Mascota } from '../Model/mascota';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreateMascotaComponent } from '../create-mascota/create-mascota.component';
import { DetallesMascotaComponent } from '../detalles-mascota/detalles-mascota.component';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tabla-mascotas',
  standalone: true,
  imports: [CommonModule, CreateMascotaComponent, DetallesMascotaComponent, NgxPaginationModule, FormsModule],
  templateUrl: './tabla-mascotas.component.html',
  styleUrls: ['./tabla-mascotas.component.css'],
})
export class TablaMascotasComponent implements OnInit {
  @Input() idCliente!: undefined | number;  // Recibe las mascotas del cliente (si aplica)
  @Input() nombreCliente!: undefined | string;
  @Input() mostrarTodas: boolean = false;
  @Output() volvercliente: EventEmitter<void> = new EventEmitter<void>();

  page: number = 1;
  mascotas: Mascota[] = [];
  mascotasMostradas: Mascota[] = [];
  mascotaSeleccionada!: Mascota | null;
  modoEdicion: boolean = false;
  modoCreacion: boolean = false;
  modoVer: boolean = false;
  searchTerm: string = '';

  private ROOT_URL = 'http://localhost:8080/Mascotas';  // URL base del backend
  private ROOT_URL2 = 'http://localhost:8080/Clientes';

  constructor(private http: HttpClient, private router: Router) {}

  resetModo(): void {
    this.modoEdicion = false;
    this.modoCreacion = false;
    this.modoVer = false;
  }

  verMascota(mascota: Mascota) {
    this.resetModo();
    this.mascotaSeleccionada = { ...mascota };
    this.modoVer = true;
  }

  editarMascota(mascota: Mascota) {
    this.resetModo();
    this.mascotaSeleccionada = { ...mascota };
    this.modoEdicion = true;
  }

  eliminarMascota(mascota: Mascota) {
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar a ${mascota.nombre}?`);
    if (confirmacion) {
      this.http.delete(`${this.ROOT_URL}/eliminar/${mascota.id}`).subscribe({
        next: () => {
          this.mascotas = this.mascotas.filter((m) => m.id !== mascota.id);
          if (this.mostrarTodas) {
            this.listarMascotas();
          } else {
            this.mostrarMascotasCliente();
          }
        }
      });
    }
  }

  agregarMascota(): void {
    this.resetModo();
    this.modoCreacion = true;
    this.modoEdicion = false;
  }

  ngOnInit(): void {
    if (this.mostrarTodas) {
      this.listarMascotas();
    } else {
      this.mostrarMascotasCliente();
    }
  }

  listarMascotas() {
    this.http.get<Mascota[]>(`${this.ROOT_URL}/all`).subscribe({
      next: (mascotas) => {
        this.mascotas = mascotas;
        this.mascotasMostradas = mascotas;
      },
      error: (error) => {
        console.error('Error al obtener las mascotas:', error);
      }
    });
  }

  mostrarMascotasCliente() {
    this.http.get<Mascota[]>(`${this.ROOT_URL2}/Mascotas/${this.idCliente}`).subscribe({
      next: (mascotas) => {
        this.mascotas = mascotas;
        this.mascotasMostradas = mascotas;
      },
      error: (error) => {
        console.error('Error al obtener las mascotas:', error);
      }
    });
  }

  onVolver() {
    this.resetModo();
    if (this.mostrarTodas) {
      this.listarMascotas();
    } else {
      this.mostrarMascotasCliente();
      
    }
  }
  atras() {
    this.volvercliente.emit();
  }
  onSearch() {
    this.filterMascotas();
  }

  private filterMascotas() {
    if (this.searchTerm.trim() === '') {
      // Si no hay término de búsqueda, mostrar todas las mascotas
      this.mascotasMostradas = this.mascotas;
    } else {
      // Filtrar las mascotas basándose en el término de búsqueda
      this.mascotasMostradas = this.mascotas.filter(mascota =>
        mascota.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.page = 1; // Reset a la primera página cuando se realiza una búsqueda
  }
}
