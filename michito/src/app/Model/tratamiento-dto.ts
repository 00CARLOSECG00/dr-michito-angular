import { Medicamento } from "./medicamento";

export interface TratamientoDTO {
  id: number;
  fecha: string;  // La fecha en formato string
  descripcion: string;
  mascotaId: number;  // Relación con la mascota por ID
  medicamentos: Medicamento[];  // Relación con medicamentos
  veterinarioId: number;  // Relación con el veterinario por ID
}
