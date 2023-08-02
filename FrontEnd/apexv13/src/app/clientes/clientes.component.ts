import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ClientesService } from "./clientes.service";
import { Clientes } from "app/shared/Model/Clientes";
import { AlertModalService } from "app/shared/services/alert-modal.service";
import { switchMap, take } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { FilterClientes } from "app/shared/Model/FilterClientes";
import { FormBuilder, FormGroup } from "@angular/forms";

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

  clientes: Clientes[];
  clienteId: number;
  filterCliente = new FilterClientes();
  formCliente: FormGroup;
  currentPage: number = 1;
  totalPages: number;
  itemsPerPage: number;

  ngOnInit(): void {
    this.clienteService.getAllClient().subscribe((data) => {
      this.clientes = data.data
      console.log(this.clientes);
    });

    const requestData = new FilterClientes("", "", "", this.currentPage, 10);
    console.log(requestData);

    this.clienteService.getFilterClientes(requestData).subscribe((data) => {
      this.clientes = data.data;
      this.totalPages = data.totalPagina
      console.log("Filtro", this.totalPages);

      this.changeDetectorRef.detectChanges();
    });

    this.formCliente = this.fb.group({
      cpf: [null],
      nome: [null],
      placa: [null]
    })
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

    const requestData = new FilterClientes(nomeCliente, cpfFormatado, placa, 1, 5);
    console.log(requestData);

    this.clienteService.getFilterClientes(requestData).subscribe((data) => {
      this.clientes = data.data;
      console.log("Filtro", data.data);

      this.changeDetectorRef.detectChanges();
    });
  }



  getPaginationRange(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    const requestData = new FilterClientes("", "", "", this.currentPage, 10);
  }


}
