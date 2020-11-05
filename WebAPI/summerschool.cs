using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CareerPrabhu.WebAPI
{
    [Route("api/summerschool")]
    public class summerschool : Controller
    {
        IConfiguration _iconfiguration;
        public summerschool(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
        }



        [HttpPost]
        [Route("Upload")]
        public string Upload([FromBody]ExcellSchoolData_summerschool obj)
        {
            AddGroupClass_summerschool ObjClass = new AddGroupClass_summerschool();
            ExcellSchoolData_summerschool nxt = new ExcellSchoolData_summerschool();
            List<SchoolData_summerschool> lst = new List<SchoolData_summerschool>();
            string json = "";
            int intid_d = 0;


            try
            {


                if (obj.schoolDatas.Count > 0)
                {
                    SchoolData tst = new SchoolData();
                    
                  
                    for (int i = 0; i < obj.schoolDatas.Count; i++)
                    {
                        tst.country = Convert.ToString(obj.schoolDatas[0].country);
                        int cid = Return_Int("select countryid from tbl_countrymaster where countryname= '" + Convert.ToString(obj.schoolDatas[i].country) + "'");
                        int sid = Return_Int("select locationid from tbl_location where location='" + Convert.ToString(obj.schoolDatas[i].state) + "'");
                        int ciid = Return_Int("select cityid from tbl_careercitymaster where cityname='" + Convert.ToString(obj.schoolDatas[i].city) + "'");
                        int uid = Return_Int("select universityid from tbl_university where universityname='" + Convert.ToString(obj.schoolDatas[i].university) + "'");
                        int topicid = Return_Int("select summertopicid from tbl_summertopic where summertopic='" + Convert.ToString(obj.schoolDatas[i].topic) + "'");
                        int currid = Return_Int("select currencyid from currency where currency='" + Convert.ToString(obj.schoolDatas[i].currency) + "'");
                        int intid = Return_Int("select repositoryid from tbl_repositorymaster where repositoryname='" + Convert.ToString(obj.schoolDatas[i].interest) + "'");
                        //if (intid == 0)
                        //{
                        // Execqry("insert into tbl_repositorymaster(repositoryname)values" +
                        //"('" + Convert.ToString(obj.schoolDatas[i].interest) + "')");
                        //int intid = Return_Int("select max(repositoryid) from tbl_repositorymaster where repositoryname='" + Convert.ToString(obj.schoolDatas[i].interest) + "'");

                        //}

                        //Execqry("insert into tbl_repositorymaster(schoolid,intrestid)values" +
                        //"('" + Convert.ToString(obj.schoolDatas[i].interest) + "')");



                        Execqry("insert into tbl_summerschooldetail(countryid,location,univercity,cityid,repositoryid,ID,currency,link,applicationlink,fees,description,duration)values" +
                            "(" + Convert.ToInt32(cid) + ","+ Convert.ToInt32(sid) +","+ Convert.ToInt32(uid) + ","+ Convert.ToInt32(ciid) + ","+Convert.ToInt32(intid) + "," + Convert.ToInt32(topicid) + ","+ Convert.ToInt32(currid) + ", '" + Convert.ToString(obj.schoolDatas[i].link) + "','"+ Convert.ToString(obj.schoolDatas[i].applicationlink) + "','"+ Convert.ToString(obj.schoolDatas[i].fees) + "','"+ Convert.ToString(obj.schoolDatas[i].description) + "','"+ Convert.ToString(obj.schoolDatas[i].duration) + "')");




                        //  Execqry("insert into tbl_entrancecareer(examid,streamid)values(" + Convert.ToInt32(examid) + ", " + Convert.ToInt32(streamlist[i]) + ")");
                    }
                    ObjClass.Status = true;
                    ObjClass.Message = "Data Import Completed";
                }


                else
                {
                    ObjClass.Status = false;
                    ObjClass.Message = "Something Went Wrong";
                }
            }
            catch (Exception ex)
            {
                var msg = ex.Message;
                ObjClass.Status = false;
                ObjClass.Message = ("Something Went Wrong").ToString(); ;
            }

            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(ObjClass, settings);

            return json;
        }

        //public void Execqry(string qry)
        //{
        //    MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
        //    if ((con.State == ConnectionState.Closed) || (con.State == ConnectionState.Broken))
        //        con.Open();
        //    MySqlCommand cmd = new MySqlCommand(qry);
        //    cmd.Connection = con;
        //    cmd.ExecuteNonQuery();
        //    cmd.Dispose();
        //    con.Close();
        //}


        public int Return_Int(string st)
        {
            MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
            int code = 0;
            if (con.State == ConnectionState.Closed)
            {
                con.Open();
            }

            MySqlCommand cmd = new MySqlCommand(st, con);
            MySqlDataReader dr = cmd.ExecuteReader();
            if (dr.HasRows == true)
            {
                dr.Read();
                if (dr[0] is DBNull)
                {
                }
                else
                {
                    code = Convert.ToInt32(dr[0]);
                }


            }
            dr.Close();
            con.Close();
            return (code);
        }















        //API for calculate duration
        [HttpPost]
        [Route("CalculateDuration")]
        public string CalculateDuration([FromBody] GetDateDiff data)
        {
            DataSet ds = new DataSet();
            string json = "";
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("CalculateDuration", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("st_d", data.startdate);
                cmd.Parameters.AddWithValue("end_d", data.enddate);


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
        public string Converter(string ddate)
        {
            DateTime dt;


            char[] separator = new char[] { '/' };
            string[] strSplitArr = ddate.Split(separator);
            string dd, mm, yy;

            dd = strSplitArr[0].ToString();
            mm = strSplitArr[1].ToString();
            yy = strSplitArr[2].ToString();
            string db;
            db = mm + "/" + dd + "/" + yy;
            dt = Convert.ToDateTime(db);

            return dt.ToString("yyyy/MM/dd");

        }

        //bind intrest area
        [HttpGet]
        [Route("Bindintrestarea")]
        public string Bindintrestarea()
        {
            DataSet ds = new DataSet();
            string json = "";
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindIntrestArea", con);
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

        //Bind Country

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

        //Bind Currency
        [HttpGet]
        [Route("Bindcurrency")]
        public string Bindcurrency()
        {
            DataSet ds = new DataSet();
            string json = "";
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Bindcurrency", con);
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


        //API for Bind Location
        //Api for bind location
        [HttpPost]
        [Route("BindLocation")]
        public string BindLocation([FromBody] GetSummerLocationData1 data)
        {
            GetSummerLocationResponse GSR = new GetSummerLocationResponse();
            List<GetSummerLocationData> ListGSD = new List<GetSummerLocationData>();
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
                        GetSummerLocationData GSD = new GetSummerLocationData();
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


        //api for bind city
        [HttpPost]
        [Route("BindCity")]
        public string BindCity([FromBody] GetSummerCityData1 data)
        {
            GetSummerCityResponse GSR = new GetSummerCityResponse();
            List<GetSummerCityData> ListGSD = new List<GetSummerCityData>();
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
                        GetSummerCityData GSD = new GetSummerCityData();
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




        //API for bind University
        [HttpPost]
        [Route("BindUniversity")]
        public string BindUniversity([FromBody] GetSummerUniversityData1 data)
        {
            GetSummerUniversityResponse GSR = new GetSummerUniversityResponse();
            List<GetSummerUniversityData> ListGSD = new List<GetSummerUniversityData>();
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
                        GetSummerUniversityData GSD = new GetSummerUniversityData();
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



        //Bind Topic

        [HttpGet]
        [Route("BindTopic")]
        public string BindTopic()
        {
            DataSet ds = new DataSet();
            string json = "";
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindSummerSchoolTopic", con);
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

        //save summer school data

        [HttpPost]
        [Route("SaveSummerSchool")]
        public string SaveSummerSchool([FromBody] Summerschoolparam obj)
        {


            List<string> Androidtokens = new List<string>();
            List<string> Iostokens = new List<string>();
            string json = "";
            string result = "";
            string qry = "";
            int maxid = 0;
            DataSet ds = new DataSet();
            DataSet ds1 = new DataSet();
            Summerschoolparam objss = new Summerschoolparam();
            char[] spearator = { ',', ' ' };


            string[] intrestlist = obj.repositoryid.Split(spearator,
               StringSplitOptions.RemoveEmptyEntries);
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Savesummerschool", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                
                cmd.Parameters.AddWithValue("school_id", obj.schoolid);
                cmd.Parameters.AddWithValue("repository_id", obj.repositoryid);
                cmd.Parameters.AddWithValue("country_id", obj.countryid);
                cmd.Parameters.AddWithValue("location", obj.location);
                cmd.Parameters.AddWithValue("cityid_d", obj.cityid);
                cmd.Parameters.AddWithValue("univercity", obj.univercity);
                cmd.Parameters.AddWithValue("ID", obj.ID);
                cmd.Parameters.AddWithValue("description", obj.description);
                cmd.Parameters.AddWithValue("currency_d", obj.currency);
                cmd.Parameters.AddWithValue("fees", obj.fees);
                cmd.Parameters.AddWithValue("duration", obj.duration);
                cmd.Parameters.AddWithValue("link", obj.link);
                cmd.Parameters.AddWithValue("applicationlink", obj.applicationlink);

                cmd.Parameters.AddWithValue("startdate_d", obj.startdate);
                cmd.Parameters.AddWithValue("enddate_d", obj.enddate);

                cmd.Parameters.AddWithValue("created_by", obj.createdby);
                cmd.Parameters.AddWithValue("updated_by", obj.updatedby);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
               // cmd.ExecuteScalar();

                result = cmd.Parameters["message"].Value.ToString();

                try
                {
                    if (intrestlist.Length > 0)
                    {

                        qry = "SELECT MAX(schoolid) as sam_id FROM tbl_summerschooldetail";

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

                if (intrestlist.Length > 0)
                {
                    Execqry("delete from tbl_sampleschoolintrest where schoolid=" + maxid);
                    for (int i = 0; i < intrestlist.Length; i++)
                    {

                        Execqry("insert into tbl_sampleschoolintrest(schoolid,intrestid)values(" + maxid + ", " + Convert.ToInt32(intrestlist[i]) + ")");
                    }

                }



                try{
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
                                Androidtokens.Add(Convert.ToString(item["LoginKey"]));
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

                        //if (Iostokens.Count > 0)
                        //{
                        //    FirePushnotificationIOS(NotifyId, Mid, app_notifytype, pushTitle, Iostokens, body);
                        //}


                    }
                }
                catch(Exception ex)
                {
                    string msg = ex.Message;
                }




                con.Close();
                objss.Status = true;
                objss.Message = result;
            }
            catch (Exception e)
            {
                objss.Status = false;
                objss.Message = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(objss, settings);
            return json;
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

        // For Getting Saved Summer school Detail
        [HttpGet]
        [Route("getSummerSchoolData")]
        public string getSummerSchoolData([FromHeader] Summerschoolparam obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            Summerschoolparam objss = new Summerschoolparam();
            List<GetSavedTopicData> ListGSTD = new List<GetSavedTopicData>();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getsummerschooldata", con);
                cmd.CommandType = CommandType.StoredProcedure;              
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        GetSavedTopicData ObjGSTD = new GetSavedTopicData();
                        ObjGSTD.schoolid = Convert.ToInt32(row["ID"]);
                        //ObjGSTD.repositoryname = Convert.ToString(row["repositoryname"]);
                        if (Convert.ToString(row["repositoryid"]) == null || Convert.ToString(row["repositoryid"]) == "")
                        {
                            ObjGSTD.repositoryid = "";
                        }
                        else
                        {
                            ObjGSTD.repositoryid = Convert.ToString(row["repositoryid"]);
                        }
                       
                        ObjGSTD.countryname = Convert.ToString(row["countryname"]);
                        ObjGSTD.location = Convert.ToString(row["location"]);
                        ObjGSTD.cityname = Convert.ToString(row["cityname"]);
                        ObjGSTD.univercityname = Convert.ToString(row["univercity"]);
                        ObjGSTD.topic = Convert.ToString(row["topic"]);
                        ObjGSTD.description = Convert.ToString(row["description"]);
                        ObjGSTD.fees = Convert.ToString(row["fees"]);
                        ObjGSTD.duration = Convert.ToString(row["duration"]);
                        ObjGSTD.link = Convert.ToString(row["link"]);
                        ObjGSTD.applicationlink = Convert.ToString(row["applicationlink"]);

                        ObjGSTD.startdate = Convert.ToString(row["startdate"]);
                        ObjGSTD.enddate = Convert.ToString(row["enddate"]);

                        ObjGSTD.link = GetYouTubeId(Convert.ToString(row["link"]));
                        //ObjGSTD.link = "https://www.youtube.com/embed/"+ObjGSTD.link;
                       
                        ListGSTD.Add(ObjGSTD);



                    }
                    objss.data = ListGSTD;


                }
                else
                {
                  
                }
            }
            catch (Exception e)
            {
                string msg = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(objss, settings);
            return json;
        }

        //api for get video id
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


        //EditWebinar
        [HttpGet]
        [Route("EditSummerSchoolData")]
        public string EditSummerSchoolData([FromHeader] EditSummerSchoolResponse data)
        {
            DataSet ds = new DataSet();
            EditSummerSchoolResponse ESSR = new EditSummerSchoolResponse();
            string json = "";
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("editsummerschooldata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("school_id", data.schoolid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();

                if (ds.Tables[0].Rows.Count > 0)
                {
                    ESSR.schoolid = Convert.ToInt32(ds.Tables[0].Rows[0]["ID"]);

                    if(Convert.ToString(ds.Tables[0].Rows[0]["repositoryid"]) ==null || Convert.ToString(ds.Tables[0].Rows[0]["repositoryid"]) == "")
                    {
                        ESSR.repositoryid = "";
                    }
                    else
                    {
                        ESSR.repositoryid = Convert.ToString(ds.Tables[0].Rows[0]["repositoryid"]);
                    }
                    if(Convert.ToString(ds.Tables[0].Rows[0]["repositoryname"])== null || Convert.ToString(ds.Tables[0].Rows[0]["repositoryname"]) == "")
                    {
                        ESSR.repositoryname = "";
                    }
                    else
                    {
                        ESSR.repositoryname = Convert.ToString(ds.Tables[0].Rows[0]["repositoryname"]);
                    }

                    
                   
                    ESSR.countryid = Convert.ToInt32(ds.Tables[0].Rows[0]["countryid"]);
                    ESSR.countryname = Convert.ToString(ds.Tables[0].Rows[0]["countryname"]);
                    ESSR.location = Convert.ToInt32(ds.Tables[0].Rows[0]["locationid"]);
                    ESSR.locationname = Convert.ToString(ds.Tables[0].Rows[0]["location"]);

                    ESSR.cityid = Convert.ToInt32(ds.Tables[0].Rows[0]["cityid"]);
                    ESSR.cityname = Convert.ToString(ds.Tables[0].Rows[0]["cityname"]);

                    ESSR.currencyid = Convert.ToInt32(ds.Tables[0].Rows[0]["currencyid"]);
                    ESSR.symbol = Convert.ToString(ds.Tables[0].Rows[0]["symbol"]);


                    ESSR.univercityname = Convert.ToInt32(ds.Tables[0].Rows[0]["universityid"]);
                    ESSR.univ = Convert.ToString(ds.Tables[0].Rows[0]["univercity"]);
                    ESSR.topicid = Convert.ToInt32(ds.Tables[0].Rows[0]["topicid"]);
                    ESSR.topic = Convert.ToString(ds.Tables[0].Rows[0]["topic"]);
                    ESSR.description = Convert.ToString(ds.Tables[0].Rows[0]["description"]);
                    ESSR.fees = Convert.ToString(ds.Tables[0].Rows[0]["fees"]);
                    ESSR.duration = Convert.ToString(ds.Tables[0].Rows[0]["duration"]);
                    ESSR.link = Convert.ToString(ds.Tables[0].Rows[0]["link"]);

                    ESSR.applicationlink = Convert.ToString(ds.Tables[0].Rows[0]["applicationlink"]);

                    ESSR.startdate = Convert.ToString(ds.Tables[0].Rows[0]["startdate"]);
                    ESSR.enddate = Convert.ToString(ds.Tables[0].Rows[0]["enddate"]);


                    ESSR.Status = true;
                    ESSR.Message = "Data found";
                }
                else
                {
                    ESSR.Status = false;
                    ESSR.Message = "Something went wrong";

                }


            }
            catch (Exception ex)
            {
                ESSR.Status = false;
                ESSR.Message = ex.Message;

            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(ESSR, settings);
            return json;
        }

        //save summer school data

        [HttpPost]
        [Route("UpdateSummerSchool")]
        public string UpdateSummerSchool([FromBody] Summerschoolparam obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            Summerschoolparam objss = new Summerschoolparam();
            char[] spearator = { ',', ' ' };


            string[] countrylist = obj.repositoryid.Split(spearator,
               StringSplitOptions.RemoveEmptyEntries);



            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Updatesummerschool", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("school_id", obj.schoolid);
                cmd.Parameters.AddWithValue("repository_id", obj.repositoryid);
                cmd.Parameters.AddWithValue("country_id", obj.countryid);
                cmd.Parameters.AddWithValue("location_d", obj.location);
                cmd.Parameters.AddWithValue("cityid_d", obj.cityid);
                cmd.Parameters.AddWithValue("univercity_d", obj.univercity);
                cmd.Parameters.AddWithValue("ID_d", obj.ID);
                cmd.Parameters.AddWithValue("description_d", obj.description);
                cmd.Parameters.AddWithValue("fees_d", obj.fees);
                cmd.Parameters.AddWithValue("duration_d", obj.duration);
                cmd.Parameters.AddWithValue("link_d", obj.link);
                cmd.Parameters.AddWithValue("applicationlink_d", obj.applicationlink);

                cmd.Parameters.AddWithValue("currency_d", obj.currency);
                cmd.Parameters.AddWithValue("startdate_d", obj.startdate);
                cmd.Parameters.AddWithValue("enddate_d", obj.enddate);

                cmd.Parameters.AddWithValue("created_by", obj.createdby);
                cmd.Parameters.AddWithValue("updated_by", obj.updatedby);
                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();

                if (countrylist.Length > 0)
                {
                    Execqry("delete from tbl_sampleschoolintrest where schoolid=" + obj.schoolid);
                    for (int i = 0; i < countrylist.Length; i++)
                    {

                        Execqry("insert into tbl_sampleschoolintrest(schoolid,intrestid)values(" + obj.schoolid + ", " + Convert.ToInt32(countrylist[i]) + ")");
                    }

                }


                con.Close();
                objss.Status = true;
                objss.Message = result;
            }
            catch (Exception e)
            {
                objss.Status = false;
                objss.Message = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(objss, settings);
            return json;
        }
        //delete Webinar Data
        [HttpPost]
        [Route("deletesummerschool")]
        public string deletesummerschool([FromBody] DeleteSummer data)
        {

            DeleteSummer delsum = new DeleteSummer();
            DataSet ds = new DataSet();
            string json = "";
            string result = "";
            if (data == null)
            {

                delsum.Status = false;
                delsum.Message = "Something went wrong";
            }
            else
            {
                try
                {
                    delsum.Status = true;
                    MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                    MySqlCommand cmd = new MySqlCommand("deletesummerschool", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("message", "");
                    cmd.Parameters["message"].Direction = ParameterDirection.Output;
                    cmd.Parameters.AddWithValue("school_id", data.schoolid);
                    

                    con.Open();
                    cmd.ExecuteScalar();
                    result = cmd.Parameters["message"].Value.ToString();
                    con.Close();
                    delsum.Message = result;

                }
                catch (Exception e)
                {
                    delsum.Status = false;
                    delsum.Message = e.Message;

                }
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(delsum, settings);
            return json;
        }





    }




    //class for summer school
    public class GetIntreasArea
        {
            public Int32 repositoryid { get; set; }
            public string repositoryname { get; set; }
        }

        public class Summerschoolparam
        {
           
            public Int32 schoolid { get; set; }
            public string repositoryid { get; set; }
            public Int32 countryid { get; set; }
            public string location { get; set; }
        public string cityid { get; set; }
        public string currency { get; set; }
        public string univercity { get; set; }
            public Int32 ID { get; set; } 
            public string description { get; set; }
            public string fees { get; set; }
            public string duration { get; set; }
            public string link { get; set; }
        public string applicationlink { get; set; }

        public string startdate { get; set; } = "";

        public string enddate { get; set; } = "";
        public Int32 isactive { get; set; }
            public Int32 createdby { get; set; }
            public Int32 updatedby { get; set; }
            public string Message { get; set; } = "";
            public Boolean Status { get; set; }
            public List<GetSavedTopicData> data { get; set; }

        }
        public class GetSavedTopicData
        {
            public Int32 schoolid { get; set; }
        public string repositoryid { get; set; }
        public string repositoryname { get; set; }
            public string countryname { get; set; }
            public string location { get; set; }
        public string cityname { get; set; }
        public string univercityname { get; set; }
            public string topic { get; set; }
            public string description { get; set; }
            public string fees { get; set; }
            public string duration { get; set; }
            public string link { get; set; }
        public string applicationlink { get; set; }

        public string startdate { get; set; }
        public string enddate { get; set; }
    }
    public class EditSummerSchoolResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public Int32 schoolid { get; set; }
        public string repositoryid { get; set; }
        public string repositoryname { get; set; }
        public Int32 countryid { get; set; }
        public string countryname { get; set; }
        public Int32 location { get; set; }
        public Int32 univercityname { get; set; }
        public Int32 topicid { get; set; }
        public string topic { get; set; }
        public string description { get; set; }
        public string fees { get; set; }
        public string duration { get; set; }
        public string link { get; set; }
        public string applicationlink { get; set; }

        public string startdate { get; set; }
        public string enddate { get; set; }
        public string locationname { get; set; }
        public string univ { get; set; }
        public Int32 currencyid { get; set; }
        public string symbol { get; set; }

        public Int32 cityid { get; set; }
        public string cityname { get; set; }


    }
    public class DeleteSummer
    {
   
        public Int32 schoolid { get; set; }
        public bool Status { get; set; }
        public string Message { get; set; }

    }

    public class GetSummerLocationResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetSummerLocationData> data { get; set; }
    }
    public class GetSummerLocationData
    {
       
        public string location { get; set; }
        public Int32 locationid { get; set; }
    }


    public class GetSummerCityResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetSummerCityData> data { get; set; }
    }
    public class GetSummerCityData
    {

        public int cityid { get; set; }
        public string cityname { get; set; }
    }


    public class GetSummerLocationData1
    {
        public Int32 countryid { get; set; }
       
    }
    public class GetDateDiff
    {
        public string startdate { get; set; }
        public string enddate { get; set; }

    }
    public class GetSummerCityData1
    {
        public Int32 countryid { get; set; }
        public Int32 locationid { get; set; }

    }


    public class GetSummerUniversityResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetSummerUniversityData> data { get; set; }
    }
    public class GetSummerUniversityData
    {
        
        public Int32 universityid { get; set; }
        public string universityname { get; set; }
       
    }
    public class GetSummerUniversityData1
    {
        public Int32 countryid { get; set; }
       
        public Int32 locationid { get; set; }
        public Int32 cityid { get; set; }
    }
    public class ExcellSchoolData_summerschool
    {
        public List<SchoolData_summerschool> schoolDatas { get; set; }
    }
    public class SchoolData_summerschool
    {
        public string country { get; set; }
        public string state { get; set; }
        public string city { get; set; }
        public string university { get; set; }
        public string topic { get; set; }
        public string link { get; set; }
        public string applicationlink { get; set; }
        public string currency { get; set; }
        public string fees { get; set; }
        public string description { get; set; }
        public string duration { get; set; }
        public string interest { get; set; }
    }
    public class AddGroupClass_summerschool
    {
        public bool Status { get; set; }
        public string Message { get; set; }


    }

}

