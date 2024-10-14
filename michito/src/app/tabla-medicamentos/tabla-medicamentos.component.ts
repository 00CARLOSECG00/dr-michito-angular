import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Importa HttpClient
import { Medicamento } from '../Model/medicamento';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { FormsModule } from '@angular/forms';
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
import { MedicamentoService } from '../Services/medicamento.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tabla-medicamentos',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule, BarraLateralComponent],
  templateUrl: './tabla-medicamentos.component.html',
  styleUrls: ['./tabla-medicamentos.component.css']
})
export class TablaMedicamentosComponent implements OnInit {
  page: number = 1;
  medicamentos: Medicamento[] = [];
  medicamentosMostrados: Medicamento[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient, private medicamentoService: MedicamentoService, private router: Router) {}

  ngOnInit(): void {
    this.cargarMedicamentos();
  }

  cargarMedicamentos(): void {
    this.medicamentoService.obtenerMedicamentos().subscribe({
      next: (data: Medicamento[]) => {
        this.medicamentos = data;
        this.medicamentosMostrados = data;
      },
      error: (error) => {
        console.error('Error al cargar medicamentos', error);
      },
      complete: () => {
        console.log('Carga de medicamentos completada');
      }
    });
  }

  eliminarMedicamento(id: number) {
    this.medicamentoService.eliminarMedicamento(id).subscribe({
      next: () => {
        console.log('Medicamento eliminado correctamente');
        this.cargarMedicamentos(); 
      },
      error: (error) => {
        console.error('Error al eliminar medicamento', error);
      }
    });
  }

  editarMedicamento(medicamento: Medicamento) {
    this.medicamentoService.setMedicamentoSeleccionado(medicamento);
    this.router.navigate(['/UpdateMedicamento']);
  }

  onSearch() {
    this.filterMedicamentos();
  }

  private filterMedicamentos() {
    if (this.searchTerm.trim() === '') {
      this.medicamentosMostrados = this.medicamentos;
    } else {
      this.medicamentosMostrados = this.medicamentos.filter(medicamento =>
        medicamento.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.page = 1;
  }
}