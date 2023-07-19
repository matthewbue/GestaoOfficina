using GestaoOfficina.Aplicattion.Service;
using GestaoOfficina.Infra.Interface;
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
            return services; 
        }
    }
}
