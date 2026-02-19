using GestaoOfficina.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace GestaoOfficina.Domain.DTO
{
    /// <summary>
    /// DTO para atualizar status genérico
    /// ?? CUIDADO: Sempre valida transições antes de usar
    /// </summary>
    public class AtualizarStatusDTO
    {
        [Required(ErrorMessage = "ManutenceId é obrigatório")]
        public int ManutenceId { get; set; }
        
        [Required(ErrorMessage = "NovoStatus é obrigatório")]
        public StatusOrcamentoEnum NovoStatus { get; set; }
    }
}
