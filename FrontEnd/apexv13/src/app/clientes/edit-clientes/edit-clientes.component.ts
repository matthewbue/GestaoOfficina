import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Clientes } from "app/shared/Model/Clientes";
import { Veiculos } from "app/shared/Model/Veiculos";
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
    private clienteService: ClientesService
  ) {}
  formVeiculo: FormGroup;
  formCliente: FormGroup;
  clientes = new Clientes();

  ngOnInit(): void {
    this.formVeiculo = this.fb.group({
      marcaVeiculo: [null],
      placaVeiculo: [null],
      corVeiculo: [null],
      anoVeiculo: [null],
      modeloVeiculo: [null],
      kmVeiculo: [null],
      
    });

    this.formCliente = this.fb.group({
      nomeCliente: [null],
      cpfCliente: [null],
      dataNascimento: [null],
      endereco: [null],
      bairro: [null],
      cidade: [null],
      uf: [null],
      numeroWhatsapp: [null],
      telefoneContato: [null],
      email: [null],
    });
  }

  onSubmitVeiculos() {
    const veiculos = new Veiculos();
    veiculos.anoVeiculo = this.formVeiculo.value.anoVeiculo;
    veiculos.corVeiculo = this.formVeiculo.value.corVeiculo;
    veiculos.kmVeiculo = this.formVeiculo.value.kmVeiculo;
    veiculos.marcaVeiculo = this.formVeiculo.value.marcaVeiculo;
    veiculos.modeloVeiculo = this.formVeiculo.value.modeloVeiculo;
    veiculos.placaVeiculo = this.formVeiculo.value.placaVeiculo;

    console.log(veiculos);
    this.clientes.veiculos.push(veiculos);
    console.warn(this.formVeiculo.value);
    this.formVeiculo.reset();

    this.alertService.showAlertSuccess("Resíduo adicionado à lista");
  }

  deleteVeiculo(index: number) {
    this.clientes.veiculos.splice(index, 1);
  }

  editVeiculo(index: number) {
    this.formVeiculo = this.fb.group({
      anoVeiculo: this.clientes.veiculos[index].anoVeiculo,
      corVeiculo: this.clientes.veiculos[index].corVeiculo,
      kmVeiculo: this.clientes.veiculos[index].kmVeiculo,
      marcaVeiculo: this.clientes.veiculos[index].marcaVeiculo,
      modeloVeiculo: this.clientes.veiculos[index].modeloVeiculo,
      placaVeiculo: this.clientes.veiculos[index].placaVeiculo,
    });

    this.clientes.veiculos.splice(index, 1);
  }

  onSave() {
    if (this.formCliente.valid && this.formCliente.touched) {
      this.clientes.nomeCliente = this.formCliente.value.nomeCliente;
      this.clientes.cpfCliente = this.formCliente.value.cpfCliente;
      this.clientes.dataNascimento = this.formCliente.value.dataNascimento;
      this.clientes.endereco = this.formCliente.value.endereco;
      this.clientes.bairro = this.formCliente.value.bairro;
      this.clientes.cidade = this.formCliente.value.cidade;
      this.clientes.uf = this.formCliente.value.uf;
      this.clientes.numeroWhatsapp = this.formCliente.value.numeroWhatsapp;
      this.clientes.telefoneContato = this.formCliente.value.telefoneContato;
      this.clientes.email = this.formCliente.value.email;

      const veiculos = this.clientes.veiculos.slice();

      const dadosParaSalvar = {
        veiculos: veiculos,
        cliente: {
          nomeCliente: this.formCliente.value.nomeCliente,
          cpfCliente: this.formCliente.value.cpfCliente,
          dataNascimento: this.formCliente.value.dataNascimento,
          endereco: this.formCliente.value.endereco,
          bairro: this.formCliente.value.bairro,
          cidade: this.formCliente.value.cidade,
          uf: this.formCliente.value.uf,
          numeroWhatsapp: this.formCliente.value.numeroWhatsapp,
          telefoneContato: this.formCliente.value.telefoneContato,
          email: this.formCliente.value.email,
        },
      };

      console.log("DADOS PARA SALVAR:", dadosParaSalvar);

      console.log("CLIENTES", this.clientes);
      const result$ = this.alertService.showConfirm(
        "Confirmação",
        "Deseja confirmar o agendamento?"
      );
      result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result ? this.clienteService.createClient(dadosParaSalvar) : EMPTY
        )
      )
      .subscribe(
        (clientes) => console.log(clientes),
        (error) => console.error(error)
      );

    this.router.navigate(["clientes"]);
  } else {
    this.alertService.showAlertDanger(
      "Preencha todos os campos obrigatórios."
    );
  }
  }

  goBack() {
    this.router.navigate(["clientes"]);
  }
}
