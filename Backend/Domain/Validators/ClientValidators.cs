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
            RuleFor(x => x.uf).NotEmpty().WithMessage("preencha o campo");
            RuleFor(x => x.telefoneContato).NotEmpty().WithMessage("preencha o campo");
            RuleFor(x => x.numeroWhatsapp).NotEmpty().WithMessage("preencha o campo");
            RuleFor(x => x.nomeCliente).NotEmpty().WithMessage("preencha o campo");
            RuleFor(x => x.endereco).NotEmpty().WithMessage("preencha o campo");
            RuleFor(x => x.dataNascimento).NotEmpty().WithMessage("preencha o campo");
            RuleFor(x => x.CPFcpfCliente).NotEmpty().WithMessage("preencha o campo");
            RuleFor(x => x.cidade).NotEmpty().WithMessage("preencha o campo");
            RuleFor(x => x.bairro).NotEmpty().WithMessage("preencha o campo");
            
        }
    }
}
