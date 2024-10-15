import { forkJoin } from 'rxjs';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TratamientoDTO } from '../Model/tratamiento-dto';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
import { Router, ActivatedRoute } from '@angular/router'; 
import { TratamientoService } from '../Services/tratamiento.service';
import { MascotaService } from '../Services/mascota.service';
import { VeterinarioService } from '../Services/veterinario.service';
import { MedicamentoService } from '../Services/medicamento.service';
import { AuthService } from '../Services/auth.service'; 
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
  esVeterinario: boolean = false;
  esAdmin: boolean = false;

  @Input() tratamiento!: TratamientoDTO | null;

  formTratamiento: TratamientoDTO = {
    id: 0,
    fecha: '',
    descripcion: '',
    mascotaId: 0,
    veterinarioId: 0,
    medicamentos: [] 
  };

  mascotasSugeridas: any[] = [];
  veterinariosSugeridos: any[] = [];
  medicamentosSugeridos: Medicamento[] = [];
  private searchMascotaTerms = new Subject<string>();
  private searchVeterinarioTerms = new Subject<string>();
  private searchMedicamentoTerms = new Subject<string>();
  modoEdicion: boolean = false;
  mostrarError: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute, 
    private tratamientoService: TratamientoService,
    private mascotaService: MascotaService,
    private veterinarioService: VeterinarioService,
    private medicamentoService: MedicamentoService,
    private authService: AuthService 
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tratamiento'] && this.tratamiento) {
      this.formTratamiento = {
        id: this.tratamiento.id ?? 0, 
        fecha: this.tratamiento.fecha ?? '',
        descripcion: this.tratamiento.descripcion ?? '',
        mascotaId: this.tratamiento.mascotaId ?? 0,
        veterinarioId: this.tratamiento.veterinarioId ?? 0,
        medicamentos: this.tratamiento.medicamentos ?? []
      };
      this.modoEdicion = true;
    } else {
      this.limpiarFormulario();
    }
  }
  

  ngOnInit(): void {
    //llenamos los tratamientos suscribiendonos desde aqui a servicio
    this.route.queryParams.subscribe(params => {
      const idTratamiento = params['id'];
      if (idTratamiento) {
        this.tratamientoService.obtenerTratamientoPorId(idTratamiento).subscribe({
          next: (tratamiento) => {
            this.tratamiento = this.convertirATratamientoDTO(tratamiento); // Conversión a DTO
            this.formTratamiento = { ...this.tratamiento };

            // Asignar nombres visibles
            this.nombreMascota = tratamiento.mascota?.nombre ?? '';
            this.nombreVeterinario = tratamiento.veterinario?.nombre ?? '';

            console.log('Tratamiento cargado para editar:', this.formTratamiento);
          },
          error: (error) => {
            console.error('Error al cargar el tratamiento para editar:', error);
          }
        });
      }
    });

    // Verificar el tipo de usuario y asignar el veterinario si es necesario
    const userType = this.authService.getUserType();
    if (userType === 'veterinario') {
      this.esVeterinario = true;
      const veterinarioId = this.authService.getVeterinarioId();
      if (veterinarioId) {
        this.formTratamiento.veterinarioId = veterinarioId;
        this.veterinarioService.obtenerVeterionarioPorId(veterinarioId).subscribe({
          next: (veterinario) => {
            this.nombreVeterinario = veterinario.nombre;
            console.log('Veterinario asignado:', veterinario.nombre);
          },
          error: (error) => {
            console.error('Error al obtener el veterinario:', error);
          }
        });
      } else {
        console.error('Error: Veterinario ID no encontrado en el localStorage');
      }
    } else if (userType === 'admin') {
      this.esAdmin = true;
      this.searchVeterinarioTerms.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => this.veterinarioService.buscarVeterinarios(term))
      ).subscribe((veterinarios) => {
        this.veterinariosSugeridos = veterinarios;
      });
    }
    

    // Mantener las búsquedas de mascotas y medicamentos sin cambios
    this.inicializarBusquedas();
  }

  // Conversión de Tratamiento a TratamientoDTO
  convertirATratamientoDTO(tratamiento: Tratamiento): TratamientoDTO {
    return {
      id: tratamiento.id,
      fecha: tratamiento.fecha instanceof Date ? tratamiento.fecha.toISOString().substring(0, 10) : tratamiento.fecha,
      descripcion: tratamiento.descripcion,
      mascotaId: tratamiento.mascota?.id ?? 0,
      veterinarioId: tratamiento.veterinario?.id ?? 0,
      medicamentos: tratamiento.medicamentos
    };
  }

  inicializarBusquedas() {
    //autocompletar la mascota y el medicamento 
    this.searchMascotaTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.mascotaService.buscarMascotas(term))
    ).subscribe((mascotas) => {
      this.mascotasSugeridas = mascotas;
    });

    this.searchMedicamentoTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.medicamentoService.buscarMedicamentos(term))
    ).subscribe((medicamentos) => {
      this.medicamentosSugeridos = medicamentos;
    });
  }


  guardar() {
    // Validar si todos los campos están llenos
    if (!this.validarCampos()) {
      this.mostrarError = true;
      return; // Detener la ejecución si los campos no están completos
    }
  
    // Establecer la fecha actual en el formulario
    this.formTratamiento.fecha = new Date().toISOString().substring(0, 10); // Formato YYYY-MM-DD
  
    // Si todo está completo, proceder con la lógica de guardar
    this.mascotaService.obtenerMascotasPorId(this.formTratamiento.mascotaId).subscribe((mascota) => {
      this.veterinarioService.obtenerVeterionarioPorId(this.formTratamiento.veterinarioId).subscribe((veterinario) => {
        const tratamiento = this.convertirDeDTOaTratamiento(this.formTratamiento, mascota, veterinario);
  
        // Aquí actualizamos los medicamentos y esperamos a que todas las actualizaciones terminen
        const actualizacionesMedicamentos = this.formTratamiento.medicamentos.map((medicamento) => {
          medicamento.unidadesVendidas += 1;
          medicamento.unidadesDisponibles -= 1;
          return this.medicamentoService.editarMedicamento(medicamento);
        });
  
        forkJoin(actualizacionesMedicamentos).subscribe({
          next: (resultadosActualizaciones) => {
            console.log('Medicamentos actualizados:', resultadosActualizaciones);
  
            // Después de actualizar los medicamentos, guardamos el tratamiento
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
          },
          error: (error) => {
            console.error('Error al actualizar los medicamentos:', error);
            this.mostrarError = true;
          }
        });
      });
    });
  }
  


  onSearchMascota(term: string): void {
    this.searchMascotaTerms.next(term);
  }

  seleccionarMascota(mascota: any) {
    this.formTratamiento.mascotaId = mascota.id;
    this.nombreMascota = mascota.nombre;
    this.mascotasSugeridas = [];
  }

  onSearchVeterinario(term: string): void {
    this.searchVeterinarioTerms.next(term);
  }

  seleccionarVeterinario(veterinario: any) {
    this.formTratamiento.veterinarioId = veterinario.id;
    this.nombreVeterinario = veterinario.nombre;
    this.veterinariosSugeridos = [];
  }

  onSearchMedicamento(term: string): void {
    this.searchMedicamentoTerms.next(term);
  }

  seleccionarMedicamento(medicamento: Medicamento) {
    // Verificar si el medicamento tiene unidades disponibles
    if (medicamento.unidadesDisponibles > 0) {
      // Verificar si el medicamento ya está en la lista
      if (!this.formTratamiento.medicamentos.some((m) => m.id === medicamento.id)) {
        this.formTratamiento.medicamentos.push(medicamento);
      }
      this.medicamentosSugeridos = [];
    } else {
      // Mostrar un mensaje de error si no hay unidades disponibles
      alert(`El medicamento ${medicamento.nombre} no tiene unidades disponibles y no se puede seleccionar.`);
    }
  }

  validarCampos(): boolean {
    // Validar que los campos importantes no estén vacíos
    if (
        !this.formTratamiento.descripcion || 
        this.formTratamiento.mascotaId === 0 || 
        this.formTratamiento.veterinarioId === 0 || 
        this.formTratamiento.medicamentos.length === 0) {
      return false;
    }
    return true;
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
      medicamentos: []
    };
  }

  onVolver() {
    this.router.navigate(['/tratamientos']);
  }

  private convertirDeDTOaTratamiento(dto: TratamientoDTO, mascota: Mascota, veterinario: Veterinario): Tratamiento {
    return {
      id: dto.id ?? 0, 
      fecha: new Date(dto.fecha),
      descripcion: dto.descripcion,
      mascota: mascota,
      veterinario: veterinario,
      medicamentos: dto.medicamentos 
    };
  }
}
