import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { EmailRequest } from '../Model/email-request';

@Injectable({
  providedIn: 'root'
})


export class MailService {

  private apiUrl = 'http://localhost:8080/send-email';

  constructor(private http: HttpClient) { }

  sendEmail(emailRequest: EmailRequest): Observable<EmailRequest> {
    return this.http.post<EmailRequest>(this.apiUrl, emailRequest).pipe(
      catchError(error => {
        console.error('Error al enviar el correo', error);
        throw error;
      })
    );
  }

    // Método para enviar correo con archivo adjunto usando FormData
    sendEmailWithAttachment(formData: FormData): Observable<any> {
      return this.http.post(this.apiUrl + '-with-attachment', formData).pipe(
        catchError(error => {
          console.error('Error al enviar el correo con adjunto', error);
          throw error;
        })
      );
    }

}
