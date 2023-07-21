
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Source } from 'app/shared/Model/Source';
import { environment } from 'environments/environment';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SourcesService {

  constructor(private http: HttpClient) { }

  private update(source: Source) {
    return this.http.put(`${environment.API}/Fonte/${source.id}`, source).pipe(take(1));
  }

  private create(source: Source) {
    return this.http.post(`${environment.API}/Fonte/cadastrarFonte`, source).pipe(take(1));
  }

  delete(source: Source) {
    return this.http.delete(`${environment.API}/Fonte/${source.id}`).pipe(take(1));
  }

  save(source: Source) {
    if (source.id != 0) {
      return this.update(source);
    } else return this.create(source);
  }

  toggleActive(source: Source) {

  }

  getAll() {
    return this.http.get<Source[]>(`${environment.API}/Fonte/getFontes`);
  }

  getFacility(id: number) {
    return this.http.get<Source>(`${environment.API}/Fonte/${id}`).pipe(take(1));
  }
}
