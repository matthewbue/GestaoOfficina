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
    public class ServicoManutenceRepository : IServicoManutenceRepository
    {
        private readonly GestaoOfficinaContext _gestaoOfficinaContext;
        public ServicoManutenceRepository(GestaoOfficinaContext gestaoOfficinaContext)
        {
            _gestaoOfficinaContext = gestaoOfficinaContext;
        }

        public async Task<ServicoManutence> CreateServicoManutence(ServicoManutence entrada)
        {
            await _gestaoOfficinaContext.servicoManutences.AddAsync(entrada);
            await _gestaoOfficinaContext.SaveChangesAsync();
            return entrada;
        }

        public async Task<List<ServicoManutence>> GetAll()
        {
            return _gestaoOfficinaContext.servicoManutences.ToList();
        }
    }
}
