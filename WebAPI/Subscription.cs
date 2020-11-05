using System;
using System.Collections.Generic;
using System.Data;
//using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using MySql.Data.MySqlClient;
using Microsoft.AspNetCore.Authorization;
using System.Net;
using System.Text;
using System.IO;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CareerPrabhu.WebAPI
{
    //[Authorize]
    [Route("api/Subscription")]
    public class Subscription : Controller
    {
        IConfiguration _iconfiguration;
        public Subscription(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
        }

        [HttpGet]
        [Route("getstudentfilter")]
        public string GetStudentFilters([FromHeader] GetStudentFilterData data)
        {

            MultiCheckBoxFilterDataForStudent mcf = new MultiCheckBoxFilterDataForStudent();
            List<StudentFilterData> school = new List<StudentFilterData>();
            DataSet ds = new DataSet();
            string json = "";
            string qry = "";
            string StateId = data.StateId == null ? "" : data.StateId;
            string CityId = data.CityId == null ? "" : data.CityId;
            string SchoolId = data.SchoolId == null ? "" : data.SchoolId;
            string ClassId = data.ClassId == null ? "" : data.ClassId;
            string StreamId = data.StreamId == null ? "" : data.StreamId;


            try
            {
                if (SchoolId != "" && (ClassId == null ? "" : ClassId) == "")
                {
                    qry = "SELECT stu_portal_id,stu_name FROM tbl_studentportal WHERE 1 = 1 AND schooltypeid=1 and school_id IN(" + SchoolId + ")";
                }
                if (SchoolId == "" && (ClassId == null ? "" : ClassId) != "")
                {
                    qry = "SELECT stu_portal_id,stu_name FROM tbl_studentportal WHERE 1 = 1 AND schooltypeid=1 and stu_class IN(" + ClassId + ")";
                }

                if (SchoolId != "" && ClassId != "" && StreamId != "")
                {

                    qry = "SELECT stu_portal_id,stu_name FROM tbl_studentportal WHERE 1 = 1 AND schooltypeid=1 and school_id IN(" + SchoolId + ") AND" +
                                                                                         " stu_class IN(" + ClassId + ") and" + "stream_id(" + StreamId + ")";
                }
                if (SchoolId == "" && ClassId == "" && StreamId == "")
                {
                    qry = "SELECT stu_portal_id,stu_name FROM tbl_studentportal WHERE 1 = 1 AND schooltypeid=1";

                }
                else
                {
                    qry = "SELECT stu_portal_id,stu_name FROM tbl_studentportal WHERE 1 = 1 AND schooltypeid=1";
                }




                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand(qry, con);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();

                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        StudentFilterData fdc = new StudentFilterData();
                        fdc.studentid = Convert.ToInt32(row["stu_portal_id"]);
                        fdc.studentname = row["stu_name"].ToString();
                        school.Add(fdc);
                    }

                    mcf.Status = true;
                    mcf.Message = "Data found";
                    mcf.schooldata = school;

                }
            }
            catch (Exception e)
            {
                mcf.Status = false;
                mcf.Message = e.Message;

            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(mcf, settings);
            return json;
        }






        //This API For Save Subscription details
        [HttpPost]
        [Route("SaveSubscription")]
        public string SaveSubscriptionData([FromBody] GetSubscriptionData data)
        {
            List<string> Androidtokens = new List<string>();
            List<string> Iostokens = new List<string>();

            SubscriptionResponse Sr = new SubscriptionResponse();
            SubscriptionData Sd = new SubscriptionData();
            DataSet ds = new DataSet();
            string json = "";
            string result = "";
            if (data == null)
            {
                json = "Something went wrong";
                Sr.Status = false;
                Sr.Message = "Something went wrong";
            }
            else
            {
                try
                {
                    MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                    MySqlCommand cmd = new MySqlCommand("SubscriptionManager", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("message", "");
                    cmd.Parameters["@Message"].Direction = ParameterDirection.Output;
                    cmd.Parameters.AddWithValue("acttype", data.acttype);
                    cmd.Parameters.AddWithValue("stateid", data.StateId);
                    cmd.Parameters.AddWithValue("cityid", data.CityId);
                    cmd.Parameters.AddWithValue("SchoolId", data.SchoolId);
                    cmd.Parameters.AddWithValue("isschool", data.IsSchool);
                    cmd.Parameters.AddWithValue("isparent", data.IsParent);
                    cmd.Parameters.AddWithValue("isstudent", data.IsStudents);
                    cmd.Parameters.AddWithValue("classid", data.ClassId);
                    cmd.Parameters.AddWithValue("stream", data.StreamId);
                    cmd.Parameters.AddWithValue("studentid", data.StudentId);
                    cmd.Parameters.AddWithValue("usermessage", data.Message);
                    cmd.Parameters.AddWithValue("testimonial_d", data.testimonials);

                    cmd.Parameters.AddWithValue("startdate_d", data.startdate);
                    cmd.Parameters.AddWithValue("enddate_d", data.enddate);
                    cmd.Parameters.AddWithValue("starttime_d", data.starttime);
                    cmd.Parameters.AddWithValue("endtime_d", data.endtime);


                    cmd.Parameters.AddWithValue("createdby", data.createdBy);
                    con.Open();

                    MySqlDataAdapter da = new MySqlDataAdapter();
                    da.SelectCommand = cmd;
                    da.Fill(ds);


                    //cmd.ExecuteScalar();
                    result = cmd.Parameters["message"].Value.ToString();
                    con.Close();





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










                    Sr.Status = true;
                    Sr.Message = result;

                }
                catch (Exception e)
                {
                    Sr.Status = false;
                    Sr.Message = e.Message;

                }
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(Sr, settings);
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



        [HttpGet]
        [Route("GetData")]
        public string GetData()
        {
            string json = "";
            DataSet ds = new DataSet();
            GetData_ForBindResponse objClass = new GetData_ForBindResponse();
            List<GetData_ForBindState> objResponsestate = new List<GetData_ForBindState>();
            List<GetData_ForBindCity> objResponsecity = new List<GetData_ForBindCity>();
            List<GetData_ForBindSchool> objResponseschool = new List<GetData_ForBindSchool>();
            List<GetData_ForBindStudent> objResponsestudent = new List<GetData_ForBindStudent>();
            List<GetData_ForBindClass> objResponseclass = new List<GetData_ForBindClass>();

            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getDataForBind", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();


                if (ds.Tables[0].Rows.Count > 0)
                {
                    objClass.status = true;
                    objClass.message = "data found";
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        GetData_ForBindState state = new GetData_ForBindState();
                        state.stateId = Convert.ToInt32(row["state_id"]);
                        state.statename = Convert.ToString(row["state_name"]);

                        objResponsestate.Add(state);
                    }
                    foreach (DataRow row in ds.Tables[1].Rows)
                    {
                        GetData_ForBindCity city = new GetData_ForBindCity();
                        city.cityid = Convert.ToInt32(row["city_id"]);
                        city.cityname = Convert.ToString(row["city_name"]);

                        objResponsecity.Add(city);
                    }
                    foreach (DataRow row in ds.Tables[2].Rows)
                    {
                        GetData_ForBindSchool school = new GetData_ForBindSchool();
                        school.schoolid = Convert.ToInt32(row["school_id"]);
                        school.schoolname = Convert.ToString(row["school_name"]);

                        objResponseschool.Add(school);
                    }
                    foreach (DataRow row in ds.Tables[3].Rows)
                    {
                        GetData_ForBindStudent student = new GetData_ForBindStudent();
                        student.studentid = Convert.ToInt32(row["stu_portal_id"]);
                        student.studentname = Convert.ToString(row["stu_name"]);

                        objResponsestudent.Add(student);
                    }
                    foreach (DataRow row in ds.Tables[4].Rows)
                    {
                        GetData_ForBindClass classobj = new GetData_ForBindClass();
                        classobj.classid = Convert.ToInt32(row["class_id"]);
                        classobj.classname = Convert.ToString(row["class_name"]);

                        objResponseclass.Add(classobj);
                    }
                  
                }
                else
                {
                    objClass.status = false;
                    objClass.message = "Something went wrong";
                }

                objClass.statedata = objResponsestate;
                objClass.citydata = objResponsecity;
                objClass.schooldata = objResponseschool;
                objClass.studentdata = objResponsestudent;
                objClass.classdata = objResponseclass;
            }
            catch (Exception ex)
            {
                objClass.status = false;
                objClass.message = ex.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(objClass, settings);
            return json;
        }


        [HttpGet]
        [Route("GetFilterData")]
        public string GetFilterDatas([FromHeader] FilterData data)
        {

            List<FilterDataClass> list = new List<FilterDataClass>();
            FilterDataResponse datares = new FilterDataResponse();
            DataSet ds = new DataSet();
            string json = "";


            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Subscription_GetFilterData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("Schoolid", Convert.ToInt32(data.School));
                cmd.Parameters.AddWithValue("ClassId", Convert.ToInt32(data.ClassId));
                cmd.Parameters.AddWithValue("Stream", data.Stream==null || data.Stream == "0"? "" : data.Stream);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();

                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        FilterDataClass fdc = new FilterDataClass();
                        fdc.studentid = Convert.ToInt32(row["stu_portal_id"]);
                        fdc.studentname = row["stu_name"].ToString();
                        list.Add(fdc);
                    }
                    datares.Status = true;
                    datares.Message = "Data found";
                    datares.classData = list;
                }


            }
            catch (Exception e)
            {
                datares.Status = false;
                datares.Message = e.Message;

            }

            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(datares, settings);
            return json;
        }


        [HttpGet]
        [Route("getcityfilter")]
        public string GetCityFilter([FromHeader] GetCityFilterData data)
        {

            MultiCheckBooxFilterDataForCity mcf = new MultiCheckBooxFilterDataForCity();
            List<CityFilterData> city = new List<CityFilterData>();
            DataSet ds = new DataSet();
            string json = "";
            string qry = "";
            string StateId = data.StateId;
            try
            {


                if (data.StateId != "" && data.StateId != null)
                {
                    qry = "select state_id,city_id,city_name from tbl_cities where 1=1 and statuscity=1 ";
                    qry = qry + " and tbl_cities.state_id in (" + StateId + ")";
                }
                else
                    qry = "select state_id,city_id,city_name from tbl_cities";

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand(qry, con);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();

                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        CityFilterData fdc = new CityFilterData();
                        fdc.cityid = Convert.ToInt32(row["city_id"]);
                        fdc.cityname = row["city_name"].ToString();
                        city.Add(fdc);
                    }

                    mcf.Status = true;
                    mcf.Message = "Data found";
                    mcf.citydata = city;


                }
            }
            catch (Exception e)
            {
                mcf.Status = false;
                mcf.Message = e.Message;

            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(mcf, settings);
            return json;
        }


        [HttpGet]
        [Route("getschoolfilter")]
        public string GetSchoolFilters([FromHeader] GetSchoolFilterData data)
        {

            MultiCheckBoxFilterDataForSchool mcf = new MultiCheckBoxFilterDataForSchool();
            List<SchoolFilterData> school = new List<SchoolFilterData>();
            DataSet ds = new DataSet();
            string json = "";
            string qry = "";
            string StateId = data.StateId == null ? "" : data.StateId;
            try
            {
                if (data.StateId != "" && (data.CityId == null ? "" : data.CityId) == "")
                {
                    qry = "SELECT school_id,school_name FROM tbl_schoolmaster WHERE 1 = 1 AND tbl_schoolmaster.type_id=1 and tbl_schoolmaster.school_state IN(" + StateId + ")";
                }
                if (data.StateId == "" && (data.CityId == null ? "" : data.CityId) != "")
                {
                    qry = "SELECT school_id,school_name FROM tbl_schoolmaster WHERE 1 = 1 AND tbl_schoolmaster.type_id=1 and tbl_schoolmaster.school_city IN(" + data.CityId + ")";
                }

                if (data.StateId != "" && (data.CityId == null ? "" : data.CityId) != "")
                {
                    
                       qry = "SELECT school_id,school_name FROM tbl_schoolmaster WHERE 1 = 1 AND tbl_schoolmaster.type_id=1 and tbl_schoolmaster.school_city IN(" + data.CityId + ") AND" +
                                                                                            " tbl_schoolmaster.school_state IN(" + StateId + ")";
                }
                if (data.StateId == "" && (data.CityId == null ? "" : data.CityId) == "")
                {
                    qry = "SELECT school_id,school_name FROM tbl_schoolmaster WHERE 1 = 1 and tbl_schoolmaster.type_id=1";

                }

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand(qry, con);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();

                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        SchoolFilterData fdc = new SchoolFilterData();
                        fdc.schoolid = Convert.ToInt32(row["school_id"]);
                        fdc.schoolname = row["school_name"].ToString();
                        school.Add(fdc);
                    }

                    mcf.Status = true;
                    mcf.Message = "Data found";
                    mcf.schooldata = school;

                }
            }
            catch (Exception e)
            {
                mcf.Status = false;
                mcf.Message = e.Message;

            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(mcf, settings);
            return json;
        }

        
        [HttpGet]
        [Route("getsubscriptiondata")]
        public string GetSubscription()
        {
            DataSet ds = new DataSet();
            string json = "";
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("GetSubscriptionData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();

            }
            catch (Exception ex)
            {
                json = ex.Message;

            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(ds.Tables[0], settings);
            return json;
        }

        [HttpGet]
        [Route("editsubscription")]
        public string EditSubscriptions([FromHeader] EditSubscriptionData data)
        {
            DataSet ds = new DataSet();
            EditSubscriptionDataResponse edr = new EditSubscriptionDataResponse();
            List<SubscriptionEditData> sd = new List<SubscriptionEditData>();
            string json = "";
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("EditSubscription", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("Subscription_Id",data.SubscriptionId);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();

                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach(DataRow row in ds.Tables[0].Rows)
                    {
                        SubscriptionEditData sed = new SubscriptionEditData();
                        sed.SubscriptionId = Convert.ToInt32(row["SubscriptionId"]);
                        sed.stateid = row["StateId"].ToString();
                        //sed.statename = row["statename"].ToString();
                        sed.cityid = row["CityId"].ToString();
                        //sed.cityname = row["cityname"].ToString();
                        sed.schoolid = row["SchoolId"].ToString();
                        //sed.schoolname = row["schoolname"].ToString();
                        sed.streamname = row["StreamId"].ToString();
                        sed.classid = Convert.ToInt32(row["ClassId"]);
                        //sed.classname = row["classname"].ToString();
                        sed.studentid = Convert.ToInt32(row["StuportalId"]);
                        //sed.studentname = row["studentname"].ToString();
                        sed.IsSchool = Convert.ToInt32(row["IsSchool"]);
                        sed.IsParent = Convert.ToInt32(row["IsParents"]);
                        sed.IsStudent = Convert.ToInt32(row["IsStudents"]);
                        sed.Message = row["Message"].ToString();
                        sed.startdate = Convert.ToString(ds.Tables[0].Rows[0]["startdate"]);
                        sed.enddate = Convert.ToString(ds.Tables[0].Rows[0]["enddate"]);
                        sed.starttime = Convert.ToString(ds.Tables[0].Rows[0]["starttime"]);
                        sed.endtime = Convert.ToString(ds.Tables[0].Rows[0]["endtime"]);
                        sed.testimonial = Convert.ToString(ds.Tables[0].Rows[0]["description"]);
                        sd.Add(sed);

                    }
                    edr.Status = true;
                    edr.Message = "Data found";
                    edr.data = sd;
                }
                else
                {
                    edr.Status = false;
                    edr.Message = "Something went wrong";

                }


            }
            catch (Exception ex)
            {
                edr.Status = false;
                edr.Message = ex.Message;
                
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(edr, settings);
            return json;
        }

        

        [HttpGet]
        [Route("deletesubscription")]
        public string DeleteSubscription([FromHeader] DeleteSubscriptionData data)
        {
            DeleteSubscriptionResponse DSR = new DeleteSubscriptionResponse();
            DataSet ds = new DataSet();
            string json = "";
            string result = "";
            if (data == null)
            {

                DSR.status = false;
                DSR.message = "Something went wrong";
            }
            else
            {
                try
                {
                    DSR.status = true;
                    DSR.message = "Data Found";
                    MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                    MySqlCommand cmd = new MySqlCommand("SubscriptionManager_Delete", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("Message", "");
                    cmd.Parameters["Message"].Direction = ParameterDirection.Output;
                    cmd.Parameters.AddWithValue("Subscription_Id", data.SubscriptionId);
                    cmd.Parameters.AddWithValue("deletedby", data.createdBy);
                    con.Open();
                    cmd.ExecuteScalar();
                    result = cmd.Parameters["Message"].Value.ToString();
                    con.Close();
                    DSR.message = result;

                }
                catch (Exception e)
                {
                    DSR.status = false;
                    DSR.message = e.Message;

                }
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(DSR, settings);
            return json;
    }

        [HttpPost]
        [Route("updatesubscription")]
        public string UpdateSubscription([FromBody] UpdatesubscriptionData data)
        {

            SubscriptionResponse Sr = new SubscriptionResponse();
            SubscriptionData Sd = new SubscriptionData();
            DataSet ds = new DataSet();
            string json = "";
            string result = "";
            if (data == null)
            {
                
                Sr.Status = false;
                Sr.Message = "Something went wrong";
            }
            else
            {
                try
                {
                    Sr.Status = true;
                    MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                    MySqlCommand cmd = new MySqlCommand("SubscriptionManager_Update", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("outmessage", "");
                    cmd.Parameters["outmessage"].Direction = ParameterDirection.Output;
                    cmd.Parameters.AddWithValue("Subscription_Id", data.SubscriptionId);
                    cmd.Parameters.AddWithValue("stateid", data.stateid);
                    cmd.Parameters.AddWithValue("cityid", data.cityid);
                    cmd.Parameters.AddWithValue("SchoolId", data.schoolid);
                    cmd.Parameters.AddWithValue("isschool", data.isschool);
                    cmd.Parameters.AddWithValue("isparent", data.isparent);
                    cmd.Parameters.AddWithValue("isstudent", data.isstudents);
                    cmd.Parameters.AddWithValue("classid", data.classid);
                    cmd.Parameters.AddWithValue("stream", data.streamid);
                    cmd.Parameters.AddWithValue("studentid", data.studentid);
                    cmd.Parameters.AddWithValue("usermessage", data.message);
                    cmd.Parameters.AddWithValue("createdby", data.createdBy);
                    cmd.Parameters.AddWithValue("startdate_d", data.startdate);
                    cmd.Parameters.AddWithValue("enddate_d", data.enddate);
                    cmd.Parameters.AddWithValue("starttime_d", data.starttime);
                    cmd.Parameters.AddWithValue("endtime_d", data.endtime);
                    cmd.Parameters.AddWithValue("testimonials_d", data.testimonials);
                    con.Open();
                    cmd.ExecuteScalar();
                    result = cmd.Parameters["outmessage"].Value.ToString();
                    con.Close();
                    Sr.Message = result;

                }
                catch (Exception e)
                {
                    Sr.Status = false;
                    Sr.Message = e.Message;

                }
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(Sr, settings);
            return json;
        }
    }


    //Classes For Getting Data from angular And get response from DB  
    public class GetSubscriptionData
    {
        public string acttype { get; set; } = "";
        public string StateId { get; set; } = "";
        public string CityId { get; set; } = "";
        public string SchoolId { get; set; } = "";
        public int ClassId { get; set; } = 0;
        public string StreamId { get; set; } = "";
        public int StudentId { get; set; } = 0;
        public string Message { get; set; } = "";
        public int IsParent { get; set; } = 0;
        public int IsStudents { get; set; } = 0;
        public int IsSchool { get; set; } = 0;
        public int createdBy { get; set; } = 0;
        public string startdate { get; set; }
        public string enddate { get; set; }
        public string starttime { get; set; }
        public string endtime { get; set; }
        public string testimonials { get; set; }

    }
    public class SubscriptionResponse
    {
        public bool Status { get; set; } = false;
        public string Message { get; set; } = "";

    }
    public class SubscriptionData
    {
        public int SubscriptionId { get; set; }
        public string StateName { get; set; }
        public string CityName { get; set; }
        public string SchoolName { get; set; }
        public string ClassName { get; set; }
        public string Stream { get; set; }
        public string StudentName { get; set; }
        public string Message { get; set; }
        public string startdate { get; set; }
        public string enddate { get; set; }
        public string starttime { get; set; }
        public string endtime { get; set; }

    }

    public class GetData_ForBindResponse
    {
        public bool status { get; set; } = false;
        public string message { get; set; } = "";
        public List<GetData_ForBindState> statedata { get; set; }
        public List<GetData_ForBindCity> citydata { get; set; }
        public List<GetData_ForBindSchool> schooldata { get; set; }
        public List<GetData_ForBindStudent> studentdata { get; set; }
        public List<GetData_ForBindClass> classdata { get; set; }
    }
    public class GetData_ForBindState
    {
        public int stateId { get; set; }
        public string statename { get; set; }
    }
    public class GetData_ForBindCity
    {
        public int cityid { get; set; }
        public string cityname { get; set; }
    }
    public class GetData_ForBindSchool
    {
        public int schoolid { get; set; }
        public string schoolname { get; set; }
    }
    public class GetData_ForBindStudent
    {
        public int studentid { get; set; }
        public string studentname { get; set; }
    }
    public class GetData_ForBindClass
    {
        public int classid { get; set; }
        public string classname { get; set; }
    }

    public class FilterData
    {
        public int ClassId { get; set; } = 0;
        public int School { get; set; } = 0;
        public string Stream { get; set; } = "";
    }

    public class FilterDataResponse
    {
        public Boolean Status { get; set; } = false;
        public string Message { get; set; } = "";
        public List<FilterDataClass> classData { get; set; }
    }
    public class FilterDataClass
    {
        public int studentid { get; set; } = 0;
        public string studentname { get; set; } = "";
    }
    public class GetCityFilterData
    {
        public string StateId { get; set; } = "";

    }
    public class GetSchoolFilterData
    {
        public string StateId { get; set; } = "";
        public string CityId { get; set; } = "";
    }
    public class CityFilterData
    {
        public int cityid { get; set; } = 0;
        public string cityname { get; set; } = "";
    }
    public class SchoolFilterData
    {
        public int schoolid { get; set; } = 0;
        public string schoolname { get; set; } = "";
    }
    public class MultiCheckBooxFilterDataForCity
    {
        public bool Status { get; set; } = false;
        public string Message { get; set; } = "";
        public List<CityFilterData> citydata { get; set; }

    }
    public class MultiCheckBoxFilterDataForSchool
    {
        public bool Status { get; set; } = false;
        public string Message { get; set; } = "";
        public List<SchoolFilterData> schooldata { get; set; }
    }

    public class EditSubscriptionData
    {
        public int SubscriptionId { get; set; }
    }
    public class EditSubscriptionDataResponse
    {
        public bool Status { get; set; } = false;
        public string Message { get; set; } = "";
        public List<SubscriptionEditData> data { get; set; }
    }
    public class SubscriptionEditData
    {
        public int SubscriptionId { get; set; }
        public string stateid { get; set; }
        public string statename { get; set; }
        public string cityid { get; set; }
        public string cityname { get; set; }
        public string schoolid { get; set; }
        public string schoolname { get; set; }
        public string streamname { get; set; }
        public int classid { get; set; }
        public string classname { get; set; }
        public int studentid { get; set; }
        public string studentname { get; set; }
        public int IsSchool { get; set; }
        public int IsParent { get; set; }
        public int IsStudent { get; set; }
        public string Message { get; set;}
        public string startdate { get; set; }
        public string enddate { get; set; }
        public string starttime { get; set; }
        public string endtime { get; set; }
        public string testimonial { get; set; }
    }

    public class  UpdatesubscriptionData
    {
        public string acttype { get; set; } = "";
        public int SubscriptionId { get; set; }
        public string stateid { get; set; } = "";
        public string cityid { get; set; } = "";
        public string schoolid { get; set; } = "";
        public int classid { get; set; } = 0;
        public string streamid { get; set; } = "";
        public int studentid { get; set; } = 0;
        public string message { get; set; } = "";
        public int isparent { get; set; } = 0;
        public int isstudents { get; set; } = 0;
        public int isschool { get; set; } = 0;
        public int createdBy { get; set; } = 0;

        public string startdate { get; set; }
        public string enddate { get; set; } 
        public string starttime { get; set; } 
        public string endtime { get; set; }
        public string testimonials { get; set; }
    }
    public class DeleteSubscriptionResponse
    {
        public bool status { get; set; } = false;
        public string message { get; set; } = "";
    }
    public class DeleteSubscriptionData
    {
        public int SubscriptionId { get; set; }
        public int createdBy { get; set; } = 0;
    }
    public class GetStudentFilterData
    {
        public string StateId { get; set; } = "";
        public string CityId { get; set; } = "";
        public string SchoolId { get; set; } = "";
        public string ClassId { get; set; } = "";
        public string StreamId { get; set; } = "";



    }
    public class MultiCheckBoxFilterDataForStudent
    {
        public bool Status { get; set; } = false;
        public string Message { get; set; } = "";
        public List<StudentFilterData> schooldata { get; set; }
    }

    public class StudentFilterData
    {
        public int studentid { get; set; } = 0;
        public string studentname { get; set; } = "";
    }

}
