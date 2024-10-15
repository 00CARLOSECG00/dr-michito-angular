import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../Model/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080/login/portalInterno';

  constructor(private http: HttpClient) { }

  comprobarUsuario(username: string): Observable<Login> {
    return this.http.get<Login>(`${this.baseUrl}/${username}`);
  }
  
}
