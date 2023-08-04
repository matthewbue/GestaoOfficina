using GestaoOfficinaProj.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Infra.Interface
{
    public interface IServicoRepository
    {
        public Task<Servico> CreateServicoManutence(Servico entrada);
        public Task<List<Servico>> GetAll();
    }
}
