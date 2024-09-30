import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../Model/cliente'; 

@Injectable({
  providedIn: 'root'  // Esto asegura que el servicio sea global
})
export class ClienteService {
  private ROOT_URL = 'http://localhost:8080';  // URL de tu API

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.ROOT_URL}/Clientes/all`);
  }
}
