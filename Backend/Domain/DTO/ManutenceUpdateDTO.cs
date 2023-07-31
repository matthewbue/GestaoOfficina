using GestaoOfficina.Domain.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Domain.DTO
{
    public class ManutenceUpdateDTO
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Kmatual { get; set; }
        public string Kmservico { get; set; }
        public string Valor { get; set; }
        public int IdCarro { get; set; }
        
        public int ClientId { get; set; }
        
    }
}
