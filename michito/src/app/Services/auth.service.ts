import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Cliente } from '../Model/cliente';
import { catchError, map } from 'rxjs/operators';
import { Veterinario } from '../Model/veterinario';
import { Login } from '../Model/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private USER_TYPE_KEY = 'userType';
  private CLIENTE_ID_KEY = 'clienteId';
  private VETERINARIO_ID_KEY = 'veterinarioId';

  constructor(private http: HttpClient) {}

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
        catchError((error) => {
          console.error('Error al iniciar sesión', error);
          return of(false); // Devuelve false si ocurre un error
        })
      );
    } else {
      return of(false); // Devuelve false si no hay cédula
    }
  }

  loginPortalInterno(user: string, password: string): Observable<{ authenticated: boolean; veterinario?: Veterinario }> {
    if (user && password) {
      return this.http.get<Login>(`http://localhost:8080/login/portalInterno/${user}`).pipe(
        map((login) => {
          if (login && login.password === password) {
            if (login.tipo === 'veterinario_inactivo') {
              // Veterinario inactivo
              return { authenticated: false, veterinario: login.veterinario };
            }
            
            // Login exitoso
            localStorage.setItem(this.USER_TYPE_KEY, login.tipo);
            if (login.idVeterinario) {
              localStorage.setItem(this.VETERINARIO_ID_KEY, login.idVeterinario.toString());
            }
            return { authenticated: true };
          }
          return { authenticated: false };
        })
      );
    }
    return of({ authenticated: false });
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
    const veterinarioId = localStorage.getItem(this.VETERINARIO_ID_KEY);
    if (veterinarioId) {
      console.log('Veterinario ID recuperado:', veterinarioId); // Verificación en consola
      return Number(veterinarioId);
    } else {
      console.log('No se encontró Veterinario ID en el localStorage');
      return null;
    }
  }

  // Método para obtener el veterinario autenticado
  getVeterinarioActual(): Observable<Veterinario | null> {
    const veterinarioId = this.getVeterinarioId();
    if (veterinarioId) {
      return this.http.get<Veterinario>(`http://localhost:8080/Veterinarios/${veterinarioId}`).pipe(
        catchError((error) => {
          console.error('Error al obtener el veterinario actual', error);
          return of(null);
        })
      );
    } else {
      return of(null); // Retorna null si no hay veterinario logueado
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
