using GestaoOfficina.Domain.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Domain.Model
{
    public class ManutenceServico
    {
        [Key()]
        public int ID { get; set; }
        public double Valor { get; set; }
        public string Nome { get; set; }
        public double Kmatual { get; set; }
        public double Kmservico { get; set; }
        public double Mediakm { get; set; }
        [ForeignKey("Manutence")]
        public int? ManutenceId { get; set; }
        public Manutence Manutence { get; set; }

    }
}
