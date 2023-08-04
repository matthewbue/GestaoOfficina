using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Domain.Model
{
    [Table("Servico")]
    public class Servico
    { 
        public int Id { get; set; }
        public string Descricao { get; set; }
    }
}
