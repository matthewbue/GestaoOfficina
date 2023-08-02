using GestaoOfficina.Domain.Model;
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
        public string NomeServico { get; set; }
        public string Kmatual { get; set; }
        public string Kmservico { get; set; }
        public string Valor { get; set; }
        public int IdCarro { get; set; }
        
        public int ClientId { get; set; }
        
    }
}
