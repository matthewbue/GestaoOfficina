using Microsoft.Extensions.Diagnostics.HealthChecks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Domain.DTO
{
    public class EntryFilterRelatorioDTO
    {
        public string Placa { get; set; }
        public string NomeCliente { get; set; }
        public int NumeroOS { get; set; }
        public string Status { get; set; }
        public string Tipo { get; set; }
        public DateTime? DataAberturaOS { get; set; }
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
        public DateTime? DataInicio { get; set; }
        public DateTime? DataFim { get; set; }
    }
}
