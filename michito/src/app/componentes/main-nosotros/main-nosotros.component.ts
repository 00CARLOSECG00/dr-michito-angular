import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-main-nosotros',
  standalone: true,
  templateUrl: './main-nosotros.component.html',
  styleUrls: ['./main-nosotros.component.css']
})
export class MainNosotrosComponent implements AfterViewInit {

  currentIndex: number = 0;
  totalItems: number = 0;
  visibleItems: number = 3;

  ngAfterViewInit(): void {
    const track = document.querySelector('.team-carousel') as HTMLElement;
    const totalMembers = document.querySelectorAll('.team-member').length;
    this.totalItems = totalMembers;

    const prevBtn = document.querySelector('.prev-btn') as HTMLElement;
    const nextBtn = document.querySelector('.next-btn') as HTMLElement;

    prevBtn.addEventListener('click', () => {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.totalItems - this.visibleItems; // Loop to the end
      }
      this.updateCarousel(track);
    });

    nextBtn.addEventListener('click', () => {
      if (this.currentIndex < this.totalItems - this.visibleItems) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0; // Loop back to start for infinite scroll
      }
      this.updateCarousel(track);
    });
  }

  updateCarousel(track: HTMLElement): void {
    track.style.transform = `translateX(-${this.currentIndex * (100 / this.visibleItems)}%)`;
  }
}
