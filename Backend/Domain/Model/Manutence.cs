using GestaoOfficina.Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Domain.Model
{
    public class Manutence
    {
        public int Id { get; set; }
        public double ValorTotal { get; set; }
        public string Observacoes { get; set; }
        public string Status { get; set; }
        public DateTime DataOS { get; set; }
        public string TipoDoc { get; set; }

        // === CAMPOS PARA FLUXO DE ORÇAMENTO ===
        
        // Controle de Status
        public StatusOrcamentoEnum StatusOrcamento { get; set; }
        
        // Rastreabilidade - Check-in
        public int? OperadorCheckInId { get; set; }
        public DateTime? DataCheckIn { get; set; }
        
        // Rastreabilidade - Diagnóstico
        public int? MecanicoId { get; set; }
        public DateTime? DataDiagnostico { get; set; }
        public string DiagnosticoMecanico { get; set; }
        
        // Rastreabilidade - Orçamento
        public int? OperadorOrcamentoId { get; set; }
        public DateTime? DataOrcamentoCriado { get; set; }
        
        // ✅ NOVO: Aprovação do Cliente
        public bool? ClienteAprovado { get; set; }
        public DateTime? DataAprovacao { get; set; }
        public string MotivoRecusa { get; set; }
        
        // ✅ NOVO: Execução da OS
        public DateTime? DataInicioExecucao { get; set; }
        public DateTime? DataConclusao { get; set; }
        public double? ValorOrcado { get; set; }
        public double? ValorFinal { get; set; }

        [ForeignKey("Automovel")]
        public int AutomovelId { get; set; }
        public virtual Automovel Automovel { get; set; }
        public virtual List<ManutenceServico> ManutecesServicos { get; set; }
        public virtual List<OrcamentoFoto> Fotos { get; set; }
        
        // === HELPERS (Não mapeados no banco) ===
        
        [NotMapped]
        public bool EhOrcamento => StatusOrcamento >= StatusOrcamentoEnum.OrcamentoIniciado && 
                                    StatusOrcamento <= StatusOrcamentoEnum.AguardandoAprovacao;
        
        [NotMapped]
        public bool EhOrdemServico => StatusOrcamento >= StatusOrcamentoEnum.AprovadoEmExecucao && 
                                       StatusOrcamento <= StatusOrcamentoEnum.Finalizada;
        
        [NotMapped]
        public bool EstaRejeitada => StatusOrcamento == StatusOrcamentoEnum.Rejeitada;
        
        [NotMapped]
        public bool PodeSerEditado => StatusOrcamento < StatusOrcamentoEnum.AprovadoEmExecucao && 
                                       !EstaRejeitada;
        
        [NotMapped]
        public bool PodeSerAprovado => StatusOrcamento == StatusOrcamentoEnum.AguardandoAprovacao;
        
        [NotMapped]
        public bool PodeSerRejeitado => StatusOrcamento <= StatusOrcamentoEnum.AguardandoAprovacao && 
                                         !EstaRejeitada;
        
        [NotMapped]
        public bool PodeSerFinalizada => StatusOrcamento == StatusOrcamentoEnum.AprovadoEmExecucao;
        
        [NotMapped]
        public string TipoDocDescricao => EhOrcamento ? "Orçamento" : 
                                          EhOrdemServico ? "Ordem de Serviço" : 
                                          "Rejeitada";
    }
}
