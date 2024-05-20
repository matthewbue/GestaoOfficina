import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OrdemdeServicoService } from 'app/ordemdeservico/ordemdeservico.service';
import { Clientes } from 'app/shared/Model/Clientes';
import { FilterOs } from 'app/shared/Model/filterOs';
import { FilterOsDto } from 'app/shared/Model/filterOsDto';
import { AlertModalService } from 'app/shared/services/alert-modal.service';
import { EMPTY } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.scss']
})
export class OrcamentoComponent implements OnInit {

  constructor(private alertService: AlertModalService,
    private osService: OrdemdeServicoService,
    private cdRef: ChangeDetectorRef,
    private fb: UntypedFormBuilder,
    private router: Router,
  ) { }

  clientes = new Clientes();
  data: FilterOsDto[];
  formSearchOs: UntypedFormGroup;
  statusSelected: string;
  currentPage: number = 1;
  totalPages: number;
  itemsPerPage: number;
  tipoDoc: any;

  ngOnInit(): void {
    const requestData = new FilterOs("", "", 0, null, 1, 10, null, null, "Orçamento")
    this.osService.getFilterOS(requestData).subscribe((response) => {
      this.data = response.data;
      this.totalPages = response.totalPagina
      this.cdRef.detectChanges();
    });

    this.formSearchOs = this.fb.group({
      orcamentoNumero: null,
      nomeCliente: null,
      statusOs: null,
      dataInicial: null,
      dataFinal: null
    })
  }

  addOS() {
    const result$ = this.alertService.addOSModal(this.clientes);
  }

  onSelectStatus(event: any) {
    this.statusSelected = event
  }

  gerarRelatorio() {
    this.alertService.gerarRelatorioModal(this.clientes);
  }

  searchOs() {
    const orcamentoNumero = this.formSearchOs.value.orcamentoNumero == null ? 0 : this.formSearchOs.value.orcamentoNumero;
    const nomeCliente = this.formSearchOs.value.nomeCliente == null ? "" : this.formSearchOs.value.nomeCliente;
    const dataInicial = this.formSearchOs.value.dataInicial == null ? null : this.formSearchOs.value.dataInicial;
    const dataFinal = this.formSearchOs.value.dataFinal == null ? null : this.formSearchOs.value.dataFinal;
    const requestData = new FilterOs("", nomeCliente, orcamentoNumero, null, 1, 10, dataInicial, dataFinal, "Orçamento")
    this.osService.getFilterOS(requestData).subscribe((response) => {
      this.data = response.data; // Armazene os objetos retornados no array
      this.totalPages = response.totalPagina
    });
  }

  getPaginationRange(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    const orcamentoNumero = this.formSearchOs.value.orcamentoNumero == null ? 0 : this.formSearchOs.value.orcamentoNumero;
    const nomeCliente = this.formSearchOs.value.nomeCliente == null ? "" : this.formSearchOs.value.nomeCliente;
    const dataInicial = this.formSearchOs.value.dataInicial == null ? null : this.formSearchOs.value.dataInicial;
    const dataFinal = this.formSearchOs.value.dataFinal == null ? null : this.formSearchOs.value.dataFinal;
    const requestData = new FilterOs("", nomeCliente, orcamentoNumero, null, this.currentPage, 10, dataInicial, dataFinal, "Orçamento");
    this.osService.getFilterOS(requestData).subscribe((response) => {
      this.data = response.data; // Armazene os objetos retornados no array
      this.totalPages = response.totalPagina
    });
  }

  openById(id, clienteId) {
    this.router.navigate(["orcamento/new"], {
      queryParams: { osId: id, clienteId: clienteId, tipo: "visualizar" },
    });
  }

  openEditById(id) {
    this.router.navigate(["orcamento/new"], {
      queryParams: { osId: id, tipo: "editar" },
    });
  }

  deleteById(id) {
    const result$ = this.alertService.showConfirm(
      "Confirmação",
      "Deseja realmente deletar esse Orçamento?"
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
      "Deseja realmente finalizar esse orçamento?"
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

  limparFiltro() {
    this.formSearchOs.reset()
  }
}
