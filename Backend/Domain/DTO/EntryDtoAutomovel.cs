using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Domain.DTO
{
    public class EntryDtoAutomovel
    {
        public int Id { get; set; }
        public string marcaVeiculo { get; set; }
        public string placaVeiculo { get; set; }
        public string corVeiculo { get; set; }
        public string modeloVeiculo { get; set; }
        public string anoVeiculo { get; set; }
        public string kmVeiculo { get; set; }
    }
}
