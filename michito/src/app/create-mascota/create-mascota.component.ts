import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';
import { Mascota } from '../Model/mascota';
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-mascota',
  standalone: true,
  imports: [FormsModule, CommonModule, BarraLateralComponent], 
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
    ID: 0, 
    nombre: '',
    peso: 0,
    edad: 0,
    foto: ''
  }

  constructor(private router: Router) {}

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
      console.log('Mascota creada:', this.formMascota);
      this.sendMascota = Object.assign({}, this.formMascota);
      this.mascotaCreada.emit(this.sendMascota);

    }
    this.limpiarFormulario();
    this.router.navigate(['/mascotas']);
  }

  limpiarFormulario() {
    this.formMascota = {
      ID: 0, 
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
