using GestaoOfficinaProj.Domain.DTO;
using GestaoOfficinaProj.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Infra.Interface
{
    public interface IUserRepository
    {
        Task<User> login(LoginDTO login);
        Task<User> CreateUser(User user);
    }
}
