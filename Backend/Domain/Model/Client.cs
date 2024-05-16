using GestaoOfficinaProj.Domain.Model;
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
        public string Bairro { get; set; }
        public string Cidade { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Endereco { get; set; }
        public string Uf { get; set; }
        public string Nome {get; set;}
        public string NumeroWhatsapp { get; set; }
        public string Email { get; set; }
        public string NumeroContato { get; set; }
        public string CPF { get; set; }
        public List<Automovel> Automoveis { get; set; }

        [ForeignKey("Empresa")]
        public int EmpresaId { get; set; }
        public virtual Empresa Empresa { get; set; } 

    }
}
