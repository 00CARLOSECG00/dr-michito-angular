import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mascota } from '../Model/mascota';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  private ROOT_URL = 'http://localhost:8080';  // URL del backend

  // BehaviorSubject para manejar la mascota seleccionada
  private mascotaSeleccionadaSource = new BehaviorSubject<Mascota | null>(null);
  public mascotaSeleccionada$ = this.mascotaSeleccionadaSource.asObservable();

  constructor(private http: HttpClient) {}

  // Obtener todas las mascotas
  obtenerMascotas(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.ROOT_URL}/Mascotas/all`).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error al obtener mascotas:', error);
        throw error;
      })
    );
  }
  obtenerMascotasPorId(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.ROOT_URL}/Mascotas/info/${id}`).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error al obtener mascota:', error);
        throw error;
      })
    );
  }

  // Agregar una nueva mascota
  agregarMascota(mascota: Mascota): Observable<Mascota> {
    return this.http.post<Mascota>(`${this.ROOT_URL}/Mascotas/agregar`, mascota).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error al agregar mascota:', error);
        throw error;
      })
    );
  }

  // Eliminar una mascota por su ID
  eliminarMascota(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ROOT_URL}/Mascotas/info/${id}`).pipe(
      catchError(error => {
        console.error('Error al eliminar mascota:', error);
        throw error;
      })
    );
  }  

  // Seleccionar una mascota para verla o editarla
  seleccionarMascota(mascota: Mascota) {
    this.mascotaSeleccionadaSource.next(mascota);  // Emite la mascota seleccionada
  }
}
