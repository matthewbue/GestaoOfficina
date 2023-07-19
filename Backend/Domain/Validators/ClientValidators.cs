using FluentValidation;
using GestaoOfficinaProj.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Domain.ClientValidators
{
    public class ClientValidators : AbstractValidator<Client>
    {
        public ClientValidators()
        {
            RuleFor(x => x.Email).NotEmpty().WithMessage("preencha o campo");
            RuleFor(x => x.Name).NotEmpty().WithMessage("preencha o campo");
            RuleFor(x => x.Password).NotEmpty().WithMessage("preencha o campo");
            RuleFor(x => x.CPF).NotEmpty().WithMessage("preencha o campo");
            RuleFor(x => x.Username).NotEmpty().WithMessage("preencha o campo");
        }
    }
}
