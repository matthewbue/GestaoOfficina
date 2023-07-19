using GestaoOfficina.Domain.DTO;
using GestaoOfficina.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Infra.Interface
{
    public interface IUserRepository
    {
        Task<User> login(LoginDTO login);
        Task<User> CreateUser(User user);
    }
}
