using GestaoOfficina.Domain.DTO;
using GestaoOfficina.Domain.Model;
using GestaoOfficina.Infra.Interface;
using System;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace GestaoOfficina.Aplicattion.Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private const string DEFAULT_PASSWORD = "ferreira123";

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<ReturnDefault> Create(UserCreateDTO entrada)
        {
            if (entrada is null)
                return new ReturnDefault("Payload inválido.", null, 400);

            if (string.IsNullOrWhiteSpace(entrada.Email) || string.IsNullOrWhiteSpace(entrada.Name) || string.IsNullOrWhiteSpace(entrada.CPF))
                return new ReturnDefault("Campos obrigatórios: Name, Email e CPF.", null, 400);

            if (await _userRepository.EmailExists(entrada.Email))
                return new ReturnDefault("Email já cadastrado.", null, 400);

            if (await _userRepository.CpfExists(entrada.CPF))
                return new ReturnDefault("CPF já cadastrado.", null, 400);

            var user = new User
            {
                Name = entrada.Name,
                Email = entrada.Email,
                Password = DEFAULT_PASSWORD,
                CPF = entrada.CPF,
                Profile = entrada.Profile,
                ProfilePhoto = entrada.ProfilePhoto
            };

            var created = await _userRepository.CreateUser(user);
            return new ReturnDefault("Usuário criado com sucesso.", MapToResponse(created), 201);
        }

        public async Task<ReturnDefault> GetAll()
        {
            var result = await _userRepository.GetAll();
            var response = result.Select(MapToResponse).ToList();
            return new ReturnDefault("Dados retornados com sucesso.", response);
        }

        public async Task<ReturnDefault> GetById(int id)
        {
            if (id <= 0) return new ReturnDefault("Id inválido.", null, 400);

            var user = await _userRepository.GetById(id);
            if (user is null) return new ReturnDefault("Usuário não encontrado.", null, 404);

            return new ReturnDefault("Dados retornados com sucesso.", MapToResponse(user));
        }

        public async Task<ReturnDefault> Update(UserUpdateDTO entrada)
        {
            if (entrada is null) return new ReturnDefault("Payload inválido.", null, 400);
            if (entrada.Id <= 0) return new ReturnDefault("Id inválido.", null, 400);

            var user = await _userRepository.GetById(entrada.Id);
            if (user is null) return new ReturnDefault("Usuário não encontrado.", null, 404);

            if (!string.IsNullOrWhiteSpace(entrada.Email) && await _userRepository.EmailExists(entrada.Email, entrada.Id))
                return new ReturnDefault("Email já cadastrado.", null, 400);

            if (!string.IsNullOrWhiteSpace(entrada.CPF) && await _userRepository.CpfExists(entrada.CPF, entrada.Id))
                return new ReturnDefault("CPF já cadastrado.", null, 400);

            if (!string.IsNullOrWhiteSpace(entrada.Name)) user.Name = entrada.Name;
            if (!string.IsNullOrWhiteSpace(entrada.Email)) user.Email = entrada.Email;
            if (!string.IsNullOrWhiteSpace(entrada.Password)) user.Password = entrada.Password;
            if (!string.IsNullOrWhiteSpace(entrada.CPF)) user.CPF = entrada.CPF;
            if (entrada.ProfilePhoto != null && entrada.ProfilePhoto.Length > 0) user.ProfilePhoto = entrada.ProfilePhoto;
            if (entrada.Profile.HasValue) user.Profile = entrada.Profile.Value;

            var updated = await _userRepository.Update(user);
            return new ReturnDefault("Dados modificados com sucesso.", MapToResponse(updated));
        }

        public async Task<ReturnDefault> Delete(int id)
        {
            if (id <= 0) return new ReturnDefault("Id inválido.", null, 400);

            var deleted = await _userRepository.Delete(id);
            if (!deleted) return new ReturnDefault("Usuário não encontrado.", null, 404);

            return new ReturnDefault("Usuário removido com sucesso.", true);
        }

        private static UserResponseDTO MapToResponse(User user)
        {
            return new UserResponseDTO
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
        }

        private static string GetEnumDescription(System.Enum value)
        {
            FieldInfo field = value.GetType().GetField(value.ToString());
            DescriptionAttribute attribute = field?.GetCustomAttribute<DescriptionAttribute>();
            return attribute?.Description ?? value.ToString();
        }
    }
}
