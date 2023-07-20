import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'environments/environment';
import { take } from "rxjs/operators";
import { Identity } from "./Identity";

@Injectable({
  providedIn: 'root'
})
export class CrudService<T extends Identity> {
  constructor(
    private http: HttpClient,
    private endpoint: string
  ) {}

  private buildUrl(service: string = null) {
    const url = `${environment.API}/${this.endpoint}`;
    return service ? `${url}/${service}` : url;
  }

  public create(model: T, service: string = null) {
    return this.http.post(this.buildUrl(service), model).pipe(take(1));
  }

  public update(model: T, service: string = null) {
    return this.http.put(this.buildUrl(service), model).pipe(take(1));
  }

  public delete(model: T, service: string = null) {
    return this.http.delete(`${this.buildUrl(service)}/${model.id}`).pipe(take(1));
  }

  public getById(model: T, service: string = null) {
    return this.http.get<T>(`${this.buildUrl(service)}/${model.id}`).pipe(take(1));    
  }

  public getAll(service: string = null) {
    return this.http.get<T[]>(this.buildUrl(service));
  }

  public filter(page: number, query: any, service: string = null) {
    return this.http.post(`${this.buildUrl(service)}`, query);
  }
}