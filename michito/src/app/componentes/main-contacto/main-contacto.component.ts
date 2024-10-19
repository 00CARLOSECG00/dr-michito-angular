import { Component } from '@angular/core';
import { MailService } from '../../Services/mail.service';
import { FormsModule } from '@angular/forms';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';


@Component({
  selector: 'app-main-contacto',
  standalone: true,
  imports: [FormsModule, MatDialogModule],
  templateUrl: './main-contacto.component.html',
  styleUrl: './main-contacto.component.css'
})
export class MainContactoComponent {
  form = {
    nombre: '',
    apellido: '',
    email: '',
    message:  ''
  }
  
  constructor(private mailSender: MailService, public dialog: MatDialog) { }

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
        this.openDialog('Correo enviado con éxito');
      },
      error: (error) => {
        console.error('Error al enviar el correo:', error);
        this.openDialog('Hubo un error al enviar el correo');
      },
      complete: () => {
        console.log('Correo enviado con exito');
      }
    });
  }

  openDialog(message: string): void {
    // Abre el diálogo con el mensaje proporcionado
    this.dialog.open(DialogComponent, {
      width: '600px',
      data: { message: message }
    });
  }
}
