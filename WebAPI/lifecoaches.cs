using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
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
    [Route("api/lifecoaches")]
    public class lifecoaches : Controller
    {
        IConfiguration _iconfiguration;
        private IHostingEnvironment _hostingEnvironment;

        string pdffilename = "";
        string pdfpath = "";
        string guid = "";


        string photoguid = "";
        string pdfguid = "";
        public lifecoaches(IConfiguration iconfiguration, IHostingEnvironment hosting)
        {
            _iconfiguration = iconfiguration;
            _hostingEnvironment = hosting;
        }

        //bind topic
        [HttpGet]
        [Route("BindTopic")]
        public string BindTopic()
        {
            DataSet ds = new DataSet();
            string json = "";
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindTopic", con);
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

        //bind career
        [HttpGet]
        [Route("BindCareer")]
        public string BindCareer()
        {
            DataSet ds = new DataSet();
            string json = "";
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("bindcareer", con);
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

        //save life coaches
        [HttpPost]
        [Route("savelifecoachesdata")]
        public async Task<IActionResult> Savelifecoachesdata([FromForm] IFormFile photo, [FromForm] string coachtype,
      [FromForm] string coachname, [FromForm] string mobileno, [FromForm] string orgphotoname,
      [FromForm] string email, [FromForm] string fbid, [FromForm] string linkedin, [FromForm] string careerid,
       [FromForm] string description, string createdby)
        {
            string json = "";
            string result = "";
            int maxid = 0;
            string qry = "";
            string uploadDirectory = "";
      
            DataSet ds = new DataSet();
            DataSet ds1 = new DataSet();
            LifeCoachResponse objppfr = new LifeCoachResponse();
            LifeCoachParam objppfp = new LifeCoachParam();



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

                    //var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploadcoachphoto");
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


            objppfp.coachtypeid = Convert.ToInt32(coachtype);
            objppfp.coachname = Convert.ToString(coachname);
            objppfp.mobileno = Convert.ToString(mobileno);
            objppfp.email = Convert.ToString(email);
            objppfp.fbid = Convert.ToString(fbid);
            objppfp.linkedinid = Convert.ToString(linkedin);
            objppfp.careerid = Convert.ToString(careerid);
     
            objppfp.description = Convert.ToString(description);
            objppfp.createdby = Convert.ToInt32(createdby);
            if (orgphotoname == null)
            {
                objppfp.orgphotoname = "";
            }
            else
            {
                objppfp.orgphotoname = Convert.ToString(orgphotoname);
            }
           


            char[] spearator = { ',', ' ' };


            string[] careerlist = objppfp.careerid.Split(spearator,
               StringSplitOptions.RemoveEmptyEntries);

            try
            {
                if (photoguid == "")
                {
                    objppfp.newpgotoname = "";
                }
                else
                {
                    objppfp.newpgotoname = photoguid;
                }
               

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("saveplifecoachesdatanew", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("interviewid_d", objppfp.interviewid);
                cmd.Parameters.AddWithValue("coachtype_d", objppfp.coachtypeid);
                cmd.Parameters.AddWithValue("coachname_d", objppfp.coachname);
                cmd.Parameters.AddWithValue("mobileno_d", objppfp.mobileno);
                cmd.Parameters.AddWithValue("fbid_d", objppfp.fbid);
                cmd.Parameters.AddWithValue("linkedin_d", objppfp.linkedinid);
                cmd.Parameters.AddWithValue("email_d", objppfp.email);
                cmd.Parameters.AddWithValue("orgphotoname_d", objppfp.orgphotoname);
                cmd.Parameters.AddWithValue("newphotoname_d", objppfp.newpgotoname);
                cmd.Parameters.AddWithValue("careerid_d", objppfp.careerid);
                cmd.Parameters.AddWithValue("description_d", objppfp.description);
                cmd.Parameters.AddWithValue("created_by", objppfp.createdby);
                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();

                try
                {
                    if (careerlist.Length > 0)
                    {

                        qry = "SELECT MAX(interviewid) as int_id FROM tbl_lifecoaches_interview";

                        MySqlCommand cmd1 = new MySqlCommand(qry, con);

                        MySqlDataAdapter da1 = new MySqlDataAdapter();
                        da1.SelectCommand = cmd1;
                        da1.Fill(ds1);
                        con.Close();
                        if (ds1.Tables[0].Rows.Count > 0)
                        {
                            maxid = Convert.ToInt32(ds1.Tables[0].Rows[0]["int_id"]);
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

                if (careerlist.Length > 0)
                {
                    Execqry("delete from tbl_lifecoachcareer where lifecoachid=" + maxid);
                    for (int i = 0; i < careerlist.Length; i++)
                    {

                        Execqry("insert into tbl_lifecoachcareer(lifecoachid,careerid)values(" + maxid + ", " + Convert.ToInt32(careerlist[i]) + ")");
                    }

                }
              
                //save data in other table end


                //con.Close();
                objppfr.Status = true;
                objppfr.Message = result;


            }
            catch (Exception e)
            {
                objppfr.Status = false;
                objppfr.Message = e.Message;
            }

            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(objppfr, settings);
            return Ok(JsonConvert.SerializeObject(json, Formatting.Indented));
        }

        
        //common class insert api
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

        //get data for bind table
        [HttpGet]
        [Route("BindInterviewData")]
        public string BindInterviewData()
        {
            string json = "";
            DataSet ds = new DataSet();
            GetSavedLifecoachesDataResponse ObjGSPDR = new GetSavedLifecoachesDataResponse();
            List<GetSavedlifecoachesData> ListGSPD = new List<GetSavedlifecoachesData>();

            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Getlifecoachdata", con);
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
                        GetSavedlifecoachesData ObjGSPD = new GetSavedlifecoachesData();

                        ObjGSPD.interviewid = Convert.ToInt32(row["interviewid"]);
                        ObjGSPD.coachtypeid = Convert.ToInt32(row["coachtypeid"]);
                        ObjGSPD.coachtype = Convert.ToString(row["coachtype"]);
                        ObjGSPD.coachname = Convert.ToString(row["coachname"]);
                        ObjGSPD.mobileno = Convert.ToString(row["mobileno"]);

                        ObjGSPD.email =Convert.ToString(row["email"]);


                        ObjGSPD.fbid = Convert.ToString(row["fbid"]);
                        ObjGSPD.linkedinid = Convert.ToString(row["linkedin"]);
                        ObjGSPD.careername = Convert.ToString(row["careerid"]);
                        ObjGSPD.description = Convert.ToString(row["description"]);

                       
                        

                      
                        if (Convert.ToString(row["photo"]) == "")
                        {
                            ObjGSPD.photo = "";
                        }
                        else
                        {
                            ObjGSPD.photo = "http://admin.careerprabhu.com/" + "uploadcoachphoto/" + Convert.ToString(row["photo"]);
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

        //edit data
        //edit data
        [HttpGet]
        [Route("GetEditData")]
        public string GetEditedData([FromHeader] Geteditrecord obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetEditResponse ObjGER = new GetEditResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("editcoach", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("interviewid_id", obj.interviewid);
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

                    ObjGED.interviewid = Convert.ToInt32(ds.Tables[0].Rows[0]["interviewid"]);
                    ObjGED.coachtypeid = Convert.ToInt32(ds.Tables[0].Rows[0]["coachtypeid"]);
                
                    ObjGED.coachname = Convert.ToString(ds.Tables[0].Rows[0]["coachname"]);
                    ObjGED.mobileno = Convert.ToString(ds.Tables[0].Rows[0]["mobileno"]);

                    ObjGED.email = Convert.ToString(ds.Tables[0].Rows[0]["email"]);


                    ObjGED.fbid = Convert.ToString(ds.Tables[0].Rows[0]["fbid"]);
                    ObjGED.linkedinid = Convert.ToString(ds.Tables[0].Rows[0]["linkedin"]);
                    ObjGED.careerid = Convert.ToString(ds.Tables[0].Rows[0]["careerid"]);
                    ObjGED.description = Convert.ToString(ds.Tables[0].Rows[0]["description"]);

               
            


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

        //update life coaches

        [HttpPost]
        [Route("updatelifecoachesdata")]
        public async Task<IActionResult> Updatelifecoachesdata([FromForm] IFormFile photo, [FromForm] string coachtype,
      [FromForm] string coachname, [FromForm] string mobileno, [FromForm] string orgphotoname,
      [FromForm] string email, [FromForm] string fbid, [FromForm] string linkedin, [FromForm] string careerid,
       [FromForm] string description, [FromForm] string createdby, [FromForm] string interviewid)

        {
            string json = "";
            string result = "";
            int maxid = 0;
            string qry = "";
            string uploadDirectory = "";
            string uploadDirectorypdf = "";
            DataSet ds = new DataSet();
            DataSet ds1 = new DataSet();
            LifeCoachResponse objppfr = new LifeCoachResponse();
            LifeCoachParam objppfp = new LifeCoachParam();



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

                    //var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploadcoachphoto");
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

            objppfp.interviewid = Convert.ToInt32(interviewid);
            objppfp.coachtypeid = Convert.ToInt32(coachtype);
            objppfp.coachname = Convert.ToString(coachname);
            objppfp.mobileno = Convert.ToString(mobileno);
            objppfp.email = Convert.ToString(email);
            objppfp.fbid = Convert.ToString(fbid);
            objppfp.linkedinid = Convert.ToString(linkedin);
            objppfp.careerid = Convert.ToString(careerid);
      
            objppfp.description = Convert.ToString(description);
            objppfp.createdby = Convert.ToInt32(createdby);
            if (orgphotoname == null)
            {
                objppfp.orgphotoname = "";
            }
            else
            {
                objppfp.orgphotoname = Convert.ToString(orgphotoname);
            }
         


            char[] spearator = { ',', ' ' };


            string[] careerlist = objppfp.careerid.Split(spearator,
               StringSplitOptions.RemoveEmptyEntries);

            try
            {
                if (photoguid == "")
                {
                    objppfp.newpgotoname = "";
                }
                else
                {
                    objppfp.newpgotoname = photoguid;
                }
            

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("updateplifecoachesdatanew", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("interviewid_d", objppfp.interviewid);
                cmd.Parameters.AddWithValue("coachtype_d", objppfp.coachtypeid);
                cmd.Parameters.AddWithValue("coachname_d", objppfp.coachname);
                cmd.Parameters.AddWithValue("mobileno_d", objppfp.mobileno);
                cmd.Parameters.AddWithValue("fbid_d", objppfp.fbid);
                cmd.Parameters.AddWithValue("linkedin_d", objppfp.linkedinid);
                cmd.Parameters.AddWithValue("email_d", objppfp.email);
                cmd.Parameters.AddWithValue("orgphotoname_d", objppfp.orgphotoname);
                cmd.Parameters.AddWithValue("newphotoname_d", objppfp.newpgotoname);
                cmd.Parameters.AddWithValue("careerid_d", objppfp.careerid);
                cmd.Parameters.AddWithValue("description_d", objppfp.description);
                cmd.Parameters.AddWithValue("created_by", objppfp.createdby);
                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();


                if (result == "Success")
                {
                    if (careerlist.Length > 0)
                    {
                        Execqry("delete from tbl_lifecoachcareer where lifecoachid=" + objppfp.interviewid);
                        for (int i = 0; i < careerlist.Length; i++)
                        {

                            Execqry("insert into tbl_lifecoachcareer(lifecoachid,careerid)values(" + objppfp.interviewid + ", " + Convert.ToInt32(careerlist[i]) + ")");
                        }

                    }
                }


                //con.Close();
                objppfr.Status = true;
                objppfr.Message = result;


            }
            catch (Exception e)
            {
                objppfr.Status = false;
                objppfr.Message = e.Message;
            }

            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(objppfr, settings);
            return Ok(JsonConvert.SerializeObject(json, Formatting.Indented));

        }


        //delete coach
        [HttpPost]
        [Route("DeleteActivity")]
        public string DeleteActivities([FromBody] InterviewLifecoachesParam obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            PersonalLifecoachesResponse ObjAMR = new PersonalLifecoachesResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Deletecoach", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("interviewid_id", obj.interviewid);

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

    }

    //classes for life coaches
   
    public class PersonalLifecoachesResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
    }

    public class InterviewLifecoachesParam
    {
        public Int32 interviewid { get; set; }
        public Int32 createdby { get; set; }
    }


    public class PersonalLifecoachesParam
    {

        public Int32 coachid { get; set; } = 0;
        public Int32 careerid { get; set; } = 0;
        public Int32 topicid { get; set; } = 0;
        
        public string videolink { get; set; } = "";

        public string orgpdfname { get; set; } = "";
        public string newpdfname { get; set; } = "";

        public Int32 createdby { get; set; }
        public string message { get; set; } = "";
        public string pdftoupload { get; set; }

    }
    //class for bind table
    public class GetSavedLifecoachesDataResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }

        public List<GetSavedlifecoachesData> data { get; set; }

    }
    public class GetSavedlifecoachesData
    {
        public Int32 interviewid { get; set; }
        public Int32 coachtypeid { get; set; }
        public string coachname { get; set; }
        public string coachtype { get; set; }
        public string mobileno { get; set; }
        public string email { get; set; }
        public string fbid { get; set; }
        public string linkedinid { get; set; }
        public string photo { get; set; }
        public string careername { get; set; }
        public string description { get; set; }
        public string title { get; set; }
        public string subtitle { get; set; }
        public string pdf { get; set; }


    }
    //edit class
    public class Geteditrecord
    {

        public Int32 interviewid { get; set; }

    }
    public class GetEditResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public GetEditData data { get; set; }
    }
    public class GetEditData
    {
        public Int32 interviewid { get; set; }
        public Int32 coachtypeid { get; set; }
        public string coachname { get; set; }

        public string mobileno { get; set; }
        public string email { get; set; }
        public string fbid { get; set; }
        public string linkedinid { get; set; }

        public string careerid { get; set; }
        public string description { get; set; }
        public string title { get; set; }
        public string subtitle { get; set; }
     

    }
    public class LifeCoachResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
    }
    public class LifeCoachParam
    {

        public Int32 interviewid { get; set; } = 0;
        public Int32 coachtypeid { get; set; }
        public string coachname { get; set; } = "";
        public string mobileno { get; set; } = "";
        public string email { get; set; } = "";
        public string fbid { get; set; } = "";
        public string linkedinid { get; set; } = "";
        public string orgphotoname { get; set; } = "";
        public string orgpdfname { get; set; } = "";
        public string newpgotoname { get; set; } = "";
        public string newpdfname { get; set; } = "";
        public string careerid { get; set; } = "";
        public string title { get; set; } = "";
        public string subtitle { get; set; } = "";
        public string description { get; set; } = "";
        public Int32 createdby { get; set; }
        public string message { get; set; } = "";


    }
}
