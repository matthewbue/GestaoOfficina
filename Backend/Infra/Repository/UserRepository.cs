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
            var result = await _gestaoOfficinaContext.Users
                .AsNoTracking()
                .Where(x => x.CPF == login.CPF && x.Password == login.Password)
                .FirstOrDefaultAsync();
            return result;
        }

        public async Task<User> CreateUser(User user)
        {
            await _gestaoOfficinaContext.Users.AddAsync(user);
            await _gestaoOfficinaContext.SaveChangesAsync();
            return user;
        }

        public async Task<User?> GetById(int id)
        {
            return await _gestaoOfficinaContext.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<User>> GetAll()
        {
            return await _gestaoOfficinaContext.Users
                .AsNoTracking()
                .OrderBy(x => x.Id)
                .ToListAsync();
        }

        public async Task<bool> EmailExists(string email, int? ignoringUserId = null)
        {
            if (string.IsNullOrWhiteSpace(email)) return false;

            var query = _gestaoOfficinaContext.Users.AsNoTracking().Where(x => x.Email == email);
            if (ignoringUserId.HasValue)
                query = query.Where(x => x.Id != ignoringUserId.Value);

            return await query.AnyAsync();
        }

        public async Task<bool> CpfExists(string cpf, int? ignoringUserId = null)
        {
            if (string.IsNullOrWhiteSpace(cpf)) return false;

            var query = _gestaoOfficinaContext.Users.AsNoTracking().Where(x => x.CPF == cpf);
            if (ignoringUserId.HasValue)
                query = query.Where(x => x.Id != ignoringUserId.Value);

            return await query.AnyAsync();
        }

        public async Task<User> Update(User user)
        {
            _gestaoOfficinaContext.Users.Update(user);
            await _gestaoOfficinaContext.SaveChangesAsync();
            return user;
        }

        public async Task<bool> Delete(int id)
        {
            var entity = await _gestaoOfficinaContext.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (entity is null) return false;

            _gestaoOfficinaContext.Users.Remove(entity);
            await _gestaoOfficinaContext.SaveChangesAsync();
            return true;
        }
    }
}
