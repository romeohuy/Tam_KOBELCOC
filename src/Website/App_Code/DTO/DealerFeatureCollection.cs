using Newtonsoft.Json;
using System.Collections.Generic;

/// <summary>
/// The collection of dealer features (can be serialized into GeoJSON)
/// </summary>
public class DealerFeatureCollection
{
    public DealerFeatureCollection(List<DealerFeature> features)
    {
        Type = "FeatureCollection";
        Features = features;
    }

    [JsonProperty("type")]
    public string Type { get; private set; }
    [JsonProperty("features")]
    public List<DealerFeature> Features { get; private set; }
}

/// <summary>
/// A GeoJSON feature representing a dealer.
/// </summary>
public class DealerFeature
{
    public DealerFeature(string id, PointGeometry geometry, DealerProperties properties)
    {
        Id = id;
        Properties = properties;
        Geometry = geometry;
        Type = "Feature";
    }
    [JsonProperty("id")]
    public string Id { get; private set; }

    [JsonProperty("geometry")]    
    public PointGeometry Geometry { get; private set; }

    [JsonProperty("properties")]
    public DealerProperties Properties { get; private set; }

    [JsonProperty("type")]
    public string Type { get; private set; }

}

/// <summary>
/// The GeoJSON properties for a dealer
/// </summary>
public class DealerProperties
{
    [JsonProperty("name")]
    public string Name { get; set; }

    [JsonProperty("streetAddress")]
    public string StreetAddress { get; set; }

    [JsonProperty("city")]
    public string City { get; set; }

    [JsonProperty("state")]
    public string State { get; set; }

    [JsonProperty("postalCode")]
    public string PostalCode { get; set; }

    [JsonProperty("country")]
    public string Country { get; set; }

    [JsonProperty("phone")]
    public string Phone { get; set; }

    [JsonProperty("website")]
    public string Website { get; set; }

    [JsonProperty("distance")]
    public string Distance { get; set; }

    [JsonProperty("icon")]
    public string ProductLine { get; set; }
}

/// <summary>
/// The GeoJSON geometry representing the latitude/longitude point at which the dealer is located
/// </summary>
public class PointGeometry
{
    public PointGeometry(decimal latitude, decimal longitude)
    {
        Type = "Point";
        Coordinates = new decimal[] { latitude, longitude };
    }

    [JsonProperty("type")]
    public string Type { get; private set; }

    [JsonProperty("coordinates")]
    public decimal[] Coordinates { get; private set; }
}