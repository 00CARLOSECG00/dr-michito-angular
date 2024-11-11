import { Component } from '@angular/core';
import { DetallesMascotaComponent } from '../detalles-mascota/detalles-mascota.component';
import { TarjetaMascotaClienteComponent } from '../tarjeta-mascota-cliente/tarjeta-mascota-cliente.component';
import { Mascota } from '../Model/mascota';
import { CommonModule } from '@angular/common';
import { Cliente } from '../Model/cliente';
import { ClienteService } from '../Services/cliente.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { MascotaService } from '../Services/mascota.service';
import { BarraLateralComponent } from "../componentes/barra-lateral/barra-lateral.component";

@Component({
  selector: 'app-vista-mascotas-cliente',
  standalone: true,
  imports: [
    DetallesMascotaComponent,
    TarjetaMascotaClienteComponent,
    CommonModule,
    BarraLateralComponent
  ],
  templateUrl: './vista-mascotas-cliente.component.html',
  styleUrls: ['./vista-mascotas-cliente.component.css'],
})
export class VistaMascotasClienteComponent {
  modoVer: boolean = false;
  idCliente: number | null = null;
  mascotaSeleccionada: Mascota | null = null;
  mascotas: Mascota[] = [];
  clienteSeleccionado: Cliente | null = null; // Inicializado como null

  constructor(
    private http: HttpClient,
    private ClienteService: ClienteService,
    private authService: AuthService,
    private router: Router,
    private mascotaService: MascotaService
  ) {}

  ngOnInit(): void {
    this.idCliente = this.authService.getClienteId();
    
    if (!this.idCliente) {
      console.error('No se encontró ID del cliente');
      this.router.navigate(['/login']); // Redirige al login si no hay ID
      return;
    }

    this.cargarDatosCliente();
  }

  private cargarDatosCliente(): void {
    this.ClienteService.getClienteById(this.idCliente!).subscribe({
      next: (cliente: Cliente) => {
        this.clienteSeleccionado = cliente;
        this.listarMascotas();
      },
      error: (error) => {
        console.error('Error al cargar el cliente:', error);
        // Podrías mostrar un mensaje de error al usuario
        this.router.navigate(['/error']); // O redirigir a una página de error
      }
    });
  }

  listarMascotas(): void {
    this.mascotaService.obtenerMascotasPorCliente(this.idCliente!).subscribe({
      next: (mascotas) => {
        this.mascotas = mascotas;
      },
      error: (error) => {
        console.error('Error al obtener las mascotas:', error);
        // Podrías mostrar un mensaje de error al usuario
      },
    });
  }

  onVerDetalles(mascota: Mascota) {
    this.router.navigate(['/DetalleMascota'], { queryParams: { id: mascota.id } });
  }

  onVolverALista() {
    this.modoVer = false;
  }
}