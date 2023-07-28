using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Domain.DTO
{
    public class AutomovelAddDTO
    {
       
        public string Marca { get; set; }
        public string Placa { get; set; }
        public string Cor { get; set; }
        public string Modelo { get; set; }
        public string Ano { get; set; }
        public string Km { get; set; }
        public int ClientId { get; set; }
    }
}
