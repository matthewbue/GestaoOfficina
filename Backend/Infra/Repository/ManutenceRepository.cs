using GestaoOfficina.Domain.Model;
using GestaoOfficina.Infra.Context;
using GestaoOfficinaProj.Domain.DTO;
using GestaoOfficinaProj.Domain.DTOs.OS;
using GestaoOfficinaProj.Domain.Model;
using GestaoOfficinaProj.Infra.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public int Create(Manutence entrada)
        {
            try
            {
                _gestaoOfficinaContext.Manutences.Add(entrada);
                _gestaoOfficinaContext.SaveChanges();

                return entrada.Id;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void Delete(int entrada)
        {
            var resultdelete = _gestaoOfficinaContext.Manutences.Where(r => r.Id == entrada).Include(m => m.ManutecesServicos).FirstOrDefault();
            _gestaoOfficinaContext.Manutences.Remove(resultdelete);
            _gestaoOfficinaContext.SaveChanges();
        }

        public async Task<List<OSGetFilterResponse>> GetFilterOS(OSFilterDTO entrada)
        {
            try
            {
                var queryResult = _gestaoOfficinaContext.Manutences.AsQueryable();

                if (entrada.DataInicio != null && entrada.DataFim != null)
                    if (entrada.DataInicio <= entrada.DataFim)
                    {
                        queryResult = queryResult.Where(_ => _.DataOS >= entrada.DataInicio && _.DataOS <= entrada.DataFim);
                    }

                if (entrada.NumeroOS > 0)
                {
                    queryResult = queryResult.Where(_ => _.Id == entrada.NumeroOS);
                }

                if (entrada.DataAberturaOS != null)
                {
                    queryResult = queryResult.Where(_ => _.DataOS == entrada.DataAberturaOS);
                }

                if (entrada.Status != null)
                {
                    queryResult = queryResult.Where(_ => _.Status == entrada.Status);
                }
                if (!String.IsNullOrEmpty(entrada.Placa))
                {
                    queryResult = queryResult.Where(cliente =>
                        cliente.Automovel.Placa.Contains(entrada.Placa));
                }

                if (!String.IsNullOrEmpty(entrada.NomeCliente))
                {
                    queryResult = queryResult.Where(cliente =>
                        cliente.Automovel.Client.Nome.Contains(entrada.NomeCliente));
                }

                var paginatedResult = await queryResult

                    .Select(m => new OSGetFilterResponse
                    {
                        Id = m.Id,
                        Veiculo = m.Automovel.Marca,
                        Placa = m.Automovel.Placa,
                        Status = m.Status,
                        NomeCliente = m.Automovel.Client.Nome,
                        TipoDoc = m.TipoDoc
                    })
                    .OrderByDescending(i => i.Id)
                    .Skip((entrada.PageNumber.Value - 1) * entrada.PageSize.Value)
                    .Take(entrada.PageSize.Value)
                    .ToListAsync();

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
                var result = await _gestaoOfficinaContext.Manutences.Include(m => m.ManutecesServicos).Where(x => x.Id == entrada).FirstOrDefaultAsync();
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
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<int> CountOS(OSFilterDTO entrada)
        {
            var queryResult = _gestaoOfficinaContext.Manutences.AsQueryable();

            if (!string.IsNullOrEmpty(entrada.Status))
            {
                queryResult = queryResult.Where(_ => _.Status == entrada.Status);
            }
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
            if (!string.IsNullOrEmpty(entrada.Placa))
            {
                queryResult = queryResult.Where(_ => _.Automovel.Placa == entrada.Placa);
            }
            if (entrada.DataInicio != null && entrada.DataFim != null)
                if (entrada.DataInicio <= entrada.DataFim)
                {
                    queryResult = queryResult.Where(_ => _.DataOS >= entrada.DataInicio && _.DataOS <= entrada.DataFim);
                }

            if (!String.IsNullOrEmpty(entrada.NomeCliente))
            {
                queryResult = queryResult.Where(cliente =>
                    cliente.Automovel.Client.Nome.Contains(entrada.NomeCliente));
            }
            return queryResult.Count();
        }

        public async Task<ManutenceServico> GetManutenceServicoById(int id)
        {
            try
            {
                var result = await _gestaoOfficinaContext.ManutenceServicos.Where(x => x.ID == id).FirstOrDefaultAsync();
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void UpdateServicoManutence(ManutenceServico result)
        {
            try
            {
                _gestaoOfficinaContext.Entry(result).State = EntityState.Modified;
                _gestaoOfficinaContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void CreateManutenceServico(ManutenceServico entrada)
        {
            try
            {
                _gestaoOfficinaContext.ManutenceServicos.Add(entrada);
                _gestaoOfficinaContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<Manutence>> GetRelatorio(EntryFilterRelatorioDTO entrada)
        {
            var queryResult = _gestaoOfficinaContext.Manutences.Include(c => c.ManutecesServicos).AsQueryable();

            if (!String.IsNullOrEmpty(entrada.StatusOs))
            {
                queryResult = queryResult.Where(_ => _.Status == entrada.StatusOs);
            }
            if (!String.IsNullOrEmpty(entrada.TipoDoc))
            {
                queryResult = queryResult.Where(_ => _.TipoDoc == entrada.TipoDoc);
            }
            if (entrada.DataInicial != null)
            {
                queryResult = queryResult.Where(_ => _.DataOS >= entrada.DataInicial && _.DataOS <= entrada.DataFinal);
            }

            var result = queryResult;

            return result.ToList();
        }

        public int GetManutenceIdByDate(DateTime entrada)
        {
            var result = _gestaoOfficinaContext.Manutences.Where(x => x.DataOS == entrada).Select(x => x.Id).FirstOrDefault();

            return result;
        }

        public void DeleteManutence(int entrada)
        {
            var resultdelete = _gestaoOfficinaContext.ManutenceServicos.Where(r => r.ID == entrada).FirstOrDefault();
            _gestaoOfficinaContext.ManutenceServicos.Remove(resultdelete);
            _gestaoOfficinaContext.SaveChanges();
        }
    }
}