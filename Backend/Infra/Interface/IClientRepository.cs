using GestaoOfficina.Domain.DTO;
using GestaoOfficina.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Infra.Interface
{
    public interface IClientRepository
    {
        Task<Client> CreateClient(Client client);
        Task<Client> GetCPF(string entrada);
        Task<List<Client>> GetAll();
        void Update(Client entrada);
        Task<Client> GetByIdClient(int entrada);
        void Delete(int entrada);
        
    }
}
