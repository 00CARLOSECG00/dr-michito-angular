import { Component,OnInit } from '@angular/core';
import{Login}from'../login'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'  // Asegúrate de importar FormsModule

@Component({
  selector: 'app-login-portal-interno',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login-portal-interno.component.html',
  styleUrls: ['./login-portal-interno.component.css']

})
export class LoginPortalInternoComponent {
  mostrarError: boolean = false;
  login!:Login;

  constructor(private router: Router) {}
  
  ngOnInit():void{
    this.login={
      "username":"admin",
      "password":"admin"
    }
  }
  comprobar(usuario: string, contrasena: string) {
    console.log('Botón de Iniciar Sesión presionado');
    console.log('Usuario ingresado:', usuario);
    console.log('Contraseña ingresada:', contrasena);
    if (usuario === this.login.username && contrasena === this.login.password) {
      // Redirigir al componente CRUD-General y enviar el tipo de usuario
      console.log('Redirigiendo a CRUD-General');
      this.router.navigate(['/crud-general'], { queryParams: { usuario: 'admin' } });
    } else {
      console.log('Usuario o contraseña incorrectos');
      this.mostrarError = true; 
    }
  }  

  onClick() {
    console.log('Botón clickeado');
    this.router.navigate(['/crud-general'], { queryParams: { usuario: 'admin' } });
  }
  
}