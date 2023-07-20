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
            var CPF = await _clientRepository.GetCPF(client.CPFcpfCliente);
            if (CPF != null)
            {
                throw new Exception("esse cpf ja existe");
            }

            // Melhorar Mensagem de erro
            if (client.automovel.Count() > 1)
            {
                throw new Exception("so pode cadastrar apenas um");
            }

            Client objetoclient = new Client();
            objetoclient.Email = client.Email;
            objetoclient.Id = client.Id;
            objetoclient.telefoneContato = client.telefoneContato;
            objetoclient.nomeCliente = client.nomeCliente;
            objetoclient.uf = client.uf;
            objetoclient.CPFcpfCliente = client.CPFcpfCliente;
            objetoclient.Automoveis = client.automovel;
            objetoclient.numeroWhatsapp = client.numeroWhatsapp;
            objetoclient.endereco = client.endereco;
            objetoclient.dataNascimento = client.dataNascimento;
            objetoclient.cidade = client.cidade;
            objetoclient.bairro = client.bairro;

            
            foreach(var list in client.automovel)
            {
                Automovel objetoautomovel = new Automovel();
                objetoautomovel.placaVeiculo = list.placaVeiculo;
            }
            


            var result = await _clientRepository.CreateClient(objetoclient);
            // melhorar mensagem de retorno, esse caso e uma criacao nao uma busca
            return new ReturnDefault("criação feita", result);
        }

        public  async Task<ReturnDefault> GetAll()
        {
            var result = await _clientRepository.GetAll();
            return new ReturnDefault("dados retornado", result);
        }
    }
}
