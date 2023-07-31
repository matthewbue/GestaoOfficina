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
    public interface IManutenceService
    {
        Task<ReturnDefault> Create(ManutenceCreateDTO entrada);
        Task<ReturnDefault> GetById(int entrada);
        ReturnDefault Delete(int entrada);
        Task<ReturnDefault> Update(ManutenceUpdateDTO entrada);
        
    }
}
