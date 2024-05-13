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
        public DbSet<Client> Clients { get; set; }
        public DbSet<Empresa> Empresas { get; set; }

        public DbSet<User> Users { get; set; }
        public DbSet<Manutence> Manutences { get; set; }
        public DbSet<Automovel> Automoveis { get; set; }
        public DbSet<Servico> Servicos { get; set; }
        public DbSet<ManutenceServico> ManutenceServicos { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
           //optionsBuilder.UseLazyLoadingProxies();


        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Automovel>()
                .HasOne(c => c.Client)
                .WithMany(c => c.Automoveis)
                .HasForeignKey(c => c.ClientId);

            modelBuilder.Entity<Manutence>()
                .HasOne(m => m.Automovel)
                .WithMany(c => c.Manutences)
                .HasForeignKey(m => m.AutomovelId);

            modelBuilder.Entity<Automovel>()
                .Ignore(a => a.Client);
        }
    }
}
