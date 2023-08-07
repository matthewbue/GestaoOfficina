using GestaoOfficina.Infra.Context;
using GestaoOfficinaProj.Domain.Model;
using GestaoOfficinaProj.Infra.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Infra.Repository
{
    public class ServicoRepository : IServicoRepository
    {
        private readonly GestaoOfficinaContext _gestaoOfficinaContext;
        public ServicoRepository(GestaoOfficinaContext gestaoOfficinaContext)
        {
            _gestaoOfficinaContext = gestaoOfficinaContext;
        }

        public async Task<Servico> CreateServicoManutence(Servico entrada)
        {
            await _gestaoOfficinaContext.Servicos.AddAsync(entrada);
            await _gestaoOfficinaContext.SaveChangesAsync();
            return entrada;
        }

        public async Task<List<Servico>> GetAll()
        {
            return _gestaoOfficinaContext.Servicos.ToList();
        }
    }
}
