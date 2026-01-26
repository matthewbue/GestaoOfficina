using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Domain.Model
{
    [Table("Empresa")]
    public class Empresa
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string? Endereco { get; set; }
        public string? Email { get; set; }

    }
}
