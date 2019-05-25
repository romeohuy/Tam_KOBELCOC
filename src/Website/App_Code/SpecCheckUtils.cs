using System;
using System.Collections.Generic;
using RestSharp;
using System.Configuration;
using System.Text;
using System.Security.Cryptography;
using Newtonsoft.Json;

/// <summary>
/// Summary description for SpecCheckUtils
/// </summary>
namespace Kobelco.Utils
{

    public class MachineSpecsModel
    {
        public string OverallLength { get; set; }
        public string OverallHeight { get; set; }
        public string OverallWidth { get; set; }
        public string OverallHeightCab { get; set; }
        public string GroundClearanceRear { get; set; }
        public string GroundClearance { get; set; }
        public string TailSwingRadius { get; set; }
        public string CenterSwingRearEnd { get; set; }
        public string TumblerDistance { get; set; }
        public string CrawlerLength { get; set; }
        public string TrackGauge { get; set; }
        public string ShoeWidth { get; set; }
        public string UpperstructureOverallWidth { get; set; }
        public string BucketCapacityMin { get; set; }
        public string BucketCapacityMax { get; set; }
        public string BucketCapacityHeaped { get; set; }
        public string TravelSpeedLow { get; set; }
        public string TravelSpeedHigh { get; set; }
        public string SwingSpeed { get; set; }
        public string SwingTorque { get; set; }
        public string DrawbarPullingForce { get; set; }
        public string BucketDiggingForce { get; set; }
        public string ArmCrowdingForce { get; set; }
        public string MachineMass { get; set; }
        public string GroundPressure { get; set; }
        public string EngineManufacturer { get; set; }
        public string EngineModel { get; set; }
        public string EngineType { get; set; }
        public string EnginePowerOutputNet { get; set; }
        public string EnginePowerOutputGross { get; set; }
        public string EngineMaxTorque { get; set; }
        public string EngineDisplacement { get; set; }
        public string EngineFuelTank { get; set; }
        public string HydroNumberOfPumps { get; set; }
        public string HydroPump { get; set; }
        public string HydroPilotPump { get; set; }
        public string HydroMaxDischargeFlowMain { get; set; }
        public string HydroMaxDischargeFlowPilot { get; set; }
        public string HydroMaxDischargePressure { get; set; }
        public string HydroCapacity { get; set; }
        public string DozerBladeWidth { get; set; }
        public string DozerBladeHeight { get; set; }
        public string DozerBladeHeightRaised { get; set; }
        public string DozerBladeDigDepth { get; set; }
        public string MaxDiggingReach { get; set; }
        public string MaxDiggingReachGroundLevel { get; set; }
        public string MaxDiggingDepth { get; set; }
        public string MaxDiggingHeight { get; set; }
        public string MaxDumpingClearance { get; set; }
        public string MinDumpingClearance { get; set; }
        public string MaxVerticalWallDiggingDepth { get; set; }
        public string MinSwingRadius { get; set; }
        public string HorizontalDiggingStrokeGroundLevel { get; set; }
        public string DiggingDepthEightFtFlatBottom { get; set; }

    }
    public class MachinesObject
    {
        //public List<Families> Machine_Families { get; set; }
       // public List<Ranges> Machine_Ranges { get; set; }
        //public List<Machines> Machine_Main { get; set; }
    }


    public class Families
    {
        public string Family { get; set; }
        public string Family_ID { get; set; }
    }

    public class Ranges
    {
        public string Range { get; set; }
        public string Range_ID { get; set; }
        public string Sort { get; set; }
        public string UOM { get; set; }
    }

    public class MachineDetailsChild
    {
        public string Column_Value { get; set; }
    }

    public class MachineDetailsNodeOne
    {
        public string Label { get; set; }
        public string DataType { get; set; }
        public string Unit { get; set; }
        public string[] Data { get; set; }
    }

