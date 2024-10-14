import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MascotaDTO } from '../Model/mascota-dto';  // Usar el DTO
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Cliente } from '../Model/cliente';
@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  private ROOT_URL = 'http://localhost:8080';  // URL del backend


  constructor(private http: HttpClient) {}

  private mascotaSeleccionadaSource = new BehaviorSubject<MascotaDTO | null>(null);
  mascotaSeleccionada$ = this.mascotaSeleccionadaSource.asObservable();

  // Método para obtener el cliente por ID de mascota
  obtenerClientePorMascotaId(mascotaId: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.ROOT_URL}/Clientes/mascota/${mascotaId}`).pipe(
      catchError(error => {
        console.error('Error al obtener el cliente por ID de mascota:', error);
        throw error;
      })
    );
  }

  // Setear la mascota seleccionada con la cédula del cliente obtenida del backend
  setMascotaSeleccionadaConCliente(mascotaDTO: MascotaDTO): void {
    this.obtenerClientePorMascotaId(mascotaDTO.id).subscribe(cliente => {
      mascotaDTO.cedulaCliente = cliente.cedula;  // Seteamos la cédula del cliente
      this.mascotaSeleccionadaSource.next(mascotaDTO);  // Emitimos el DTO con la cédula del cliente
    });
  }

  setMascotaSeleccionada(mascota: MascotaDTO | null): void {
    console.log('Seteando mascota seleccionada:', mascota);  // Verificar en la consola
    this.mascotaSeleccionadaSource.next(mascota);
  }

  getMascotaSeleccionada(): Observable<MascotaDTO | null> {
    return this.mascotaSeleccionada$;
  }


  // mascota.service.ts
  obtenerMascotasPorId(id: number): Observable<MascotaDTO> {
    return this.http.get<MascotaDTO>(`${this.ROOT_URL}/Mascotas/info/${id}`).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error al obtener la mascota por ID:', error);
        throw error;
      })
    );
  }




  // Obtener todas las mascotas
  obtenerMascotas(): Observable<MascotaDTO[]> {
    return this.http.get<MascotaDTO[]>(`${this.ROOT_URL}/Mascotas/all`).pipe(
      catchError(error => {
        console.error('Error al obtener mascotas:', error);
        throw error;
      })
    );
  }

  // Crear nueva mascota
  agregarMascota(mascota: MascotaDTO): Observable<MascotaDTO> {
    return this.http.post<MascotaDTO>(`${this.ROOT_URL}/Mascotas/agregar`, mascota).pipe(
      catchError(error => {
        console.error('Error al agregar mascota:', error);
        throw error;
      })
    );
  }

  // Editar una mascota existente
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
