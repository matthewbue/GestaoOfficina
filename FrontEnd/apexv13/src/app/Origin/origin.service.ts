
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OriginClassification } from 'app/shared/Model/OriginClassification';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OriginService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<OriginClassification[]>(`${environment.API}/utils/getClassificacoes`);
  }
}
