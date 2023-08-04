using GestaoOfficina.Domain.Model;
using GestaoOfficinaProj.Domain.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Infra.Interface
{
    public interface IServicoService
    {
        public Task<ReturnDefault> CreateServicoManutence(ServicoCreateDTO entrada);
        public Task<ReturnDefault> GetAll();
    }
}
