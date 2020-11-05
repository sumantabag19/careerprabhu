﻿using System;
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
    [Route("api/lifecoachtypemaster")]
    public class lifecoachtypemaster : Controller
    {
        IConfiguration _iconfiguration;
        public lifecoachtypemaster(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
        }

        //save topic data
        [HttpPost]
        [Route("SaveTopicDetail")]
        public string SaveSopIntrestDetail([FromBody] SaveTopicdatas data)
        {

            GetTopicDataResponses GRD = new GetTopicDataResponses();
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
                    MySqlCommand cmd = new MySqlCommand("LifeTopicManager_new", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("message", "");
                    cmd.Parameters["message"].Direction = ParameterDirection.Output;
                    cmd.Parameters.AddWithValue("acttype", data.acttype);

                    cmd.Parameters.AddWithValue("topic_name", data.topicname);

                    cmd.Parameters.AddWithValue("topic_id", data.topicid);
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

        //get saved data for bind table
        [HttpGet]
        [Route("GetTopicSavedData")]
        public string GetSavedData()
        {
            string json = "";
            GetSavedTopicDataResponses ObjGSDR = new GetSavedTopicDataResponses();
            List<GetSavedLifeTopic> ListGSD = new List<GetSavedLifeTopic>();
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("LifeTopic_GetSavedData_new", con);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGSDR.Status = true;
                    ObjGSDR.Message = "success";

                    GetSavedLifeTopic ObjGSD = new GetSavedLifeTopic();
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        ObjGSD.topicid = Convert.ToInt32(row["topicid"]);
                        ObjGSD.topicname = Convert.ToString(row["topicname"]);

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

        //edit topic data
        [HttpGet]
        [Route("EditTopic")]
        public string EditTopic([FromHeader] EditLifeTopicResponses data)
        {
            DataSet ds = new DataSet();
            EditLifeTopicResponses ERD = new EditLifeTopicResponses();
            string json = "";
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("LifeTopic_EditSavedData_new", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("topic_id", data.topicid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();

                if (ds.Tables[0].Rows.Count > 0)
                {
                    ERD.topicid = Convert.ToInt32(ds.Tables[0].Rows[0]["topicid"]);
                    ERD.topicname = Convert.ToString(ds.Tables[0].Rows[0]["topicname"]);


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

        //update topic data
        [HttpPost]
        [Route("UpdateTopicDetail")]
        public string UpdateTopicDetail([FromBody] SaveTopicdatas data)
        {

            GetTopicDataResponses SObjUWR = new GetTopicDataResponses();
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
                    MySqlCommand cmd = new MySqlCommand("LifeTopicManager_new", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("message", "");
                    cmd.Parameters["message"].Direction = ParameterDirection.Output;
                    cmd.Parameters.AddWithValue("topic_id", data.topicid);
                    cmd.Parameters.AddWithValue("acttype", data.acttype);

                    cmd.Parameters.AddWithValue("topic_name", data.topicname);

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

        //delete topic data
        [HttpPost]
        [Route("deleteTopic")]
        public string deleteTopic([FromBody] DeleteTopics data)
        {

            DeleteTopics delrepo = new DeleteTopics();
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
                    MySqlCommand cmd = new MySqlCommand("LifeTopicManager_new", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("message", "");
                    cmd.Parameters["message"].Direction = ParameterDirection.Output;
                    cmd.Parameters.AddWithValue("topic_id", data.topicid);
                    cmd.Parameters.AddWithValue("acttype", data.acttype);

                    cmd.Parameters.AddWithValue("topic_name", data.topicname);

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

    //classes for life coach topic start from here

    //class for save topic

    public class SaveTopicdatas
    {
        public string acttype { get; set; }

        public string topicname { get; set; }

        public Int32 topicid { get; set; } = 0;
    }
    public class GetTopicDataResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
    }

    //classe for get data for bind
    public class GetSavedTopicDataResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }

        public List<GetSavedLifeTopicData> data { get; set; }

    }
    public class GetSavedLifeTopic
    {
        public Int32 topicid { get; set; }
        public string topicname { get; set; }


    }

    //edit topic data
    public class EditLifeTopicResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public Int32 topicid { get; set; }

        public string topicname { get; set; }

    }

    //class for delete topic
    public class DeleteTopics
    {
        public string acttype { get; set; }
        public Int32 topicid { get; set; }
        public string topicname { get; set; }
        public bool Status { get; set; }
        public string Message { get; set; }
    }
}
