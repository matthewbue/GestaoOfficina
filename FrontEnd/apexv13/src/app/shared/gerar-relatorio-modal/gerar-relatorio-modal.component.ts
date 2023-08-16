import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrdemdeServicoService } from 'app/ordemdeservico/ordemdeservico.service';
import jsPDF from 'jspdf';


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
    this.statusSelected = selectedValue;
    console.log('status Selecionado:', this.statusSelected);
  }

  onSelectTipo(selectedValue: string) {
    this.tipoSelected = selectedValue;
    console.log('tipo Selecionado:', this.tipoSelected);
  }

  baixarRelatorio() {
    if (this.formRelatorio.value.dataInicial != "" && this.formRelatorio.value.dataFinal != "") {

      const requestRelatorio = {
        nomeCliente: this.formRelatorio.value.nomeCliente == null ? "" : this.formRelatorio.value.nomeCliente,
        statusOs: this.statusSelected == null ? "" : this.statusSelected,
        tipoDoc: this.tipoSelected == null ? "" : this.tipoSelected,
        dataInicial: this.formRelatorio.value.dataInicial == null ? new Date : this.formRelatorio.value.dataInicial,
        dataFinal: this.formRelatorio.value.dataFinal == null ? new Date : this.formRelatorio.value.dataFinal,
      }
      console.log(requestRelatorio)
      this.osService.getRelatorioFilter(requestRelatorio).subscribe((response) => {
        console.log(response)

        const doc = new jsPDF();

        // // Adicione a imagem como marca d'água
        // const imgData = '../../../assets/img/logo-oficina-peb.png';
        // const imgWidth = 150; // Largura da imagem (ajuste conforme necessário)
        // const imgHeight = (imgWidth * 1.41); // Proporção de aspecto da imagem (ajuste conforme necessário)
        // const xPos = (doc.internal.pageSize.getWidth() - imgWidth) / 2; // Posição horizontal central
        // const yPos = (doc.internal.pageSize.getHeight() - imgHeight) / 2; // Posição vertical central
        // doc.addImage(imgData, 'PNG', xPos, yPos, imgWidth, imgHeight, '', 'FAST', 0.1); // Ajuste o valor de transparência (0.1 neste caso)

        doc.setFont('courier', 'normal'); // Defina a fonte padrão
        doc.setTextColor(0, 0, 0); // Defina a cor do texto (preto)

        doc.setFontSize(18);
        doc.setFont('courier', 'bold');
        doc.text('FERREIRA\'S AUTOMOTIVO', 105, 20, { align: 'center' });
        doc.setFont('courier', 'normal'); // Voltar à fonte normal

        doc.setFontSize(12);
        doc.text('CNPJ: 20.388.818/0001-30', 105, 30, { align: 'center' }); // Adicione o campo CNPJ aqui

        doc.setFontSize(12);
        doc.text('Rua Framboesa LOTE 1 QUADRA S - 23061-522 - (21)964169157', 105, 40, { align: 'center' });

        doc.setFontSize(14);
        doc.setFont('courier', 'bold');
        doc.text('RELATÓRIO', 105, 55, { align: 'center' });
        doc.setFont('courier', 'normal'); // Voltar à fonte normal

        let yPosValue = 70;

        doc.setFontSize(12);
        doc.text(`Número da Ordem de Serviço: ${"this.ordemServico.id"}`, 20, yPosValue);
        yPosValue += 10;
        doc.text(`Data: ${"this.ordemServico.dataOS"}`, 20, yPosValue);
        yPosValue += 10;

        doc.text(`Cliente: ${"this.cliente.nome"}`, 20, yPosValue);
        doc.text(`CPF: ${"this.cliente.cpf"}`, 105, yPosValue);
        yPosValue += 10;

        doc.text(`Endereço: ${"this.cliente.endereco"}`, 20, yPosValue);
        yPosValue += 15;

        doc.setFontSize(14);
        doc.setFont('courier', 'bold');
        doc.text('Informações do Veículo', 105, yPosValue, { align: 'center' });
        doc.setFont('courier', 'normal'); // Voltar à fonte normal

        yPosValue += 10;
        doc.setFontSize(12);
        doc.text(`Placa: ${"this.automovel.placa"}`, 20, yPosValue);
        doc.text(`Marca: ${"this.automovel.marca"}`, 80, yPosValue);
        doc.text(`Modelo: ${"this.automovel.modelo"}`, 140, yPosValue);
        yPosValue += 10;
        doc.text(`Ano: ${"this.automovel.ano"}`, 20, yPosValue);
        doc.text(`Cor: ${"this.automovel.cor"}`, 80, yPosValue);
        doc.text(`Km Atual: ${"this.automovel.km"}`, 140, yPosValue);
        yPosValue += 15;

        doc.setFontSize(14);
        doc.setFont('courier', 'bold');
        doc.text('Serviços Realizados', 105, yPosValue, { align: 'center' });
        doc.setFont('courier', 'normal'); // Voltar à fonte normal
        yPosValue += 10;

        doc.setFontSize(12);
        // const servicosFeitos = this.manutencesServico.map(servico => `- ${servico.nome}: R$ ${servico.valor},00`).join('\n');
        // doc.text(servicosFeitos, 20, yPosValue);
        yPosValue += 10;

        doc.setFontSize(14);
        doc.setFont('courier', 'bold');
        doc.text('Observações', 105, yPosValue, { align: 'center' });
        doc.setFont('courier', 'normal'); // Voltar à fonte normal

        yPosValue += 10;

        doc.setFontSize(12);
        doc.text(`${"this.ordemServico.observacoes"}`, 20, yPosValue);
        yPosValue += 10;

        doc.setFontSize(14);
        doc.text(`Valor Total: R$ ${"this.ordemServico.valorTotal"},00`, 105, yPosValue + 10, { align: 'center' });

        // Adicione campos de assinatura
        yPosValue += 50; // Espaço entre o texto e as assinaturas

        doc.setFontSize(12);
        const assinaturaClienteY = yPosValue;
        doc.text('Assinatura do Cliente:', 20, assinaturaClienteY);
        doc.line(20, assinaturaClienteY + 10, 100, assinaturaClienteY + 10); // Linha para assinatura do cliente

        const assinaturaResponsavelY = yPosValue;
        doc.text('Assinatura do Responsável:', 105, assinaturaResponsavelY);
        doc.line(105, assinaturaResponsavelY + 10, 200, assinaturaResponsavelY + 10); // Linha para assinatura do responsável

        doc.setFontSize(10);
        doc.text('Agradecemos pela preferência!', 105, doc.internal.pageSize.getHeight() - 15, { align: 'center' });

        // Adicione a frase adicional
        doc.setFontSize(10);
        doc.text('Nunca foi sorte, sempre foi Deus!', 105, doc.internal.pageSize.getHeight() - 10, { align: 'center' });

        doc.save('relatorio.pdf');

      })

    }
    else {
      console.log("Preecha uma data válida")
    }




  }

  limparFiltro() {
    this.formRelatorio.reset()
  }

}
