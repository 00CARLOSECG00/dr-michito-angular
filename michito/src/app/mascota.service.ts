import { Injectable } from '@angular/core';
import { Mascota } from './mascota';
import { BehaviorSubject, Observable, of } from 'rxjs';
import internal from 'node:stream';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  private mascotaSeleccionadaSource = new BehaviorSubject<Mascota | null>(null);
  mascotaSeleccionada$ = this.mascotaSeleccionadaSource.asObservable();
  mascotas :Mascota[];
  cantMascotas:number;
  constructor() {
    this.mascotas = [
      {
        ID: 1,
        nombre: 'Toby',
        peso: 2,
        edad: 12,
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJyLofiao7YQ07txy7F9i3wuwyb9cjtEWEGg&s',
      },
      {
        ID: 2,
        nombre: 'Rex',
        peso: 3,
        edad: 17,
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Vu5Oh9Jgw85wSNikDQeMVPjHxJ18ibXOsA&s',
      },
      {
        ID: 3,
        nombre: 'Luna',
        peso: 1,
        edad: 8,
        foto: 'https://images.ctfassets.net/denf86kkcx7r/4IPlg4Qazd4sFRuCUHIJ1T/f6c71da7eec727babcd554d843a528b8/gatocomuneuropeo-97?fm=webp&w=913',
      },
      {
        ID: 4,
        nombre: 'Charlie',
        peso: 3,
        edad: 16,
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoN0ClLdF0KguaLrjxctlMQEwLFpmeiL7bKA&s',
      },
      {
        ID: 5,
        nombre: 'Buddy',
        peso: 4,
        edad: 12,
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA_u2l5BvubSYezZrgWYUxbykMc_AJc-Z6TA&s',
      },
      {
        ID: 6,
        nombre: 'Lucy',
        peso: 1,
        edad: 9,
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNSoXsa-tnlnvv48zeajd1RuuPysSViowWUQ&s',
      },
      {
        ID: 7,
        nombre: 'Maggie',
        peso: 2,
        edad: 11,
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfzafApUxyGfGk2ntFguN2_rkm4UyMhgzutw&s',
      },
      {
        ID: 8,
        nombre: 'Sophie',
        peso: 4,
        edad: 13,
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj-p9ds2KazJEwcFryuZ9RRRVTe7M1shdXWg&s',
      },
      {
        ID: 9,
        nombre: 'Max',
        peso: 2,
        edad: 14,
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJyLofiao7YQ07txy7F9i3wuwyb9cjtEWEGg&s',
      },
      {
        ID: 10,
        nombre: 'Bella',
        peso: 3,
        edad: 10,
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Vu5Oh9Jgw85wSNikDQeMVPjHxJ18ibXOsA&s',
      },
      {
        ID: 11,
        nombre: 'Milo',
        peso: 1,
        edad: 6,
        foto: 'https://images.ctfassets.net/denf86kkcx7r/4IPlg4Qazd4sFRuCUHIJ1T/f6c71da7eec727babcd554d843a528b8/gatocomuneuropeo-97?fm=webp&w=913',
      },
      {
        ID: 12,
        nombre: 'Chloe',
        peso: 2,
        edad: 15,
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoN0ClLdF0KguaLrjxctlMQEwLFpmeiL7bKA&s',
      },
      {
        ID: 13,
        nombre: 'Rocky',
        peso: 4,
        edad: 11,
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA_u2l5BvubSYezZrgWYUxbykMc_AJc-Z6TA&s',
      },
      {
        ID: 14,
        nombre: 'Daisy',
        peso: 1,
        edad: 9,
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNSoXsa-tnlnvv48zeajd1RuuPysSViowWUQ&s',
      },
      {
        ID: 15,
        nombre: 'Molly',
        peso: 3,
        edad: 12,
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfzafApUxyGfGk2ntFguN2_rkm4UyMhgzutw&s',
      },
      {
        ID: 16,
        nombre: 'Bailey',
        peso: 2,
        edad: 14,
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj-p9ds2KazJEwcFryuZ9RRRVTe7M1shdXWg&s',
      },
      {
        ID: 17,
        nombre: 'Oscar',
        peso: 1,
        edad: 11,
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJyLofiao7YQ07txy7F9i3wuwyb9cjtEWEGg&s',
      },
      {
        ID: 18,
        nombre: 'Coco',
        peso: 4,
        edad: 13,
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Vu5Oh9Jgw85wSNikDQeMVPjHxJ18ibXOsA&s',
      },
      {
        ID: 19,
        nombre: 'Buster',
        peso: 2,
        edad: 16,
        foto: 'https://images.ctfassets.net/denf86kkcx7r/4IPlg4Qazd4sFRuCUHIJ1T/f6c71da7eec727babcd554d843a528b8/gatocomuneuropeo-97?fm=webp&w=913',
      },
      {
        ID: 20,
        nombre: 'Riley',
        peso: 3,
        edad: 15,
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoN0ClLdF0KguaLrjxctlMQEwLFpmeiL7bKA&s',
      },
      {
        ID: 21,
        nombre: 'Harley',
        peso: 4,
        edad: 14,
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA_u2l5BvubSYezZrgWYUxbykMc_AJc-Z6TA&s',
      },
      {
        ID: 22,
        nombre: 'Penny',
        peso: 1,
        edad: 10,
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNSoXsa-tnlnvv48zeajd1RuuPysSViowWUQ&s',
      },
      {
        ID: 23,
        nombre: 'Zoe',
        peso: 2,
        edad: 12,
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfzafApUxyGfGk2ntFguN2_rkm4UyMhgzutw&s',
      },
      {
        ID: 24,
        nombre: 'Ginger',
        peso: 3,
        edad: 9,
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj-p9ds2KazJEwcFryuZ9RRRVTe7M1shdXWg&s',
      },

      {
        ID: 25,
        nombre: 'Bella',
        peso: 2,
        edad: 13,
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA_u2l5BvubSYezZrgWYUxbykMc_AJc-Z6TA&s',
      },
    ];

    this.cantMascotas = this.mascotas.length;
  }

  seleccionarMascota(mascota: Mascota) {
    this.mascotaSeleccionadaSource.next(mascota); // Emitir mascota seleccionada
    console.log('Mascota seleccionada:', mascota);
  }

  obtenerMascotas(): Observable<any[]> {
    return of(this.mascotas); // Devuelve el arreglo como un Observable
  }

  ModificarMascota(mascota: Mascota){
    this.mascotaSeleccionadaSource.next(mascota);
    console.log('Mascota a editar:', mascota);
  }
}
