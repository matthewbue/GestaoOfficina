using GestaoOfficina.Domain.DTO;
using GestaoOfficina.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Infra.Interface
{
    public interface IAutomovelService
    {
        Task<ReturnDefault> GetByIdAutomovel(EntryDtoAutomovel entrada);
    }
}
