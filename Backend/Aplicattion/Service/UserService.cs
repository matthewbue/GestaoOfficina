using GestaoOfficina.Domain.Model;
using GestaoOfficinaProj.Domain.DTO;
using GestaoOfficinaProj.Domain.Model;
using GestaoOfficinaProj.Infra.Interface;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Aplicattion.Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public ReturnDefault Create(UserCreateDTO entrada)
        {
            var objetoUser = new User();
            objetoUser.Nome = entrada.Name;
            objetoUser.Senha = entrada.Password;
            objetoUser.Email = entrada.Email;
            objetoUser.Tipo = entrada.Tipo.ToString();
            objetoUser.Datacriacao = entrada.Datacriacao;
            
             _userRepository.Create(objetoUser);
            return new ReturnDefault("sucesso","");
            
        }

        public ReturnDefault Delete(int entrada)
        {
            _userRepository.Delete(entrada);
            return new ReturnDefault("sucesso", "");
        }

        public ReturnDefault GetAll()
        {
           var result = _userRepository.GetAll();
            return new ReturnDefault("sucesso", result);
        }

        public ReturnDefault GetById(int entrada)
        {
            var result = _userRepository.GetById(entrada);
            return new ReturnDefault("Sucesso.", result);
        }

        public async Task<ReturnDefault> Update(UserUpdateDTO entrada)
        {
            var result = await _userRepository.GetById(entrada.Id);
            if (!string.IsNullOrEmpty(entrada.Name))
            {
                result.Nome = entrada.Name;
            }
            if (!string.IsNullOrEmpty(entrada.Email))
            {
                result.Email = entrada.Email;
            }
            if (!string.IsNullOrEmpty(entrada.Password))
            {
                result.Senha = entrada.Password;
            }
            if (!string.IsNullOrEmpty(entrada.Tipo.ToString()))
            {
                result.Tipo = entrada.Tipo.ToString();
            }
            _userRepository.Update(result);
            return new ReturnDefault("Sucesso.", result);
        }
    }
}
