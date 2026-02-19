using System.ComponentModel.DataAnnotations;

namespace GestaoOfficina.Domain.DTO
{
    /// <summary>
    /// DTO para aprovar orçamento e converter em Ordem de Serviço
    /// </summary>
    public class AprovarOrcamentoDTO
    {
        [Required(ErrorMessage = "ManutenceId é obrigatório")]
        public int ManutenceId { get; set; }
    }
}
