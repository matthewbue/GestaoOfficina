﻿using GestaoOfficina.Domain.Model;
using GestaoOfficinaProj.Domain.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Domain.DTO
{
    public class ManutenceUpdateServicoDTO
    {
        public int ID { get; set; }
        public double Valor { get; set; }
        public string Nome { get; set; }
        public double Kmatual { get; set; }
        public double Kmservico { get; set; }
        public double Mediakm { get; set; }
        public int? ManutenceId { get; set; }
    }
}