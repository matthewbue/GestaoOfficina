using FluentValidation;
using GestaoOfficina.Domain.DTO;
using GestaoOfficina.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Domain.Validators
{
    public class AutomovelValidators : AbstractValidator<Automovel>
    {
        public AutomovelValidators()
        {
            RuleFor(x => x.placaVeiculo).NotEmpty().WithMessage("preencha o campo");
        }
    }
}
