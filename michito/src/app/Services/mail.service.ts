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

}
