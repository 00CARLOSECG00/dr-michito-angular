import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as AOS from 'aos';

@Component({
  selector: 'app-main-bienvenida',
  standalone: true,
  imports: [],
  templateUrl: './main-bienvenida.component.html',
  styleUrl: './main-bienvenida.component.css'
})
export class MainBienvenidaComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Solo inicializa AOS si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        offset: 120,
        delay: 0,
        duration: 1000,
        easing: 'ease-in-out',
        once: false,
        mirror: true,
        anchorPlacement: 'top-bottom',
      });
    }
  }
}