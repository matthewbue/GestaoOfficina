using GestaoOfficina.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Domain.DTO
{
    public class ClientUpdateDTO
    {
        public int Id { get; set; }
        public string Bairro { get; set; }
        public string Cidade { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Endereco { get; set; }
        public string Uf { get; set; }
        public string Nome { get; set; }
        public string NumeroWhatsApp { get; set; }
        public string Email { get; set; }
        public string NumeroContato { get; set; }
        public string CPF { get; set; }
        public ICollection<Automovel> Automoveis { get; set; }
    }
}
