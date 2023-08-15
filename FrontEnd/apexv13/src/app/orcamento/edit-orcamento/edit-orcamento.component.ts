import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from 'app/clientes/clientes.service';
import { OrdemdeServicoService } from 'app/ordemdeservico/ordemdeservico.service';
import { Automovel } from 'app/shared/Model/Automovel';
import { Clientes } from 'app/shared/Model/Clientes';
import { Servicos } from 'app/shared/Model/Servicos';
import { FilterOsDto } from 'app/shared/Model/filterOsDto';
import { AlertModalService } from 'app/shared/services/alert-modal.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Location } from '@angular/common';
import { switchMap, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-edit-orcamento',
  templateUrl: './edit-orcamento.component.html',
  styleUrls: ['./edit-orcamento.component.scss']
})
export class EditOrcamentoComponent implements OnInit {

  constructor(
    public bsModalRef: BsModalRef,
    private router: Router,
    private alertService: AlertModalService,
    private clienteService: ClientesService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private osService: OrdemdeServicoService,
    private location: Location,
  ) { }

  public isCollapsed = true;
  clientes: Clientes[];
  cliente = new Clientes();
  ordemServico = new FilterOsDto();
  osId: any;
  tipo: string;
  clienteId: any;
  formVeiculo: FormGroup;
  formCliente: FormGroup;
  formNewServico: FormGroup;
  formOrdemServico: FormGroup;
  marcaSelecionada: string;
  veiculoSelecionado: Automovel;
  servicos: any[] = [];
  servicosList: Servicos[] = []
  servicoSelected: any
  novoServico: string;
  novoValor: number;
  descricao: string;
  formServicos: FormGroup;
  kmatualValue: number;
  valorTotal: number = 0;
  servicosParaAlterar: FormArray;
  editarIndices: number[] = [];

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

    this.route.queryParams.subscribe((params) => {
      this.ordemServico.id = Number(params.osId);
      this.tipo = params.tipo;
    });
    this.osId = this.ordemServico.id

    this.osService.getOsById(this.osId).subscribe((response) => {
      this.ordemServico = response.data
      this.kmatualValue = response.data.manutecesServicos[0].kmatual;
      this.valorTotal = response.data.manutecesServicos.reduce((total, servico) => total + servico.valor, 0);
      console.log("OS", this.ordemServico)
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

    this.formOrdemServico = this.fb.group({
      servico: [null],
      valor: [null],
      KmAtual: [null],
      KmServico: [null],
      mediaKm: [null],
      observacoes: [null]
    });

    this.formNewServico = this.fb.group({
      cadastrarServico: [null],
    });

    this.osService.getServico().subscribe((response) => {
      this.servicosList = response.data
      console.log("Lista Serviços", this.servicosList)
    })

    this.formServicos = this.fb.group({
      servicosParaAlterar: this.fb.array([])
    });
    this.servicosParaAlterar = this.formServicos.get('servicosParaAlterar') as FormArray;

  }

  adicionarParaAlterar(servico: any) {
    // Crie um FormGroup para cada serviço que será adicionado
    const novoServicoFormGroup = {
      id: servico.id,
      nome: servico.nome,
      valor: servico.valor,
      kmServico: servico.kmservico,
      mediaKm: servico.mediakm,
      manutenceId: servico.manutenceId,
      kmAtual: servico.kmatual
    };

    this.enviarDadosAlterados(novoServicoFormGroup)
  }
  enviarDadosAlterados(dadosAlterados) {
    this.osService.updateServico(dadosAlterados).subscribe((data) => {
      window.location.reload();
      console.log(data)
    })
  }
  atualizarKmServico(servico: any, novoKmServico: any) {
    servico.kmservico = novoKmServico;
  }
  atualizarMediaKm(servico: any, novoValor: any) {
    servico.mediaKm = novoValor;
  }

  salvarNovoServico(servico) {
    const novoServicoFormGroup = {
      id: 0,
      nome: servico.nome,
      valor: servico.valor,
      kmServico: servico.kmServico,
      mediaKm: servico.mediaKm,
      manutenceId: this.osId,
      kmAtual: this.kmatualValue
    };
    console.log(novoServicoFormGroup)

    this.osService.addNovoServico(novoServicoFormGroup).subscribe((response) => {
      window.location.reload();
      console.log(response)
    })
  }

  editarOs() {
    const requestData = {
      id: this.osId,
      valorTotal: this.valorTotal,
      tipoDoc: "OrdemServico",
      observacoes: this.formOrdemServico.value.observacoes == null ? this.ordemServico.observacoes : this.formOrdemServico.value.observacoes
    };
    console.log("resquestData", requestData)

    this.osService.saveEditOrdemServico(requestData).subscribe((response) => {
      window.location.reload();
      console.log(response)
    })
  }
  gerarOrdemServico() {
    const valorTotal = this.calcularValorTotal();
    const ordemServicoData = {
      clientId: this.cliente.id,
      veiculoId: this.veiculoSelecionado.id,
      manutences: this.servicos.map(servico => {
        return {
          nome: servico.nome,
          kmServico: servico.kmServico,
          mediaKm: servico.mediaKm,
          kmatual: this.formOrdemServico.get('KmAtual')?.value == null ? 0 : this.formOrdemServico.get('KmAtual')?.value,
          valor: servico.valor,
        };
      }),
      observacoes: this.formOrdemServico.get('observacoes')?.value,
      valortotal: valorTotal,
      tipoDoc: "Orçamento"
    };
    console.log(ordemServicoData)
    const result$ = this.alertService.showConfirm(
      "Confirmação",
      "Deseja criar esse Orçamento?"
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result
            ? this.osService.createOrdemServico(ordemServicoData)
            : EMPTY
        )
      )
      .subscribe(
        (os) => {
          this.router.navigate(["orcamento"]);
        },
        (error) => console.error(error)
      );
  }



