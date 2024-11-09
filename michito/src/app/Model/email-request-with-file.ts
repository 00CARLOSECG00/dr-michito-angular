export interface EmailRequestWithFile {
    asunto : string;
    nombreVeterinario: string;
    nombreMascota: string;
    emailCliente: string;
    fechaTratamiento: string;
    body: string;
    file: File;
}
