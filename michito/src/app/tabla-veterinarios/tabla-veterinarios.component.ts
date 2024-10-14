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
  veterinariosMostrados: Veterinario[] = [];
  veterinarioSeleccionado!: Veterinario | null;
  searchTerm: string = '';
  
 
  


  constructor(private http: HttpClient, private veterinarioService: VeterinarioService, private router: Router) {}
  verVeterinario(veterinario: Veterinario) {
    this.router.navigate(['/DetalleVeterinario'],{ queryParams: { id : veterinario.id } });
  }

  editarVeterinario(veterinario: Veterinario) {
    this.veterinarioService.setVeterinarioSeleccionado(veterinario);
    this.router.navigate(['/Create-Veterinario']);
  }
  

  eliminarVeterinario(veterinario: Veterinario) {
    const confirmed = confirm('¿Estás seguro de que deseas eliminar este empleado?');
    if (confirmed) {
      this.veterinarioService.deleteVeterinario(veterinario.id).subscribe({
        next: (response) => {
          console.log('Veterinario eliminado con éxito:', response);
          this.listarVeterinario();
        },
        error: (error) => {
          console.error('Error al eliminar el veterinario:', error);
        }
      });
    }
  }
  
  

  agregarVeterinario(): void {
    this.veterinarioService.setVeterinarioSeleccionado(null); // Limpiar el veterinario seleccionado
    this.router.navigate(['/Create-Veterinario']);
  }
  

  ngOnInit(): void {
  
    this.listarVeterinario();
    
  }

  listarVeterinario() {
    this.veterinarioService.obtenerVeterinarios().subscribe({
      next: (veterinarios) => {
        this.veterinarios = veterinarios;
        this.veterinariosMostrados = veterinarios;
      },

      error: (error) => {
        console.error('Error al obtener los veterinarios:', error);
      }
    });
  }
  

  atras() {
    
  }
  onSearch() {
    this.filterVeterinarios();
  }

  private filterVeterinarios() {
    if (this.searchTerm.trim() === '') {
      this.veterinariosMostrados = this.veterinarios;
    } else {
      this.veterinariosMostrados = this.veterinarios.filter(veterinario =>
        veterinario.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.page = 1;
  }
}





