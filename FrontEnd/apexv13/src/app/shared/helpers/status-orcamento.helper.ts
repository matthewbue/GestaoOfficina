import { StatusOrcamentoEnum } from '../Model/StatusOrcamentoEnum';

export class StatusOrcamentoHelper {
  
  static getDescricao(status: number): string {
    const descricoes = {
      [StatusOrcamentoEnum.OrcamentoIniciado]: 'Orçamento Iniciado',
      [StatusOrcamentoEnum.AguardandoFotos]: 'Aguardando Fotos do Aplicativo',
      [StatusOrcamentoEnum.EmDiagnostico]: 'Em Diagnóstico',
      [StatusOrcamentoEnum.AguardandoPreenchimento]: 'Aguardando Preenchimento',
      [StatusOrcamentoEnum.PreenchendoOrcamento]: 'Preenchendo Orçamento',
      [StatusOrcamentoEnum.AguardandoAprovacao]: 'Aguardando Aprovação do Cliente',
      [StatusOrcamentoEnum.AprovadoEmExecucao]: 'Aprovado - Em Execução',
      [StatusOrcamentoEnum.Finalizada]: 'Finalizada',
      [StatusOrcamentoEnum.Rejeitada]: 'Rejeitada pelo Cliente'
    };
    return descricoes[status] || 'Status Desconhecido';
  }

  static getCssClass(status: number): string {
    const classes = {
      [StatusOrcamentoEnum.OrcamentoIniciado]: 'badge-info',
      [StatusOrcamentoEnum.AguardandoFotos]: 'badge-warning',
      [StatusOrcamentoEnum.EmDiagnostico]: 'badge-primary',
      [StatusOrcamentoEnum.AguardandoPreenchimento]: 'badge-primary',
      [StatusOrcamentoEnum.PreenchendoOrcamento]: 'badge-secondary',
      [StatusOrcamentoEnum.AguardandoAprovacao]: 'badge-warning',
      [StatusOrcamentoEnum.AprovadoEmExecucao]: 'badge-info',
      [StatusOrcamentoEnum.Finalizada]: 'badge-success',
      [StatusOrcamentoEnum.Rejeitada]: 'badge-danger'
    };
    return classes[status] || 'badge-secondary';
  }

  static getIcon(status: number): string {
    const icons = {
      [StatusOrcamentoEnum.OrcamentoIniciado]: 'ft-log-in',
      [StatusOrcamentoEnum.AguardandoFotos]: 'ft-camera',
      [StatusOrcamentoEnum.EmDiagnostico]: 'ft-clipboard',
      [StatusOrcamentoEnum.AguardandoPreenchimento]: 'ft-check-circle',
      [StatusOrcamentoEnum.PreenchendoOrcamento]: 'ft-edit',
      [StatusOrcamentoEnum.AguardandoAprovacao]: 'ft-clock',
      [StatusOrcamentoEnum.AprovadoEmExecucao]: 'ft-activity',
      [StatusOrcamentoEnum.Finalizada]: 'ft-check',
      [StatusOrcamentoEnum.Rejeitada]: 'ft-x-circle'
    };
    return icons[status] || 'ft-help-circle';
  }

  static aguardandoFotosApp(status: number): boolean {
    return status === StatusOrcamentoEnum.AguardandoFotos;
  }

  static podeIniciarPreenchimento(status: number): boolean {
    return status === StatusOrcamentoEnum.AguardandoPreenchimento;
  }

  static podeEditarOrcamento(status: number): boolean {
    return status >= StatusOrcamentoEnum.PreenchendoOrcamento && 
           status <= StatusOrcamentoEnum.AguardandoAprovacao;
  }

  static podeEnviarParaAprovacao(status: number): boolean {
    return status === StatusOrcamentoEnum.PreenchendoOrcamento;
  }

  static podeAprovarOuRejeitar(status: number): boolean {
    return status === StatusOrcamentoEnum.AguardandoAprovacao;
  }

  static podeFinalizar(status: number): boolean {
    return status === StatusOrcamentoEnum.AguardandoAprovacao ||
           status === StatusOrcamentoEnum.AprovadoEmExecucao;
  }
}
