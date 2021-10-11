using System;
using System.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using flexflix.Data;
using flexflix.Data.Repositories.TvShowRepo;
using flexflix.Data.Repositories.GenreRepo;
using flexflix.Data.Repositories.ActorRepo;
using flexflix.Services.Storage;
using flexflix.Services.TmdbApi;
using flexflix.Data.Repositories.EpisodeActorRepo;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using flexflix.Services.Authentication;
using flexflix.Middleware;

namespace flexflix
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        
        public IConfiguration Configuration { get; set; }
        
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            // Core
            services.AddControllers();
            services.AddMvcCore()
                    .AddApiExplorer()
                    .AddJsonOptions(options =>
                    {
                        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
                    });

            // Http
            services.AddHttpClient();

            // AutoMapper
            services.AddAutoMapper(typeof(Startup));

            // Repositories
            services.AddScoped<ITvShowRepository, TvShowRepository>();
            services.AddScoped<IGenreRepository, GenreRepository>();
            services.AddScoped<IActorRepository, ActorRepository>();
            services.AddScoped<IEpisodeActorRepository, EpisodeActorRepository>();
            
            // Services
            services.AddScoped<IFileStorageService, CloudinaryStorageService>();
            services.AddScoped<ITmdbApiService, TmdbApiService>();
            services.AddScoped<IAuthService, JwtAuthService>();

            // Vue middleware
            services.AddSpaStaticFiles(options => options.RootPath = "client/dist");

            // Database context
            services.AddDbContext<FlexflixContext>(options =>
                options.EnableSensitiveDataLogging()
                       .UseMySQL(Configuration.GetConnectionString("Default")
            ));

            // Authentication
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("Jwt:Key").Value)),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true
                };
            });

            // Swagger
            services.AddSwaggerGen();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "flexflix API");
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGet("/", async context =>
                {
                    await context.Response.WriteAsync("Hello World!");
                });
                endpoints.MapControllers();
            });

            // use middleware and launch server for Vue  
            app.UseSpaStaticFiles();
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "client";
                if (env.IsDevelopment())
                {
                    spa.UseVueDevelopmentServer();
                }
            });
        }
    }
}
