using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Domain.Model
{
    [Table("OrcamentoFotos")]
    public class OrcamentoFoto
    {
        [Key]
        public int Id { get; set; }
        
        public byte[] ImagemBytes { get; set; }
        
        [StringLength(500)]
        public string NomeArquivo { get; set; }
        
        [StringLength(50)]
        public string TipoImagem { get; set; } // jpeg, png, etc
        
        public DateTime DataUpload { get; set; }
        
        public string Descricao { get; set; }
        
        [ForeignKey("Manutence")]
        public int ManutenceId { get; set; }
        
        public virtual Manutence Manutence { get; set; }
        
        // === HELPERS (Não mapeados no banco) ===
        
        /// <summary>
        /// Retorna a imagem em Base64
        /// </summary>
        [NotMapped]
        public string ImagemBase64 => ImagemBytes != null && ImagemBytes.Length > 0 
            ? Convert.ToBase64String(ImagemBytes) 
            : null;
        
        /// <summary>
        /// Retorna URL de data para usar em HTML/img src
        /// </summary>
        [NotMapped]
        public string ImagemDataUrl => !string.IsNullOrEmpty(ImagemBase64) 
            ? $"data:{TipoImagem};base64,{ImagemBase64}" 
            : null;
        
        /// <summary>
        /// Tamanho da imagem em KB
        /// </summary>
        [NotMapped]
        public double TamanhoKB => ImagemBytes != null 
            ? ImagemBytes.Length / 1024.0 
            : 0;
        
        /// <summary>
        /// Tamanho da imagem formatado (ex: "2.5 MB")
        /// </summary>
        [NotMapped]
        public string TamanhoFormatado
        {
            get
            {
                if (ImagemBytes == null) return "0 KB";
                
                double tamanho = ImagemBytes.Length;
                string[] unidades = { "B", "KB", "MB", "GB" };
                int unidadeIndex = 0;
                
                while (tamanho >= 1024 && unidadeIndex < unidades.Length - 1)
                {
                    tamanho /= 1024;
                    unidadeIndex++;
                }
                
                return $"{tamanho:F2} {unidades[unidadeIndex]}";
            }
        }
    }
}
