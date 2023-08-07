import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  descricao: string

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
  }

  gerarOrcamento() {
    const valorTotal = this.calcularValorTotal();
    const ordemServicoData = {
      clientId: this.cliente.id,
      veiculoId: this.veiculoSelecionado.id,
      manutences: this.servicos.map(servico => {
        return {
          nome: servico.nome,
          kmatual: this.formOrdemServico.get('KmAtual')?.value  == null ? 0 : this.formOrdemServico.get('KmAtual')?.value,
          kmservico: this.formOrdemServico.get('KmServico')?.value   == null ? 0 : this.formOrdemServico.get('KmServico')?.value,
          mediakm: this.formOrdemServico.get('mediaKm')?.value  == null ? 0 : this.formOrdemServico.get('mediaKm')?.value,
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
        placa: this.veiculoSelecionado.placa,
        cor: this.veiculoSelecionado.cor,
        ano: this.veiculoSelecionado.ano,
        modelo: this.veiculoSelecionado.modelo,
        km: this.veiculoSelecionado.km,
      });
    }
  }

  cadastrarServico(){
    this.descricao = this.formNewServico.value.cadastrarServico
    const requestaData = {
      descricao: this.descricao
    }
    this.osService.cadastrarServico(requestaData).subscribe((response)=>{
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

}
