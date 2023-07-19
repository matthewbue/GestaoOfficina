using GestaoOfficinaProj.Infra.Interface;
using GestaoOfficinaProj.Infra.Repository;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Infra.DependecyInject
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddInfrastruture(this IServiceCollection services)
        {
            services.AddScoped <IClientRepository ,ClientRepository> ();
            services.AddScoped<IUserRepository, UserRepository>();
            return services;
        }
    }
}
