import { Component, OnInit } from '@angular/core';
import { Mascota } from '../Model/mascota';
import { MascotaDTO } from '../Model/mascota-dto'; // Importamos MascotaDTO
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
import { MascotaService } from '../Services/mascota.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla-mascotas',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule, HttpClientModule, BarraLateralComponent],
  templateUrl: './tabla-mascotas.component.html',
  styleUrls: ['./tabla-mascotas.component.css'],
})
export class TablaMascotasComponent implements OnInit {
  mostrarTodas: boolean = true;
  nombreCliente: string = "elmismodesiempre";
  page: number = 1;
  mascotas: Mascota[] = [];
  mascotasMostradas: Mascota[] = [];
  mascotaSeleccionada!: Mascota | null;
  searchTerm: string = '';

  constructor(private http: HttpClient, private mascotaService: MascotaService, private router: Router) {}

  ngOnInit(): void {
    if (this.mostrarTodas) {
      this.listarMascotas();
    } 
  }

  // Ver detalle de la mascota
  verMascota(mascota: Mascota) {
    this.router.navigate(['/DetalleMascota'], { queryParams: { id: mascota.id } });
  }

  // Editar una mascota
  // tabla-mascotas.component.ts
  editarMascota(mascota: Mascota) {
    const mascotaDTO = this.convertirMascotaADTO(mascota);  // Convertimos a DTO
    console.log('Mascota enviada al servicio:', mascotaDTO);  // Verificar en la consola
    this.mascotaService.setMascotaSeleccionada(mascotaDTO);  // Seteamos la mascota seleccionada
    this.router.navigate(['/AgregarMascota']);  // Navegar al componente de edición
  }


  private convertirMascotaADTO(mascota: Mascota): MascotaDTO {
    return{
      id: mascota.id,
      nombre: mascota.nombre,
      peso: mascota.peso,
      edad: mascota.edad,
      foto: mascota.foto,
      // Si 'Mascota' no tiene 'cedulaCliente', pero tiene un cliente vinculado, obtén la cédula del cliente
      cedulaCliente: mascota.cedulaCliente || ''  // O ajustar si tienes la relación cliente en otro lugar
    };
  }
  
  
  
  // Eliminar una mascota
  eliminarMascota(mascota: Mascota) {
    const confirmed = confirm('¿Estás seguro de que deseas eliminar esta mascota?');
    if (confirmed) {
      this.mascotaService.eliminarMascota(mascota.id).subscribe({
        next: (response) => {
          console.log('Mascota eliminada con éxito:', response);
          this.listarMascotas();
        },
        error: (error) => {
          console.error('Error al eliminar la mascota:', error);
        }
      });
    }
  }

  // Agregar nueva mascota
  agregarMascota(): void {
    this.mascotaService.setMascotaSeleccionada(null); // Limpiar la mascota seleccionada
    this.router.navigate(['/AgregarMascota']);
  }

  // Listar todas las mascotas
  listarMascotas() {
    this.mascotaService.obtenerMascotas().subscribe({
      next: (mascotas) => {
        this.mascotas = mascotas;
        this.mascotasMostradas = mascotas;
      },
      error: (error) => {
        console.error('Error al obtener las mascotas:', error);
      }
    });
  }

  // Búsqueda de mascotas
  onSearch() {
    this.filterMascotas();
  }

  // Filtrar las mascotas en base al término de búsqueda
  private filterMascotas() {
    if (this.searchTerm.trim() === '') {
      this.mascotasMostradas = this.mascotas;
    } else {
      this.mascotasMostradas = this.mascotas.filter(mascota =>
        mascota.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.page = 1;
  }

  

  // Función para manejar ir hacia atrás o alguna acción de retroceso
  atras() {
    // Lógica para manejar la navegación hacia atrás o algún otro evento
  }
}
