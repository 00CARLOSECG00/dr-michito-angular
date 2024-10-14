import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tratamiento } from '../Model/tratamiento';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {
  private ROOT_URL = 'http://localhost:8080/Tratamientos';

  // BehaviorSubject para almacenar y gestionar el tratamiento seleccionado
  private tratamientoSeleccionadoSource = new BehaviorSubject<Tratamiento | null>(null);
  tratamientoSeleccionado$ = this.tratamientoSeleccionadoSource.asObservable();

  constructor(private http: HttpClient) {}

  obtenerTratamientos(): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(`${this.ROOT_URL}/all`).pipe(
      catchError(error => {
        console.error('Error al obtener tratamientos:', error);
        throw error;
      })
    );
  }

  obtenerTratamientosPorMascota(mascotaId: number): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(`${this.ROOT_URL}/mascota/${mascotaId}`).pipe(
      catchError(error => {
        console.error('Error al obtener tratamientos por mascota:', error);
        throw error;
      })
    );
  }

  agregarTratamiento(tratamiento: Tratamiento): Observable<Tratamiento> {
    return this.http.post<Tratamiento>(`${this.ROOT_URL}/agregar`, tratamiento).pipe(
      catchError(error => {
        console.error('Error al agregar tratamiento:', error);
        throw error;
      })
    );
  }

  editarTratamiento(tratamiento: Tratamiento): Observable<Tratamiento> {
    return this.http.put<Tratamiento>(`${this.ROOT_URL}/editar/${tratamiento.id}`, tratamiento).pipe(
      catchError(error => {
        console.error('Error al editar tratamiento:', error);
        throw error;
      })
    );
  }

  eliminarTratamiento(id: number): Observable<any> {
    return this.http.delete(`${this.ROOT_URL}/delete/${id}`).pipe(
      catchError(error => {
        console.error('Error al eliminar tratamiento:', error);
        throw error;
      })
    );
  }

  obtenerTratamientoPorId(id: number): Observable<Tratamiento> {
    return this.http.get<Tratamiento>(`${this.ROOT_URL}/info/${id}`).pipe(
      catchError(error => {
        console.error('Error al obtener tratamiento:', error);
        throw error;
      })
    );
  }

  // Métodos para manejar el tratamiento seleccionado
  setTratamientoSeleccionado(tratamiento: Tratamiento | null): void {
    this.tratamientoSeleccionadoSource.next(tratamiento);
  }

  getTratamientoSeleccionado(): Observable<Tratamiento | null> {
    return this.tratamientoSeleccionado$;
  }
}
