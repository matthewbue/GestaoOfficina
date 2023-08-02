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
        void Create(Manutence entrada);
        void UpdateManutence(Manutence entrada);
        Task<Manutence> GetById(int entrada);
        void Delete(int entrada);
        List<Manutence> GetAllOS();
        void CheckoutOS(int identificadorOS);
    }
}
