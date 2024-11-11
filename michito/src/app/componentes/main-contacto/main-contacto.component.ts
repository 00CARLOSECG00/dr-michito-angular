import { Component } from '@angular/core';
import { MailService } from '../../Services/mail.service';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-main-contacto',
  standalone: true,
  imports: [FormsModule, ConfirmDialogModule],
  templateUrl: './main-contacto.component.html',
  styleUrls: ['./main-contacto.component.css'],
  providers: [ConfirmationService]
})
export class MainContactoComponent {
  form = {
    nombre: '',
    apellido: '',
    email: '',
    message: ''
  };

  constructor(
    private mailSender: MailService,
    private confirmationService: ConfirmationService
  ) {}

  sendForm() {
    const emailRequest = {
      nombre: this.form.nombre,
      apellido: this.form.apellido,
      email: this.form.email,
      body: this.form.message
    };

    console.log(emailRequest);

    this.mailSender.sendEmail(emailRequest).subscribe({
      next: (response) => {
        console.log('Correo enviado con éxito:', response);
        this.showConfirmationDialog('Correo enviado con éxito');
      },
      error: (error) => {
        console.error('Error al enviar el correo:', error);
        this.showConfirmationDialog('Hubo un error al enviar el correo');
      },
      complete: () => {
        console.log('Correo enviado con exito');
      }
    });
  }

  showConfirmationDialog(message: string) {
    this.confirmationService.confirm({
      message: message,
      header: 'Confirmación',
      icon: 'pi pi-check',
      acceptLabel: 'Aceptar',
      rejectVisible: false,
      acceptButtonStyleClass: 'custom-accept-button',
      accept: () => {
        // Se puede agregar lógica adicional aquí si es necesario
      }
    });
  }
}
