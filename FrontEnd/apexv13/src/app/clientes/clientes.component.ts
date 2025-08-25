import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Clientes } from "app/shared/Model/Clientes";
import { FilterClientes } from "app/shared/Model/FilterClientes";
import { AlertModalService } from "app/shared/services/alert-modal.service";
import { EMPTY } from "rxjs";
import { switchMap, take } from "rxjs/operators";
import { ClientesService } from "./clientes.service";

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html",
  styleUrls: ["./clientes.component.scss"],
})
export class ClientesComponent implements OnInit {
  constructor(
    private router: Router,
    private clienteService: ClientesService,
    private alertService: AlertModalService,
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  clientes: Clientes[] = [];
  clienteId: number;
  filterCliente = new FilterClientes();
  formCliente: FormGroup;
  currentPage: number = 1;
  totalPages: number;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  pageSizeOptions: number[] = [5, 10, 20, 50];

  ngOnInit(): void {
    this.formCliente = this.fb.group({
      cpf: [null],
      nome: [null],
      placa: [null]
    });

    this.loadData();
  }

  loadData(): void {
    const cpfSemFormato = this.formCliente?.value?.cpf;
    const cpfFormatado = cpfSemFormato ? cpfSemFormato.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : '';
    const nomeCliente = this.formCliente?.value?.nome || '';
    const placa = this.formCliente?.value?.placa || '';

    const requestData = new FilterClientes(nomeCliente, cpfFormatado, placa, this.currentPage, this.itemsPerPage);

    this.clienteService.getFilterClientes(requestData).subscribe((data) => {
      this.clientes = data.data;
      this.totalPages = data.totalPagina;
      this.totalItems = data.totalItens || (data.data ? data.data.length * this.totalPages : 0);
      this.changeDetectorRef.detectChanges();
    });
  }

  new() {
    this.router.navigate(["clientes/new"]);
  }

  openById(id) {
    this.router.navigate(["clientes/new"], {
      queryParams: { clienteId: id, tipo: "visualizar" },
    });
  }

  novaOS(id) {
    this.router.navigate(["ordemdeservico/new"], {
      queryParams: { clienteId: id }
    });
  }

  novoOrc(id) {
    this.router.navigate(["orcamento/new"], {
      queryParams: { clienteId: id }
    });
  }

  openEditById(id) {
    this.router.navigate(["clientes/new"], {
      queryParams: { clienteId: id, tipo: "editar" },
    });
  }

  deleteCliente(id) {
    const result$ = this.alertService.showConfirm(
      "Confirmação",
      "Deseja realmente deletar esse cliente?"
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result
            ? this.clienteService.deleteCliente(id)
            : EMPTY
        )
      )
      .subscribe(
        (agendamentos) => {
          window.location.reload();
        },
        (error) => console.error(error)
      );
  }

  filterClientes() {
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

  limparFiltro() {
    this.formCliente.reset();
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
