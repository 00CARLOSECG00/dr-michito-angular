import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080/login/portalInterno';

  constructor(private http: HttpClient) { }

  comprobarUsuario(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${username}`);
  }
}
