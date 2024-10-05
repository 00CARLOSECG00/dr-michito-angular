import { Component, OnInit, Input , Output, EventEmitter} from '@angular/core';
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
  @Input() idCliente!: undefined | number;  // Recibe las mascotas del cliente (si aplica)
  @Input() nombreCliente!: undefined | string;
  @Input() mostrarTodas: boolean = false;
  @Output() volvercliente: EventEmitter<void> = new EventEmitter<void>();
  mascotas: Mascota[] = [];
  mascotaSeleccionada!: Mascota | null;
  modoEdicion: boolean = false;
  modoCreacion: boolean = false;
  modoVer: boolean = false;
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

  // Activar el modo edición para editar la mascota seleccionada
  editarMascota(mascota: Mascota) {
    this.resetModo();
    this.mascotaSeleccionada = { ...mascota };  // Clona la mascota seleccionada
    this.modoEdicion = true;  // Activa el modo edición
  }

  // Elimina la mascota haciendo una petición DELETE al backend
  eliminarMascota(mascota: Mascota) {
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar a ${mascota.nombre}?`);
    if (confirmacion) {
      this.http.delete(`${this.ROOT_URL}/eliminar/${mascota.id}`).subscribe({
        next: () => {
          // Eliminar la mascota localmente después de la eliminación exitosa
          this.mascotas = this.mascotas.filter((m) => m.id !== mascota.id);
          if (this.mostrarTodas) {
            this.listarMascotas();  // Opcional: Si prefieres recargar todas las mascotas después de eliminar
          } else {
            this.mostrarMascotasCliente();  // Actualiza la lista de mascotas del cliente
          }
        }
      });
    }
  }

  // Agregar una nueva mascota 
  agregarMascota(): void {
    this.resetModo();
    this.modoCreacion = true;
  }

  // Inicializa el componente
  ngOnInit(): void {
    if (this.mostrarTodas) {
      this.listarMascotas();  // Cargar todas las mascotas si mostrarTodas es true
    } else {
      this.mostrarMascotasCliente();  // Mostrar solo las mascotas del cliente si mostrarTodas es false
    }
  }

  // Método para listar todas las mascotas desde el backend
  listarMascotas() {
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

  // Método para mostrar las mascotas del cliente
  mostrarMascotasCliente() {
    this.http.get<Mascota[]>(`${this.ROOT_URL2}/Mascotas/${this.idCliente}`).subscribe({
      next: (mascotas) => {
        this.mascotas = mascotas;  // Asigna el arreglo de mascotas al componente
        console.log('Mascotas obtenidas:', this.mascotas);
      },
      error: (error) => {
        console.error('Error al obtener las mascotas:', error);
      }
    });
  }
  onVolver() {
    this.volvercliente.emit();
  }
}
