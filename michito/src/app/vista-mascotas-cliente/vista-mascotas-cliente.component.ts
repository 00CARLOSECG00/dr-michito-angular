import { Component } from '@angular/core';
import { DetallesMascotaComponent } from '../detalles-mascota/detalles-mascota.component';
import { TarjetaMascotaClienteComponent } from '../tarjeta-mascota-cliente/tarjeta-mascota-cliente.component';
import { Mascota } from '../Model/mascota';
import { CommonModule } from '@angular/common';
import { Cliente } from '../Model/cliente';
import { ClienteService } from '../Services/cliente.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vista-mascotas-cliente',
  standalone: true,
  imports: [DetallesMascotaComponent, TarjetaMascotaClienteComponent, CommonModule],
  templateUrl: './vista-mascotas-cliente.component.html',
  styleUrls: ['./vista-mascotas-cliente.component.css']
})
export class VistaMascotasClienteComponent {
  modoVer: boolean = false;
  mascotaSeleccionada!: Mascota;
  mascotas: Mascota[] = [];
  clienteSeleccionado!: Cliente;
  private ROOT_URL = 'http://localhost:8080/Clientes';

  constructor (private http: HttpClient, private ClienteService: ClienteService) {}
  ngOnInit(): void {
    console.log('cliente cargado:', this.ClienteService.getCliente());
    this.clienteSeleccionado = this.ClienteService.getCliente()!;
    this.modoVer = false;
    this.listarMascotas();
  }

  listarMascotas(): void {
    this.http.get<Mascota[]>(`${this.ROOT_URL}/Mascotas/${this.clienteSeleccionado.id}`).subscribe({
      next: (mascotas) => {
        this.mascotas = mascotas;
      },
      error: (error) => {
        console.error('Error al obtener las mascotas:', error);
      }
    });
  }

  onVerDetalles(mascota: Mascota) {
    this.mascotaSeleccionada = mascota;
    this.modoVer = true;  // Cambiamos a modo detalles
  }

  onVolverALista() {
    this.modoVer = false;  // Cambiamos de vuelta al modo lista
  }
}
