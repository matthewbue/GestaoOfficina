import { HttpRequest } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Clientes } from 'app/shared/Model/Clientes';
import { FilterOs } from 'app/shared/Model/filterOs';
import { AlertModalService } from 'app/shared/services/alert-modal.service';
import { OrdemdeServicoService } from './ordemdeservico.service';
import { FilterOsDto } from 'app/shared/Model/filterOsDto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-ordemdeservico',
  templateUrl: './ordemdeservico.component.html',
  styleUrls: ['./ordemdeservico.component.scss']
})
export class OrdemdeservicoComponent implements OnInit {

  constructor(private alertService: AlertModalService,
    private osService: OrdemdeServicoService,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private router: Router,
  ) { }

  clientes = new Clientes();
  data: FilterOsDto[];
  formSearchOs: FormGroup;
  statusSelected: string;
  currentPage: number = 1;
  totalPages: number;
  itemsPerPage: number;
  tipoDoc: 'ordemServico'

  ngOnInit(): void {
    const requestData = new FilterOs("", "", 0, null, 1, 10)
    this.osService.getFilterOS(requestData).subscribe((response) => {
      this.data = response.data;
      this.totalPages = response.totalPagina
      console.log(this.data);
      this.cdRef.detectChanges();
    });

    this.formSearchOs = this.fb.group({
      ordemNumero: null,
      nomeCliente: null,
      statusOs: null,      
    })

  }

  addOS() {
    const result$ = this.alertService.addOSModal(this.clientes);
  }

  onSelectStatus(event: any) {
    this.statusSelected = event
    console.log('Marca selecionada:', this.statusSelected);

  }
  searchOs() {

    const ordemNumero = this.formSearchOs.value.ordemNumero == null ? 0 : this.formSearchOs.value.ordemNumero;
    const nomeCliente = this.formSearchOs.value.nomeCliente == null ? "" : this.formSearchOs.value.nomeCliente;

    const requestData = new FilterOs("", nomeCliente, ordemNumero, null, 1, 10)
    this.osService.getFilterOS(requestData).subscribe((response) => {
      this.data = response.data; // Armazene os objetos retornados no array
      console.log(this.data);
    });
  }

  getPaginationRange(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    const requestData = new FilterOs("", "", 0, null, this.currentPage, 10);
    this.osService.getFilterOS(requestData).subscribe((response) => {
      this.data = response.data; // Armazene os objetos retornados no array
      console.log(this.data);
    });
  }

  openById(id) {
    this.router.navigate(["ordemdeservico/new"], {
      queryParams: { osId: id, tipo: "visualizar" },
    });
  }

  openEditById(id) {
    this.router.navigate(["ordemdeservico/new"], {
      queryParams: { osId: id, tipo: "editar" },
    });
  }

  deleteById(id) {
    const result$ = this.alertService.showConfirm(
      "Confirmação",
      "Deseja realmente deletar essa Ordem de Serviço?"
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result
            ? this.osService.deleteOrdemServico(id)
            : EMPTY
        )
      )
      .subscribe(
        (ordemServico) => {
          window.location.reload();
        },
        (error) => console.error(error)
      );
  }

  finalizarOs(Id) {
    const result$ = this.alertService.showConfirm(
      "Confirmação",
      "Deseja realmente finalizar essa Ordem de Serviço?"
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result
            ? this.osService.finalizarOs(Id)
            : EMPTY
        )
      )
      .subscribe(
        (ordemServico) => {
          window.location.reload();
        },
        (error) => console.error(error)
      );
  }

  limparFiltro(){
    this.formSearchOs.reset()
  }

}
