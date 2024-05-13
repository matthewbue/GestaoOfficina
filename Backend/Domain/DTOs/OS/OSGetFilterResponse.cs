using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Domain.DTOs.OS
{
    public class OSGetFilterResponse
    {
        public int Id { get; set; }
        public string NomeCliente { get; set; }
        public string Veiculo { get; set; }
        public string Placa { get; set; }
        public string Status { get; set; }
    }
}
