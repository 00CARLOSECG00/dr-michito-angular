import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ActivatedRoute } from '@angular/router';
import { TratamientoService } from '../Services/tratamiento.service';
import { Tratamiento } from '../Model/tratamiento';
import { Mascota } from '../Model/mascota';
import { Cliente } from '../Model/cliente';
import { Veterinario } from '../Model/veterinario';
import { BarraLateralComponent } from '../componentes/barra-lateral/barra-lateral.component';
import { Router } from '@angular/router';
import { ClienteService } from '../Services/cliente.service';
import { PdfService } from '../Services/pdf.service';
import { EmailRequestWithFile } from '../Model/email-request-with-file';
import { MailService } from '../Services/mail.service';

@Component({
  selector: 'app-detalle-tratamiento',
  standalone: true,
  imports: [BarraLateralComponent, CommonModule],
  templateUrl: './detalle-tratamiento.component.html',
  styleUrls: ['./detalle-tratamiento.component.css'],
})
export class DetalleTratamientoComponent implements OnInit {
  tratamiento!: Tratamiento;  // Variable que contiene el tratamiento
  mascota!: Mascota;  // Mascota asociada al tratamiento
  cliente!: Cliente;  // Cliente asociado a la mascota
  veterinario!: Veterinario;  // Veterinario que realizó el tratamiento
  totalMedicamentos: number = 0; // Total del costo de medicamentos

  constructor(
    private route: ActivatedRoute,  // Para acceder a los parámetros de la URL
    private tratamientoService: TratamientoService,  // Servicio para cargar el tratamiento
    private router: Router,  // Para navegar entre rutas
    private clienteService: ClienteService,  // Servicio para obtener información del cliente
    private pdfService: PdfService,
    private mailService: MailService
  ) {}

  async descargarPDF() {
    try {
      await this.pdfService.generarPDF(
        'historia-clinica-content', // Asegúrate de añadir este id al div principal del contenido
        `Historia_Clinica_${this.tratamiento?.id}.pdf`
      );
    } catch (error) {
      console.error('Error al descargar PDF:', error);
      // Aquí puedes añadir un mensaje de error   qpara el usuario
    }
  }

  async enviarCorreo() {
    try {
      const pdfBlob = await this.pdfService.generarPDFComoBlob('historia-clinica-content');
      if (!pdfBlob) {
        alert("Error al generar el PDF.");
        return;
      }

      const pdfFile = new File([pdfBlob], `Tratamiento_${this.tratamiento.id}.pdf`, { type: 'application/pdf' });

      // Crear el objeto EmailRequestWithFile
      const emailRequest: EmailRequestWithFile = {
        asunto: `Detalles del Tratamiento para ${this.mascota.nombre}`,
        nombreVeterinario: this.veterinario.nombre,
        nombreMascota: this.mascota.nombre,
        emailCliente: this.cliente.correo,
        fechaTratamiento: this.tratamiento.fecha.toString(),
        body: "Aquí está el reporte del tratamiento de tu mascota.",
        file: pdfFile
      };

      const formData = new FormData();
      formData.append("asunto", emailRequest.asunto);
      formData.append("nombreVeterinario", emailRequest.nombreVeterinario);
      formData.append("nombreMascota", emailRequest.nombreMascota);
      formData.append("emailCliente", emailRequest.emailCliente);
      formData.append("fechaTratamiento", emailRequest.fechaTratamiento);
      formData.append("body", emailRequest.body);
      formData.append("file", emailRequest.file);

      this.mailService.sendEmailWithAttachment(formData).subscribe({
        next: () => alert("Correo enviado exitosamente."),
        error: (error) => console.error("Error al enviar el correo:", error)
      });
    } catch (error) {
      console.error("Error al generar y enviar el PDF:", error);
    }
  }
  
  ngOnInit(): void {
    const tratamientoId = Number(this.route.snapshot.queryParams['id']); 
    if (tratamientoId) {
      this.cargarDetallesTratamiento(tratamientoId);  // Cargar detalles del tratamiento si el ID existe
    }
  }

  volver(): void {
    history.back(); // Navegar de vuelta a la lista de tratamientos
  }

  cargarDetallesTratamiento(id: number): void {
    this.tratamientoService.obtenerTratamientoPorId(id).subscribe({
      next: (tratamiento) => {
        this.tratamiento = tratamiento;
        this.mascota = tratamiento.mascota;
        this.veterinario = tratamiento.veterinario;
        this.calcularTotalMedicamentos(); // Llamada al método para calcular el total de medicamentos
        if (tratamiento.mascota && tratamiento.mascota.cedulaCliente) {
          this.obtenerDetallesClientePorCedula(tratamiento.mascota.cedulaCliente);
        } else if (tratamiento.mascota && tratamiento.mascota.id) {
          this.clienteService.obtenerClientePorMascota(tratamiento.mascota.id).subscribe({
            next: (cliente) => {
              this.cliente = cliente;
            },
            error: (error) => {
              this.cliente = new Cliente();
            }
          });
        } else {
          this.cliente = new Cliente();
        }
      },
      error: (error) => {
        console.error('Error al cargar el tratamiento:', error);
      }
    });
  }

  // Método para calcular el total de los precios de los medicamentos
  calcularTotalMedicamentos(): void {
    if (this.tratamiento && this.tratamiento.medicamentos) {
      this.totalMedicamentos = this.tratamiento.medicamentos.reduce((total, medicamento) => total + medicamento.precioVenta, 0);
    }
  }

  // Método para formatear los precios con separadores de miles
  formatearPrecio(precio: number): string {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(precio);
  }
  // Método para obtener los detalles del cliente
  obtenerDetallesClientePorCedula(cedula: string): void {
    //se suscribe al servicio 
    this.clienteService.getClienteByCedula(cedula).subscribe({
      next: (cliente) => {
        this.cliente = cliente;
      },
      error: (error) => {
        console.error('Error al cargar los detalles del cliente:', error);
      }
    });
  }
}
