import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../Model/cliente';
import { RouterModule } from '@angular/router';  
import { CommonModule } from '@angular/common';  
import { CreateClienteComponent } from '../create-cliente/create-cliente.component';
import { TablaMascotasComponent} from '../tabla-mascotas/tabla-mascotas.component';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-tabla-clientes',
  standalone: true,
  imports: [
    CommonModule,   
    RouterModule,     
    CreateClienteComponent,
    TablaMascotasComponent,
    NgxPaginationModule,
    FormsModule
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

  private ROOT_URL = 'http://localhost:8080/Clientes';  // URL base del backend
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadClientes();  
  }

  // Método para cargar los clientes
  loadClientes(): void {
    this.http.get<Cliente[]>(`${this.ROOT_URL}/all`).subscribe({
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
      this.http.delete(`${this.ROOT_URL}/delete/${id}`).subscribe();
      this.loadClientes();
      
    }
    this.loadClientes();
  }
  crearCliente(): void {
    this.modoCreacion = true;
    this.modoEdicion = false; 
    this.clienteSeleccionado = null;  
  }
  
  
  editarCliente(cliente: Cliente) {
    this.clienteSeleccionado = { ...cliente };  
    this.modoEdicion = true;
    this.modoCreacion = false;  
  }
  
  cerrarFormulario() {
    this.modoCreacion = false;
    this.modoEdicion = false;
    this.clienteSeleccionado = null;
    this.loadClientes(); 
  }
  
  verMascotas(cliente: Cliente): void {
    this.clienteSeleccionado = cliente; // Guardar el cliente seleccionado
    this.modoVisualizacion = true; // Cambiar a modo de visualización de mascotas
    console.log('cliente seleccionado ' + this.clienteSeleccionado.id);
  }
  
  cerrarMascotas(): void {
    this.modoVisualizacion = false; // Volver al modo anterior
    this.clienteSeleccionado = null;
  }

  onSearch() {
    this.filterClientes();
  }

  private filterClientes() {
    if (this.searchTerm.trim() === '') {
      // Si no hay término de búsqueda, mostrar todas las mascotas
      this.clientesMostrados = this.clientes;
    } else {
      // Filtrar las mascotas basándose en el término de búsqueda
      this.clientesMostrados = this.clientes.filter(cliente =>
        cliente.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.page = 1; // Reset a la primera página cuando se realiza una búsqueda
  }
  
}
