import{Cliente} from'./cliente'
import{Tratamiento}from'./tratamiento'
export class Mascota {
    public id!:number;
    public nombre!:string;
    public peso!:number;
    public edad!:number;
    public foto!:string;
    public cedulaCliente?:string;
    public cliente?:Cliente;
    /*
    public cliente!:Cliente;
    public tratamientos!:Tratamiento[];
    */
}
