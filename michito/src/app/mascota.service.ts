import { Injectable } from '@angular/core';
import { Mascota } from './mascota';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  private mascotaSeleccionadaSource = new BehaviorSubject<Mascota | null>(null);
  mascotaSeleccionada$ = this.mascotaSeleccionadaSource.asObservable();

  constructor() {}

  seleccionarMascota(mascota: Mascota) {
    this.mascotaSeleccionadaSource.next(mascota); // Emitir mascota seleccionada
    console.log('Mascota seleccionada:', mascota);
  }
}
