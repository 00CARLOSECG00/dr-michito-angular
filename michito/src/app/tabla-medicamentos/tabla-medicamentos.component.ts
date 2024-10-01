import { Component } from '@angular/core';
import { Medicamento } from '../Model/medicamento';
import { MedicamentoService } from '../Services/medicamento.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla-medicamentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-medicamentos.component.html',
  styleUrl: './tabla-medicamentos.component.css'
})
export class TablaMedicamentosComponent {

  medicamentos: Medicamento[] = [];

  constructor(private servicioMedicamento: MedicamentoService) {}

  ngOnInit(): void {
    this.cargarMedicamentos();
    console.log(this.medicamentos);
  }

  // Método para cargar todos los medicamentos
  cargarMedicamentos(): void {
    this.servicioMedicamento.obtenerMedicamentos().subscribe({
      next: (data: Medicamento[]) => {
        this.medicamentos = data;
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

}
