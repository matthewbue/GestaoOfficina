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

        Task<User?> GetById(int id);
        Task<List<User>> GetAll();

        Task<bool> EmailExists(string email, int? ignoringUserId = null);
        Task<bool> CpfExists(string cpf, int? ignoringUserId = null);

        Task<User> Update(User user);
        Task<bool> Delete(int id);
    }
}
