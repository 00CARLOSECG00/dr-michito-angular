import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as AOS from 'aos';

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.css'
})
export class MainHeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // Asegura que AOS se actualice cuando el componente se monte
    setTimeout(() => {
      AOS.refresh();
    }, 150);
  }
}