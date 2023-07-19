using GestaoOfficinaProj.Domain.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Infra.Context
{
    public class GestaoOfficinaContext : DbContext
    {
        public GestaoOfficinaContext(DbContextOptions<GestaoOfficinaContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<Client> client { get; set; }
        public DbSet<User> user { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
