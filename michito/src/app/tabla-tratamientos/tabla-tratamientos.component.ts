import { Component, Input, OnInit } from '@angular/core';
import { Tratamiento } from '../Model/tratamiento'; 
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
import { TratamientoService } from '../Services/tratamiento.service'; 
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-tabla-tratamientos',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule, HttpClientModule, BarraLateralComponent, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './tabla-tratamientos.component.html',
  styleUrls: ['./tabla-tratamientos.component.css'],
})
export class TablaTratamientosComponent implements OnInit {
  @Input() mostrarSoloMascota: boolean = false;
  @Input() mascotaId?: number;

  mostrarTodos: boolean = true;
  nombreMascota: string = "elmismodesiempre";
  page: number = 1;
  tratamientos: Tratamiento[] = [];
  tratamientosMostrados: Tratamiento[] = [];
  tratamientoSeleccionado!: Tratamiento | null;
  searchTerm: string = '';
  
  esVeterinario: boolean = false;
  esAdmin: boolean = false;
  esCliente: boolean = false;
  idCliente!: number | null;
  idVeterinario!: number | null;

  constructor(
    private route: ActivatedRoute,
    private tratamientoService: TratamientoService,
    private router: Router,
    private authService: AuthService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    const userType = this.authService.getUserType();
    
    if (userType === 'admin') {
      this.esAdmin = true;
    } else if (userType === 'veterinario') {
      this.esVeterinario = true;
      this.idVeterinario = this.authService.getVeterinarioId();
    } else {
      this.esCliente = true;
      this.idCliente = this.authService.getClienteId();
    }

    if (this.mostrarSoloMascota && this.mascotaId) {
      this.listarTratamientosPorMascota(this.mascotaId);
    } else {
      this.route.queryParams.subscribe(params => {
        const mascotaIdParam = params['mascotaId'];
        if (mascotaIdParam) {
          this.mascotaId = +mascotaIdParam;
          this.listarTratamientosPorMascota(this.mascotaId);
        } else {
          this.listarTratamientos();
        }
      });
    }
  }

  // Ver detalle del tratamiento
  verTratamiento(tratamiento: Tratamiento) {
    this.router.navigate(['/DetalleTratamientos'], { queryParams: { id: tratamiento.id } });
  }

  // Editar un tratamiento (solo para admin o veterinario)
  editarTratamiento(tratamiento: Tratamiento) {
    if (this.esAdmin || this.esVeterinario) {
      this.tratamientoService.setTratamientoSeleccionado(tratamiento);
      this.router.navigate(['/Create-Tratamientos'], { queryParams: { id: tratamiento.id } });
    }
  }

  // Eliminar un tratamiento (solo para admin o veterinario)
  eliminarTratamiento(tratamiento: Tratamiento) {
    if (this.esAdmin || this.esVeterinario) {
      this.confirmationService.confirm({
        message: '¿Estás seguro de que deseas eliminar este tratamiento?',
        header: 'Confirmación de Eliminación',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sí',
        rejectLabel: 'No',
        accept: () => {
          this.procederEliminarTratamiento(tratamiento.id);
        }
      });
    }
  }

  procederEliminarTratamiento(id: number) {
    this.tratamientoService.eliminarTratamiento(id).subscribe({
      next: () => {
        console.log('Tratamiento eliminado correctamente');
        this.listarTratamientos(); 
      },
      error: (error) => {
        console.error('Error al eliminar tratamiento:', error);
      }
    });
  }

  agregarTratamiento(): void {
    if (this.esAdmin || this.esVeterinario) {
      this.tratamientoService.setTratamientoSeleccionado(null); 
      this.router.navigate(['/Create-Tratamientos']);
    }
  }

  listarTratamientos() {
    if(this.mostrarSoloMascota && this.mascotaId) {
      this.listarTratamientosPorMascota(this.mascotaId);
    } else {
      if (this.esCliente && this.idCliente) {
        this.tratamientoService.obtenerTratamientosPorCliente(this.idCliente).subscribe({
          next: (tratamientos: Tratamiento[]) => {
            this.tratamientos = tratamientos;
            this.tratamientosMostrados = tratamientos;
          },
          error: (error) => {
            console.error('Error al obtener los tratamientos del cliente:', error);
          }
        });
  
      } else if (this.esVeterinario && this.idVeterinario) {
        this.tratamientoService.obtenerTratamientosPorVeterinario(this.idVeterinario).subscribe({
          next: (tratamientos: Tratamiento[]) => {
            this.tratamientos = tratamientos;
            this.tratamientosMostrados = tratamientos;
          }
        });
  
      } else if (this.esAdmin) {
        this.tratamientoService.obtenerTratamientos().subscribe({
          next: (tratamientos: Tratamiento[]) => { 
            this.tratamientos = tratamientos;
            this.tratamientosMostrados = tratamientos;
          },
          error: (error) => {
            console.error('Error al obtener los tratamientos:', error);
          }
        });
      }
    }
  }

  listarTratamientosPorMascota(mascotaId: number) {
    this.tratamientoService.obtenerTratamientosPorMascota(mascotaId).subscribe({
      next: (tratamientos: Tratamiento[]) => { 
        this.tratamientos = tratamientos;
        this.tratamientosMostrados = tratamientos;
      },
      error: (error) => {
        console.error('Error al obtener los tratamientos por mascota:', error);
      }
    });
  }

  onSearch() {
    this.filterTratamientos();
  }

  private filterTratamientos() {
    if (this.searchTerm.trim() === '') {
      this.tratamientosMostrados = this.tratamientos;
    } else {
      this.tratamientosMostrados = this.tratamientos.filter(tratamiento =>
        tratamiento.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.page = 1;
  }
}
