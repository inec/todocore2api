using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace todo_core_webapi
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

            var todoRepository = new todo_core_webapi.Data.InMemory.TodoRepository();

			services.AddSingleton(typeof(todo_core_webapi.Data.ITodoRepository), todoRepository);

			services.AddMvc()
					.AddJsonOptions(opt => {
						opt.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
					});
           
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
 app.UseDefaultFiles();
    app.UseStaticFiles();
 	app.MapWhen(context => context.Request.Method == HttpMethod.Options.ToString(), OptionsMiddleware);
            app.UseMvc();
        }
        private static void OptionsMiddleware(IApplicationBuilder app)
		{
			app.Run(async context =>
			{
				await context.Response.WriteAsync("");
			});
		}
    }
}
