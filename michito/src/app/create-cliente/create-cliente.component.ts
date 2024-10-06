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


  // Método para agregar y editar cliente
  guardar(cliente: Cliente) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    if (this.modoEdicion) {
      // Actualizar 
      this.http.put<Cliente>(`http://localhost:8080/Clientes/update/${cliente.id}`, cliente, { headers })
        .subscribe(
          (response) => {
            console.log('Cliente actualizado con éxito:', response);
            this.volver.emit();  // Volver al padre después de la edición
          },
          (error) => {
            console.error('Error al actualizar cliente:', error);
          }
        );
    } else {
      // Crear
      this.http.post<Cliente>('http://localhost:8080/Clientes/agregar', cliente, { headers })
        .subscribe(
          (response) => {
            console.log('Cliente agregado con éxito:', response);
            this.volver.emit();  // Volver al padre después de la creación
          },
          (error) => {
            console.error('Error al agregar cliente:', error);
          }
        );
    }
  }
  
  
  
  ngOnChanges() {
    if (this.cliente) {
      this.formCliente = { ...this.cliente };
    }
  }
  
  
  
  
  onVolver() {
    this.volver.emit();  
  }
}
