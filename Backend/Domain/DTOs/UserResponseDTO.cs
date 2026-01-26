using GestaoOfficina.Domain.Enums;

namespace GestaoOfficina.Domain.DTO
{
    public class UserResponseDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string CPF { get; set; } = string.Empty;
        public ProfileEnum Profile { get; set; }
        public string ProfileDescription { get; set; } = string.Empty;
        public string? ProfilePhotoBase64 { get; set; }
    }
}
