import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Medicamento } from '../Model/medicamento';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {

  private ROOT_URL = 'http://localhost:8080';  // URL del backend


  constructor(private http: HttpClient) {}

  // Obtener todas las mascotas
  obtenerMedicamentos(): Observable<Medicamento[]> {
    console.log('Obteniendo medicamentos...');
    return this.http.get<Medicamento[]>(`${this.ROOT_URL}/Medicamentos/all`);
  }

}
