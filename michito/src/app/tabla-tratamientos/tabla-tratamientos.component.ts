import { Component, Input, OnInit } from '@angular/core';
import { Tratamiento } from '../Model/tratamiento'; 
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
import { TratamientoService } from '../Services/tratamiento.service'; 
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../Services/auth.service'; // Importamos el AuthService para verificar el tipo de usuario

@Component({
  selector: 'app-tabla-tratamientos',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule, HttpClientModule, BarraLateralComponent],
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
  idVeterinario!: number | null;  // ID del veterinario autenticado

  constructor(
    private route: ActivatedRoute,
    private tratamientoService: TratamientoService,
    private router: Router,
    private authService: AuthService  // Inyectamos AuthService
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

    // Modificar esta parte para manejar ambos casos
    if (this.mostrarSoloMascota && this.mascotaId) {
      // Si es componente hijo de detalle-mascota, mostrar solo tratamientos de esa mascota
      this.listarTratamientosPorMascota(this.mascotaId);
    } else {
      // Si es componente independiente, revisar queryParams
      this.route.queryParams.subscribe(params => {
        const mascotaIdParam = params['mascotaId'];
        if (mascotaIdParam) {
          this.mascotaId = +mascotaIdParam;  // Asignamos al Input mascotaId
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
      const confirmed = confirm('¿Estás seguro de que deseas eliminar este tratamiento?');
      if (confirmed) {
        this.tratamientoService.eliminarTratamiento(tratamiento.id).subscribe({
          next: (response) => {
            console.log('Tratamiento eliminado con éxito:', response);
            this.listarTratamientos(); 
          },
          error: (error) => {
            console.error('Error al eliminar el tratamiento:', error);
          }
        });
      }
    }
  }

  // Agregar nuevo tratamiento (solo para admin o veterinario)
  agregarTratamiento(): void {
    if (this.esAdmin || this.esVeterinario) {
      this.tratamientoService.setTratamientoSeleccionado(null); 
      this.router.navigate(['/Create-Tratamientos']);
    }
  }

  // Listar todos los tratamientos
  listarTratamientos() {
    if(this.mostrarSoloMascota && this.mascotaId) {
      this.listarTratamientosPorMascota(this.mascotaId);
    }else {
      if (this.esCliente && this.idCliente) {
        // Si es cliente, mostrar solo los tratamientos de sus mascotas
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
        // Si es veterinario, mostrar solo los tratamientos que él realizó
        this.tratamientoService.obtenerTratamientosPorVeterinario(this.idVeterinario).subscribe({
          next: (tratamientos: Tratamiento[]) => {
            this.tratamientos = tratamientos;
            this.tratamientosMostrados = tratamientos;
          }
        });
  
      } else if (this.esAdmin) {
        // Si es admin, mostrar todos los tratamientos
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

  // Listar tratamientos por mascota (independiente del tipo de usuario)
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

  // Búsqueda de tratamientos
  onSearch() {
    this.filterTratamientos();
  }

  // Filtrar los tratamientos en base al término de búsqueda
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
