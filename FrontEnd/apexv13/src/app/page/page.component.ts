import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'app/Account/account.service';
import { User } from 'app/shared/Model/user';
import { environment } from 'environments/environment';
import { AuthService } from 'app/shared/auth/auth.service';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})

export class PageComponent {
  fullname: string = 'Usuário';

  /**
   *
   */
  constructor(private accountService: AccountService, private router: Router, private authService: AuthService) {
    this.accountService.getUserAuthenticaded();
    // this.fullname = localStorage.getItem("fullname");

    const user = this.authService.getCurrentUser();
    const name = String(user?.name ?? user?.fullname ?? user?.userName ?? user?.username ?? '').trim();
    this.fullname = name || this.fullname;

    let situacaoSenha = localStorage.getItem("situacaoSenha");

    if (situacaoSenha == '1') {
      this.router.navigate(['/pages/forgot-password'])
    }

  }



}
