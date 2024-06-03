import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { ClientesService } from "./clientes.service";
import { Clientes } from "app/shared/Model/Clientes";
import { AlertModalService } from "app/shared/services/alert-modal.service";
import { switchMap, take } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { FilterClientes } from "app/shared/Model/FilterClientes";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import {
  ColumnMode,
  DatatableComponent,
  SelectionType
} from '@swimlane/ngx-datatable';

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html",
  styleUrls: ["./clientes.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class ClientesComponent implements OnInit {
  constructor(
    private router: Router,
    private clienteService: ClientesService,
    private alertService: AlertModalService,
    private fb: UntypedFormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  clientes: Clientes[];
  clienteId: number;
  filterCliente = new FilterClientes();
  formCliente: UntypedFormGroup;
  currentPage: number = 1;
  totalPages: number;
  itemsPerPage: number;

// row data
 rows = [];
 ColumnMode = ColumnMode;
 // column header
 columns = [
  { name: 'Nome', prop: 'nome' },
  { name: 'Email', prop: 'email' },
  { name: 'Contato', prop: 'numeroWhatsapp' },
];


  ngOnInit(): void {
    const requestData = new FilterClientes("", "", "", this.currentPage, 10);

    this.clienteService.getFilterClientes(requestData).subscribe((data) => {
      this.clientes = data.data;
      this.rows = data.data;
      this.totalPages = data.totalPagina
      this.changeDetectorRef.detectChanges();
    });

    this.formCliente = this.fb.group({
      cpf: [null],
      nome: [null],
      placa: [null]
    })
  }

  editRow(row) {
    console.log('Editing row:', row);
  }

  deleteRow(row) {
    console.log('Deleting row:', row);
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
    const cpfSemFormato = this.formCliente.value.cpf;
    const cpfFormatado = cpfSemFormato ? cpfSemFormato.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : '';
    const nomeCliente = this.formCliente.value.nome;
    const placa = this.formCliente.value.placa;

    const requestData = new FilterClientes(nomeCliente, cpfFormatado, placa, this.currentPage, 10);
    this.clienteService.getFilterClientes(requestData).subscribe((data) => {
      this.clientes = data.data;
      this.totalPages = data.totalPagina
      this.changeDetectorRef.detectChanges();
    });
  }

  getPaginationRange(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    const cpfSemFormato = this.formCliente.value.cpf;
    const cpfFormatado = cpfSemFormato ? cpfSemFormato.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : '';

    const nomeCliente = this.formCliente.value.nome;
    const placa = this.formCliente.value.placa;

    const requestData = new FilterClientes(nomeCliente, cpfFormatado, placa, this.currentPage, 10);

    this.clienteService.getFilterClientes(requestData).subscribe((data) => {
      this.clientes = data.data;
      this.changeDetectorRef.detectChanges();
    });
  }

  limparFiltro() {
    this.formCliente.reset()
  }

}
