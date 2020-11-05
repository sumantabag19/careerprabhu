using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Mail;
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
    [Route("api/principalregistration")]
    public class principalregistration : Controller
    {
        IConfiguration _iconfiguration;
        private IHostingEnvironment _hostingEnvironment;

        
        public principalregistration(IConfiguration iconfiguration, IHostingEnvironment hosting)
        {
            _iconfiguration = iconfiguration;
            _hostingEnvironment = hosting;
        }

        [HttpGet]
        [Route("BindState")]
        public string BindState()
        {
            DataSet ds = new DataSet();
            string json = "";
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


        [HttpPost]
        [Route("BindCity")]
        public string BindCity([FromBody] GetRegData1 data)
        {
            GetRegResponse GSR = new GetRegResponse();
            List<GetRegData> ListGSD = new List<GetRegData>();
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
                        GetRegData GSD = new GetRegData();
                        GSD.cityid = Convert.ToInt32(row["city_id"]);
                        GSD.cityname = Convert.ToString(row["city_name"]);
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
        public string BindSchool([FromBody] GetRegSchoolData1 data)
        {
            GetSchoolRegResponse GSR = new GetSchoolRegResponse();
            List<GetSchoolRegData> ListGSD = new List<GetSchoolRegData>();
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
                        GetSchoolRegData GSD = new GetSchoolRegData();
                        GSD.schoolid = Convert.ToInt32(row["school_id"]);
                        GSD.schoolname = Convert.ToString(row["school_name"]);
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
        [Route("BindBoard")]
        public string BindBoard()
        {
            GetboardResponses GSR = new GetboardResponses();
            List<GetboardData> ListGSD = new List<GetboardData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Bindboard", con);
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
                        GetboardData GSD = new GetboardData();
                        GSD.boardid = Convert.ToInt32(row["boardid"]);
                        GSD.boardname = Convert.ToString(row["boardname"]);
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
        [Route("saveprincipaldata")]
        [Obsolete]
        public async Task<IActionResult> Saveprincipaldata([FromForm] IFormFile photo, [FromForm] string orgphotoname,
      [FromForm] string principalname, [FromForm] string stateid, [FromForm] string cityid,
      [FromForm] string schoolid, [FromForm] string email, [FromForm] string mobileno, [FromForm] string boardid, [FromForm] string schooltype, [FromForm] string createdby)
        {

            PrincipalRegistrationResponse stures = new PrincipalRegistrationResponse();
            JsonSerializerSettings settings = new JsonSerializerSettings();
            DataSet ds = new DataSet();
            string json = "";
            string result = "";
            string username = "";
            string pwd = "";
            string mobiles = "";
            string parentemail = "";
            string parentpwd = "";
            string photoguid = "";
            string pdffilename = "";
            string uploadDirectory = "";

            if (photo != null)
            {
                try
                {
                    photoguid = Guid.NewGuid().ToString();
                    pdffilename = photoguid + photo.FileName;


                    string strdocPath = _hostingEnvironment.WebRootPath + "\\uploadcoachphoto\\";
                    if (!Directory.Exists(strdocPath))
                    {
                        System.IO.Directory.CreateDirectory(_hostingEnvironment.WebRootPath + "/uploadcoachphoto");
                        uploadDirectory = System.IO.Path.Combine(_hostingEnvironment.WebRootPath, "uploadcoachphoto");

                    }
                    else
                    {
                        uploadDirectory = System.IO.Path.Combine(_hostingEnvironment.WebRootPath, "uploadcoachphoto");
                    }

            
                    if (photo.Length > 0)
                    {
                        var filePath = Path.Combine(uploadDirectory, pdffilename);

                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            await photo.CopyToAsync(fileStream);
                        }
                    }
                }
                catch (Exception e)
                {
                    string Message = e.Message;
                }
            }


           

            username = email;
                pwd = email.Substring(0, 2) + Guid.NewGuid().ToString().Substring(0, 4);
                mobiles = mobileno;


                try
                {
                    MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                    MySqlCommand cmd = new MySqlCommand("PrincipalRegistration", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("message", "");
                    cmd.Parameters["message"].Direction = ParameterDirection.Output;
                 

                    cmd.Parameters.AddWithValue("principalname_d", principalname);

                    cmd.Parameters.AddWithValue("username_d", email);
                    
                    cmd.Parameters.AddWithValue("pwd_d", pwd);
                    cmd.Parameters.AddWithValue("mobile_d", mobileno);
                    cmd.Parameters.AddWithValue("stateid_d", Convert.ToInt32(stateid));
                    cmd.Parameters.AddWithValue("cityid_d", Convert.ToInt32(cityid));
                    cmd.Parameters.AddWithValue("schoolid_d", Convert.ToInt32(schoolid));
                    cmd.Parameters.AddWithValue("orgpgotoname_d", (orgphotoname==null?"": orgphotoname));
                    cmd.Parameters.AddWithValue("newphotoname_D", (photoguid==""?"": photoguid));
                cmd.Parameters.AddWithValue("createdby_d", Convert.ToInt32(createdby));
                cmd.Parameters.AddWithValue("boardid_D", Convert.ToInt32( boardid));

                cmd.Parameters.AddWithValue("schooltype_D", Convert.ToInt32(schooltype));

                con.Open();
                    cmd.ExecuteScalar();
                    result = cmd.Parameters["message"].Value.ToString();
                    con.Close();
                    if (result == "Success")
                    {
                        stures.status = true;
          

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
                            string _Message = ds1.Tables[0].Rows[0]["email"].ToString();
                            string _sms = ds1.Tables[0].Rows[0]["sms"].ToString();
                            if (email != "")
                            {
                                MySqlCommand cmd2 = new MySqlCommand("UpdateEmailStatus", con);
                                cmd1.CommandType = CommandType.StoredProcedure;
                                cmd1.Parameters.AddWithValue("email", email);

                                con.Open();
                                MySqlDataAdapter da2 = new MySqlDataAdapter();
                                da2.SelectCommand = cmd2;

                                con.Close();
                                _Message = _Message.Replace("@candidatename", principalname);
                                _Message = _Message.Replace("@username", email);
                                _Message = _Message.Replace("@password", pwd);

                                SendMail("CareerPrabhu Principal Login", email, "", _Message);
                                _sms = _sms.Replace("@username", email);
                                _sms = _sms.Replace("@pwd", pwd);

                                if (mobileno.Length >= 1)
                                {
                                    if (mobileno != "")
                                    {
                                        mobiles += "," + mobileno + "";
                                    }
                                    if (mobileno != "")
                                    {
                                        mobiles += "," + mobileno + "";
                                    }
                                    SendSMS(mobiles, _sms);
                                }
                            }
                        }
                        catch (Exception e)
                        {
                            string mmm = e.Message;
                        }



                        stures.message = "Principal Registered Successfully:ID-" + username + ",Pwd:" + pwd + "";
                        //stures.message = "Student Registered Successfully:ID-" + username + ",Pwd:" + pwd + "";
                        settings.NullValueHandling = NullValueHandling.Ignore;
                        json = JsonConvert.SerializeObject(stures, settings);
                    }
                    else if (result == "Mobile Number Already Exists.")
                    {
                        stures.status = false;
                    
                        stures.message = "Mobile Number Already Exists.";


                        settings.NullValueHandling = NullValueHandling.Ignore;
                        json = JsonConvert.SerializeObject(stures, settings);
                    }
                    else if (result == "Email Id Already Exists.")
                    {
                        stures.status = false;
                    
                        stures.message = "Email Id Already Exists.";


                        settings.NullValueHandling = NullValueHandling.Ignore;
                        json = JsonConvert.SerializeObject(stures, settings);
                    }
                    else
                    {
                        stures.status = false;
                     
                        stures.message = json;


                        settings.NullValueHandling = NullValueHandling.Ignore;
                        json = JsonConvert.SerializeObject(stures, settings);
                    }



                }
                catch (Exception e)
                {
                    stures.status = false;
             
                    stures.message = e.Message;


                    settings.NullValueHandling = NullValueHandling.Ignore;
                    json = JsonConvert.SerializeObject(stures, settings);

                }
       




            return Ok(json);
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
            mail.From = new MailAddress(from, "Wonderskool", System.Text.Encoding.UTF8);
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





        //send email method
        //[Obsolete]
        //private void SendMail(string _Subject, string _CC, string _BCC, string _Messages)
        //{
        //    string from = "info@wonderskool.com";
        //    MailMessage mail = new MailMessage();
        //    mail.To.Add(_CC);

        //    if (_CC != "")
        //    {
        //        mail.To.Add(_CC);

        //    }



        //    mail.CC.Add(new MailAddress("mails.wonderskool@gmail.com"));
        //    mail.From = new MailAddress(from, "Wonderskool", System.Text.Encoding.UTF8);
        //    mail.ReplyTo = new MailAddress(from, "WonderSkool");
        //    mail.Subject = _Subject;
        //    mail.SubjectEncoding = System.Text.Encoding.UTF8;
        //    mail.Body = _Messages;
        //    mail.BodyEncoding = System.Text.Encoding.UTF8;
        //    mail.IsBodyHtml = true;
        //    mail.Priority = MailPriority.High;
        //    System.Net.NetworkCredential aCred = new System.Net.NetworkCredential("info@wonderskool.com", "wonderskool@123");
        //    SmtpClient client = new SmtpClient("smtp.zoho.com", 587);
        //    client.DeliveryMethod = SmtpDeliveryMethod.Network;
        //    client.EnableSsl = true;
        //    client.UseDefaultCredentials = false;
        //    client.Credentials = aCred;
        //    try
        //    {
        //        client.Send(mail);
        //    }
        //    catch (Exception ex)
        //    {
        //        string msg = ex.Message;
        //        // Response.Write(ex.Message);
        //        //  return;
        //    }
        //}

        //api for send sms
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
        [Route("BindData")]
        public string BindData()
        {
            string json = "";
            DataSet ds = new DataSet();
            GetPrincipalDataResponse ObjGSPDR = new GetPrincipalDataResponse();
            List<GetPrincipalData> ListGSPD = new List<GetPrincipalData>();

            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("GetPrincipalDetail", con);
                cmd.CommandType = CommandType.StoredProcedure;

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
                        GetPrincipalData ObjGSPD = new GetPrincipalData();

                        ObjGSPD.principalid = Convert.ToInt32(row["principalid"]);
                        ObjGSPD.principalname = Convert.ToString(row["principalname"]);
                        ObjGSPD.state = Convert.ToString(row["state_name"]);
                        ObjGSPD.city = Convert.ToString(row["city_name"]);
                        ObjGSPD.school = Convert.ToString(row["school_name"]);

                        ObjGSPD.email = Convert.ToString(row["email"]);


                        ObjGSPD.mobileno = Convert.ToString(row["mobileno"]);
                        ObjGSPD.password = Convert.ToString(row["pwd"]);
                        ObjGSPD.board = Convert.ToString(row["board"]);
                        ObjGSPD.schooltype = Convert.ToString(row["schooltype"]);


                        ObjGSPD.photo = "http://admin.careerprabhu.com/" + "uploadcoachphoto/" + Convert.ToString(row["photo"]);


                        if (Convert.ToString(row["photo"]) == "")
                        {
                            ObjGSPD.photo = "";
                        }


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



        [HttpGet]
        [Route("GetEditData")]
        public string GetEditedData([FromHeader] Getprincipaleditrecord obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetPrincipalEditResponse ObjGER = new GetPrincipalEditResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("editprincipaldetail", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("principalid_d", obj.principalid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGER.Status = true;
                    ObjGER.Message = "Data Found";
                    Getprincipaleditrecord ObjGED = new Getprincipaleditrecord();

                    ObjGED.principalid = Convert.ToInt32(ds.Tables[0].Rows[0]["principalid"]);
                    ObjGED.stateid = Convert.ToInt32(ds.Tables[0].Rows[0]["stateid"]);
                    ObjGED.cityid = Convert.ToInt32(ds.Tables[0].Rows[0]["cityid"]);
                    ObjGED.schoolid = Convert.ToInt32(ds.Tables[0].Rows[0]["schoolid"]);

                    ObjGED.principalname = Convert.ToString(ds.Tables[0].Rows[0]["principalname"]);
                    ObjGED.mobileno = Convert.ToString(ds.Tables[0].Rows[0]["mobileno"]);

                    ObjGED.email = Convert.ToString(ds.Tables[0].Rows[0]["email"]);
                    ObjGED.boardid = Convert.ToInt32(ds.Tables[0].Rows[0]["boardid"]);

                    ObjGED.schooltype = Convert.ToInt32(ds.Tables[0].Rows[0]["schooltype"]);

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
        [Route("updateprincipaldata")]
        [Obsolete]
        public async Task<IActionResult> updateprincipaldata([FromForm] IFormFile photo, [FromForm] string orgphotoname,
    [FromForm] string principalname, [FromForm] string principalid, [FromForm] string stateid, [FromForm] string cityid,
    [FromForm] string schoolid, [FromForm] string email, [FromForm] string mobileno,[FromForm] string boardid, [FromForm] string schooltype, [FromForm] string createdby)
        {

            PrincipalRegistrationResponse stures = new PrincipalRegistrationResponse();
            JsonSerializerSettings settings = new JsonSerializerSettings();
            DataSet ds = new DataSet();
            string json = "";
            string result = "";
            string username = "";
            string pwd = "";
            string mobiles = "";
            string parentemail = "";
            string parentpwd = "";
            string photoguid = "";
            string pdffilename = "";
            string uploadDirectory = "";

            if (photo != null)
            {
                try
                {
                    photoguid = Guid.NewGuid().ToString();
                    pdffilename = photoguid + photo.FileName;


                    string strdocPath = _hostingEnvironment.WebRootPath + "\\uploadcoachphoto\\";
                    if (!Directory.Exists(strdocPath))
                    {
                        System.IO.Directory.CreateDirectory(_hostingEnvironment.WebRootPath + "/uploadcoachphoto");
                        uploadDirectory = System.IO.Path.Combine(_hostingEnvironment.WebRootPath, "uploadcoachphoto");

                    }
                    else
                    {
                        uploadDirectory = System.IO.Path.Combine(_hostingEnvironment.WebRootPath, "uploadcoachphoto");
                    }


                    if (photo.Length > 0)
                    {
                        var filePath = Path.Combine(uploadDirectory, pdffilename);

                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            await photo.CopyToAsync(fileStream);
                        }
                    }
                }
                catch (Exception e)
                {
                    string Message = e.Message;
                }
            }




            //username = email;
            //pwd = email.Substring(0, 2) + Guid.NewGuid().ToString().Substring(0, 4);
            //mobiles = mobileno;


            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("UpdatePrinipalData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("principalname_d", principalname);
                cmd.Parameters.AddWithValue("principalid_d", principalid);

                //cmd.Parameters.AddWithValue("username_d", email);

                //cmd.Parameters.AddWithValue("pwd_d", pwd);
                //cmd.Parameters.AddWithValue("mobile_d", mobileno);
                cmd.Parameters.AddWithValue("stateid_d", Convert.ToInt32(stateid));
                cmd.Parameters.AddWithValue("cityid_d", Convert.ToInt32(cityid));
                cmd.Parameters.AddWithValue("schoolid_d", Convert.ToInt32(schoolid));
                cmd.Parameters.AddWithValue("orgpgotoname_d", (orgphotoname == null ? "" : orgphotoname));
                cmd.Parameters.AddWithValue("newphotoname_D", (photoguid == "" ? "" : photoguid));
                cmd.Parameters.AddWithValue("createdby_d", Convert.ToInt32(createdby));
                cmd.Parameters.AddWithValue("boardid_D", Convert.ToInt32(boardid));

                cmd.Parameters.AddWithValue("schooltype_D", Convert.ToInt32(schooltype));

                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();
                con.Close();
               if(result== "Success")
                {
                    stures.status = true;

                    stures.message = json;


                    settings.NullValueHandling = NullValueHandling.Ignore;
                    json = JsonConvert.SerializeObject(stures, settings);
                }
                else
                {
                    stures.status = false;

                    stures.message = json;


                    settings.NullValueHandling = NullValueHandling.Ignore;
                    json = JsonConvert.SerializeObject(stures, settings);
                }



            }
            catch (Exception e)
            {
                stures.status = false;

                stures.message = e.Message;


                settings.NullValueHandling = NullValueHandling.Ignore;
                json = JsonConvert.SerializeObject(stures, settings);

            }





            return Ok(json);
        }


        [HttpPost]
        [Route("DeleteActivity")]
        public string DeleteActivities([FromBody] Getprincipaleditrecord obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            GetPrincipalEditResponse ObjAMR = new GetPrincipalEditResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("DeletePrincipalData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("principalid_d", obj.principalid);

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


    }
    public class GetPrincipalEditResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public Getprincipaleditrecord data { get; set; }
    }
    public class Getprincipaleditrecord
    {

        public Int32 principalid { get; set; }
        public Int32 stateid { get; set; }
        public Int32 cityid { get; set; }
        public Int32 schoolid { get; set; }
        public string principalname { get; set; }
        public string email { get; set; }
        public string mobileno { get; set; }
        public Int32 boardid { get; set; }
        public Int32 schooltype { get; set; }

    }
    public class PrincipalRegistrationResponse
    {
        public bool status { get; set; }
   
        public string message { get; set; }
    }
    public class GetRegData1
    {
    
        public Int32 stateid { get; set; }

    }
    public class GetRegSchoolData1
    {
        public Int32 cityid { get; set; }
        public Int32 stateid { get; set; }

    }
    public class GetRegResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetRegData> data { get; set; }
    }
    public class GetRegData
    {

        public int cityid { get; set; }
        public string cityname { get; set; }
    }
    public class GetSchoolRegResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetSchoolRegData> data { get; set; }
    }
    public class GetSchoolRegData
    {

        public int schoolid { get; set; }
        public string schoolname { get; set; }
    }


    public class GetPrincipalDataResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }

        public List<GetPrincipalData> data { get; set; }

    }
    public class GetPrincipalData
    {
        public Int32 principalid { get; set; }
        public string principalname { get; set; }
        public string email { get; set; }
        public string mobileno { get; set; }
        public string state { get; set; }
        public string city { get; set; }
        public string school { get; set; }
        public string password { get; set; }

        public string photo { get; set; }

        public string board { get; set; }
        public string schooltype { get; set; }

    }
    public class GetboardResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetboardData> data { get; set; }
    }
    public class GetboardData
    {

        public Int32 boardid { get; set; }
        public string boardname { get; set; }

    }

}
