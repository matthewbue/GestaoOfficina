import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdemdeServicoService {

constructor(private httpClient: HttpClient) { }

createOrdemServico(ordemServico) {
  return this.httpClient.post(`https://localhost:44391/Manutence/Create`, ordemServico);
}

}
