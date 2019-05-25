using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for MapIconUtility
/// </summary>
public class MapIconUtility
{
    public string GetIcon(string productLine)
    {
        var iconBase = "/Frontend/Images/icons/";
        string icon = string.Empty;
        string mini = string.Empty;
        string conventional = string.Empty;
        string demo = string.Empty;
        string parts = string.Empty;
        string midi = string.Empty;
        if (!string.IsNullOrEmpty(productLine))
        {
            using (var c = new Composite.Data.DataConnection())
            {
                var dataProductLines = c.Get<Kobelco.ProductLine>().ToList();
                foreach (var pl in dataProductLines)
                {
                    switch (pl.Name)
                    {
                        case "MHEX":
                            mini = pl.Id.ToString();
                            break;
                        case "CHEX":
                            conventional = pl.Id.ToString();
                            break;
                        case "PARTS":
                            parts = pl.Id.ToString();
                            break;
                        case "DEMO":
                            demo = pl.Id.ToString();
                            break;
                        case "MIDI":
                            midi = pl.Id.ToString();
                            break;
                        default:
                            break;
                    }
                }
            }
            if ((productLine.Contains(mini) || productLine.Contains(midi)) && !productLine.Contains(conventional)) {
                icon = "mini.png";
            } else if (productLine.Contains(conventional) || productLine.Contains(demo)) {
                icon = "fullline.png";
            } else if (productLine.Contains(parts) && !productLine.Contains(midi) && !productLine.Contains(mini) && !productLine.Contains(demo))
            {
                icon = "parts.png";
            }
        } else
        {
            icon = "latinamerica.png";
        }

        return iconBase + icon;
        

        //
        // TODO: Add constructor logic here
        //
    }
}