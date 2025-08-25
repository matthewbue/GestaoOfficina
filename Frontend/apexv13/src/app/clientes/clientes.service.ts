
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clientes } from 'app/shared/Model/Clientes';
import { FilterClientes } from 'app/shared/Model/FilterClientes';
import { PaginatedResponse } from 'app/shared/Model/PaginatedResponse';
import { environment } from 'environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ClientesService {
  constructor(private httpClient: HttpClient) { }

  createClient(clientes) {
    return this.httpClient.post(`${environment.API}/Client/Create`, clientes);
  }

  getAllClient() {
    return this.httpClient.get<any>(`${environment.API}/Client/GetAll`);
  }

  getClienteById(Id) {
    return this.httpClient.get<any>(`${environment.API}/Client/GetClientById?identificador=${Id}`).pipe(catchError(this.handleError));
  }

  deleteCliente(Id) {
    return this.httpClient.delete<any>(`${environment.API}/Client/DeleteClient?entrada=${Id}`).pipe(catchError(this.handleError));
  }

  updateClienteById(cliente) {
    return this.httpClient.post(`${environment.API}/Client/UpdateClient`, cliente);
  }

  createVeiculoById(automovel) {
    return this.httpClient.post(`${environment.API}/Automovel/CreateAutomovel`, automovel);
  }

  updateVeiculoById(automovel) {
    return this.httpClient.post(`${environment.API}/Automovel/UpdateAutomovel`, automovel);
  }

  deleteVeiculo(Id) {
    return this.httpClient.delete<any>(`${environment.API}/Automovel/DeleteAutomovel?Id=${Id}`).pipe(catchError(this.handleError));
  }

  getFilterClientes(filterClientes: FilterClientes){
    return this.httpClient.post<PaginatedResponse<Clientes[]>>(`${environment.API}/Client/GetClientFilter`, filterClientes)
  }

  private handleError(err: HttpErrorResponse) {
    return throwError(err);
  }

}

