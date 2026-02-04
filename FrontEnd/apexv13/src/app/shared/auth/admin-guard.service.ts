import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/pages/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    if (!this.authService.isAdm()) {
      this.router.navigate(['/page']);
      return false;
    }

    return true;
  }
}
