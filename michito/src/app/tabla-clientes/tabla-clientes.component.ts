import { Component, OnInit } from '@angular/core';
import { Cliente } from '../Model/cliente';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TablaMascotasComponent} from '../tabla-mascotas/tabla-mascotas.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ClienteService } from '../Services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla-clientes',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    FormsModule,
    BarraLateralComponent
  ],
  templateUrl: './tabla-clientes.component.html',
  styleUrls: ['./tabla-clientes.component.css']
})
export class TablaClientesComponent implements OnInit {
  page: number = 1;
  clientes: Cliente[] = [];
  modoCreacion: boolean = false;
  modoEdicion: boolean = false;
  clienteSeleccionado!: Cliente | null;
  modoVisualizacion: boolean = false;
  clientesMostrados: Cliente[] = [];
  searchTerm: string = '';

  constructor(private clienteService: ClienteService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.clienteService.getAllClientes().subscribe({
      next: (data: Cliente[]) => {
        this.clientes = data;
        this.clientesMostrados = data;
      },
      error: (error) => {
        console.error('Error al obtener los clientes:', error);
      }
    });
  }

  confirmDelete(id: number): void {
    const confirmed = confirm('¿Estás seguro de que deseas eliminar este cliente?');
    if (confirmed) {
      this.clienteService.deleteCliente(id).subscribe({
        next: () => {
          this.loadClientes();
        },
        error: (error) => {
          console.error('Error al eliminar el cliente:', error);
        }
      });
    }
  }

  editarCliente(cliente: Cliente): void {
    this.clienteService.setClienteSeleccionado(cliente);
    this.router.navigate(['/Create-Cliente']); // Navegar al componente de creación/edición
  }

  crearCliente(): void {
    // Limpiar el cliente seleccionado para crear uno nuevo
    this.clienteService.setClienteSeleccionado(null);
    this.router.navigate(['/Create-Cliente']); // Navegar al componente de creación
  }


  verMascotas(cliente: Cliente): void {
    this.router.navigate(['/Mascotas'], { queryParams: { clienteId: cliente.id } }); // Navegar y pasar el ID del cliente
  }
  

  onSearch() {
    this.filterClientes();
  }

  private filterClientes() {
    if (this.searchTerm.trim() === '') {
      this.clientesMostrados = this.clientes;
    } else {
      this.clientesMostrados = this.clientes.filter(cliente =>
        cliente.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.page = 1;
  }
}