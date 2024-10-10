import { Component, OnInit } from '@angular/core';
import { Mascota } from '../Model/mascota';
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
  nombreCliente: string ="elmismodesiempre";
  page: number = 1;
  mascotas: Mascota[] = [];
  mascotasMostradas: Mascota[] = [];
  mascotaSeleccionada!: Mascota | null;
  searchTerm: string = '';
  

  // private ROOT_URL = 'http://localhost:8080/Mascotas';  // URL base del backend
  // private ROOT_URL2 = 'http://localhost:8080/Clientes';

  constructor(private http: HttpClient, private mascotaService: MascotaService, private router: Router) {}
  verMascota(mascota: Mascota) {
    this.router.navigate(['/DetalleMascota'],{ queryParams: { id : mascota.id } });
  }

  editarMascota(mascota: Mascota) {
    
  }

  eliminarMascota(mascota: Mascota) {
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
  

  agregarMascota(): void {
    this.router.navigate(['/AgregarMascota']);
  }

  ngOnInit(): void {
    if (this.mostrarTodas) {
      this.listarMascotas();
    } 
  }

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
  

  atras() {
    
  }
  onSearch() {
    this.filterMascotas();
  }

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
