import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Clientes } from 'app/shared/Model/Clientes';
import { FilterOs } from 'app/shared/Model/filterOs';
import { FilterOsDto } from 'app/shared/Model/filterOsDto';
import { AlertModalService } from 'app/shared/services/alert-modal.service';
import { EMPTY } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { OrdemdeServicoService } from './ordemdeservico.service';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-ordemdeservico',
  templateUrl: './ordemdeservico.component.html',
  styleUrls: ['./ordemdeservico.component.scss'],
  animations: [
    trigger('filterAnimation', [
      state('hidden', style({
        opacity: 0,
        height: '0px',
        overflow: 'hidden',
        padding: '0px'
      })),
      state('visible', style({
        opacity: 1,
        height: '*',
        padding: '*'
      })),
      transition('hidden <=> visible', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class OrdemdeservicoComponent implements OnInit {

  constructor(private alertService: AlertModalService,
    private osService: OrdemdeServicoService,
    private fb: UntypedFormBuilder,
    private cdRef: ChangeDetectorRef,
    private router: Router,
  ) { }

  clientes = new Clientes();
  data: FilterOsDto;
  formSearchOs: UntypedFormGroup;
  statusSelected: string;
  currentPage: number = 1;
  totalPages: number;
  itemsPerPage: number;
  tipoDoc: any;
  filteractive: boolean = false;
  Listview: boolean = false;

  ngOnInit(): void {
    const requestData = new FilterOs("", "", 0, null, 1, 10, null, null, "OrdemServico")
    this.osService.getFilterOS(requestData).subscribe((response) => {
      this.data = response.data;
      this.totalPages = response.totalPagina
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
    const ordemNumero = this.formSearchOs.value.ordemNumero == null ? 0 : this.formSearchOs.value.ordemNumero;
    const nomeCliente = this.formSearchOs.value.nomeCliente == null ? "" : this.formSearchOs.value.nomeCliente;
    const dataInicial = this.formSearchOs.value.dataInicial == null ? null : this.formSearchOs.value.dataInicial;
    const dataFinal = this.formSearchOs.value.dataFinal == null ? null : this.formSearchOs.value.dataFinal;
    const requestData = new FilterOs("", nomeCliente, ordemNumero, null, 1, 10, dataInicial, dataFinal, "OrdemServico")
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
    const ordemNumero = this.formSearchOs.value.ordemNumero == null ? 0 : this.formSearchOs.value.ordemNumero;
    const nomeCliente = this.formSearchOs.value.nomeCliente == null ? "" : this.formSearchOs.value.nomeCliente;
    const dataInicial = this.formSearchOs.value.dataInicial == null ? null : this.formSearchOs.value.dataInicial;
    const dataFinal = this.formSearchOs.value.dataFinal == null ? null : this.formSearchOs.value.dataFinal;
    const requestData = new FilterOs("", nomeCliente, ordemNumero, null, this.currentPage, 10, dataInicial, dataFinal, "OrdemServico");
    this.osService.getFilterOS(requestData).subscribe((response) => {
      this.data = response.data; // Armazene os objetos retornados no array
      this.totalPages = response.totalPagina
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
    this.formSearchOs.reset()
  }

  onFilterToggle() {
    this.filteractive = !this.filteractive;
  }
  onFilterList() {
    this.Listview = !this.Listview;
  }
}
