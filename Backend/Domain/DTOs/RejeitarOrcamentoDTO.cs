using System.ComponentModel.DataAnnotations;

namespace GestaoOfficina.Domain.DTO
{
    /// <summary>
    /// DTO para rejeitar orçamento
    /// </summary>
    public class RejeitarOrcamentoDTO
    {
        [Required(ErrorMessage = "ManutenceId é obrigatório")]
        public int ManutenceId { get; set; }
        
        [StringLength(1000, ErrorMessage = "Motivo deve ter no máximo 1000 caracteres")]
        public string Motivo { get; set; }
    }
}
