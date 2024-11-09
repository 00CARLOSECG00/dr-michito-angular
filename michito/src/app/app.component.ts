import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as AOS from 'aos';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'michito';
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: false,
        mirror: true,
        offset: 120,
        anchorPlacement: 'top-bottom',
        disable: 'mobile' // Deshabilita en móviles si hay problemas de rendimiento
      });

      // Refresh AOS en cambios de ruta
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        setTimeout(() => {
          AOS.refresh();
        }, 100);
      });

      // Refresh en scroll
      window.addEventListener('scroll', () => {
        AOS.refresh();
      });

      // Refresh cuando el contenido cambie
      const observer = new MutationObserver(() => {
        AOS.refresh();
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  }
}
