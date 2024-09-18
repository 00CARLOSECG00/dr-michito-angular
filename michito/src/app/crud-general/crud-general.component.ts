import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
@Component({
  selector: 'app-crud-general',
  standalone: true,
  imports: [BarraLateralComponent],
  templateUrl: './crud-general.component.html',
  styleUrls: ['./crud-general.component.css']
})
export class CrudGeneralComponent {
  tipoUsuario: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.tipoUsuario = params['usuario'];  // Recibe el tipo de usuario
    });
  }

}
