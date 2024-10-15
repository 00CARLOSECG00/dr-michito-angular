import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-main-nosotros',
  standalone: true,
  templateUrl: './main-nosotros.component.html',
  styleUrls: ['./main-nosotros.component.css']
})
export class MainNosotrosComponent implements AfterViewInit {

  currentIndex: number = 0;
  totalItems: number = 0;
  visibleItems: number = 3;//para que se muestren 3 items

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    // Verificar si estamos en el navegador antes de usar `document`
    if (isPlatformBrowser(this.platformId)) {
      const track = document.querySelector('.team-carousel') as HTMLElement;
      const totalMembers = document.querySelectorAll('.team-member').length;

      // Solo continuar si los elementos existen
      if (track && totalMembers > 0) {
        this.totalItems = totalMembers;

        const prevBtn = document.querySelector('.prev-btn') as HTMLElement;
        const nextBtn = document.querySelector('.next-btn') as HTMLElement;

        if (prevBtn && nextBtn) {
          prevBtn.addEventListener('click', () => {
            if (this.currentIndex > 0) {
              this.currentIndex--;
            } else {
              this.currentIndex = this.totalItems - this.visibleItems; // Volver al final
            }
            this.updateCarousel(track);
          });

          nextBtn.addEventListener('click', () => {
            if (this.currentIndex < this.totalItems - this.visibleItems) {
              this.currentIndex++;
            } else {
              this.currentIndex = 0; // Volver al inicio para scroll infinito
            }
            this.updateCarousel(track);
          });
        }
      }
    }
  }

  updateCarousel(track: HTMLElement): void {
    track.style.transform = `translateX(-${this.currentIndex * (100 / this.visibleItems)}%)`;
    //mover el track
  }
}
