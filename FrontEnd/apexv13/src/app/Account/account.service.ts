
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, throwError } from "rxjs";
import { delay, take } from "rxjs/operators";

import { Role } from "app/shared/Model/role";
import { User } from "./../shared/Model/user";
import { environment } from "environments/environment";
import { MockUsersStore } from "./data/mock-users.store";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  constructor(private http: HttpClient) {}
  getAll() {
    if (environment.useMockAccount) {
      return of(MockUsersStore.getAll()).pipe(delay(150));
    }
    return this.http.get<User[]>(`${environment.API}/account/user/list`);
  }

  getUser(id: number) {
    if (environment.useMockAccount) {
      const user = MockUsersStore.getById(id);
      if (!user) {
        return throwError(() => ({ status: 404, error: { message: "User not found" } }));
      }
      return of(user).pipe(delay(150), take(1));
    }
    return this.http.get<User>(`${environment.API}/account/user/${id}`).pipe(take(1));
  }

  getUserAuthenticaded() {
    if (environment.useMockAccount) {
      const first = MockUsersStore.getAll()[0] ?? null;
      return of(first as any).pipe(delay(80), take(1));
    }
    return this.http.get<User>(`${environment.API}/account/user`).pipe(take(1));
  }

  getRoles() {
    if (environment.useMockAccount) {
      const roles: any[] = [
        { id: 1, description: "Administrador", normalizedName: "ADMIN" },
        { id: 2, description: "Atendente", normalizedName: "ATENDENTE" },
        { id: 3, description: "Mecânico", normalizedName: "MECANICO" },
      ];
      return of(roles as Role[]).pipe(delay(80));
    }
    return this.http.get<Role[]>(`${environment.API}/account/role/list`);
  }

  private update(user: User) {
    if (environment.useMockAccount) {
      const saved = MockUsersStore.upsert(user);
      return of(saved).pipe(delay(150), take(1));
    }
    return this.http
      .post(`${environment.API}/account/update`, user)
      .pipe(take(1));
  }

  private create(user: User) {
    if (environment.useMockAccount) {
      const saved = MockUsersStore.upsert({ ...user, id: 0 });
      return of(saved).pipe(delay(150), take(1));
    }
    return this.http
      .post(`${environment.API}/account/register`, user)
      .pipe(take(1));
  }

  delete(id: string) {
    if (environment.useMockAccount) {
      MockUsersStore.delete(Number(id));
      return of(true).pipe(delay(150), take(1));
    }
    return this.http.delete(`${environment.API}/account/remove/${id}`).pipe(take(1));
  }

  changePassword(user: User) {
    return this.http
      .post(`${environment.API}/account/changepassword`, user)
      .pipe(take(1));
  }
  resetPassword(id: number) {
    if (environment.useMockAccount) {
      // mock: no-op
      return of(true).pipe(delay(150), take(1));
    }
    return this.http.delete(`${environment.API}/account/reset/${id}`).pipe(take(1));
  }

  save(user: User) {
    if (user.id != 0) {
      return this.update(user);
    } else return this.create(user);
  }
}
