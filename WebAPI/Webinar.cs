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
    [Route("api/Webinar")]
    public class Webinar : Controller
    {
        IConfiguration _iconfiguration;
        public Webinar(IConfiguration iconfiguration)
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

                if (ds.Tables[0].Rows.Count>0)
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
        [Route("GetSavedData")]
        public string GetSavedData()
        {
            string json = "";
            GetSavedDataResponse ObjGSDR = new GetSavedDataResponse();
            List<GetSavedData> ListGSD = new List<GetSavedData>();
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Webinar_GetSavedData", con);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count>0)
                {
                    ObjGSDR.Status = true;
                    ObjGSDR.Message = "success";

                    GetSavedData ObjGSD = new GetSavedData();
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        ObjGSD.Id = Convert.ToInt32(row["ID"]);
                        //ObjGSD.ClassName = Convert.ToString(row["Class"]);
                        //ObjGSD.Stream = Convert.ToString(row["Stream"]);
                        ObjGSD.Topic = Convert.ToString(row["Topic"]);
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
        [Route("SaveWebinar")]
        public string SaveSubscriptionData([FromBody] GetWebinarData data)
        {

            GetWebinarDataResponse GWDR = new GetWebinarDataResponse();
            //SubscriptionData Sd = new SubscriptionData();
            DataSet ds = new DataSet();
            string json = "";
            string result = "";
            if (data == null)
            {
                json = "Something went wrong";
                GWDR.status = false;
                GWDR.Message = "Something went wrong";
            }
            else
            {
                try
                {
                    MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                    MySqlCommand cmd = new MySqlCommand("WebinarManager", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("message", "");
                    cmd.Parameters["message"].Direction = ParameterDirection.Output;
                    cmd.Parameters.AddWithValue("acttype", data.acttype);
                    cmd.Parameters.AddWithValue("classid", data.classid);
                    cmd.Parameters.AddWithValue("streamid", data.streamid);
                    cmd.Parameters.AddWithValue("topic_d", data.topic);
                    cmd.Parameters.AddWithValue("createdby", data.createdby);
                    cmd.Parameters.AddWithValue("webinar_id", data.ID);
                    con.Open();
                    cmd.ExecuteScalar();
                    result = cmd.Parameters["message"].Value.ToString();
                    con.Close();
                    GWDR.status = true;
                    GWDR.Message = result;

                }
                catch (Exception e)
                {
                    GWDR.status = false;
                    GWDR.Message = e.Message;

                }
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(GWDR, settings);
            return json;
        }
        //Update Strream Data
        [HttpPost]
        [Route("UpdateWebinar")]
        public string UpdateWebinar([FromBody] GetWebinarData data)
        {

            UpdateWebinarResponse SObjUWR = new UpdateWebinarResponse();
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
                    MySqlCommand cmd = new MySqlCommand("WebinarManager", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("message", "");
                    cmd.Parameters["message"].Direction = ParameterDirection.Output;
                    cmd.Parameters.AddWithValue("webinar_id", data.ID);
                    cmd.Parameters.AddWithValue("acttype", data.acttype);
                    cmd.Parameters.AddWithValue("classid", data.classid);
                    cmd.Parameters.AddWithValue("streamid", data.streamid);
                    cmd.Parameters.AddWithValue("topic_d", data.topic);
                    cmd.Parameters.AddWithValue("createdby", data.createdby);
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
        [Route("deleteWebinar")]
        public string DeleteWebinar([FromBody] GetWebinarData data)
        {

            UpdateWebinarResponse SObjUWR = new UpdateWebinarResponse();
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
                    MySqlCommand cmd = new MySqlCommand("WebinarManager", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("message", "");
                    cmd.Parameters["message"].Direction = ParameterDirection.Output;
                    cmd.Parameters.AddWithValue("webinar_id", data.ID);
                    cmd.Parameters.AddWithValue("acttype", data.acttype);
                    cmd.Parameters.AddWithValue("classid", data.classid);
                    cmd.Parameters.AddWithValue("streamid", data.streamid);
                    cmd.Parameters.AddWithValue("topic_d", data.topic);
                    cmd.Parameters.AddWithValue("createdby", data.createdby);
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
        //EditWebinar
        [HttpGet]
        [Route("EditWebinAr")]
        public string EditWebinar([FromHeader] EditWebinarRequest data)
        {
            DataSet ds = new DataSet();
            EditWebinarResponse EWR = new EditWebinarResponse();
            string json = "";
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Webinar_EditSavedData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("webinar_id", data.id);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();

                if (ds.Tables[0].Rows.Count > 0)
                {
                    EditWebinarData EWD = new EditWebinarData();
                    EWD.ID = Convert.ToInt32(ds.Tables[0].Rows[0]["ID"]);
                    EWD.Classid = Convert.ToString(ds.Tables[0].Rows[0]["class_id"]);
                    EWD.streamId = Convert.ToString(ds.Tables[0].Rows[0]["stream_id"]);
                    EWD.Topic = Convert.ToString(ds.Tables[0].Rows[0]["topic"]);
                    EWR.data = EWD;
                    EWR.Status = true;
                    EWR.Message = "Data found";
                }
                else
                {
                    EWR.Status = false;
                    EWR.Message = "Something went wrong";

                }


            }
            catch (Exception ex)
            {
                EWR.Status = false;
                EWR.Message = ex.Message;

            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(EWR, settings);
            return json;
        }
        
    }
    
    //Classes For Getting Data from angular And get response from DB
    public class GetClassResponse
    {
        public bool status { get; set; } = false;
        public string message { get; set; } = "";
        public List<GetClassData> data { get; set; }
    }
    public class GetClassData
    {
        public int classid { get; set; }
        public string classname { get; set; }
    }

    public class GetStreamResponse
    {
        public bool status { get; set; } = false;
        public string message { get; set; } = "";
        public List<GetStreamsData> data { get; set; }
    }
    public class GetStreamsData
    {
        public Int32 streamid { get; set; }
        public string streamname { get; set; }
    }
    public class GetWebinarDataResponse
    {
        public bool status { get; set; }
        public string Message { get; set; }
    }
    public class GetWebinarData
    {
        public string acttype { get; set; }
        public string classid { get; set; }
        public string streamid { get; set; }
        public string topic { get; set; }
        public Int32 createdby { get; set; }
        public Int32 ID { get; set; } = 0;
    }
    public class GetSavedDataResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetSavedData> data { get; set; }
    }
    public class GetSavedData
    {
        public Int32 Id { get; set; }
        public string ClassName { get; set; }
        public string Stream { get; set; }
        public string Topic { get; set; }
    }
    public class EditWebinarResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public EditWebinarData data { get; set; }
    }
    public class EditWebinarData
    {
        public Int32 ID { get; set; }
        public string Classid { get; set; }
        public string streamId { get; set; }
        public string Topic { get; set; }
    }
    public class EditWebinarRequest
    {
        public Int32 id { get; set; }
    }
    public class UpdateWebinarResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
    }
}
