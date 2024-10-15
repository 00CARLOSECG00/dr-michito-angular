import { Login } from "./login";

export class Veterinario {
    public id!:number;
    public cedula!:string;
    public nombre!:string;
    public correo!:string;
    public celular!:number;
    public especialidad!:string;
    public login?:Login;
}
