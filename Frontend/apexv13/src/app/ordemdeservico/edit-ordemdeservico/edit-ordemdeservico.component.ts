import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from 'app/clientes/clientes.service';
import { Automovel } from 'app/shared/Model/Automovel';
import { Clientes } from 'app/shared/Model/Clientes';
import { AlertModalService } from 'app/shared/services/alert-modal.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { OrdemdeServicoService } from '../ordemdeservico.service';
import { switchMap, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { FilterOsDto } from 'app/shared/Model/filterOsDto';
import { Location } from '@angular/common';
import { Servicos } from 'app/shared/Model/Servicos';
import jsPDF from 'jspdf';


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
    private osService: OrdemdeServicoService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
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
  descricao: string
  formServicos: FormGroup;
  servicosParaAlterar: FormArray;
  editarCampos: boolean = false;
  editarIndices: number[] = [];
  kmatualValue: number;
  valorTotal: number = 0;
  manutencesServico = [];
  automovel: any;
  showLoading: boolean = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.cliente.id = params.clienteId;
      this.tipo = params.tipo;
      console.log(params.clienteId)
    });

    this.clienteService.getAllClient().subscribe((data) => {
      this.clientes = data.data;
      console.log(data);
    });


    this.clienteService.getClienteById(this.cliente.id).subscribe((data) => {
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
      this.manutencesServico = response.data.manutecesServicos;
      this.automovel = response.data.automovels
      this.valorTotal = response.data.manutecesServicos.reduce((total, servico) => total + servico.valor, 0);
      console.log("OS", this.ordemServico)
      console.log("MANUT", this.manutencesServico)
      console.log("AUTO", this.automovel)

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
    // Verificar se todos os campos obrigatórios foram preenchidos
    if (
      this.cliente &&
      this.veiculoSelecionado &&
      this.servicos.length > 0 &&
      this.formOrdemServico.get('KmAtual')?.value !== null &&
      this.formOrdemServico.get('observacoes')?.value
    ) {
      const valorTotal = this.calcularValorTotal();
      const ordemServicoData = {
        clientId: this.cliente.id,
        veiculoId: this.veiculoSelecionado.id,
        manutences: this.servicos.map(servico => {
          return {
            nome: servico.nome,
            kmServico: servico.kmServico,
            mediaKm: servico.mediaKm,
            kmatual: this.formOrdemServico.get('KmAtual')?.value,
            valor: servico.valor,
          };
        }),
        observacoes: this.formOrdemServico.get('observacoes')?.value,
        valortotal: valorTotal,
        tipoDoc: "OrdemServico"
      };

      console.log(ordemServicoData);

      const result$ = this.alertService.showConfirm(
        "Confirmação",
        "Deseja criar essa Ordem de Serviço?"
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
            this.router.navigate(["ordemdeservico"]);
          },
          (error) => console.error(error)
        );
    } else {
      this.alertService.showAlertDanger("Preencha todos os campos.");
    }
  }


  gerarPDF() {
    const doc = new jsPDF();

    // Adicione a imagem como marca d'água
    const imgData = '../../../assets/img/logo-oficina-peb.png';
    const imgWidth = 150;
    const imgHeight = imgWidth * 1.41;
    const xPos = (doc.internal.pageSize.getWidth() - imgWidth) / 2;
    const yPos = (doc.internal.pageSize.getHeight() - imgHeight) / 2;
    doc.addImage(imgData, 'PNG', xPos, yPos, imgWidth, imgHeight, '', 'FAST', 0.1);

    doc.setFont('courier', 'normal');
    doc.setTextColor(0, 0, 0);

    doc.setFontSize(18);
    doc.setFont('courier', 'bold');
    doc.text('FERREIRA\'S AUTOMOTIVO', 105, 15, { align: 'center' });
    doc.setFont('courier', 'normal');

    doc.setFontSize(12);
    doc.text('CNPJ: 20.388.818/0001-30', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.text('Rua Framboesa LOTE 1 QUADRA S - 23061-522 - (21)964169157', 105, 25, { align: 'center' });

    doc.setFontSize(14);
    doc.setFont('courier', 'bold');
    doc.text('ORDEM DE SERVIÇO', 105, 30, { align: 'center' });
    doc.setFont('courier', 'normal');

    let yPosValue = 40;

    doc.setFontSize(12);
    doc.text(`Ordem de Serviço Nº: ${this.ordemServico.id}`, 20, yPosValue);
    yPosValue += 5;
    const dataFormatada = new Date(this.ordemServico.dataOS).toLocaleDateString('pt-BR');
    doc.text(`Data: ${dataFormatada}`, 20, yPosValue);
    yPosValue += 5;

    doc.text(`Cliente: ${this.cliente.nome}`, 20, yPosValue);
    doc.text(`CPF: ${this.cliente.cpf}`, 105, yPosValue);
    yPosValue += 5;

    doc.text(`Endereço: ${this.cliente.endereco}`, 20, yPosValue);
    yPosValue += 10;

    doc.setFontSize(14);
    doc.setFont('courier', 'bold');
    doc.text('Informações do Veículo', 105, yPosValue, { align: 'center' });
    doc.setFont('courier', 'normal');

    yPosValue += 10;
    doc.setFontSize(12);
    doc.text(`Placa: ${this.automovel.placa}`, 20, yPosValue);
    doc.text(`Marca: ${this.automovel.marca}`, 80, yPosValue);
    doc.text(`Modelo: ${this.automovel.modelo}`, 140, yPosValue);
    yPosValue += 5;
    doc.text(`Ano: ${this.automovel.ano}`, 20, yPosValue);
    doc.text(`Cor: ${this.automovel.cor}`, 80, yPosValue);
    doc.text(`Km Atual: ${this.automovel.km}`, 140, yPosValue);
    yPosValue += 10;

    doc.setFontSize(14);
    doc.setFont('courier', 'bold');
    doc.text('Serviços Realizados', 105, yPosValue, { align: 'center' });
    doc.setFont('courier', 'normal');

    yPosValue += 10;

    doc.setFontSize(12);
    const servicosFeitos = this.manutencesServico.map(servico => `- ${servico.nome}: R$ ${servico.valor},00`).join('\n');
    doc.text(servicosFeitos, 20, yPosValue);
    yPosValue += 60;

    doc.setFontSize(14);
    doc.setFont('courier', 'bold');
    doc.text('Observações', 105, yPosValue, { align: 'center' });
    doc.setFont('courier', 'normal');

    yPosValue += 5;

    doc.setFontSize(12);
    const xPosObservacoes = 20;
    doc.text(`${this.ordemServico.observacoes}`, xPosObservacoes, yPosValue);
    yPosValue += 20;

    doc.setFontSize(14);
    doc.text(`Valor Total: R$ ${this.ordemServico.valorTotal},00`, 105, yPosValue + 10, { align: 'center' });
    yPosValue = doc.internal.pageSize.getHeight() - 50;

    doc.setFontSize(14);
    const xPosAssinatura = 105;

    // Adicione campos de assinatura
    doc.setFontSize(12);
    const assinaturaClienteY = 235;
    const xPosAssinaturaCliente = 20;
    doc.text('Assinatura do Cliente:', xPosAssinaturaCliente, assinaturaClienteY);
    doc.line(xPosAssinaturaCliente, assinaturaClienteY + 10, xPosAssinaturaCliente + 80, assinaturaClienteY + 10);

    const assinaturaResponsavelY = 235;
    const xPosAssinaturaResponsavel = 105;
    doc.text('Assinatura do Responsável:', xPosAssinaturaResponsavel, assinaturaResponsavelY);
    doc.line(xPosAssinaturaResponsavel, assinaturaResponsavelY + 10, xPosAssinaturaResponsavel + 95, assinaturaResponsavelY + 10);

    doc.setFontSize(10);
    doc.text('Agradecemos pela preferência!', 105, doc.internal.pageSize.getHeight() - 25, { align: 'center' });

    doc.setFontSize(10);
    doc.text('Nunca foi sorte, sempre foi Deus!', 105, doc.internal.pageSize.getHeight() - 20, { align: 'center' });

    doc.save(`Ordem de Serviço - Nº - ${this.ordemServico.id}.pdf`);
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
