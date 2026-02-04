using GestaoOfficina.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Domain.DTO
{
    public class ConcluirOrcamentoDTO
    {
        public int ManutenceId { get; set; }
        public List<ManutenceServico> Servicos { get; set; }
        public double ValorTotal { get; set; }
        public string ObservacoesAdicionais { get; set; }
    }
}
