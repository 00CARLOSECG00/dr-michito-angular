import { Component, OnInit } from '@angular/core';
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
  imports: [FormsModule, CommonModule, BarraLateralComponent, HttpClientModule],
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit {
  formCliente: Cliente = {
    id: 0,
    cedula: '',
    nombre: '',
    correo: '',
    celular: 0
  };
  modoEdicion: boolean = false;
  mostrarError: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clienteService.obtenerClienteSeleccionado().subscribe({
      next: (cliente) => {
        if (cliente) {
          this.modoEdicion = true; // Modo edición
          this.formCliente = { ...cliente };
        } else {
          this.modoEdicion = false; // Modo creación
          this.limpiarFormulario();
        }
      },
      error: (error) => {
        console.error('Error al cargar cliente seleccionado:', error);
        this.mostrarError = true; // Mostrar el error si no se puede cargar el cliente
      }
    });
  }

  guardar(cliente: Cliente): void {
    if (this.modoEdicion) {
        // Modo de edición
        this.clienteService.updateCliente(cliente).subscribe({
            next: (response) => {
                console.log('Cliente actualizado con éxito:', response);
                this.onVolver();
            },
            error: (error) => {
                console.error('Error al actualizar cliente:', error);
            }
        });
    } else {
        // Modo de creación
        this.clienteService.createCliente(cliente).subscribe({
            next: (response) => {
                console.log('Cliente creado con éxito:', response);
                this.onVolver();
            },
            error: (error) => {
                console.error('Error al crear cliente:', error);
                this.mostrarError = !this.modoEdicion; // Solo mostrar el error si no está en modo edición
            }
        });
    }
}


  limpiarFormulario(): void {
    this.formCliente = {
      id: 0,
      cedula: '',
      nombre: '',
      correo: '',
      celular: 0
    };
  }

  onVolver(): void {
    this.router.navigate(['/Clientes']);
  }
}
