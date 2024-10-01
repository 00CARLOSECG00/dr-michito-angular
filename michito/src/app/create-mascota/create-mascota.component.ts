import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';
import { Mascota } from '../Model/mascota';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-mascota',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './create-mascota.component.html',
  styleUrls: ['./create-mascota.component.css']
})
export class CreateMascotaComponent {
  @Output() mascotaCreada = new EventEmitter<Mascota>(); 
  @Input() mascota!: Mascota | null; // Recibe la mascota para editar
  @Input() modoEdicion: boolean = false; // Indica si estamos en edición o creación
  @Output() mascotaActualizada = new EventEmitter<Mascota>(); // Emitir para edición

  

  sendMascota!:Mascota;
  mostrarError: boolean = false;
  formMascota: Mascota = {
    id: 0, 
    nombre: '',
    peso: 0,
    edad: 0,
    foto: ''
  }
  private ROOT_URL = 'http://localhost:8080/Mascotas';
  constructor(private router: Router, private http: HttpClient) {}

  ngOnChanges() {
    if (this.mascota) {
      this.formMascota = { ...this.mascota }; 
    }
  }
  

  guardar() {
    if (this.modoEdicion) {
      console.log('Mascota Actualizada:', this.formMascota);
      this.mascotaActualizada.emit(this.formMascota);
    } else {
      console.log('Mascota a enviar:', this.formMascota); 
      this.http.post<Mascota>(`${this.ROOT_URL}/agregar`, this.formMascota).subscribe({
        next: (mascotaAgregada) => {
          console.log('Mascota agregada:', mascotaAgregada);
          this.mascotaCreada.emit(mascotaAgregada);
        },
        error: (error) => {
          console.error('Error al agregar la mascota:', error);
          this.mostrarError = true;
        }
      });
    }
    this.limpiarFormulario();
  }

  limpiarFormulario() {
    this.formMascota = {
      id: 0, 
      nombre: '',
      peso: 0,
      edad: 0,
      foto: ''
    };

    this.modoEdicion = false;
    this.mascota = null;
  }

  goBack() {
    history.back();
  }
}
