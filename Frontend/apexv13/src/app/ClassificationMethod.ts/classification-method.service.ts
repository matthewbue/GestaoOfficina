
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClassificationMethod } from 'app/shared/Model/ClassificationMethod';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassificationMethodService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<ClassificationMethod[]>(`${environment.API}/utils/getMetodos`);
  }
}
