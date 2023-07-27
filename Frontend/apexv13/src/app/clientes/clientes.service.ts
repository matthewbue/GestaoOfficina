
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Clientes } from 'app/shared/Model/Clientes';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ClientesService {
  constructor(private httpClient: HttpClient) { }

createClient(clientes){
  return this.httpClient.post(`${environment.API}/Client/Create`,clientes);
}

getAllClient(){
  return this.httpClient.get<any>(`${environment.API}/Client/GetAll`);

}

getClienteById(Id){
  return this.httpClient.get<any>(`${environment.API}/Client/GetClientById?identificador=${Id}`).pipe(catchError(this.handleError));
}

private handleError(err: HttpErrorResponse) {
  return throwError(err);
}

}

