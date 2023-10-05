import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { EMPTY, Subject } from "rxjs";
import { AlertModalService } from "../services/alert-modal.service";
import { ClientesService } from "app/clientes/clientes.service";
import { Clientes } from "../Model/Clientes";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FilterClientes } from "../Model/FilterClientes";
import { switchMap, take } from "rxjs/operators";

@Component({
  selector: "app-add-ordem-servico-modal",
  templateUrl: "./add-ordem-servico-modal.component.html",
  styleUrls: ["./add-ordem-servico-modal.component.scss"],
})
export class AddOrdemServicoModalComponent implements OnInit {
  @Input() oficina: any;
  confirmResult: Subject<boolean>;
  clientes: Clientes[];
  cliente = new Clientes();
  tipo: string;
  clienteId: any;
  formVeiculo: FormGroup;
  formCliente: FormGroup;
  filterCliente = new FilterClientes();
  currentPage: number = 1;
  totalPages: number;
  itemsPerPage: number;


  constructor(
    public bsModalRef: BsModalRef,
    private router: Router,
    private alertService: AlertModalService,
    private clienteService: ClientesService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,

  ) {}

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

  novoOrc(id){
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

    this.clienteService.getFilterClientes(requestData).subscribe((data) => {
      this.clientes = data.data;
      console.log("Filtro", data.data);

      this.changeDetectorRef.detectChanges();
    });
  }

  limparFiltro(){
    this.formCliente.reset()
  }

}
