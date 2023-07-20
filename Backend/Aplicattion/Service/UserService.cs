using GestaoOfficina.Domain.DTO;
using GestaoOfficina.Domain.Model;
using GestaoOfficina.Infra.Interface;
using GestaoOfficina.Infra.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Aplicattion.Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<ReturnDefault> Create(User user)
        {
            var result = await _userRepository.CreateUser(user);
            return new ReturnDefault("Dados encontrados", result);
        }

        public async Task<ReturnDefault> login(LoginDTO login)
        {
            if(login.Password.Length == 0 && login.Email.Length == 0)
            {
                throw new Exception("esqueceu um campo");
            }
            var result = await _userRepository.login(login);
            if (result == null)
            {
                return new ReturnDefault("dados nao encotrado", result);
            }
            else
            {
                return new ReturnDefault("login feito", result);
            }
        }
    }
}
