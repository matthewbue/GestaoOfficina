using GestaoOfficina.Domain.DTO;
using GestaoOfficina.Domain.Model;
using System.Threading.Tasks;

namespace GestaoOfficina.Infra.Interface
{
    public interface IUserService
    {
        Task<ReturnDefault> Create(UserCreateDTO entrada);
        Task<ReturnDefault> GetAll();
        Task<ReturnDefault> GetById(int id);
        Task<ReturnDefault> Update(UserUpdateDTO entrada);
        Task<ReturnDefault> Delete(int id);
    }
}
