import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-barra-lateral',
  standalone: true,
  imports: [],
  templateUrl: './barra-lateral.component.html',
  styleUrls: ['./barra-lateral.component.css']
})
export class BarraLateralComponent {

  constructor(private router: Router) {}
  // Método para manejar los clics de los botones
  onClick(buttonName: string) {
    console.log('Botón clickeado:', buttonName);
    this.router.navigate(['/' + buttonName]);
  }
  unLogin() {
    this.router.navigate(['/']); // Cambia a la ruta deseada
  }
}
