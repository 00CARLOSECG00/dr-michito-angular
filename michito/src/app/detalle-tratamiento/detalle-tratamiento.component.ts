import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
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
  imports: [BarraLateralComponent,CommonModule],
  templateUrl: './detalle-tratamiento.component.html',
  styleUrls: ['./detalle-tratamiento.component.css'],
})
export class DetalleTratamientoComponent implements OnInit {
  tratamiento!: Tratamiento;  // Variable que contiene el tratamiento
  mascota!: Mascota;  // Mascota asociada al tratamiento
  cliente!: Cliente;  // Cliente asociado a la mascota
  veterinario!: Veterinario;  // Veterinario que realizó el tratamiento

  constructor(
    private route: ActivatedRoute,  // Para acceder a los parámetros de la URL
    private tratamientoService: TratamientoService,  // Servicio para cargar el tratamiento
    private router: Router,  // Para navegar entre rutas
    private clienteService: ClienteService  // Servicio para obtener información del cliente
  ) {}

  ngOnInit(): void {
    // Obtener el ID del tratamiento desde los parámetros de la URL
    const tratamientoId = Number(this.route.snapshot.queryParams['id']); // Asegurar que el ID sea un número
    if (tratamientoId) {
      this.cargarDetallesTratamiento(tratamientoId);  // Cargar detalles del tratamiento si el ID existe
    }
  }

  // Método para volver a la página anterior
  volver(): void {
    this.router.navigate(['/tratamientos']);  // Navegar de vuelta a la lista de tratamientos
  }

  // Cargar los detalles del tratamiento, mascota, cliente y veterinario
  cargarDetallesTratamiento(id: number): void {
    this.tratamientoService.obtenerTratamientoPorId(id).subscribe({
      next: (tratamiento) => {
        this.tratamiento = tratamiento;  // Asignar el tratamiento recibido a la variable local
        this.mascota = tratamiento.mascota;  // Asignar la mascota asociada
        this.veterinario = tratamiento.veterinario;  // Asignar el veterinario asociado

        // Verificar si se puede obtener el cliente directamente de la mascota
        if (tratamiento.mascota && tratamiento.mascota.cedulaCliente) {
          this.obtenerDetallesClientePorCedula(tratamiento.mascota.cedulaCliente);  // Obtener cliente por cédula
        } else if (tratamiento.mascota && tratamiento.mascota.id) {
          // Si no se tiene la cédula, buscar el cliente por el id de la mascota en el backend
          this.clienteService.obtenerClientePorMascota(tratamiento.mascota.id).subscribe({
            next: (cliente) => {
              this.cliente = cliente;  // Asignar el cliente obtenido
              console.log('Cliente encontrado por idMascota:', cliente);
            },
            error: (error) => {
              console.error('Error al obtener el cliente por idMascota:', error);
              this.cliente = new Cliente();  // Asignar un cliente vacío en caso de error
            }
          });
        } else {
          console.warn('No se pudo encontrar la cédula del cliente ni el id de la mascota');
          this.cliente = new Cliente();  // Asignar un cliente vacío si no se encuentra el cliente
        }

        console.log('Detalles del tratamiento:', tratamiento);
      },
      error: (error) => {
        console.error('Error al cargar el tratamiento:', error);
      }
    });
  }

  // Método adicional para obtener los detalles del cliente por cédula
  obtenerDetallesClientePorCedula(cedula: string): void {
    this.clienteService.getClienteByCedula(cedula).subscribe({
      next: (cliente) => {
        this.cliente = cliente;  // Asignar el cliente recibido
        console.log('Detalles del cliente:', cliente);
      },
      error: (error) => {
        console.error('Error al cargar los detalles del cliente:', error);
      }
    });
  }

  // Método adicional para obtener los detalles del cliente por clienteId
  obtenerDetallesCliente(cedulaCliente: string): void {
    this.clienteService.getClienteByCedula(cedulaCliente).subscribe({
      next: (cliente) => {
        this.cliente = cliente;  // Asignar el cliente recibido
        console.log('Detalles del cliente:', cliente);
      },
      error: (error) => {
        console.error('Error al cargar los detalles del cliente:', error);
      }
    });
  }
}
