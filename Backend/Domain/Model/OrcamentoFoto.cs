using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Domain.Model
{
    public class OrcamentoFoto
    {
        [Key]
        public int Id { get; set; }
        
        public byte[] ImagemBytes { get; set; }
        
        public string NomeArquivo { get; set; }
        
        public string TipoImagem { get; set; } // jpeg, png, etc
        
        public DateTime DataUpload { get; set; }
        
        public string Descricao { get; set; }
        
        [ForeignKey("Manutence")]
        public int ManutenceId { get; set; }
        
        public virtual Manutence Manutence { get; set; }
    }
}
