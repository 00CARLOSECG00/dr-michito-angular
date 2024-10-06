import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cliente } from '../Model/cliente'; 

@Injectable({
  providedIn: 'root'  
})
export class ClienteService {
  private clienteSubject = new BehaviorSubject<Cliente|null  >(null);
  cliente$ = this.clienteSubject.asObservable();

  constructor() {}

    setCliente(cliente: Cliente): void {
      console.log('Cambia el cliente:', cliente);
      this.clienteSubject.next(cliente);  
    }
  
    getCliente(): Cliente | null {
      return this.clienteSubject.getValue(); 
    }
}
