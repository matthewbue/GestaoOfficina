using GestaoOfficinaProj.Domain.DTO;
using GestaoOfficinaProj.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Infra.Interface
{
    public interface IUserService
    {
        Task<ReturnDefault> login(LoginDTO login);
        Task<ReturnDefault> CreateUser(User user);
    }
}
