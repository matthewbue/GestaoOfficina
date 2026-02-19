using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel;

namespace GestaoOfficina.Domain.Enums
{
    /// <summary>
    /// Status do fluxo de orçamento e ordem de serviço
    /// Status 1-6: ORÇAMENTO (TipoDoc = "Orçamento")
    /// Status 7-8: ORDEM DE SERVIÇO (TipoDoc = "Ordem de Serviço")
    /// Status 9: REJEITADA
    /// </summary>
    public enum StatusOrcamentoEnum
    {
        [Description("Orçamento Iniciado")]
        OrcamentoIniciado = 1,
        
        [Description("Aguardando Fotos")]
        AguardandoFotos = 2,
        
        [Description("Em Diagnóstico")]
        EmDiagnostico = 3,
        
        [Description("Aguardando Preenchimento")]
        AguardandoPreenchimento = 4,
        
        [Description("Preenchendo Orçamento")]
        PreenchendoOrcamento = 5,
        
        [Description("Aguardando Aprovação")]
        AguardandoAprovacao = 6,
        
        [Description("Aprovado - Em Execução")]
        AprovadoEmExecucao = 7,
        
        [Description("Finalizada")]
        Finalizada = 8,
        
        [Description("Rejeitada")]
        Rejeitada = 9
    }
}
