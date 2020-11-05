using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CareerPrabhu.WebAPI
{
    [Route("api/addstudentpartner")]
    public class addstudentpartner : Controller
    {
        IConfiguration _iconfiguration;
        public addstudentpartner(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
        }


        [HttpPost]
        [Route("BindCareer")]
        public string BindCareer()
        {
            GetStudentCareerResponses GSR = new GetStudentCareerResponses();
            List<GetStudentCareerData> ListGSD = new List<GetStudentCareerData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindCareerListingReport", con);
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
                        GetStudentCareerData GSD = new GetStudentCareerData();
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



        [HttpPost]
        [Route("BindStudent")]
        public string BindStudent([FromBody] GetStudentData data)
        {
            GetStudentResponse GSR = new GetStudentResponse();
            List<GetStudentData> ListGSD = new List<GetStudentData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindStudentReport", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("stateid_d", data.stateid);
                cmd.Parameters.AddWithValue("cityid_d", data.cityid);
                cmd.Parameters.AddWithValue("schoolid_d", data.schoolid);
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
                        GetStudentData GSD = new GetStudentData();
                        GSD.studentname = Convert.ToString(row["studentname"]);
                        GSD.studentid = Convert.ToInt32(row["studentid"]);
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
        [Route("Bindclass")]
        public string Bindclass()
        {
            GetStudentClassResponses GSR = new GetStudentClassResponses();
            List<GetStudentClassData> ListGSD = new List<GetStudentClassData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("bindprepclass", con);
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
                        GetStudentClassData GSD = new GetStudentClassData();
                        GSD.classid = Convert.ToInt32(row["class_id"]);
                        GSD.classname = Convert.ToString(row["class_name"]);
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
        [Route("BindStream")]
        public string BindStream()
        {
            GetStudentStreamResponses GSR = new GetStudentStreamResponses();
            List<GetStudentStreamData> ListGSD = new List<GetStudentStreamData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("bindstream", con);
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
                        GetStudentStreamData GSD = new GetStudentStreamData();
                        GSD.streamid = Convert.ToInt32(row["Stream_Id"]);
                        GSD.streamname = Convert.ToString(row["Stream_Name"]);
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
        [Route("SaveStudent")]
        [Obsolete]
        public string SaveStudent([FromForm] string studentid,
          [FromForm] string studentname, string stateid, [FromForm] string cityid, [FromForm] string schoolid, [FromForm] string classid, [FromForm] string streamid,
           [FromForm] string email, [FromForm] string mobileno, [FromForm] string fathersname,
           [FromForm] string parentemail, [FromForm] string parentmobileno, [FromForm] string createdby)

        {
            string json = "";
            string result = "";
            string mobiles = "";
            DataSet ds = new DataSet();
            SavestudentResponse ObjAMR = new SavestudentResponse();
            SavestudentData objAmp = new SavestudentData();

            objAmp.studentid = Convert.ToInt32(studentid);
            objAmp.studentname = Convert.ToString(studentname);
            objAmp.stateid = Convert.ToInt32(stateid);
            objAmp.cityid = Convert.ToInt32(cityid);
            objAmp.schoolid = Convert.ToInt32(schoolid);
            objAmp.classid = Convert.ToInt32(classid);
            objAmp.streamid = Convert.ToInt32(streamid);
            objAmp.email = Convert.ToString(email);

            objAmp.mobileno = Convert.ToString(mobileno);

            objAmp.fathersname = Convert.ToString(fathersname);
            objAmp.parentemail = Convert.ToString(parentemail);

            objAmp.parentmobileno = Convert.ToString(parentmobileno);

            objAmp.createdby = Convert.ToInt32(createdby);
            string pwd = objAmp.email.Substring(0, 2) + Guid.NewGuid().ToString().Substring(0, 4);


            try
            {


                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Saveaddstudent", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("studentid_d", objAmp.studentid);
                cmd.Parameters.AddWithValue("studentname_d", objAmp.studentname);

                cmd.Parameters.AddWithValue("stateid_d", objAmp.stateid);
                cmd.Parameters.AddWithValue("cityid_d", objAmp.cityid);
                cmd.Parameters.AddWithValue("schoolid_d", objAmp.schoolid);
                cmd.Parameters.AddWithValue("classid_d", objAmp.classid);

                cmd.Parameters.AddWithValue("streamid_d", objAmp.streamid);
                cmd.Parameters.AddWithValue("email_d", objAmp.email);

                cmd.Parameters.AddWithValue("mobileno_d", objAmp.mobileno);
                cmd.Parameters.AddWithValue("pwd_d", pwd);

                cmd.Parameters.AddWithValue("fathersname_d", objAmp.fathersname);
                cmd.Parameters.AddWithValue("parentemail_d", objAmp.parentemail);
                cmd.Parameters.AddWithValue("parentmobileno_d", objAmp.parentmobileno);
                cmd.Parameters.AddWithValue("created_by", objAmp.createdby);
                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();
                con.Close();
                ObjAMR.Status = true;
                ObjAMR.Message = result;


                if (result == "Successfully Saved")
                {

                    DataSet ds1 = new DataSet();
                    try
                    {
                        MySqlCommand cmd1 = new MySqlCommand("GetEmailSms_career", con);
                        cmd1.CommandType = CommandType.StoredProcedure;

                        con.Open();
                        MySqlDataAdapter da1 = new MySqlDataAdapter();
                        da1.SelectCommand = cmd1;
                        da1.Fill(ds1);
                        con.Close();
                        string _Message = ds1.Tables[0].Rows[0]["careerstudentregister"].ToString();
                        string _Message1 = ds1.Tables[0].Rows[0]["email"].ToString();
                        string _sms = ds1.Tables[0].Rows[0]["sms"].ToString();
                        if (objAmp.email != "")
                        {
                            MySqlCommand cmd2 = new MySqlCommand("UpdateEmailStatus", con);
                            cmd1.CommandType = CommandType.StoredProcedure;
                            cmd1.Parameters.AddWithValue("email", objAmp.email);

                            con.Open();
                            MySqlDataAdapter da2 = new MySqlDataAdapter();
                            da2.SelectCommand = cmd2;

                            con.Close();
                            _Message = _Message.Replace("@candidatename", objAmp.studentname);
                            _Message = _Message.Replace("@username", objAmp.email);
                            _Message = _Message.Replace("@password", pwd);


                            SendMail("CareerPrabhu Student Portal Login", objAmp.email, "", _Message);


                            //SendMail("CareerPrabhu Student Portal Login", parentemail, "", _Message1);
                            _sms = _sms.Replace("@username", objAmp.email);
                            _sms = _sms.Replace("@pwd", pwd);


                            if (objAmp.mobileno.Length >= 1)
                            {
                                if (objAmp.mobileno != "")
                                {
                                    mobiles += "," + objAmp.mobileno + "";
                                }
                                if (objAmp.mobileno != "")
                                {
                                    mobiles += "," + objAmp.mobileno + "";
                                }
                                SendSMS(mobiles, _sms);
                            }
                        }
                    }
                    catch (Exception e)
                    {
                        string mmm = e.Message;
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
            return json;
        }



        [Obsolete]
        private void SendMail(string _Subject, string _CC, string _BCC, string _Messages)
        {
            DataSet ds = new DataSet();
            string from = "contact.wonderskool@gmail.com";
            //string from = "sumantabag19@gmail.com";
            string Error = "";
            MailMessage mail = new MailMessage();
            mail.To.Add(_CC);
            mail.From = new MailAddress(from, "CareerPrabhu", System.Text.Encoding.UTF8);
            mail.Subject = _Subject;
            mail.SubjectEncoding = System.Text.Encoding.UTF8;
            mail.Body = _Messages;
            mail.BodyEncoding = System.Text.Encoding.UTF8;
            mail.IsBodyHtml = true;
            mail.Priority = MailPriority.High;
            SmtpClient client = new SmtpClient();
            //client.Host = "124.247.226.44";
            //124.247.226.44,6434
            client.Host = "smtp.gmail.com";
            //client.Port = 25;
            client.EnableSsl = true;
            client.Credentials = new System.Net.NetworkCredential("contact.wonderskool@gmail.com", "ws@edu@contact");
            //client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.Port = 587; // Gmail works on this port
                               //client.Port = 9025;
                               //  client.EnableSsl = true; //Gmail works on Server Secured Layer
            try
            {
                client.Send(mail);
            }
            catch (Exception ex)
            {
                Error = ex.Message;
            }

        }



        private void SendSMS(string mobileno, string msg)
        {
            try
            {
                string url = "";
                DataSet dsurl = new DataSet();
                emailsending email = new emailsending();
                msg = msg.Replace("&", "%26");
                msg = msg.Replace("+", "%2B");
                msg = msg.Replace("%", "%25");
                msg = msg.Replace("#", "%23");
                msg = msg.Replace("=", "%3D");
                msg = msg.Replace("^", "%5E");
                msg = msg.Replace("~", "%7E");
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd2 = new MySqlCommand("GetUrlSms", con);
                cmd2.CommandType = CommandType.StoredProcedure;

                con.Open();
                MySqlDataAdapter da2 = new MySqlDataAdapter();
                da2.SelectCommand = cmd2;
                da2.Fill(dsurl);
                con.Close();
                if (dsurl.Tables.Count > 0)
                {
                    url = dsurl.Tables[0].Rows[0]["smsapiurl"].ToString();
                }
                else
                {
                    url = "";
                }


                // string url = clscon.Return_string("select smsapiurl from tbemailsms where formatid=1");
                url = url.Replace("@msg", msg);
                url = url.Replace("@mobile", mobileno);
                email.readHtmlPage(url);
            }
            catch { }
        }







        [HttpGet]
        [Route("GetSavedData")]
        public string GetSavedData()
        {
            string json = "";
            DataSet ds = new DataSet();
            GetSavedstudentResponse ObjGSTDR = new GetSavedstudentResponse();
            List<GetSavedstudentData> ListGSTD = new List<GetSavedstudentData>();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getsaveaddstudentdata", con);
                cmd.CommandType = CommandType.StoredProcedure;

                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGSTDR.Status = true;
                    ObjGSTDR.Message = "Data Found";
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        GetSavedstudentData ObjGSTD = new GetSavedstudentData();
                        ObjGSTD.studentid = Convert.ToInt32(row["studentid"]);
                        ObjGSTD.studentname = Convert.ToString(row["studentname"]);
                        ObjGSTD.state = Convert.ToString(row["statename"]);
                        ObjGSTD.city = Convert.ToString(row["cityname"]);
                        ObjGSTD.school = Convert.ToString(row["schoolname"]);
                        ObjGSTD.classes = Convert.ToString(row["classname"]);
                        ObjGSTD.stream = Convert.ToString(row["streamname"]);
                        ObjGSTD.email = Convert.ToString(row["email"]);
                        ObjGSTD.mobileno = Convert.ToString(row["mobileno"]);
                        ObjGSTD.fathersname = Convert.ToString(row["fathersname"]);
                        ObjGSTD.parentemail = Convert.ToString(row["parentemail"]);
                        ObjGSTD.parentmobileno = Convert.ToString(row["parentmobileno"]);




                        ListGSTD.Add(ObjGSTD);
                    }
                    ObjGSTDR.data = ListGSTD;
                }
                else
                {
                    ObjGSTDR.Status = false;
                    ObjGSTDR.Message = "Something went wrong";
                }
            }
            catch (Exception e)
            {
                ObjGSTDR.Status = false;
                ObjGSTDR.Message = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(ObjGSTDR, settings);
            return json;
        }
        [HttpGet]
        [Route("GetEditData")]
        public string GetEditedData([FromHeader] GetstudentId obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetstudentEditResponse ObjGER = new GetstudentEditResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("editstudentdata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("studentid_D", obj.studentid);

                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGER.Status = true;
                    ObjGER.Message = "Data Found";
                    GetstudentEditData ObjGED = new GetstudentEditData();
                    ObjGED.studentid = Convert.ToInt32(ds.Tables[0].Rows[0]["studentid"]);
                    ObjGED.studentname = Convert.ToString(ds.Tables[0].Rows[0]["studentname"]);
                    ObjGED.stateid = Convert.ToInt32(ds.Tables[0].Rows[0]["stateid"]);
                    ObjGED.cityid = Convert.ToInt32(ds.Tables[0].Rows[0]["cityid"]);

                    ObjGED.schoolid = Convert.ToInt32(ds.Tables[0].Rows[0]["schoolid"]);
                    ObjGED.classid = Convert.ToInt32(ds.Tables[0].Rows[0]["classid"]);
                    ObjGED.streamid = Convert.ToInt32(ds.Tables[0].Rows[0]["streamid"]);

                    ObjGED.email = Convert.ToString(ds.Tables[0].Rows[0]["email"]);
                    ObjGED.mobileno = Convert.ToString(ds.Tables[0].Rows[0]["mobileno"]);
                    ObjGED.fathersname = Convert.ToString(ds.Tables[0].Rows[0]["fathersname"]);
                    ObjGED.parentemail = Convert.ToString(ds.Tables[0].Rows[0]["parentemail"]);
                    ObjGED.parentmobileno = Convert.ToString(ds.Tables[0].Rows[0]["parentmobileno"]);




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
        [HttpPost]
        [Route("UpdateStudent")]
        public string UpdateStudent([FromForm] string studentid,
          [FromForm] string studentname, string stateid, [FromForm] string cityid, [FromForm] string schoolid, [FromForm] string classid, [FromForm] string streamid,
           [FromForm] string email, [FromForm] string mobileno, [FromForm] string fathersname,
           [FromForm] string parentemail, [FromForm] string parentmobileno, [FromForm] string createdby)


        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            SavestudentResponse ObjAMR = new SavestudentResponse();
            SavestudentData objAmp = new SavestudentData();

            objAmp.studentid = Convert.ToInt32(studentid);
            objAmp.studentname = Convert.ToString(studentname);
            objAmp.stateid = Convert.ToInt32(stateid);
            objAmp.cityid = Convert.ToInt32(cityid);
            objAmp.schoolid = Convert.ToInt32(schoolid);
            objAmp.classid = Convert.ToInt32(classid);
            objAmp.streamid = Convert.ToInt32(streamid);
            objAmp.email = Convert.ToString(email);

            objAmp.mobileno = Convert.ToString(mobileno);

            objAmp.fathersname = Convert.ToString(fathersname);
            objAmp.parentemail = Convert.ToString(parentemail);

            objAmp.parentmobileno = Convert.ToString(parentmobileno);

            objAmp.createdby = Convert.ToInt32(createdby);


            try
            {


                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("UpdatestudentData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("studentid_d", objAmp.studentid);
                cmd.Parameters.AddWithValue("studentname_d", objAmp.studentname);

                cmd.Parameters.AddWithValue("stateid_d", objAmp.stateid);
                cmd.Parameters.AddWithValue("cityid_d", objAmp.cityid);
                cmd.Parameters.AddWithValue("schoolid_d", objAmp.schoolid);
                cmd.Parameters.AddWithValue("classid_d", objAmp.classid);

                cmd.Parameters.AddWithValue("streamid_d", objAmp.streamid);
                cmd.Parameters.AddWithValue("email_d", objAmp.email);

                cmd.Parameters.AddWithValue("mobileno_d", objAmp.mobileno);

                cmd.Parameters.AddWithValue("fathersname_d", objAmp.fathersname);
                cmd.Parameters.AddWithValue("parentemail_d", objAmp.parentemail);
                cmd.Parameters.AddWithValue("parentmobileno_d", objAmp.parentmobileno);
                cmd.Parameters.AddWithValue("created_by", objAmp.createdby);
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
        [HttpPost]
        [Route("DeleteActivity")]
        public string DeleteActivities([FromBody] GetstudentEditData obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            GetstudentEditData ObjAMR = new GetstudentEditData();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("DeletestudentRecord", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("studentid_d", obj.studentid);

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


        public class GetStudentResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public List<GetStudentData> data { get; set; }
        }
        public class GetStudentData
        {
            public Int32 stateid { get; set; }
            public Int32 cityid { get; set; }
            public Int32 schoolid { get; set; }
            public Int32 classid { get; set; }
            public Int32 streamid { get; set; }

            public Int32 studentid { get; set; }

            public string studentname { get; set; }

        }

        public class GetStudentCareerResponses
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public List<GetStudentCareerData> data { get; set; }
        }
        public class GetStudentCareerData
        {

            public string heading { get; set; }
        }

        public class GetStudentClassResponses
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public List<GetStudentClassData> data { get; set; }
        }
        public class GetStudentClassData
        {

            public string classname { get; set; }
            public Int32 classid { get; set; }
        }
        public class GetStudentStreamResponses
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public List<GetStudentStreamData> data { get; set; }
        }
        public class GetStudentStreamData
        {

            public Int32 streamid { get; set; }
            public string streamname { get; set; }

        }
        public class SavestudentResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
        }
        public class SavestudentData
        {
            public Int32 studentid { get; set; }
            public string studentname { get; set; }
            public Int32 stateid { get; set; }
            public Int32 cityid { get; set; }
            public Int32 schoolid { get; set; }
            public Int32 classid { get; set; }
            public Int32 streamid { get; set; }

            public string email { get; set; }

            public string mobileno { get; set; }
            public string fathersname { get; set; }
            public string parentemail { get; set; }

            public string parentmobileno { get; set; }

            public Int32 createdby { get; set; }


        }
        public class GetSavedstudentResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }

            public List<GetSavedstudentData> data { get; set; }
        }
        public class GetSavedstudentData
        {
            public Int32 studentid { get; set; }
            public string studentname { get; set; }

            public string state { get; set; }
            public string city { get; set; }
            public string school { get; set; } = "";
            public string classes { get; set; }
            public string stream { get; set; } = "";
            public string email { get; set; }

            public string mobileno { get; set; }
            public string fathersname { get; set; }
            public string parentemail { get; set; }

            public string parentmobileno { get; set; }
        }
        public class GetstudentId
        {
            public int studentid { get; set; }
        }
        public class GetstudentEditResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public GetstudentEditData data { get; set; }
        }
        public class GetstudentEditData
        {
            public Int32 studentid { get; set; }
            public string studentname { get; set; }

            public Int32 stateid { get; set; }
            public Int32 cityid { get; set; }
            public Int32 schoolid { get; set; }
            public Int32 classid { get; set; }
            public Int32 streamid { get; set; }

            public string email { get; set; }

            public string mobileno { get; set; }
            public string fathersname { get; set; }
            public string parentemail { get; set; }

            public string parentmobileno { get; set; }

            public Int32 createdby { get; set; }
            public bool Status { get; set; }
            public string Message { get; set; }
        }
    }
}
