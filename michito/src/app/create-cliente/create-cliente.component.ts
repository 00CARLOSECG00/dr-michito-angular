import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Cliente } from '../Model/cliente';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ClienteService } from '../Services/cliente.service';

@Component({
  selector: 'app-create-cliente',
  standalone: true,
  imports: [FormsModule, CommonModule, BarraLateralComponent],
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnChanges {
  mostrarError: boolean = false;
  @Input() cliente!: Cliente | null;
  @Input() modoEdicion: boolean = false;

  formCliente: Cliente = {
    id: 0,
    cedula: '',
    nombre: '',
    correo: '',
    celular: 0
  };

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {}

  ngOnChanges() {
    if (this.cliente) {
      this.formCliente = { ...this.cliente };
    }
  }

  guardar(cliente: Cliente) {
    if (this.modoEdicion) {
      this.clienteService.updateCliente(cliente).subscribe({
        next: (response) => {
          console.log('Cliente actualizado con éxito:', response);
          this.onVolver();
        },
        error: (error) => {
          console.error('Error al actualizar cliente:', error);
          this.mostrarError = true;
        }
      });
      this.onVolver();
    } else {
      this.clienteService.createCliente(cliente).subscribe({
        next: (response) => {
          console.log('Cliente agregado con éxito:', response);
          this.onVolver();
        },
        error: (error) => {
          console.error('Error al agregar cliente:', error);
          this.mostrarError = true;
        }
      });
      
    }
  }

  onVolver() {
    this.router.navigate(['/Clientes']);
  }
}