import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Cliente } from '../Model/cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-cliente',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-cliente.component.html',
  styleUrl: './create-cliente.component.css'
})
export class CreateClienteComponent {
  mostrarError: boolean = false;
  @Input() cliente!: Cliente | null; 
  @Input() modoEdicion: boolean = false; 
  @Output() volver: EventEmitter<void> = new EventEmitter<void>();

  clientes: Cliente[] = [];

  formCliente: Cliente = {
    "id": 0,
    "cedula": '',
    "nombre": '',
    "correo": '',
    "celular": 0
  };

  constructor(private http: HttpClient) {}


  // Método para agregar cliente
  guardar(cliente: Cliente) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    console.log('Datos que se envían al backend:', cliente);  // Verifica que el objeto tenga los datos correctos
    console.log(JSON.stringify(cliente));  // Esto te muestra el JSON que se enviará

  
    this.http.post('http://localhost:8080/Clientes/agregar', cliente, { headers })
      .subscribe(
        (response) => {
          console.log('Cliente agregado con éxito:', response);
        },
        (error) => {
          console.error('Error al agregar cliente:', error);
        }
      );
  }
  
  
  
  
  
  
  
  

  onVolver() {
    this.volver.emit();  // Emite para notificar al padre que se ha salido del modo creación/edición
  }
}
