import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule
import { CommonModule } from '@angular/common';
import { ClienteService } from '../Services/cliente.service';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';  // Importa HttpClientModule correctamente
import { Cliente } from '../Model/cliente';

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

  constructor(private clienteService: ClienteService, private http: HttpClient, private router: Router) {}

  login() {
    console.log('Cedula ingresada:', this.cedula);
    this.http.get<Cliente>(`http://localhost:8080/Clientes/${this.cedula}`).subscribe(
      (response) => {
        console.log('Cliente encontrado:', response);
        this.clienteService.setCliente(response);
        this.router.navigate(['/crud-general'], { queryParams: { usuario: 'cliente'} });
      },
      (error) => {
        console.error('Error al obtener el cliente:', error);
        this.mostrarError = true;
      }
    );
  }
}
