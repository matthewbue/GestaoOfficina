import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from 'environments/environment';

export interface ReturnDefault<T> {
  message: string;
  data: T;
  totalPagina?: number;
  totalDados?: number;
  httpStatusCode?: number;
}

export interface UserResponseDTO {
  id: number;
  name: string;
  email: string;
  cpf: string;
  profile: number;
  profileDescription: string;
  profilePhotoBase64?: string | null;
}

export interface UserCreateDTO {
  name: string;
  email: string;
  cpf: string;
  profile: number;
  profilePhoto?: string | null;
}

export interface UserUpdateDTO {
  id: number;
  name?: string | null;
  email?: string | null;
  cpf?: string | null;
  profile?: number | null;
  password?: string | null;
  profilePhoto?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private readonly baseUrl = `${environment.API}/api/User`;

  constructor(private http: HttpClient) {}

  login(payload: { cpf: string; password: string }): Observable<ReturnDefault<{ token: string; user: UserResponseDTO }>> {
    return this.http.post<ReturnDefault<{ token: string; user: UserResponseDTO }>>(`${this.baseUrl}/Login`, {
      cpf: payload.cpf,
      password: payload.password,
    }).pipe(take(1));
  }

  getAll(): Observable<ReturnDefault<UserResponseDTO[]>> {
    return this.http.get<ReturnDefault<UserResponseDTO[]>>(this.baseUrl).pipe(take(1));
  }

  getById(id: number): Observable<ReturnDefault<UserResponseDTO>> {
    return this.http.get<ReturnDefault<UserResponseDTO>>(`${this.baseUrl}/${id}`).pipe(take(1));
  }

  create(dto: UserCreateDTO): Observable<ReturnDefault<UserResponseDTO>> {
    return this.http.post<ReturnDefault<UserResponseDTO>>(this.baseUrl, dto).pipe(take(1));
  }

  update(dto: UserUpdateDTO): Observable<ReturnDefault<UserResponseDTO>> {
    return this.http.put<ReturnDefault<UserResponseDTO>>(this.baseUrl, dto).pipe(take(1));
  }

  delete(id: number): Observable<ReturnDefault<boolean>> {
    return this.http.delete<ReturnDefault<boolean>>(`${this.baseUrl}/${id}`).pipe(take(1));
  }
}