    public class MachineDetailsSC
    {
        public string Label { get; set; }
        public string DataType { get; set; }
        public List<Dictionary<string, string>> Data { get; set; }
        public string Unit { get; set; }
        
    }



public class SpecCheckUtils
    {
        //public static List<MachineDetailsSC> GetMachineData(string MachineId)
        public static MachineSpecsModel GetMachineData(string MachineId)
        {
            string secret = ConfigurationManager.AppSettings["SpecCheckSecret"];
            //string cid = ConfigurationManager.AppSettings["SpeckCheckCID"];
            string time = DateTime.UtcNow.ToString("yyyyMMddHHmmss");
            byte[] keyByte = Encoding.ASCII.GetBytes(secret);
            HMACSHA1 hmacsha1 = new HMACSHA1(keyByte);
            ASCIIEncoding encoding = new ASCIIEncoding();
            byte[] messageBytes = Encoding.ASCII.GetBytes("time" + time);
            byte[] hashMessage = hmacsha1.ComputeHash(messageBytes);
            string key = "";

            for (int i=0; i< hashMessage.Length; i++)
            {
                key += hashMessage[i].ToString("X2");
            }

            Random rnd = new Random();
            int r = rnd.Next(10, 99);
            int s = rnd.Next(10, 99);
            int t = rnd.Next(10, 99);
            int CID = 54;
            string hhh = r + time + "|" + t + key + "|" + s + CID;

            var client = new RestClient("https://www.speccheck.com/api/machinedata.ashx");
            var request = new RestRequest(Method.GET);
            request.AddParameter("hhh", hhh);
            request.AddParameter("uom", "4");
            request.AddParameter("mids", MachineId);

            var response = client.Execute(request);

            var result = response.Content.ToString();

            var eventResponse = JsonConvert.DeserializeObject<List<MachineDetailsSC>>(result);

            var finalModel = PopulateModel(eventResponse);

            //machinesList = deserial.Deserialize<List<Machines>>(response);
            //MachinesObject machines = deserial.Deserialize<MachinesObject>(response);


            //return response.Data;
            //return eventResponse;
            return finalModel;
        }

