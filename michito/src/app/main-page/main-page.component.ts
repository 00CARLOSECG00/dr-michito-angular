import { Component } from '@angular/core';
import{MainHeaderComponent}from'../componentes/main-header/main-header.component'
import{MainBienvenidaComponent} from'../componentes/main-bienvenida/main-bienvenida.component'
import{MainServiciosComponent} from'../componentes/main-servicios/main-servicios.component'
import{MainNosotrosComponent}from'../componentes/main-nosotros/main-nosotros.component'
import{MainTestimoniosComponent}from'../componentes/main-testimonios/main-testimonios.component'
import{MainContactoComponent}from'../componentes/main-contacto/main-contacto.component'
import{MainFooterComponent}from'../componentes/main-footer/main-footer.component'
@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [MainHeaderComponent,MainBienvenidaComponent,MainServiciosComponent,MainNosotrosComponent,MainTestimoniosComponent,MainContactoComponent,MainFooterComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
