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
    public class AutomovelRepository : IAutomovelRepository
    {
        private readonly GestaoOfficinaContext _gestaoOfficinaContext;
        public AutomovelRepository(GestaoOfficinaContext gestaoOfficinaContext)
        {
            _gestaoOfficinaContext = gestaoOfficinaContext;
        }

        public void CreateAutomovel(Automovel entrada)
        {
            try
            {
                 _gestaoOfficinaContext.automovel.Add(entrada);
                 _gestaoOfficinaContext.SaveChanges();
                
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Automovel> GetByIdAutomovel(int entrada)
        {
            var result = _gestaoOfficinaContext.automovel.Where(x => x.Id == entrada).FirstOrDefault();
            return result;
        }

        public  void UpdateAutomovel(Automovel entrada)
        {
            _gestaoOfficinaContext.Entry(entrada).State = EntityState.Modified;
            _gestaoOfficinaContext.SaveChanges();
        }
    }
}
