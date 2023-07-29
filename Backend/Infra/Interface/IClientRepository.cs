﻿using GestaoOfficina.Domain.DTO;
using GestaoOfficina.Domain.Model;
using GestaoOfficinaProj.Domain.DTO;
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
        Task<Client> GetClientById(int entrada);
        void Delete(int entrada);
        Task<ICollection<Client>> GetClientFilter(ClientFilterDTO entrada);

        Task<int> CountClient(ClientFilterDTO entrada);
    }
}
