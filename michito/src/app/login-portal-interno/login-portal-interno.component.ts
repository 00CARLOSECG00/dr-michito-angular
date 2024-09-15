import { Component,OnInit } from '@angular/core';
import{Login}from'../login'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule

@Component({
  selector: 'app-login-portal-interno',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login-portal-interno.component.html',
  styleUrl: './login-portal-interno.component.css'

})
export class LoginPortalInternoComponent {
  mostrarError: boolean = false;
  login!:Login;
  ngOnInit():void{
    this.login={
      "username":"admin",
      "password":"admin"
    }
  }
  comprobar(usuario: string, contrasena: string) {
    if (usuario === this.login.username && contrasena === this.login.password) {
      //redirigir
    } else {
      this.mostrarError = true; 
    }
  }  
}

