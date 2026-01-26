using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Domain.DTO
{
    public class LoginDTO
    {
        [Required(ErrorMessage = "CPF é obrigatório")]
        [StringLength(14, MinimumLength = 11, ErrorMessage = "CPF deve ter entre 11 e 14 caracteres")]
        public string CPF { get; set; }
        
        [Required(ErrorMessage = "Senha é obrigatória")]
        public string Password { get; set; }
    }
}
