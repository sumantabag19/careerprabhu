using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CareerPrabhu.WebAPI
{
    [Route("api/placementrecord")]
    public class placementrecord : Controller
    {
        IConfiguration _iconfiguration;
        public placementrecord(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
        }

        [HttpGet]
        [Route("Bindcountry")]
        public string Bindcountry()
        {
            DataSet ds = new DataSet();
            string json = "";
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindCountry", con);
                cmd.CommandType = CommandType.StoredProcedure;

                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();


                if (ds.Tables.Count > 0)
                {

                    DataTable dt = ds.Tables[0];
                    json = JsonConvert.SerializeObject(dt);

                }
                else
                {
                    json = "";

                }

            }
            catch (Exception ex)
            {
                json = ex.Message;

            }

            return json;
        }


        [HttpPost]
        [Route("BindLocation")]
        public string BindLocation([FromBody] GetPlacementLocationData1 data)
        {
            GetPlacementLocResponse GSR = new GetPlacementLocResponse();
            List<GetPlacementLocationData> ListGSD = new List<GetPlacementLocationData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindLocation", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("countryid_d", data.countryid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    GSR.Status = true;
                    GSR.Message = "Data Found";
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        GetPlacementLocationData GSD = new GetPlacementLocationData();
                        GSD.locationid = Convert.ToInt32(row["locationid"]);
                        GSD.location = Convert.ToString(row["location"]);
                        ListGSD.Add(GSD);
                    }
                    GSR.data = ListGSD;
                }
                else
                {
                    GSR.Status = false;
                    GSR.Message = "Something went wrong";
                }
            }
            catch (Exception e)
            {
                GSR.Status = false;
                GSR.Message = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(GSR, settings);
            return json;
        }

        [HttpPost]
        [Route("BindCity")]
        public string BindCity([FromBody] GetPlacementCityData1 data)
        {
            GetPlacementCityResponse GSR = new GetPlacementCityResponse();
            List<GetPlacementCityData> ListGSD = new List<GetPlacementCityData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindCityCareer", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("countryid_d", data.countryid);
                cmd.Parameters.AddWithValue("locationid_d", data.locationid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    GSR.Status = true;
                    GSR.Message = "Data Found";
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        GetPlacementCityData GSD = new GetPlacementCityData();
                        GSD.cityid = Convert.ToInt32(row["cityid"]);
                        GSD.cityname = Convert.ToString(row["cityname"]);
                        ListGSD.Add(GSD);
                    }
                    GSR.data = ListGSD;
                }
                else
                {
                    GSR.Status = false;
                    GSR.Message = "Something went wrong";
                }
            }
            catch (Exception e)
            {
                GSR.Status = false;
                GSR.Message = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(GSR, settings);
            return json;
        }

        [HttpPost]
        [Route("BindUniversity")]
        public string BindUniversity([FromBody] GetPlacementUniversityData1 data)
        {
            GetPlacementUniversityResponse GSR = new GetPlacementUniversityResponse();
            List<GetPlacementUniversityData> ListGSD = new List<GetPlacementUniversityData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindSummerUniversity", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("countryid_d", data.countryid);
                cmd.Parameters.AddWithValue("locationid_d", data.locationid);
                cmd.Parameters.AddWithValue("cityid_d", data.cityid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    GSR.Status = true;
                    GSR.Message = "Data Found";
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        GetPlacementUniversityData GSD = new GetPlacementUniversityData();
                        GSD.universityid = Convert.ToInt32(row["universityid"]);
                        GSD.universityname = Convert.ToString(row["universityname"]);
                        ListGSD.Add(GSD);
                    }
                    GSR.data = ListGSD;
                }
                else
                {
                    GSR.Status = false;
                    GSR.Message = "Something went wrong";
                }
            }
            catch (Exception e)
            {
                GSR.Status = false;
                GSR.Message = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(GSR, settings);
            return json;
        }


    }

    public class GetPlacementLocResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetPlacementLocationData> data { get; set; }
    }
    public class GetPlacementLocationData
    {

        public string location { get; set; }
        public Int32 locationid { get; set; }
    }
    public class GetPlacementLocationData1
    {
        public Int32 countryid { get; set; }

    }

    public class GetPlacementCityData1
    {
        public Int32 countryid { get; set; }
        public Int32 locationid { get; set; }

    }
    public class GetPlacementCityResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetPlacementCityData> data { get; set; }
    }
    public class GetPlacementCityData
    {

        public int cityid { get; set; }
        public string cityname { get; set; }
    }
    public class GetPlacementUniversityData1
    {
        public Int32 countryid { get; set; }

        public Int32 locationid { get; set; }
        public Int32 cityid { get; set; }
    }
    public class GetPlacementUniversityResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetPlacementUniversityData> data { get; set; }
    }
    public class GetPlacementUniversityData
    {

        public Int32 universityid { get; set; }
        public string universityname { get; set; }

    }
}
