import { Component,Input } from '@angular/core';
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
import { Medicamento } from '../Model/medicamento';
import { MedicamentoService } from '../Services/medicamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-update-medicamento',
  standalone: true,
  imports: [BarraLateralComponent,CommonModule,FormsModule],
  templateUrl: './update-medicamento.component.html',
  styleUrl: './update-medicamento.component.css'
})
export class UpdateMedicamentoComponent {
  constructor(
    private route: ActivatedRoute, // Inyecta ActivatedRoute
    private medicamentoService: MedicamentoService, // Inyecta el servicio
    private router: Router
  ) {}
  medicamento!: Medicamento;
  guardar(): void {
    // Llamar al servicio para actualizar el medicamento
    this.medicamentoService.editarMedicamento(this.medicamento).subscribe({
      next: () => {
        console.log('Medicamento actualizado correctamente');
        this.router.navigate(['/Medicamentos']);
      },
      error: (error) => {
        console.error('Error al actualizar medicamento', error);
      }
    });
  }

  ngOnInit(): void {
    // Suscribirse al BehaviorSubject para obtener el medicamento seleccionado
    this.medicamentoService.obtenerMedicamentoSeleccionado().subscribe({
      next: (medicamento) => {
        if (medicamento) {
          this.medicamento = medicamento; // Rellenar el formulario con los datos del medicamento
        }
      }
    });
  }

  onVolver(): void {
    this.router.navigate(['/Medicamentos']); 
  }
}
