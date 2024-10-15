import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Cliente } from '../Model/cliente';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private USER_TYPE_KEY = 'userType';
  private CLIENTE_ID_KEY = 'clienteId';
  private VETERINARIO_ID_KEY = 'veterinarioId';

  constructor(private http: HttpClient) { }

  // Método para login de clientes basado en cédula
  login(cedula: string): Observable<boolean> {
    if (cedula !== null) {
      return this.http.get<Cliente>(`http://localhost:8080/Clientes/${cedula}`).pipe(
        map((response: Cliente) => {
          // Guardar en el localStorage
          localStorage.setItem(this.USER_TYPE_KEY, 'cliente');
          localStorage.setItem(this.CLIENTE_ID_KEY, response.id.toString());
          console.log('Login exitoso:', response);
          return true;
        }),
        catchError(error => {
          console.error('Error al iniciar sesión', error);
          return of(false);  // Devuelve false si ocurre un error
        })
      );
    } else {
      return of(false);  // Devuelve false si no hay cédula
    }
  }

  // Método para login del portal interno
  // AuthService: Método de login modificado para guardar el veterinarioId
loginPortalInterno(user: string, password: string): Observable<boolean> {
  if (user !== null && password !== null) {
    return this.http.get<any>(`http://localhost:8080/login/portalInterno/${user}`).pipe(
      map((response) => {
        if (response && response.password) {
          const backendPassword = response.password.trim();
          const enteredPassword = (password || '').trim();
          if (backendPassword === enteredPassword) {
            console.log('Login exitoso:', response);
            localStorage.setItem(this.USER_TYPE_KEY, response.tipo);
            
            // Guardar el veterinarioId si es un veterinario
            if (response.idVeterinario) {
              localStorage.setItem(this.VETERINARIO_ID_KEY, response.idVeterinario.toString());
            }

            localStorage.setItem('currentUser', JSON.stringify(response));
            return true;
          } else {
            console.log('Contraseña incorrecta');
            return false;
          }
        }
        return false;
      })
    );
  }
  return of(false);  // Devuelve un Observable con false si user o password es null
}


  // Método para almacenar el tipo de usuario en localStorage
  setUserType(type: string): void {
    localStorage.setItem(this.USER_TYPE_KEY, type);
  }

  // Método para almacenar el id del veterinario en localStorage
  setVeterinarioId(id: number): void {
    localStorage.setItem(this.VETERINARIO_ID_KEY, id.toString());
  }

  // Obtener el tipo de usuario (admin, cliente, veterinario, etc.)
  getUserType(): string | null {
    return localStorage.getItem(this.USER_TYPE_KEY);
  }

  // Obtener el ID del cliente logueado
  getClienteId(): number | null {
    const clienteId = localStorage.getItem(this.CLIENTE_ID_KEY);
    return clienteId ? Number(clienteId) : null;
  }

  // Obtener el ID del veterinario logueado
  getVeterinarioId(): number | null {
    const veterinarioId = localStorage.getItem('veterinarioId');
    if (veterinarioId) {
      console.log('Veterinario ID recuperado:', veterinarioId);  // Verificación en consola
      return Number(veterinarioId);
    } else {
      console.log('No se encontró Veterinario ID en el localStorage');
      return null;
    }
  }
  


  // Eliminar las credenciales de la sesión
  logout(): void {
    localStorage.removeItem(this.USER_TYPE_KEY);
    localStorage.removeItem(this.CLIENTE_ID_KEY);
    localStorage.removeItem(this.VETERINARIO_ID_KEY);
    localStorage.removeItem('currentUser');
  }

  // Verificar si el usuario está logueado
  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }
}
