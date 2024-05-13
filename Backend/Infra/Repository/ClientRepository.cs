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
                await _gestaoOfficinaContext.Clients.AddAsync(client);
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
            //ajustar metodo Todo
            try
            {
                var manutence = _gestaoOfficinaContext.Manutences.FirstOrDefault();

                if (manutence != null)
                {
                    var manutenceservico = _gestaoOfficinaContext.ManutenceServicos.Where(r => r.ManutenceId == manutence.Id).ToList();
                    _gestaoOfficinaContext.ManutenceServicos.RemoveRange(manutenceservico);
                    _gestaoOfficinaContext.SaveChanges(); // Remover registros dependentes primeiro

                    _gestaoOfficinaContext.Manutences.Remove(manutence);
                    _gestaoOfficinaContext.SaveChanges(); // Agora remover o registro principal
                }
                var client = _gestaoOfficinaContext.Clients.Where(r => r.Id == entrada).FirstOrDefault();
                    if (client != null)
                    {
                        _gestaoOfficinaContext.Clients.RemoveRange(client);
                        _gestaoOfficinaContext.SaveChanges(); // Remover o cliente, se encontrado
                    }
          
                
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
                return _gestaoOfficinaContext.Clients.ToList();
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
                var result = await _gestaoOfficinaContext.Clients.Where(x => x.Id == entrada).Include(a => a.Automoveis).FirstOrDefaultAsync();
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ICollection<Client>> GetClientFilter(ClientFilterDTO entrada)
        {
            try
            {
                var queryResult = _gestaoOfficinaContext.Clients.Include(a => a.Automoveis).AsQueryable();

                if (!String.IsNullOrEmpty(entrada.NomeCliente))
                {
                    queryResult = queryResult.Where(_ => _.Nome.Contains(entrada.NomeCliente));
                }

                if (!String.IsNullOrEmpty(entrada.CPF))
                {
                    queryResult = queryResult.Where(_ => _.CPF == entrada.CPF);
                }

                if (!String.IsNullOrEmpty(entrada.Placa))
                {
                    queryResult = queryResult.Where(cliente =>
                        cliente.Automoveis.Any(automovel => automovel.Placa == entrada.Placa));
                }

                // Ordenação e paginação
                queryResult = queryResult.OrderByDescending(x => x.Id);
                int totalCount = await queryResult.CountAsync();
                int maxPage = (int)Math.Ceiling((double)totalCount / entrada.PageSize.Value);
                int pageToFetch = Math.Max(1, Math.Min(maxPage, entrada.PageNumber.Value));

                // Aplicação da paginação
                var paginated = await queryResult
                    .Skip((pageToFetch - 1) * entrada.PageSize.Value)
                    .Take(entrada.PageSize.Value)
                    .ToListAsync();

                return paginated;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public async Task<int> CountClient(ClientFilterDTO entrada)
        {
            var queryResult = _gestaoOfficinaContext.Clients.Include(a => a.Automoveis).AsQueryable();

            if (!String.IsNullOrEmpty(entrada.NomeCliente))
            {
                queryResult = queryResult.Where(_ => _.Nome.Contains(entrada.NomeCliente));
            }
            if (!String.IsNullOrEmpty(entrada.CPF))
            {
                queryResult = queryResult.Where(_ => _.CPF == entrada.CPF);
            }
  
            return await queryResult.CountAsync();
        }

        public async Task<Client> GetCPF(string entrada)
        {
            try
            {
                return _gestaoOfficinaContext.Clients.Where(x => x.CPF == entrada).FirstOrDefault();
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
