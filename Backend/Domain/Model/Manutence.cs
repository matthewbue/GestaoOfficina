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

        // Novos campos para fluxo de orçamento
        public StatusOrcamentoEnum StatusOrcamento { get; set; }
        public string DiagnosticoMecanico { get; set; }
        public DateTime? DataDiagnostico { get; set; }
        public int? MecanicoId { get; set; } // ID do mecânico que fez o diagnóstico
        public int? OperadorCheckInId { get; set; } // ID do operador que fez o check-in
        public DateTime? DataCheckIn { get; set; }
        public int? OperadorOrcamentoId { get; set; } // ID do operador que criou o orçamento
        public DateTime? DataOrcamentoCriado { get; set; }

        [ForeignKey("Automovel")]
        public int AutomovelId { get; set; }
        public virtual Automovel Automovel { get; set; }
        public virtual List<ManutenceServico> ManutecesServicos { get; set; }
        public virtual List<OrcamentoFoto> Fotos { get; set; }
    }
}
