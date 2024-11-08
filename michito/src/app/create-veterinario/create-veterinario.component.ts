import { VeterinarioDTO } from '../Model/veterinario-dto';
import { VeterinarioService } from '../Services/veterinario.service';
import { Component, Input, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
import { Router } from '@angular/router';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-create-veterinario',
  standalone: true,
  imports: [FormsModule, CommonModule, BarraLateralComponent,PasswordModule],
  templateUrl: './create-veterinario.component.html',
  styleUrls: ['./create-veterinario.component.css']
})
export class CreateVeterinarioComponent implements OnChanges {

  mostrarError: boolean = false;

  @Input() veterinario!: VeterinarioDTO | null;
  @Input() modoEdicion: boolean = false;

  // Objeto que maneja el formulario
  formVeterinario: VeterinarioDTO = {
    id: 0,
    cedula: '',
    nombre: '',
    correo: '',
    celular: 0,
    especialidad: '',
    estado: true,
    usuario: '',
    passwords: '',
    tipo: 'veterinario'
  };

  constructor(
    private veterinarioService: VeterinarioService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formVeterinario = {
      id: 0,
      cedula: '',
      nombre: '',
      correo: '',
      celular: 0,
      especialidad: '',
      estado: true,
      usuario: '',
      passwords: '',
      tipo: 'veterinario'
    };
    
    // Obtiene el veterinario seleccionado y convierte a DTO
    this.veterinarioService.getVeterinarioSeleccionado().subscribe(veterinario => {
      if (veterinario) {
        this.modoEdicion = true;
        this.formVeterinario = {
          id: veterinario.id,
          cedula: veterinario.cedula,
          nombre: veterinario.nombre,
          correo: veterinario.correo,
          celular: veterinario.celular,
          especialidad: veterinario.especialidad,
          estado: veterinario.estado,
          usuario: veterinario.login?.username || '',
          passwords: veterinario.login?.password || '',
          tipo: veterinario.login?.tipo || 'veterinario'
        };
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

  guardar(veterinarioDTO: VeterinarioDTO) {
    if (this.modoEdicion) {
       this.veterinarioService.updateVeterinario(veterinarioDTO).subscribe({
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
       this.veterinarioService.createVeterinario(veterinarioDTO).subscribe({
          next: (response) => {
             console.log(response);  // Aquí deberías ver "Veterinario guardado correctamente"
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
      estado: true,
      usuario: '',
      passwords: '',
      tipo: 'veterinario'
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
