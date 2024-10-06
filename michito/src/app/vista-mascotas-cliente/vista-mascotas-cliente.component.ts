import { Component } from '@angular/core';
import { DetallesMascotaComponent } from '../detalles-mascota/detalles-mascota.component';
import { TarjetaMascotaClienteComponent } from '../tarjeta-mascota-cliente/tarjeta-mascota-cliente.component';
import { Mascota } from '../Model/mascota';

@Component({
  selector: 'app-vista-mascotas-cliente',
  standalone: true,
  imports: [DetallesMascotaComponent, TarjetaMascotaClienteComponent],
  templateUrl: './vista-mascotas-cliente.component.html',
  styleUrls: ['./vista-mascotas-cliente.component.css']
})
export class VistaMascotasClienteComponent {
  modoVer: boolean = false;
  mascotaSeleccionada!: Mascota;
  mascotas: Mascota[] = [];

  ngOnInit(): void {
    this.modoVer = false;
  }
}
