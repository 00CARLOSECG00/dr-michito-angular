import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Mascota } from '../Model/mascota';


@Component({
  selector: 'app-detalles-mascota',
  standalone: true,
  imports: [],
  templateUrl: './detalles-mascota.component.html',
  styleUrl: './detalles-mascota.component.css'
})
export class DetallesMascotaComponent {

  
  @Input() mascota!: Mascota;
  @Output() volver: EventEmitter<void> = new EventEmitter<void>();

  onVolver() {
    this.volver.emit();  // Emite el evento hacia el componente padre
  }
}
