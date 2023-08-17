import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrdemdeServicoService } from 'app/ordemdeservico/ordemdeservico.service';
import jsPDF from 'jspdf';
import { AlertModalService } from '../services/alert-modal.service';


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
    private osService: OrdemdeServicoService,
    private alertService: AlertModalService,
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
    this.statusSelected = selectedValue;
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

    if (requestRelatorio.dataInicial == "" || requestRelatorio.dataFinal == "") {
        console.log("Escolha data Inicial e data Final para gerar o relatório!")
        this.alertService.showAlertDanger("Escolha data Inicial e data Final para gerar o relatório!");
        return;
    }

    this.osService.getRelatorioFilter(requestRelatorio).subscribe((response) => {
        const doc = new jsPDF();
        doc.setFont('courier', 'normal');
        doc.setTextColor(0, 0, 0);

        doc.setFontSize(18);
        doc.setFont('courier', 'bold');
        doc.text('FERREIRA\'S AUTOMOTIVO', 105, 20, { align: 'center' });
        doc.setFont('courier', 'normal');

        doc.setFontSize(12);
        doc.text('CNPJ: 20.388.818/0001-30', 105, 30, { align: 'center' });

        doc.setFontSize(12);
        doc.text('Rua Framboesa LOTE 1 QUADRA S - 23061-522 - (21)964169157', 105, 40, { align: 'center' });

        doc.setFontSize(14);
        doc.setFont('courier', 'bold');
        doc.text('RELATÓRIO', 105, 55, { align: 'center' });
        doc.setFont('courier', 'normal');

        let yPosValue = 70;
        let currentPage = 1;

        response.data.manutences.forEach((manutence, index) => {
            if (index > 0 && index % 2 === 0) {
                doc.addPage(); // Adicionar uma nova página a cada dois registros
                currentPage++;
                yPosValue = 40;
            }

            doc.setFontSize(12);
            doc.text(`Número da Ordem de Serviço: ${manutence.id}`, 20, yPosValue);
            yPosValue += 10;
            doc.text(`Data: ${manutence.dataOS}`, 20, yPosValue);
            yPosValue += 10;

            doc.text(`Cliente: ${manutence.clients.nome}`, 20, yPosValue);
            doc.text(`CPF: ${manutence.clients.cpf}`, 105, yPosValue);
            yPosValue += 10;

            doc.text(`Endereço: ${manutence.clients.endereco}`, 20, yPosValue);
            yPosValue += 15;

            doc.setFontSize(14);
            doc.setFont('courier', 'bold');
            doc.text('Informações do Veículo', 105, yPosValue, { align: 'center' });
            doc.setFont('courier', 'normal');
            yPosValue += 10;

            doc.setFontSize(12);
            doc.text(`Placa: ${manutence.automovels.placa}`, 20, yPosValue);
            doc.text(`Marca: ${manutence.automovels.marca}`, 80, yPosValue);
            doc.text(`Modelo: ${manutence.automovels.modelo}`, 140, yPosValue);
            yPosValue += 10;
            doc.text(`Ano: ${manutence.automovels.ano}`, 20, yPosValue);
            doc.text(`Cor: ${manutence.automovels.cor}`, 80, yPosValue);
            doc.text(`Km Atual: ${manutence.automovels.km}`, 140, yPosValue);
            yPosValue += 20;

            doc.setFontSize(14);
            doc.setFont('courier', 'bold');
            doc.text('Serviços Realizados', 105, yPosValue, { align: 'center' });
            doc.setFont('courier', 'normal');
            yPosValue += 10;

            doc.setFontSize(12);
            if (manutence.manutecesServicos) {
                const servicosFeitos = manutence.manutecesServicos.map(servico => `- ${servico.nome}: R$ ${servico.valor},00`).join('\n');
                doc.text(servicosFeitos, 20, yPosValue);
                yPosValue += doc.splitTextToSize(servicosFeitos, 160).length * 10 + 10;
            }

            doc.setFontSize(14);
            doc.text(`Observações: ${manutence.observacoes}`, 105, yPosValue, { align: 'center' });
            yPosValue += 20;

            doc.setFontSize(14);
            doc.text(`Valor Total: R$ ${manutence.valorTotal},00`, 105, yPosValue, { align: 'center' });
            yPosValue += 15;

            if (index < response.data.manutences.length - 1) {
                yPosValue += 20; // Espaço entre os registros
            }

            if (index === response.data.manutences.length - 1 && currentPage !== Math.ceil(response.data.manutences.length / 2)) {
                doc.addPage(); // Adicionar uma nova página para o último registro
                currentPage++;
                yPosValue = 40;
            }
        });

        doc.setFontSize(14);
        doc.text(`Valor Total Geral: R$ ${response.data.valorTotalRelatorio},00`, 105, doc.internal.pageSize.getHeight() - 15, { align: 'center' });

        doc.save('relatorio.pdf');
    });
}



  limparFiltro() {
    this.formRelatorio.reset()
  }

}
