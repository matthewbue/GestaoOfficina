using GestaoOfficina.Infra.Context;
using GestaoOfficinaProj.Domain.Model;
using GestaoOfficinaProj.Infra.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Infra.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly GestaoOfficinaContext _gestaoOfficinaContext;
        public UserRepository(GestaoOfficinaContext gestaoOfficinaContext)
        {
            _gestaoOfficinaContext = gestaoOfficinaContext;
        }
        public void Create(User entrada)
        {
            _gestaoOfficinaContext.Add(entrada);
            _gestaoOfficinaContext.SaveChanges();
            
        }

        public void Delete(int entrada)
        {
            try
            {
                var result = _gestaoOfficinaContext.Usuarios.Where(r => r.Id == entrada).FirstOrDefault();
                _gestaoOfficinaContext.Usuarios.Remove(result);
                _gestaoOfficinaContext.SaveChanges();
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<User>> GetAll()
        {
            return _gestaoOfficinaContext.Usuarios.ToList();
        }

        public async Task<User> GetById(int entrada)
        {
            var result = _gestaoOfficinaContext.Usuarios.Where(x => x.Id == entrada).FirstOrDefault();
            return result;
        }

        public void Update(User entrada)
        {
            _gestaoOfficinaContext.Entry(entrada).State = EntityState.Modified;
            _gestaoOfficinaContext.SaveChanges();
        }
    }
}

