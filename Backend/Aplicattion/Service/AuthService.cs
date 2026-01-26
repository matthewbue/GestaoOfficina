using GestaoOfficina.Domain.DTO;
using GestaoOfficina.Domain.Model;
using GestaoOfficina.Infra.Interface;
using System;
using System.ComponentModel;
using System.Reflection;
using System.Threading.Tasks;

namespace GestaoOfficina.Aplicattion.Service
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenService _tokenService;

        public AuthService(IUserRepository userRepository, ITokenService tokenService)
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
        }

        public async Task<ReturnDefault> Login(LoginDTO login)
        {
            if (login is null)
                return new ReturnDefault("Payload inválido.", null, 400);

            if (string.IsNullOrWhiteSpace(login.CPF) || string.IsNullOrWhiteSpace(login.Password))
                return new ReturnDefault("Campos obrigatórios: CPF e Password.", null, 400);

            var user = await _userRepository.login(login);

            if (user is null)
                return new ReturnDefault("CPF ou senha inválidos.", null, 401);

            // Gerar token JWT
            var token = _tokenService.GenerateToken(user);

            var userResponse = new UserResponseDTO
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                CPF = user.CPF,
                Profile = user.Profile,
                ProfileDescription = GetEnumDescription(user.Profile),
                ProfilePhotoBase64 = user.ProfilePhoto != null && user.ProfilePhoto.Length > 0 
                    ? Convert.ToBase64String(user.ProfilePhoto) 
                    : null
            };

            var response = new LoginResponseDTO
            {
                Token = token,
                User = userResponse
            };

            return new ReturnDefault("Login realizado com sucesso.", response);
        }

        private static string GetEnumDescription(System.Enum value)
        {
            FieldInfo field = value.GetType().GetField(value.ToString());
            DescriptionAttribute attribute = field?.GetCustomAttribute<DescriptionAttribute>();
            return attribute?.Description ?? value.ToString();
        }
    }
}
