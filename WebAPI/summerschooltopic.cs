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
    [Route("api/summertopic")]
    public class summerschooltopic : Controller
    {
        IConfiguration _iconfiguration;
        public summerschooltopic(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
        }

        //save summer topic
        [HttpPost]
        [Route("SaveTopicDetail")]
        public string SaveTopicDetail([FromBody] SaveSummrTopicdata data)
        {

            GetSummerTopicResponse GRD = new GetSummerTopicResponse();
            //SubscriptionData Sd = new SubscriptionData();
            DataSet ds = new DataSet();
            string json = "";
            string result = "";
            if (data == null)
            {
                json = "Something went wrong";
                GRD.Status = false;
                GRD.Message = "Something went wrong";
            }
            else
            {
                try
                {
                    MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                    MySqlCommand cmd = new MySqlCommand("SummerTopicManager", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("message", "");
                    cmd.Parameters["message"].Direction = ParameterDirection.Output;
                    cmd.Parameters.AddWithValue("acttype", data.acttype);

                    cmd.Parameters.AddWithValue("topic_name", data.summertopic);

                    cmd.Parameters.AddWithValue("topic_id", data.summertopicid);
                    con.Open();
                    cmd.ExecuteScalar();
                    result = cmd.Parameters["message"].Value.ToString();
                    con.Close();
                    GRD.Status = true;
                    GRD.Message = result;

                }
                catch (Exception e)
                {
                    GRD.Status = false;
                    GRD.Message = e.Message;

                }
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(GRD, settings);
            return json;
        }

        //get saved data
        [HttpGet]
        [Route("GetTopicSavedData")]
        public string GetTopicSavedData()
        {
            string json = "";
            GetSavedSummerTopicResponse ObjGSDR = new GetSavedSummerTopicResponse();
            List<GetSavedSummerTopicData> ListGSD = new List<GetSavedSummerTopicData>();
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("SummerTopic_GetSavedData", con);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGSDR.Status = true;
                    ObjGSDR.Message = "success";

                    GetSavedSummerTopicData ObjGSD = new GetSavedSummerTopicData();
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        ObjGSD.summertopicid = Convert.ToInt32(row["summertopicid"]);
                        ObjGSD.summertopic = Convert.ToString(row["summertopic"]);

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

        //edit data

        [HttpGet]
        [Route("EditTopic")]
        public string EditTopic([FromHeader] EditSummerTopicResponse data)
        {
            DataSet ds = new DataSet();
            EditSummerTopicResponse ERD = new EditSummerTopicResponse();
            string json = "";
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("SummerTopic_EditSavedData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("topic_id", data.summertopicid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();

                if (ds.Tables[0].Rows.Count > 0)
                {
                    ERD.summertopicid = Convert.ToInt32(ds.Tables[0].Rows[0]["summertopicid"]);
                    ERD.summertopic = Convert.ToString(ds.Tables[0].Rows[0]["summertopic"]);


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

        //update topic
        [HttpPost]
        [Route("UpdateTopic")]
        public string UpdateTopic([FromBody] SaveSummrTopicdata data)
        {

            GetSummerTopicResponse SObjUWR = new GetSummerTopicResponse();
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
                    MySqlCommand cmd = new MySqlCommand("SummerTopicManager", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("message", "");
                    cmd.Parameters["message"].Direction = ParameterDirection.Output;
                    cmd.Parameters.AddWithValue("topic_id", data.summertopicid);
                    cmd.Parameters.AddWithValue("acttype", data.acttype);

                    cmd.Parameters.AddWithValue("topic_name", data.summertopic);

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

        //delete topic
        [HttpPost]
        [Route("deleteSummerTopic")]
        public string DeleteSummerTopic([FromBody] DeleteSummerTopic data)
        {

            DeleteSummerTopic delrepo = new DeleteSummerTopic();
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
                    MySqlCommand cmd = new MySqlCommand("SummerTopicManager", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("message", "");
                    cmd.Parameters["message"].Direction = ParameterDirection.Output;
                    cmd.Parameters.AddWithValue("topic_id", data.summertopicid);
                    cmd.Parameters.AddWithValue("acttype", data.acttype);

                    cmd.Parameters.AddWithValue("topic_name", data.summertopic);

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

    }

    //class for save
    public class SaveSummrTopicdata
    {
        public string acttype { get; set; }

        public string summertopic { get; set; }

        public Int32 summertopicid { get; set; } = 0;
    }
    public class GetSummerTopicResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
    }

    //class for get saved data
    public class GetSavedSummerTopicResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }

        public List<GetSavedSummerTopicData> data { get; set; }

    }
    public class GetSavedSummerTopicData
    {
        public Int32 summertopicid { get; set; }
        public string summertopic { get; set; }


    }
    //edit data
    public class EditSummerTopicResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public Int32 summertopicid { get; set; }

        public string summertopic { get; set; }

    }

    //class for delete
    public class DeleteSummerTopic
    {
        public string acttype { get; set; }
        public Int32 summertopicid { get; set; }
        public string summertopic { get; set; }
        public bool Status { get; set; }
        public string Message { get; set; }
    }
}
