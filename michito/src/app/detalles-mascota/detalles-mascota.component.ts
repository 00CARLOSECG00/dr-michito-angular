import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Mascota } from '../Model/mascota';
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MascotaService } from '../Services/mascota.service';



@Component({
  selector: 'app-detalles-mascota',
  standalone: true,
  imports: [CommonModule, BarraLateralComponent, HttpClientModule],
  templateUrl: './detalles-mascota.component.html',
  styleUrl: './detalles-mascota.component.css'
})
export class DetallesMascotaComponent {
  mascota!: Mascota;
  constructor(
    private route: ActivatedRoute, // Inyecta ActivatedRoute
    private mascotaService: MascotaService, // Inyecta el servicio
    private router: Router
  ) {}
  ngOnInit(): void {
    // Obtén el id de los queryParams y llama al servicio para obtener la mascota
    this.route.queryParams.subscribe(params => {
      const id = +params['id']; // Obtiene el parámetro 'id' de la URL y lo convierte a número
      if (id) {
        this.obtenerMascota(id); // Llama a la función que obtiene la mascota
      }
    });
  }

  obtenerMascota(id: number): void {
    this.mascotaService.obtenerMascotasPorId(id).subscribe(
      (mascota: Mascota) => {
        this.mascota = mascota; // Asigna los datos de la mascota obtenida
      },
      error => {
        console.error('Error al obtener la mascota:', error);
      }
    );
  }

  onVolver(): void {
    history.back();
  }
}