        public static MachineSpecsModel PopulateModel(List<MachineDetailsSC> specCheckResponse)
        {
            MachineSpecsModel specModel = new MachineSpecsModel();

            foreach(var entity in specCheckResponse)
            {
                if (entity.Label != null && entity.Label != "")
                {
                    switch (entity.Label.TrimEnd())
                    {
                        case "Transport Length - Maximum":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var overallLength = kvp.Value.Replace("  ", " ").Split('[');
                                        int metricresult;
                                        var overallLengthStandard = overallLength[0].Replace(" ", "").Replace("ft", "' ").Replace("in", "\"");
                                        var overallLengthMetricInt = Int32.TryParse(overallLength[1].Replace("]", ""), out metricresult);
                                        var overallLengthMetric = string.Format("{0:n0}", metricresult);
                                        specModel.OverallLength = overallLengthStandard + " (" + overallLengthMetric + " mm)";
                                    }
                                }
                            }
                            break;
                        case "Transport Height - Maximum":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var overallHeight = kvp.Value.Replace("  ", " ").Split('[');
                                        int metricresult;
                                        var overallHeightStandard = overallHeight[0].Replace(" ", "").Replace("ft", "' ").Replace("in", "\"");
                                        var overallHeightMetricInt = Int32.TryParse(overallHeight[1].Replace("]", ""), out metricresult);
                                        var overallHeightMetric = string.Format("{0:n0}", metricresult);
                                        specModel.OverallHeight = overallHeightStandard + " (" + overallHeightMetric + " mm)";
                                    }
                                }
                            }
                            break;
                        case "Overall Width - Maximum":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var overallWidth = kvp.Value.Replace("  ", " ").Split('[');
                                        int metricresult;
                                        var overallWidthStandard = overallWidth[0].Replace(" ", "").Replace("ft", "' ").Replace("in", "\"");
                                        var overallWidthMetricInt = Int32.TryParse(overallWidth[1].Replace("]", ""), out metricresult);
                                        var overallWidthMetric = string.Format("{0:n0}", metricresult);
                                        specModel.OverallWidth = overallWidthStandard + " (" + overallWidthMetric + " mm)";
                                    }
                                }
                            }
                            break;
                        case "Height - Canopy":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var overallHeightCab = kvp.Value.Replace("  ", " ").Split('[');
                                        int metricresult;
                                        var overallHeightCabStandard = overallHeightCab[0].Replace(" ", "").Replace("ft", "' ").Replace("in", "\"");
                                        var overallHeightCabMetricInt = Int32.TryParse(overallHeightCab[1].Replace("]", ""), out metricresult);
                                        var overallHeightCabMetric = string.Format("{0:n0}", metricresult);
                                        specModel.OverallHeightCab = overallHeightCabStandard + " (" + overallHeightCabMetric + " mm)";
                                    }
                                }
                            }
                            break;
                        case "Ground Clearance":
                            if (entity.Data != null)
                            {

                                
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var groundClearance = kvp.Value.Replace("  ", " ").Split(' ');
                                        var groundClearanceStandard = groundClearance[0] + "\"";
                                        var groundClearanceMetric = groundClearance[1].Replace("[", "(").Replace("]", " mm)");
                                        specModel.GroundClearance = groundClearanceStandard + " " + groundClearanceMetric;
                                    }
                                }
                            }
                            break;
                        case "Counterweight Clearance":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var groundClearanceRear = kvp.Value.Replace("  ", " ").Split('[');
                                        int metricresult;
                                        var groundClearanceRearStandard = groundClearanceRear[0].Replace(" ", "").Replace("ft", "' ").Replace("in", "\"");
                                        var groundClearanceRearMetricInt = Int32.TryParse(groundClearanceRear[1].Replace("]", ""), out metricresult);
                                        var groundClearanceRearMetric = string.Format("{0:n0}", metricresult);
                                        specModel.GroundClearanceRear = groundClearanceRearStandard + " (" + groundClearanceRearMetric + " mm)";
                                    }
                                }
                            }
                            break;
                        case "Tailswing Radius":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var tailSwingRadius = kvp.Value.Replace("  ", " ").Split('[');
                                        int metricresult;
                                        var tailSwingRadiusStandard = tailSwingRadius[0].Replace(" ", "").Replace("ft", "' ").Replace("in", "\"");
                                        var tailSwingRadiusMetricInt = Int32.TryParse(tailSwingRadius[1].Replace("]", ""), out metricresult);
                                        var tailSwingRadiusMetric = string.Format("{0:n0}", metricresult);
                                        specModel.TailSwingRadius = tailSwingRadiusStandard + " (" + tailSwingRadiusMetric + " mm)";
                                    }
                                }
                            }
                            break;
                        case "Tail Length":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var centerSwingRearEnd = kvp.Value.Replace("  ", " ").Split('[');
                                        int metricresult;
                                        var centerSwingRearEndStandard = centerSwingRearEnd[0].Replace(" ", "").Replace("ft", "' ").Replace("in", "\"");
                                        var centerSwingRearEndMetricInt = Int32.TryParse(centerSwingRearEnd[1].Replace("]", ""), out metricresult);
                                        var centerSwingRearEndMetric = string.Format("{0:n0}", metricresult);
                                        specModel.CenterSwingRearEnd = centerSwingRearEndStandard + " (" + centerSwingRearEndMetric + " mm)";
                                    }
                                }
                            }
                            break;
                        case "Track Length On Ground":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var tumblerDistance = kvp.Value.Replace("  ", " ").Split('[');
                                        int metricresult;
                                        var tumblerDistanceStandard = tumblerDistance[0].Replace(" ", "").Replace("ft", "' ").Replace("in", "\"");
                                        var tumblerDistanceMetricInt = Int32.TryParse(tumblerDistance[1].Replace("]", ""), out metricresult);
                                        var tumblerDistanceMetric = string.Format("{0:n0}", metricresult);
                                        specModel.TumblerDistance = tumblerDistanceStandard + " (" + tumblerDistanceMetric + " mm)";
                                    }
                                }
                            }
                            break;
                        case "Undercarriage Overall Length":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var crawlerLength = kvp.Value.Replace("  ", " ").Split('[');
                                        int metricresult;
                                        var crawlerLengthStandard = crawlerLength[0].Replace(" ", "").Replace("ft", "' ").Replace("in", "\"");
                                        var crawlerLengthMetricInt = Int32.TryParse(crawlerLength[1].Replace("]", ""), out metricresult);
                                        var crawlerLengthMetric = string.Format("{0:n0}", metricresult);
                                        specModel.CrawlerLength = crawlerLengthStandard + " (" + crawlerLengthMetric + " mm)";
                                    }
                                }
                            }
                            break;
                        case "Track Gauge":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var trackGauge = kvp.Value.Replace("  ", " ").Split('[');
                                        int metricresult;
                                        var trackGaugeStandard = trackGauge[0].Replace(" ", "").Replace("ft", "' ").Replace("in", "\"");
                                        var trackGaugeMetricInt = Int32.TryParse(trackGauge[1].Replace("]", ""), out metricresult);
                                        var trackGaugeMetric = string.Format("{0:n0}", metricresult);
                                        specModel.TrackGauge = trackGaugeStandard + " (" + trackGaugeMetric + " mm)";
                                    }
                                }
                            }
                            break;
                        case "Track Shoe Width":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var shoeWidth = kvp.Value.Replace("  ", " ").Split('[');
                                        int metricresult;
                                        var shoeWidthStandard = shoeWidth[0].Replace(" ", "").Replace("ft", "' ").Replace("in", "\"");
                                        var shoeWidthMetricInt = Int32.TryParse(shoeWidth[1].Replace("]", ""), out metricresult);
                                        var shoeWidthMetric = string.Format("{0:n0}", metricresult);
                                        specModel.ShoeWidth = shoeWidthStandard + " (" + shoeWidthMetric + " mm)";
                                    }
                                }
                            }
                            break;
                        case "Superstructure Width":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var upperstructureOverallWidth = kvp.Value.Replace("  ", " ").Split('[');
                                        int metricresult;
                                        var upperstructureOverallWidthStandard = upperstructureOverallWidth[0].Replace(" ", "").Replace("ft", "' ").Replace("in", "\"");
                                        var upperstructureOverallWidthMetricInt = Int32.TryParse(upperstructureOverallWidth[1].Replace("]", ""), out metricresult);
                                        var upperstructureOverallWidthMetric = string.Format("{0:n0}", metricresult);
                                        specModel.UpperstructureOverallWidth = upperstructureOverallWidthStandard + " (" + upperstructureOverallWidthMetric + " mm)";
                                    }
                                }
                            }
                            break;
                        case "Heaped Bucket Capacity - Standard":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var heapedBucketCapacity = kvp.Value.Replace("  ", " ").Split(' ');
                                        var heapedBucketCapacityStandard = heapedBucketCapacity[0] + " yd³";
                                        var heapedBucketCapacityMetric = heapedBucketCapacity[1].Replace("[", "(").Replace("]", " m³)");
                                        specModel.BucketCapacityHeaped = heapedBucketCapacityStandard + " " + heapedBucketCapacityMetric;
                                    }
                                }
                            }
                            break;
                        case "Travel Speed - Low":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var travelSpeedLow = kvp.Value.Replace("  ", " ").Split(' ');
                                        var travelSpeedLowStandard = travelSpeedLow[0] + " mph";
                                        var travelSpeedLowMetric = travelSpeedLow[1].Replace("[", "(").Replace("]", " kph)");
                                        specModel.TravelSpeedLow = travelSpeedLowStandard + " " + travelSpeedLowMetric;
                                    }
                                }
                            }
                            break;
                        case "Travel Speed - High":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var travelSpeedHigh = kvp.Value.Replace("  ", " ").Split(' ');
                                        var travelSpeedHighStandard = travelSpeedHigh[0] + " mph";
                                        var travelSpeedHighMetric = travelSpeedHigh[1].Replace("[", "(").Replace("]", " kph)");
                                        specModel.TravelSpeedHigh = travelSpeedHighStandard + " " + travelSpeedHighMetric;
                                    }
                                }
                            }
                            break;
                        case "Slew Speed":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        //var slewSpeed = kvp.Value.Replace("  ", " ").Split(' ');
                                        //var slewSpeedStandard = slewSpeed[0] + " rpm";
                                        specModel.SwingSpeed = kvp.Value + " " + entity.Unit;
                                    }
                                }
                            }
                            break;
                        case "Slew Torque":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var torque = kvp.Value.Replace("  ", " ").Split(' ');
                                        decimal standardresult;
                                        var torqueStandardInt = Decimal.TryParse(torque[0], out standardresult);
                                        var torqueStandard = string.Format("{0:0,0.#}", standardresult) + " lbf/ft";
                                        var torqueMetric = torque[1].Replace("[", "(").Replace("]", " kNm)");
                                        specModel.SwingTorque = torqueStandard + " " + torqueMetric;
                                    }
                                }
                            }
                            break;
                        case "Tractive Force":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        decimal standardresult;
                                        var pullingForce = kvp.Value.Replace("  ", " ").Split(' ');
                                        var pullingForceStandardInt = Decimal.TryParse(pullingForce[0], out standardresult);
                                        var pullingForceStandard = string.Format("{0:0,0.#}", standardresult) + " lbf";
                                        var pullingForceMetric = pullingForce[1].Replace("[", "(").Replace("]", " kN)");
                                        specModel.DrawbarPullingForce = pullingForceStandard + " " + pullingForceMetric;
                                    }
                                }
                            }
                            break;
                        case "Bucket Breakout":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var diggingForce = kvp.Value.Replace("  ", " ").Split(' ');
                                        decimal standardresult;
                                        var diggingForceStandardInt = Decimal.TryParse(diggingForce[0], out standardresult);
                                        var diggingForceStandard = string.Format("{0:0,0.#}", standardresult) + " lbf";
                                        var diggingForceMetric = diggingForce[1].Replace("[", "(").Replace("]", " kN)");
                                        specModel.BucketDiggingForce = diggingForceStandard + " " + diggingForceMetric;
                                    }
                                }
                            }
                            break;
                        case "Dipper Tearout":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var tearoutForce = kvp.Value.Replace("  ", " ").Split(' ');
                                        decimal standardresult;
                                        var tearoutForceStandardInt = Decimal.TryParse(tearoutForce[0], out standardresult);
                                        var tearoutForceStandard = string.Format("{0:0,0.#}", standardresult) + " lbf";
                                        var tearoutForceMetric = tearoutForce[1].Replace("[", "(").Replace("]", " kN)");
                                        specModel.ArmCrowdingForce = tearoutForceStandard + " " + tearoutForceMetric;
                                    }
                                }
                            }
                            break;
                        case "Operating Weight":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var operatingWeight = kvp.Value.Replace("  ", " ").Split(' ');
                                        decimal standardresult;
                                        decimal metricresult;
                                        var operatingWeightStandardInt = Decimal.TryParse(operatingWeight[0], out standardresult);
                                        var operatingWeightStandard = string.Format("{0:0,0.#}", standardresult) + " lbs";
                                        var operatingWeightMetricInt = Decimal.TryParse(operatingWeight[1].Replace("[", "").Replace("]", ""), out metricresult);
                                        var operatingWeightMetric = string.Format("{0:0,0.#}", metricresult);
                                        specModel.MachineMass = operatingWeightStandard + " (" + operatingWeightMetric + " kg)";
                                    }
                                }
                            }
                            break;
                        case "Engine Manufacturer":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string,string> kvp in entityData)
                                    {
                                        specModel.EngineManufacturer = kvp.Value;
                                    }
                                }
                            }
                            break;
                        case "Engine Model":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        specModel.EngineModel = kvp.Value;
                                    }
                                }
                            }
                            break;
                        //Engine Type
                        case "Engine Output - Net":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var engineNet = kvp.Value.Replace("  ", " ").Split(' ');
                                        var engineNetStandard = string.Format("{0:n0}", engineNet[0]) + " hp";
                                        var engineNetMetric = string.Format("{0:n0}", engineNet[1]).Replace("[", "(").Replace("]", " kW)");
                                        specModel.EnginePowerOutputNet = engineNetStandard + " " + engineNetMetric;
                                    }
                                }
                            }
                            break;
                        case "Engine Output - Gross":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var engineGross = kvp.Value.Replace("  ", " ").Split(' ');
                                        var engineGrossStandard = string.Format("{0:n0}", engineGross[0]) + " hp";
                                        var engineGrossMetric = string.Format("{0:n0}", engineGross[1]).Replace("[", "(").Replace("]", " kW)");
                                        specModel.EnginePowerOutputGross = engineGrossStandard + " " + engineGrossMetric;
                                    }
                                }
                            }
                            break;
                        case "Torque":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var engineTorque = kvp.Value.Replace("  ", " ").Split(' ');
                                        var engineTorqueStandard = string.Format("{0:n0}", engineTorque[0]) + " lbf";
                                        var engineTorqueMetric = string.Format("{0:n0}", engineTorque[1]).Replace("[", "(").Replace("]", " Nm)");
                                        specModel.EngineMaxTorque = engineTorqueStandard + " " + engineTorqueMetric;
                                    }
                                }
                            }
                            break;
                        case "Displacement":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var engineTorque = kvp.Value.Replace("  ", " ").Split(' ');
                                        var engineTorqueStandard = string.Format("{0:n0}", engineTorque[0]) + " in³";
                                        var engineTorqueMetric = string.Format("{0:n0}", engineTorque[1]).Replace("[", "(").Replace("]", " ltr)");
                                        specModel.EngineDisplacement = engineTorqueStandard + " " + engineTorqueMetric;
                                    }
                                }
                            }
                            break;
                        case "Fuel Tank":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var fuelTank = kvp.Value.Replace("  ", " ").Split(' ');
                                        var fuelTankStandard = string.Format("{0:n0}", fuelTank[0]) + " gallons (US)";
                                        var fuelTankMetric = string.Format("{0:n0}", fuelTank[1]).Replace("[", "(").Replace("]", " ltr)");
                                        specModel.EngineFuelTank = fuelTankStandard + " " + fuelTankMetric;
                                    }
                                }
                            }
                            break;
                        case "Number Of Main Pumps":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        specModel.HydroNumberOfPumps = kvp.Value;
                                    }
                                }
                            }
                            break;
                        case "Main Pump":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        specModel.HydroPump = kvp.Value;
                                    }
                                }
                            }
                            break;
                        case "Pilot Pump":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        specModel.HydroPilotPump = kvp.Value;
                                    }
                                }
                            }
                            break;
                        case "Main Pumps - Maximum Flow Per Pump":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var mainMaxFlow = kvp.Value.Replace("  ", " ").Split(' ');
                                        var mainMaxFlowStandard = string.Format("{0:n0}", mainMaxFlow[0]) + " gallons(US)/min";
                                        var mainMaxFlowMetric = string.Format("{0:n0}", mainMaxFlow[1]).Replace("[", "(").Replace("]", " ltr/min)");
                                        specModel.HydroMaxDischargeFlowMain = mainMaxFlowStandard + " " + mainMaxFlowMetric;
                                    }
                                }
                            }
                            break;
                        case "Pilot Pump Flow":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var pilotMaxFlow = kvp.Value.Replace("  ", " ").Split(' ');
                                        var pilotMaxFlowStandard = string.Format("{0:n0}", pilotMaxFlow[0]) + " gallons(US)/min";
                                        var pilotMaxFlowMetric = string.Format("{0:n0}", pilotMaxFlow[1]).Replace("[", "(").Replace("]", " ltr/min)");
                                        specModel.HydroMaxDischargeFlowPilot = pilotMaxFlowStandard + " " + pilotMaxFlowMetric;
                                    }
                                }
                            }
                            break;
                        //Hydraulic max discharge pressure
                        //Hydraulic Capacity
                        case "Dozer Blade Height":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        specModel.DozerBladeHeight = kvp.Value.Replace("  ", " ").Replace(' ', '"').Replace("[", " (").Replace("]", " mm)");
                                    }
                                }
                            }
                            break;
                        case "Dozer Blade Width":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var dozerBladeWidth = kvp.Value.Replace("  ", " ").Split('[');
                                        int metricresult;
                                        var dozerBladeWidthStandard = dozerBladeWidth[0].Replace(" ", "").Replace("ft", "' ").Replace("in", "\"");
                                        var dozerBladeWidthMetricInt = Int32.TryParse(dozerBladeWidth[1].Replace("]", ""), out metricresult);
                                        var dozerBladeWidthMetric = string.Format("{0:n0}", metricresult);
                                        specModel.DozerBladeWidth = dozerBladeWidthStandard + " (" + dozerBladeWidthMetric + " mm)";
                                    }
                                }
                            }
                            break;
                        case "Dozer Blade - Height Raised Above Ground":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        specModel.DozerBladeHeightRaised = kvp.Value.Replace("  ", " ").Replace(' ', '"').Replace("[", " (").Replace("]", " mm)");
                                    }
                                }
                            }
                            break;
                        case "Dozer Blade - Dig Depth":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        specModel.DozerBladeDigDepth = kvp.Value.Replace("  ", " ").Replace(' ', '"').Replace("[", " (").Replace("]", " mm)");
                                    }
                                }
                            }
                            break;
                        case "Digging Reach - Mono Boom":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var maxDiggingReach = kvp.Value.Replace("  ", " ").Split('[');
                                        int metricresult;
                                        var maxDiggingReachStandard = maxDiggingReach[0].Replace(" ", "").Replace("ft", "' ").Replace("in", "\"");
                                        var maxDiggingReachMetricInt = Int32.TryParse(maxDiggingReach[1].Replace("]", ""), out metricresult);
                                        var maxDiggingReachMetric = string.Format("{0:n0}", metricresult);
                                        specModel.MaxDiggingReach = maxDiggingReachStandard + " (" + maxDiggingReachMetric + " mm)";
                                    }
                                }
                            }
                            break;
                        case "Ground Level Reach - Mono Boom":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var maxDiggingReachGroundLevel = kvp.Value.Replace("  ", " ").Split('[');
                                        int metricresult;
                                        var maxDiggingReachGroundStandard = maxDiggingReachGroundLevel[0].Replace(" ", "").Replace("ft", "' ").Replace("in", "\"");
                                        var maxDiggingReachGroundMetricInt = Int32.TryParse(maxDiggingReachGroundLevel[1].Replace("]", ""), out metricresult);
                                        var maxDiggingReachGroundMetric = string.Format("{0:n0}", metricresult);
                                        specModel.MaxDiggingReachGroundLevel = maxDiggingReachGroundStandard + " (" + maxDiggingReachGroundMetric + " mm)";
                                    }
                                }
                            }
                            break;
                        case "Dig Height - Mono Boom":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var maxDiggingHeight = kvp.Value.Replace("  ", " ").Split('[');
                                        int metricresult;
                                        var maxDiggingHeightStandard = maxDiggingHeight[0].Replace(" ", "").Replace("ft", "' ").Replace("in", "\"");
                                        var maxDiggingHeightMetricInt = Int32.TryParse(maxDiggingHeight[1].Replace("]", ""), out metricresult);
                                        var maxDiggingHeightMetric = string.Format("{0:n0}", metricresult);
                                        specModel.MaxDiggingHeight = maxDiggingHeightStandard + " (" + maxDiggingHeightMetric + " mm)";
                                    }
                                }
                            }
                            break;
                        case "Dump Height - Mono Boom":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var maxDumpingClearance = kvp.Value.Replace("  ", " ").Split('[');
                                        int metricresult;
                                        var maxDumpingClearanceStandard = maxDumpingClearance[0].Replace(" ", "").Replace("ft", "' ").Replace("in", "\"");
                                        var maxDumpingClearanceMetricInt = Int32.TryParse(maxDumpingClearance[1].Replace("]", ""), out metricresult);
                                        var maxDumpingClearanceMetric = string.Format("{0:n0}", metricresult);
                                        specModel.MaxDumpingClearance = maxDumpingClearanceStandard + " (" + maxDumpingClearanceMetric + " mm)";
                                    }
                                }
                            }
                            break;
                        case "Dig Depth - Mono Boom":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var maxDiggingDepth = kvp.Value.Replace("  ", " ").Split('[');
                                        int metricresult;
                                        var maxDiggingDepthStandard = maxDiggingDepth[0].Replace(" ", "").Replace("ft", "' ").Replace("in", "\"");
                                        var maxDiggingDepthMetricInt = Int32.TryParse(maxDiggingDepth[1].Replace("]", ""), out metricresult);
                                        var maxDiggingDepthMetric = string.Format("{0:n0}", metricresult);
                                        specModel.MaxDiggingDepth = maxDiggingDepthStandard + " (" + maxDiggingDepthMetric + " mm)";
                                    }
                                }
                            }
                            break;
                        //min dumping clearance
                        case "Vertical Wall - Mono Boom":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var maxVerticalWallDiggingDepth = kvp.Value.Replace("  ", " ").Split('[');
                                        int metricresult;
                                        var maxVerticalWallDiggingDepthStandard = maxVerticalWallDiggingDepth[0].Replace(" ", "").Replace("ft", "' ").Replace("in", "\"");
                                        var maxVerticalWallDiggingDepthMetricInt = Int32.TryParse(maxVerticalWallDiggingDepth[1].Replace("]", ""), out metricresult);
                                        var maxVerticalWallDiggingDepthMetric = string.Format("{0:n0}", metricresult);
                                        specModel.MaxVerticalWallDiggingDepth = maxVerticalWallDiggingDepthStandard + " (" + maxVerticalWallDiggingDepthMetric + " mm)";
                                    }
                                }
                            }
                            break;
                        case "Front Slew Radius - Mono Boom":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var minSwingRadius = kvp.Value.Replace("  ", " ").Split('[');
                                        int metricresult;
                                        var minSwingRadiusStandard = minSwingRadius[0].Replace(" ", "").Replace("ft", "' ").Replace("in", "\"");
                                        var minSwingRadiusMetricInt = Int32.TryParse(minSwingRadius[1].Replace("]", ""), out metricresult);
                                        var minSwingRadiusMetric = string.Format("{0:n0}", metricresult);
                                        specModel.MinSwingRadius = minSwingRadiusStandard + " (" + minSwingRadiusMetric + " mm)";
                                    }
                                }
                            }
                            break;
                        case "Dig depth - 2.44m / 8'ft flat bottom":
                            if (entity.Data != null)
                            {
                                foreach (Dictionary<string, string> entityData in entity.Data)
                                {
                                    foreach (KeyValuePair<string, string> kvp in entityData)
                                    {
                                        var diggingDepthEightFtFlatBottom = kvp.Value.Replace("  ", " ").Split('[');
                                        int metricresult;
                                        var diggingDepthEightFtFlatBottomStandard = diggingDepthEightFtFlatBottom[0].Replace(" ", "").Replace("ft", "' ").Replace("in", "\"");
                                        var diggingDepthEightFtFlatBottomMetricInt = Int32.TryParse(diggingDepthEightFtFlatBottom[1].Replace("]", ""), out metricresult);
                                        var diggingDepthEightFtFlatBottomMetric = string.Format("{0:n0}", metricresult);
                                        specModel.DiggingDepthEightFtFlatBottom = diggingDepthEightFtFlatBottomStandard + " (" + diggingDepthEightFtFlatBottomMetric + " mm)";
                                    }
                                }
                            }
                            break;
                        //Horizontal Digging Stroke at Ground Level
                    }
                }
                
            }

            return specModel;
            
        }


    }
    
}

