import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-main-servicios',
  standalone: true,
  imports: [],
  templateUrl: './main-servicios.component.html',
  styleUrl: './main-servicios.component.css'
})
export class MainServiciosComponent implements OnInit {
  
  ngOnInit() {
    // Asegura que AOS se actualice cuando el componente se monte
    setTimeout(() => {
      AOS.refresh();
    }, 150);
  }

  // Opcional: Actualizar AOS cuando los datos cambien
  ngAfterViewInit() {
    setTimeout(() => {
      AOS.refresh();
    }, 200);
  }
}