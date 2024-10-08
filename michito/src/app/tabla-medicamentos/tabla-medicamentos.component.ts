import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Importa HttpClient
import { Medicamento } from '../Model/medicamento';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tabla-medicamentos',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule],
  templateUrl: './tabla-medicamentos.component.html',
  styleUrls: ['./tabla-medicamentos.component.css']  // Corrige el nombre de styleUrls
})
export class TablaMedicamentosComponent {

  page: number = 1;
  medicamentos: Medicamento[] = [];
  medicamentosMostrados: Medicamento[] = [];
  searchTerm: string = '';
  private ROOT_URL = 'http://localhost:8080/Medicamentos';  // Ajusta la URL de tu API

  constructor(private http: HttpClient) {}  // Inyecta HttpClient directamente

  ngOnInit(): void {
    this.cargarMedicamentos();
  }

  // Método para cargar todos los medicamentos directamente desde el componente
  cargarMedicamentos(): void {
    this.http.get<Medicamento[]>(`${this.ROOT_URL}/all`).subscribe({
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

  eliminarMedicamento(_t23: any) {
    console.log("Eliminar no implementado");
  }

  editarMedicamento(_t23: any) {
    console.log("Editar no implementado");
  }
  onSearch() {
    this.filterMedicamentos();
  }

  private filterMedicamentos() {
    if (this.searchTerm.trim() === '') {
      // Si no hay término de búsqueda, mostrar todas las mascotas
      this.medicamentosMostrados = this.medicamentos;
    } else {
      // Filtrar las mascotas basándose en el término de búsqueda
      this.medicamentosMostrados = this.medicamentos.filter(medicamento =>
        medicamento.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.page = 1; // Reset a la primera página cuando se realiza una búsqueda
  }
}
