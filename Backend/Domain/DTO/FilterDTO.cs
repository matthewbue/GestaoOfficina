using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Domain.DTO
{
    public class ClientFilterDTO
    {
        public string Placa { get; set; }
        public string NomeCliente { get; set; }
        public string CPF { get; set; }
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }

    }

    public class OSFilterDTO
    {
        public string Placa { get; set; }
        public string NomeCliente { get; set; }
        public int NumeroOS { get; set; }
        public DateTime? DataAberturaOS { get; set; }
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }

    }
}
