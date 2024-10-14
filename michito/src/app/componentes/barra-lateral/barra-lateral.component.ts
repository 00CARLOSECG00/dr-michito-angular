import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-barra-lateral',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barra-lateral.component.html',
  styleUrls: ['./barra-lateral.component.css']
})
export class BarraLateralComponent implements OnInit {
  tipoUsuario: string | null = null;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // Verificar si estamos en el navegador antes de acceder a localStorage
    if (isPlatformBrowser(this.platformId)) {
      this.tipoUsuario = localStorage.getItem('userType');
    }
  }

  // Método para manejar los clics de los botones
  onClick(buttonName: string) {
    console.log('Tipo de usuario desde el componente de la barra lateral:', this.tipoUsuario);
    console.log('Botón clickeado:', buttonName);
    this.router.navigate(['/' + buttonName]);
  }

  unLogin() {
    this.router.navigate(['/']); // Cambia a la ruta deseada
  }
}
