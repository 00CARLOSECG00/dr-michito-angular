import { Component, NgZone, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  mostrarError: boolean = false;
  cedula: string = '';
  captchaResolved: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private zone: NgZone,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    // Carga el script de hCaptcha
    const script = this.renderer.createElement('script');
    script.src = 'https://js.hcaptcha.com/1/api.js';
    script.async = true;
    script.defer = true;
    this.renderer.appendChild(document.body, script);

    // Define el callback de hCaptcha
    (window as any).onCaptchaResolved = this.onCaptchaResolved.bind(this);
  }

  // Callback cuando se resuelve el CAPTCHA
  onCaptchaResolved(): void {
    this.zone.run(() => {
      this.captchaResolved = true;
    });
  }

  login() {
    console.log('Cedula ingresada:', this.cedula);
    
    this.authService.login(this.cedula).subscribe({
      next: (response) => {
        if (response) {
          console.log('Login exitoso:', response);
          this.router.navigate(['/mascotasCliente']);
        } else {
          console.error('Login fallido');
          this.mostrarError = true;
        }
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
        this.mostrarError = true;
      }
    });
  }
}
