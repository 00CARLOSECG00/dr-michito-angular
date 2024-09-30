
import{Mascota} from'./mascota'
export class Cliente {
    public id!:number;
    public cedula!:string;
    public nombre!:string;
    public correo!:string;
    public celular!:number;
    public mascotas?:Mascota[];



}
