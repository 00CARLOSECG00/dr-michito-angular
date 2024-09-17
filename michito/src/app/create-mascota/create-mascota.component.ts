import { Component, EventEmitter, Output, output } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';
import { Mascota } from '../mascota';
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

  sendMascota!:Mascota;

  formMascota: Mascota = {
    ID: 0, 
    nombre: '',
    peso: 0,
    edad: 0,
    foto: ''
  }

  mostrarError: boolean = false;

  constructor(private router: Router) {}

  crea(){
 
      this.mostrarError = false;
      console.log('Mascota creada:', this.formMascota);
      this.sendMascota = Object.assign({}, this.formMascota);
      this.mascotaCreada.emit(this.sendMascota);
      this.router.navigate(['/mascotas']);
  }



  goBack() {
    history.back();
  }
}
