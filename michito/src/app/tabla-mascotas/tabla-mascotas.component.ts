import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Mascota } from '../Model/mascota';
import { MascotaDTO } from '../Model/mascota-dto';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
import { MascotaService } from '../Services/mascota.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api'; // Importa el servicio de confirmación

@Component({
  selector: 'app-tabla-mascotas',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule, HttpClientModule, BarraLateralComponent, ConfirmDialogModule],
  providers: [ConfirmationService], // Agrega ConfirmationService en providers
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
  clienteId!: number;

  constructor(
    private route: ActivatedRoute,
    private mascotaService: MascotaService,
    private router: Router,
    private confirmationService: ConfirmationService // Inyecta ConfirmationService
  ) {}
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.clienteId = params['clienteId'];
      if (this.clienteId) {
        this.listarMascotasPorCliente(this.clienteId);
      } else {
        this.listarMascotas();
      }
    });
  }

  // Ver detalle de la mascota
  verMascota(mascota: Mascota) {
    this.router.navigate(['/DetalleMascota'], { queryParams: { id: mascota.id } });
  }

  // Editar una mascota
  editarMascota(mascota: Mascota) {
    const mascotaDTO = this.convertirMascotaADTO(mascota);
    console.log('Mascota enviada al servicio:', mascotaDTO);
    this.mascotaService.setMascotaSeleccionada(mascotaDTO);
    this.router.navigate(['/AgregarMascota']);
  }

  private convertirMascotaADTO(mascota: Mascota): MascotaDTO {
    return {
      id: mascota.id,
      nombre: mascota.nombre,
      peso: mascota.peso,
      edad: mascota.edad,
      foto: mascota.foto,
      cedulaCliente: mascota.cedulaCliente || '',
      estado:true
    };
  }

  // Método modificado de eliminar mascota
  eliminarMascota(mascota: Mascota) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar esta mascota?',
      accept: () => {
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
    });
  }

  // Agregar nueva mascota
  agregarMascota(): void {
    this.mascotaService.setMascotaSeleccionada(null);
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

  // Listar mascotas por cliente
  listarMascotasPorCliente(clienteId: number) {
    this.mascotaService.obtenerMascotasPorCliente(clienteId).subscribe({
      next: (mascotas) => {
        this.mascotas = mascotas;
        this.mascotasMostradas = mascotas;
      },
      error: (error) => {
        console.error('Error al obtener las mascotas del cliente:', error);
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
}