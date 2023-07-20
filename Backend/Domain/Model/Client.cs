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
        public string bairro { get; set; }
        public string cidade { get; set; }
        public string dataNascimento { get; set; }
        public string endereco { get; set; }
        public string uf { get; set; }
        public string nomeCliente {get; set;}
        public string numeroWhatsapp { get; set; }
        public string Email { get; set; }
        public string telefoneContato { get; set; }
        public string CPFcpfCliente { get; set; }
        
        [ForeignKey("Automovel")]

        public int AutomovelId { get; set; }
        public virtual ICollection<Automovel> Automoveis { get; set; }
    }
}
