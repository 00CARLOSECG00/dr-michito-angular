import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MascotaDTO } from '../Model/mascota-dto';  // Usar el DTO
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  private ROOT_URL = 'http://localhost:8080';  // URL del backend

  constructor(private http: HttpClient) {}

  private mascotaSeleccionadaSource = new BehaviorSubject<MascotaDTO | null>(null);
  mascotaSeleccionada$ = this.mascotaSeleccionadaSource.asObservable();

  // Método para buscar mascotas por nombre
  buscarMascotas(term: string): Observable<MascotaDTO[]> {
    if (!term.trim()) {
      // Si no hay término de búsqueda, retorna un arreglo vacío
      return new Observable<MascotaDTO[]>((observer) => observer.next([]));
    }
    return this.http.get<MascotaDTO[]>(`${this.ROOT_URL}/Mascotas/buscar?nombre=${term}`).pipe(
      catchError(error => {
        console.error('Error al buscar mascotas:', error);
        throw error;
      })
    );
  }

  setMascotaSeleccionada(mascota: MascotaDTO | null): void {
    this.mascotaSeleccionadaSource.next(mascota);
  }

  getMascotaSeleccionada(): Observable<MascotaDTO | null> {
    return this.mascotaSeleccionada$;
  }

  obtenerMascotasPorId(id: number): Observable<MascotaDTO> {
    return this.http.get<MascotaDTO>(`${this.ROOT_URL}/Mascotas/info/${id}`).pipe(
      catchError(error => {
        console.error('Error al obtener la mascota por ID:', error);
        throw error;
      })
    );
  }

  obtenerMascotasPorCliente(clienteId: number): Observable<MascotaDTO[]> {
    return this.http.get<MascotaDTO[]>(`${this.ROOT_URL}/Clientes/cliente/${clienteId}`).pipe(
      catchError(error => {
        console.error('Error al obtener mascotas del cliente:', error);
        throw error;
      })
    );
  }

  obtenerMascotas(): Observable<MascotaDTO[]> {
    return this.http.get<MascotaDTO[]>(`${this.ROOT_URL}/Mascotas/all`).pipe(
      catchError(error => {
        console.error('Error al obtener mascotas:', error);
        throw error;
      })
    );
  }

  agregarMascota(mascota: MascotaDTO): Observable<MascotaDTO> {
    return this.http.post<MascotaDTO>(`${this.ROOT_URL}/Mascotas/agregar`, mascota).pipe(
      catchError(error => {
        console.error('Error al agregar mascota:', error);
        throw error;
      })
    );
  }

  editarMascota(mascotaDTO: MascotaDTO): Observable<MascotaDTO> {
    return this.http.put<MascotaDTO>(`${this.ROOT_URL}/Mascotas/editar/${mascotaDTO.id}`, mascotaDTO).pipe(
      catchError(error => {
        console.error('Error al editar la mascota:', error);
        throw error;
      })
    );
  }

  eliminarMascota(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ROOT_URL}/Mascotas/eliminar/${id}`).pipe(
      catchError(error => {
        console.error('Error al eliminar la mascota:', error);
        throw error;
      })
    );
  }
}
