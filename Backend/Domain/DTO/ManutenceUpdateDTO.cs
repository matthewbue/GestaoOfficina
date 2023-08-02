﻿using GestaoOfficina.Domain.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Domain.DTO
{
    public class ManutenceUpdateDTO
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Kmatual { get; set; }
        public string Kmservico { get; set; }
        public string Valor { get; set; }
        public string Mediakm { get; set; }
        public int Clientid { get; set; }
        public int Veiculoid { get; set; }
        public string Observacoes { get; set; }
    }
}
