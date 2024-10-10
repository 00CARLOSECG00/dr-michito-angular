import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Mascota } from '../Model/mascota';
import { HttpClient } from '@angular/common/http';
import { Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { MascotaDTO } from '../Model/mascota-dto'; // Importa CreateMascotaComponent
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
import { Router } from '@angular/router';
import { MascotaService } from '../Services/mascota.service';
import { ClienteService } from '../Services/cliente.service';

@Component({
  selector: 'app-create-mascota',
  standalone: true,
  imports: [FormsModule, CommonModule, BarraLateralComponent],
  templateUrl: './create-mascota.component.html',
  styleUrls: ['./create-mascota.component.css'],
})
export class CreateMascotaComponent implements OnChanges {
  @Input() mascota!: Mascota | null;


  formMascota: MascotaDTO = {
    id: 0, 
    nombre: '',
    peso: 0,
    edad: 0,
    foto: '',
    cedulaCliente: ''
  };

  cedulaCliente: string = '';
  clientesSugeridos: any[] = [];
  private searchTerms = new Subject<string>();  // Sujeto para escuchar el input
  modoEdicion: boolean = false;
  private ROOT_URL = 'http://localhost:8080/Mascotas';
  private CLIENTE_URL = 'http://localhost:8080/Clientes';
  mostrarError: boolean = false;

  constructor(private http: HttpClient, private router: Router, private mascotaService: MascotaService, private clienteService: ClienteService) {}


  ngOnChanges() {
    if (this.mascota) {
      this.formMascota = { ...this.mascota , cedulaCliente: this.cedulaCliente };
    } else {
      this.limpiarFormulario();
    }
  }

  // Comienza la búsqueda usando switchMap
  ngOnInit() {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.clienteService.buscarClientes(term))
    ).subscribe((clientes) => {
      this.clientesSugeridos = clientes;
    });
  }

  // Empuja la búsqueda hacia el observable
  

  // Escucha cuando el usuario escribe en el input
  onSearch(term: string): void {
    console.log('Buscando...'),
    console.log('Term:', term);
    this.searchTerms.next(term);  // Envía los términos de búsqueda
  }

  // Método para seleccionar un cliente del dropdown
  seleccionarCliente(cliente: any) {
    this.formMascota.cedulaCliente = cliente.cedula; // Actualiza el campo de cédula con la selección
    this.clientesSugeridos = []; // Limpia las sugerencias después de la selección
  }

  guardar() {
    if (!this.modoEdicion) {
      this.mascotaService.agregarMascota(this.formMascota).subscribe({
        next: (mascotaAgregada) => {
          console.log('Mascota agregada:', mascotaAgregada);
          this.onVolver();
        },
        error: (error) => {
          console.error('Error al agregar la mascota:', error);
          this.mostrarError = true;
        },
      });
    } else {
      // this.mascotaService.editarMascota(this.formMascota).subscribe({
      //   next: (mascotaEditada) => {
      //     console.log('Mascota editada:', mascotaEditada);
      //     this.onVolver();
      //   },
      //   error: (error) => {
      //     console.error('Error al editar la mascota:', error);
      //     this.mostrarError = true;
      //   },
      // });
    }
  }

  limpiarFormulario() {
    this.formMascota = {
      id: 0, 
      nombre: '',
      peso: 0,
      edad: 0,
      foto: '',
      cedulaCliente: ''
    };
  }

  onVolver() {
    console.log('Volver');
    this.router.navigate(['/Mascotas']);
  }
}


