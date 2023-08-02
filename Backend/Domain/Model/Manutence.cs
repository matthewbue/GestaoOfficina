﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Domain.Model
{
    public class Manutence
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public decimal Kmatual { get; set; }
        public decimal Kmservico { get; set; }
        public double Valor { get; set; }
        public double ValorTotal { get; set; }
        public decimal Mediakm { get; set;}
        public string Observacoes { get; set; }
        public string Status { get; set; }
        public DateTime DataOS { get; set; }

        [ForeignKey("Automovel")]
        public int IdCarro { get; set; }
        public virtual Automovel automovels { get; set; }

        [ForeignKey("Client")]
        public int ClientId { get; set; }
        public virtual Client Clients { get; set; }
    }
}
