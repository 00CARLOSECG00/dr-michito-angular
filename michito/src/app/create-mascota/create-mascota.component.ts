import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { MascotaDTO } from '../Model/mascota-dto'; // Usar el DTO
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
import { Router } from '@angular/router';
import { MascotaService } from '../Services/mascota.service';
import { ClienteService } from '../Services/cliente.service';

@Component({
  selector: 'app-create-mascota',
  standalone: true,
  imports: [FormsModule, CommonModule, BarraLateralComponent,MatSlideToggleModule],
  templateUrl: './create-mascota.component.html',
  styleUrls: ['./create-mascota.component.css'],
})
export class CreateMascotaComponent {
  @Input() mascota!: MascotaDTO | null; // Usar DTO para manejar el objeto

  formMascota: MascotaDTO = {
    id: 0,
    nombre: '',
    peso: 0,
    edad: 0,
    foto: '',
    cedulaCliente: '',
    estado: false,
  };

  cedulaCliente: string = '';
  clientesSugeridos: any[] = [];
  private searchTerms = new Subject<string>(); // Sujeto para escuchar el input
  modoEdicion: boolean = false;
  mostrarError: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private mascotaService: MascotaService,
    private clienteService: ClienteService
  ) {}

  onChangeEstado(event: any) {
    this.formMascota.estado = event.target.checked;
  }
  
  
  // Método para crear o editar una mascota
  guardar() {
    if (!this.modoEdicion) {
      // Crear nueva mascota
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
      // Editar mascota existente
      if (this.formMascota.cedulaCliente) {
        this.mascotaService.editarMascota(this.formMascota).subscribe({
          next: (mascotaEditada) => {
            console.log('Mascota editada con éxito:', this.formMascota);
            this.onVolver();
          },
          error: (error) => {
            console.error('Error al editar la mascota:', error);
            this.mostrarError = true;
          },
        });
      } else {
        console.error('Error: la cédula del cliente está vacía.');
        this.mostrarError = true;
      }
    }
  }

  onSearch(term: string): void {
    console.log('Buscando...'),
      console.log('Term:', term);
    this.searchTerms.next(term); // Envía los términos de búsqueda
  }

  seleccionarCliente(cliente: any) {
    this.formMascota.cedulaCliente = cliente.cedula; // Actualiza el campo de cédula con la selección
    this.clientesSugeridos = []; // Limpia las sugerencias después de la selección
  }

  limpiarFormulario() {
    this.formMascota = {
      id: 0,
      nombre: '',
      peso: 0,
      edad: 0,
      foto: '',
      cedulaCliente: '',
      estado: true,
    };
  }

  onVolver() {
    console.log('Volver');
    this.router.navigate(['/Mascotas']);
  }

  ngOnInit() {
    this.searchTerms
      .pipe(
        debounceTime(300), // que busque cada cierto tiempo
        distinctUntilChanged(), // Ignora si el valor es el mismo que el anterior
        switchMap((term: string) => this.clienteService.buscarClientes(term)) // Cambia a una nueva búsqueda
      )
      .subscribe((clientes) => {
        this.clientesSugeridos = clientes;
      });

      this.mascotaService.getMascotaSeleccionada().subscribe((mascotaDTO) => {
        if (mascotaDTO) {
          // Aquí llenamos el formulario con los datos recibidos
          this.formMascota = mascotaDTO;
          console.log('Mascota recibida con estado:', this.formMascota.estado); // Verificar que el estado esté llegando correctamente
      
          // Activar el modo edición si llega una mascota
          this.modoEdicion = true;
        } else {
          this.modoEdicion = false;
        }
      });
      
      
  }
}
