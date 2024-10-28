export class VeterinarioDTO {
    id!: number;
    cedula!: string;
    nombre!: string;
    correo!: string;
    celular!: number;
    especialidad!: string;
    estado!: boolean;
  
    // Datos de Login directamente en VeterinarioDTO
    usuario!: string;
    passwords!: string;
    tipo!: string;
  
    constructor(
      id: number,
      cedula: string,
      nombre: string,
      correo: string,
      celular: number,
      especialidad: string,
      estado: boolean,
      usuario: string,
      passwords: string,
      tipo: string
    ) {
      this.id = id;
      this.cedula = cedula;
      this.nombre = nombre;
      this.correo = correo;
      this.celular = celular;
      this.especialidad = especialidad;
      this.estado = estado;
      this.usuario = usuario;
      this.passwords = passwords;
      this.tipo = tipo;
    }
  }
  