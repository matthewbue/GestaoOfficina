using GestaoOfficina.Domain.DTO;
using GestaoOfficina.Domain.Model;
using GestaoOfficina.Infra.Interface;
using GestaoOfficina.Infra.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using Microsoft.EntityFrameworkCore.SqlServer.Query.Internal;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography.X509Certificates;
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

        public async Task<ReturnDefault> Create(ClientCreateDTO entrada)
        {
            var CPF = await _clientRepository.GetCPF(entrada.CPF);
            if (CPF != null)
            {
                throw new Exception("CPF existente na nossa base de dados.");
            }

            if (entrada.Automoveis.Count() < 1)
            {
                throw new Exception("Necessario ter pelo menos 1 Veiculo para Cadastro");
            }

            Client objetoclient = new Client();
            objetoclient.Email = entrada.Email;
            objetoclient.Id = entrada.Id;
            objetoclient.NumeroContato = entrada.NumeroContato;
            objetoclient.Nome = entrada.Nome;
            objetoclient.Uf = entrada.Uf;
            objetoclient.CPF = entrada.CPF;
            objetoclient.Automoveis = entrada.Automoveis;
            objetoclient.NumeroWhatsapp = entrada.NumeroWhatsApp;
            objetoclient.Endereco = entrada.Endereco;
            objetoclient.DataNascimento = entrada.DataNascimento;
            objetoclient.Cidade = entrada.Cidade;
            objetoclient.Bairro = entrada.Bairro;

            var result = await _clientRepository.CreateClient(objetoclient);
            return new ReturnDefault("Criação feita com sucesso.", result);
        }

        public ReturnDefault Delete(int entrada)
        {
             _clientRepository.Delete(entrada);
            
            return new ReturnDefault("Dados  com sucesso.", "sucesso");
        }

        public  async Task<ReturnDefault> GetAll()
        {
            var result = await _clientRepository.GetAll();
            return new ReturnDefault("Dados retornado com sucesso.", result);
        }

        public async Task<ReturnDefault> GetByIdClient(ClientCreateDTO entrada)
        {
            var result = _clientRepository.GetByIdClient(entrada);
            ClientCreateDTO objeto = new ClientCreateDTO();
            if (!String.IsNullOrEmpty(entrada.Nome))
            {
                objeto.Nome = entrada.Nome;
            }
            if(!String.IsNullOrEmpty(entrada.Uf))
            {
                objeto.Uf = entrada.Uf;
            }
            if(!String.IsNullOrEmpty(entrada.NumeroWhatsApp))
            {
                objeto.NumeroWhatsApp = entrada.NumeroWhatsApp;
            }
            if(!String.IsNullOrEmpty(entrada.NumeroContato))
            {
                objeto.NumeroContato = entrada.NumeroContato;
            }
            if(!String.IsNullOrEmpty(entrada.Endereco))
            {
                objeto.Endereco = entrada.Endereco;
            }
            if(!String.IsNullOrEmpty(entrada.Email))
            {
                objeto.Email = entrada.Email;
            }
            if(!String.IsNullOrEmpty(entrada.CPF))
            {
                objeto.CPF = entrada.CPF;
            }
            if(!String.IsNullOrEmpty(entrada.Cidade))
            {
                objeto.Cidade = entrada.Cidade;
            }
            if(!String.IsNullOrEmpty(entrada.Bairro))
            {
                objeto.Bairro = entrada.Bairro;
            }
            if (entrada.Id > 0)
            {
                objeto.Id = entrada.Id;
            }
            if (Convert.ToDateTime(entrada.DataNascimento) == null)
            {
                objeto.DataNascimento = entrada.DataNascimento;
            }
            if (entrada.Automoveis == null)
            {
                objeto.Automoveis = entrada.Automoveis;
            }
                    _clientRepository.Update(entrada);
            return new ReturnDefault("Dados modificados com sucesso.", result);
        }
        public void Update(ClientCreateDTO entrada)
        {
            _clientRepository.Update(entrada);
        }
    }
}
