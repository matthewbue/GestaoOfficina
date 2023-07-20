using GestaoOfficina.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Domain.DTO
{
    public class ClientCreateDTO
    {
        public int Id { get; set; }
        public string bairro { get; set; }
        public string cidade { get; set; }
        public string dataNascimento { get; set; }
        public string endereco { get; set; }
        public string uf { get; set; }
        public string nomeCliente { get; set; }
        public string numeroWhatsapp { get; set; }
        public string Email { get; set; }
        public string telefoneContato { get; set; }
        public string CPFcpfCliente { get; set; }
        public ICollection<Automovel> automovel { get; set; }
    }
}
