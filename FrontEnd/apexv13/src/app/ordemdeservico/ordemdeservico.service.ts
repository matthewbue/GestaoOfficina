import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilterOs } from 'app/shared/Model/filterOs';
import { FilterOsDto } from 'app/shared/Model/filterOsDto';
import { PaginatedResponse } from 'app/shared/Model/PaginatedResponse';
import { environment } from 'environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdemdeServicoService {

  constructor(private httpClient: HttpClient) { }

  createOrdemServico(ordemServico) {
    return this.httpClient.post(`${environment.API}/Manutence/Create`, ordemServico);
  }

  getFilterOS(filterOs: FilterOs) {
    return this.httpClient.post<PaginatedResponse<FilterOsDto[]>>(`${environment.API}/Manutence/GetFilterOS`, filterOs)
  }

  getOsById(Id) {
    return this.httpClient.get<any>(`${environment.API}/Manutence/GetById?entrada=${Id}`).pipe(catchError(this.handleError));
  }

  deleteOrdemServico(Id) {
    return this.httpClient.delete<any>(`${environment.API}/Manutence/Delete?entrada=${Id}`).pipe(catchError(this.handleError));
  }

  finalizarOs(Id) {
    return this.httpClient.get<any>(`${environment.API}/Manutence/CheckoutOS?identificadorOS=${Id}`).pipe(catchError(this.handleError));
  }

  getServico() {
    return this.httpClient.get<any>(`${environment.API}/Servico/GetAll`)
  }

  cadastrarServico(descricao) {
    return this.httpClient.post<any>(`${environment.API}/Servico/CreateService`, descricao)
  }

  updateServico(updateServico) {
    return this.httpClient.post<any>(`${environment.API}/Manutence/UpdateServico`, updateServico)
  }

  deleteServico(Id) {
    return this.httpClient.delete<any>(`${environment.API}/Manutence/DeleteManutence?entrada=${Id}`).pipe(catchError(this.handleError));
  }

  addNovoServico(addNewServico) {
    return this.httpClient.post<any>(`${environment.API}/Manutence/AddServico`, addNewServico)
  }

  saveEditOrdemServico(saveEditOrdemServico) {
    return this.httpClient.post<any>(`${environment.API}/Manutence/Update`, saveEditOrdemServico)
  }

  getRelatorioFilter(filterRelatorio) {
    return this.httpClient.post<any>(`${environment.API}/Manutence/GetRelatorio`, filterRelatorio)
  }

  private handleError(err: HttpErrorResponse) {
    return throwError(err);
  }
}
