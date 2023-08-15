import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrdemdeServicoService } from 'app/ordemdeservico/ordemdeservico.service';

@Component({
  selector: 'app-gerar-relatorio-modal',
  templateUrl: './gerar-relatorio-modal.component.html',
  styleUrls: ['./gerar-relatorio-modal.component.scss']
})
export class GerarRelatorioModalComponent implements OnInit {
  confirmResult: any;
  formRelatorio: FormGroup;
  statusSelected: string;
  tipoSelected: string;


  constructor(
    private fb: FormBuilder,
    private osService: OrdemdeServicoService
  ) { }

  ngOnInit(): void {
    this.formRelatorio = this.fb.group({
      ordemNumero: null,
      nomeCliente: null,
      statusOs: null,
      dataInicial: null,
      dataFinal: null,
    })

  }

  onSelectStatus(selectedValue: string) {
    this.statusSelected =  selectedValue;
    console.log('status Selecionado:', this.statusSelected);
  }

  onSelectTipo(selectedValue: string) {
    this.tipoSelected = selectedValue;
    console.log('tipo Selecionado:', this.tipoSelected);
  }

  baixarRelatorio() {
    const requestRelatorio = {
      nomeCliente: this.formRelatorio.value.nomeCliente == null ? "" : this.formRelatorio.value.nomeCliente,
      statusOs: this.statusSelected == null ? "" : this.statusSelected,
      tipoDoc: this.tipoSelected == null ? "" : this.tipoSelected,
      dataInicial: this.formRelatorio.value.dataInicial == null ? "" : this.formRelatorio.value.dataInicial,
      dataFinal: this.formRelatorio.value.dataFinal == null ? "" : this.formRelatorio.value.dataFinal,
    }
    console.log(requestRelatorio)
    this.osService.getRelatorioFilter(requestRelatorio).subscribe((response) => {
      console.log(response)
    })
  }

limparFiltro(){
  this.formRelatorio.reset()
}

}
