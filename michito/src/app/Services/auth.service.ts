import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Cliente } from '../Model/cliente';
import { catchError, map } from 'rxjs/operators';
import { Veterinario } from '../Model/veterinario';
import { Login } from '../Model/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private USER_TYPE_KEY = 'userType';
  private CLIENTE_ID_KEY = 'clienteId';
  private VETERINARIO_ID_KEY = 'veterinarioId';
  private TOKEN_KEY = 'authToken';

  constructor(private http: HttpClient, private router: Router) {}

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
      const loginData = { usuario: user, passwords: password };

      return this.http.post(`http://localhost:8080/login/portalInterno`, loginData, { responseType: 'text' }).pipe(
        switchMap((token: string) => {
          // Guardar el token en el localStorage
          localStorage.setItem(this.TOKEN_KEY, token);
          console.log('Token obtenido:', token);

          // Realizar petición a Veterinarios/details usando el token
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
          return this.http.get<Veterinario>(`http://localhost:8080/Veterinarios/detalles`).pipe(
            map((veterinario: Veterinario) => {
              if (veterinario.especialidad === 'admin'){
                localStorage.setItem(this.USER_TYPE_KEY, 'admin');
              } else {
                localStorage.setItem(this.USER_TYPE_KEY, 'veterinario');
              }

              localStorage.setItem(this.VETERINARIO_ID_KEY, veterinario.id.toString());
              console.log('Detalles del veterinario obtenidos:', veterinario);
              return { authenticated: true, veterinario };
            }),
            catchError((error) => {
              console.error('Error al obtener detalles del veterinario', error);
              return of({ authenticated: false });
            })
          );
        }),
        catchError((error) => {
          console.error('Error de autenticación en portal interno', error);
          return of({ authenticated: false });
        })
      );
    }
    return of({ authenticated: false });
  }

  redirectBasedOnRole(): Observable<boolean> {
    const token = localStorage.getItem(this.TOKEN_KEY);

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      
      return this.http.get<Veterinario>(`http://localhost:8080/Veterinarios/detalles`, { headers }).pipe(
        switchMap((veterinario: Veterinario) => {
          // Guardar detalles del veterinario en el localStorage si es necesario
          if (veterinario.especialidad === 'admin') {
            localStorage.setItem(this.USER_TYPE_KEY, 'admin');
            this.router.navigate(['/Mascotas']); // Redirigir a la página de administrador
          } else {
            localStorage.setItem(this.USER_TYPE_KEY, 'veterinario');
            this.router.navigate(['/Mascotas']); // Redirigir a la página de veterinario
          }

          localStorage.setItem(this.VETERINARIO_ID_KEY, veterinario.id.toString());
          return of(true);
        }),
        catchError((error) => {
          console.error('Error al redirigir según el rol', error);
          return of(false);
        })
      );
    } else {
      return of(false);
    }
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
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('currentUser');
  }

  // Verificar si el usuario está logueado
  // Verificar si el usuario está logueado
  isLoggedIn(): boolean {
    return localStorage.getItem(this.TOKEN_KEY) !== null;
  }
}
