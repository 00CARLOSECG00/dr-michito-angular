import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export class CreateMascotaComponent {
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
  

  guardar() {
    if (!this.modoEdicion) {
      const cedulaCliente = (document.getElementById('cedulaCliente') as HTMLInputElement).value;
      console.log('Datos enviados:', { ...this.formMascota, clienteCedula: cedulaCliente });  // Verifica los datos que envías
  
      this.http.post<Mascota>(`${this.ROOT_URL}/agregar`, { ...this.formMascota, clienteCedula: cedulaCliente }).subscribe({
        next: (mascotaAgregada) => {
          console.log('Mascota agregada:', mascotaAgregada);
          this.volver.emit();
        },
        error: (error) => {
          console.error('Error al agregar la mascota:', error);
          this.mostrarError = true;
        }
      });
    } else {
      this.volver.emit();
    }
  }
  
  

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
    this.volver.emit();  // Emite 'false' para notificar al padre que se ha salido del modo creación/edición
  }
}
