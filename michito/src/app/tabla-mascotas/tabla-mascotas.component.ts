import { Component,OnInit } from '@angular/core';
import{BarraLateralComponent} from'../componentes/barra-lateral/barra-lateral.component'
import{Mascota} from'../mascota'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabla-mascotas',
  standalone: true,
  imports: [BarraLateralComponent,CommonModule,RouterModule],
  templateUrl: './tabla-mascotas.component.html',
  styleUrl: './tabla-mascotas.component.css'
})
export class TablaMascotasComponent {
  mascotas!:Mascota[];
  ngOnInit():void{
    this.mascotas=[
      {
        "ID":1,
        "nombre":"Toby",
        "peso":2,
        "edad":12,
        "foto":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJyLofiao7YQ07txy7F9i3wuwyb9cjtEWEGg&s"
      },
      {
        "ID": 1,
        "nombre": "Toby",
        "peso": 2,
        "edad": 12,
        "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJyLofiao7YQ07txy7F9i3wuwyb9cjtEWEGg&s"
      },
      {
        "ID": 2,
        "nombre": "Rex",
        "peso": 3,
        "edad": 17,
        "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Vu5Oh9Jgw85wSNikDQeMVPjHxJ18ibXOsA&s"
      },
      {
        "ID": 3,
        "nombre": "Luna",
        "peso": 1,
        "edad": 8,
        "foto": "https://images.ctfassets.net/denf86kkcx7r/4IPlg4Qazd4sFRuCUHIJ1T/f6c71da7eec727babcd554d843a528b8/gatocomuneuropeo-97?fm=webp&w=913"
      },
      {
        "ID": 4,
        "nombre": "Charlie",
        "peso": 3,
        "edad": 16,
        "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoN0ClLdF0KguaLrjxctlMQEwLFpmeiL7bKA&s"
      },
      {
        "ID": 5,
        "nombre": "Buddy",
        "peso": 4,
        "edad": 12,
        "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA_u2l5BvubSYezZrgWYUxbykMc_AJc-Z6TA&s"
      },
      {
        "ID": 6,
        "nombre": "Lucy",
        "peso": 1,
        "edad": 9,
        "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNSoXsa-tnlnvv48zeajd1RuuPysSViowWUQ&s"
      },
      {
        "ID": 7,
        "nombre": "Maggie",
        "peso": 2,
        "edad": 11,
        "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfzafApUxyGfGk2ntFguN2_rkm4UyMhgzutw&s"
      },
      {
        "ID": 8,
        "nombre": "Sophie",
        "peso": 4,
        "edad": 13,
        "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj-p9ds2KazJEwcFryuZ9RRRVTe7M1shdXWg&s"
      },
      {
        "ID": 9,
        "nombre": "Max",
        "peso": 2,
        "edad": 14,
        "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJyLofiao7YQ07txy7F9i3wuwyb9cjtEWEGg&s"
      },
      {
        "ID": 10,
        "nombre": "Bella",
        "peso": 3,
        "edad": 10,
        "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Vu5Oh9Jgw85wSNikDQeMVPjHxJ18ibXOsA&s"
      },
      {
        "ID": 11,
        "nombre": "Milo",
        "peso": 1,
        "edad": 6,
        "foto": "https://images.ctfassets.net/denf86kkcx7r/4IPlg4Qazd4sFRuCUHIJ1T/f6c71da7eec727babcd554d843a528b8/gatocomuneuropeo-97?fm=webp&w=913"
      },
      {
        "ID": 12,
        "nombre": "Chloe",
        "peso": 2,
        "edad": 15,
        "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoN0ClLdF0KguaLrjxctlMQEwLFpmeiL7bKA&s"
      },
      {
        "ID": 13,
        "nombre": "Rocky",
        "peso": 4,
        "edad": 11,
        "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA_u2l5BvubSYezZrgWYUxbykMc_AJc-Z6TA&s"
      },
      {
        "ID": 14,
        "nombre": "Daisy",
        "peso": 1,
        "edad": 9,
        "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNSoXsa-tnlnvv48zeajd1RuuPysSViowWUQ&s"
      },
      {
        "ID": 15,
        "nombre": "Molly",
        "peso": 3,
        "edad": 12,
        "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfzafApUxyGfGk2ntFguN2_rkm4UyMhgzutw&s"
      },
      {
        "ID": 16,
        "nombre": "Bailey",
        "peso": 2,
        "edad": 14,
        "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj-p9ds2KazJEwcFryuZ9RRRVTe7M1shdXWg&s"
      },
      {
        "ID": 17,
        "nombre": "Oscar",
        "peso": 1,
        "edad": 11,
        "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJyLofiao7YQ07txy7F9i3wuwyb9cjtEWEGg&s"
      },
          {
            "ID": 18,
            "nombre": "Coco",
            "peso": 4,
            "edad": 13,
            "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Vu5Oh9Jgw85wSNikDQeMVPjHxJ18ibXOsA&s"
          },
          {
            "ID": 19,
            "nombre": "Buster",
            "peso": 2,
            "edad": 16,
            "foto": "https://images.ctfassets.net/denf86kkcx7r/4IPlg4Qazd4sFRuCUHIJ1T/f6c71da7eec727babcd554d843a528b8/gatocomuneuropeo-97?fm=webp&w=913"
          },
          {
            "ID": 20,
            "nombre": "Riley",
            "peso": 3,
            "edad": 15,
            "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoN0ClLdF0KguaLrjxctlMQEwLFpmeiL7bKA&s"
          },
          {
            "ID": 21,
            "nombre": "Harley",
            "peso": 4,
            "edad": 14,
            "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA_u2l5BvubSYezZrgWYUxbykMc_AJc-Z6TA&s"
          },
          {
            "ID": 22,
            "nombre": "Penny",
            "peso": 1,
            "edad": 10,
            "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNSoXsa-tnlnvv48zeajd1RuuPysSViowWUQ&s"
          },
          {
            "ID": 23,
            "nombre": "Zoe",
            "peso": 2,
            "edad": 12,
            "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfzafApUxyGfGk2ntFguN2_rkm4UyMhgzutw&s"
          },
          {
            "ID": 24,
            "nombre": "Ginger",
            "peso": 3,
            "edad": 9,
            "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj-p9ds2KazJEwcFryuZ9RRRVTe7M1shdXWg&s"
          },
          
            {
                "ID": 25,
                "nombre": "Bella",
                "peso": 2,
                "edad": 13,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA_u2l5BvubSYezZrgWYUxbykMc_AJc-Z6TA&s"
            },
            {
                "ID": 26,
                "nombre": "Luna",
                "peso": 1,
                "edad": 14,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoN0ClLdF0KguaLrjxctlMQEwLFpmeiL7bKA&s"
            },
            {
                "ID": 27,
                "nombre": "Duke",
                "peso": 4,
                "edad": 9,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Vu5Oh9Jgw85wSNikDQeMVPjHxJ18ibXOsA&s"
            },
            {
                "ID": 28,
                "nombre": "Milo",
                "peso": 2,
                "edad": 14,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj-p9ds2KazJEwcFryuZ9RRRVTe7M1shdXWg&s"
            },
            {
                "ID": 29,
                "nombre": "Sophie",
                "peso": 3,
                "edad": 15,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJyLofiao7YQ07txy7F9i3wuwyb9cjtEWEGg&s"
            },
            {
                "ID": 30,
                "nombre": "Ziggy",
                "peso": 1,
                "edad": 13,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Vu5Oh9Jgw85wSNikDQeMVPjHxJ18ibXOsA&s"
            },
            {
                "ID": 31,
                "nombre": "Trixie",
                "peso": 4,
                "edad": 11,
                "foto": "https://images.ctfassets.net/denf86kkcx7r/4IPlg4Qazd4sFRuCUHIJ1T/f6c71da7eec727babcd554d843a528b8/gatocomuneuropeo-97?fm=webp&w=913"
            },
            {
                "ID": 32,
                "nombre": "Gizmo",
                "peso": 2,
                "edad": 9,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoN0ClLdF0KguaLrjxctlMQEwLFpmeiL7bKA&s"
            },
            {
                "ID": 33,
                "nombre": "Nala",
                "peso": 3,
                "edad": 12,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfzafApUxyGfGk2ntFguN2_rkm4UyMhgzutw&s"
            },
            {
                "ID": 34,
                "nombre": "Rex",
                "peso": 4,
                "edad": 15,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA_u2l5BvubSYezZrgWYUxbykMc_AJc-Z6TA&s"
            },
            {
                "ID": 35,
                "nombre": "Lulu",
                "peso": 1,
                "edad": 10,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNSoXsa-tnlnvv48zeajd1RuuPysSViowWUQ&s"
            },
            {
                "ID": 36,
                "nombre": "Hank",
                "peso": 2,
                "edad": 16,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj-p9ds2KazJEwcFryuZ9RRRVTe7M1shdXWg&s"
            },
            {
                "ID": 37,
                "nombre": "Finn",
                "peso": 3,
                "edad": 17,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJyLofiao7YQ07txy7F9i3wuwyb9cjtEWEGg&s"
            },
            {
                "ID": 38,
                "nombre": "Marley",
                "peso": 4,
                "edad": 12,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Vu5Oh9Jgw85wSNikDQeMVPjHxJ18ibXOsA&s"
            },
            {
                "ID": 39,
                "nombre": "Gracie",
                "peso": 1,
                "edad": 14,
                "foto": "https://images.ctfassets.net/denf86kkcx7r/4IPlg4Qazd4sFRuCUHIJ1T/f6c71da7eec727babcd554d843a528b8/gatocomuneuropeo-97?fm=webp&w=913"
            },
            {
                "ID": 40,
                "nombre": "Rocco",
                "peso": 2,
                "edad": 13,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoN0ClLdF0KguaLrjxctlMQEwLFpmeiL7bKA&s"
            },
            {
                "ID": 41,
                "nombre": "Hazel",
                "peso": 3,
                "edad": 11,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfzafApUxyGfGk2ntFguN2_rkm4UyMhgzutw&s"
            },
            {
                "ID": 42,
                "nombre": "Diesel",
                "peso": 4,
                "edad": 10,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA_u2l5BvubSYezZrgWYUxbykMc_AJc-Z6TA&s"
            },
            {
                "ID": 43,
                "nombre": "Lily",
                "peso": 1,
                "edad": 9,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNSoXsa-tnlnvv48zeajd1RuuPysSViowWUQ&s"
            },
            {
                "ID": 44,
                "nombre": "Tank",
                "peso": 2,
                "edad": 14,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj-p9ds2KazJEwcFryuZ9RRRVTe7M1shdXWg&s"
            },
            {
                "ID": 45,
                "nombre": "Juno",
                "peso": 3,
                "edad": 15,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJyLofiao7YQ07txy7F9i3wuwyb9cjtEWEGg&s"
            },
            {
                "ID": 46,
                "nombre": "Moose",
                "peso": 4,
                "edad": 12,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Vu5Oh9Jgw85wSNikDQeMVPjHxJ18ibXOsA&s"
            },
            {
                "ID": 47,
                "nombre": "Willow",
                "peso": 1,
                "edad": 16,
                "foto": "https://images.ctfassets.net/denf86kkcx7r/4IPlg4Qazd4sFRuCUHIJ1T/f6c71da7eec727babcd554d843a528b8/gatocomuneuropeo-97?fm=webp&w=913"
            },
            {
                "ID": 48,
                "nombre": "Bowie",
                "peso": 2,
                "edad": 13,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoN0ClLdF0KguaLrjxctlMQEwLFpmeiL7bKA&s"
            },
            {
                "ID": 49,
                "nombre": "Rex",
                "peso": 3,
                "edad": 12,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfzafApUxyGfGk2ntFguN2_rkm4UyMhgzutw&s"
            },
            {
              "ID": 50,
              "nombre": "Maggie",
              "peso": 4,
              "edad": 11,
              "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJyLofiao7YQ07txy7F9i3wuwyb9cjtEWEGg&s"
          },
            {
                "ID": 51,
                "nombre": "Toby",
                "peso": 2,
                "edad": 12,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJyLofiao7YQ07txy7F9i3wuwyb9cjtEWEGg&s"
            },
            {
                "ID": 52,
                "nombre": "Rex",
                "peso": 3,
                "edad": 17,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Vu5Oh9Jgw85wSNikDQeMVPjHxJ18ibXOsA&s"
            },
            {
                "ID": 53,
                "nombre": "Luna",
                "peso": 1,
                "edad": 8,
                "foto": "https://images.ctfassets.net/denf86kkcx7r/4IPlg4Qazd4sFRuCUHIJ1T/f6c71da7eec727babcd554d843a528b8/gatocomuneuropeo-97?fm=webp&w=913"
            },
            {
                "ID": 54,
                "nombre": "Charlie",
                "peso": 3,
                "edad": 16,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoN0ClLdF0KguaLrjxctlMQEwLFpmeiL7bKA&s"
            },
            {
                "ID": 55,
                "nombre": "Buddy",
                "peso": 4,
                "edad": 12,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA_u2l5BvubSYezZrgWYUxbykMc_AJc-Z6TA&s"
            },
            {
                "ID": 56,
                "nombre": "Lucy",
                "peso": 1,
                "edad": 9,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNSoXsa-tnlnvv48zeajd1RuuPysSViowWUQ&s"
            },
            {
                "ID": 57,
                "nombre": "Maggie",
                "peso": 2,
                "edad": 11,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfzafApUxyGfGk2ntFguN2_rkm4UyMhgzutw&s"
            },
            {
                "ID": 58,
                "nombre": "Sophie",
                "peso": 4,
                "edad": 13,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj-p9ds2KazJEwcFryuZ9RRRVTe7M1shdXWg&s"
            },
            {
                "ID": 59,
                "nombre": "Max",
                "peso": 2,
                "edad": 14,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJyLofiao7YQ07txy7F9i3wuwyb9cjtEWEGg&s"
            },
            {
                "ID": 60,
                "nombre": "Bella",
                "peso": 3,
                "edad": 10,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Vu5Oh9Jgw85wSNikDQeMVPjHxJ18ibXOsA&s"
            },
            {
                "ID": 61,
                "nombre": "Milo",
                "peso": 1,
                "edad": 6,
                "foto": "https://images.ctfassets.net/denf86kkcx7r/4IPlg4Qazd4sFRuCUHIJ1T/f6c71da7eec727babcd554d843a528b8/gatocomuneuropeo-97?fm=webp&w=913"
            },
            {
                "ID": 62,
                "nombre": "Chloe",
                "peso": 2,
                "edad": 15,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoN0ClLdF0KguaLrjxctlMQEwLFpmeiL7bKA&s"
            },
            {
                "ID": 63,
                "nombre": "Rocky",
                "peso": 4,
                "edad": 11,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA_u2l5BvubSYezZrgWYUxbykMc_AJc-Z6TA&s"
            },
            {
                "ID": 64,
                "nombre": "Daisy",
                "peso": 1,
                "edad": 9,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNSoXsa-tnlnvv48zeajd1RuuPysSViowWUQ&s"
            },
            {
                "ID": 65,
                "nombre": "Molly",
                "peso": 3,
                "edad": 12,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfzafApUxyGfGk2ntFguN2_rkm4UyMhgzutw&s"
            },
            {
                "ID": 66,
                "nombre": "Bailey",
                "peso": 2,
                "edad": 14,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj-p9ds2KazJEwcFryuZ9RRRVTe7M1shdXWg&s"
            },
            {
                "ID": 67,
                "nombre": "Oscar",
                "peso": 1,
                "edad": 11,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJyLofiao7YQ07txy7F9i3wuwyb9cjtEWEGg&s"
            },
            {
                "ID": 68,
                "nombre": "Coco",
                "peso": 4,
                "edad": 13,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Vu5Oh9Jgw85wSNikDQeMVPjHxJ18ibXOsA&s"
            },
            {
                "ID": 69,
                "nombre": "Buster",
                "peso": 2,
                "edad": 16,
                "foto": "https://images.ctfassets.net/denf86kkcx7r/4IPlg4Qazd4sFRuCUHIJ1T/f6c71da7eec727babcd554d843a528b8/gatocomuneuropeo-97?fm=webp&w=913"
            },
            {
                "ID": 70,
                "nombre": "Riley",
                "peso": 3,
                "edad": 15,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoN0ClLdF0KguaLrjxctlMQEwLFpmeiL7bKA&s"
            },
            {
                "ID": 71,
                "nombre": "Harley",
                "peso": 4,
                "edad": 14,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA_u2l5BvubSYezZrgWYUxbykMc_AJc-Z6TA&s"
            },
            {
                "ID": 72,
                "nombre": "Penny",
                "peso": 1,
                "edad": 10,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNSoXsa-tnlnvv48zeajd1RuuPysSViowWUQ&s"
            },
            {
                "ID": 73,
                "nombre": "Zoe",
                "peso": 2,
                "edad": 12,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfzafApUxyGfGk2ntFguN2_rkm4UyMhgzutw&s"
            },
            {
                "ID": 74,
                "nombre": "Ginger",
                "peso": 3,
                "edad": 9,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj-p9ds2KazJEwcFryuZ9RRRVTe7M1shdXWg&s"
            },
            {
                "ID": 75,
                "nombre": "Jasper",
                "peso": 4,
                "edad": 13,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJyLofiao7YQ07txy7F9i3wuwyb9cjtEWEGg&s"
            },
            {
                "ID": 76,
                "nombre": "Pepper",
                "peso": 2,
                "edad": 17,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Vu5Oh9Jgw85wSNikDQeMVPjHxJ18ibXOsA&s"
            },
            {
                "ID": 77,
                "nombre": "Ellie",
                "peso": 1,
                "edad": 6,
                "foto": "https://images.ctfassets.net/denf86kkcx7r/4IPlg4Qazd4sFRuCUHIJ1T/f6c71da7eec727babcd554d843a528b8/gatocomuneuropeo-97?fm=webp&w=913"
            },
            {
                "ID": 78,
                "nombre": "Rosie",
                "peso": 3,
                "edad": 8,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoN0ClLdF0KguaLrjxctlMQEwLFpmeiL7bKA&s"
            },
            {
                "ID": 79,
                "nombre": "Zeus",
                "peso": 4,
                "edad": 14,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA_u2l5BvubSYezZrgWYUxbykMc_AJc-Z6TA&s"
            },
            {
                "ID": 80,
                "nombre": "Nala",
                "peso": 2,
                "edad": 9,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNSoXsa-tnlnvv48zeajd1RuuPysSViowWUQ&s"
            },
            {
                "ID": 81,
                "nombre": "Tank",
                "peso": 1,
                "edad": 11,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfzafApUxyGfGk2ntFguN2_rkm4UyMhgzutw&s"
            },
            {
                "ID": 82,
                "nombre": "Sammy",
                "peso": 4,
                "edad": 16,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj-p9ds2KazJEwcFryuZ9RRRVTe7M1shdXWg&s"
            },
            {
                "ID": 83,
                "nombre": "Lily",
                "peso": 2,
                "edad": 12,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJyLofiao7YQ07txy7F9i3wuwyb9cjtEWEGg&s"
            },
            {
                "ID": 84,
                "nombre": "Finn",
                "peso": 3,
                "edad": 10,
                "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Vu5Oh9Jgw85wSNikDQeMVPjHxJ18ibXOsA&s"
            },
           

    ]
  }

}
