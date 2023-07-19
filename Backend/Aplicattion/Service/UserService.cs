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
            var result = await _userRepository.login(login);
            return new ReturnDefault("Dados encontrados", result);
        }
    }
}
