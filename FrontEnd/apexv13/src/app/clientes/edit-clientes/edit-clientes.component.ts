import { Location } from '@angular/common';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Automovel } from "app/shared/Model/Automovel";
import { Clientes } from "app/shared/Model/Clientes";
import { AlertModalService } from "app/shared/services/alert-modal.service";
import { EMPTY } from "rxjs";
import { switchMap, take } from "rxjs/operators";
import { ClientesService } from "../clientes.service";

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
    private location: Location

  ) { }
  formVeiculo: FormGroup;
  formCliente: FormGroup;
  clientes = new Clientes();
  EditClientes = new Clientes();
  tipo: string;
  clienteId: number;
  veiculoId: number;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.clientes.id = Number(params.clienteId);
      this.tipo = params.tipo;
    });


    this.clienteId = this.clientes.id;
    this.clienteService.getClienteById(this.clienteId).subscribe((data) => {
      this.clientes = data.data;
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

  onSubmitVeiculos() {
    const veiculos = new Automovel();
    veiculos.ano = this.formVeiculo.value.ano;
    veiculos.cor = this.formVeiculo.value.cor;
    veiculos.km = this.formVeiculo.value.km;
    veiculos.marca = this.formVeiculo.value.marca;
    veiculos.modelo = this.formVeiculo.value.modelo;
    veiculos.placa = this.formVeiculo.value.placa;

    this.clientes.automoveis.push(veiculos);
    console.warn(this.formVeiculo.value);
    this.formVeiculo.reset();

    this.alertService.showAlertSuccess("Veículo adicionado à lista");
  }

  deleteVeiculo(veiculos) {
    this.veiculoId = veiculos.id;
    const result$ = this.alertService.showConfirm(
      "Confirmação",
      "Deseja realmente excluir esse veículo?"
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result
            ? this.clienteService.deleteVeiculo(this.veiculoId)
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

  showVeiculos(veiculos) {
    this.veiculoId = veiculos.id;
    this.formVeiculo = this.fb.group({
      ano: veiculos.ano,
      cor: veiculos.cor,
      km: veiculos.km,
      marca: veiculos.marca,
      modelo: veiculos.modelo,
      placa: veiculos.placa,
    })
  }

  showEditVeiculos(veiculos) {
    this.veiculoId = veiculos.id;
    this.formVeiculo = this.fb.group({
      ano: veiculos.ano,
      cor: veiculos.cor,
      km: veiculos.km,
      marca: veiculos.marca,
      modelo: veiculos.modelo,
      placa: veiculos.placa,
    })
  }

  AlterarDados() {
    this.EditClientes.id = this.clienteId;
    this.EditClientes.bairro = this.formCliente.value.bairro == null ? "" : this.formCliente.value.bairro;
    this.EditClientes.cidade = this.formCliente.value.cidade == null ? "" : this.formCliente.value.cidade;
    this.EditClientes.cpf = this.formCliente.value.cidade == null ? "" : this.formCliente.value.cpf;
    this.EditClientes.dataNascimento = this.formCliente.value.dataNascimento == null ? Date : this.formCliente.value.dataNascimento;
    this.EditClientes.email = this.formCliente.value.email == null ? "" : this.formCliente.value.email;
    this.EditClientes.endereco = this.formCliente.value.email == null ? "" : this.formCliente.value.endereco;
    this.EditClientes.nome = this.formCliente.value.nome == null ? "" : this.formCliente.value.nome;
    const numeroContatoSemFormato = this.formCliente.value.numeroContato == null ? "" : this.formCliente.value.numeroContato;
    const contatoFormatado = numeroContatoSemFormato.replace(/(\d{2})(\d{4})(\d{4})/, '($1)$2-$3');
    this.EditClientes.numeroContato = contatoFormatado;
    const numeroWhatsappSemFormato = this.formCliente.value.numeroWhatsapp == null ? "" : this.formCliente.value.numeroWhatsapp;
    const whatsappFormatado = numeroWhatsappSemFormato.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');
    this.EditClientes.numeroWhatsapp = whatsappFormatado

    this.EditClientes.automoveis = []
    const result$ = this.alertService.showConfirm(
      "Confirmação",
      "Deseja alterar os dados do cliente?"
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result
            ? this.clienteService.updateClienteById(this.EditClientes)
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

  adicionarVeiculo() {
    const veiculos = new Automovel();
    veiculos.id = this.veiculoId;
    veiculos.clienteId = this.clienteId;
    veiculos.ano = this.formVeiculo.value.ano == null ? "" : this.formVeiculo.value.ano;
    veiculos.cor = this.formVeiculo.value.cor == null ? "" : this.formVeiculo.value.cor;
    veiculos.km = this.formVeiculo.value.km == null ? "" : this.formVeiculo.value.km;
    veiculos.marca = this.formVeiculo.value.marca == null ? "" : this.formVeiculo.value.marca;
    veiculos.modelo = this.formVeiculo.value.modelo == null ? "" : this.formVeiculo.value.modelo;
    veiculos.placa = this.formVeiculo.value.placa == null ? "" : this.formVeiculo.value.placa;
    this.EditClientes.automoveis.push(veiculos)

    const result$ = this.alertService.showConfirm(
      "Confirmação",
      "Deseja criar um novo veículo?"
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result
            ? this.clienteService.createVeiculoById(veiculos)
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

  alterarVeiculo() {
    const veiculos = new Automovel();

    veiculos.id = this.veiculoId;
    veiculos.ano = this.formVeiculo.value.ano == null ? "" : this.formVeiculo.value.ano;
    veiculos.cor = this.formVeiculo.value.cor == null ? "" : this.formVeiculo.value.cor;
    veiculos.km = this.formVeiculo.value.km == null ? "" : this.formVeiculo.value.km;
    veiculos.marca = this.formVeiculo.value.marca == null ? "" : this.formVeiculo.value.marca;
    veiculos.modelo = this.formVeiculo.value.modelo == null ? "" : this.formVeiculo.value.modelo;
    veiculos.placa = this.formVeiculo.value.placa == null ? "" : this.formVeiculo.value.placa;

    this.EditClientes.automoveis.push(veiculos)

    const result$ = this.alertService.showConfirm(
      "Confirmação",
      "Deseja alterar os dados do veículo?"
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result
            ? this.clienteService.updateVeiculoById(veiculos)
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

  onSave() {
    if (this.formCliente.valid && this.formCliente.touched) {
      this.clientes.id = 0
      this.clientes.nome = this.formCliente.value.nome;
      const cpfSemFormato = this.formCliente.value.cpf == null ? "" : this.formCliente.value.cpf;
      const cpfFormatado = cpfSemFormato.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      this.clientes.cpf = cpfFormatado;
      this.clientes.dataNascimento = this.formCliente.value.dataNascimento == null ? null : this.formCliente.value.dataNascimento;
      this.clientes.endereco = this.formCliente.value.endereco;
      this.clientes.bairro = this.formCliente.value.bairro;
      this.clientes.cidade = this.formCliente.value.cidade;
      this.clientes.uf = this.formCliente.value.uf;
      const numeroWhatsappSemFormato = this.formCliente.value.numeroWhatsapp == null ? "" : this.formCliente.value.numeroWhatsapp;
      const whatsappFormatado = numeroWhatsappSemFormato.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');
      this.clientes.numeroWhatsapp = whatsappFormatado;
      const numeroContatoSemFormato = this.formCliente.value.numeroContato == null ? "" : this.formCliente.value.numeroContato;
      const contatoFormatado = numeroContatoSemFormato.replace(/(\d{2})(\d{4})(\d{4})/, '($1)$2-$3');
      this.clientes.numeroContato = contatoFormatado;
      this.clientes.email = this.formCliente.value.email;

      if (this.clientes.automoveis.length === 0) {
        this.alertService.showAlertDanger(
          "Preencha todos os campos."
        );
        return;
      }

      const result$ = this.alertService.showConfirm(
        "Confirmação",
        "Deseja criar esse Cliente?"
      );
      result$
        .asObservable()
        .pipe(
          take(1),
          switchMap((result) =>
            result ? this.clienteService.createClient(this.clientes) : EMPTY
          )
        )
        .subscribe(
          () => {
            this.location.back();
          },
          (error) => {
            console.error(error);

            if (error.error && error.error.includes("CPF")) {
              this.alertService.showAlertDanger(error.message);
            } else if (error.error && error.error.includes("Veiculo")) {
              this.alertService.showAlertDanger(error.error);
            }
          }
        );
    } else {
      this.alertService.showAlertDanger(
        "Preencha todos os campos corretamente."
      );
    }
  }

  goBack() {
    this.location.back();
  }

  newOS() {
    this.router.navigate(["ordemdeservico/new"]);
  }
}
