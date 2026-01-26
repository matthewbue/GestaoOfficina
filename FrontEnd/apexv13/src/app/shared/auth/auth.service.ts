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

  isAdm(): boolean {
    // Sua lógica para verificar se o usuário é um administrador, se necessário
    return false;
  }

  isAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  resetPassword(cpf: string) {
    // Seu código para redefinir a senha, se necessário
  }
}
