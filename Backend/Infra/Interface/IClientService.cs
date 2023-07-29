using GestaoOfficina.Domain.DTO;
using GestaoOfficina.Domain.Model;
using GestaoOfficinaProj.Domain.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Infra.Interface
{
    public interface IClientService
    {
        Task<ReturnDefault> Create(ClientCreateDTO create);
        Task<ReturnDefault> GetAll();
        ReturnDefault Delete(int entrada);
        Task<ReturnDefault> Update(ClientUpdateDTO entrada);
        Task<ReturnDefault> GetClientById(int identificador);
        Task<ReturnDefault> GetClientFilter(ClientFilterDTO entrada);
    }
}
