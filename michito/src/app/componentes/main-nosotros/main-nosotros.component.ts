import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-main-nosotros',
  standalone: true,
  templateUrl: './main-nosotros.component.html',
  styleUrls: ['./main-nosotros.component.css'],
  imports: [CarouselModule],
  
})
export class MainNosotrosComponent {
  
  teamMembers = [
    {
      name: 'Dra. Laura Rodríguez',
      specialty: 'Especialista en Medicina Preventiva',
      description:
        'Con 8 años de experiencia, la Dra. Rodríguez se dedica a asegurar que tu mascota reciba el mejor cuidado posible. Su pasión por la salud animal y su atención a los detalles la convierten en una profesional excepcional.',
      image: 'images/equipo_de_trabajo/LauraRodriguez.webp'
    },
    {
      name: 'Dr. Carlos Gómez',
      specialty: 'Cirujano Veterinario',
      description:
        'El Dr. Gómez es un experto en cirugía veterinaria y ortopedia, con más de 10 años de experiencia. Ha trabajado en las mejores clínicas de la región y su habilidad en el quirófano es insuperable.',
      image: 'images/equipo_de_trabajo/CarlosGomez.webp'
    },
    {
      name: 'Dra. Ana Martínez',
      specialty: 'Especialista en Medicina Interna',
      description:
        'La Dra. Martínez cuenta con 7 años de experiencia en medicina interna y diagnóstico. Su capacidad para encontrar soluciones efectivas la destacan como una pieza clave de nuestro equipo.',
      image: 'images/equipo_de_trabajo/AnaMartinez.webp'
    },
    {
      name: 'Dr. Julián López',
      specialty: 'Especialista en Dermatología',
      description:
        'Con más de 6 años de experiencia, el Dr. López se especializa en el cuidado de la piel de las mascotas. Su conocimiento y dedicación aseguran que cada animal reciba el mejor tratamiento dermatológico.',
      image: 'images/equipo_de_trabajo/JulianLopez.webp'
    },
    {
      name: 'Dra. Mariana Santos',
      specialty: 'Especialista en Neurología',
      description:
        'La Dra. Santos tiene 5 años de experiencia en neurología veterinaria. Su enfoque detallado y cuidado en los tratamientos neurológicos hace que sea una profesional muy valorada en nuestro equipo.',
      image: 'images/equipo_de_trabajo/MarianaSantos.webp'
    },
    {
      name: 'Dr. Ricardo Díaz',
      specialty: 'Especialista en Cardiología',
      description:
        'El Dr. Díaz tiene 8 años de experiencia en cardiología veterinaria. Su dedicación y conocimiento profundo en el cuidado del corazón de las mascotas aseguran tratamientos de alta calidad.',
      image: 'images/equipo_de_trabajo/RicardoDiaz.webp'
    },
    {
      name: 'Dra. Sofía Gómez',
      specialty: 'Especialista en Endocrinología',
      description:
        'La Dra. Gómez cuenta con 4 años de experiencia en endocrinología veterinaria. Su habilidad para diagnosticar y tratar trastornos hormonales en mascotas la hace una adición valiosa para nuestro equipo.',
      image: 'images/equipo_de_trabajo/SofiaGomez.webp'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}


}
