import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { Veterinario } from '../Model/veterinario';

@Component({
  selector: 'app-login-portal-interno',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login-portal-interno.component.html',
  styleUrls: ['./login-portal-interno.component.css'],
})
export class LoginPortalInternoComponent implements OnInit {
  mostrarError: boolean = false;
  mostrarInactivo: boolean = false;
  login = { username: '', password: '', tipo: '' };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  comprobar() {
    console.log('Botón de Iniciar Sesión presionado');
    console.log('Usuario ingresado:', this.login.username);
    console.log('Contraseña ingresada:', this.login.password);
  
    this.authService
      .loginPortalInterno(this.login.username, this.login.password)
      .subscribe((result: { authenticated: boolean; veterinario?: Veterinario }) => {
        if (result.authenticated) {
          // Login exitoso, redirigir según el tipo de usuario
          console.log('Login exitoso');
          this.mostrarInactivo = false;
          this.mostrarError = false;
          this.router.navigate(['/Mascotas']);
        } else if (result.veterinario && result.veterinario.estado === false) {
          // Veterinario inactivo, mostrar mensaje de inactividad
          console.log('Veterinario inactivo');
          this.mostrarInactivo = true;
          this.mostrarError = false;  // Asegurarse de que no se muestre el error general
        } else {
          // Login fallido por otras razones
          console.log('Login fallido');
          this.mostrarError = true;
          this.mostrarInactivo = false;  // Asegurarse de que no se muestre el error de inactividad
        }
      });
  }
  
  
  
  
  onClick() {
    // Al darle click se comprueben los datos del login
    this.comprobar();
  }
}
