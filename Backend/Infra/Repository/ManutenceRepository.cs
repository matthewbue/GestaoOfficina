using GestaoOfficina.Domain.Model;
using GestaoOfficina.Infra.Context;
using GestaoOfficinaProj.Domain.DTO;
using GestaoOfficinaProj.Infra.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Infra.Repository
{
    public class ManutenceRepository : IManutenceRepository
    {
        private readonly GestaoOfficinaContext _gestaoOfficinaContext;
        public ManutenceRepository(GestaoOfficinaContext gestaoOfficinaContext)
        {
            _gestaoOfficinaContext = gestaoOfficinaContext;
        }

        public void CheckoutOS(int identificadorOS)
        {
            var produto = _gestaoOfficinaContext.Manutences.Find(identificadorOS);

            if (produto != null)
            {
                 produto.Status = "Concluido";
                _gestaoOfficinaContext.SaveChanges();
            }
             
        }

        public void Create(Manutence entrada)
        {
            try
            {
                 _gestaoOfficinaContext.Manutences.Add(entrada);
                 _gestaoOfficinaContext.SaveChanges();
               
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void Delete(int entrada)
        {
            var resultdelete = _gestaoOfficinaContext.Manutences.Where(r => r.Id == entrada).FirstOrDefault();
            _gestaoOfficinaContext.Manutences.Remove(resultdelete);
            _gestaoOfficinaContext.SaveChanges();
        }

        public async Task<List<Manutence>> GetFilterOS(OSFilterDTO entrada)
        {
            try
            {
                var queryResult = _gestaoOfficinaContext.Manutences.AsQueryable();

          
                if (entrada.NumeroOS > 0)
                {
                    queryResult = queryResult.Where(_ => _.Id == entrada.NumeroOS);
                }
   
                if (entrada.DataAberturaOS != null)
                {
                    queryResult = queryResult.Where(_ => _.DataOS == entrada.DataAberturaOS);
                }
         
                var paginatedResult = await queryResult.OrderByDescending(i => i.Id).Skip((entrada.PageNumber.Value - 1) * entrada.PageSize.Value).Take(entrada.PageSize.Value).ToListAsync();

                foreach (var item in paginatedResult)
                {
                    if (!String.IsNullOrEmpty(entrada.NomeCliente))
                    {
                        item.Clients = await _gestaoOfficinaContext.Clients.Where(_ => _.Nome.Contains(entrada.NomeCliente)).FirstOrDefaultAsync();
                    }
                    else
                    {
                        item.Clients = await _gestaoOfficinaContext.Clients.Include(a => a.Automoveis).Where(i => i.Id == item.ClientId).FirstOrDefaultAsync();

                    }
                    if (!String.IsNullOrEmpty(entrada.Placa))
                    {
                        item.automovels = await _gestaoOfficinaContext.Automoveis.Where(_ => _.Placa.Contains(entrada.Placa)).FirstOrDefaultAsync();
                    }
                   item.automovels = await _gestaoOfficinaContext.Automoveis.Where(c => c.ClientId == item.ClientId).FirstOrDefaultAsync();

                }
                

                return paginatedResult;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Manutence> GetById(int entrada)
        {
            try
            {
                var result = await _gestaoOfficinaContext.Manutences.Where(x => x.Id == entrada).FirstOrDefaultAsync();
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void UpdateManutence(Manutence entrada)
        {
            try
            {
                _gestaoOfficinaContext.Entry(entrada).State = EntityState.Modified;
                _gestaoOfficinaContext.SaveChanges();
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
           
        }

        public async Task<int> CountOS(OSFilterDTO entrada)
        {
            var queryResult = _gestaoOfficinaContext.Manutences.Include(C => C.Clients).AsQueryable();

            //if (!String.IsNullOrEmpty(entrada.NomeCliente))
            //{
            //    queryResult = queryResult.Where(_ => _..Contains(entrada.NomeCliente));
            //}
            if (entrada.NumeroOS > 0)
            {
                queryResult = queryResult.Where(_ => _.Id == entrada.NumeroOS);
            }
            if (entrada.NumeroOS > 0)
            {
                queryResult = queryResult.Where(_ => _.Id == entrada.NumeroOS);
            }
            if (entrada.DataAberturaOS != null)
            {
                queryResult = queryResult.Where(_ => _.DataOS == entrada.DataAberturaOS);
            }
            if (!String.IsNullOrEmpty(entrada.Placa))
            {
                queryResult = queryResult.Where(_ => _.automovels.Placa == entrada.Placa);
            }
            return queryResult.Count();
        }
    }
}
