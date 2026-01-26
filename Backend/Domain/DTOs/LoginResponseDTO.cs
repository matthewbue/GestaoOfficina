namespace GestaoOfficina.Domain.DTO
{
    public class LoginResponseDTO
    {
        public string Token { get; set; } = string.Empty;
        public UserResponseDTO User { get; set; }
    }
}
