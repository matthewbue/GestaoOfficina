using FluentValidation;
using GestaoOfficina.Domain.DTO;
using GestaoOfficina.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Domain.ClientValidators
{
    public class ClientValidators : AbstractValidator<ClientCreateDTO>
    {
        public ClientValidators()
        {
            RuleFor(x => x.Email).NotEmpty().WithMessage("preencha o campo");
            RuleFor(x => x.Uf).NotEmpty().WithMessage("preencha o campo");
            RuleFor(x => x.NumeroContato).NotEmpty().WithMessage("preencha o campo");
            RuleFor(x => x.NumeroWhatsApp).NotEmpty().WithMessage("preencha o campo");
            RuleFor(x => x.Nome).NotEmpty().WithMessage("preencha o campo");
            RuleFor(x => x.Endereco).NotEmpty().WithMessage("preencha o campo");
            RuleFor(x => x.Cidade).NotEmpty().WithMessage("preencha o campo");
            RuleFor(x => x.Bairro).NotEmpty().WithMessage("preencha o campo");
            
        }
    }
}
