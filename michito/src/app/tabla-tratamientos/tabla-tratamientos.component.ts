import { Component, OnInit } from '@angular/core';
import { Tratamiento } from '../Model/tratamiento';  // Importamos el modelo de Tratamiento
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
import { TratamientoService } from '../Services/tratamiento.service'; 
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(
    private route: ActivatedRoute,
    private tratamientoService: TratamientoService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
    this.router.navigate(['/DetalleTratamiento'], { queryParams: { id: tratamiento.id } });
  }

  // Editar un tratamiento
  editarTratamiento(tratamiento: Tratamiento) {
    console.log('Tratamiento seleccionado para editar:', tratamiento);
    this.tratamientoService.setTratamientoSeleccionado(tratamiento);
    this.router.navigate(['/Create-Tratamientos'], { queryParams: { id: tratamiento.id } });
  }
  
  
  

  eliminarTratamiento(tratamiento: Tratamiento) {
    const confirmed = confirm('¿Estás seguro de que deseas eliminar este tratamiento?');
    if (confirmed) {
      this.tratamientoService.eliminarTratamiento(tratamiento.id).subscribe({
        next: (response) => {
          console.log('Tratamiento eliminado con éxito:', response);
          this.listarTratamientos();  // Recargar la lista
        },
        error: (error) => {
          console.error('Error al eliminar el tratamiento:', error);
        }
      });
    }
  }
  
  

  // Agregar nuevo tratamiento
  agregarTratamiento(): void {
    this.tratamientoService.setTratamientoSeleccionado(null); // Limpiar el tratamiento seleccionado
    this.router.navigate(['/Create-Tratamientos']);
  }

  // Listar todos los tratamientos
  listarTratamientos() {
    this.tratamientoService.obtenerTratamientos().subscribe({
      next: (tratamientos: Tratamiento[]) => {  // Especifica el tipo Tratamiento[]
        this.tratamientos = tratamientos;
        this.tratamientosMostrados = tratamientos;
      }
    });
  }

// Listar tratamientos por mascota
listarTratamientosPorMascota(mascotaId: number) {
  this.tratamientoService.obtenerTratamientosPorMascota(mascotaId).subscribe({
    next: (tratamientos: Tratamiento[]) => {  // Especifica el tipo Tratamiento[]
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
