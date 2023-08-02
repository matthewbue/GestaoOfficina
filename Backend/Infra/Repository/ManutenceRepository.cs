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
                 _gestaoOfficinaContext.Manutences.AddRange(entrada);
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

        public List<Manutence> GetAllOS()
        {
            try
            {
                var result = _gestaoOfficinaContext.Manutences.Include(c => c.Clients).OrderBy(c => c.Id).ToList();
                return result;
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
    }
}
