using GestaoOfficina.Domain.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Domain.DTO
{
    public class ManutenceUpdateDTO
    {
        public int Id { get; set; }
        public double ValorTotal { get; set; }
        public string TipoDoc { get; set; }
        public string Observacoes { get; set; }
     
    }
}
