using System.ComponentModel.DataAnnotations;

namespace GestaoOfficina.Domain.DTO
{
    /// <summary>
    /// DTO para habilitar captura de fotos
    /// </summary>
    public class HabilitarFotosDTO
    {
        [Required(ErrorMessage = "ManutenceId é obrigatório")]
        public int ManutenceId { get; set; }
        
        [Required(ErrorMessage = "OperadorId é obrigatório")]
        public int OperadorId { get; set; }
    }
}
