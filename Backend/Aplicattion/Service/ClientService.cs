using GestaoOfficinaProj.Domain.DTO;
using GestaoOfficinaProj.Domain.Model;
using GestaoOfficinaProj.Infra.Interface;
using GestaoOfficinaProj.Infra.Repository;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Aplicattion.Service
{
    public class ClientService : IClientService
    {
        private readonly IClientRepository _clientRepository;
        public ClientService(IClientRepository clientRepository)
        {
            _clientRepository = clientRepository;
        }
        public async Task<ReturnDefault> CreateClient(ClientCreateDTO client)
        {

            if (client.automovel.Count() == 0)
            {
                throw new Exception("erro");
            }
            
            Client list = new Client();
            list.Email = client.Email;
            list.Id = client.Id;
            list.Password = client.Password;
            list.Name = client.Name;
            list.Username = client.Username;
            list.CPF = client.CPF;
            list.Automoveis = new List<Automovel>();
            
            foreach (var Automovel in client.automovel)
            {
               
                var objetoresult = new Automovel();
                objetoresult.Placa = Automovel.Placa;
                objetoresult.Cor = Automovel.Cor;
                objetoresult.Modelo = Automovel.Modelo;
                objetoresult.Id = Automovel.Id;
                objetoresult.Marca = Automovel.Marca;
                
            }
            
            var result = await _clientRepository.CreateClient(list);
            return new ReturnDefault("Dados encontrados", result);
        }
    }
}