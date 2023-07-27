import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Subject } from "rxjs";
import { AlertModalService } from "../services/alert-modal.service";
import { ClientesService } from "app/clientes/clientes.service";
import { Clientes } from "../Model/Clientes";
import { FormBuilder, FormGroup } from "@angular/forms";

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


  constructor(
    public bsModalRef: BsModalRef,
    private router: Router,
    private alertService: AlertModalService,
    private clienteService: ClientesService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private fb: FormBuilder

  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.cliente.id = params.clienteId;
      this.tipo = params.tipo;
    });

    this.clienteService.getAllClient().subscribe((data) => {
      this.clientes = data.data
      console.log(data);
    });

    this.clienteId = this.cliente.id;
    this.clienteService.getClienteById(this.clienteId).subscribe((data) => {
      this.clientes = data.data;
      console.log("Clientes", this.clientes)
    })

    this.formVeiculo = this.fb.group({
      marca: [null],
      placa: [null],
      cor: [null],
      ano: [null],
      modelo: [null],
      km: [null],
    });

    this.formCliente = this.fb.group({
      nome: [null],
      cpf: [null],
      dataNascimento: [null],
      endereco: [null],
      bairro: [null],
      cidade: [null],
      uf: [null],
      numeroWhatsapp: [null],
      numeroContato: [null],
      email: [null],
    });
  }

  novaOS(id) {
    this.router.navigate(["ordemdeservico/new"], {
      queryParams: { clienteId: id}
    });
    this.modalService.hide();

  }

  goTo() {
    this.router.navigate(["clientes/new"]);
    this.modalService.hide();
  }
}
