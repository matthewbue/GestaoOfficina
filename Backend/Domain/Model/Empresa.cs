using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Domain.Model
{
    [Table("Empresa")]
    public class Empresa
    {
        [Key]
        public int Id { get; set; }
        public string Nome { get; set; }
        public string? Endereco { get; set; }
        public string? Email { get; set; }

    }
}
