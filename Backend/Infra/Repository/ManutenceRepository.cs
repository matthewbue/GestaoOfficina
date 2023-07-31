using GestaoOfficina.Domain.Model;
using GestaoOfficina.Infra.Context;
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
        public async Task<Manutence> Create(Manutence entrada)
        {
            try
            {
                await _gestaoOfficinaContext.Manutences.AddAsync(entrada);
                await _gestaoOfficinaContext.SaveChangesAsync();
                return entrada;
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

        public async Task<Manutence> GetById(int entrada)
        {
            var result = await _gestaoOfficinaContext.Manutences.Where(x => x.Id == entrada).FirstOrDefaultAsync();
            return result;
        }

        public void Update(Manutence entrada)
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
    }
}
