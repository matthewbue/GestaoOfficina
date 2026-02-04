using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Domain.DTO
{
    public class CheckInDTO
    {
        public int ClientId { get; set; }
        public int VeiculoId { get; set; }
        public string Observacoes { get; set; }
        public int OperadorId { get; set; }
    }
}
