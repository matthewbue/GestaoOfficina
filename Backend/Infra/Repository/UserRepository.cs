using GestaoOfficinaProj.Domain.DTO;
using GestaoOfficinaProj.Domain.Model;
using GestaoOfficinaProj.Infra.Context;
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
        public async Task<User> login(LoginDTO login)
        {
            try
            {
                var result = await _gestaoOfficinaContext.user.Where(x => x.Email == login.Email && x.Password == login.Password).FirstOrDefaultAsync();

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
            await _gestaoOfficinaContext.user.AddAsync(user);
            await _gestaoOfficinaContext.SaveChangesAsync();
            return user;
        }

    }
}
