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
        public double Kmatual { get; set; }
        public double Kmservico { get; set; }
        public double Valor { get; set; }

        public double Mediakm { get; set; }
    }
}
