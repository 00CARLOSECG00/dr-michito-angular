import { Component, OnInit } from '@angular/core';
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
  mostrarTodos: boolean = true;
  nombreMascota: string = "elmismodesiempre";
  page: number = 1;
  tratamientos: Tratamiento[] = [];
  tratamientosMostrados: Tratamiento[] = [];
  tratamientoSeleccionado!: Tratamiento | null;
  searchTerm: string = '';
  mascotaId!: number;
  esVeterinario: boolean = false;
  esAdmin: boolean = false;
  esCliente: boolean = false;
  idCliente!: number | null;

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
    } else if (userType === 'cliente') {
      this.esCliente = true;
      this.idCliente = this.authService.getClienteId(); // Obtenemos el ID del cliente logueado
    }

    this.route.queryParams.subscribe(params => {
      this.mascotaId = params['mascotaId'];
      if (this.mascotaId) {
        this.listarTratamientosPorMascota(this.mascotaId);
      } else {
        this.listarTratamientos();
      }
    });
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

  // Listar todos los tratamientos (si es cliente, mostrar solo tratamientos de sus mascotas)
  listarTratamientos() {
    if (this.esCliente && this.idCliente) {
      this.tratamientoService.obtenerTratamientosPorCliente(this.idCliente).subscribe({
        next: (tratamientos: Tratamiento[]) => {
          this.tratamientos = tratamientos;
          this.tratamientosMostrados = tratamientos;
        }
      });
    } else {
      this.tratamientoService.obtenerTratamientos().subscribe({
        next: (tratamientos: Tratamiento[]) => { 
          this.tratamientos = tratamientos;
          this.tratamientosMostrados = tratamientos;
        }
      });
    }
  }

  // Listar tratamientos por mascota
  listarTratamientosPorMascota(mascotaId: number) {
    this.tratamientoService.obtenerTratamientosPorMascota(mascotaId).subscribe({
      next: (tratamientos: Tratamiento[]) => { 
        this.tratamientos = tratamientos;
        this.tratamientosMostrados = tratamientos;
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
