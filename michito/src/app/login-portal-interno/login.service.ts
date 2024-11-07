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

  comprobarUsuario(token: string): Observable<String> {
    return this.http.get<String>(`${this.baseUrl}`);
  }
  
} 
