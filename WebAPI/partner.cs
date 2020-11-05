using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace CareerPrabhu.WebAPI
{
    [Route("api/partner")]
    //PartnerRegistration
    public class partner : Controller
    {
        IConfiguration _iconfiguration;
        public partner(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
        }
        [HttpPost]
        [Route("Bindstate")]
        public string Bindstate()
        {
            GetStateResponses GSR = new GetStateResponses();
            List<GetState> ListGSD = new List<GetState>();
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
                        GetState GSD = new GetState();
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
        public string BindCity([FromBody] GetCity data)
        {
            GetCityResponses GSR = new GetCityResponses();
            List<GetCity> ListGSDR = new List<GetCity>();
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
                        GetCity GSD = new GetCity();
                        GSD.cityname = Convert.ToString(row["city_name"]);
                        GSD.cityid = Convert.ToInt32(row["city_id"]);
                        ListGSDR.Add(GSD);
                    }
                    GSR.data = ListGSDR;
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
        [Route("BindProducts")]
        public string BindProducts()
        {
            GetProductsResponse GSR = new GetProductsResponse();
            List<GetProductsData> ListGSD = new List<GetProductsData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("bindcatagory", con);
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
                        GetProductsData GSD = new GetProductsData();
                        GSD.productid = Convert.ToInt32(row["productid"]);
                        GSD.productname = Convert.ToString(row["productname"]);
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
        [Route("BindCoupon")]
        public string BindCoupon()
        {
            BindCouponResponse GIAR = new BindCouponResponse();
            List<BindCouponData> ListGIAD = new List<BindCouponData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindCoupon", con);
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
                        BindCouponData GIAD = new BindCouponData();
                        GIAD.Couponid = Convert.ToInt32(row["couponid"]);
                        GIAD.Couponname = Convert.ToString(row["couponname"]);
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
        [Route("SavePartner")]
        [Obsolete]
        public string SavePartner([FromForm] string regid,
           [FromForm] string stateid, [FromForm] string cityid, [FromForm] string productid,
           [FromForm] string partnername, [FromForm] string mobileno, [FromForm] string Couponid,
           [FromForm] string district, [FromForm] string email, [FromForm] string pwd,[FromForm] string whatsappno, [FromForm] string discount, [FromForm] string createdby, [FromForm] string Status)

        {
            string json = "";
            string result = "";
            int maxid = 0;
            string qry = "";
            //string pwd = "";
            DataSet ds = new DataSet();
            DataSet ds1 = new DataSet();
            string mobiles = "";

            PartnerResponse ObjAMR = new PartnerResponse();
            PartnerParam objAmp = new PartnerParam();

            objAmp.regid = Convert.ToInt32(regid);
            objAmp.stateid = Convert.ToInt32(stateid);
            objAmp.cityid = Convert.ToInt32(cityid);
            objAmp.productid = Convert.ToInt32(productid);
            
            objAmp.partnername = Convert.ToString(partnername);
            objAmp.mobileno = Convert.ToString(mobileno);

            objAmp.Couponid = Convert.ToString(Couponid);
            objAmp.district = Convert.ToString(district);

            objAmp.email = Convert.ToString(email);
            objAmp.pwd = Convert.ToString(pwd);
            objAmp.whatsappno = Convert.ToString(whatsappno);
            objAmp.discount = Convert.ToInt32(discount);
            objAmp.createdby = Convert.ToInt32(createdby);
            objAmp.Status = Convert.ToInt32(Status);
            pwd = objAmp.email.Substring(0, 2) + Guid.NewGuid().ToString().Substring(0, 4);
            char[] spearator = { ',', ' ' };


            string[] couponlist = objAmp.Couponid.Split(spearator,
               StringSplitOptions.RemoveEmptyEntries);

            try
            {


                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("SavePartnerData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("regid_d", objAmp.regid);
                cmd.Parameters.AddWithValue("stateid_d", objAmp.stateid);
                cmd.Parameters.AddWithValue("cityid_d", objAmp.cityid);
                
                cmd.Parameters.AddWithValue("productid_d", objAmp.productid);
                cmd.Parameters.AddWithValue("partnername_d", objAmp.partnername);
                cmd.Parameters.AddWithValue("mobileno_d", objAmp.mobileno);

                cmd.Parameters.AddWithValue("couponid_d", objAmp.Couponid);
                cmd.Parameters.AddWithValue("dist_d", objAmp.district);
                cmd.Parameters.AddWithValue("email_d", objAmp.email);
                cmd.Parameters.AddWithValue("pwd_d", pwd);
                cmd.Parameters.AddWithValue("whatsappno_d", objAmp.whatsappno);
                cmd.Parameters.AddWithValue("couponper_d", objAmp.discount);
                cmd.Parameters.AddWithValue("status_d", objAmp.Status);


                cmd.Parameters.AddWithValue("created_by", objAmp.createdby);
                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();


                if (result == "Success")
                {
                    try
                    {
                        if (couponlist.Length > 0)
                        {

                            qry = "SELECT MAX(regid) as reg_id FROM tbl_partnerregistration";

                            MySqlCommand cmd1 = new MySqlCommand(qry, con);

                            MySqlDataAdapter da1 = new MySqlDataAdapter();
                            da1.SelectCommand = cmd1;
                            da1.Fill(ds1);
                            con.Close();
                            if (ds1.Tables[0].Rows.Count > 0)
                            {
                                maxid = Convert.ToInt32(ds1.Tables[0].Rows[0]["reg_id"]);
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


                    if (couponlist.Length > 0)
                    {
                        Execqry("delete from tbl_coupon_partner where regid=" + maxid);
                        for (int i = 0; i < couponlist.Length; i++)
                        {

                            Execqry("insert into tbl_coupon_partner(regid,couponid)values(" + maxid + ", " + Convert.ToInt32(couponlist[i]) + ")");
                        }

                    }


                    DataSet ds2 = new DataSet();
                    try
                    {
                        MySqlCommand cmd2 = new MySqlCommand("GetEmailSms_career", con);
                        cmd2.CommandType = CommandType.StoredProcedure;

                        con.Open();
                        MySqlDataAdapter da1 = new MySqlDataAdapter();
                        da1.SelectCommand = cmd2;
                        da1.Fill(ds2);
                        con.Close();
                        string _Message = ds2.Tables[0].Rows[0]["partnerregistration"].ToString();
                        string _sms = ds2.Tables[0].Rows[0]["sms"].ToString();
                        if (objAmp.email != "")
                        {
                            MySqlCommand cmd3 = new MySqlCommand("UpdateEmailStatus", con);
                            cmd3.CommandType = CommandType.StoredProcedure;
                            cmd3.Parameters.AddWithValue("email", objAmp.email);

                            con.Open();
                            MySqlDataAdapter da2 = new MySqlDataAdapter();
                            da2.SelectCommand = cmd2;

                            con.Close();
                            _Message = _Message.Replace("@candidatename", objAmp.partnername);
                            _Message = _Message.Replace("@username", objAmp.email);
                            _Message = _Message.Replace("@password", pwd);

                            SendMail("CareerPrabhu Student Portal Login", objAmp.email, "", _Message);
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





                    con.Close();
                    ObjAMR.Status = true;
                    ObjAMR.Message = result;
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
        [HttpGet]
        [Route("GetSavedData")]
        public string GetSavedData()
        {
            string json = "";
            DataSet ds = new DataSet();
            GetSavedPartnerDataResponse ObjGSTDR = new GetSavedPartnerDataResponse();
            List<GetSavedPartnerData> ListGSTD = new List<GetSavedPartnerData>();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getsavepartnerdata", con);
                cmd.CommandType = CommandType.StoredProcedure;

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
                        GetSavedPartnerData ObjGSTD = new GetSavedPartnerData();
                        ObjGSTD.regid = Convert.ToInt32(row["regid"]);
                        ObjGSTD.state = Convert.ToString(row["statename"]);
                        ObjGSTD.city = Convert.ToString(row["cityname"]);
                        ObjGSTD.product = Convert.ToString(row["productname"]);
                        ObjGSTD.partnername = Convert.ToString(row["partnername"]);
                        ObjGSTD.mobileno = Convert.ToString(row["mobileno"]);
                        ObjGSTD.CouponName = Convert.ToString(row["Couponid"]);
                        ObjGSTD.district = Convert.ToString(row["dist"]);
                        ObjGSTD.email = Convert.ToString(row["email"]);
                        ObjGSTD.pwd = Convert.ToString(row["pwd"]);

                        ObjGSTD.whatsappno = Convert.ToString(row["whatsappno"]);
                        ObjGSTD.discount = Convert.ToInt32(row["couponper"]);
                        



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
        [HttpGet]
        [Route("GetEditData")]
        public string GetEditedData([FromHeader] GetPartnerId obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetPartnerEditResponse ObjGER = new GetPartnerEditResponse();
            List<GetPartnerEditData> objlist = new List<GetPartnerEditData>();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("editpartnerdata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("regid_d", obj.regid);

                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                       

                        GetPartnerEditData ObjGED = new GetPartnerEditData();
                        ObjGED.productid = Convert.ToInt32(row["productid"]);
                        ObjGED.stateid = Convert.ToInt32(row["stateid"]);
                        ObjGED.cityid = Convert.ToInt32(row["cityid"]);
    
                        ObjGED.discount = Convert.ToInt32(row["couponper"]);


                        ObjGED.partnername = row["partnername"].ToString();
                        
                        ObjGED.Couponid = row["Couponid"].ToString(); 
                    

                        ObjGED.mobileno = row["mobileno"].ToString();


                        ObjGED.district = row["dist"].ToString();

                        ObjGED.email = row["email"].ToString();
                        ObjGED.whatsappno = row["whatsappno"].ToString();
                        ObjGED.regid = Convert.ToInt32(row["regid"]);

                        

                        objlist.Add(ObjGED);



                    }
                    ObjGER.Status = true;
                    ObjGER.Message = "Data Found";
                    ObjGER.data = objlist;

                    
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
        [Route("UpdatePartner")]
        public string UpdatePartner([FromForm] string regid,
           [FromForm] string stateid, [FromForm] string cityid, [FromForm] string productid,
           [FromForm] string partnername, [FromForm] string mobileno, [FromForm] string Couponid,
           [FromForm] string district, [FromForm] string email, [FromForm] string whatsappno, [FromForm] string discount, [FromForm] string createdby, [FromForm] string Status)

        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            PartnerResponse ObjAMR = new PartnerResponse();
            PartnerParam objAmp = new PartnerParam();

            objAmp.regid = Convert.ToInt32(regid);
            objAmp.stateid = Convert.ToInt32(stateid);
            objAmp.cityid = Convert.ToInt32(cityid);
            objAmp.productid = Convert.ToInt32(productid);

            objAmp.partnername = Convert.ToString(partnername);
            objAmp.mobileno = Convert.ToString(mobileno);

            objAmp.Couponid = Convert.ToString(Couponid);
            objAmp.district = Convert.ToString(district);

            objAmp.email = Convert.ToString(email);
            objAmp.whatsappno = Convert.ToString(whatsappno);
            objAmp.discount = Convert.ToInt32(discount);
            objAmp.createdby = Convert.ToInt32(createdby);
            objAmp.Status = Convert.ToInt32(Status);

            char[] spearator = { ',', ' ' };


            string[] couponlist = objAmp.Couponid.Split(spearator,
               StringSplitOptions.RemoveEmptyEntries);
            try
            {


                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("UpdatePartnerData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("regid_d", objAmp.regid);
                cmd.Parameters.AddWithValue("stateid_d", objAmp.stateid);
                cmd.Parameters.AddWithValue("cityid_d", objAmp.cityid);

                cmd.Parameters.AddWithValue("productid_d", objAmp.productid);
                cmd.Parameters.AddWithValue("partnername_d", objAmp.partnername);
                cmd.Parameters.AddWithValue("mobileno_d", objAmp.mobileno);

                cmd.Parameters.AddWithValue("couponid_d", objAmp.Couponid);
                cmd.Parameters.AddWithValue("dist_d", objAmp.district);
                cmd.Parameters.AddWithValue("email_d", objAmp.email);
                cmd.Parameters.AddWithValue("whatsappno_d", objAmp.whatsappno);
                cmd.Parameters.AddWithValue("couponper_d", objAmp.discount);
                cmd.Parameters.AddWithValue("status_d", objAmp.Status);


                cmd.Parameters.AddWithValue("created_by", objAmp.createdby);
                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();

                if (couponlist.Length > 0)
                {
                    Execqry("delete from tbl_coupon_partner where regid=" + objAmp.regid);
                    for (int i = 0; i < couponlist.Length; i++)
                    {

                        Execqry("insert into tbl_coupon_partner(regid,couponid)values(" + objAmp.regid + ", " + Convert.ToInt32(couponlist[i]) + ")");
                    }

                }
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
        public string DeleteActivities([FromBody] GetPartnerEditData obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            GetPartnerEditData ObjAMR = new GetPartnerEditData();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("DeletePartnerRecord", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("regid_d", obj.regid);

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


        //coupon assign to product



        [HttpPost]
        [Route("SaveProductCoupon")]
        [Obsolete]
        public string SaveProductCoupon([FromForm] string pid,
         [FromForm] string productid,
         [FromForm] string Couponid,
          [FromForm] string createdby)

        {
            string json = "";
            string result = "";
            int maxid = 0;
            string qry = "";
            //string pwd = "";
            DataSet ds = new DataSet();
            DataSet ds1 = new DataSet();
            string mobiles = "";

            PartnerResponse ObjAMR = new PartnerResponse();
            PartnerParam objAmp = new PartnerParam();

       
            objAmp.productid = Convert.ToInt32(productid);

         
            objAmp.Couponid = Convert.ToString(Couponid);
     
            objAmp.createdby = Convert.ToInt32(createdby);
     
            char[] spearator = { ',', ' ' };


            string[] couponlist = objAmp.Couponid.Split(spearator,
               StringSplitOptions.RemoveEmptyEntries);

            try
            {


                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("SaveProductCoupon", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("pid_d", objAmp.regid);
               

                cmd.Parameters.AddWithValue("productid_d", objAmp.productid);
               

                cmd.Parameters.AddWithValue("couponid_d", objAmp.Couponid);
        


                cmd.Parameters.AddWithValue("created_by", objAmp.createdby);
                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();


                if (result == "Success")
                {
                    try
                    {
                        if (couponlist.Length > 0)
                        {

                            qry = "SELECT MAX(pid) as pid FROM tbl_productcouponwise";

                            MySqlCommand cmd1 = new MySqlCommand(qry, con);

                            MySqlDataAdapter da1 = new MySqlDataAdapter();
                            da1.SelectCommand = cmd1;
                            da1.Fill(ds1);
                            con.Close();
                            if (ds1.Tables[0].Rows.Count > 0)
                            {
                                maxid = Convert.ToInt32(ds1.Tables[0].Rows[0]["pid"]);
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


                    if (couponlist.Length > 0)
                    {
                        Execqry("delete from tbl_product_couponwise where pid=" + maxid);
                        for (int i = 0; i < couponlist.Length; i++)
                        {

                            Execqry("insert into tbl_product_couponwise(pid,couponid)values(" + maxid + ", " + Convert.ToInt32(couponlist[i]) + ")");
                        }

                    }


                  



                    con.Close();
                    ObjAMR.Status = true;
                    ObjAMR.Message = result;
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


        [HttpPost]
        [Route("UpdateProductCoupon")]
        public string UpdateProductCoupon([FromForm] string pid,
         [FromForm] string productid,
          [FromForm] string Couponid,
         [FromForm] string createdby)

        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            PartnerResponse ObjAMR = new PartnerResponse();
            PartnerParam objAmp = new PartnerParam();

            objAmp.regid = Convert.ToInt32(pid);

            objAmp.productid = Convert.ToInt32(productid);

            objAmp.Couponid = Convert.ToString(Couponid);
      
            objAmp.createdby = Convert.ToInt32(createdby);

            char[] spearator = { ',', ' ' };


            string[] couponlist = objAmp.Couponid.Split(spearator,
               StringSplitOptions.RemoveEmptyEntries);
            try
            {


                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("UpdateProductCoupon", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("pid_d", objAmp.regid);
           

                cmd.Parameters.AddWithValue("productid_d", objAmp.productid);
       

                cmd.Parameters.AddWithValue("couponid_d", objAmp.Couponid);
           

                cmd.Parameters.AddWithValue("created_by", objAmp.createdby);
                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();

                if (couponlist.Length > 0)
                {
                    Execqry("delete from tbl_product_couponwise where pid=" + objAmp.regid);
                    for (int i = 0; i < couponlist.Length; i++)
                    {

                        Execqry("insert into tbl_product_couponwise(pid,couponid)values(" + objAmp.regid + ", " + Convert.ToInt32(couponlist[i]) + ")");
                    }

                }
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



        [Route("GetProductCouponData")]
        public string GetProductCouponData()
        {
            string json = "";
            DataSet ds = new DataSet();
            GetSavedPartnerDataResponse ObjGSTDR = new GetSavedPartnerDataResponse();
            List<GetSavedPartnerData> ListGSTD = new List<GetSavedPartnerData>();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getproductcoupondata", con);
                cmd.CommandType = CommandType.StoredProcedure;

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
                        GetSavedPartnerData ObjGSTD = new GetSavedPartnerData();
                        ObjGSTD.regid = Convert.ToInt32(row["pid"]);
                   
                        ObjGSTD.product = Convert.ToString(row["productname"]);
              
                        ObjGSTD.CouponName = Convert.ToString(row["couponid"]);
                      



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




        [HttpGet]
        [Route("GetEditProductCoupon")]
        public string GetEditProductCoupon([FromHeader] GetPartnerId obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetPartnerEditResponse ObjGER = new GetPartnerEditResponse();
            List<GetPartnerEditData> objlist = new List<GetPartnerEditData>();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("editpartnercoupon", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("regid_d", obj.regid);

                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {


                        GetPartnerEditData ObjGED = new GetPartnerEditData();
                        ObjGED.productid = Convert.ToInt32(row["prodid"]);
                       
                        ObjGED.Couponid = row["Couponid"].ToString();


                     
                        ObjGED.regid = Convert.ToInt32(row["pid"]);



                        objlist.Add(ObjGED);



                    }
                    ObjGER.Status = true;
                    ObjGER.Message = "Data Found";
                    ObjGER.data = objlist;


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
        [Route("DeletePartnerCoupon")]
        public string DeletePartnerCoupon([FromBody] GetPartnerEditData obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            GetPartnerEditData ObjAMR = new GetPartnerEditData();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("DeletePartnerCoupon", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("regid_d", obj.regid);

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
    public class GetStateResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetState> data { get; set; }
    }
    public class GetState
    {

        public string state { get; set; }
        public Int32 stateid { get; set; }
    }
    public class GetCityResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetCity> data { get; set; }
    }
    public class GetCity
    {
        public Int32 stateid { get; set; }
        public Int32 cityid { get; set; }
        public string cityname { get; set; }

    }
    public class GetProductsResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetProductsData> data { get; set; }
    }
    public class GetProductsData
    {

        public string productname { get; set; }
        public Int32 productid { get; set; }
    }
    public class BindCouponResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<BindCouponData> data { get; set; }
    }
    public class BindCouponData
    {
        public Int32 Couponid { get; set; }
        public string Couponname { get; set; }
    }
    public class PartnerResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
    }
    public class PartnerParam
    {
        public Int32 regid { get; set; }
        public Int32 stateid { get; set; }
        public Int32 cityid { get; set; }
        public Int32 productid { get; set; }
        public Int32 discount { get; set; }

        public string partnername { get; set; }

        public string mobileno { get; set; }

        public string Couponid { get; set; }
        public string district { get; set; }
        public string email { get; set; }
        public string pwd { get; set; }
        public string whatsappno { get; set; }
        public Int32 createdby { get; set; }
        public Int32 Status { get; set; }



    }
    public class GetSavedPartnerDataResponse
    {
        public bool Statue { get; set; }
        public string Message { get; set; }

        public List<GetSavedPartnerData> data { get; set; }
    }
    public class GetSavedPartnerData
    {
        public Int32 regid { get; set; }
        public string state { get; set; }
        public string city { get; set; }
        public string product { get; set; }
        public Int32 discount { get; set; }
        public string partnername { get; set; }

        public string mobileno { get; set; }

        public string Couponid { get; set; }
        public string CouponName { get; set; }


        public string district { get; set; }
        public string email { get; set; }
        public string pwd { get; set; }

        public string whatsappno { get; set; }


    }
    public class GetPartnerId
    {
        public int regid { get; set; }
    }

    public class GetPartnerEditData
    {
        public Int32 regid { get; set; }
        public Int32 stateid { get; set; }
        public Int32 cityid { get; set; }
        public Int32 productid { get; set; }
        public Int32 discount { get; set; }

        public string partnername { get; set; }

        public string mobileno { get; set; }

        public string Couponid { get; set; }
        public string district { get; set; }
        public string email { get; set; }
        public string whatsappno { get; set; }

        public Int32 createdby { get; set; }
        public bool Status { get; set; }
        public string Message { get; set; }
    }
    public class GetPartnerEditResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetPartnerEditData> data { get; set; }
    }
}
