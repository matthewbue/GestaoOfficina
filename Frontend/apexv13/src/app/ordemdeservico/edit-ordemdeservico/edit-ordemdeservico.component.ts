import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from 'app/clientes/clientes.service';
import { Automovel } from 'app/shared/Model/Automovel';
import { Clientes } from 'app/shared/Model/Clientes';
import { AlertModalService } from 'app/shared/services/alert-modal.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-ordemdeservico',
  templateUrl: './edit-ordemdeservico.component.html',
  styleUrls: ['./edit-ordemdeservico.component.scss']
})
export class EditOrdemdeservicoComponent implements OnInit {

  constructor(
    public bsModalRef: BsModalRef,
    private router: Router,
    private alertService: AlertModalService,
    private clienteService: ClientesService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  clientes: Clientes[];
  cliente = new Clientes();
  tipo: string;
  clienteId: any;
  formVeiculo: FormGroup;
  formCliente: FormGroup;
  formOrdemServico: FormGroup;
  marcaSelecionada: string;
  veiculoSelecionado: Automovel;
  servicos: any[] = [];
  novoServico: string;
  novoValor: number;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.cliente.id = params.clienteId;
      this.tipo = params.tipo;
    });

    this.clienteService.getAllClient().subscribe((data) => {
      this.clientes = data.data;
      console.log(data);
    });

    this.clienteId = this.cliente.id;
    this.clienteService.getClienteById(this.clienteId).subscribe((data) => {
      this.cliente = data.data;
      console.log("Cliente By ID", this.cliente);
    });

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

    this.formOrdemServico = this.fb.group({
      servico: [null],
      valor: [null],
      KmAtual: [null],
      KmServico: [null],
      mediaKm: [null],
      observacoes: [null]
    });
  }

  gerarOrdemServico() {
    // Crie um objeto contendo os dados da ordem de serviço a serem enviados para o backend
    const ordemServicoData = {
      clienteId: this.cliente.id,
      veiculo: {
        marca: this.marcaSelecionada,
        placa: this.formVeiculo.get('placa')?.value,
        cor: this.formVeiculo.get('cor')?.value,
        ano: this.formVeiculo.get('ano')?.value,
        modelo: this.formVeiculo.get('modelo')?.value,
        km: this.formVeiculo.get('km')?.value,
      },
      servicos: this.servicos,
      kmAtual: this.formOrdemServico.get('KmAtual')?.value,
      kmServico: this.formOrdemServico.get('KmServico')?.value,
      mediaKm: this.formOrdemServico.get('mediaKm')?.value,
      observacoes: this.formOrdemServico.get('observacoes')?.value
    };
    console.log(ordemServicoData)
  }

  onSelectMarca(event: any) {
    this.marcaSelecionada = event;
    console.log('Marca selecionada:', this.marcaSelecionada);
    this.veiculoSelecionado = this.cliente.automoveis.find(automovel => automovel.marca === this.marcaSelecionada);

    if (this.veiculoSelecionado) {
      this.formVeiculo.patchValue({
        placa: this.veiculoSelecionado.placa,
        cor: this.veiculoSelecionado.cor,
        ano: this.veiculoSelecionado.ano,
        modelo: this.veiculoSelecionado.modelo,
        km: this.veiculoSelecionado.km,
      });
    }
  }

  adicionarServico() {
    if (this.novoServico && this.novoValor) {
      const novoServico = { nome: this.novoServico, valor: this.novoValor };
      this.servicos.push(novoServico);
      this.novoServico = '';
      this.novoValor = null;
    }
  }

  removerServico(servico: any) {
    const index = this.servicos.indexOf(servico);
    if (index !== -1) {
      this.servicos.splice(index, 1);
    }
  }

  calcularValorTotal(): number {
    return this.servicos.reduce((total, servico) => total + servico.valor, 0);
  }

}
