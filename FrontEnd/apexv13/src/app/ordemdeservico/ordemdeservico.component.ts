import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Clientes } from 'app/shared/Model/Clientes';
import { FilterOs } from 'app/shared/Model/filterOs';
import { FilterOsDto } from 'app/shared/Model/filterOsDto';
import { AlertModalService } from 'app/shared/services/alert-modal.service';
import { EMPTY } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { OrdemdeServicoService } from './ordemdeservico.service';
import { StatusOrcamentoHelper } from 'app/shared/helpers/status-orcamento.helper';
import { StatusOrcamentoEnum } from 'app/shared/Model/StatusOrcamentoEnum';

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
  data: FilterOsDto[] = [];
  formSearchOs: FormGroup;
  statusSelected: string;
  currentPage: number = 1;
  totalPages: number;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  tipoDoc: any;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  isTecnico: boolean = false;

  ngOnInit(): void {
    this.verificarPerfil();
    const requestData = new FilterOs("", "", 0, null, 1, this.itemsPerPage, null, null, "OrdemServico")
    this.osService.getFilterOS(requestData).subscribe((response) => {
      this.data = response.data;
      this.totalPages = response.totalPagina;
      this.totalItems = response.totalItens || (response.data ? response.data.length * this.totalPages : 0);
      this.cdRef.detectChanges();
    });

    this.formSearchOs = this.fb.group({
      ordemNumero: null,
      nomeCliente: null,
      statusOs: null,
      dataInicial: null,
      dataFinal: null
    })
  }

  verificarPerfil(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        // Verifica se o perfil é 3 (Técnico)
        this.isTecnico = Number(user.profile) === 3;
        console.log('User profile:', user.profile, 'isTecnico:', this.isTecnico);
      } catch (e) {
        console.error('Erro ao parsear user do localStorage', e);
        this.isTecnico = false;
      }
    }
  }

  addOS() {
    this.alertService.addOSModal(this.clientes);
  }

  gerarRelatorio() {
    this.alertService.gerarRelatorioModal(this.clientes);
  }

  onSelectStatus(event: any) {
    this.statusSelected = event
  }
  searchOs() {
    this.currentPage = 1; // Reset to first page on search
    const ordemNumero = this.formSearchOs.value.ordemNumero == null ? 0 : this.formSearchOs.value.ordemNumero;
    const nomeCliente = this.formSearchOs.value.nomeCliente == null ? "" : this.formSearchOs.value.nomeCliente;
    const dataInicial = this.formSearchOs.value.dataInicial == null ? null : this.formSearchOs.value.dataInicial;
    const dataFinal = this.formSearchOs.value.dataFinal == null ? null : this.formSearchOs.value.dataFinal;
    const requestData = new FilterOs("", nomeCliente, ordemNumero, null, this.currentPage, this.itemsPerPage, dataInicial, dataFinal, "OrdemServico")
    this.osService.getFilterOS(requestData).subscribe((response) => {
      this.data = response.data;
      this.totalPages = response.totalPagina;
      this.totalItems = response.totalItens || (response.data ? response.data.length * this.totalPages : 0);
      this.cdRef.detectChanges();
    });
  }

  getPaginationRange(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadData();
  }

  loadData() {
    const ordemNumero = this.formSearchOs.value.ordemNumero == null ? 0 : this.formSearchOs.value.ordemNumero;
    const nomeCliente = this.formSearchOs.value.nomeCliente == null ? "" : this.formSearchOs.value.nomeCliente;
    const dataInicial = this.formSearchOs.value.dataInicial == null ? null : this.formSearchOs.value.dataInicial;
    const dataFinal = this.formSearchOs.value.dataFinal == null ? null : this.formSearchOs.value.dataFinal;
    const requestData = new FilterOs("", nomeCliente, ordemNumero, null, this.currentPage, this.itemsPerPage, dataInicial, dataFinal, "OrdemServico");
    this.osService.getFilterOS(requestData).subscribe((response) => {
      this.data = response.data;
      this.totalPages = response.totalPagina;
      this.totalItems = response.totalItens || (response.data ? response.data.length * this.totalPages : 0);
      this.cdRef.detectChanges();
    });
  }

  openById(id, clienteId) {
    this.router.navigate(["ordemdeservico/new"], {
      queryParams: { osId: id, clienteId: clienteId, tipo: "visualizar" },
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

  // Métodos para status de orçamento
  getStatusDescricao(status: number): string {
    return StatusOrcamentoHelper.getDescricao(status);
  }

  getStatusClass(status: number): string {
    return StatusOrcamentoHelper.getCssClass(status);
  }

  getStatusIcon(status: number): string {
    return StatusOrcamentoHelper.getIcon(status);
  }

  isAguardandoFotos(status: number): boolean {
    return StatusOrcamentoHelper.aguardandoFotosApp(status);
  }

  podeIniciarPreenchimento(status: number): boolean {
    return StatusOrcamentoHelper.podeIniciarPreenchimento(status);
  }

  podeEditar(status: number): boolean {
    return StatusOrcamentoHelper.podeEditarOrcamento(status);
  }

  podeEnviarParaAprovacao(status: number): boolean {
    return StatusOrcamentoHelper.podeEnviarParaAprovacao(status);
  }

  podeAprovarOuRejeitar(status: number): boolean {
    return StatusOrcamentoHelper.podeAprovarOuRejeitar(status);
  }

  podeFinalizar(status: number): boolean {
    return StatusOrcamentoHelper.podeFinalizar(status);
  }

  aprovarOrcamento(osId: number) {
    this.alertService.showConfirm(
      'Aprovar Orçamento',
      'Deseja aprovar este orçamento? Ele será convertido em Ordem de Serviço.'
    ).asObservable().subscribe((confirmed) => {
      if (confirmed) {
        this.osService.aprovarOrcamento(osId).subscribe(
          (response) => {
            this.alertService.showAlertSuccess('Orçamento aprovado! Convertido em Ordem de Serviço.');
            this.searchOs(); // Recarrega a lista
          },
          (error) => {
            this.alertService.showAlertDanger(error.error?.message || 'Erro ao aprovar orçamento.');
          }
        );
      }
    });
  }

  rejeitarOrcamento(osId: number) {
    this.alertService.showConfirm(
      'Rejeitar Orçamento',
      'Deseja rejeitar este orçamento? Ele será cancelado e não poderá mais ser editado.'
    ).asObservable().subscribe((confirmed) => {
      if (confirmed) {
        this.osService.rejeitarOrcamento(osId).subscribe(
          (response) => {
            this.alertService.showAlertSuccess('Orçamento rejeitado pelo cliente.');
            this.searchOs(); // Recarrega a lista
          },
          (error) => {
            this.alertService.showAlertDanger(error.error?.message || 'Erro ao rejeitar orçamento.');
          }
        );
      }
    });
  }

  enviarParaAprovacao(osId: number) {
    this.alertService.showConfirm(
      'Confirmar',
      'Deseja enviar o orçamento para aprovação do cliente?'
    ).asObservable().subscribe((confirmed) => {
      if (confirmed) {
        this.osService.atualizarStatus(osId, 6).subscribe(
          (response) => {
            this.alertService.showAlertSuccess('Orçamento enviado para aprovação do cliente!');
            this.searchOs(); // Recarrega a lista
          },
          (error) => {
            this.alertService.showAlertDanger(error.error?.message || 'Erro ao enviar orçamento para aprovação.');
          }
        );
      }
    });
  }

  iniciarPreenchimento(osId: number) {
    this.alertService.showConfirm(
      'Confirmar',
      'Deseja iniciar o preenchimento do orçamento com valores e serviços?'
    ).asObservable().subscribe((confirmed) => {
      if (confirmed) {
        this.osService.atualizarStatus(osId, 5).subscribe(
          (response) => {
            this.alertService.showAlertSuccess('Orçamento liberado para preenchimento!');
            this.searchOs(); // Recarrega a lista
          },
          (error) => {
            this.alertService.showAlertDanger(error.error?.message || 'Erro ao iniciar preenchimento.');
          }
        );
      }
    });
  }

  habilitarFotos(osId: number) {
    const usuarioLogado = JSON.parse(localStorage.getItem('user'));
    const operadorId = usuarioLogado?.id;

    if (!operadorId) {
      this.alertService.showAlertDanger('Erro ao identificar usuário logado.');
      return;
    }

    this.alertService.showConfirm(
      'Confirmar',
      'Deseja habilitar a captura de fotos no aplicativo?'
    ).asObservable().subscribe((confirmed) => {
      if (confirmed) {
        this.osService.habilitarCapturaDeFotos(osId, operadorId).subscribe(
          (response) => {
            this.alertService.showAlertSuccess('Captura de fotos habilitada! Agora é possível adicionar fotos pelo aplicativo.');
            this.searchOs(); // Recarrega a lista
          },
          (error) => {
            this.alertService.showAlertDanger(error.error?.message || 'Erro ao habilitar captura de fotos.');
          }
        );
      }
    });
  }
}
