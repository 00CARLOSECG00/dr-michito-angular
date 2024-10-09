import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Medicamento } from '../Model/medicamento';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {
  private ROOT_URL = 'http://localhost:8080/Medicamentos';

  constructor(private http: HttpClient) {}

  obtenerMedicamentos(): Observable<Medicamento[]> {
    console.log('Obteniendo medicamentos...');
    return this.http.get<Medicamento[]>(`${this.ROOT_URL}/all`).pipe(
      catchError(error => {
        console.error('Error al obtener medicamentos:', error);
        throw error;
      })
    );
  }

  eliminarMedicamento(id: number): Observable<any> {
    return this.http.delete(`${this.ROOT_URL}/delete/${id}`).pipe(
      catchError(error => {
        console.error('Error al eliminar medicamento:', error);
        throw error;
      })
    );
  }

  editarMedicamento(medicamento: Medicamento): Observable<Medicamento> {
    return this.http.put<Medicamento>(`${this.ROOT_URL}/update/${medicamento.id}`, medicamento).pipe(
      catchError(error => {
        console.error('Error al editar medicamento:', error);
        throw error;
      })
    );
  }
}
