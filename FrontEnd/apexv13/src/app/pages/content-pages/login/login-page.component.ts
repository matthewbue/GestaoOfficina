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

    const { username, password } = this.loginForm.value;
    this.authService.signinUser(username as string, password as string).subscribe(
      (response) => {
        this.loading = false;
        if (response?.data?.token) {
          this.router.navigate(['/page']);
          return;
        }
        this.toastr.error('Credenciais inválidas. Tente novamente.', 'Erro de login');
      },
      (err) => {
        this.loading = false;
        if (err?.status === 401) {
          this.toastr.error('Credenciais inválidas. Tente novamente.', 'Erro de login');
          return;
        }
        this.toastr.error('Erro ao autenticar. Tente novamente.', 'Erro de login');
      }
    );
  }

  openModal() {
    // Seu código para abrir o modal de reset de senha, se necessário
  }
}
