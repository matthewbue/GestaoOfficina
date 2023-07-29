using GestaoOfficina.Domain.DTO;
using GestaoOfficina.Domain.Model;
using GestaoOfficinaProj.Domain.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Infra.Interface
{
    public interface IAutomovelService
    {
        Task<ReturnDefault> UpdateAutomovel(EntryAutomovelDTO entrada);
        Task<ReturnDefault> CreateAutomovel(AutomovelAddDTO entrada);
        ReturnDefault DeleteAutomovel(int Identificador);
    }
}
