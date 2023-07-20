using FluentValidation.AspNetCore;
using GestaoOfficina.Aplicattion.DependecyInject;
using GestaoOfficina.Domain.ClientValidators;
using GestaoOfficina.Domain.Model;
using GestaoOfficina.Domain.Validators;
using GestaoOfficina.Infra.Context;
using GestaoOfficina.Infra.DependecyInject;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GestaoOfficina
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<GestaoOfficinaContext>(
                opt => opt.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddAplication()
            .AddInfrastruture();
            services.AddControllers()
            .AddFluentValidation(config => config.RegisterValidatorsFromAssemblyContaining<ClientValidators>())
            .AddFluentValidation(config => config.RegisterValidatorsFromAssemblyContaining<AutomovelValidators>());


            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "GestaoOfficina", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "GestaoOfficina v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
