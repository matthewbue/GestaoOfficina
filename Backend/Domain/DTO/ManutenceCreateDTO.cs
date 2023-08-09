using GestaoOfficina.Domain.Model;
using GestaoOfficinaProj.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Domain.DTO
{
    public class ManutenceCreateDTO
    {
        public int Clientid { get; set; }

        public int Veiculoid { get; set; }
        public ICollection<ManutenceServico> manutences { get; set; } 

        public double ValorTotal { get; set; }
        public string Observacoes { get; set; }
        public string TipoDoc { get; set; }

    }
}
