import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CrudService } from "./CrudService";
import { Identity } from "./Identity";

@Injectable()
export class CrudServiceFactory {

  constructor(private http: HttpClient) {}

  public createService<T extends Identity>(resource: string) {
    return new CrudService<T>(this.http, resource);
  }
}