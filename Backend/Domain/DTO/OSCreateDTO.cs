using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Domain.DTO
{
    public class OSCreateDTO
    {
        public string NomeServico { get; set; }
        public decimal Kmatual { get; set; }
        public decimal Kmservico { get; set; }
        public double Valor { get; set; }

        public decimal Mediakm { get; set; }
    }
}
