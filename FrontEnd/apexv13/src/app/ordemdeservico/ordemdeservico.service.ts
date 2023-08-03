import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilterOs } from 'app/shared/Model/filterOs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdemdeServicoService {

constructor(private httpClient: HttpClient) { }

createOrdemServico(ordemServico) {
  return this.httpClient.post(`https://localhost:44391/Manutence/Create`, ordemServico);
}

getFilterOS(filterOs: FilterOs){
  return this.httpClient.post<any>(`https://localhost:44391/Manutence/GetFilterOS`, filterOs)
}

}
