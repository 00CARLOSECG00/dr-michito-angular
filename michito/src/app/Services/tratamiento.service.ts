import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tratamiento } from '../Model/tratamiento';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {
  private ROOT_URL = 'http://localhost:8080/Tratamientos';

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

  eliminarTratamiento(id: number): Observable<any> {
    return this.http.delete(`${this.ROOT_URL}/delete/${id}`).pipe(
      catchError(error => {
        console.error('Error al eliminar tratamiento:', error);
        throw error;
      })
    );
  }

  setTratamientoSeleccionado(tratamiento: Tratamiento | null): void {
    // Implementa la lógica para seleccionar un tratamiento
  }
}
