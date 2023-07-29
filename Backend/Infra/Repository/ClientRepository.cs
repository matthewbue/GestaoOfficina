using GestaoOfficina.Domain.DTO;
using GestaoOfficina.Domain.Model;
using GestaoOfficina.Infra.Context;
using GestaoOfficina.Infra.Interface;
using GestaoOfficinaProj.Domain.DTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
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
                await _gestaoOfficinaContext.Client.AddAsync(client);
                await _gestaoOfficinaContext.SaveChangesAsync();
                return client;
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void Delete(int entrada)
         {
            try
            {
                var formulario = _gestaoOfficinaContext.Client.Where(r => r.Id == entrada).FirstOrDefault();
                _gestaoOfficinaContext.Client.Remove(formulario);
                _gestaoOfficinaContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<Client>> GetAll()
        {
            try
            {
                return _gestaoOfficinaContext.Client.ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            
        }

        public async Task<Client> GetClientById(int entrada)
        {
            try
            {
                var result = await _gestaoOfficinaContext.Client.Where(x => x.Id == entrada).Include(a => a.Automoveis).FirstOrDefaultAsync();
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ICollection<Client>> GetClientFilter(ClientFilterDTO entrada)
        {
            var queryResult = _gestaoOfficinaContext.Client.AsQueryable();

            if (!String.IsNullOrEmpty(entrada.NomeCliente))
            {
                queryResult = queryResult.Where(_ => _.Nome == entrada.NomeCliente);
            }
            if (!String.IsNullOrEmpty(entrada.CPF))
            {
                queryResult = queryResult.Where(_ => _.CPF == entrada.CPF);
            }

            var paginatedResult = await queryResult.Skip((entrada.PageNumber.Value - 1) * entrada.PageSize.Value).Take(entrada.PageSize.Value).ToListAsync();
            return paginatedResult;
        }

        public async Task<int> CountClient(ClientFilterDTO entrada)
        {
            var queryResult = _gestaoOfficinaContext.Client.AsQueryable();

            if (!String.IsNullOrEmpty(entrada.NomeCliente))
            {
                queryResult = queryResult.Where(_ => _.Nome == entrada.NomeCliente);
            }
            if (!String.IsNullOrEmpty(entrada.CPF))
            {
                queryResult = queryResult.Where(_ => _.CPF == entrada.CPF);
            }

           
            return queryResult.Count();
        }

        public async Task<Client> GetCPF(string entrada)
        {
            try
            {
                return _gestaoOfficinaContext.Client.Where(x => x.CPF == entrada).FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async void Update(Client entrada)
        {
            try
            {
                _gestaoOfficinaContext.Entry(entrada).State = EntityState.Modified;
                 _gestaoOfficinaContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
