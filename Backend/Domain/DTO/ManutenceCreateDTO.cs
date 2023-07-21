using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Domain.DTO
{
    public class ManutenceCreateDTO
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public string Defeito { get; set; }
        public string Produto { get; set; }
        public string KMAtual { get; set; }
        public string Valor { get; set; }
        public int IdCarro { get; set; }
        public int ClientId { get; set; }
    }
}
