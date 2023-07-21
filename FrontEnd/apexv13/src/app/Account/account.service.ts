
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Role } from "app/shared/Model/role";
import { User } from "./../shared/Model/user";
import { environment } from "environments/environment";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  constructor(private http: HttpClient) {}
  getAll() {
    return this.http.get<User[]>(`${environment.API}/account/user/list`);
  }

  getUser(id: number) {
    return this.http
      .get<User>(`${environment.API}/account/user/${id}`)
      .pipe(take(1));
  }

  getUserAuthenticaded() {
    return this.http.get<User>(`${environment.API}/account/user`).pipe(take(1));
  }

  getRoles() {
    return this.http.get<Role[]>(`${environment.API}/account/role/list`);
  }

  private update(user: User) {
    return this.http
      .post(`${environment.API}/account/update`, user)
      .pipe(take(1));
  }

  private create(user: User) {
    return this.http
      .post(`${environment.API}/account/register`, user)
      .pipe(take(1));
  }

  delete(id: string) {
    return this.http
      .delete(`${environment.API}/account/remove/${id}`)
      .pipe(take(1));
  }

  changePassword(user: User) {
    return this.http
      .post(`${environment.API}/account/changepassword`, user)
      .pipe(take(1));
  }
  resetPassword(id: number) {
    return this.http
      .delete(`${environment.API}/account/reset/${id}`)
      .pipe(take(1));
  }

  save(user: User) {
    if (user.id != 0) {
      return this.update(user);
    } else return this.create(user);
  }
}
