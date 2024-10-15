import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject,throwError  } from 'rxjs';
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

  // Manejo de errores centralizado
  private manejarError<T>(resultado?: T) {
    return (error: any): Observable<T> => {
      console.error('Error:', error);
      // Devolver un resultado vacío para que la app continúe funcionando
      return of(resultado as T);
    };
  }
  

  obtenerTratamientos(): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(`${this.ROOT_URL}/all`).pipe(
      catchError(this.manejarError<Tratamiento[]>([]))
    );
  }

  obtenerTratamientosPorMascota(mascotaId: number): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(`${this.ROOT_URL}/mascota/${mascotaId}`).pipe(
      catchError(this.manejarError<Tratamiento[]>([]))
    );
  }

  agregarTratamiento(tratamiento: Tratamiento): Observable<Tratamiento> {
    return this.http.post<Tratamiento>(`${this.ROOT_URL}/agregar`, tratamiento, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError((error: any): Observable<Tratamiento> => {
        console.error('Error al agregar tratamiento:', error);
        return throwError(() => new Error('Error al agregar tratamiento'));
      })
    );
  }
  

  editarTratamiento(tratamiento: Tratamiento): Observable<Tratamiento> {
    return this.http.put<Tratamiento>(`${this.ROOT_URL}/editar/${tratamiento.id}`, tratamiento).pipe(
      catchError(this.manejarError<Tratamiento>())
    );
  }

  eliminarTratamiento(id: number): Observable<any> {
    return this.http.delete(`${this.ROOT_URL}/delete/${id}`).pipe(
      catchError(this.manejarError<any>())
    );
  }

  obtenerTratamientoPorId(id: number) {
    return this.http.get<Tratamiento>(`http://localhost:8080/Tratamientos/info/${id}`);
  }
  
  

  // Métodos para manejar el tratamiento seleccionado
  setTratamientoSeleccionado(tratamiento: Tratamiento | null): void {
    this.tratamientoSeleccionadoSource.next(tratamiento);
  }

  getTratamientoSeleccionado(): Observable<Tratamiento | null> {
    return this.tratamientoSeleccionado$;
  }
}
