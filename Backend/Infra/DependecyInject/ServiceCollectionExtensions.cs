using GestaoOfficina.Infra.Interface;
using GestaoOfficina.Infra.Repository;
using GestaoOfficinaProj.Infra.Interface;
using GestaoOfficinaProj.Infra.Repository;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Infra.DependecyInject
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddInfrastruture(this IServiceCollection services)
        {
            services.AddScoped <IClientRepository ,ClientRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IManutenceRepository, ManutenceRepository>();
            services.AddScoped<IAutomovelRepository, AutomovelRepository>();
            services.AddScoped<IServicoRepository, ServicoRepository>();
            return services;
        }
    }
}
