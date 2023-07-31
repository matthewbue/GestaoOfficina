using GestaoOfficina.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Infra.Interface
{
    public interface IManutenceRepository
    {
        Task<Manutence> Create(Manutence entrada);
        void Update(Manutence entrada);
        Task<Manutence> GetById(int entrada);
        void Delete(int entrada);
    }
}
