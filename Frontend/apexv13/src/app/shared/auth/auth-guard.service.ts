import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  private _returnUrl: string;

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this._returnUrl = state.url;

    let isAuth = this.authService.isAuthenticated()
    if (!isAuth) {
      this.router.navigate(['/pages/login'], { queryParams: { returnUrl: this._returnUrl } });
      return false;
    }
    else {
      return true;
    }
  }
}
