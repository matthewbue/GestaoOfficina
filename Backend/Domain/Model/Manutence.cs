using GestaoOfficinaProj.Domain.Model;
using System;
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
        public double ValorTotal { get; set; }
        public string Observacoes { get; set; }
        public string Status { get; set; }
        public DateTime DataOS { get; set; }
        public string TipoDoc { get; set; }

        [ForeignKey("Automovel")]
        public int AutomovelId { get; set; }
        public virtual Automovel automovels { get; set; }

        [ForeignKey("Client")]
        public int ClientId { get; set; }
        public virtual Client Clients { get; set; }

        [ForeignKey("ManutenceServico")]
        public int ManutenceServicoId { get; set; }
        public virtual ICollection<ManutenceServico> ManutecesServicos { get; set; }
    }
}
