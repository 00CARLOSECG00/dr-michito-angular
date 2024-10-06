import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';
import { Mascota } from '../Model/mascota';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-mascota',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './create-mascota.component.html',
  styleUrls: ['./create-mascota.component.css']
})
export class CreateMascotaComponent implements OnChanges {
  @Input() mascota!: Mascota | null; 
  @Input() modoEdicion: boolean = false; 
  @Output() volver: EventEmitter<void> = new EventEmitter<void>();

  formMascota: Mascota = {
    id: 0,
    nombre: '',
    peso: 0,
    edad: 0,
    foto: ''
  };
  
  private ROOT_URL = 'http://localhost:8080/Mascotas';
  mostrarError: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnChanges() {
    if (this.mascota) {
      this.formMascota = { ...this.mascota }; 
    } else {
      this.limpiarFormulario();
    }
  }
  
  // Guardar o editar según el modo
  guardar() {
    const cedulaCliente = (document.getElementById('cedulaCliente') as HTMLInputElement).value;
    console.log('ModoEdicion:', this.modoEdicion);
    if (!this.modoEdicion) {
      // Modo creación: realizar POST
      const body = {
        ...this.formMascota,
        clienteCedula: cedulaCliente
      };

      console.log('Datos enviados (creación):', body);

      this.http.post<Mascota>(`${this.ROOT_URL}/agregar`, body).subscribe({
        next: (mascotaAgregada) => {
          console.log('Mascota agregada:', mascotaAgregada);
          this.volver.emit();  // Emite el evento para volver a la vista anterior
        },
        error: (error) => {
          console.error('Error al agregar la mascota:', error);
          this.mostrarError = true;
        }
      });
    } else {
      // Modo edición: realizar PUT
      const body = {
        ...this.formMascota,  // Los datos actuales de la mascota
        clienteCedula: cedulaCliente  // Se mantiene la cédula original
      };

      console.log('Datos enviados (edición):', body);

      this.http.put<Mascota>(`${this.ROOT_URL}/editar/${this.formMascota.id}`, body).subscribe({
        next: (mascotaEditada) => {
          console.log('Mascota editada:', mascotaEditada);
          this.volver.emit();  // Emite el evento para volver a la vista anterior
        },
        error: (error) => {
          console.error('Error al editar la mascota:', error);
          this.mostrarError = true;
        }
      });
    }
  }
  
  // Limpiar el formulario para nueva creación
  limpiarFormulario() {
    this.formMascota = {
      id: 0,
      nombre: '',
      peso: 0,
      edad: 0,
      foto: ''
    };
  }

  // Al volver, emite el evento para indicar que se sale de la vista
  onVolver() {
    this.volver.emit();  // Notificar al componente padre
  }
}
