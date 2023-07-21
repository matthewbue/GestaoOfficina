import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private authenticationService: AuthService ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (localStorage.getItem('token') !== null) {

            const cloneReq = req.clone({

                headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
            });
            return next.handle(cloneReq).pipe(
                tap(
                    succ => { },
                    err => {

                        if (err.status === 401 || err.status === 0) {
                          this.authenticationService.logout();
                        }

                    }
                )
            );
        } else {

            return next.handle(req.clone());
        }
    }
}
