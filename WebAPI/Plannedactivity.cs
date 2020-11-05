using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http.Headers;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CareerPrabhu.WebAPI
{
    [Route("api/Plannedactivity")]
    public class Plannedactivity : Controller
    {
        private IHostingEnvironment _hostingEnvironment;
        
        IConfiguration _iconfiguration;
        string videofilename = "";
        string imagefilename = "";
        string imageguid = "";
        public Plannedactivity(IConfiguration iconfiguration,IHostingEnvironment hosting)
        {
            _iconfiguration = iconfiguration;
            _hostingEnvironment = hosting;
        }


        [HttpGet]
        [Route("GetSavedDataFilter")]
        public string GetSavedDataFilter([FromHeader] GetType obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetSavedTopicDataResponse ObjGSTDR = new GetSavedTopicDataResponse();
            List<GetSavedTopicData> ListGSTD = new List<GetSavedTopicData>();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("TopicManager_GetTopicFilter", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("acttype", obj.acttype);
                cmd.Parameters.AddWithValue("activity_id", obj.activity_id);
                cmd.Parameters.AddWithValue("stateid_dd", obj.stateid);
                cmd.Parameters.AddWithValue("cityid_dd", obj.cityid);
                cmd.Parameters.AddWithValue("schoolid_dd", obj.schoolid);
                cmd.Parameters.AddWithValue("id_d", obj.id);

                cmd.Parameters.AddWithValue("classid_d", obj.classid);
                cmd.Parameters.AddWithValue("streamid_d", obj.streamid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGSTDR.Statue = true;
                    ObjGSTDR.Message = "Data Found";
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        GetSavedTopicData ObjGSTD = new GetSavedTopicData();
                        ObjGSTD.Id = Convert.ToInt32(row["Id"]);
                        // ObjGSTD.Date = Convert.ToString(row["On_Date"]).Remove(Convert.ToString(row["On_Date"]).Length - 6);
                        //ObjGSTD.enddatetime = Convert.ToString(row["end_time"]).Remove(Convert.ToString(row["end_time"]).Length - 6);
                        //ObjGSTD.Date = ObjGSTD.Date.Substring(0,10);
                        //ObjGSTD.Class = Convert.ToString(row["class_name"]);
                        //ObjGSTD.Stream = Convert.ToString(row["Stream_Name"]);
                        ObjGSTD.Date = Convert.ToString(row["On_Date"]);
                        ObjGSTD.enddatetime = Convert.ToString(row["end_time"]);
                        ObjGSTD.state = Convert.ToString(row["state"]);
                        ObjGSTD.city = Convert.ToString(row["city"]);
                        ObjGSTD.school = Convert.ToString(row["school"]);

                        ObjGSTD.Class = Convert.ToString(row["Class"]);
                        ObjGSTD.Stream = Convert.ToString(row["Stream"]);
                        ObjGSTD.Topic = Convert.ToString(row["topic"]);
                        ObjGSTD.usertype = Convert.ToString(row["usertype"]);
                        ObjGSTD.published = Convert.ToString(row["publish"]);
                        //ObjGSTD.Video = Convert.ToString(row["orgvideoname"]);

                        ObjGSTD.Video = Convert.ToString(row["orgvideoname"]);
                        ObjGSTD.chatlink = Convert.ToString(row["chatlink"]);
                        ObjGSTD.webinartype = Convert.ToString(row["webinartype"]);

                        //if (Convert.ToString(row["orgvideoname"]) == "" || Convert.ToString(row["orgvideoname"]) == null)
                        //{
                        //    ObjGSTD.Video = "N/A";
                        //}
                        //else
                        //{
                        //    //ObjGSTD.Video = GetYouTubeId(Convert.ToString(row["orgvideoname"]));

                        //    //ObjGSTD.Video = "https://www.youtube.com/embed/" + ObjGSTD.Video;
                        //    ObjGSTD.Video =ObjGSTD.Video;
                        //}

                        //ObjGSTD.Image = _hostingEnvironment.WebRootPath+ "\\uploadimages\\" + Convert.ToString(row["image"]);


                        if (Convert.ToString(row["image"]) == "")
                        {
                            ObjGSTD.Image = "";
                        }
                        else
                        {
                            ObjGSTD.Image = "http://admin.careerprabhu.com/" + "uploadimages/" + Convert.ToString(row["image"]);
                        }




                        ListGSTD.Add(ObjGSTD);
                    }
                    ObjGSTDR.data = ListGSTD;
                }
                else
                {
                    ObjGSTDR.Statue = false;
                    ObjGSTDR.Message = "Something went wrong";
                }
            }
            catch (Exception e)
            {
                ObjGSTDR.Statue = false;
                ObjGSTDR.Message = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(ObjGSTDR, settings);
            return json;
        }




        //API for bind user type

        [HttpGet]
        [Route("BindUser")]
        public string BindUser()
        {
            BindUserResponse GIAR = new BindUserResponse();
            List<BindUserData> ListGIAD = new List<BindUserData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("bindusertype", con);
                cmd.CommandType = CommandType.StoredProcedure;

                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    GIAR.Status = true;
                    GIAR.Message = "Data Found";
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        BindUserData GIAD = new BindUserData();
                        GIAD.usertype = Convert.ToInt32(row["usertype"]);
                        GIAD.username = Convert.ToString(row["username"]);
                        ListGIAD.Add(GIAD);
                    }
                    GIAR.data = ListGIAD;
                }
                else
                {
                    GIAR.Status = false;
                    GIAR.Message = "Something went wrong";
                }
            }
            catch (Exception e)
            {
                GIAR.Status = false;
                GIAR.Message = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(GIAR, settings);
            return json;
        }
        [HttpPost]
        [Route("Bindstate")]
        public string Bindstate()
        {
            GetStudentStateResponse GSR = new GetStudentStateResponse();
            List<GetStudentStateData> ListGSD = new List<GetStudentStateData>();
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
                        GetStudentStateData GSD = new GetStudentStateData();
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
        public string BindCity([FromBody] GetStudentCityData data)
        {
            GetStudentCityResponse GSR = new GetStudentCityResponse();
            List<GetStudentCityData> ListGSD = new List<GetStudentCityData>();
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
                        GetStudentCityData GSD = new GetStudentCityData();
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


        [HttpPost]
        [Route("BindSchool")]
        public string BindSchool([FromBody] GetStudentSchoolData data)
        {
            GetStudentSchoolResponse GSR = new GetStudentSchoolResponse();
            List<GetStudentSchoolData> ListGSD = new List<GetStudentSchoolData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindSchool", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("stateid", data.stateid);
                cmd.Parameters.AddWithValue("cityid", data.cityid);
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
                        GetStudentSchoolData GSD = new GetStudentSchoolData();
                        GSD.schoolname = Convert.ToString(row["school_name"]);
                        GSD.schoolid = Convert.ToInt32(row["school_id"]);
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


        [HttpGet]
        [Route("GetTopicData")]
        public string GetTopic([FromHeader] GetType data)
        {
            GetTopicResponse GTR = new GetTopicResponse();
            List<GetTopicData> ListGTD = new List<GetTopicData>();
            string json = "";
            DataSet ds = new DataSet();
            if(data.streamid == null)
            {
                data.streamid = "0";
            }
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("TopicManager_GetTopic", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("acttype", data.acttype);
                cmd.Parameters.AddWithValue("activity_id", data.activity_id);
                cmd.Parameters.AddWithValue("stateid_dd", data.stateid);
                cmd.Parameters.AddWithValue("cityid_dd", data.cityid);
                cmd.Parameters.AddWithValue("schoolid_dd", data.schoolid);

                cmd.Parameters.AddWithValue("classid_d", data.classid);
                cmd.Parameters.AddWithValue("streamid_d", data.streamid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    GTR.Status = true;
                    GTR.Message = "Data Found";
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        GetTopicData GTD = new GetTopicData();
                        GTD.ID = Convert.ToInt32(row["ID"]);
                        GTD.TopicName = Convert.ToString(row["Topic"]);
                        //GTD.ClassId = Convert.ToString(row["Class"]);
                        //GTD.StreamId = Convert.ToString(row["Stream"]);
                        ListGTD.Add(GTD);
                    }
                    GTR.data = ListGTD;
                }
                else
                {
                    GTR.Status = false;
                    GTR.Message = "";
                }
            }
            catch (Exception e)
            {
                GTR.Status = false;
                GTR.Message = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(GTR, settings);
            return json;
        }
        //For Save Activity
        [HttpPost]
        [Route("SavePlannedActivity")]
        public string SavePlannedActivityData([FromBody] ActivityManagerParam obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
           

        ActivityManagerResponse ObjAMR = new ActivityManagerResponse();

          

            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("ActivityManager", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("acttype", obj.acttype);
                cmd.Parameters.AddWithValue("activity_id", obj.activity_id);
                cmd.Parameters.AddWithValue("topic_id", obj.topicid);
                cmd.Parameters.AddWithValue("stateid_d", obj.stateid);
                cmd.Parameters.AddWithValue("cityid_d", obj.cityid);
                cmd.Parameters.AddWithValue("schoolid_d", obj.schoolid);
                cmd.Parameters.AddWithValue("class_id", obj.classid);
                cmd.Parameters.AddWithValue("stream_id", obj.streamid);
                cmd.Parameters.AddWithValue("on_date", obj.ondate);
                cmd.Parameters.AddWithValue("org_videoname", obj.orgvideoname);
                cmd.Parameters.AddWithValue("new_videoname", obj.newvideoname);
                cmd.Parameters.AddWithValue("org_imagename", obj.orgimagename);
                cmd.Parameters.AddWithValue("new_imagename", obj.newimagename);
                cmd.Parameters.AddWithValue("created_by", obj.createdby);
                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();
                con.Close();
                ObjAMR.Status = true;
                ObjAMR.Message = result;
            }
            catch (Exception e)
            {
                ObjAMR.Status = false;
                ObjAMR.Message = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(ObjAMR, settings);
            return json;
        }
        //For Save Activity
        //[HttpPost]
        //[Route("SavePlannActivity")]
        //public string SavePlannedActivities([FromForm] IFormFile file, [FromBody] ActivityManagerParam obj)
        //{
        //    string json = "";
        //    string result = "";

        //    DataSet ds = new DataSet();
        //    ActivityManagerResponse ObjAMR = new ActivityManagerResponse();

        //    filename = Guid.NewGuid().ToString() + file.FileName;
        //    var uploads = System.IO.Path.Combine(_hostingEnvironment.WebRootPath, "uploadvideos");// path give here to store in local storage


        //    if (filename.Length > 0)
        //    {
        //        var filePath = Path.Combine(uploads, filename);
        //        using (var fileStream = new FileStream(filePath, FileMode.Create))
        //        {
        //            //await file.CopyToAsync(fileStream);
        //        }
        //    }







        //    try
        //    {
        //        obj.newvideoname = Guid.NewGuid().ToString();
        //        obj.newimagename = Guid.NewGuid().ToString();
        //        MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
        //        MySqlCommand cmd = new MySqlCommand("ActivityManager", con);
        //        cmd.CommandType = CommandType.StoredProcedure;
        //        cmd.Parameters.AddWithValue("message", "");
        //        cmd.Parameters["message"].Direction = ParameterDirection.Output;
        //        cmd.Parameters.AddWithValue("acttype", obj.acttype);
        //        cmd.Parameters.AddWithValue("activity_id", obj.activity_id);
        //        cmd.Parameters.AddWithValue("topic_id", obj.topicid);
        //        cmd.Parameters.AddWithValue("class_id", obj.classid);
        //        cmd.Parameters.AddWithValue("stream_id", obj.streamid);
        //        cmd.Parameters.AddWithValue("on_date", obj.ondate);
        //        cmd.Parameters.AddWithValue("org_videoname", obj.orgvideoname);
        //        cmd.Parameters.AddWithValue("new_videoname", obj.newvideoname);
        //        cmd.Parameters.AddWithValue("org_imagename", obj.orgimagename);
        //        cmd.Parameters.AddWithValue("new_imagename", obj.newimagename);
        //        cmd.Parameters.AddWithValue("created_by", obj.createdby);
        //        con.Open();
        //        cmd.ExecuteScalar();
        //        result = cmd.Parameters["message"].Value.ToString();
        //        con.Close();
        //        ObjAMR.Status = true;
        //        ObjAMR.Message = result;
        //    }
        //    catch (Exception e)
        //    {
        //        ObjAMR.Status = false;
        //        ObjAMR.Message = e.Message;
        //    }
        //    JsonSerializerSettings settings = new JsonSerializerSettings();
        //    settings.NullValueHandling = NullValueHandling.Ignore;
        //    json = JsonConvert.SerializeObject(ObjAMR, settings);
        //    return json;
        //}






        //For Delete Activity




        //save plan activity


        [HttpPost]
        [Route("SavePlannActivity")]
        public async Task<IActionResult> SavePlannActivityAsync([FromForm] IFormFile image, [FromForm] string Id,
        [FromForm] string acttype, [FromForm] string topicid, [FromForm] string stateid, [FromForm] string cityid, [FromForm] string schoolid, [FromForm] string classid, [FromForm] string streamid,
        [FromForm] string orgvideoname, [FromForm] string orgimagename, [FromForm] string chatlink, [FromForm] string ondate, [FromForm] string enddatetime, [FromForm] string createdby, [FromForm] string starttime, [FromForm] string endtime, [FromForm] string usertype, [FromForm] string published, [FromForm] string webinartype)
        //public string SavePlannedActivities([FromBody] ActivityManagerParam obj)
        {


            List<string> Androidtokens = new List<string>();
            List<string> Iostokens = new List<string>();
            string json = "";
            string result = "";
            int maxid = 0;
            DataSet ds = new DataSet();
            DataSet ds1 = new DataSet();
            ActivityManagerResponse ObjAMR = new ActivityManagerResponse();
            ActivityManagerParam objAmp = new ActivityManagerParam();
            String[] statelist = new String[50];
            string[] citylist = new string[50];
            string[] schoollist = new string[50];

            if (image != null)
            {
                try
                {
                    imageguid = Guid.NewGuid().ToString();
                    imagefilename = imageguid + image.FileName;

                    var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploadimages");
                    if (image.Length > 0)
                    {
                        var filePath = Path.Combine(uploads, imagefilename);
                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            await image.CopyToAsync(fileStream);
                        }
                    }
                }
                catch (Exception e)
                {
                    string Message = e.Message;
                }
            }
            else
            {

            }
            char[] spearator = { ',', ' ' };


            if (stateid == null || cityid == null || schoolid == null)
            {

            }
            else
            {
                statelist = stateid.Split(spearator,
                            StringSplitOptions.RemoveEmptyEntries);
                citylist = cityid.Split(spearator,
                  StringSplitOptions.RemoveEmptyEntries);
                schoollist = schoolid.Split(spearator,
                  StringSplitOptions.RemoveEmptyEntries);

            }

            if (stateid == null || stateid == "")
            {
                objAmp.stateid = "0";
            }
            else
            {
                statelist = stateid.Split(spearator,
              StringSplitOptions.RemoveEmptyEntries);
            }
            if (cityid == null || cityid == "")
            {
                objAmp.cityid = "0";
            }
            else
            {
                citylist = cityid.Split(spearator,
              StringSplitOptions.RemoveEmptyEntries);
            }
            if (schoolid == null || schoolid == "")
            {
                objAmp.schoolid = "0";
            }
            else
            {
                schoollist = schoolid.Split(spearator,
               StringSplitOptions.RemoveEmptyEntries);
            }


            objAmp.acttype = Convert.ToString(acttype);
            objAmp.activity_id = Convert.ToInt32(Id);
            objAmp.topicid = Convert.ToInt32(topicid);
            //objAmp.stateid = Convert.ToString(stateid);
            //objAmp.cityid = Convert.ToString(cityid);
            //objAmp.schoolid = Convert.ToString(schoolid);
            //objAmp.classid = Convert.ToInt32(classid);
            //objAmp.streamid = Convert.ToInt32(streamid);
            objAmp.classid = Convert.ToString(classid);
            objAmp.streamid = Convert.ToString(streamid);
            objAmp.published = Convert.ToInt32(published);
            objAmp.usertype = Convert.ToInt32(usertype);

            objAmp.orgvideoname = Convert.ToString(orgvideoname);
            if (orgimagename == null)
            {
                objAmp.orgimagename = "";
            }
            else
            {
                objAmp.orgimagename = Convert.ToString(orgimagename);
            }





            objAmp.ondate = Convert.ToString(ondate);
            objAmp.enddatetime = Convert.ToString(enddatetime);

            objAmp.starttime = Convert.ToString(starttime);
            objAmp.endtime = Convert.ToString(endtime);
            objAmp.createdby = Convert.ToInt32(createdby);

            try
            {
                //objAmp.newvideoname = Guid.NewGuid().ToString();
                if (imageguid == "")
                {
                    objAmp.newimagename = "";
                }
                else
                {
                    objAmp.newimagename = imageguid;
                }

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("ActivityManager", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("acttype", objAmp.acttype);
                cmd.Parameters.AddWithValue("activity_id", objAmp.activity_id);
                cmd.Parameters.AddWithValue("topic_id", objAmp.topicid);
                cmd.Parameters.AddWithValue("stateid_d", objAmp.stateid == "0" ? "0" : stateid);
                cmd.Parameters.AddWithValue("cityid_d", objAmp.cityid == "0" ? "0" : cityid);
                cmd.Parameters.AddWithValue("schoolid_d", objAmp.schoolid == "0" ? "0" : schoolid);
                cmd.Parameters.AddWithValue("class_id", objAmp.classid);
                cmd.Parameters.AddWithValue("stream_id", objAmp.streamid);
                cmd.Parameters.AddWithValue("on_date", objAmp.ondate);
                cmd.Parameters.AddWithValue("end_date", objAmp.enddatetime);
                cmd.Parameters.AddWithValue("starttime_d", objAmp.starttime);
                cmd.Parameters.AddWithValue("endtime_d", objAmp.endtime);

                cmd.Parameters.AddWithValue("org_videoname", objAmp.orgvideoname);
                cmd.Parameters.AddWithValue("chat_d", chatlink);
                //cmd.Parameters.AddWithValue("new_videoname", objAmp.newvideoname);
                cmd.Parameters.AddWithValue("org_imagename", objAmp.orgimagename);
                cmd.Parameters.AddWithValue("new_imagename", objAmp.newimagename);
                cmd.Parameters.AddWithValue("publish_d", objAmp.published);
                cmd.Parameters.AddWithValue("webtype_d", Convert.ToInt32(webinartype));

                cmd.Parameters.AddWithValue("usertype_d", objAmp.usertype);
                cmd.Parameters.AddWithValue("created_by", objAmp.createdby);
                con.Open();

                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);


                //cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();
                con.Close();
                ObjAMR.Status = true;
                ObjAMR.Message = result;

                if (result == "Successfully Saved" || result == "Successfully Updated")
                {
                    if (objAmp.acttype == "Update")
                    {
                        maxid = objAmp.activity_id;
                    }
                    else
                    {
                        try
                        {
                            if (statelist.Length > 0)
                            {

                                string qry = "SELECT MAX(Id) as sam_id FROM ActivityMaster";

                                MySqlCommand cmd1 = new MySqlCommand(qry, con);

                                MySqlDataAdapter da1 = new MySqlDataAdapter();
                                da1.SelectCommand = cmd1;
                                da1.Fill(ds1);
                                con.Close();
                                if (ds1.Tables[0].Rows.Count > 0)
                                {
                                    maxid = Convert.ToInt32(ds1.Tables[0].Rows[0]["sam_id"]);
                                }
                                else
                                {
                                    maxid = 0;
                                }

                            }
                            else
                            {

                            }
                        }
                        catch (Exception ex)
                        {
                            string msg = ex.Message;
                        }
                    }





                    if (stateid != null && stateid.Length > 0)
                    {
                        if (statelist.Length > 0)
                        {
                            Execqry("delete from tbl_plannedstate where activityid=" + maxid);
                            for (int i = 0; i < statelist.Length; i++)
                            {

                                Execqry("insert into tbl_plannedstate(activityid,stateid)values(" + maxid + ", " + Convert.ToInt32(statelist[i]) + ")");
                            }

                        }
                    }


                    if (cityid != null && cityid.Length > 0)
                    {
                        if (citylist.Length > 0)
                        {
                            Execqry("delete from tbl_plannedcity where activityid=" + maxid);
                            for (int i = 0; i < citylist.Length; i++)
                            {

                                Execqry("insert into tbl_plannedcity(activityid,cityid)values(" + maxid + ", " + Convert.ToInt32(citylist[i]) + ")");
                            }

                        }
                    }

                    if (schoolid != null && schoolid.Length > 0)
                    {
                        if (schoollist.Length > 0)
                        {
                            Execqry("delete from tbl_plannedschool where activityid=" + maxid);
                            for (int i = 0; i < schoollist.Length; i++)
                            {

                                Execqry("insert into tbl_plannedschool(activityid,schoolid)values(" + maxid + ", " + Convert.ToInt32(schoollist[i]) + ")");
                            }

                        }
                    }



                }



                if(result == "Successfully Saved")
                {
                    try
                    {
                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            foreach (DataRow item in ds.Tables[0].Rows)
                            {
                                //if (Convert.ToString(item["DeviceType"]) == "IOS")
                                //{
                                //    Iostokens.Add(Convert.ToString(item["Reg_Token"]));
                                //}
                                //else
                                //{
                                //    Androidtokens.Add(Convert.ToString(item["Reg_Token"]));
                                //}


                                if (Convert.ToString(item["DeviceType"]) == "Android")
                                {
                                    Androidtokens.Add(Convert.ToString(item["Device_token"]));
                                }
                                if (Convert.ToString(item["DeviceType"]) == "IOS")
                                {
                                    Iostokens.Add(Convert.ToString(item["Device_token"]));
                                }
                            }
                            int NotifyId = Convert.ToInt32(ds.Tables[0].Rows[0]["notificationid"]);
                            int commonid = Convert.ToInt32(ds.Tables[0].Rows[0]["commonid"]);
                            string pushTitle = Convert.ToString(ds.Tables[0].Rows[0]["title"]);
                            string body = Convert.ToString(ds.Tables[0].Rows[0]["subject"]);
                            string app_notifytype = Convert.ToString(ds.Tables[0].Rows[0]["subject"]);
                            if (Androidtokens.Count > 0)
                            {
                                FirePushnotificationAndroid(NotifyId, commonid, app_notifytype, pushTitle, Androidtokens, body);
                            }

                            if (Iostokens.Count > 0)
                            {
                                FirePushnotificationIOS(NotifyId, commonid, app_notifytype, pushTitle, Androidtokens, body);
                            }


                        }
                    }
                    catch (Exception ex)
                    {
                        string msg = ex.Message;
                    }
                }
              















            }
            catch (Exception e)
            {
                ObjAMR.Status = false;
                ObjAMR.Message = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(ObjAMR, settings);
            return Ok(JsonConvert.SerializeObject(json, Formatting.Indented));
        }



        public string FirePushnotificationAndroid(int NotificationId, int MeetingId, string AppNotificationType, string Title,
           List<string> Androidtoken, string Message)
        {


            string json = "";
            string API_Key = "AAAAPnux_To:APA91bH1a8IXJWIOAk2GZIzVFdaJ-k7Fb4Spbkt_2MI0tAzOeS8T0bYsW9xM0-GR-GlBi4bcIeqsXj6RAG84FxRIRHzkTzkUl2ATX2h5QwomZ0cns5KMpza7MOxi7Rxx19HohP3x6eYk";
            string API_Url = "https://fcm.googleapis.com/fcm/send";

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(API_Url);
            request.Method = "POST";
            request.ContentType = "application/json";
            request.Headers.Add(string.Format("Authorization: key=" + API_Key));
            var data = new
            {
                registration_ids = Androidtoken,
                notification = new
                {
                    NotificationId = NotificationId,
                    CommonId = MeetingId,
                    AppNotificationType = AppNotificationType,
                    body = Message,
                    title = Title,
                    sound = "default"
                }
            };
            json = JsonConvert.SerializeObject(data);
            byte[] dataStream = Encoding.UTF8.GetBytes(json);
            request.ContentLength = dataStream.Length;
            Stream newStream = request.GetRequestStream();
            newStream.Write(dataStream, 0, dataStream.Length);
            newStream.Close();
            WebResponse webResponse = request.GetResponse();
            Stream webStream = webResponse.GetResponseStream();
            StreamReader responseReader = new StreamReader(webStream);
            string response = responseReader.ReadToEnd();
            return response;
        }



        public string FirePushnotificationIOS(int NotificationId, int MeetingId, string AppNotificationType, string Title,
            List<string> IOStoken, string Message)
        {
            string json = "";
            string API_Key = "AAAAPnux_To:APA91bH1a8IXJWIOAk2GZIzVFdaJ-k7Fb4Spbkt_2MI0tAzOeS8T0bYsW9xM0-GR-GlBi4bcIeqsXj6RAG84FxRIRHzkTzkUl2ATX2h5QwomZ0cns5KMpza7MOxi7Rxx19HohP3x6eYk";
            string API_Url = "https://fcm.googleapis.com/fcm/send";

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(API_Url);
            request.Method = "POST";
            request.ContentType = "application/json";
            request.Headers.Add(string.Format("Authorization: key=" + API_Key));
            var res = new
            {
                registration_ids = IOStoken,
                notification = new
                {
                    NotificationId = NotificationId,
                    CommonId = MeetingId,
                    AppNotificationType = AppNotificationType,
                    body = Message,
                    title = Title,
                    sound = "default"

                },
                data = new
                {
                    Priority = "High",
                    NotificationId = NotificationId,
                    CommonId = MeetingId,
                    AppNotificationType = AppNotificationType,
                    body = Message,
                    title = Title,
                    sound = "default"
                }
            };
            json = JsonConvert.SerializeObject(res);
            byte[] dataStream = Encoding.UTF8.GetBytes(json);
            request.ContentLength = dataStream.Length;
            Stream newStream = request.GetRequestStream();
            newStream.Write(dataStream, 0, dataStream.Length);
            newStream.Close();
            WebResponse webResponse = request.GetResponse();
            Stream webStream = webResponse.GetResponseStream();
            StreamReader responseReader = new StreamReader(webStream);
            string response = responseReader.ReadToEnd();
            return response;
        }


        public void Execqry(string qry)
        {
            MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
            if ((con.State == ConnectionState.Closed) || (con.State == ConnectionState.Broken))
                con.Open();
            MySqlCommand cmd = new MySqlCommand(qry);
            cmd.Connection = con;
            cmd.ExecuteNonQuery();
            cmd.Dispose();
            con.Close();
        }


        //end save plan activity






        [HttpPost]
        [Route("DeleteActivity")]
        public string DeleteActivities([FromBody] ActivityManagerParam obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            ActivityManagerResponse ObjAMR = new ActivityManagerResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("DeleteActivity", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
               
                cmd.Parameters.AddWithValue("activity_id", obj.activity_id);
                cmd.Parameters.AddWithValue("created_by", obj.createdby);
                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();
                con.Close();
                ObjAMR.Status = true;
                ObjAMR.Message = result;
            }
            catch (Exception e)
            {
                ObjAMR.Status = false;
                ObjAMR.Message = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(ObjAMR,settings);
            return json;
        }
        //get class data
        [HttpGet]
        [Route("GetClass")]
        public string GetClass()
        {
            GetClassResponseWebinar GCR = new GetClassResponseWebinar();
            List<GetClassDataWebinar> ListGCD = new List<GetClassDataWebinar>();
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
                        GetClassDataWebinar GCD = new GetClassDataWebinar();
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


        //get stream
        [HttpGet]
        [Route("GetStream")]
        public string GetStream()
        {
            string json = "";
            GetStreamResponseWebinar ObjGSR = new GetStreamResponseWebinar();
            List<GetStreamsDataWebinar> ListGSD = new List<GetStreamsDataWebinar>();
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
                        GetStreamsDataWebinar GSD = new GetStreamsDataWebinar();
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







        //[HttpGet]
        //[Route("GetClassAndStream")]
        //public string GetClass([FromHeader] GetType data)
        //{
        //    GetClassResponse GCR = new GetClassResponse();
        //    List<GetClassData> ListGCD = new List<GetClassData>();
        //    string json = "";
        //    DataSet ds = new DataSet();
        //    try
        //    {
        //        MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
        //        MySqlCommand cmd = new MySqlCommand("TopicManager_GetTopic", con);
        //        cmd.CommandType = CommandType.StoredProcedure;
        //        cmd.Parameters.AddWithValue("acttype", data.acttype);
        //        cmd.Parameters.AddWithValue("activity_id", data.activity_id);
        //        cmd.Parameters.AddWithValue("classid", data.classid);
        //        cmd.Parameters.AddWithValue("streamid", data.streamid);
        //        con.Open();
        //        MySqlDataAdapter da = new MySqlDataAdapter();
        //        da.SelectCommand = cmd;
        //        da.Fill(ds);
        //        con.Close();
        //        if (ds.Tables[0].Rows.Count > 0)
        //        {
        //            GCR.Status = true;
        //            GCR.Message = "Data Found";
        //            foreach (DataRow row in ds.Tables[0].Rows)
        //            {
        //                GetClassData GCD = new GetClassData();
        //                GCD.ID = Convert.ToInt32(row["ID"]);
        //                GCD.Name = Convert.ToString(row["NAME"]);
        //                ListGCD.Add(GCD);
        //            }
        //            GCR.data = ListGCD;
        //        }
        //        else
        //        {
        //            GCR.Status = false;
        //            GCR.Message = "Something went wrong";
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        GCR.Status = false;
        //        GCR.Message = e.Message;
        //    }
        //    JsonSerializerSettings settings = new JsonSerializerSettings();
        //    settings.NullValueHandling = NullValueHandling.Ignore;
        //    json = JsonConvert.SerializeObject(GCR, settings);
        //    return json;
        //}



        // For Getting Saved Dopic Detail
        [HttpGet]
        [Route("GetSavedData")]
        public string GetSavedActivityData([FromHeader] GetType obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetSavedTopicDataResponse ObjGSTDR = new GetSavedTopicDataResponse();
            List<GetSavedTopicData> ListGSTD = new List<GetSavedTopicData>();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("TopicManager_GetTopic", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("acttype", obj.acttype);
                cmd.Parameters.AddWithValue("activity_id", obj.activity_id);
                cmd.Parameters.AddWithValue("stateid_dd", obj.stateid);
                cmd.Parameters.AddWithValue("cityid_dd", obj.cityid);
                cmd.Parameters.AddWithValue("schoolid_dd", obj.schoolid);

                cmd.Parameters.AddWithValue("classid_d", obj.classid);
                cmd.Parameters.AddWithValue("streamid_d", obj.streamid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGSTDR.Statue = true;
                    ObjGSTDR.Message = "Data Found";
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        GetSavedTopicData ObjGSTD = new GetSavedTopicData();
                        ObjGSTD.Id = Convert.ToInt32(row["Id"]);
                        // ObjGSTD.Date = Convert.ToString(row["On_Date"]).Remove(Convert.ToString(row["On_Date"]).Length - 6);
                        //ObjGSTD.enddatetime = Convert.ToString(row["end_time"]).Remove(Convert.ToString(row["end_time"]).Length - 6);
                        //ObjGSTD.Date = ObjGSTD.Date.Substring(0,10);
                        //ObjGSTD.Class = Convert.ToString(row["class_name"]);
                        //ObjGSTD.Stream = Convert.ToString(row["Stream_Name"]);
                        ObjGSTD.Date = Convert.ToString(row["On_Date"]);
                        ObjGSTD.enddatetime = Convert.ToString(row["end_time"]);
                        ObjGSTD.state = Convert.ToString(row["state"]);
                        ObjGSTD.city = Convert.ToString(row["city"]);
                        ObjGSTD.school = Convert.ToString(row["school"]);

                        ObjGSTD.Class = Convert.ToString(row["Class"]);
                        ObjGSTD.Stream = Convert.ToString(row["Stream"]);
                        ObjGSTD.Topic = Convert.ToString(row["topic"]);
                        ObjGSTD.usertype = Convert.ToString(row["usertype"]);
                        ObjGSTD.published = Convert.ToString(row["publish"]);
                        //ObjGSTD.Video = Convert.ToString(row["orgvideoname"]);

                        ObjGSTD.Video = Convert.ToString(row["orgvideoname"]);
                        ObjGSTD.chatlink = Convert.ToString(row["chatlink"]);
                        ObjGSTD.webinartype = Convert.ToString(row["webinartype"]);

                        //if (Convert.ToString(row["orgvideoname"]) == "" || Convert.ToString(row["orgvideoname"]) == null)
                        //{
                        //    ObjGSTD.Video = "N/A";
                        //}
                        //else
                        //{
                        //    //ObjGSTD.Video = GetYouTubeId(Convert.ToString(row["orgvideoname"]));

                        //    //ObjGSTD.Video = "https://www.youtube.com/embed/" + ObjGSTD.Video;
                        //    ObjGSTD.Video =ObjGSTD.Video;
                        //}

                        //ObjGSTD.Image = _hostingEnvironment.WebRootPath+ "\\uploadimages\\" + Convert.ToString(row["image"]);


                        if (Convert.ToString(row["image"]) == "")
                        {
                            ObjGSTD.Image = "";
                        }
                        else
                        {
                            ObjGSTD.Image = "http://admin.careerprabhu.com/" + "uploadimages/" + Convert.ToString(row["image"]);
                        }




                        ListGSTD.Add(ObjGSTD);
                    }
                    ObjGSTDR.data = ListGSTD;
                }
                else
                {
                    ObjGSTDR.Statue = false;
                    ObjGSTDR.Message = "Something went wrong";
                }
            }
            catch (Exception e)
            {
                ObjGSTDR.Statue = false;
                ObjGSTDR.Message = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(ObjGSTDR, settings);
            return json;
        }

        public string GetYouTubeId(string url)
        {
            //var regex = @"(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|watch)\/|.*[?&amp;]v=)|youtu\.be\/)([^""&amp;?\/ ]{11})";
            var regex = "(?:.+?)?(?:\\/v\\/|watch\\/|\\?v=|\\&v=|youtu\\.be\\/|\\/v=|^youtu\\.be\\/)([a-zA-Z0-9_-]{11})+";

            var match = Regex.Match(url, regex);

            if (match.Success)
            {
                return match.Groups[1].Value;
            }

            return url;
        }


        //For Getting Edit data
        [HttpGet]
        [Route("GetEditData")]
        public string GetEditedData([FromHeader] GetType obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetEditResponse ObjGER = new GetEditResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("TopicManager_GetTopic", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("acttype", obj.acttype);
                cmd.Parameters.AddWithValue("activity_id", obj.activity_id);
                cmd.Parameters.AddWithValue("stateid_dd", obj.stateid);
                cmd.Parameters.AddWithValue("cityid_dd", obj.cityid);
                cmd.Parameters.AddWithValue("schoolid_dd", obj.schoolid);

                cmd.Parameters.AddWithValue("classid_d", obj.classid);
                cmd.Parameters.AddWithValue("streamid_d", obj.streamid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGER.Status = true;
                    ObjGER.Message = "Data Found";
                    GetEditData ObjGED = new GetEditData();
                    ObjGED.Id = Convert.ToInt32(ds.Tables[0].Rows[0]["Id"]);
                    ObjGED.Date = Convert.ToString(ds.Tables[0].Rows[0]["On_Date"]);
                    ObjGED.endDate = Convert.ToString(ds.Tables[0].Rows[0]["end_time"]);


                    // DateTime result = Convert.ToDateTime(ds.Tables[0].Rows[0]["start_time"]);
                    //ObjGED.starttime = ds.Tables[0].Rows[0]["start_time"].ToString("hh:mm tt", CultureInfo.CurrentCulture);

                    ObjGED.starttime = Convert.ToString(ds.Tables[0].Rows[0]["start_time"]);
                    ObjGED.endtime = Convert.ToString(ds.Tables[0].Rows[0]["end_t"]);

                    // ObjGED.Date = ObjGED.Date.Substring(0,10);
                    ObjGED.ID = Convert.ToInt32(ds.Tables[0].Rows[0]["TopicId"]);
                    ObjGED.TopicName = Convert.ToString(ds.Tables[0].Rows[0]["topic"]);
                    ObjGED.stateid = Convert.ToString(ds.Tables[0].Rows[0]["stateid"]);
                    ObjGED.cityid = Convert.ToString(ds.Tables[0].Rows[0]["cityid"]);
                    ObjGED.schoolid = Convert.ToString(ds.Tables[0].Rows[0]["schoolid"]);

                    ObjGED.Classid = Convert.ToString(ds.Tables[0].Rows[0]["ClassId"]);
                    // ObjGED.Class = Convert.ToString(ds.Tables[0].Rows[0]["class_name"]);
                    ObjGED.streamId = Convert.ToString(ds.Tables[0].Rows[0]["StreamId"]);
                    //ObjGED.Stream = Convert.ToString(ds.Tables[0].Rows[0]["Stream_Name"]);
                    ObjGED.VideoName = Convert.ToString(ds.Tables[0].Rows[0]["OrgVideoName"]);
                    ObjGED.chatlink = Convert.ToString(ds.Tables[0].Rows[0]["chatlink"]);
                    ObjGED.ImageName = Convert.ToString(ds.Tables[0].Rows[0]["OrgImageName"]);
                    ObjGED.NewImageName = Convert.ToString(ds.Tables[0].Rows[0]["NewImageName"]);

                    ObjGED.usertype = Convert.ToInt32(ds.Tables[0].Rows[0]["usertype"]);
                    ObjGED.publish = Convert.ToInt32(ds.Tables[0].Rows[0]["published"]);
                    ObjGED.webinartype = Convert.ToInt32(ds.Tables[0].Rows[0]["webinartype"]);

                    ObjGER.data = ObjGED;
                }
                else
                {
                    ObjGER.Status = false;
                    ObjGER.Message = "Data Not Found";
                }
            }
            catch (Exception e)
            {
                ObjGER.Status = false;
                ObjGER.Message = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(ObjGER, settings);
            return json;
        }
        //respons and data class
        public class GetStudentStateResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public List<GetStudentStateData> data { get; set; }
        }
        public class GetStudentStateData
        {

            public string state { get; set; }
            public Int32 stateid { get; set; }
        }
        public class GetStudentCityResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public List<GetStudentCityData> data { get; set; }
        }
        public class GetStudentCityData
        {
            public Int32 stateid { get; set; }
            public Int32 cityid { get; set; }
            public string cityname { get; set; }

        }
        public class GetStudentSchoolResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public List<GetStudentSchoolData> data { get; set; }
        }
        public class GetStudentSchoolData
        {
            public Int32 stateid { get; set; }
            public Int32 cityid { get; set; }
            public Int32 schoolid { get; set; }
            public string schoolname { get; set; }

        }
        public class GetTopicResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public List<GetTopicData> data { get; set; }
        }
        public class GetTopicData
        {
            public Int32 ID { get; set; }
            public string TopicName { get; set; }
            public string ClassId { get; set; }
            public string StreamId { get; set; }
        }
        public class GetClassResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public List<GetClassData> data { get; set; }
        }
        public class GetClassData
        {
            public Int32 ID { get; set; }
            public string Name { get; set; }
        }
        public class GetType
        {
            public string acttype { get; set; }
            public Int32 activity_id { get; set; } = 0;
            public Int32 stateid { get; set; } = 0;
            public Int32 cityid{ get; set; } = 0;
            public Int32 schoolid { get; set; } = 0;
            public Int32 id { get; set; } = 0;



            public string classid { get; set; } = "";
            public string streamid { get; set; } = "";
        }
        public class GetSavedTopicDataResponse
        {
            public bool Statue { get; set; }
            public string Message { get; set; }
            
            public List<GetSavedTopicData> data { get; set; }
        }
        public class GetSavedTopicData
        {
            public Int32 Id { get; set; }
            public string Date { get; set; }
            public string enddatetime { get; set; }
            public string state { get; set; }
            public string city { get; set; }
            public string school { get; set; } = "";
            public string Class { get; set; } = "";
            public string Stream { get; set; } = "";
            public string Topic { get; set; }
            public string chatlink { get; set; }
            public string Video { get; set; }
            public string Image { get; set; }
            public string newImage { get; set; }
            public string usertype { get; set; }
            public string published { get; set; }
            public string webinartype { get; set; }

        }
        public class GetEditResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public GetEditData data { get; set; }
        }
        public class ActivityManagerResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
        }
        public class ActivityManagerParam
        {
            public string acttype { get; set; }
            public Int32 activity_id { get; set; } = 0;
            public Int32 topicid { get; set; } = 0;
            public string stateid { get; set; }
            public string cityid { get; set; }
            public string schoolid { get; set; }

            public string classid { get; set; }
            public string streamid { get; set; } 
            public string ondate { get; set; } = "";

            public string enddatetime { get; set; } = "";

            public string starttime { get; set; } = "";

            public string endtime { get; set; } = "";
            public string orgvideoname { get; set; } = "";
            public string newvideoname { get; set; } = "";
            public string orgimagename { get; set; } = "";
            public string newimagename { get; set; } = "";
            public Int32 createdby { get; set; }
            public string message { get; set; } = "";
            public string videotoupload { get; set; }
            public string imagetoupload { get; set; }
            public Int32 usertype { get; set; }
            public Int32 published { get; set; }

        }
        public class GetEditData
        {
            public Int32 Id { get; set; }
            public string Date { get; set; }
            public string endDate { get; set; }
            public string starttime { get; set; }
            public string endtime { get; set; }
            public string chatlink { get; set; }
            public string stateid { get; set; }
            public string cityid { get; set; }
            public string schoolid { get; set; }

            public string Classid { get; set; }
            public string streamId { get; set; }
            public Int32 ID { get; set; }
            public string TopicName { get; set; }
            public string VideoName { get; set; }
            public string NewVideoName { get; set; }
            public string ImageName { get; set; }
            public string NewImageName { get; set; }
            public Int32 publish { get; set; }
            public Int32 usertype { get; set; }
            public Int32 webinartype { get; set; }

        }
        public class EditParameter
        {
            public string acttype { get; set; }
            public Int32 id { get; set; }
        }


        //class for get class
        public class GetClassResponseWebinar
        {
            public bool status { get; set; } = false;
            public string message { get; set; } = "";
            public List<GetClassDataWebinar> data { get; set; }
        }
        public class GetClassDataWebinar
        {
            public int classid { get; set; }
            public string classname { get; set; }
        }
        //class for get stream
        public class GetStreamResponseWebinar
        {
            public bool status { get; set; } = false;
            public string message { get; set; } = "";
            public List<GetStreamsDataWebinar> data { get; set; }
        }
        public class GetStreamsDataWebinar
        {
            public Int32 streamid { get; set; }
            public string streamname { get; set; }
        }

        //class for bind user type
        public class BindUserResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public List<BindUserData> data { get; set; }
        }
        public class BindUserData
        {
            public Int32 usertype { get; set; }
            public string username { get; set; }
        }
    }
}
