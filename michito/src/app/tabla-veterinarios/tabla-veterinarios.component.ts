import { Component } from '@angular/core';
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
import {Veterinario } from '../Model/veterinario'
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import {VeterinarioService} from '../Services/veterinario.service'
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tabla-veterinarios',
  standalone: true,
  imports: [
    BarraLateralComponent,
    CommonModule,
    NgxPaginationModule,
    FormsModule
  ],
  templateUrl: './tabla-veterinarios.component.html',
  styleUrl: './tabla-veterinarios.component.css'
})
export class TablaVeterinariosComponent {
  page: number = 1;
  veterinarios: Veterinario[] = [];
  veterinariosMostradas: Veterinario[] = [];
  veterinarioSeleccionada!: Veterinario | null;
  searchTerm: string = '';
  

  // private ROOT_URL = 'http://localhost:8080/Mascotas';  // URL base del backend
  // private ROOT_URL2 = 'http://localhost:8080/Clientes';

  constructor(private http: HttpClient, private veterinarioService: VeterinarioService, private router: Router) {}
  verVeterinario(veterinario: Veterinario) {
    //this.router.navigate(['/DetalleMascota'],{ queryParams: { id : Veterinario.id } });
  }

  editarMascota(mascota: Veterinario) {
    
  }

  eliminarMascota(mascota: Veterinario) {
    // // Mostrar ventana de confirmación
    // const confirmacion = confirm(`¿Estás seguro de que deseas eliminar a ${mascota.nombre}?`);
  
    // if (confirmacion) {
    //   // Llamar al servicio para eliminar la mascota
    //   this.mascotaService.eliminarMascota(mascota.id).subscribe({
    //     next: () => {
    //       // Filtrar las listas locales de mascotas
    //       this.mascotas = this.mascotas.filter(m => m.id !== mascota.id);
    //       this.mascotasMostradas = this.mascotasMostradas.filter(m => m.id !== mascota.id);
  
    //       // Actualizar las listas según la condición de mostrarTodas
    //       if (this.mostrarTodas) {
    //         this.listarMascotas();
    //       } else {
            
    //       }
    //     },
    //     error: (error) => {
    //       console.error('Error al eliminar la mascota:', error);
    //     }
    //   });
    // }
  }
  

  agregarVeterinario(): void {
    //this.router.navigate(['/AgregarMascota']);
  }

  ngOnInit(): void {
  
    this.listarMascotas();
    
  }

  listarMascotas() {
    this.veterinarioService.obtenerMascotas().subscribe({
      next: (veterinarios) => {
        this.veterinarios = veterinarios;
        this.veterinariosMostradas = veterinarios;
      },

      error: (error) => {
        console.error('Error al obtener las mascotas:', error);
      }
    });
  }
  

  atras() {
    
  }
  onSearch() {
    this.filterMascotas();
  }

  private filterMascotas() {
    if (this.searchTerm.trim() === '') {
      this.veterinariosMostradas = this.veterinarios;
    } else {
      this.veterinariosMostradas = this.veterinarios.filter(veterinario =>
        veterinario.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.page = 1;
  }
}
