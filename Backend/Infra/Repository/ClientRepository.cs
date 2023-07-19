using GestaoOfficinaProj.Domain.Model;
using GestaoOfficinaProj.Infra.Context;
using GestaoOfficinaProj.Infra.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Infra.Repository
{
    public class ClientRepository : IClientRepository
    {
        private readonly GestaoOfficinaContext _gestaoOfficinaContext;
        public ClientRepository(GestaoOfficinaContext gestaoOfficinaContext)
        {
            _gestaoOfficinaContext = gestaoOfficinaContext;
        }

        public async Task<Client> CreateClient(Client client)
        {
             await _gestaoOfficinaContext.client.AddAsync(client);
             await _gestaoOfficinaContext.SaveChangesAsync();
            return client;
        }
        
    }
}
