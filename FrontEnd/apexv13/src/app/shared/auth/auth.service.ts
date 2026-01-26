import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(private router: Router, private http: HttpClient) {}

  signupUser(email: string, password: string) {
    // Seu código para registrar o novo usuário
  }

  signinUser(cpf: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${environment.API}/api/User/Login`, { cpf, password })
      .pipe(
        take(1),
        tap((response) => {
          const token = response?.data?.token;
          if (token) {
            localStorage.setItem('token', token);
          }

          const user = response?.data?.user;
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/pages/login']);
  }

  getCurrentUser(): any | null {
    const raw = localStorage.getItem('user');
    if (!raw) return null;

    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  isAdm(): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;

    // backend usa ProfileEnum: 1=Administrador, 2=Operador, 3=Técnico
    if (Number(user.profile) === 1) return true;

    const desc = String(user.profileDescription ?? '').toLowerCase();
    return desc.includes('admin');
  }

  isAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  resetPassword(cpf: string) {
    // Seu código para redefinir a senha, se necessário
  }
}
