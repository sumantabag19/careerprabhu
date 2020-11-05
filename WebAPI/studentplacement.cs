using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CareerPrabhu.WebAPI
{
    [Route("api/studentplacement")]
    public class studentplacement : Controller
    {
        IConfiguration _iconfiguration;
        private IHostingEnvironment _hostingEnvironment;
        public studentplacement(IConfiguration iconfiguration, IHostingEnvironment hosting)
        {
            _iconfiguration = iconfiguration;
            _hostingEnvironment = hosting;
        }


        [HttpPost]
        [Route("BindPlacementData")]
        public string BindPlacementData([FromBody] GetFilterPlacementData data)
        {
            string json = "";
            DataSet ds = new DataSet();
            PlacementDataResponse ObjGSPDR = new PlacementDataResponse();
            List<GetPlacementData> ListGSPD = new List<GetPlacementData>();

            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindPlacementRecordWeb", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("stateid_d", data.stateid);
                cmd.Parameters.AddWithValue("cityid_d", data.cityid);

                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGSPDR.Status = true;
                    ObjGSPDR.Message = "Data Found";
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        GetPlacementData ObjGSPD = new GetPlacementData();

                        ObjGSPD.placementid = Convert.ToInt32(row["placementid"]);
                        ObjGSPD.studentname = Convert.ToString(row["studentname"]);
                        ObjGSPD.mobileno = Convert.ToString(row["mobileno"]);
                        ObjGSPD.fathername = Convert.ToString(row["fathername"]);
                        ObjGSPD.isdrop = Convert.ToString(row["isdrop"]);

                        ObjGSPD.university = Convert.ToString(row["univercity"]);

                        ObjGSPD.college = Convert.ToString(row["college"]);
                        ObjGSPD.course = Convert.ToString(row["course"]);
                        ObjGSPD.specialization = Convert.ToString(row["specialization"]);
                        ObjGSPD.state = Convert.ToString(row["state_name"]);
                        ObjGSPD.city = Convert.ToString(row["city_name"]);

                        ListGSPD.Add(ObjGSPD);
                    }
                    ObjGSPDR.data = ListGSPD;
                }
                else
                {
                    ObjGSPDR.Status = false;
                    ObjGSPDR.Message = "Something went wrong";
                }
            }
            catch (Exception e)
            {
                ObjGSPDR.Status = false;
                ObjGSPDR.Message = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(ObjGSPDR, settings);
            return json;
        }


        [HttpPost]
        [Route("Bindstate")]
        public string Bindstate()
        {
            GetStateResponse GSR = new GetStateResponse();
            List<GetStateData> ListGSD = new List<GetStateData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindState", con);
                cmd.CommandType = CommandType.StoredProcedure;
                
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
                        GetStateData GSD = new GetStateData();
                        GSD.stateid = Convert.ToInt32(row["state_id"]);
                        GSD.state = Convert.ToString(row["state_name"]);
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
        public string BindCity([FromBody] GetPlaCityData data)
        {
            GetPlaCityResponse GSR = new GetPlaCityResponse();
            List<GetPlaCityData> ListGSD = new List<GetPlaCityData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindCity", con);
                cmd.CommandType = CommandType.StoredProcedure;
             
                cmd.Parameters.AddWithValue("stateid", data.stateid);
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
                        GetPlaCityData GSD = new GetPlaCityData();
                        GSD.cityname = Convert.ToString(row["city_name"]);
                        GSD.cityid = Convert.ToInt32(row["city_id"]);
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
    public class PlacementDataResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }

        public List<GetPlacementData> data { get; set; }

    }
    public class GetPlacementData
    {
        public Int32 placementid { get; set; }
        public string studentname { get; set; }
        public string mobileno { get; set; }
        public string fathername { get; set; }
        public string isdrop { get; set; }
        public string university { get; set; }
        public string college { get; set; }
        public string course { get; set; }
        public string specialization { get; set; }
        public string careername { get; set; }
        public string state { get; set; }
        public string city { get; set; }
   


    }
    public class GetStateResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetStateData> data { get; set; }
    }
    public class GetStateData
    {
        
        public string state { get; set; }
        public Int32 stateid { get; set; }
    }

    public class GetPlaCityResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetPlaCityData> data { get; set; }
    }
    public class GetPlaCityData
    {
        public Int32 stateid { get; set; }
        public Int32 cityid { get; set; }
        public string cityname { get; set; }

    }
    public class GetFilterPlacementData
    {
        public Int32 stateid { get; set; }
        public Int32 cityid { get; set; }
    }
}
