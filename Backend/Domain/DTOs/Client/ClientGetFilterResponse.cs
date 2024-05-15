using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Domain.DTOs.Client
{
    public class ClientGetFilterResponse
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string NumeroWhatsapp { get; set; }
        public string Email { get; set; }
    }
}
