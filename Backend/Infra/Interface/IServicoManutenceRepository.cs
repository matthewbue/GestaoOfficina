using GestaoOfficinaProj.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Infra.Interface
{
    public interface IServicoManutenceRepository
    {
        public Task<ServicoManutence> CreateServicoManutence(ServicoManutence entrada);
        public Task<List<ServicoManutence>> GetAll();
    }
}