  gerarPDF() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('FERREIRA\'S AUTOMOTIVO', 10, 20);

    doc.setFontSize(12);
    doc.text('RUA FRAMBOESA - 23061-522 - (21)964169157', 10, 30);

    doc.setFontSize(14);
    doc.text('NOTA FISCAL', 10, 45);

    let yPos = 60;

    doc.setFontSize(12);
    doc.text(`Número da Nota Fiscal: ${this.ordemServico.id}`, 10, yPos);
    yPos += 10;
    doc.text(`Cliente: ${this.ordemServico.nome}`, 10, yPos);
    doc.text(`CPF: ${"this.ordemServico.clients"}`, 90, yPos);
    yPos += 10;
    doc.text(`Endereço: ${"this.ordemServico.clients.endereco"}`, 10, yPos);
    yPos += 10;

    doc.text(`Placa do Veículo: ${"this.ordemServico.automovels.placa"}`, 10, yPos);
    doc.text(`Marca: ${"this.ordemServico.automovels.marca"}`, 90, yPos);
    yPos += 10;
    doc.text(`Modelo: ${"this.ordemServico.automovels.modelo"}`, 10, yPos);
    doc.text(`Ano: ${"this.ordemServico.automovels.ano"}`, 90, yPos);
    yPos += 10;
    doc.text(`Cor: ${"this.ordemServico.automovels.cor"}`, 10, yPos);
    doc.text(`Km Atual: ${"this.ordemServico.automovels.km"}`, 90, yPos);
    yPos += 15;

    doc.text('Descrição do Serviço:', 10, yPos);
    yPos += 10;

    doc.setFont('courier', 'normal');
    doc.setFontSize(12);
    // const servicosFeitos = this.ordemServico.manutecesServicos.map(servico => `- ${servico.nome}: R$ ${servico.valor}`).join('\n');
    // doc.text(servicosFeitos, 10, yPos);
    yPos += 10;

    doc.setFontSize(14);
    doc.text(`Valor Total: R$ ${this.ordemServico.valorTotal}`, 10, yPos + 10);

    doc.setFontSize(10);
    doc.text('Agradecemos pela preferência!', 105, doc.internal.pageSize.getHeight() - 10);

    doc.save('nota-fiscal.pdf');
  }

  onSelectServico(event: any) {
    this.servicoSelected = event
    console.log("Servico Select", this.servicoSelected)
  }

  onSelectMarca(event: any) {
    this.marcaSelecionada = event;
    console.log('Marca selecionada:', this.marcaSelecionada);
    this.veiculoSelecionado = this.cliente.automoveis.find(automovel => automovel.marca === this.marcaSelecionada);

    if (this.veiculoSelecionado) {
      this.formVeiculo.patchValue({
        veiculoId: this.veiculoSelecionado.id,
        placa: this.veiculoSelecionado.placa,
        cor: this.veiculoSelecionado.cor,
        ano: this.veiculoSelecionado.ano,
        modelo: this.veiculoSelecionado.modelo,
        km: this.veiculoSelecionado.km,
      });
    }
  }

  cadastrarServico() {
    this.descricao = this.formNewServico.value.cadastrarServico
    const requestaData = {
      descricao: this.descricao
    }
    this.osService.cadastrarServico(requestaData).subscribe((response) => {
      console.log(response)
      window.location.reload()
    })
  }

  adicionarServico() {
    if (this.servicoSelected && this.novoValor) {
      const novoServico = { nome: this.servicoSelected, valor: this.novoValor };
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

  goBack() {
    this.location.back();
  }

  toggleEdicao(index: number) {
    if (this.editarIndices.indexOf(index) === -1) {
      this.editarIndices.push(index);
    } else {
      this.editarIndices.splice(this.editarIndices.indexOf(index), 1);
    }
  }

  salvarEdicao(index: number) {
    // Aqui você pode implementar a lógica para salvar as alterações do item específico.
    // Por exemplo, você pode acessar this.ordemServico.manutecesServicos[index] para obter o item atual.
    console.log("Salvando alterações para o item de índice:", index);
    this.toggleEdicao(index);
  }

}
