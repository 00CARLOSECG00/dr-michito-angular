import { Component, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router';
@Component({
  selector: 'app-barra-lateral',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barra-lateral.component.html',
  styleUrls: ['./barra-lateral.component.css']
})
export class BarraLateralComponent {
  @Input() tipoUsuario: string = ''; // define tipoUsuario como un input
  @Output() botonSeleccionado = new EventEmitter<string>();
  constructor(private router: Router) {}
  // Método para manejar los clics de los botones
  onClick(buttonName: string) {
    console.log('Botón clickeado:', buttonName);
    this.botonSeleccionado.emit(buttonName);
    // Aquí puedes implementar lógica para navegar o cambiar el contenido
  }
  unLogin() {
    this.router.navigate(['/']); // Cambia a la ruta deseada
  }
}
