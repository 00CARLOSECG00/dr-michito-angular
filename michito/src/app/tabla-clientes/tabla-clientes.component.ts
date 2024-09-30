import { Component,OnInit } from '@angular/core';
import{BarraLateralComponent} from'../componentes/barra-lateral/barra-lateral.component'
import { CommonModule } from '@angular/common';
import{Cliente} from '../cliente'

@Component({
  selector: 'app-tabla-clientes',
  standalone: true,
  imports: [BarraLateralComponent,CommonModule],
  templateUrl: './tabla-clientes.component.html',
  styleUrl: './tabla-clientes.component.css'
})
export class TablaClientesComponent {
  clientes!:Cliente[];
  ngOnInit():void{
    this.clientes = [
      {
          "ID": 1,
          "cedula": "321456",
          "nombre": "Jose",
          "correo": "jose@gmail.com",
          "celular": 12364
      },
      {
          "ID": 2,
          "cedula": "79885",
          "nombre": "Pedro",
          "correo": "pedro@gmail.com",
          "celular": 79465
      },
      {
          "ID": 3,
          "cedula": "44545",
          "nombre": "Paola",
          "correo": "paola@gmail.com",
          "celular": 88987
      },
      {
          "ID": 4,
          "cedula": "48785",
          "nombre": "Jaime",
          "correo": "jaime@gmail.com",
          "celular": 741002
      },
      {
          "ID": 5,
          "cedula": "77874",
          "nombre": "Cristian",
          "correo": "cristian@gmail.com",
          "celular": 889800
      },
      {
          "ID": 6,
          "cedula": "88852",
          "nombre": "Lorena",
          "correo": "lorena@gmail.com",
          "celular": 874521
      },
      {
          "ID": 7,
          "cedula": "74565",
          "nombre": "Ana",
          "correo": "ana@gmail.com",
          "celular": 12358
      },
      {
          "ID": 8,
          "cedula": "45786",
          "nombre": "Carlos",
          "correo": "carlos@gmail.com",
          "celular": 56478
      },
      {
          "ID": 9,
          "cedula": "95875",
          "nombre": "Sofia",
          "correo": "sofia@gmail.com",
          "celular": 98456
      },
      {
          "ID": 10,
          "cedula": "24758",
          "nombre": "Miguel",
          "correo": "miguel@gmail.com",
          "celular": 78453
      },
      {
          "ID": 11,
          "cedula": "34858",
          "nombre": "Laura",
          "correo": "laura@gmail.com",
          "celular": 23468
      },
      {
          "ID": 12,
          "cedula": "14568",
          "nombre": "Diana",
          "correo": "diana@gmail.com",
          "celular": 14587
      },
      {
          "ID": 13,
          "cedula": "85678",
          "nombre": "Andres",
          "correo": "andres@gmail.com",
          "celular": 78546
      },
      {
          "ID": 14,
          "cedula": "78456",
          "nombre": "María",
          "correo": "maria@gmail.com",
          "celular": 36574
      },
      {
          "ID": 15,
          "cedula": "45679",
          "nombre": "David",
          "correo": "david@gmail.com",
          "celular": 87965
      },
      {
          "ID": 16,
          "cedula": "17845",
          "nombre": "Valeria",
          "correo": "valeria@gmail.com",
          "celular": 45123
      },
      {
          "ID": 17,
          "cedula": "68945",
          "nombre": "Jorge",
          "correo": "jorge@gmail.com",
          "celular": 25489
      },
      {
          "ID": 18,
          "cedula": "45874",
          "nombre": "Patricia",
          "correo": "patricia@gmail.com",
          "celular": 35678
      },
      {
          "ID": 19,
          "cedula": "98745",
          "nombre": "Javier",
          "correo": "javier@gmail.com",
          "celular": 98745
      },
      {
          "ID": 20,
          "cedula": "36895",
          "nombre": "Camila",
          "correo": "camila@gmail.com",
          "celular": 56231
      },
      {
          "ID": 21,
          "cedula": "47589",
          "nombre": "Ricardo",
          "correo": "ricardo@gmail.com",
          "celular": 12347
      },
      {
          "ID": 22,
          "cedula": "78546",
          "nombre": "Nicolas",
          "correo": "nicolas@gmail.com",
          "celular": 78546
      },
      {
          "ID": 23,
          "cedula": "12345",
          "nombre": "Elena",
          "correo": "elena@gmail.com",
          "celular": 45678
      },
      {
          "ID": 24,
          "cedula": "87564",
          "nombre": "Hector",
          "correo": "hector@gmail.com",
          "celular": 65478
      },
      {
          "ID": 25,
          "cedula": "21547",
          "nombre": "Daniela",
          "correo": "daniela@gmail.com",
          "celular": 21456
      },
      {
          "ID": 26,
          "cedula": "85471",
          "nombre": "Pablo",
          "correo": "pablo@gmail.com",
          "celular": 78512
      },
      {
          "ID": 27,
          "cedula": "54789",
          "nombre": "Adriana",
          "correo": "adriana@gmail.com",
          "celular": 45678
      },
      {
          "ID": 28,
          "cedula": "36987",
          "nombre": "Esteban",
          "correo": "esteban@gmail.com",
          "celular": 36987
      },
      {
          "ID": 29,
          "cedula": "45896",
          "nombre": "Luisa",
          "correo": "luisa@gmail.com",
          "celular": 74585
      },
      {
          "ID": 30,
          "cedula": "17895",
          "nombre": "Sebastian",
          "correo": "sebastian@gmail.com",
          "celular": 12368
      },
      {
          "ID": 31,
          "cedula": "78452",
          "nombre": "Gabriela",
          "correo": "gabriela@gmail.com",
          "celular": 87452
      },
      {
          "ID": 32,
          "cedula": "78956",
          "nombre": "Alejandro",
          "correo": "alejandro@gmail.com",
          "celular": 96325
      },
      {
          "ID": 33,
          "cedula": "45876",
          "nombre": "Fernanda",
          "correo": "fernanda@gmail.com",
          "celular": 12568
      },
      {
          "ID": 34,
          "cedula": "98756",
          "nombre": "Oscar",
          "correo": "oscar@gmail.com",
          "celular": 96523
      },
      {
          "ID": 35,
          "cedula": "14785",
          "nombre": "Natalia",
          "correo": "natalia@gmail.com",
          "celular": 78596
      },
      {
          "ID": 36,
          "cedula": "58963",
          "nombre": "Felipe",
          "correo": "felipe@gmail.com",
          "celular": 56987
      },
      {
          "ID": 37,
          "cedula": "47895",
          "nombre": "Monica",
          "correo": "monica@gmail.com",
          "celular": 87412
      },
      {
          "ID": 38,
          "cedula": "78965",
          "nombre": "Liliana",
          "correo": "liliana@gmail.com",
          "celular": 78965
      },
      {
          "ID": 39,
          "cedula": "45789",
          "nombre": "Rodrigo",
          "correo": "rodrigo@gmail.com",
          "celular": 47895
      },
      {
          "ID": 40,
          "cedula": "78596",
          "nombre": "Lucia",
          "correo": "lucia@gmail.com",
          "celular": 78596
      },
      {
          "ID": 41,
          "cedula": "36589",
          "nombre": "Eduardo",
          "correo": "eduardo@gmail.com",
          "celular": 32589
      },
      {
          "ID": 42,
          "cedula": "25896",
          "nombre": "Tatiana",
          "correo": "tatiana@gmail.com",
          "celular": 25896
      },
      {
          "ID": 43,
          "cedula": "36985",
          "nombre": "Victoria",
          "correo": "victoria@gmail.com",
          "celular": 36985
      },
      {
          "ID": 44,
          "cedula": "78912",
          "nombre": "Mario",
          "correo": "mario@gmail.com",
          "celular": 78912
      },
      {
          "ID": 45,
          "cedula": "87452",
          "nombre": "Alicia",
          "correo": "alicia@gmail.com",
          "celular": 87452
      },
      {
          "ID": 46,
          "cedula": "32587",
          "nombre": "Martin",
          "correo": "martin@gmail.com",
          "celular": 32587
      },
      {
          "ID": 47,
          "cedula": "58063",
          "nombre": "Claudia",
          "correo": "claudia@gmail.com",
          "celular": 58463
      },
      {
          "ID": 48,
          "cedula": "32589",
          "nombre": "Julian",
          "correo": "julian@gmail.com",
          "celular": 32589
      }
  ];
  
    }
}
