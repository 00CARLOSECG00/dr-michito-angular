import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule
import { CommonModule } from '@angular/common';
import { ClienteService } from '../Services/cliente.service';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';  // Importa HttpClientModule correctamente
import { Cliente } from '../Model/cliente';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule  // Asegúrate de importar HttpClientModule aquí
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  mostrarError: boolean = false;
  cedula: string = '';

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {}
  
  login() {
    console.log('Cedula ingresada:', this.cedula);
    
    // Suscríbete al observable y maneja los resultados
    this.authService.login(this.cedula).subscribe({
      next: (response) => {
        if (response) {
          // Solo redirigir si el login fue exitoso
          console.log('Login exitoso:', response);
          this.router.navigate(['/mascotasCliente']);
        } else {
          // Si el login no fue exitoso
          console.error('Login fallido');
          this.mostrarError = true;
        }
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
        this.mostrarError = true;
      },
    });
  }
}

