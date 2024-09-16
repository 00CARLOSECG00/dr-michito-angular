import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  mostrarError: boolean = false;
  comprobar(usuario: string) {
    if (usuario ) {
      //redirigir
    } else {
      this.mostrarError = true; 
    }
  } 
}
