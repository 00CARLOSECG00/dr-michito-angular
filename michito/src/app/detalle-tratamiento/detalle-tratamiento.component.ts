

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
  
        // Supongamos que tienes la cédula del cliente en la mascota
        if (tratamiento.mascota && tratamiento.mascota.cedulaCliente) {
          this.obtenerDetallesClientePorCedula(tratamiento.mascota.cedulaCliente);
        } else {
          console.warn('Cédula del cliente no disponible para esta mascota');
          this.cliente = new Cliente;
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

