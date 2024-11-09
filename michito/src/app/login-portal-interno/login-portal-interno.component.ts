import { Component, OnInit, NgZone, Renderer2, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginPortalInternoComponent implements OnInit {
  mostrarError: boolean = false;
  mostrarInactivo: boolean = false;
  captchaResolved: boolean = false; // Indica si el CAPTCHA está resuelto
  login = { username: '', password: '', tipo: '' };

  constructor(
    private router: Router,
    private authService: AuthService,
    private zone: NgZone,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    // Carga el script de hCaptcha en el DOM
    const script = this.renderer.createElement('script');
    script.src = 'https://js.hcaptcha.com/1/api.js';
    script.async = true;
    script.defer = true;
    this.renderer.appendChild(document.body, script);
    
    // Define el callback de hCaptcha
    (window as any).onCaptchaResolved = this.onCaptchaResolved.bind(this);
  }

  // Callback cuando se resuelve el CAPTCHA
  onCaptchaResolved(token: string): void {
    console.log('Captcha Resolved:', token); // Opcional: Log para ver el token
    this.zone.run(() => {
      this.captchaResolved = true; // Marca el CAPTCHA como resuelto
    });
  }

  comprobar() {
    console.log('Botón de Iniciar Sesión presionado');
    this.authService
      .loginPortalInterno(this.login.username, this.login.password)
      .subscribe((result: { authenticated: boolean; veterinario?: Veterinario }) => {
        if (result.authenticated) {
          console.log('Login exitoso');
          this.mostrarInactivo = false;
          this.mostrarError = false;
          this.router.navigate(['/Mascotas']);
        } else if (result.veterinario && result.veterinario.estado === false) {
          console.log('Veterinario inactivo');
          this.mostrarInactivo = true;
          this.mostrarError = false;
        } else {
          console.log('Login fallido');
          this.mostrarError = true;
          this.mostrarInactivo = false;
        }
      });
  }

  onClick() {
    // Solo intenta el login si el CAPTCHA está resuelto
    if (this.captchaResolved) {
      this.comprobar();
    } else {
      console.log('Captcha no resuelto');
      this.mostrarError = true;
    }
  }
}
