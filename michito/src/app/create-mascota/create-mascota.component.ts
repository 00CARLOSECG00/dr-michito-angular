import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Mascota } from '../Model/mascota';
import { HttpClient } from '@angular/common/http';
import { Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { MascotaDTO } from '../Model/mascota-dto';

@Component({
  selector: 'app-create-mascota',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-mascota.component.html',
  styleUrls: ['./create-mascota.component.css'],
})
export class CreateMascotaComponent implements OnChanges {
  @Input() mascota!: Mascota | null;
  @Input() modoEdicion: boolean = false;
  @Output() volver: EventEmitter<void> = new EventEmitter<void>();

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

  private ROOT_URL = 'http://localhost:8080/Mascotas';
  private CLIENTE_URL = 'http://localhost:8080/Clientes';
  mostrarError: boolean = false;

  constructor(private http: HttpClient) {}

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
      debounceTime(300),  // Espera 300 ms después de cada pulsación
      distinctUntilChanged(),  // Solo pasa si la búsqueda ha cambiado
      switchMap((term: string) => 
        term.length > 2 ? this.buscarClientes(term) : of([])  // Si hay menos de 3 caracteres, no busca
      ),
      catchError(error => {
        console.error('Error al buscar clientes:', error);
        return of([]);  // Devuelve un observable vacío en caso de error
      })
    ).subscribe((clientes) => {
      this.clientesSugeridos = clientes;  // Actualiza la lista de sugerencias
    });
  }

  // Empuja la búsqueda hacia el observable
  buscarClientes(term: string) {
    return this.http.get<any[]>(`${this.CLIENTE_URL}/buscar?cedula=${term}`);
  }

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
    const cedulaCliente = this.cedulaCliente;
    if (!this.modoEdicion) {
      const body = {
        ...this.formMascota,
      };
      console.log('Datos enviados (creación):', body);

      this.http.post<MascotaDTO>(`${this.ROOT_URL}/agregar`, body).subscribe({
        next: (mascotaAgregada) => {
          console.log('Mascota agregada:', mascotaAgregada);
          this.volver.emit();
        },
        error: (error) => {
          console.error('Error al agregar la mascota:', error);
          this.mostrarError = true;
        },
      });
    } else {
      const body = {
        ...this.formMascota,
      };
      console.log('Datos enviados (edición):', body);
      this.http.put<MascotaDTO>(`${this.ROOT_URL}/editar/${this.formMascota.id}`, body).subscribe({
        next: (mascotaEditada) => {
          console.log('Mascota editada:', mascotaEditada);
          this.volver.emit();
        },
        error: (error) => {
          console.error('Error al editar la mascota:', error);
          this.mostrarError = true;
        },
      });
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
    this.volver.emit();
  }
}
