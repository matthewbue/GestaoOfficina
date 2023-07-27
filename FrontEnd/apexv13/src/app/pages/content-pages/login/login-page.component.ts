import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'app/shared/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  loginFormSubmitted = false;
  loading = false;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(true)
  });

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) {}

  get lf() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.loginFormSubmitted = true;
    this.loading = true;

    if (this.loginForm.invalid) {
      this.loading = false;
      return;
    }

    // Chama o método signinUser do AuthService (login sem a verificação de credenciais)
    const { username, password } = this.loginForm.value;
    if (username === 'damon' && password === '123456') {
      // Login bem-sucedido
      this.authService.isAuthenticated(); // Define a autenticação como verdadeira

      // Redireciona para a página desejada
      this.router.navigate(['/page']);
      this.loading = false;
    } else {
      // Credenciais inválidas
      this.toastr.error('Credenciais inválidas. Tente novamente.', 'Erro de login');
      this.loading = false;
    }
  }

  openModal() {
    // Seu código para abrir o modal de reset de senha, se necessário
  }
}
