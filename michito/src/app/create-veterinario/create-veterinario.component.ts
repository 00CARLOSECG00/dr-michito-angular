import { Veterinario } from '../Model/veterinario';
import { VeterinarioService } from '../Services/veterinario.service';
import { Component, Input, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-veterinario',
  standalone: true,
  imports: [FormsModule, CommonModule, BarraLateralComponent],
  templateUrl: './create-veterinario.component.html',
  styleUrl: './create-veterinario.component.css'
})
export class CreateVeterinarioComponent implements OnChanges {

  mostrarError: boolean = false;

  @Input() veterinario!: Veterinario | null;
  @Input() modoEdicion: boolean = false;

  // Objeto que maneja el formulario
  formVeterinario: Veterinario = {
    id: 0, 
    cedula: '',
    nombre: '',
    correo: '',
    celular: 0,
    especialidad: '',
    estado:true
  };

  constructor(
    private veterinarioService: VeterinarioService,
    private router: Router
  ) {}
  ngOnInit() {
    // Obtiene el veterinario seleccionado
    this.veterinarioService.getVeterinarioSeleccionado().subscribe(veterinario => {
      if (veterinario) {
        this.modoEdicion = true;
        this.formVeterinario = veterinario;
      } else {
        this.modoEdicion = false;
        this.resetForm();
      }
    });
  }
  
  ngOnChanges() {
    if (this.veterinario && this.modoEdicion) {
      // Si se pasa un veterinario en modo edición, llenamos el formulario con sus datos
      this.formVeterinario = { ...this.veterinario };
    } else {
      // Si no hay veterinario, inicializamos el formulario en blanco (crear)
      this.resetForm();
    }
  }

  // Método para crear o editar dependiendo del modo
  guardar(veterinario: Veterinario) {
    if (this.modoEdicion) {
      // Editar veterinario existente
      this.veterinarioService.updateVeterinario(veterinario).subscribe({
        next: (response) => {
          console.log('Veterinario actualizado con éxito:', response);
          this.onVolver();
        },
        error: (error) => {
          console.error('Error al actualizar veterinario:', error);
          this.mostrarError = true;
        }
      });
    } else {
      // Crear nuevo veterinario
      this.veterinarioService.createVeterinario(veterinario).subscribe({
        next: (response) => {
          console.log('Veterinario creado con éxito:', response);
          this.onVolver();
        },
        error: (error) => {
          console.error('Error al crear veterinario:', error);
          this.mostrarError = true;
        }
      });
    }
  }

  // Resetea el formulario para crear un nuevo veterinario
  resetForm() {
    this.formVeterinario = {
      id: 0,
      cedula: '',
      nombre: '',
      correo: '',
      celular: 0,
      especialidad: '',
      estado:true
    };
  }
  onChangeEstado(event: any) {
    this.formVeterinario.estado = event.target.checked;
  }

  onVolver() {
    // Navegar de vuelta a la lista de veterinarios
    this.router.navigate(['/personal']);
  }
}
