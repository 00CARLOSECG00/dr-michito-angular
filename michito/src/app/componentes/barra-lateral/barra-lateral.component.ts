import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-barra-lateral',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barra-lateral.component.html',
  styleUrls: ['./barra-lateral.component.css']
})
export class BarraLateralComponent {
  @Input() tipoUsuario: string = ''; // define tipoUsuario como un input

  // Método para manejar los clics de los botones
  onClick(buttonName: string) {
    console.log('Botón clickeado:', buttonName);
    // Aquí puedes implementar lógica para navegar o cambiar el contenido
  }
}
