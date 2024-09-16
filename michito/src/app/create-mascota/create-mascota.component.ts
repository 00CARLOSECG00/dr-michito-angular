import { Component } from '@angular/core';
import{BarraLateralComponent} from'../componentes/barra-lateral/barra-lateral.component'
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule
import { CommonModule } from '@angular/common';
import { Mascota } from '../mascota';

@Component({
  selector: 'app-create-mascota',
  standalone: true,
  imports: [BarraLateralComponent,FormsModule,CommonModule],
  templateUrl: './create-mascota.component.html',
  styleUrl: './create-mascota.component.css'
})
export class CreateMascotaComponent {
  mascota!:Mascota;
  mostrarError: boolean = false;
  crea(mascota: Mascota){
    //revisar si existe mostrarError=true;
    //else crear

  }

}
