using Composite.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Xml;

/// <summary>
/// Summary description for SitemapHandler
/// </summary>
/// 
namespace HttpHandlers
{
    public class SitemapHandler : IHttpHandler
    {
        string BaseUrl = "https://kobelco-usa.com";
        List<Kobelco.Models> allModels = null;
        List<Kobelco.SizeClasses> allSizes = null;

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/xml";
            using (XmlTextWriter writer = new XmlTextWriter(context.Response.OutputStream, Encoding.UTF8))
            {
                writer.WriteStartDocument();
                writer.WriteStartElement("urlset");
                writer.WriteAttributeString("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9");

                //Content Pages
                using (DataConnection dataConn = new DataConnection())
                {
                    SitemapNavigator sitemapNavigator = new SitemapNavigator(dataConn);
                    allModels = dataConn.Get<Kobelco.Models>().ToList();
                    allSizes = dataConn.Get<Kobelco.SizeClasses>().ToList();
                    WriteContentPageSitemap(writer, sitemapNavigator.HomePageNodes.First());
                }

                if (allModels != null && allSizes != null)
                {
                    WriteKobelcoModelsToSitemap(writer, allModels, allSizes);
                }

                writer.WriteEndElement();
                writer.WriteEndDocument();
                writer.Flush();

                context.Response.End();
            }
        }

        private void WriteContentPageSitemap(XmlTextWriter writer, PageNode page)
        {
            if (page.ChildPages.Any())
            {
                foreach (PageNode node in page.ChildPages)
                {
                    WriteContentPageSitemap(writer, node);
                }

            }
            WriteSitemapNode(writer, BaseUrl + page.Url, page.ChangedDate);

        }

        private void WriteKobelcoModelsToSitemap(XmlTextWriter writer, List<Kobelco.Models> models, List<Kobelco.SizeClasses> classes)
        {
            foreach (var sizeClass in classes)
            {
                string specialtyClassList = "demolition, high-wide, hybrid, long-reach, mass-excavator, super-short-arm";
                var modelList = models.Where(m => m.SizeClass == sizeClass.Id).ToList();

                if (specialtyClassList.Contains(sizeClass.Name.ToLower().Replace(" ", "-").Replace("&", "").Replace("--", "-")))
                {
                    foreach (var model in modelList)
                    {
                        string region = model.Region.ToLower().Replace(" ", "-");
                        string modelName = model.Label.Replace(" ", "-").Replace("&", "").Replace("--", "-").ToLower();
                        string finalUrl = "/excavators/excavators/" + region + "/specialty-excavators/" + modelName;
                        WriteSitemapNode(writer, BaseUrl + finalUrl);
                    }
                }
                else if (sizeClass.Name.ToLower().Contains("legacy"))
                {
                    
                        List<string> legacyUrls = new List<string> { "/excavators/excavators/north-america/legacy-excavators", "/excavators/excavators/latin-america/legacy-excavators" };
                        foreach (var legacyUrl in legacyUrls)
                        {
                            WriteSitemapNode(writer, BaseUrl + legacyUrl);
                        }

                }
                else
                {
                    foreach (var model in modelList)
                    {
                        string region = model.Region.Replace(" ", "-").ToLower();
                        string category = sizeClass.Name.ToLower().Replace(" ", "-");
                        string modelName = model.Label.Replace(" ", "-").Replace("&", "").Replace("--", "-").ToLower();
                        string finalUrl = "/excavators/excavators/" + region + "/" + category + "/" + modelName;
                        WriteSitemapNode(writer, BaseUrl + finalUrl);

                    }
                }
            }
        }

        private void WriteSitemapNode(XmlTextWriter writer, String pageUrl)
        {
            WriteSitemapNode(writer, pageUrl, null);
        }

        private void WriteSitemapNode(XmlTextWriter writer, String pageUrl, DateTime? lastChanged)
        {
            writer.WriteStartElement("url");
            writer.WriteElementString("loc", pageUrl);

            //if (lastChanged != null)
            //{
            //    writer.WriteElementString("lastmod", string.Format("{0:yyyy-MM-dd", lastChanged));
            //}

            writer.WriteEndElement();
        }

        public bool IsReusable
        {
            //To enable pooling, return true here.
            //This keeps the handler in memory
            get { return false; }
        }
    }
}