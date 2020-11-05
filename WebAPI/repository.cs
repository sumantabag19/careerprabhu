using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CareerPrabhu.WebAPI
{
    [Route("api/repository")]
    public class Repository : Controller
    {
        IConfiguration _iconfiguration;
        public Repository(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
        }

        [HttpGet]
        [Route("GetClass")]
        public string GetClass()
        {
            GetClassResponse GCR = new GetClassResponse();
            List<GetClassData> ListGCD = new List<GetClassData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("WebinarManager_GetClass", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();

                if (ds.Tables[0].Rows.Count > 0)
                {
                    GCR.status = true;
                    GCR.message = "Data Found";
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        GetClassData GCD = new GetClassData();
                        GCD.classid = Convert.ToInt32(row["class_id"]);
                        GCD.classname = Convert.ToString(row["class_name"]);

                        ListGCD.Add(GCD);
                    }
                }
                else
                {
                    GCR.status = false;
                    GCR.message = "Something went wrong";
                }
                GCR.data = ListGCD;

            }
            catch (Exception e)
            {
                GCR.status = false;
                GCR.message = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(GCR, settings);
            return json;
        }
        //Get saved data

        [HttpGet]
        [Route("GetrepositorySavedData")]
        public string GetSavedData()
        {
            string json = "";
            GetSavedDataResponse ObjGSDR = new GetSavedDataResponse();
            List<GetSavedData> ListGSD = new List<GetSavedData>();
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Repository_GetSavedData", con);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGSDR.Status = true;
                    ObjGSDR.Message = "success";

                    GetSavedData ObjGSD = new GetSavedData();
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        //ObjGSD.Id = Convert.ToInt32(row["ID"]);
                        ObjGSD.ClassName = Convert.ToString(row["ReporitoryName"]);
                       
                        ListGSD.Add(ObjGSD);
                    }
                }
                else
                {
                    ObjGSDR.Status = false;
                    ObjGSDR.Message = "No data found";
                }
            }
            catch (Exception e)
            {
                ObjGSDR.Status = false;
                ObjGSDR.Message = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(ds.Tables[0], settings);
            return json;
        }

        //Get Streams
        [HttpGet]
        [Route("GetStream")]
        public string GetStream()
        {
            string json = "";
            GetStreamResponse ObjGSR = new GetStreamResponse();
            List<GetStreamsData> ListGSD = new List<GetStreamsData>();
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("WebinarManager_GetStream", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();

                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGSR.status = true;
                    ObjGSR.message = "Data Found";
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        GetStreamsData GSD = new GetStreamsData();
                        GSD.streamid = Convert.ToInt32(row["Stream_Id"]);
                        GSD.streamname = Convert.ToString(row["Stream_Name"]);

                        ListGSD.Add(GSD);
                    }
                }
                else
                {
                    ObjGSR.status = false;
                    ObjGSR.message = "Something went wrong";
                }
                ObjGSR.data = ListGSD;
            }
            catch (Exception e)
            {
                ObjGSR.status = false;
                ObjGSR.message = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(ObjGSR, settings);
            return json;
        }
        //This API For Save Webinar details


        [HttpPost]
        [Route("SaveRepositoryDetail")]
        public string SaveRepository([FromBody] Saverepositorydata data)
        {

            GetRepositoryDataResponse GRD = new GetRepositoryDataResponse();
            //SubscriptionData Sd = new SubscriptionData();
            DataSet ds = new DataSet();
            string json = "";
            string result = "";
            if (data == null)
            {
                json = "Something went wrong";
                GRD.status = false;
                GRD.Message = "Something went wrong";
            }
            else
            {
                try
                {
                    MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                    MySqlCommand cmd = new MySqlCommand("RepositoryManager", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("message", "");
                    cmd.Parameters["message"].Direction = ParameterDirection.Output;
                    cmd.Parameters.AddWithValue("acttype", data.acttype);
                   
                    cmd.Parameters.AddWithValue("repositoryname_r", data.repositoryname);
                   
                    cmd.Parameters.AddWithValue("repository_id", data.repository_id);
                    con.Open();
                    cmd.ExecuteScalar();
                    result = cmd.Parameters["message"].Value.ToString();
                    con.Close();
                    GRD.status = true;
                    GRD.Message = result;

                }
                catch (Exception e)
                {
                    GRD.status = false;
                    GRD.Message = e.Message;

                }
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(GRD, settings);
            return json;
        }
        //Update Strream Data
        [HttpPost]
        [Route("UpdateRepository")]
        public string UpdateRepository([FromBody] UpdateRepositoryResponse data)
        {

            UpdateRepositoryResponse SObjUWR = new UpdateRepositoryResponse();
            DataSet ds = new DataSet();
            string json = "";
            string result = "";
            if (data == null)
            {

                SObjUWR.Status = false;
                SObjUWR.Message = "Something went wrong";
            }
            else
            {
                try
                {
                    SObjUWR.Status = true;
                    MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                    MySqlCommand cmd = new MySqlCommand("RepositoryManager", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("message", "");
                    cmd.Parameters["message"].Direction = ParameterDirection.Output;
                    cmd.Parameters.AddWithValue("repository_id", data.ID);
                    cmd.Parameters.AddWithValue("acttype", data.acttype);
                   
                    cmd.Parameters.AddWithValue("repositoryname_r", data.repositoryname);
                  
                    con.Open();
                    cmd.ExecuteScalar();
                    result = cmd.Parameters["message"].Value.ToString();
                    con.Close();
                    SObjUWR.Message = result;

                }
                catch (Exception e)
                {
                    SObjUWR.Status = false;
                    SObjUWR.Message = e.Message;

                }
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(SObjUWR, settings);
            return json;
        }

        //delete Webinar Data
        [HttpPost]
        [Route("deleteRepository")]
        public string deleteRepository([FromBody] DeleteRepository data)
        {

            DeleteRepository delrepo = new DeleteRepository();
            DataSet ds = new DataSet();
            string json = "";
            string result = "";
            if (data == null)
            {

                delrepo.Status = false;
                delrepo.Message = "Something went wrong";
            }
            else
            {
                try
                {
                    delrepo.Status = true;
                    MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                    MySqlCommand cmd = new MySqlCommand("RepositoryManager", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("message", "");
                    cmd.Parameters["message"].Direction = ParameterDirection.Output;
                    cmd.Parameters.AddWithValue("repository_id", data.ID);
                    cmd.Parameters.AddWithValue("acttype", data.acttype);
                    
                    cmd.Parameters.AddWithValue("repositoryname_r", data.repositoryname);
            
                    con.Open();
                    cmd.ExecuteScalar();
                    result = cmd.Parameters["message"].Value.ToString();
                    con.Close();
                    delrepo.Message = result;

                }
                catch (Exception e)
                {
                    delrepo.Status = false;
                    delrepo.Message = e.Message;

                }
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(delrepo, settings);
            return json;
        }
        //EditWebinar
        [HttpGet]
        [Route("EditRepository")]
        public string EditRepository([FromHeader] EditRepositoryResponse data)
        {
            DataSet ds = new DataSet();
            EditRepositoryResponse ERD = new EditRepositoryResponse();
            string json = "";
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Repository_EditSavedData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("repositoryid_id", data.ID);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();

                if (ds.Tables[0].Rows.Count > 0)
                {
                    ERD.ID = Convert.ToInt32(ds.Tables[0].Rows[0]["repositoryid"]);
                    ERD.repositoryname = Convert.ToString(ds.Tables[0].Rows[0]["repositoryname"]);

                  
                    ERD.Status = true;
                    ERD.Message = "Data found";
                }
                else
                {
                    ERD.Status = false;
                    ERD.Message = "Something went wrong";

                }


            }
            catch (Exception ex)
            {
                ERD.Status = false;
                ERD.Message = ex.Message;

            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(ERD, settings);
            return json;
        }

    }

    //Classes For Getting Data from angular And get response from DB
    public class Saverepositorydata
    {
        public string acttype { get; set; }
       
        public string repositoryname { get; set; }
       
        public Int32 repository_id { get; set; } = 0;
    }
    public class GetRepositoryDataResponse
    {
        public bool status { get; set; }
        public string Message { get; set; }
    }

 
    public class EditRepositoryResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public Int32 ID { get; set; }

        public string repositoryname { get; set; }
        
    }
    public class UpdateRepositoryResponse
    {
        public string acttype { get; set; }
        public Int32 ID { get; set; }

        public string repositoryname { get; set; }
        public bool Status { get; set; }
        public string Message { get; set; }
    }
    public class DeleteRepository
    {
        public string acttype { get; set; }
        public Int32 ID { get; set; }
        public string repositoryname { get; set; }
        public bool Status { get; set; }
        public string Message { get; set; }
    }


}
