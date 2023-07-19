using GestaoOfficina.Domain.DTO;
using GestaoOfficina.Domain.Model;
using GestaoOfficina.Infra.Context;
using GestaoOfficina.Infra.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Infra.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly GestaoOfficinaContext _gestaoOfficinaContext;
        public UserRepository(GestaoOfficinaContext gestaoOfficinaContext)
        {
            _gestaoOfficinaContext = gestaoOfficinaContext;
        }
        public async Task<User> login(LoginDTO login)
        {
            try
            {
                var result = await _gestaoOfficinaContext.user.Where(x => x.Email == login.Email && x.Password == login.Password).FirstOrDefaultAsync();

                // teste fica no service 
                if (result == null)
                {
                    throw new Exception("senha errada");
                }
                else
                {
                    return result;
                }
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<User> CreateUser(User user)
        {
            //try/catch
            await _gestaoOfficinaContext.user.AddAsync(user);
            await _gestaoOfficinaContext.SaveChangesAsync();
            return user;
        }

    }
}
