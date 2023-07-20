
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SourceCause } from 'app/shared/Model/SourceCause';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SourceCauseService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<SourceCause[]>(`${environment.API}/Utils/getCausasFonte`);
  }
}
