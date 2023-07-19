using GestaoOfficina.Domain.DTO;
using GestaoOfficina.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Infra.Interface
{
    public interface IUserService
    {
        Task<ReturnDefault> login(LoginDTO login);
        Task<ReturnDefault> Create(User user);
    }
}
