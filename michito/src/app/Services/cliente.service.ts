import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cliente } from '../Model/cliente';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private ROOT_URL = 'http://localhost:8080/Clientes';
  private clienteSubject = new BehaviorSubject<Cliente|null>(null);
  cliente$ = this.clienteSubject.asObservable();

  constructor(private http: HttpClient) {}

  setCliente(cliente: Cliente): void {
    console.log('Cambia el cliente:', cliente);
    this.clienteSubject.next(cliente);
  }

  getCliente(): Cliente | null {
    return this.clienteSubject.getValue();
  }

  getAllClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.ROOT_URL}/all`).pipe(
      catchError(error => {
        console.error('Error al obtener los clientes:', error);
        throw error;
      })
    );
  }

  deleteCliente(id: number): Observable<any> {
    return this.http.delete(`${this.ROOT_URL}/delete/${id}`).pipe(
      catchError(error => {
        console.error('Error al eliminar el cliente:', error);
        throw error;
      })
    );
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.ROOT_URL}/agregar`, cliente).pipe(
      catchError(error => {
        console.error('Error al crear el cliente:', error);
        throw error;
      })
    );
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.ROOT_URL}/editar/${cliente.id}`, cliente).pipe(
      catchError(error => {
        console.error('Error al actualizar el cliente:', error);
        throw error;
      })
    );
  }
}
