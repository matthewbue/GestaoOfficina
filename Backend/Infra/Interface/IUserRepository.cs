using GestaoOfficinaProj.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Infra.Interface
{
    public interface IUserRepository
    {
        void Create(User entrada);
        void Update(User entrada);
        Task<List<User>> GetAll();
        Task<User> GetById(int entrada);
        void Delete(int entrada);
    }
}
