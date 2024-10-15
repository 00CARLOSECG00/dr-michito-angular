import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
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

  private clienteSeleccionado = new BehaviorSubject<Cliente | null>(null); // Permitir null en el BehaviorSubject

  obtenerClienteSeleccionado(): Observable<Cliente | null> {
    return this.clienteSeleccionado.asObservable();
  }

  setClienteSeleccionado(cliente: Cliente | null): void { // Ajustar el parámetro para permitir null
    this.clienteSeleccionado.next(cliente);
  }

  setCliente(cliente: Cliente): void {
    console.log('Cambia el cliente:', cliente);
    this.clienteSubject.next(cliente);
  }

  getCliente(): Cliente | null {
    return this.clienteSubject.getValue();
  }

  buscarClientes(term: string): Observable<Cliente[]> {
    if (term.length < 3) {
      return of([]);  // Retorna un observable vacío si el término es muy corto
    }
    return this.http.get<Cliente[]>(`${this.ROOT_URL}/buscar?cedula=${term}`).pipe(
      catchError(error => {
        console.error('Error al buscar clientes:', error);
        return of([]);  // Retorna un observable vacío en caso de error
      })
    );
  }
  getAllClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.ROOT_URL}/all`).pipe(
      catchError(error => {
        console.error('Error al obtener los clientes:', error);
        throw error;
      })
    );
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.ROOT_URL}/info/${id}`).pipe(
      catchError(error => {
        console.error('Error al obtener el cliente:', error);
        throw error;
      })
    );
  }

  obtenerClientePorMascota(idMascota: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.ROOT_URL}/por-mascota/${idMascota}`);
  }

  deleteCliente(id: number): Observable<any> {
    return this.http.delete(`${this.ROOT_URL}/delete/${id}`).pipe(
      catchError(error => {
        console.error('Error al eliminar el cliente:', error);
        throw error;
      })
    );
  }

  getClienteByCedula(cedula: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.ROOT_URL}/?cedula=${cedula}`).pipe(
      catchError(error => {
        console.error('Error al obtener el cliente por cédula:', error);
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
    return this.http.put<Cliente>(`${this.ROOT_URL}/update/${cliente.id}`, cliente).pipe(
      catchError(error => {
        console.error('Error al actualizar el cliente:', error);
        throw error;
      })
    );
  }
}
