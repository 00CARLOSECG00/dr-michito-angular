import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-portal-interno',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login-portal-interno.component.html',
  styleUrls: ['./login-portal-interno.component.css']
})
export class LoginPortalInternoComponent implements OnInit {
  mostrarError: boolean = false;
  login = { username: '', password: '', tipo: '' };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  comprobar() {
    console.log('Botón de Iniciar Sesión presionado');
    console.log('Usuario ingresado:', this.login.username);
    console.log('Contraseña ingresada:', this.login.password);

    this.http.get<any>(`http://localhost:8080/login/portalInterno/${this.login.username}`).subscribe(
      (response) => {
        // Verifica toda la respuesta del backend
        console.log('Respuesta del backend:', response);

        // Usa la propiedad 'password' en lugar de 'passwords'
        if (response && response.password) {
          const backendPassword = response.password.trim();  // Ajuste a 'password'
          const enteredPassword = (this.login.password || '').trim();
        
          console.log('Contraseña del backend:', backendPassword);
          console.log('Contraseña ingresada:', enteredPassword);

          if (backendPassword === enteredPassword) {
            console.log('Redirigiendo a CRUD-General');
            this.router.navigate(['/crud-general'], { queryParams: { usuario: response.tipo } });
          } else {
            console.log('Usuario o contraseña incorrectos');
            this.mostrarError = true;
          }
        } else {
          console.log('La propiedad "password" no existe en la respuesta del backend.');
          this.mostrarError = true;
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error en la solicitud:', error);
        this.mostrarError = true;
      }
    );
  }

  onClick() {
    this.comprobar();
  }
}
