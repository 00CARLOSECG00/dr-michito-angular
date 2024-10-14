import { Mascota } from "./mascota";
import { Veterinario } from "./veterinario";

export class Tratamiento {
    public id!:number;
    public fecha!:Date;
    public descripcion!:string;
    mascota?:Mascota;
    veterinario?:Veterinario;
    
}
