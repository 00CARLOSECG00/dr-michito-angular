import { Component, OnInit } from '@angular/core';
import { Cliente } from '../Model/cliente';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
import { HttpClient } from '@angular/common/http';
import { ClienteService } from '../Services/cliente.service';
import { Router } from '@angular/router';
import { ExcelExportService } from '../Services/excel-export.service';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-tabla-clientes',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    FormsModule,
    BarraLateralComponent,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService],
  templateUrl: './tabla-clientes.component.html',
  styleUrls: ['./tabla-clientes.component.css']
})
export class TablaClientesComponent implements OnInit {
  page: number = 1;
  clientes: Cliente[] = [];
  clientesMostrados: Cliente[] = [];
  searchTerm: string = '';

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private excelService: ExcelExportService,
    private confirmationService: ConfirmationService
  ) {}

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
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este cliente?',
      header: 'Confirmación de Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        this.procederEliminarCliente(id);
      }
    });
  }

  procederEliminarCliente(id: number): void {
    this.clienteService.deleteCliente(id).subscribe({
      next: () => {
        this.loadClientes();
      },
      error: (error) => {
        console.error('Error al eliminar el cliente:', error);
      }
    });
  }

  editarCliente(cliente: Cliente): void {
    this.clienteService.setClienteSeleccionado(cliente);
    this.router.navigate(['/Create-Cliente']);
  }

  crearCliente(): void {
    this.clienteService.setClienteSeleccionado(null);
    this.router.navigate(['/Create-Cliente']);
  }

  verMascotas(cliente: Cliente): void {
    this.router.navigate(['/Mascotas'], { queryParams: { clienteId: cliente.id } });
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

  exportarExcel(): void {
    const headers = {
      'id': 'ID',
      'cedula': 'Cédula',
      'nombre': 'Nombre',
      'correo': 'Correo Electrónico',
      'celular': 'Celular'
    };

    const datosParaExportar = this.clientesMostrados.map(cliente => ({
      id: cliente.id,
      cedula: cliente.cedula,
      nombre: cliente.nombre,
      correo: cliente.correo,
      celular: cliente.celular
    }));

    try {
      this.excelService.exportToExcel(
        datosParaExportar,
        'Listado_Clientes',
        headers,
        'Listado de Clientes'
      );
    } catch (error) {
      console.error('Error al exportar a Excel:', error);
    }
  }
}