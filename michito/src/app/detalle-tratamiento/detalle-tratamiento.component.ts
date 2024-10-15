

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TratamientoService } from '../Services/tratamiento.service';
import { Tratamiento } from '../Model/tratamiento';
import { Mascota } from '../Model/mascota';
import { Cliente } from '../Model/cliente';
import { Veterinario } from '../Model/veterinario';
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
import { Router } from '@angular/router';
import { ClienteService } from '../Services/cliente.service';

@Component({
  selector: 'app-detalle-tratamiento',
  standalone: true,
  imports: [BarraLateralComponent],
  templateUrl: './detalle-tratamiento.component.html',
  styleUrls: ['./detalle-tratamiento.component.css'],
})
export class DetalleTratamientoComponent implements OnInit {
  tratamiento!: Tratamiento;
  mascota!: Mascota;
  cliente!: Cliente;
  veterinario!: Veterinario;

  constructor(
    private route: ActivatedRoute,
    private tratamientoService: TratamientoService,
    private router: Router,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    // Obtener el ID del tratamiento desde la URL
    const tratamientoId = this.route.snapshot.queryParams['id'];
    if (tratamientoId) {
      this.cargarDetallesTratamiento(tratamientoId);
    }
  }

  // Método para volver a la página anterior
  volver(): void {
    this.router.navigate(['/tratamientos']);
  }

  // Cargar los detalles del tratamiento, mascota, cliente y veterinario
cargarDetallesTratamiento(id: number): void {
  this.tratamientoService.obtenerTratamientoPorId(id).subscribe({
    next: (tratamiento) => {
      this.tratamiento = tratamiento;
      this.mascota = tratamiento.mascota;
      this.veterinario = tratamiento.veterinario;

      // Verificar si se puede obtener el cliente directamente de la mascota
      if (tratamiento.mascota && tratamiento.mascota.cedulaCliente) {
        this.obtenerDetallesClientePorCedula(tratamiento.mascota.cedulaCliente);
      } else if (tratamiento.mascota && tratamiento.mascota.id) {
        // Si no se tiene la cédula, buscar el cliente por el idMascota en el backend
        this.clienteService.obtenerClientePorMascota(tratamiento.mascota.id).subscribe({
          next: (cliente) => {
            this.cliente = cliente;
            console.log('Cliente encontrado por idMascota:', cliente);
          },
          error: (error) => {
            console.error('Error al obtener el cliente por idMascota:', error);
            this.cliente = new Cliente(); // Asignar un cliente vacío en caso de error
          }
        });
      } else {
        console.warn('No se pudo encontrar la cédula del cliente ni el id de la mascota');
        this.cliente = new Cliente(); // Asignar un cliente vacío en caso de no encontrarlo
      }

      console.log('Detalles del tratamiento:', tratamiento);
    },
    error: (error) => {
      console.error('Error al cargar el tratamiento:', error);
    },
  });
}

  
  // Método adicional para obtener los detalles del cliente por cédula
  obtenerDetallesClientePorCedula(cedula: string): void {
    this.clienteService.getClienteByCedula(cedula).subscribe({
      next: (cliente) => {
        this.cliente = cliente;
        console.log('Detalles del cliente:', cliente);
      },
      error: (error) => {
        console.error('Error al cargar los detalles del cliente:', error);
      },
    });
  }
  
  
  // Método adicional para obtener los detalles del cliente por clienteId
  obtenerDetallesCliente(cedulaCliente: string): void {
    this.clienteService.getClienteByCedula(cedulaCliente).subscribe({
      next: (cliente) => {
        this.cliente = cliente;
        console.log('Detalles del cliente:', cliente);
      },
      error: (error) => {
        console.error('Error al cargar los detalles del cliente:', error);
      },
    });
  }
  
  
}

