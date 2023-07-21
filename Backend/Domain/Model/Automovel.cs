using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Domain.Model
{
    public class Automovel
    {
        [Key()]
        public int Id { get; set; }
        public string Marca { get; set; }
        public string Placa { get; set; }
        public string Cor { get; set; }
        public string Modelo { get; set; }
        public string Ano { get; set; }
        public string Km { get; set; }
        public int ClientId { get; set; }

        [ForeignKey("Manutence")]
        public int? ManutenceId { get; set; }
        public virtual ICollection<Manutence> Manutences { get; set; }
    }
}
