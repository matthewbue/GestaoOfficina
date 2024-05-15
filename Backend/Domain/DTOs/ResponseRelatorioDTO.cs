using GestaoOfficina.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Domain.DTO
{
    public class ResponseRelatorioDTO
    {
       public List<Manutence> Manutences { get; set; }
       public double ValorTotalRelatorio { get; set; }
       public double QuantidadesTotalDeItens { get; set; }
    }
}
