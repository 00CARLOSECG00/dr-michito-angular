import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Veterinario } from '../Model/veterinario';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {

  private ROOT_URL = 'http://localhost:8080';  // URL del backend

  private mascotaSeleccionadaSource = new BehaviorSubject<Veterinario | null>(null);
  public mascotaSeleccionada$ = this.mascotaSeleccionadaSource.asObservable();

  constructor(private http: HttpClient) {}

  // Obtener todas los veterinarios
  obtenerMascotas(): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(`${this.ROOT_URL}/Veterinarios/all`).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error al obtener mascotas:', error);
        throw error;
      })
    );
  }



  obtenerMascotasPorId(id: number): Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.ROOT_URL}/Veterinarios/info/${id}`).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error al obtener mascota:', error);
        throw error;
      })
    );
  }

  // Agregar un veterinario
  agregarMascota(mascota: Veterinario): Observable<Veterinario> {
    return this.http.post<Veterinario>(`${this.ROOT_URL}/Veterinarios/agregar`, mascota).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error al agregar mascota:', error);
        throw error;
      })
    );
  }

  // Eliminar un veterinario
  eliminarMascota(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ROOT_URL}/Veterinarios/info/${id}`).pipe(
      catchError(error => {
        console.error('Error al eliminar mascota:', error);
        throw error;
      })
    );
  }  

  // Seleccionar una mascota para verla o editarla
  seleccionarMascota(mascota: Veterinario) {
    this.mascotaSeleccionadaSource.next(mascota);  // Emite la mascota seleccionada
  }
}
