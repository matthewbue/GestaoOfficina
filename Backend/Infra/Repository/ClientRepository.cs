using GestaoOfficina.Domain.Model;
using GestaoOfficina.Infra.Context;
using GestaoOfficina.Infra.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Infra.Repository
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
            try
            {
                await _gestaoOfficinaContext.client.AddAsync(client);
                await _gestaoOfficinaContext.SaveChangesAsync();
                return client;
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Client> GetCPF(string entrada)
        {
            return _gestaoOfficinaContext.client.Where(x => x.CPFcpfCliente == entrada).FirstOrDefault();
        }
    }
}
