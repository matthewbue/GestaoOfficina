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
        public string Nome { get; set; }
        public string Kmatual { get; set; }
        public string Kmservico { get; set; }
        public string Valor { get; set; }

        [ForeignKey("Automovel")]
        public int IdCarro { get; set; }
        public virtual ICollection<Automovel> Automovels { get; set; }

        [ForeignKey("Client")]
        public int ClientId { get; set; }
        public virtual ICollection<Client> Clients { get; set; }
    }
}
