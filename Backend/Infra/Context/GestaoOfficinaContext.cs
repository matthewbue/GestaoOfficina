using GestaoOfficina.Domain.Model;
using GestaoOfficinaProj.Domain.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Infra.Context
{
    public class GestaoOfficinaContext : DbContext
    {
        public GestaoOfficinaContext(DbContextOptions<GestaoOfficinaContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<Client> Client { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Manutence> Manutences { get; set; }
        public DbSet<Automovel> Automovel { get; set; }
        public DbSet<Servico> Servico { get; set; }
        public DbSet<ManutenceServico> ManutenceServico { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
