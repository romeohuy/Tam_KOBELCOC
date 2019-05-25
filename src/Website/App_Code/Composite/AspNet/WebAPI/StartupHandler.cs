using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using Composite.AspNet.MvcFunctions;
using Composite.Core.Application;
using Composite.Core.Routing;

namespace Composite.AspNet.WebAPI
{
    [ApplicationStartup]
    public static class StartupHandler
    {
        public static void OnBeforeInitialize()
        {
            //var functions = MvcFunctionRegistry.NewFunctionCollection();
            //functions.RegisterController<DealersController>("Kobelco.Dealers");
            //functions.RouteCollection.MapMvcAttributeRoutes();
            //functions.RouteCollection.MapRoute(
            //    "Default",
            //    "{controller}/{action}/{id}",
            //    new { action = "Index", id = UrlParameter.Optional }
            //    );
            //functions.RegisterAction<DealersController>("Load", "Kobelco.MVC.Dealers");
            //Routes.OnBeforePageRouteAdded += RegisterRoutes;

            //var functions = MvcFunctionRegistry.NewFunctionCollection();
            //functions.RouteCollection.MapMvcAttributeRoutes();
            //functions.RouteCollection.MapRoute(
            //    "Default",
            //    "{controller}/{action}/{id}",
            //    new { action = "Index", id = UrlParameter.Optional }
            //    );

           // functions.RegisterController<DealersController>("Kobelco.MVC.Dealers");
            //functions.RegisterAction<DealersController>("Load", "Kobelco.MVC.Dealers");
        }

        //private static void RegisterRoutes(RouteCollection routes)
        //{
        //    routes.MapRoute(
        //        "Default",
        //        "{controller}/{action}/{id}",
        //        new { action = "Index", id = UrlParameter.Optional }
        //        );            
        //}

        public static void OnInitialized()
        {
            GlobalConfiguration.Configure(WebApiRegister);
            GlobalConfiguration.Configuration.Formatters.Insert(0, new CustomIDataXmlFormatter());
        }

        public static void WebApiRegister(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute("DefaultApi", "api/{controller}/{id}", new { id = RouteParameter.Optional });
            //config.Routes.MapHttpRoute("ActionApi",  "api/{controller}/{action}/{id}", defaults: new { id = RouteParameter.Optional });
            JsonIDataSerialization.WrapJsonContentResolver(config);
        }
    }
}
