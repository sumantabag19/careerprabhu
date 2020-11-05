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
    [Route("api/reports")]
    public class reports : Controller
    {
        IConfiguration _iconfiguration;
        public reports(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
        }



        [HttpGet]
        [Route("GetCountStudent")]
        public string GetCountStudent()
        {
            GetCountResponses GSR = new GetCountResponses();
            List<GetCount> ListGSD = new List<GetCount>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("GetNoOfStudentsInApp", con);
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
                        GetCount GSD = new GetCount();
                        GSD.noofregstudent = Convert.ToInt32(row["noofregistered"]);
                        GSD.noofnotregstudent = Convert.ToInt32(row["noofnotregistered"]);
                        GSD.noofaddfromapp = Convert.ToInt32(row["nooffromapp"]);
                        GSD.noofaddfrombackend = Convert.ToInt32(row["nooffrombackend"]);

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
        [Route("appdownloader")]
        public string appdownloader([FromHeader] Get_type data)
        {
            GetAppDownloaderResponses GSR = new GetAppDownloaderResponses();
            List<GetAppDownloader> ListGSD = new List<GetAppDownloader>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("GetStudentInfoForCP", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("id_d", data.id);
                cmd.Parameters.AddWithValue("startdate_d", Convert.ToString(data.startdate));
                cmd.Parameters.AddWithValue("enddate_d", Convert.ToString(data.enddate));

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
                        GetAppDownloader GSD = new GetAppDownloader();
                        GSD.dateofdw = Convert.ToString(row["dateofdw"]);
                        GSD.studentname = Convert.ToString(row["studentname"]);
                        GSD.classes = Convert.ToString(row["class"]);
                        GSD.stream = Convert.ToString(row["stream"]);
                        GSD.phone = Convert.ToString(row["phone"]);
                        GSD.state = Convert.ToString(row["state"]);
                        GSD.city = Convert.ToString(row["city"]);
                        GSD.school = Convert.ToString(row["school"]);
                        GSD.email = Convert.ToString(row["email"]);

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
        [Route("GetUnRegisteredStudent")]
        public string GetUnRegisteredStudent([FromHeader] Get_studenttype data)
        {
            GetAppDownloaderResponses GSR = new GetAppDownloaderResponses();
            List<GetAppDownloader> ListGSD = new List<GetAppDownloader>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("GetSubscribedButNotUsing", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("stateid_d", data.stateid);
                cmd.Parameters.AddWithValue("cityid_d", data.cityid);
                cmd.Parameters.AddWithValue("schoolid_d", data.schoolid);
                cmd.Parameters.AddWithValue("classid_d", data.classid);
                cmd.Parameters.AddWithValue("streamid_d", data.streamid);
                cmd.Parameters.AddWithValue("id_d", data.id);

                cmd.Parameters.AddWithValue("startdate_d", Convert.ToString(data.startdate));
                cmd.Parameters.AddWithValue("enddate_d", Convert.ToString(data.enddate));

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
                        GetAppDownloader GSD = new GetAppDownloader();
                        GSD.dateofdw = Convert.ToString(row["dateofdw"]);
                        GSD.studentname = Convert.ToString(row["studentname"]);
                        GSD.classes = Convert.ToString(row["class"]);
                        GSD.stream = Convert.ToString(row["stream"]);
                        GSD.phone = Convert.ToString(row["phone"]);
                        GSD.state = Convert.ToString(row["state"]);
                        GSD.city = Convert.ToString(row["city"]);
                        GSD.school = Convert.ToString(row["school"]);
                        GSD.email = Convert.ToString(row["email"]);

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
        [Route("GetFreeUser")]
        public string GetFreeUser([FromHeader] Get_studenttype data)
        {
            GetAppDownloaderResponses GSR = new GetAppDownloaderResponses();
            List<GetAppDownloader> ListGSD = new List<GetAppDownloader>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("GetFreeUser", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("stateid_d", data.stateid);
                cmd.Parameters.AddWithValue("cityid_d", data.cityid);
                cmd.Parameters.AddWithValue("schoolid_d", data.schoolid);
                cmd.Parameters.AddWithValue("classid_d", data.classid);
                cmd.Parameters.AddWithValue("streamid_d", data.streamid);
                cmd.Parameters.AddWithValue("id_d", data.id);

                cmd.Parameters.AddWithValue("startdate_d", Convert.ToString(data.startdate));
                cmd.Parameters.AddWithValue("enddate_d", Convert.ToString(data.enddate));

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
                        GetAppDownloader GSD = new GetAppDownloader();
                        GSD.dateofdw = Convert.ToString(row["dateofdw"]);
                        GSD.studentname = Convert.ToString(row["studentname"]);
                        GSD.classes = Convert.ToString(row["class"]);
                        GSD.stream = Convert.ToString(row["stream"]);
                        GSD.phone = Convert.ToString(row["phone"]);
                        GSD.state = Convert.ToString(row["state"]);
                        GSD.city = Convert.ToString(row["city"]);
                        GSD.school = Convert.ToString(row["school"]);
                        GSD.email = Convert.ToString(row["email"]);

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
        [Route("GetClickPaidNotSub")]
        public string GetClickPaidNotSub([FromHeader] Get_studenttype data)
        {
            GetAppDownloaderResponses GSR = new GetAppDownloaderResponses();
            List<GetAppDownloader> ListGSD = new List<GetAppDownloader>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("GetClickedButNotubscribed", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("stateid_d", data.stateid);
                cmd.Parameters.AddWithValue("cityid_d", data.cityid);
                cmd.Parameters.AddWithValue("schoolid_d", data.schoolid);
                cmd.Parameters.AddWithValue("classid_d", data.classid);
                cmd.Parameters.AddWithValue("streamid_d", data.streamid);
                cmd.Parameters.AddWithValue("id_d", data.id);

                cmd.Parameters.AddWithValue("startdate_d", Convert.ToString(data.startdate));
                cmd.Parameters.AddWithValue("enddate_d", Convert.ToString(data.enddate));

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
                        GetAppDownloader GSD = new GetAppDownloader();
                        GSD.dateofdw = Convert.ToString(row["dateofdw"]);
                        GSD.studentname = Convert.ToString(row["studentname"]);
                        GSD.classes = Convert.ToString(row["class"]);
                        GSD.stream = Convert.ToString(row["stream"]);
                        GSD.phone = Convert.ToString(row["phone"]);
                        GSD.state = Convert.ToString(row["state"]);
                        GSD.city = Convert.ToString(row["city"]);
                        GSD.school = Convert.ToString(row["school"]);
                        GSD.email = Convert.ToString(row["email"]);

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
        [Route("GetSubscribedUsers")]
        public string GetSubscribedUsers([FromHeader] Get_studenttype data)
        {
            GetAppDownloaderResponses GSR = new GetAppDownloaderResponses();
            List<GetAppDownloader> ListGSD = new List<GetAppDownloader>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("GetSubscribedUsers", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("stateid_d", data.stateid);
                cmd.Parameters.AddWithValue("cityid_d", data.cityid);
                cmd.Parameters.AddWithValue("schoolid_d", data.schoolid);
                cmd.Parameters.AddWithValue("classid_d", data.classid);
                cmd.Parameters.AddWithValue("streamid_d", data.streamid);
                cmd.Parameters.AddWithValue("id_d", data.id);

                cmd.Parameters.AddWithValue("startdate_d", Convert.ToString(data.startdate));
                cmd.Parameters.AddWithValue("enddate_d", Convert.ToString(data.enddate));

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
                        GetAppDownloader GSD = new GetAppDownloader();
                        GSD.dateofdw = Convert.ToString(row["dateofdw"]);
                        GSD.studentname = Convert.ToString(row["studentname"]);
                        GSD.classes = Convert.ToString(row["class"]);
                        GSD.stream = Convert.ToString(row["stream"]);
                        GSD.phone = Convert.ToString(row["phone"]);
                        GSD.state = Convert.ToString(row["state"]);
                        GSD.city = Convert.ToString(row["city"]);
                        GSD.school = Convert.ToString(row["school"]);
                        GSD.email = Convert.ToString(row["email"]);

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
        [Route("GetScholarship")] 
        public string GetScholarship([FromHeader] Get_studenttype data)
        {
            GetAppDownloaderResponses GSR = new GetAppDownloaderResponses();
            List<GetAppDownloader> ListGSD = new List<GetAppDownloader>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("GetScholarshipReports", con);
                cmd.CommandType = CommandType.StoredProcedure;
                
                cmd.Parameters.AddWithValue("classid_d", data.classid);
                cmd.Parameters.AddWithValue("streamid_d", data.stream == "0" ? "" : data.stream);

                cmd.Parameters.AddWithValue("startdate_d", Convert.ToString(data.startdate));
                cmd.Parameters.AddWithValue("enddate_d", Convert.ToString(data.enddate));

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
                        GetAppDownloader GSD = new GetAppDownloader();
                        GSD.dateofdw = Convert.ToString(row["createdon"]);
                        GSD.classes = Convert.ToString(row["class_id"]);
                        GSD.stream = Convert.ToString(row["stream"]);
                        GSD.phone = Convert.ToString(row["heading"]);
                       

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
        [Route("GetEntranceExam")]
        public string GetEntranceExam([FromHeader] Get_studenttype data)
        {
            GetAppDownloaderResponses GSR = new GetAppDownloaderResponses();
            List<GetAppDownloader> ListGSD = new List<GetAppDownloader>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("GetEntranceExamReports", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("classid_d", data.classid);
                cmd.Parameters.AddWithValue("streamid_d", data.stream == "0" ? "" : data.stream);

                cmd.Parameters.AddWithValue("startdate_d", Convert.ToString(data.startdate));
                cmd.Parameters.AddWithValue("enddate_d", Convert.ToString(data.enddate));

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
                        GetAppDownloader GSD = new GetAppDownloader();
                        GSD.dateofdw = Convert.ToString(row["createdon"]);
                        GSD.classes = Convert.ToString(row["class_id"]);
                        GSD.stream = Convert.ToString(row["stream"]);
                        GSD.phone = Convert.ToString(row["heading"]);


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
        [Route("GetCountSummerSchool")]
        public string GetCountSummerSchool()
        {
            GetCountResponses GSR = new GetCountResponses();
            List<GetCount> ListGSD = new List<GetCount>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("GetNoOfSummerSchool", con);
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
                        GetCount GSD = new GetCount();
                        GSD.noofschool = Convert.ToInt32(row["noofschool"]);
                     

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
        [Route("GetAddSummerSchool")]
        public string GetAddSummerSchool([FromHeader] Get_type data)
        {
            GetAppDownloaderResponses GSR = new GetAppDownloaderResponses();
            List<GetAppDownloader> ListGSD = new List<GetAppDownloader>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getsummeraddbystudent", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("id_d", data.id);
                cmd.Parameters.AddWithValue("startdate_d", Convert.ToString(data.startdate));
                cmd.Parameters.AddWithValue("enddate_d", Convert.ToString(data.enddate));

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
                        GetAppDownloader GSD = new GetAppDownloader();
                        GSD.dateofdw = Convert.ToString(row["dateofdw"]);
                        GSD.studentname = Convert.ToString(row["studentname"]);
                        GSD.classes = Convert.ToString(row["class"]);
                        GSD.stream = Convert.ToString(row["stream"]);
                        GSD.phone = Convert.ToString(row["phone"]);
                        GSD.state = Convert.ToString(row["state"]);
                        GSD.city = Convert.ToString(row["city"]);
                        GSD.school = Convert.ToString(row["school"]);
                        GSD.email = Convert.ToString(row["email"]);

                        GSD.schoolname = Convert.ToString(row["schoolname"]);
                        GSD.donestate = Convert.ToString(row["donestate"]);
                        GSD.donecollege = Convert.ToString(row["donecollege"]);
                        GSD.fromdate = Convert.ToString(row["fromdate"]);
                        GSD.todate = Convert.ToString(row["todate"]);

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
        [Route("GetSummerSchool")]
        public string GetSummerSchool([FromHeader] Get_type data)
        {
            GetSummerSchoolResponses GSR = new GetSummerSchoolResponses();
            List<GetSummerSchoolReport> ListGSD = new List<GetSummerSchoolReport>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getsummerschoolreport", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("id_d", data.id);
                cmd.Parameters.AddWithValue("countryid_d", data.countryid);
                cmd.Parameters.AddWithValue("stateid_d", data.stateid);
                cmd.Parameters.AddWithValue("cityid_d", data.cityid);
                cmd.Parameters.AddWithValue("universityid_d", data.universityid);
                cmd.Parameters.AddWithValue("interestid_d", data.interestarea);

                cmd.Parameters.AddWithValue("startdate_d", Convert.ToString(data.startdate));
                cmd.Parameters.AddWithValue("enddate_d", Convert.ToString(data.enddate));

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
                        GetSummerSchoolReport GSD = new GetSummerSchoolReport();
                        GSD.publisheddate = Convert.ToString(row["publisheddate"]);
                        GSD.countryname = Convert.ToString(row["countryname"]);
                        GSD.location = Convert.ToString(row["location"]);
                        GSD.cityname = Convert.ToString(row["cityname"]);
                        GSD.univercity = Convert.ToString(row["univercity"]);
                        GSD.startdate = Convert.ToString(row["startdate"]);
                        GSD.enddate = Convert.ToString(row["enddate"]);
                        GSD.repositoryname = Convert.ToString(row["repositoryname"]);
                        GSD.topic = Convert.ToString(row["topic"]);
                        GSD.duration = Convert.ToString(row["duration"]);
                        GSD.fees = Convert.ToString(row["fees"]);
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
        [Route("GetQueryReport")]
        public string GetQueryReport([FromHeader] Get_studenttype data)
        {
            GetQueryResponses GSR = new GetQueryResponses();
            List<GetQuery> ListGSD = new List<GetQuery>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("GetQueryReports", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("classid_d", data.classid);
                cmd.Parameters.AddWithValue("streamid_d", data.streamid);
                cmd.Parameters.AddWithValue("stateid_d", data.stateid);
                cmd.Parameters.AddWithValue("cityid_d", data.cityid);
                cmd.Parameters.AddWithValue("schoolid_d", data.schoolid);
                cmd.Parameters.AddWithValue("studentid_d", data.studentid);

                cmd.Parameters.AddWithValue("startdate_d", Convert.ToString(data.startdate));
                cmd.Parameters.AddWithValue("enddate_d", Convert.ToString(data.enddate));

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
                        GetQuery GSD = new GetQuery();
                        GSD.state = Convert.ToString(row["state"]);
                        GSD.city = Convert.ToString(row["citytname"]);
                        GSD.school = Convert.ToString(row["schoolname"]);
                        GSD.studentname = Convert.ToString(row["studentname"]);
                        GSD.classes = Convert.ToString(row["classname"]);
                        GSD.stream = Convert.ToString(row["streamname"]);
                        GSD.email = Convert.ToString(row["email"]);
                        GSD.phone = Convert.ToString(row["phone"]);
                        GSD.querydate = Convert.ToString(row["querydate"]);
                        GSD.query = Convert.ToString(row["Question"]);
                        if(Convert.ToString(row["replay"])=="" || Convert.ToString(row["replay"])== null)
                        {
                            GSD.replay = "N/A";

                        }
                        else
                        {
                            GSD.replay = Convert.ToString(row["replay"]);

                        }
                        GSD.status = Convert.ToString(row["stata"]);






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
        [Route("GetFaqData")]
        public string GetFaqData([FromHeader] Get_type data)
        {
            GetFaqResponses GSR = new GetFaqResponses();
            List<GetFaqReport> ListGSD = new List<GetFaqReport>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getfaqlistingreport", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("careername_d", data.careername ?? "");
                cmd.Parameters.AddWithValue("keyword_b", data.keyword ?? "") ;
              
                cmd.Parameters.AddWithValue("startdate_d", Convert.ToString(data.startdate));
                cmd.Parameters.AddWithValue("enddate_d", Convert.ToString(data.enddate));

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
                        GetFaqReport GSD = new GetFaqReport();
                        GSD.question = Convert.ToString(row["question"]);
                        GSD.answar = Convert.ToString(row["answar"]);
                        GSD.careerlisting = Convert.ToString(row["listing"]);
                    
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
        [Route("GetFaqIssueData")]
        public string GetFaqIssueData([FromHeader] Get_type data)
        {
            GetFaqIssueResponses GSR = new GetFaqIssueResponses();
            List<GetFaqIssueReport> ListGSD = new List<GetFaqIssueReport>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getfaqissueraisedreport", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("careername_d", data.careername ?? "");

                cmd.Parameters.AddWithValue("startdate_d", Convert.ToString(data.startdate));
                cmd.Parameters.AddWithValue("enddate_d", Convert.ToString(data.enddate));

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
                        GetFaqIssueReport GSD = new GetFaqIssueReport();
                        GSD.email = Convert.ToString(row["email"]);
                        GSD.studentname = Convert.ToString(row["studentname"]);
                        GSD.issueraised = Convert.ToString(row["issueraised"]);

                        GSD.Question = Convert.ToString(row["Question"]);
                        GSD.answar = Convert.ToString(row["answar"]);
                        GSD.phone = Convert.ToString(row["phone"]);

                        GSD.state = Convert.ToString(row["state"]);
                        GSD.citytname = Convert.ToString(row["citytname"]);
                        GSD.schoolname = Convert.ToString(row["schoolname"]);

                        GSD.classname = Convert.ToString(row["classname"]);
                        GSD.streamname = Convert.ToString(row["streamname"]);
                        GSD.issuedate = Convert.ToString(row["issuedate"]);
                        GSD.career = Convert.ToString(row["careerlisting"]);


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
        [Route("GetArticleData")]
        public string GetArticleData([FromHeader] Get_type data)
        {
            GetArticleResponses GSR = new GetArticleResponses();
            List<GetArticleReport> ListGSD = new List<GetArticleReport>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getarticlereport", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("keyword_d", data.keyword ?? "");

                cmd.Parameters.AddWithValue("startdate_d", Convert.ToString(data.startdate));
                cmd.Parameters.AddWithValue("enddate_d", Convert.ToString(data.enddate));

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
                        GetArticleReport GSD = new GetArticleReport();
                        GSD.publisheddate = Convert.ToString(row["publisheddate"]);
                        GSD.heading = Convert.ToString(row["heading"]);
                       


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
        [Route("GetCoachData")]
        public string GetCoachData([FromHeader] Get_type data)
        {
            GetCoachResponses GSR = new GetCoachResponses();
            List<GetCoachReport> ListGSD = new List<GetCoachReport>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getcoacahreport", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("coachtype_d", data.coachtype);
                cmd.Parameters.AddWithValue("coach_d", data.coach);

                cmd.Parameters.AddWithValue("startdate_d", Convert.ToString(data.startdate));
                cmd.Parameters.AddWithValue("enddate_d", Convert.ToString(data.enddate));

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
                        GetCoachReport GSD = new GetCoachReport();
                        GSD.coachtype = Convert.ToString(row["coachtype"]);
                        GSD.coachname = Convert.ToString(row["coachname"]);
                        if(Convert.ToString(row["title_i"])=="" || Convert.ToString(row["title_i"]) == null)
                        {
                            GSD.title_i = "N/A";

                        }
                        else
                        {
                            GSD.title_i = Convert.ToString(row["title_i"]);

                        }
                        GSD.date_i = Convert.ToString(row["date_i"]);

                        if (Convert.ToString(row["title_j"]) == "" || Convert.ToString(row["title_j"]) == null)
                        {
                            GSD.title_j = "N/A";

                        }
                        else
                        {
                            GSD.title_j = Convert.ToString(row["title_j"]);

                        }
                        GSD.date_j = Convert.ToString(row["date_j"]);

                        if (Convert.ToString(row["title_a"]) == "" || Convert.ToString(row["title_a"]) == null)
                        {
                            GSD.title_a = "N/A";

                        }
                        else
                        {
                            GSD.title_a = Convert.ToString(row["title_a"]);

                        }
                        GSD.date_a = Convert.ToString(row["date_a"]);


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
        [Route("GetPlacementData")]
        public string GetPlacementData([FromHeader] Get_type data)
        {
            GetPlacedResponses GSR = new GetPlacedResponses();
            List<GetPlacedReport> ListGSD = new List<GetPlacedReport>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("GetPlacedStudentReports", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("stateid_d", data.stateid);
                cmd.Parameters.AddWithValue("cityid_d", data.cityid);

                cmd.Parameters.AddWithValue("classid_d", data.classid);
                cmd.Parameters.AddWithValue("streamid_d", data.streamid);

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
                        GetPlacedReport GSD = new GetPlacedReport();
                        GSD.state = Convert.ToString(row["state_name"]);
                        GSD.city = Convert.ToString(row["city_name"]);
                        GSD.classes = Convert.ToString(row["class_name"]);
                        GSD.stream = Convert.ToString(row["stream_name"]);
                        GSD.school = Convert.ToString(row["college"]);

                        GSD.course = Convert.ToString(row["course"]);
                        GSD.special = Convert.ToString(row["specialization"]);
                        GSD.academicyear = Convert.ToString(row["academicyear"]);


                        GSD.studentname = Convert.ToString(row["stu_name"]);
                        GSD.email = Convert.ToString(row["stu_username"]);
                        GSD.phoneno = Convert.ToString(row["stu_mobile"]);
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
        [Route("GetClickReport")]
        public string GetClickReport([FromHeader] Get_studenttype data)
        {
            GetClickResponses GSR = new GetClickResponses();
            List<GetClick> ListGSD = new List<GetClick>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("GetClickReports", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("classid_d", data.classid);
                cmd.Parameters.AddWithValue("streamid_d", data.streamid);
               

                cmd.Parameters.AddWithValue("startdate_d", Convert.ToString(data.startdate));
                cmd.Parameters.AddWithValue("enddate_d", Convert.ToString(data.enddate));

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
                        GetClick GSD = new GetClick();
                        GSD.state = Convert.ToString(row["state"]);
                        GSD.city = Convert.ToString(row["citytname"]);
                        GSD.school = Convert.ToString(row["schoolname"]);
                        GSD.studentname = Convert.ToString(row["studentname"]);
                        GSD.classes = Convert.ToString(row["classname"]);
                        GSD.stream = Convert.ToString(row["streamname"]);
                        GSD.email = Convert.ToString(row["email"]);
                        GSD.phone = Convert.ToString(row["phone"]);
                        GSD.producttype = Convert.ToString(row["producttype"]);

                        GSD.createdatetime = Convert.ToString(row["createddatetime"]);






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
        [Route("GetClickEntranceReport")]
        public string GetClickEntranceReport([FromHeader] Get_studenttype data)
        {
            GetClickResponses GSR = new GetClickResponses();
            List<GetClick> ListGSD = new List<GetClick>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("GetClickReportsEntrance", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("classid_d", data.classid);
                cmd.Parameters.AddWithValue("streamid_d", data.streamid);


                cmd.Parameters.AddWithValue("startdate_d", Convert.ToString(data.startdate));
                cmd.Parameters.AddWithValue("enddate_d", Convert.ToString(data.enddate));

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
                        GetClick GSD = new GetClick();
                        GSD.state = Convert.ToString(row["state"]);
                        GSD.city = Convert.ToString(row["citytname"]);
                        GSD.school = Convert.ToString(row["schoolname"]);
                        GSD.studentname = Convert.ToString(row["studentname"]);
                        GSD.classes = Convert.ToString(row["classname"]);
                        GSD.stream = Convert.ToString(row["streamname"]);
                        GSD.email = Convert.ToString(row["email"]);
                        GSD.phone = Convert.ToString(row["phone"]);
                        GSD.producttype = Convert.ToString(row["producttype"]);

                        GSD.createdatetime = Convert.ToString(row["createddatetime"]);






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
        [Route("GetClickSummerReport")]
        public string GetClickSummerReport([FromHeader] Get_studenttype data)
        {
            GetClickResponses GSR = new GetClickResponses();
            List<GetClick> ListGSD = new List<GetClick>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("GetClickReportsSummer", con);
                cmd.CommandType = CommandType.StoredProcedure;

                


                cmd.Parameters.AddWithValue("startdate_d", Convert.ToString(data.startdate));
                cmd.Parameters.AddWithValue("enddate_d", Convert.ToString(data.enddate));

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
                        GetClick GSD = new GetClick();
                        GSD.state = Convert.ToString(row["state"]);
                        GSD.city = Convert.ToString(row["citytname"]);
                        GSD.school = Convert.ToString(row["schoolname"]);
                        GSD.studentname = Convert.ToString(row["studentname"]);
                        GSD.classes = Convert.ToString(row["classname"]);
                        GSD.stream = Convert.ToString(row["streamname"]);
                        GSD.email = Convert.ToString(row["email"]);
                        GSD.phone = Convert.ToString(row["phone"]);
                        GSD.producttype = Convert.ToString(row["producttype"]);

                        GSD.createdatetime = Convert.ToString(row["createddatetime"]);






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
        [Route("GetBuildingUsageData")]
        public string GetBuildingUsageData([FromHeader] Get_type data)
        {
            GetbuildingResponses GSR = new GetbuildingResponses();
            List<GetbuildingusageReport> ListGSD = new List<GetbuildingusageReport>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("GetBuildingUsageReports", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("stateid_d", data.stateid);
                cmd.Parameters.AddWithValue("cityid_d", data.cityid);

                cmd.Parameters.AddWithValue("classid_d", data.classid);
                cmd.Parameters.AddWithValue("streamid_d", data.streamid);
                cmd.Parameters.AddWithValue("op_d", data.op == 0 ? 1 : data.op);

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
                        GetbuildingusageReport GSD = new GetbuildingusageReport();
                        GSD.state = Convert.ToString(row["state_name"]);
                        GSD.city = Convert.ToString(row["city_name"]);
                        GSD.classes = Convert.ToString(row["class_name"]);
                        GSD.stream = Convert.ToString(row["stream_name"]);
                        GSD.school = Convert.ToString(row["college"]);
                        GSD.studentname = Convert.ToString(row["stu_name"]);
                        GSD.email = Convert.ToString(row["stu_username"]);
                        GSD.phoneno = Convert.ToString(row["stu_mobile"]);
                        GSD.createddatetime = Convert.ToString(row["createddatetime"]);
                        if (data.op == 1)
                        {
                            GSD.feature ="Transcript";

                        }
                        if (data.op == 2)
                        {
                            GSD.feature = "Extra Curricular Activity";

                        }
                        if (data.op == 3)
                        {
                            GSD.feature = "Social Work ";

                        }
                        if (data.op == 4)
                        {
                            GSD.feature = "Extra Certification Program";

                        }
                        if (data.op == 5)
                        {
                            GSD.feature = "Internship";

                        }
                        if (data.op == 0)
                        {
                            GSD.feature = "Transcript";

                        }

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
        [Route("GetMaterialUsageData")]
        public string GetMaterialUsageData([FromHeader] Get_type data)
        {
            GetbuildingResponses GSR = new GetbuildingResponses();
            List<GetbuildingusageReport> ListGSD = new List<GetbuildingusageReport>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("GetMaterialUsageReports", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("stateid_d", data.stateid);
                cmd.Parameters.AddWithValue("cityid_d", data.cityid);

                cmd.Parameters.AddWithValue("classid_d", data.classid);
                cmd.Parameters.AddWithValue("streamid_d", data.streamid);
                cmd.Parameters.AddWithValue("category_d", data.category);
                cmd.Parameters.AddWithValue("subcategory_d", data.subcategory);

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
                        GetbuildingusageReport GSD = new GetbuildingusageReport();
                        GSD.state = Convert.ToString(row["state_name"]);
                        GSD.city = Convert.ToString(row["city_name"]);
                        GSD.classes = Convert.ToString(row["class_name"]);
                        GSD.stream = Convert.ToString(row["stream_name"]);
                        GSD.school = Convert.ToString(row["college"]);
                        GSD.studentname = Convert.ToString(row["stu_name"]);
                        GSD.email = Convert.ToString(row["stu_username"]);
                        GSD.phoneno = Convert.ToString(row["stu_mobile"]);
                        GSD.createddatetime = Convert.ToString(row["createddatetime"]);
                      

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
        [Route("GetPaymentDetails")]
        public string GetPaymentDetails([FromHeader] Get_studenttype data)
        {
            GetQueryResponses GSR = new GetQueryResponses();
            List<GetQuery> ListGSD = new List<GetQuery>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("GetQueryReports", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("classid_d", data.classid);
                cmd.Parameters.AddWithValue("streamid_d", data.streamid);
                cmd.Parameters.AddWithValue("stateid_d", data.stateid);
                cmd.Parameters.AddWithValue("cityid_d", data.cityid);
                cmd.Parameters.AddWithValue("schoolid_d", data.schoolid);
                cmd.Parameters.AddWithValue("studentid_d", data.studentid);

                cmd.Parameters.AddWithValue("startdate_d", Convert.ToString(data.startdate));
                cmd.Parameters.AddWithValue("enddate_d", Convert.ToString(data.enddate));

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
                        GetQuery GSD = new GetQuery();
                        GSD.state = Convert.ToString(row["state"]);
                        GSD.city = Convert.ToString(row["citytname"]);
                        GSD.school = Convert.ToString(row["schoolname"]);
                        GSD.studentname = Convert.ToString(row["studentname"]);
                        GSD.classes = Convert.ToString(row["classname"]);
                        GSD.stream = Convert.ToString(row["streamname"]);
                        GSD.email = Convert.ToString(row["email"]);
                        GSD.phone = Convert.ToString(row["phone"]);
                        GSD.querydate = Convert.ToString(row["querydate"]);
                        GSD.query = Convert.ToString(row["Question"]);
                        if (Convert.ToString(row["replay"]) == "" || Convert.ToString(row["replay"]) == null)
                        {
                            GSD.replay = "N/A";

                        }
                        else
                        {
                            GSD.replay = Convert.ToString(row["replay"]);

                        }
                        GSD.status = Convert.ToString(row["stata"]);






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
        [Route("GetPaidStudentDetails")]
        public string GetPaidStudentDetails([FromHeader] Get_studenttype data)
        {
            GetPaidStudentResponses GSR = new GetPaidStudentResponses();
            List<GetPaidStudent> ListGSD = new List<GetPaidStudent>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("GetPaidStudentsDetails_new", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("classid_d", data.classid);
                cmd.Parameters.AddWithValue("streamid_d", data.streamid);
                cmd.Parameters.AddWithValue("stateid_d", data.stateid);
                cmd.Parameters.AddWithValue("cityid_d", data.cityid);
                cmd.Parameters.AddWithValue("schoolid_d", data.schoolid);
                cmd.Parameters.AddWithValue("paidstatus_d", data.paidstatus);

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
                        GetPaidStudent GSD = new GetPaidStudent();
                        GSD.studentname = Convert.ToString(row["studentname"]);
                        GSD.state = Convert.ToString(row["state"]);
                        GSD.city = Convert.ToString(row["city"]);
                        GSD.school = Convert.ToString(row["school"]);
                        GSD.classes = Convert.ToString(row["class"]);
                        GSD.stream = Convert.ToString(row["stream"]);
                        GSD.phone = Convert.ToString(row["phone"]);
                        GSD.email = Convert.ToString(row["email"]);
                        GSD.dateofpayment = Convert.ToString(row["dateofpayment"]);
                        GSD.receiptno = Convert.ToString(row["receiptno"]);
                        GSD.paidstatus = Convert.ToString(row["paidstatus"]);
                        GSD.productname = Convert.ToString(row["productname"]);
                        GSD.amount = Convert.ToString(row["amount"]);

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
        [Route("GetUsagepatternReport")]
        public string GetUsagepatternReport([FromHeader] Get_studenttype data)
        {
            GetQueryResponses GSR = new GetQueryResponses();
            List<GetQuery> ListGSD = new List<GetQuery>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("GetUsageReports", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("classid_d", data.classid);
                cmd.Parameters.AddWithValue("streamid_d", data.streamid);
                cmd.Parameters.AddWithValue("stateid_d", data.stateid);
                cmd.Parameters.AddWithValue("cityid_d", data.cityid);
                cmd.Parameters.AddWithValue("schoolid_d", data.schoolid);
                cmd.Parameters.AddWithValue("studentid_d", data.studentid);


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
                        GetQuery GSD = new GetQuery();
                        GSD.state = Convert.ToString(row["state"]);
                        GSD.city = Convert.ToString(row["citytname"]);
                        GSD.school = Convert.ToString(row["schoolname"]);
                        GSD.studentname = Convert.ToString(row["studentname"]);
                        GSD.classes = Convert.ToString(row["classname"]);
                        GSD.stream = Convert.ToString(row["streamname"]);
                        GSD.email = Convert.ToString(row["email"]);
                        GSD.phone = Convert.ToString(row["phone"]);
                        
                        GSD.status = Convert.ToString(row["stat"]);






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


    public class GetCountResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetCount> data { get; set; }
    }
    public class GetCount
    {

        public int noofregstudent { get; set; }
        public Int32 noofnotregstudent { get; set; }
        public Int32 noofaddfromapp { get; set; }
        public Int32 noofaddfrombackend { get; set; }
        public Int32 noofschool { get; set; }

    }



    public class GetAppDownloaderResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetAppDownloader> data { get; set; }
    }
    public class GetAppDownloader
    {

        public string dateofdw { get; set; }
        public string studentname { get; set; }
        public string school { get; set; }
        public string classes { get; set; }
        public string stream { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string email { get; set; }
        public string phone { get; set; }

        public string schoolname { get; set; }
        public string donestate { get; set; }
        public string donecollege { get; set; }
        public string fromdate { get; set; }
        public string todate { get; set; }

    }
    public class Get_type
    {
        public int id { get; set; }
        public int countryid { get; set; }
        public int stateid { get; set; }
        public int cityid { get; set; }

        public int classid { get; set; }
        public int streamid { get; set; }
        public int universityid { get; set; }
        public int interestarea { get; set; }
        public string careername { get; set; }
        public string keyword { get; set; }

        public int coachtype { get; set; }
        public int coach { get; set; }
        public int op { get; set; }
        public int category { get; set; }
        public int subcategory { get; set; }
        public string startdate { get; set; }
        public string enddate { get; set; }

    }
    public class Get_studenttype
    {
        public int id { get; set; }

        public int stateid { get; set; }
        public int cityid { get; set; }
        public int schoolid { get; set; }
        public int classid { get; set; }

        public int streamid { get; set; }
        public int studentid { get; set; }


        public string stream { get; set; }



        public string startdate { get; set; }
        public string enddate { get; set; }
        public int paidstatus { get; set; }
    }

    public class GetSummerSchoolResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetSummerSchoolReport> data { get; set; }
    }
    public class GetSummerSchoolReport
    {

        public string countryname { get; set; }
        public string topic { get; set; }
        public string repositoryname { get; set; }
        public string duration { get; set; }
        public string fees { get; set; }
        public string cityname { get; set; }
        public string enddate { get; set; }
        public string startdate { get; set; }
        public string univercity { get; set; }
        public string location { get; set; }
        public string publisheddate { get; set; }
    }


    public class GetClickResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetClick> data { get; set; }
    }
    public class GetClick
    {

        public string state { get; set; }
        public string city { get; set; }
        public string school { get; set; }
        public string classes { get; set; }
        public string stream { get; set; }
        public string studentname { get; set; }
        public string email { get; set; }
        public string phone { get; set; }

        public string createdatetime { get; set; }
        public string producttype { get; set; }

    }







    public class GetQueryResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetQuery> data { get; set; }
    }
    public class GetQuery
    {

        public string state { get; set; }
        public string city { get; set; }
        public string school { get; set; }
        public string classes { get; set; }
        public string stream { get; set; }
        public string studentname { get; set; }
        public string email { get; set; }
        public string phone { get; set; }

        public string querydate { get; set; }
        public string query { get; set; }
        public string replaydate { get; set; }
        public string replay { get; set; }
        public string status { get; set; }

    }


    public class GetFaqResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetFaqReport> data { get; set; }
    }
    public class GetFaqReport
    {

        public string question { get; set; }
        public string answar { get; set; }
        public string careerlisting { get; set; }
       
    }

    public class GetFaqIssueResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetFaqIssueReport> data { get; set; }
    }
    public class GetFaqIssueReport
    {

        public string email { get; set; }
        public string career { get; set; }

        public string studentname { get; set; }
        public string issueraised { get; set; }

        public string Question { get; set; }
        public string answar { get; set; }
        public string phone { get; set; }

        public string state { get; set; }
        public string citytname { get; set; }
        public string schoolname { get; set; }

        public string classname { get; set; }
        public string streamname { get; set; }
        public string issuedate { get; set; }

    }

    public class GetArticleResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetArticleReport> data { get; set; }
    }
    public class GetArticleReport
    {

        public string publisheddate { get; set; }
        public string heading { get; set; }

     

    }


    public class GetCoachResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetCoachReport> data { get; set; }
    }
    public class GetCoachReport
    {

        public string coachtype { get; set; }
        public string coachname { get; set; }

        public string title_i { get; set; }
        public string date_i { get; set; }

        public string title_j { get; set; }
        public string date_j { get; set; }

        public string title_a { get; set; }
        public string date_a { get; set; }



    }

    public class GetbuildingResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetbuildingusageReport> data { get; set; }
    }
    public class GetbuildingusageReport
    {

        public string state { get; set; }
        public string city { get; set; }

        public string school { get; set; }
        public string classes { get; set; }

        public string stream { get; set; }
        public string studentname { get; set; }

        public string email { get; set; }
        public string phoneno { get; set; }


        public string createddatetime { get; set; }
        public string feature { get; set; }
    }

    public class GetPlacedResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetPlacedReport> data { get; set; }
    }
    public class GetPlacedReport
    {

        public string state { get; set; }
        public string city { get; set; }

        public string school { get; set; }
        public string classes { get; set; }

        public string stream { get; set; }
        public string studentname { get; set; }

        public string email { get; set; }
        public string phoneno { get; set; }
        public string course { get; set; }

        public string special { get; set; }
        public string academicyear { get; set; }


    }



    public class GetPaidStudentResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetPaidStudent> data { get; set; }
    }
    public class GetPaidStudent
    {

        public string studentname { get; set; }
        public string state { get; set; }
        public string city { get; set; }
        public string school { get; set; }
        public string classes { get; set; }
        public string stream { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string dateofpayment { get; set; }

        public string receiptno { get; set; }
        public string paidstatus { get; set; }
        public string productname { get; set; }

        public string amount { get; set; }

    }




}
