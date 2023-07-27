import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'app/Account/account.service';
import { User } from 'app/shared/Model/user';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})

export class PageComponent {
  fullname: string="Damon";

  /**
   *
   */
  constructor(private accountService: AccountService, private router: Router) {
    this.accountService.getUserAuthenticaded();
    // this.fullname = localStorage.getItem("fullname");

    let situacaoSenha = localStorage.getItem("situacaoSenha");

    if (situacaoSenha == '1') {
      this.router.navigate(['/pages/forgot-password'])
    }

  }



}
