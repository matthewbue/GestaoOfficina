using GestaoOfficina.Domain.DTO;
using GestaoOfficina.Domain.Model;
using System.Threading.Tasks;

namespace GestaoOfficina.Infra.Interface
{
    public interface IAuthService
    {
        Task<ReturnDefault> Login(LoginDTO login);
    }
}
