using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Domain.Enums
{
    public enum StatusOrcamentoEnum
    {
        OrcamentoIniciado = 1,
        AguardandoFotos = 2,
        EmDiagnostico = 3,
        AguardandoPreenchimento = 4,
        PreenchendoOrcamento = 5,
        AguardandoAprovacao = 6,
        AprovadoEmExecucao = 7,
        Finalizada = 8,
        Rejeitada = 9
    }
}
