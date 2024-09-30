import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../Model/cliente';
import { RouterModule } from '@angular/router';  // Importar RouterModule para usar routerLink
import { CommonModule } from '@angular/common';  // Importar CommonModule para usar directivas como ngFor, ngIf

@Component({
  selector: 'app-tabla-clientes',
  standalone: true,
  imports: [
    CommonModule,    // Importa CommonModule para habilitar ngFor, ngIf, etc.
    RouterModule     // Importa RouterModule para habilitar routerLink
  ],
  templateUrl: './tabla-clientes.component.html',
  styleUrls: ['./tabla-clientes.component.css']
})
export class TablaClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  private ROOT_URL = 'http://localhost:8080/Clientes';  // URL base de tu API

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadClientes();  
  }

  // Método para cargar los clientes
  loadClientes(): void {
    this.http.get<Cliente[]>(`${this.ROOT_URL}/all`).subscribe({
      next: (data: Cliente[]) => {
        this.clientes = data;
      },
      error: (error) => {
        console.error('Error al obtener los clientes:', error);
      }
    });
  }

  // Método para confirmar y eliminar el cliente
  confirmDelete(id: number): void {
    const confirmed = confirm('¿Estás seguro de que deseas eliminar este cliente?');
    if (confirmed) {
      // Petición DELETE al servidor para eliminar el cliente
      this.http.delete(`${this.ROOT_URL}/delete/${id}`).subscribe();
      this.loadClientes();
      
    }
    this.loadClientes();
  }
}
