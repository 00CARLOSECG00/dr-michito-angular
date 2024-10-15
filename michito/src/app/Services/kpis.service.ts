import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KpisService {

  private apiUrl = 'http://localhost:8080/kpis';

  constructor(private http: HttpClient) { }

  getTotalMascotas(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-mascotas`).pipe(
      catchError(error => {
        console.error('Error al obtener el total de mascotas:', error);
        throw error;
      })
    );
  }

  getTratamientosUltimoMes(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/tratamientos-ultimo-mes`).pipe(
      catchError(error => {
        console.error('Error al obtener los tratamientos del último mes:', error);
        throw error;
      })
    );
  }

  getMascotasActivas(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/mascotas-activas`).pipe(
      catchError(error => {
        console.error('Error al obtener las mascotas activas:', error);
        throw error;
      })
    );
  }

  getVeterinariosActivos(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/veterinarios-activos`).pipe(
      catchError(error => {
        console.error('Error al obtener los veterinarios activos:', error);
        throw error;
      })
    );
  }

  getVeterinariosInactivos(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/veterinarios-inactivos`).pipe(
      catchError(error => {
        console.error('Error al obtener los veterinarios inactivos:', error);
        throw error;
      })
    );
  }

  getTratamientosPorMedicamento(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tratamientos-por-medicamento`).pipe(
      catchError(error => {
        console.error('Error al obtener los tratamientos por medicamento:', error);
        throw error;
      })
    );
  }

  getTotalGanancias(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/ganancias-totales`).pipe(
      catchError(error => {
        console.error('Error al obtener el total de ganancias:', error);
        throw error;
      })
    );
  }

  getTotalVentas(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/ventas-totales`).pipe(
      catchError(error => {
        console.error('Error al obtener el total de ventas:', error);
        throw error;
      })
    );
  }

  getTopTratamientos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/top-tratamientos`).pipe(
      catchError(error => {
        console.error('Error al obtener los tratamientos más vendidos:', error);
        throw error;
      })
    );
  }
  /*




  
  */
}
