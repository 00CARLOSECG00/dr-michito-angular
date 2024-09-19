import { Component } from '@angular/core';
import { Mascota } from '../mascota';
import { MascotaService } from '../mascota.service';
import { Router } from '@angular/router';
import { BarraLateralComponent } from "../componentes/barra-lateral/barra-lateral.component";

@Component({
  selector: 'app-detalles-mascota',
  standalone: true,
  imports: [BarraLateralComponent],
  templateUrl: './detalles-mascota.component.html',
  styleUrl: './detalles-mascota.component.css'
})
export class DetallesMascotaComponent {

  mascota: Mascota = { ID: 0, nombre: '', peso: 0, edad: 0, foto: '' };

  constructor(private mascotaService: MascotaService, private router: Router) {}

  ngOnInit() {
    this.mascotaService.mascotaSeleccionada$.subscribe((mascota) => {
      if (mascota) {
        this.mascota = mascota; // Solo asigna si no es null
      }
    });
  }
  
}
