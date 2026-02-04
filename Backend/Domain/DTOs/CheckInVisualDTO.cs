using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Domain.DTO
{
    public class CheckInVisualDTO
    {
        public int ManutenceId { get; set; }
        public List<FotoUploadDTO> Fotos { get; set; }
    }

    public class FotoUploadDTO
    {
        public byte[] ImagemBytes { get; set; }
        public string NomeArquivo { get; set; }
        public string TipoImagem { get; set; }
        public string Descricao { get; set; }
    }
}
