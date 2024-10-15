import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Veterinario } from '../Model/veterinario';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {

  private ROOT_URL = 'http://localhost:8080/Veterinarios';  // URL del backend
  private veterinarioSubject = new BehaviorSubject<Veterinario|null>(null);

  constructor(private http: HttpClient) {}

  private veterinarioSeleccionadoSubject = new BehaviorSubject<Veterinario | null>(null);

  setVeterinarioSeleccionado(veterinario: Veterinario | null) {
    this.veterinarioSeleccionadoSubject.next(veterinario); 
  }

  getVeterinarioSeleccionado(): Observable<Veterinario | null> {
    return this.veterinarioSeleccionadoSubject.asObservable();
  }
 
  // Obtener todas los veterinarios
  obtenerVeterinarios(): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(`${this.ROOT_URL}/all`).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error al obtener los veterinarios:', error);
        throw error;
      })
    );
  }
  
  

  setVeterinario(veterinario: Veterinario): void {
    console.log('Cambia el veterinario:', veterinario);
    this.veterinarioSubject.next(veterinario);
  }

  getVeterinario(): Veterinario | null {
    return this.veterinarioSubject.getValue();
  }
  buscarVeterinario(term: string): Observable<Veterinario[]> {
    if (term.length < 3) {
      return of([]);  // Retorna un observable vacío si el término es muy corto
    }
    return this.http.get<Veterinario[]>(`${this.ROOT_URL}/buscar?cedula=${term}`).pipe(
      catchError(error => {
        console.error('Error al buscar veterinarios:', error);
        return of([]);  // Retorna un observable vacío en caso de error
      })
    );
  }
 
   // mascota.service.ts
   obtenerVeterionarioPorId(id: number): Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.ROOT_URL}/info/${id}`).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error al obtener la mascota por ID:', error);
        throw error;
      })
    );
  }

  // Método para buscar veterinarios por nombre o cédula, u otro término de búsqueda
  buscarVeterinarios(term: string): Observable<Veterinario[]> {
    if (term.length < 3) {
      return of([]);  // Retorna un observable vacío si el término es muy corto
    }
    return this.http.get<Veterinario[]>(`${this.ROOT_URL}/buscar?nombre=${term}`).pipe(
      catchError(error => {
        console.error('Error al buscar veterinarios:', error);
        return of([]);  // Retorna un observable vacío en caso de error
      })
    );
  }


  deleteVeterinario(id: number): Observable<any> {
    return this.http.delete(`${this.ROOT_URL}/delete/${id}`).pipe(
      catchError(error => {
        console.error('Error al eliminar el veterinario:', error);
        throw error;
      })
    );
  }

  createVeterinario(veterinario: Veterinario): Observable<Veterinario> {
    return this.http.post<Veterinario>(`${this.ROOT_URL}/agregar`, veterinario).pipe(
      catchError(error => {
        console.error('Error al crear el veterinario:', error);
        throw error;
      })
    );
  }

  updateVeterinario(veterinario: Veterinario): Observable<Veterinario> {
    return this.http.put<Veterinario>(`${this.ROOT_URL}/editar/${veterinario.id}`, veterinario).pipe(
      catchError(error => {
        console.error('Error al actualizar el veterinario:', error);
        throw error;
      })
    );
  }
}


