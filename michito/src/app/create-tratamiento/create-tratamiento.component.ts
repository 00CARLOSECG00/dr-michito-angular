import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TratamientoDTO } from '../Model/tratamiento-dto'; // DTO para tratamiento
import { MascotaDTO } from '../Model/mascota-dto'; // DTO para mascota
import { Medicamento } from '../Model/medicamento'; // Modelo de medicamento
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
import { Router } from '@angular/router';
import { TratamientoService } from '../Services/tratamiento.service';
import { MascotaService } from '../Services/mascota.service';
import { MedicamentoService } from '../Services/medicamento.service';
import { Tratamiento } from '../Model/tratamiento';
import { Mascota } from '../Model/mascota';
import { Veterinario } from '../Model/veterinario';
import { VeterinarioService } from '../Services/veterinario.service';

@Component({
  selector: 'app-create-tratamiento',
  standalone: true,
  imports: [FormsModule, CommonModule, BarraLateralComponent],
  templateUrl: './create-tratamiento.component.html',
  styleUrls: ['./create-tratamiento.component.css'],
})
export class CreateTratamientoComponent implements OnChanges {
  @Input() tratamiento!: TratamientoDTO | null;

  formTratamiento: TratamientoDTO = {
    id: 0,
    fecha: '',
    descripcion: '',
    mascotaId: 0,
    medicamentos: [],
    veterinarioId: 0
  };

  mascotasSugeridas: MascotaDTO[] = [];
  medicamentosSugeridos: Medicamento[] = [];
  veterinariosSugeridos: Veterinario[] = [];
  private searchMascotaTerms = new Subject<string>();
  private searchMedicamentoTerms = new Subject<string>();
  private searchVeterinarioTerms = new Subject<string>();
  modoEdicion: boolean = false;
  mostrarError: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private tratamientoService: TratamientoService,
    private mascotaService: MascotaService,
    private medicamentoService: MedicamentoService,
    private veterinarioService: VeterinarioService
  ) {}

  ngOnChanges() {
    if (this.tratamiento) {
      this.modoEdicion = true;
      this.formTratamiento = { ...this.tratamiento };
    } else {
      this.modoEdicion = false;
      this.limpiarFormulario();
    }
  }

  guardar(dto: TratamientoDTO): void {
    if (this.modoEdicion) {
      this.mascotaService.obtenerMascotasPorId(dto.mascotaId).subscribe((mascota) => {
        const tratamiento = this.convertirDeDTOaTratamiento(dto, mascota);
        this.tratamientoService.editarTratamiento(tratamiento).subscribe({
          next: (tratamientoEditado) => {
            console.log('Tratamiento actualizado con éxito:', tratamientoEditado);
            this.onVolver();
          },
          error: (error) => {
            console.error('Error al actualizar el tratamiento:', error);
            this.mostrarError = true;
          }
        });
      });
    } else {
      this.mascotaService.obtenerMascotasPorId(dto.mascotaId).subscribe((mascota) => {
        const tratamiento = this.convertirDeDTOaTratamiento(dto, mascota);
        this.tratamientoService.agregarTratamiento(tratamiento).subscribe({
          next: (tratamientoAgregado) => {
            console.log('Tratamiento agregado con éxito:', tratamientoAgregado);
            this.onVolver();
          },
          error: (error) => {
            console.error('Error al agregar el tratamiento:', error);
            this.mostrarError = true;
          }
        });
      });
    }
  }

  onSearchMascota(term: string): void {
    this.searchMascotaTerms.next(term);
  }

  seleccionarMascota(mascota: MascotaDTO) {
    this.formTratamiento.mascotaId = mascota.id;
    this.mascotasSugeridas = [];
  }

  onSearchMedicamento(term: string): void {
    this.searchMedicamentoTerms.next(term);
  }

  seleccionarMedicamento(medicamento: Medicamento) {
    if (!this.formTratamiento.medicamentos.some((m: Medicamento) => m.id === medicamento.id)) {
      this.formTratamiento.medicamentos.push(medicamento);
    }
    this.medicamentosSugeridos = [];
  }

  eliminarMedicamento(medicamento: Medicamento) {
    this.formTratamiento.medicamentos = this.formTratamiento.medicamentos.filter((m: Medicamento) => m.id !== medicamento.id);
  }

  onSearchVeterinario(term: string): void {
    this.searchVeterinarioTerms.next(term);
  }

  seleccionarVeterinario(veterinario: Veterinario) {
    this.formTratamiento.veterinarioId = veterinario.id;
    this.veterinariosSugeridos = [];
  }

  limpiarFormulario() {
    this.formTratamiento = {
      id: 0,
      fecha: '',
      descripcion: '',
      mascotaId: 0,
      medicamentos: [],
      veterinarioId: 0
    };
  }

  onVolver() {
    this.router.navigate(['/Tratamientos']);
  }

  ngOnInit() {
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

    this.searchVeterinarioTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.veterinarioService.buscarVeterinarios(term))
    ).subscribe((veterinarios) => {
      this.veterinariosSugeridos = veterinarios;
    });

    this.tratamientoService.getTratamientoSeleccionado().subscribe((tratamiento) => {
      if (tratamiento) {
        this.formTratamiento = this.convertirATratamientoDTO(tratamiento);
      }
    });
  }

  private convertirDeDTOaTratamiento(dto: TratamientoDTO, mascota: Mascota): Tratamiento {
    return {
      id: dto.id,
      fecha: new Date(dto.fecha),
      descripcion: dto.descripcion,
      mascota: mascota,  // Aquí asignas la entidad Mascota completa
      medicamentos: dto.medicamentos,
      veterinario: { id: dto.veterinarioId } as Veterinario // Asegurarse de que Veterinario está definido
    };
  }
  

  private convertirATratamientoDTO(tratamiento: Tratamiento): TratamientoDTO {
    return {
      id: tratamiento.id,
      fecha: tratamiento.fecha.toISOString().split('T')[0],
      descripcion: tratamiento.descripcion,
      mascotaId: tratamiento.mascota.id,
      medicamentos: tratamiento.medicamentos,
      veterinarioId: tratamiento.veterinario.id
    };
  }
}
