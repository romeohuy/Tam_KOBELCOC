using Composite.Data;
using Kobelco;
using Microsoft.SqlServer.Types;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

/// <summary>s
/// Summary description for Dealer
/// </summary>
[RoutePrefix("api/dealers")]
public class DealersController : ApiController
{
    private const string FilterSQL = @"select d.Id, d.Name, d.StreetAddress, d.City, d.State, d.PostalCode, c.Name as Country, d.Phone, d.Website, d.Latitude, d.Longitude, @point.STDistance(geography::Point(d.Latitude, d.Longitude, 4326)) / @distanceUnit as Distance, d.ProductLine from Kobelco_Dealer d
        left join Kobelco_Country c on d.Country = c.Id
        where @point.STDistance(geography::Point(d.Latitude, d.Longitude, 4326)) / @distanceUnit <= @distance
        order by Distance";

    private readonly string ConnectionString;

    public DealersController()
    {
        ConnectionString = ConfigurationManager.ConnectionStrings["c1"].ConnectionString;
    }

    [HttpGet]
    public async Task<DealerFeatureCollection> FilterByDistance(decimal distance = decimal.MinValue, string distanceUnit = null, double latitude = double.MinValue, double longitude = double.MinValue)
    {
        var dealerFeatures = new List<DealerFeature>();
        if (distance == decimal.MinValue || string.IsNullOrEmpty(distanceUnit) || latitude == double.MinValue || longitude == double.MinValue)
        {
            var iconUtils = new MapIconUtility();

            //load from composite to take advantage of caching
            using (var connection = new DataConnection(PublicationScope.Published))
            {
                dealerFeatures =
                    (from d in connection.Get<Dealer>()
                     join c in connection.Get<Country>()
                     on d.Country equals c.Id
                     select new DealerFeature(d.Id.ToString(), new PointGeometry(d.Longitude, d.Latitude), new DealerProperties { Name = d.Name, StreetAddress = d.StreetAddress, City = d.City, State = d.State, PostalCode = d.PostalCode, Country = c.Name, Phone = d.Phone, Website = d.Website, ProductLine = iconUtils.GetIcon(d.ProductLine) })).OrderBy(d => d.Properties.Name).ToList();
                return new DealerFeatureCollection(dealerFeatures);
            }
        }
        try
        {
            decimal distanceUnitConversion = 1609.344m; //miles by default
            switch (distanceUnit)
            {
                case "km": distanceUnitConversion = 1000; break;
                case "nm": distanceUnitConversion = 1852; break;
            }

            var point = SqlGeometry.Point(latitude, longitude, 4326);
            using (var sqlConnection = new SqlConnection(ConnectionString))
            {
                await sqlConnection.OpenAsync();
                using (var sqlCommand = new SqlCommand(FilterSQL, sqlConnection))
                {
                    sqlCommand.Parameters.AddWithValue("@distance", distance);
                    sqlCommand.Parameters.AddWithValue("@distanceUnit", distanceUnitConversion);
                    var pointParameter = sqlCommand.Parameters.Add("@point", SqlDbType.Udt);
                    pointParameter.UdtTypeName = "geography";
                    pointParameter.Value = point;

                    var iconUtils = new MapIconUtility();

                    using (var reader = await sqlCommand.ExecuteReaderAsync())
                    {
                        if (reader.HasRows)
                        {
                            while (reader.Read())
                            {
                                var dealerProperties = new DealerProperties
                                {
                                    Name = reader.GetString(1).Trim(),
                                    StreetAddress = reader.GetString(2).Trim(),
                                    City = reader.GetString(3).Trim(),
                                    State = reader.GetString(4).Trim(),
                                    PostalCode = reader.IsDBNull(5) ? null : reader.GetString(5).Trim(),
                                    Country = reader.GetString(6),
                                    Phone = reader.GetString(7),
                                    Website = reader.GetString(8),
                                    Distance = reader.GetDouble(11).ToString("0.##") + " " + distanceUnit,
                                    ProductLine = iconUtils.GetIcon(reader.GetString(12))
                                };
                                dealerFeatures.Add(new DealerFeature(reader.GetGuid(0).ToString(), new PointGeometry(reader.GetDecimal(10), reader.GetDecimal(9)), dealerProperties));
                            }
                            var sort = dealerFeatures.OrderBy(s => s.Properties.Distance.Length).ThenBy(s => s.Properties.Distance);
                            dealerFeatures = sort.ToList();
                        }
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Composite.Core.Log.LogError("An error occurred when trying to filter locations by distance", ex);
        }

        return new DealerFeatureCollection(dealerFeatures);
    }

}

