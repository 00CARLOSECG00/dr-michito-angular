import { Component,Input  } from '@angular/core';
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
import { Veterinario } from '../Model/veterinario';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VeterinarioService } from '../Services/veterinario.service';

@Component({
  selector: 'app-detalles-veterinario',
  standalone: true,
  imports: [CommonModule, BarraLateralComponent, HttpClientModule],
  templateUrl: './detalles-veterinario.component.html',
  styleUrl: './detalles-veterinario.component.css'
})
export class DetallesVeterinarioComponent {
  veterinario!: Veterinario;
  constructor(
    private route: ActivatedRoute, // Inyecta ActivatedRoute
    private veterinarioService: VeterinarioService, // Inyecta el servicio
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
    // Llama al servicio para obtener la mascota
    this.veterinarioService.obtenerVeterionarioPorId(id).subscribe(
      (veterinario: Veterinario) => {
        this.veterinario = veterinario; // Asigna los datos de la mascota obtenida
      },
      error => {
        console.error('Error al obtener la mascota:', error);
      }
    );
  }

  onVolver(): void {
    this.router.navigate(['/personal']); // Navega a la lista de mascotas
  }
}
