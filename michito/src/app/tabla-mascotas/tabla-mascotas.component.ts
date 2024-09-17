import { Component, OnInit } from '@angular/core';
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
import { Mascota } from '../mascota';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CreateMascotaComponent } from '../create-mascota/create-mascota.component';

@Component({
  selector: 'app-tabla-mascotas',
  standalone: true,
  imports: [
    BarraLateralComponent,
    CommonModule,
    RouterModule,
    CreateMascotaComponent,
  ],
  templateUrl: './tabla-mascotas.component.html',
  styleUrl: './tabla-mascotas.component.css',
})
export class TablaMascotasComponent {

  mascotas!: Mascota[];
  cantInicialMascotas!: number;
  mascotaSeleccionada!: Mascota | null;
  modoEdicion: boolean = false;


  editarMascota(mascota: Mascota) {
    this.mascotaSeleccionada = { ...mascota }; // Clona la mascota seleccionada
    this.modoEdicion = true; // Activa el modo edición
  }

  actualizarMascotaActualizada(mascotaActualizada: Mascota) {
    const index = this.mascotas.findIndex(m => m.ID === mascotaActualizada.ID);
    if (index !== -1) {
      this.mascotas[index] = mascotaActualizada;
    }
    this.mascotaSeleccionada = null;
    this.modoEdicion = false;
  }

  eliminarMascota(mascota: Mascota) {
    const confirmacion = confirm(
      `¿Estás seguro de que deseas eliminar a ${mascota.nombre}?`
    );
    if (confirmacion) {
      // Filtra el array de mascotas eliminando la mascota seleccionada
      this.mascotas = this.mascotas.filter((m) => m.ID !== mascota.ID);
    }
  }
  agregarMascota(nuevaMascota: Mascota): void {
    this.mascotaSeleccionada = null;
    this.modoEdicion = false;

    this.cantInicialMascotas++;
    nuevaMascota.ID = this.cantInicialMascotas;

    this.mascotas.push(nuevaMascota);
    console.log('Tabla componente Mascota agregada:', nuevaMascota);
  }

  
  ngOnInit(): void {
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

    this.cantInicialMascotas = this.mascotas.length;
  }
}
