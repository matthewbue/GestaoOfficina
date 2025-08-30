import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from 'app/clientes/clientes.service';
import { Automovel } from 'app/shared/Model/Automovel';
import { Clientes } from 'app/shared/Model/Clientes';
import { Servicos } from 'app/shared/Model/Servicos';
import { FilterOsDto } from 'app/shared/Model/filterOsDto';
import { AlertModalService } from 'app/shared/services/alert-modal.service';
import { PDFCompanyInfo, PdfGeneratorService, PDFServiceOrder } from 'app/shared/services/pdf-generator.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EMPTY } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { OrdemdeServicoService } from '../ordemdeservico.service';

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
    private pdfGeneratorService: PdfGeneratorService
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
  isEdicaoAtiva: boolean = false;
  kmatualValue: number;
  valorTotal: any = null;
  manutencesServico = [];
  automovel: any;
  showLoading: boolean = false;
  servicoEditando: any = null;
  servicoEditandoTemp: any = null;

  ngOnInit(): void {
    this.valorTotal = this.calcularValorTotal();

    this.route.queryParams.subscribe((params) => {
      this.cliente.id = params.clienteId;
      this.tipo = params.tipo;
    });

    this.clienteService.getAllClient().subscribe((data) => {
      this.clientes = data.data;
    });

    this.clienteService.getClienteById(this.cliente.id).subscribe((data) => {
      this.cliente = data.data;
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
      this.automovel = response.data.automovel;
      this.cliente = response.data.automovel.client;
      this.valorTotal = response.data.manutecesServicos.reduce((total, servico) => total + servico.valor, 0);
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
    })
  }
  atualizarKmServico(servico: any, novoKmServico: any) {
    servico.kmservico = novoKmServico;
  }
  atualizarKmAtual(servico: any, novoKmAtual: any) {
    servico.kmatual = novoKmAtual;
  }
  atualizarNomeServico(servico: any, novoNomeServico: any) {
    servico.nome = novoNomeServico;
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

    this.osService.addNovoServico(novoServicoFormGroup).subscribe((response) => {
      window.location.reload();
    })
  }

  editarOs() {
    const requestData = {
      id: this.osId,
      valorTotal: this.valorTotal,
      tipoDoc: "OrdemServico",
      observacoes: this.formOrdemServico.value.observacoes == null ? this.ordemServico.observacoes : this.formOrdemServico.value.observacoes
    };

    this.osService.saveEditOrdemServico(requestData).subscribe((response) => {
      window.location.reload();
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
    this.showLoading = true;
    setTimeout(() => {
      this.gerarPDFInternal();
      this.showLoading = false;
    }, 100);
  }

  gerarPDFInternal() {
    // Company information
    const companyInfo: PDFCompanyInfo = {
      name: 'FERREIRA\'S AUTOMOTIVO',
      cnpj: '20.388.818/0001-30',
      address: 'Rua Framboesa LOTE 1 QUADRA S - 23061-522',
      phone: '(21) 964169157',
      logoPath: '../../../assets/img/logo-oficina-peb.png'
    };

    // Prepare service order data
    const orderData: PDFServiceOrder = {
      id: this.ordemServico.id,
      date: new Date(this.ordemServico.dataOS).toLocaleDateString('pt-BR'),
      type: 'OrdemServico',
      customer: {
        name: this.cliente.nome,
        cpf: this.cliente.cpf,
        address: this.cliente.endereco,
        phone: this.cliente.numeroWhatsapp,
        email: this.cliente.email
      },
      vehicle: {
        plate: this.automovel.placa,
        brand: this.automovel.marca,
        model: this.automovel.modelo,
        year: this.automovel.ano,
        color: this.automovel.cor,
        currentKm: this.manutencesServico.length > 0 ? this.manutencesServico[0].kmatual : ''
      },
      services: this.manutencesServico.map(servico => ({
        name: servico.nome,
        value: typeof servico.valor === 'string' ? parseFloat(servico.valor) || 0 : servico.valor || 0,
        description: servico.descricao || ''
      })),
      totalValue: typeof this.ordemServico.valorTotal === 'string' ? parseFloat(this.ordemServico.valorTotal) || 0 : this.ordemServico.valorTotal || 0,
      observations: this.ordemServico.observacoes,
      status: this.ordemServico.status
    };

    // Generate PDF using the new service
    this.pdfGeneratorService.generateServiceOrderPDF(orderData, companyInfo);
  }



  onSelectServico(event: any) {
    this.servicoSelected = event
  }

  onSelectMarca(event: any) {
    this.marcaSelecionada = event;
    this.veiculoSelecionado = this.cliente.automoveis.find(automovel => automovel.placa === this.marcaSelecionada);

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
      window.location.reload()
    })
  }

  adicionarServico() {
    const novoServico = { nome: this.novoServico, valor: this.novoValor };
    this.servicos.push(novoServico);
    this.novoServico = '';
    this.novoValor = null;
  }

  removerServico(servico: any) {
    const index = this.servicos.indexOf(servico);
    if (index !== -1) {
      this.servicos.splice(index, 1);
    }
  }

  atualizarServico(servico: any) {
    const index = this.servicos.indexOf(servico);
    if (index !== -1) {
      // Faça a lógica de atualização do serviço no servidor ou onde você estiver armazenando seus dados.
      // Use this.servicoEditandoTemp para obter os novos valores.
      const valorAnterior = this.servicos[index].valor;
      this.servicos[index].nome = this.servicoEditandoTemp.nome;
      this.servicos[index].valor = this.servicoEditandoTemp.valor;
      // Atualize valorTotal subtraindo o valor anterior do serviço e adicionando o novo valor.
      this.valorTotal = this.valorTotal - valorAnterior + this.servicoEditandoTemp.valor;
      // Depois de atualizar o serviço, defina servicoEditando de volta para null para encerrar o modo de edição.
      this.servicoEditando = null;
    }
  }

  deleteManutence(id) {
    const result$ = this.alertService.showConfirm(
      "Confirmação",
      "Deseja realmente excluir este serviço?"
    );

    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result
            ? this.osService.deleteServico(id)
            : EMPTY
        )
      )
      .subscribe(
        (data) => {
          if (data.data == "sucesso") {
            this.alertService.showAlertSuccess(data.message);
            location.reload();
          } else {
            this.alertService.showAlertDanger("Erro ao deletar serviço");
          }
        },
        (error) => {
          this.alertService.showAlertDanger("Erro ao excluir serviço!");
          console.error(error);
        }
      );
  }

  cancelarEdicao(servico: any) {
    // Restaure os valores originais do serviço e encerre o modo de edição.
    this.servicoEditandoTemp = null;
    this.servicoEditando = null;
  }

  editarServico(servico: any) {
    this.servicoEditando = servico;
    this.servicoEditandoTemp = { ...servico };
  }

  calcularValorTotal(): number {
    return this.servicos.reduce((total, servico) => total + servico.valor, 0);
  }

  goBack() {
    this.location.back();
  }

  toggleEdicao(index: number) {
    if (this.editarIndices.indexOf(index) === -1) {
      // Se o botão de alterar foi clicado para editar
      this.editarIndices.push(index);
      this.isEdicaoAtiva = true; // Defina a variável para verdadeira quando a edição começar
    } else {
      // Se o botão de cancelar foi clicado para sair da edição
      this.editarIndices.splice(this.editarIndices.indexOf(index), 1);
      this.isEdicaoAtiva = false; // Defina a variável para falsa quando a edição for cancelada
    }
  }

  salvarEdicao(index: number) {
    // Aqui você pode implementar a lógica para salvar as alterações do item específico.
    // Por exemplo, você pode acessar this.ordemServico.manutecesServicos[index] para obter o item atual.
    this.toggleEdicao(index);
  }
}
