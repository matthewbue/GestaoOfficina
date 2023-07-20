import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor(public router: Router) {}

  signupUser(email: string, password: string) {
    // Seu código para registrar o novo usuário
  }

  signinUser(email: string, password: string) {
    // Seu código para fazer login do usuário
  }

  logout() {
    // Seu código de logout, se necessário
    this.router.navigate(['/pages/login']);
  }

  isAdm(): boolean {
    // Sua lógica para verificar se o usuário é um administrador, se necessário
    return false;
  }

  isAuthenticated() {
    // Sempre retorna true para indicar que qualquer usuário está autenticado
    return true;
  }

  resetPassword(cpf: string) {
    // Seu código para redefinir a senha, se necessário
  }
}
