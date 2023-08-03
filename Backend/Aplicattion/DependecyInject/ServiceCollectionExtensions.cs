using GestaoOfficina.Aplicattion.Service;
using GestaoOfficina.Infra.Interface;
using GestaoOfficinaProj.Aplicattion.Service;
using GestaoOfficinaProj.Infra.Interface;
using GestaoOfficinaProj.Infra.Repository;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Aplicattion.DependecyInject
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddAplication(this IServiceCollection services)
        {
            services.AddScoped<IClientService ,ClientService>();
            services.AddScoped<IUserService ,UserService>();
            services.AddScoped<IManutenceService ,ManutenceService>();
            services.AddScoped<IAutomovelService, AutomovelService>();
            services.AddScoped<IServicoManutenceService, ServicoManutenceService>();
            return services; 
        }
    }
}
