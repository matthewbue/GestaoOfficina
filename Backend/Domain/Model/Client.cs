using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Domain.Model
{
    public class Client
    {
        public int Id { get; set; }
        public string Name {get; set;}
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string CPF { get; set; }
        
        [ForeignKey("Automovel")]

        public int AutomovelId { get; set; }
        public virtual ICollection<Automovel> Automoveis { get; set; }
    }
}
