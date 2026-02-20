using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace GestaoOfficina.Domain.Model
{
    public class ReturnDefault
    {
        public string message { get; set; }
        public object data { get; set; }
        public int totalPagina { get; set; }
        public int totalDados { get; set; }
        
        public int httpStatusCode { get; set; }
        
        [JsonIgnore]
        public int HttpStatusCode 
        { 
            get => httpStatusCode;
            set => httpStatusCode = value;
        }

        public ReturnDefault(string message, object data, int httpStatusCode = 200)
        {
            this.message = message;
            this.data = data;
            this.httpStatusCode = httpStatusCode;
        }
        
        // ✅ Construtor sem httpStatusCode para compatibilidade
        public ReturnDefault(string message, object data)
        {
            this.message = message;
            this.data = data;
            this.httpStatusCode = 200;
        }
    }
}
