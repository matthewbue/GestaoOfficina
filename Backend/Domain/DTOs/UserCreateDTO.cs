using GestaoOfficina.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace GestaoOfficina.Domain.DTO
{
    public class UserCreateDTO
    {
        [Required(ErrorMessage = "Nome é obrigatório")]
        [StringLength(200, MinimumLength = 2, ErrorMessage = "Nome deve ter entre 2 e 200 caracteres")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email é obrigatório")]
        [EmailAddress(ErrorMessage = "Email inválido")]
        [StringLength(200, ErrorMessage = "Email deve ter no máximo 200 caracteres")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "CPF é obrigatório")]
        [StringLength(14, MinimumLength = 11, ErrorMessage = "CPF deve ter entre 11 e 14 caracteres")]
        public string CPF { get; set; } = string.Empty;

        [Required(ErrorMessage = "Profile é obrigatório")]
        public ProfileEnum Profile { get; set; }

        public byte[]? ProfilePhoto { get; set; }
    }
}
