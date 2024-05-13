using GestaoOfficinaProj.Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Domain.Model
{
    [Table("User")]
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ProfileEnum Profile { get; set; }

        [ForeignKey("Client")]
        public int? ClientId { get; set; }

        [ForeignKey("Empresa")]
        public int? EmpresaId {get; set; }
        public string CPF { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
