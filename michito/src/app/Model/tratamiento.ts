import { Mascota } from "./mascota";
import { Medicamento } from "./medicamento";
import { Veterinario } from "./veterinario";

export interface Tratamiento {
  id: number;
  fecha: Date;
  descripcion: string;
  mascota: Mascota;  // Relación con Mascota
  medicamentos: Medicamento[];  // Relación con Medicamentos
  veterinario: Veterinario;  // Relación con Veterinario
}
