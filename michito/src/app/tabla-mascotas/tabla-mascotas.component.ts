import { Component } from '@angular/core';
import{BarraLateralComponent} from'../componentes/barra-lateral/barra-lateral.component'

@Component({
  selector: 'app-tabla-mascotas',
  standalone: true,
  imports: [BarraLateralComponent],
  templateUrl: './tabla-mascotas.component.html',
  styleUrl: './tabla-mascotas.component.css'
})
export class TablaMascotasComponent {

}
