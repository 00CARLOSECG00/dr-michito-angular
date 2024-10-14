import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Medicamento } from '../Model/medicamento';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {
  private ROOT_URL = 'http://localhost:8080/Medicamentos';

  constructor(private http: HttpClient) {}

  private medicamentoSeleccionado = new BehaviorSubject<Medicamento | null>(null);

  // Método para obtener el BehaviorSubject como Observable
  obtenerMedicamentoSeleccionado(): Observable<Medicamento | null> {
    return this.medicamentoSeleccionado.asObservable();
  }

  // Método para setear el medicamento seleccionado
  setMedicamentoSeleccionado(medicamento: Medicamento): void {
    this.medicamentoSeleccionado.next(medicamento);
  }

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
    const confirmed = confirm('¿Estás seguro de que deseas eliminar este medicamento?');
    if (confirmed) {
      return this.http.delete(`${this.ROOT_URL}/delete/${id}`).pipe(
        catchError(error => {
          console.error('Error al eliminar medicamento:', error);
          throw error;
        })
      );
    } else {
      return of(null);  // Retornar un Observable vacío si la acción es cancelada
    }
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
