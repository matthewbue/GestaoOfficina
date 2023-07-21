using GestaoOfficina.Domain.DTO;
using GestaoOfficina.Domain.Model;
using GestaoOfficina.Infra.Interface;
using GestaoOfficina.Infra.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using Microsoft.EntityFrameworkCore.SqlServer.Query.Internal;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace GestaoOfficina.Aplicattion.Service
{
    public class ClientService : IClientService
    {
        private readonly IClientRepository _clientRepository;
        public ClientService(IClientRepository clientRepository)
        {
            _clientRepository = clientRepository;
        }

        public async Task<ReturnDefault> Create(ClientCreateDTO client)
        {
            var CPF = await _clientRepository.GetCPF(client.CPF);
            if (CPF != null)
            {
                throw new Exception("CPF existente na nossa base de dados.");
            }

            if (client.Automoveis.Count() < 1)
            {
                throw new Exception("Necessario ter pelo menos 1 Veiculo para Cadastro");
            }

            Client objetoclient = new Client();
            objetoclient.Email = client.Email;
            objetoclient.Id = client.Id;
            objetoclient.NumeroContato = client.NumeroContato;
            objetoclient.Nome = client.Nome;
            objetoclient.Uf = client.Uf;
            objetoclient.CPF = client.CPF;
            objetoclient.Automoveis = client.Automoveis;
            objetoclient.NumeroWhatsapp = client.NumeroWhatsApp;
            objetoclient.Endereco = client.Endereco;
            objetoclient.DataNascimento = client.DataNascimento;
            objetoclient.Cidade = client.Cidade;
            objetoclient.Bairro = client.Bairro;

            var result = await _clientRepository.CreateClient(objetoclient);
            return new ReturnDefault("Criação feita com sucesso.", result);
        }

        public  async Task<ReturnDefault> GetAll()
        {
            var result = await _clientRepository.GetAll();
            return new ReturnDefault("Dados retornado com sucesso.", result);
        }
    }
}
