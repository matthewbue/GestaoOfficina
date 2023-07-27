using GestaoOfficina.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Infra.Interface
{
    public interface IAutomovelRepository
    {
        void UpdateAutomovel(Automovel entrada);
        Task<Automovel> GetByIdAutomovel(int entrada);
    }
}
