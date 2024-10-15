import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TratamientoDTO } from '../Model/tratamiento-dto'; // DTO para tratamiento
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
import { Router, ActivatedRoute } from '@angular/router'; // Añadimos ActivatedRoute para obtener params de la URL
import { TratamientoService } from '../Services/tratamiento.service';
import { MascotaService } from '../Services/mascota.service';
import { VeterinarioService } from '../Services/veterinario.service';
import { MedicamentoService } from '../Services/medicamento.service';
import { Mascota } from '../Model/mascota';
import { Veterinario } from '../Model/veterinario';
import { Tratamiento } from '../Model/tratamiento';
import { Medicamento } from '../Model/medicamento';

@Component({
  selector: 'app-create-tratamiento',
  standalone: true,
  imports: [FormsModule, CommonModule, BarraLateralComponent],
  templateUrl: './create-tratamiento.component.html',
  styleUrls: ['./create-tratamiento.component.css'],
})
export class CreateTratamientoComponent implements OnChanges {
  nombreMascota: string = '';
  nombreVeterinario: string = '';
  nombreMedicamento: string = '';

  @Input() tratamiento!: TratamientoDTO | null; // Usar DTO para manejar el objeto

  formTratamiento: TratamientoDTO = {
    id: 0,
    fecha: '',
    descripcion: '',
    mascotaId: 0,
    veterinarioId: 0,
    medicamentos: []  // Asegúrate de incluir este campo
  };

