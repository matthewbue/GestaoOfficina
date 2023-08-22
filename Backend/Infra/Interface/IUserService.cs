using GestaoOfficina.Domain.Model;
using GestaoOfficinaProj.Domain.DTO;
using GestaoOfficinaProj.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Infra.Interface
{
    public interface IUserService
    {
        ReturnDefault Create(UserCreateDTO entrada);
        Task<ReturnDefault> Update(UserUpdateDTO entrada);
        ReturnDefault GetAll();
        ReturnDefault GetById(int entrada);
        ReturnDefault Delete(int entrada);
    }
}
