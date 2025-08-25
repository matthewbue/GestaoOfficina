import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    private fb: FormBuilder,
    private router: Router,
  ) { }

  clientes = new Clientes();
  data: FilterOsDto[] = [];
  formSearchOs: FormGroup;
  statusSelected: string;
  currentPage: number = 1;
  totalPages: number;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  tipoDoc: any;
  pageSizeOptions: number[] = [5, 10, 20, 50];

  ngOnInit(): void {
    this.loadData();

    this.formSearchOs = this.fb.group({
      orcamentoNumero: null,
      nomeCliente: null,
      statusOs: null,
      dataInicial: null,
      dataFinal: null
    });
  }

  loadData(): void {
    const orcamentoNumero = this.formSearchOs?.value?.orcamentoNumero == null ? 0 : this.formSearchOs.value.orcamentoNumero;
    const nomeCliente = this.formSearchOs?.value?.nomeCliente == null ? "" : this.formSearchOs.value.nomeCliente;
    const dataInicial = this.formSearchOs?.value?.dataInicial == null ? null : this.formSearchOs.value.dataInicial;
    const dataFinal = this.formSearchOs?.value?.dataFinal == null ? null : this.formSearchOs.value.dataFinal;

    const requestData = new FilterOs("", nomeCliente, orcamentoNumero, null, this.currentPage, this.itemsPerPage, dataInicial, dataFinal, "Orçamento");

    this.osService.getFilterOS(requestData).subscribe((response) => {
      this.data = response.data;
      this.totalPages = response.totalPagina;
      this.totalItems = response.totalItens || (response.data ? response.data.length * this.totalPages : 0);
      this.cdRef.detectChanges();
    });
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
    this.currentPage = 1; // Reset to first page on search
    this.loadData();
  }

  getPaginationRange(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadData();
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
    this.formSearchOs.reset();
    this.currentPage = 1;
    this.loadData();
  }

  // Pagination methods
  onPageSizeChange(newSize: number) {
    this.itemsPerPage = newSize;
    this.currentPage = 1;
    this.loadData();
  }

  goToFirstPage() {
    this.goToPage(1);
  }

  goToLastPage() {
    this.goToPage(this.totalPages);
  }

  goToPreviousPage() {
    this.goToPage(this.currentPage - 1);
  }

  goToNextPage() {
    this.goToPage(this.currentPage + 1);
  }

  getVisiblePages(): number[] {
    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, this.currentPage - half);
    let end = Math.min(this.totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  getStartItem(): number {
    if (this.totalItems === 0) return 0;
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  getEndItem(): number {
    if (this.totalItems === 0) return 0;
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }
}
