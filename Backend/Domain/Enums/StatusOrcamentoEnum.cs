using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Domain.Enums
{
    public enum StatusOrcamentoEnum
    {
        CheckIn = 1,
        CheckInVisual = 2,
        Diagnostico = 3,
        DiagnosticoCompleto = 4,
        CriandoOrcamento = 5,
        OrcamentoConcluido = 6,
        EmAndamento = 7,
        Concluida = 8,
        Cancelada = 9
    }
}
