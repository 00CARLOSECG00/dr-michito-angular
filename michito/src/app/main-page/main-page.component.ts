import { Component, HostListener } from '@angular/core';
import { MainHeaderComponent } from '../componentes/main-header/main-header.component';
import { MainBienvenidaComponent } from '../componentes/main-bienvenida/main-bienvenida.component';
import { MainServiciosComponent } from '../componentes/main-servicios/main-servicios.component';
import { MainNosotrosComponent } from '../componentes/main-nosotros/main-nosotros.component';
import { MainTestimoniosComponent } from '../componentes/main-testimonios/main-testimonios.component';
import { MainContactoComponent } from '../componentes/main-contacto/main-contacto.component';
import { MainFooterComponent } from '../componentes/main-footer/main-footer.component';
import { AuthService } from '../Services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    MainHeaderComponent,
    MainBienvenidaComponent,
    MainServiciosComponent,
    MainNosotrosComponent,
    MainTestimoniosComponent,
    MainContactoComponent,
    MainFooterComponent,
    CommonModule
  ],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  showScrollTopButton = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.redirectBasedOnRole().subscribe();
  }

  // Escucha el evento de desplazamiento en la ventana
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollTopButton = window.pageYOffset > 400;
  }

  // Función para desplazarse hacia la parte superior
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
