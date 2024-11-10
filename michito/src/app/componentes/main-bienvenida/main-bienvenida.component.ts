import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as AOS from 'aos';

@Component({
  selector: 'app-main-bienvenida',
  standalone: true,
  imports: [],
  templateUrl: './main-bienvenida.component.html',
  styleUrl: './main-bienvenida.component.css'
})
export class MainBienvenidaComponent implements OnInit, AfterViewInit {
  private videoSources = [
    'videos/video1.mp4',
    'videos/video2.mp4',
    'videos/video3.mp4'
  ];
  private currentVideoIndex = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
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

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const videoPlayer = document.getElementById('videoPlayer') as HTMLVideoElement;
      
      if (videoPlayer) {
        // Configurar el primer video
        videoPlayer.src = this.videoSources[this.currentVideoIndex];
        
        // Manejar el final de cada video
        videoPlayer.addEventListener('ended', () => {
          // Actualizar al siguiente índice de video
          this.currentVideoIndex = (this.currentVideoIndex + 1) % this.videoSources.length;
          
          // Cambiar la fuente del video al siguiente
          videoPlayer.src = this.videoSources[this.currentVideoIndex];
          
          // Reproducir el siguiente video
          videoPlayer.play().catch(error => {
            console.error('Error playing video:', error);
          });
        });
      }
    }
  }
}