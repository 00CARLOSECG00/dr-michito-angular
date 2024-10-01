import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Cliente } from '../Model/cliente';
@Component({
  selector: 'app-create-cliente',
  standalone: true,
  imports: [],
  templateUrl: './create-cliente.component.html',
  styleUrl: './create-cliente.component.css'
})
export class CreateClienteComponent {
  @Input() cliente!: Cliente | null; 
  @Input() modoEdicion: boolean = false; 
  @Output() volver: EventEmitter<void> = new EventEmitter<void>();

  clientes: Cliente[] = [];

  formMascota: Cliente = {
    id: 0,
    cedula: '',
    nombre: '',
    correo: '',
    celular: 0
  };
}
