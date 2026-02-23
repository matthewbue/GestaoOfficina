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

  // Novos endpoints do fluxo de orçamento
  realizarCheckIn(checkInData: any) {
    return this.httpClient.post<any>(`${environment.API}/Manutence/CheckIn`, checkInData);
  }

  adicionarFotosCheckIn(checkInVisualData: any) {
    return this.httpClient.post<any>(`${environment.API}/Manutence/CheckInVisual`, checkInVisualData);
  }

  informarDiagnostico(diagnosticoData: any) {
    return this.httpClient.post<any>(`${environment.API}/Manutence/Diagnostico`, diagnosticoData);
  }

  concluirDiagnostico(diagnosticoCompletoData: any) {
    return this.httpClient.post<any>(`${environment.API}/Manutence/DiagnosticoCompleto`, diagnosticoCompletoData);
  }

  iniciarCriacaoOrcamento(orcamentoData: any) {
    return this.httpClient.post<any>(`${environment.API}/Manutence/IniciarCriacaoOrcamento`, orcamentoData);
  }

  concluirOrcamento(orcamentoData: any) {
    return this.httpClient.post<any>(`${environment.API}/Manutence/ConcluirOrcamento`, orcamentoData);
  }

  getFotosOrcamento(manutenceId: number) {
    return this.httpClient.get<any>(`${environment.API}/Manutence/GetFotosOrcamento?manutenceId=${manutenceId}`);
  }

  habilitarCapturaDeFotos(manutenceId: number, operadorId: number) {
    return this.httpClient.post<any>(`${environment.API}/Manutence/HabilitarCapturaDeFotos`, {
      manutenceId: manutenceId,
      operadorId: operadorId
    });
  }

  atualizarStatus(manutenceId: number, novoStatus: number) {
    return this.httpClient.post<any>(`${environment.API}/Manutence/AtualizarStatus`, {
      manutenceId: manutenceId,
      novoStatus: novoStatus
    });
  }

  aprovarOrcamento(manutenceId: number) {
    return this.httpClient.post<any>(`${environment.API}/Manutence/AprovarOrcamento`, {
      manutenceId: manutenceId
    });
  }

  rejeitarOrcamento(manutenceId: number) {
    return this.httpClient.post<any>(`${environment.API}/Manutence/RejeitarOrcamento`, {
      manutenceId: manutenceId
    });
  }

  private handleError(err: HttpErrorResponse) {
    return throwError(err);
  }
}
