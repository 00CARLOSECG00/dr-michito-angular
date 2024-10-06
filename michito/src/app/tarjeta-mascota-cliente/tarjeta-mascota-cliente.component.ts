import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Mascota } from '../Model/mascota';

@Component({
  selector: 'app-tarjeta-mascota-cliente',
  standalone: true,
  templateUrl: './tarjeta-mascota-cliente.component.html',
  styleUrls: ['./tarjeta-mascota-cliente.component.css']
})
export class TarjetaMascotaClienteComponent {
  @Input() mascota!: Mascota;
  @Output() detalles: EventEmitter<Mascota> = new EventEmitter<Mascota>();
  verDetalles() {
    console.log('Detalles de la mascota:', this.mascota);
    this.detalles.emit(this.mascota);
  }
}
