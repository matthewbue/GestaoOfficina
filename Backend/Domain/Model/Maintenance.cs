using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Domain.Model
{
    public class Maintenance
    {
        public int Id { get; set; }
        public string Cliente { get; set; }
        public string Carro { get; set; }
        public string Defeito { get; set; }
    }
}