  mascotasSugeridas: any[] = [];
  veterinariosSugeridos: any[] = [];
  medicamentosSugeridos: Medicamento[] = [];
  private searchMascotaTerms = new Subject<string>();  // Sujeto para escuchar el input de mascota
  private searchVeterinarioTerms = new Subject<string>();  // Sujeto para escuchar el input de veterinario
  private searchMedicamentoTerms = new Subject<string>();  // Sujeto para escuchar el input de medicamento
  modoEdicion: boolean = false;
  mostrarError: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute, // Activamos el uso de ActivatedRoute
    private tratamientoService: TratamientoService,
    private mascotaService: MascotaService,
    private veterinarioService: VeterinarioService,
    private medicamentoService: MedicamentoService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tratamiento'] && this.tratamiento) {
      this.formTratamiento = { ...this.tratamiento };
      this.modoEdicion = true;
    } else {
      this.limpiarFormulario();
    }
  }

  // Aquí va la implementación del ngOnInit con las mejoras que mencioné antes
  ngOnInit(): void {
    // Comprobar si estamos en modo edición
    this.route.queryParams.subscribe(params => {
      const tratamientoId = params['id'];
      if (tratamientoId) {
        this.modoEdicion = true;
        console.log('Tratamiento ID encontrado:', tratamientoId);  // Para verificar si el ID se recibe correctamente
  
        // Obtener el tratamiento por ID
        this.tratamientoService.obtenerTratamientoPorId(tratamientoId).subscribe({
          next: (tratamiento: Tratamiento) => {
            console.log('Datos del tratamiento recibido:', tratamiento);  // Verificar los datos recibidos
            
            // Convertir la fecha si no es ya un objeto Date
            const fechaTratamiento = typeof tratamiento.fecha === 'string' 
              ? new Date(tratamiento.fecha) 
              : tratamiento.fecha;
  
            // Convertir el modelo Tratamiento a DTO para llenar el formulario
            this.formTratamiento = {
              id: tratamiento.id,
              fecha: fechaTratamiento.toISOString().substring(0, 10),  // Convertimos la fecha para el input
              descripcion: tratamiento.descripcion,
              mascotaId: tratamiento.mascota.id,
              veterinarioId: tratamiento.veterinario.id,
              medicamentos: tratamiento.medicamentos  // Lista de medicamentos
            };
  
            // Asignar nombres de la mascota y el veterinario para mostrarlos en los campos de búsqueda
            this.nombreMascota = tratamiento.mascota.nombre;
            this.nombreVeterinario = tratamiento.veterinario.nombre;
          },
          error: (error) => {
            console.error('Error al cargar el tratamiento:', error);  // Muestra el error si no se pudo cargar el tratamiento
          }
        });
      } else {
        // Si no hay ID, estamos en modo de creación, limpiamos el formulario
        this.limpiarFormulario();
      }
    });
  
    // Escucha los términos de búsqueda para mascotas
    this.searchMascotaTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.mascotaService.buscarMascotas(term))
    ).subscribe((mascotas) => {
      this.mascotasSugeridas = mascotas;
    });
  
    // Escucha los términos de búsqueda para veterinarios
    this.searchVeterinarioTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.veterinarioService.buscarVeterinarios(term))
    ).subscribe((veterinarios) => {
      this.veterinariosSugeridos = veterinarios;
    });
  
    // Escucha los términos de búsqueda para medicamentos
    this.searchMedicamentoTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.medicamentoService.buscarMedicamentos(term))
    ).subscribe((medicamentos) => {
      this.medicamentosSugeridos = medicamentos;
    });
  }
  

  guardar() {
    // Obtener los objetos completos de Mascota y Veterinario usando sus IDs
    this.mascotaService.obtenerMascotasPorId(this.formTratamiento.mascotaId).subscribe((mascota) => {
      this.veterinarioService.obtenerVeterionarioPorId(this.formTratamiento.veterinarioId).subscribe((veterinario) => {
        
        // Convertir de DTO a Modelo completo
        const tratamiento = this.convertirDeDTOaTratamiento(this.formTratamiento, mascota, veterinario);
  
        // Si estamos creando un nuevo tratamiento
        if (!this.modoEdicion) {
          this.tratamientoService.agregarTratamiento(tratamiento).subscribe({
            next: (tratamientoAgregado) => {
              console.log('Tratamiento agregado:', tratamientoAgregado);
              this.onVolver();
            },
            error: (error) => {
              console.error('Error al agregar el tratamiento:', error);
              this.mostrarError = true;
            }
          });
        } else {
          // Si estamos editando un tratamiento existente
          this.tratamientoService.editarTratamiento(tratamiento).subscribe({
            next: (tratamientoEditado) => {
              console.log('Tratamiento editado con éxito:', tratamientoEditado);
              this.onVolver();
            },
            error: (error) => {
              console.error('Error al editar el tratamiento:', error);
              this.mostrarError = true;
            }
          });
        }
      });
    });
  }

  // Búsqueda de mascotas
  onSearchMascota(term: string): void {
    this.searchMascotaTerms.next(term);
  }

  seleccionarMascota(mascota: any) {
    this.formTratamiento.mascotaId = mascota.id;
    this.nombreMascota = mascota.nombre;  // Actualizar el campo visible con el nombre de la mascota
    this.mascotasSugeridas = [];  // Limpiar la lista de sugerencias
  }

  // Búsqueda de veterinarios
  onSearchVeterinario(term: string): void {
    this.searchVeterinarioTerms.next(term);
  }

  seleccionarVeterinario(veterinario: any) {
    this.formTratamiento.veterinarioId = veterinario.id;
    this.nombreVeterinario = veterinario.nombre;  // Actualizar el campo visible con el nombre del veterinario
    this.veterinariosSugeridos = [];  // Limpiar la lista de sugerencias
  }

  // Búsqueda de medicamentos
  onSearchMedicamento(term: string): void {
    this.searchMedicamentoTerms.next(term);
  }

  seleccionarMedicamento(medicamento: Medicamento) {
    if (!this.formTratamiento.medicamentos.some((m) => m.id === medicamento.id)) {
      this.formTratamiento.medicamentos.push(medicamento);
    }
    this.medicamentosSugeridos = [];
  }

  eliminarMedicamento(medicamento: Medicamento) {
    this.formTratamiento.medicamentos = this.formTratamiento.medicamentos.filter((m) => m.id !== medicamento.id);
  }

  limpiarFormulario() {
    this.formTratamiento = {
      id: 0,
      fecha: '',
      descripcion: '',
      mascotaId: 0,
      veterinarioId: 0,
      medicamentos: []  // Agregar lista vacía de medicamentos
    };
  }

  onVolver() {
    this.router.navigate(['/tratamientos']);
  }

  private convertirDeDTOaTratamiento(dto: TratamientoDTO, mascota: Mascota, veterinario: Veterinario): Tratamiento {
    return {
      id: dto.id,
      fecha: new Date(dto.fecha),
      descripcion: dto.descripcion,
      mascota: mascota,  // Objeto completo de Mascota
      veterinario: veterinario,  // Objeto completo de Veterinario
      medicamentos: dto.medicamentos  // Lista de medicamentos
    };
  }
}
