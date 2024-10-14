import { Component, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login-portal-interno',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login-portal-interno.component.html',
  styleUrls: ['./login-portal-interno.component.css'],
})
export class LoginPortalInternoComponent implements OnInit {
  mostrarError: boolean = false;
  login = { username: '', password: '', tipo: '' };

  constructor(
    private http: HttpClient,
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
      .subscribe((response) => {
        if (response) {
          console.log('Login exitoso');
          console.log('Redirigiendo a tabla de mascotas');
          console.log('Tipo de usuario:', this.authService.getUserType());
          this.router.navigate(['/Mascotas']);
        } else {
          console.log('Login fallido');
          this.mostrarError = true;
        }
      });
  }

  onClick() {
    this.comprobar();
  }
}
