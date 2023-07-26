import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Clientes } from "app/shared/Model/Clientes";
import { Automovel } from "app/shared/Model/Automovel";
import { AlertModalService } from "app/shared/services/alert-modal.service";
import { switchMap, take } from "rxjs/operators";
import { ClientesService } from "../clientes.service";
import { EMPTY, forkJoin } from "rxjs";

@Component({
  selector: "app-edit-clientes",
  templateUrl: "./edit-clientes.component.html",
  styleUrls: ["./edit-clientes.component.scss"],
})
export class EditClientesComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private alertService: AlertModalService,
    private clienteService: ClientesService,
    private route: ActivatedRoute,

  ) {}
  formVeiculo: FormGroup;
  formCliente: FormGroup;
  clientes = new Clientes();
  tipo: string;
  clienteId: number;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.clientes.id = params.clienteId;
      this.tipo = params.tipo;
    });

    this.clienteId = this.clientes.id;
    

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

  onSubmitVeiculos() {
    const veiculos = new Automovel();
    veiculos.ano = this.formVeiculo.value.ano;
    veiculos.cor = this.formVeiculo.value.cor;
    veiculos.km = this.formVeiculo.value.km;
    veiculos.marca = this.formVeiculo.value.marca;
    veiculos.modelo = this.formVeiculo.value.modelo;
    veiculos.placa = this.formVeiculo.value.placa;

    console.log(veiculos);
    this.clientes.automoveis.push(veiculos);
    console.warn(this.formVeiculo.value);
    this.formVeiculo.reset();

    this.alertService.showAlertSuccess("Resíduo adicionado à lista");
  }

  deleteVeiculo(index: number) {
    this.clientes.automoveis.splice(index, 1);
  }

  editVeiculo(index: number) {
    this.formVeiculo = this.fb.group({
      ano: this.clientes.automoveis[index].ano,
      cor: this.clientes.automoveis[index].cor,
      km: this.clientes.automoveis[index].km,
      marca: this.clientes.automoveis[index].marca,
      modelo: this.clientes.automoveis[index].modelo,
      placa: this.clientes.automoveis[index].placa,
    });

    this.clientes.automoveis.splice(index, 1);
  }

  onSave() {

    this.clientes.nome = this.formCliente.value.nome;
    this.clientes.cpf = this.formCliente.value.cpf;
    this.clientes.dataNascimento = this.formCliente.value.dataNascimento;
    this.clientes.endereco = this.formCliente.value.endereco;
      this.clientes.bairro = this.formCliente.value.bairro;
      this.clientes.cidade = this.formCliente.value.cidade;
      this.clientes.uf = this.formCliente.value.uf;
      this.clientes.numeroWhatsapp = this.formCliente.value.numeroWhatsapp;
      this.clientes.numeroContato = this.formCliente.value.numeroContato;
      this.clientes.email = this.formCliente.value.email;

      console.log("DADOS PARA SALVAR:", this.clientes);
this.clienteService.createClient(this.clientes).subscribe((data)=> {
  console.log(data)
})


    //   console.log("CLIENTES", this.clientes);
    //   const result$ = this.alertService.showConfirm(
    //     "Confirmação",
    //     "Deseja confirmar o agendamento?"
    //   );
    //   result$
    //   .asObservable()
    //   .pipe(
    //     take(1),
    //     switchMap((result) =>
    //       result ? this.clienteService.createClient(this.clientes) : EMPTY
    //     )
    //   )
    //   .subscribe(
    //     (clientes) => console.log(clientes),
    //     (error) => console.error(error)
    //   );

    // this.router.navigate(["clientes"]);
  // } else {
  //   this.alertService.showAlertDanger(
  //     "Preencha todos os campos obrigatórios."
  //   );
  // }
  }

  goBack() {
    this.router.navigate(["clientes"]);
  }

  newOS(){
    this.router.navigate(["ordemdeservico/new"]);

  }
}
