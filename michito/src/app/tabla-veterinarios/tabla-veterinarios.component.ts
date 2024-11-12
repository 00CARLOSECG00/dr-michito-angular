import { Component, OnInit } from '@angular/core';
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
import { Veterinario } from '../Model/veterinario';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { VeterinarioService } from '../Services/veterinario.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ExcelExportService } from '../Services/excel-export.service';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-tabla-veterinarios',
  standalone: true,
  imports: [
    BarraLateralComponent,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService],
  templateUrl: './tabla-veterinarios.component.html',
  styleUrls: ['./tabla-veterinarios.component.css']
})
export class TablaVeterinariosComponent implements OnInit {
  page: number = 1;
  veterinarios: Veterinario[] = [];
  veterinariosMostrados: Veterinario[] = [];
  veterinarioSeleccionado!: Veterinario | null;
  searchTerm: string = '';
  
  constructor(
    private http: HttpClient,
    private veterinarioService: VeterinarioService,
    private router: Router,
    private excelExportService: ExcelExportService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.listarVeterinario();
  }

  verVeterinario(veterinario: Veterinario) {
    this.router.navigate(['/DetalleVeterinario'], { queryParams: { id: veterinario.id } });
  }

  editarVeterinario(veterinario: Veterinario) {
    this.veterinarioService.setVeterinarioSeleccionado(veterinario);
    this.router.navigate(['/Create-Veterinario']);
  }

  eliminarVeterinario(veterinario: Veterinario) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este empleado?',
      header: 'Confirmación de Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        this.procederEliminarVeterinario(veterinario.id);
      }
    });
  }

  procederEliminarVeterinario(id: number) {
    this.veterinarioService.deleteVeterinario(id).subscribe({
      next: () => {
        console.log('Veterinario eliminado con éxito');
        this.listarVeterinario();
      },
      error: (error) => {
        console.error('Error al eliminar el veterinario:', error);
      }
    });
  }

  agregarVeterinario(): void {
    this.veterinarioService.setVeterinarioSeleccionado(null);
    this.router.navigate(['/Create-Veterinario']);
  }

  listarVeterinario() {
    this.veterinarioService.obtenerVeterinarios().subscribe({
      next: (veterinarios) => {
        this.veterinarios = veterinarios;
        this.veterinariosMostrados = veterinarios;
      },
      error: (error) => {
        console.error('Error al obtener los veterinarios:', error);
      }
    });
  }

  onSearch() {
    this.filterVeterinarios();
  }

  private filterVeterinarios() {
    if (this.searchTerm.trim() === '') {
      this.veterinariosMostrados = this.veterinarios;
    } else {
      this.veterinariosMostrados = this.veterinarios.filter(veterinario =>
        veterinario.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.page = 1;
  }

  exportarAExcel() {
    const headers = {
      'id': 'ID',
      'cedula': 'Cédula',
      'nombre': 'Nombre',
      'correo': 'Correo',
      'celular': 'Celular',
      'especialidad': 'Especialidad',
      'estado': 'Estado'
    };
  
    this.excelExportService.exportToExcel(
      this.veterinariosMostrados,
      'Lista_Personal_Veterinario',
      headers,
      'Lista de Personal Veterinario'
    );
  }
}
