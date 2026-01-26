using GestaoOfficina.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace GestaoOfficina.Domain.DTO
{
    public class UserUpdateDTO
    {
        [Required(ErrorMessage = "Id é obrigatório")]
        public int Id { get; set; }

        [StringLength(200, MinimumLength = 2, ErrorMessage = "Nome deve ter entre 2 e 200 caracteres")]
        public string? Name { get; set; }

        [EmailAddress(ErrorMessage = "Email inválido")]
        [StringLength(200, ErrorMessage = "Email deve ter no máximo 200 caracteres")]
        public string? Email { get; set; }

        [StringLength(14, MinimumLength = 11, ErrorMessage = "CPF deve ter entre 11 e 14 caracteres")]
        public string? CPF { get; set; }

        public ProfileEnum? Profile { get; set; }

        [MinLength(6, ErrorMessage = "Senha deve ter no mínimo 6 caracteres")]
        [StringLength(200, ErrorMessage = "Senha deve ter no máximo 200 caracteres")]
        public string? Password { get; set; }

        public byte[]? ProfilePhoto { get; set; }
    }
}
