using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Domain.Model
{
    public class ReturnDefault
    {
        public string message {   get; set; }
        public object data { get; set; }

        public int totalPagina { get; set; }
        public int totalDados { get; set; }
        public int HttpStatusCode { get; set; } // Novo campo para armazenar o código de status HTTP

        public ReturnDefault(string message, object data, int httpStatusCode = 200)
        {
            this.message = message;
            this.data = data;
            this.HttpStatusCode = httpStatusCode;
        }
    }
}
