using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
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
    [Route("api/lifecoachactivity")]
    public class Lifecoachactivity : Controller
    {
        IConfiguration _iconfiguration;
        private IHostingEnvironment _hostingEnvironment;
        public Lifecoachactivity(IConfiguration iconfiguration, IHostingEnvironment hosting)
        {
            _iconfiguration = iconfiguration;
            _hostingEnvironment = hosting;
        }


        //Api for bind coachtype

        [HttpGet]
        [Route("BindCoachType")]
        public string BindCoachType()
        {
            CoachtypeResponse GIAR = new CoachtypeResponse();
            List<CoachTypeData> ListGIAD = new List<CoachTypeData>();
            string json = "";
            DataSet ds = new DataSet();
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
                if (ds.Tables[0].Rows.Count > 0)
                {
                    GIAR.Status = true;
                    GIAR.Message = "Data Found";
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        CoachTypeData GIAD = new CoachTypeData();
                        GIAD.topicid = Convert.ToInt32(row["ID"]);
                        GIAD.topiname = Convert.ToString(row["topic"]);
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



        //API for bind coach
        [HttpPost]
        [Route("BindCoach")]
        public string BindCoach([FromBody] GetCoachData data)
        {
            CoachResponse GSR = new CoachResponse();
            List<CoachData> ListGSD = new List<CoachData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("bindcoach", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("Coachtypeid_id", data.coachtypeid);
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
                        CoachData GSD = new CoachData();
                        GSD.interviewid = Convert.ToInt32(row["interviewid"]);
                        GSD.coachname = Convert.ToString(row["coachname"]);
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


        //API for save data
        [HttpPost]
        [Route("saveinterviewdata")]
        public async Task<IActionResult> saveinterviewdata([FromForm] IFormFile pdf, [FromForm] string lifeinterviewid,
       [FromForm] string coachtypeid, [FromForm] string orgpdfname, [FromForm] string coachname, [FromForm] string title, [FromForm] string videourl,
       [FromForm] string subtitle, [FromForm] string createdby)

        {
            string json = "";
            string result = "";
            string prevpdfguid = "";
            string pdffilename = "";

            DataSet ds = new DataSet();
            SaveActivityResponse objppfr = new SaveActivityResponse();
            InterviewParam objppfp = new InterviewParam();


            if(pdf != null)
            {
                try
                {
                    prevpdfguid = Guid.NewGuid().ToString();
                    pdffilename = prevpdfguid + pdf.FileName;

                    var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "lifecoachactivity");
                    if (pdf.Length > 0)
                    {
                        var filePath = Path.Combine(uploads, pdffilename);

                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            await pdf.CopyToAsync(fileStream);
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
                prevpdfguid = "";
                pdffilename = "";
            }

            objppfp.coachtypeid = Convert.ToInt32(coachtypeid);
            objppfp.coachname = Convert.ToInt32(coachname);
            objppfp.title = Convert.ToString(title);
            objppfp.subtitle = Convert.ToString(subtitle);
     
            objppfp.createdby = Convert.ToInt32(createdby);
            if(orgpdfname == "" || orgpdfname ==null)
            {
                objppfp.orgfilename = "";
            }
            else
            {
                objppfp.orgfilename = Convert.ToString(orgpdfname);
            }


            try
            {
                if(prevpdfguid == "")
                {
                    prevpdfguid = "";
                }
                else
                {
                    objppfp.newfilename = prevpdfguid;
                }
 
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("saveplifeinterviewactivity", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("lifeinterviewid_d", objppfp.lifeinterviewid);
                cmd.Parameters.AddWithValue("coachtypeid_d", objppfp.coachtypeid);
                cmd.Parameters.AddWithValue("coachname_d", objppfp.coachname);
                cmd.Parameters.AddWithValue("title_d", objppfp.title);
                cmd.Parameters.AddWithValue("subtitle_d", objppfp.subtitle);


                cmd.Parameters.AddWithValue("url_d", (videourl==null || videourl == "") ? "":videourl);

                cmd.Parameters.AddWithValue("orgpdfname_d", objppfp.orgfilename);
                cmd.Parameters.AddWithValue("newpdfname_d", objppfp.newfilename);

                cmd.Parameters.AddWithValue("created_by", objppfp.createdby);
                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();
                con.Close();
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


        //APi for bind table data
        [HttpGet]
        [Route("Bindtabledata")]
        public string Bindtabledata()
        {
            string json = "";
            DataSet ds = new DataSet();
            LifeInterviewDataResponse ObjGSPDR = new LifeInterviewDataResponse();
            List<LifeInteviewData> ListGSPD = new List<LifeInteviewData>();

            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getlifeinterviewdata", con);
                cmd.CommandType = CommandType.StoredProcedure;

                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGSPDR.Statue = true;
                    ObjGSPDR.Message = "Data Found";
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        LifeInteviewData ObjGSPD = new LifeInteviewData();

                        ObjGSPD.liveinterviewid = Convert.ToInt32(row["lifeinterviewid"]);
                        ObjGSPD.coachtype = Convert.ToString(row["coachtype"]);
                        ObjGSPD.coachname = Convert.ToString(row["coachname"]);
                        ObjGSPD.title = Convert.ToString(row["title"]);
                        ObjGSPD.subtitle = Convert.ToString(row["subtitle"]);

                        if(Convert.ToString(row["videourl"]) == null || Convert.ToString(row["videourl"]) == "")
                        {
                            ObjGSPD.videourl = "N/A";

                        }
                        else
                        {
                            ObjGSPD.videourl = Convert.ToString(row["videourl"]);

                        }

                        ObjGSPD.docname = "http://admin.careerprabhu.com/" + "lifecoachactivity/" + Convert.ToString(row["docname"]);

                        if (Convert.ToString(row["docname"]) == "" || Convert.ToString(row["docname"]) == null)
                        {
                            ObjGSPD.docname = "";
                        }
                       
                        ListGSPD.Add(ObjGSPD);
                    }
                    ObjGSPDR.data = ListGSPD;
                }
                else
                {
                    ObjGSPDR.Statue = false;
                    ObjGSPDR.Message = "Something went wrong";
                }
            }
            catch (Exception e)
            {
                ObjGSPDR.Statue = false;
                ObjGSPDR.Message = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(ObjGSPDR, settings);
            return json;
        }

        //API for edit data
        [HttpGet]
        [Route("GetEditInterviewData")]
        public string GetEditInterviewData([FromHeader] GetInterviewEditData obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetInterviewEditResponse ObjGER = new GetInterviewEditResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("editLifeinterviewdata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("lifeinterview_d", obj.lifeinterviewid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGER.Status = true;
                    ObjGER.Message = "Data Found";
                    GetInterviewEditData ObjGED = new GetInterviewEditData();

                    ObjGED.lifeinterviewid = Convert.ToInt32(ds.Tables[0].Rows[0]["lifeinterviewid"]);

                    ObjGED.coachtypeid = Convert.ToInt32(ds.Tables[0].Rows[0]["coachtypeid"]);
                    ObjGED.coachid = Convert.ToInt32(ds.Tables[0].Rows[0]["coachid"]);
                    ObjGED.title = Convert.ToString(ds.Tables[0].Rows[0]["title"]);
                    ObjGED.subtitle = Convert.ToString(ds.Tables[0].Rows[0]["subtitle"]);

                    if (Convert.ToString(ds.Tables[0].Rows[0]["videourl"]) == null || Convert.ToString(ds.Tables[0].Rows[0]["videourl"]) == "")
                    {
                        ObjGED.videourl ="";

                    }
                    else
                    {
                        ObjGED.videourl = Convert.ToString(ds.Tables[0].Rows[0]["videourl"]);

                    }

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


        //API for update 
        [HttpPost]
        [Route("updateinterviewdata")]
        public async Task<IActionResult> updateinterviewdata([FromForm] IFormFile pdf, [FromForm] string lifeinterviewid,
       [FromForm] string coachtypeid, [FromForm] string orgpdfname, [FromForm] string coachname, [FromForm] string title, [FromForm] string videourl,
       [FromForm] string subtitle, [FromForm] string createdby)

        {
            string json = "";
            string result = "";
            string prevpdfguid = "";
            string pdffilename = "";

            DataSet ds = new DataSet();
            SaveActivityResponse objppfr = new SaveActivityResponse();
            InterviewParam objppfp = new InterviewParam();


            if (pdf != null)
            {
                try
                {
                    prevpdfguid = Guid.NewGuid().ToString();
                    pdffilename = prevpdfguid + pdf.FileName;

                    var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "lifecoachactivity");
                    if (pdf.Length > 0)
                    {
                        var filePath = Path.Combine(uploads, pdffilename);

                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            await pdf.CopyToAsync(fileStream);
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
                prevpdfguid = "";
                pdffilename = "";
            }
            objppfp.lifeinterviewid = Convert.ToInt32(lifeinterviewid);
            objppfp.coachtypeid = Convert.ToInt32(coachtypeid);
            objppfp.coachname = Convert.ToInt32(coachname);
            objppfp.title = Convert.ToString(title);
            objppfp.subtitle = Convert.ToString(subtitle);

            objppfp.createdby = Convert.ToInt32(createdby);
            if (orgpdfname == "" || orgpdfname == null)
            {
                objppfp.orgfilename = "";
            }
            else
            {
                objppfp.orgfilename = Convert.ToString(orgpdfname);
            }

            try
            {
                if (prevpdfguid == "")
                {
                    prevpdfguid = "";
                }
                else
                {
                    objppfp.newfilename = prevpdfguid;
                }

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("updatelifeinterview", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("lifeinterviewid_d", objppfp.lifeinterviewid);
                cmd.Parameters.AddWithValue("coachtypeid_d", objppfp.coachtypeid);
                cmd.Parameters.AddWithValue("coachname_d", objppfp.coachname);
                cmd.Parameters.AddWithValue("title_d", objppfp.title);
                cmd.Parameters.AddWithValue("subtitle_d", objppfp.subtitle);
                cmd.Parameters.AddWithValue("url_d", (videourl== null || videourl == "") ?"":videourl);

                cmd.Parameters.AddWithValue("orgpdfname_d", objppfp.orgfilename);
                cmd.Parameters.AddWithValue("newpdfname_d", objppfp.newfilename);

                cmd.Parameters.AddWithValue("created_by", objppfp.createdby);
                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();
                con.Close();
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


        //API for delete data 

        [HttpPost]
        [Route("Deleteinterviewdata")]
        public string Deleteinterviewdata([FromBody] InterviewParam obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            SaveActivityResponse ObjAMR = new SaveActivityResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("deleteinterviewdata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("interviewid_id", obj.lifeinterviewid);


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



        //API for journey section starts here
        [HttpPost]
        [Route("savejourneydata")]
        public async Task<IActionResult> savejourneydata([FromForm] IFormFile pdf, [FromForm] string journeyid,
      [FromForm] string coachtypeid, [FromForm] string orgpdfname, [FromForm] string coachname, [FromForm] string title, [FromForm] string videourl,
      [FromForm] string subtitle, [FromForm] string createdby)

        {
            string json = "";
            string result = "";
            string prevpdfguid = "";
            string pdffilename = "";

            DataSet ds = new DataSet();
            SaveJourneyResponse objppfr = new SaveJourneyResponse();
            journeyParam objppfp = new journeyParam();


            if (pdf != null)
            {
                try
                {
                    prevpdfguid = Guid.NewGuid().ToString();
                    pdffilename = prevpdfguid + pdf.FileName;

                    var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "lifecoachactivity");
                    if (pdf.Length > 0)
                    {
                        var filePath = Path.Combine(uploads, pdffilename);

                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            await pdf.CopyToAsync(fileStream);
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
                prevpdfguid = "";
                pdffilename = "";
            }

            objppfp.coachtypeid = Convert.ToInt32(coachtypeid);
            objppfp.coachname = Convert.ToInt32(coachname);
            objppfp.title = Convert.ToString(title);
            objppfp.subtitle = Convert.ToString(subtitle);

            objppfp.createdby = Convert.ToInt32(createdby);
            if (orgpdfname == "" || orgpdfname == null)
            {
                objppfp.orgfilename = "";
            }
            else
            {
                objppfp.orgfilename = Convert.ToString(orgpdfname);
            }


            try
            {
                if (prevpdfguid == "")
                {
                    prevpdfguid = "";
                }
                else
                {
                    objppfp.newfilename = prevpdfguid;
                }

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("saveplifejourneyactivity", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("journeyid_d", objppfp.journeyid);
                cmd.Parameters.AddWithValue("coachtypeid_d", objppfp.coachtypeid);
                cmd.Parameters.AddWithValue("coachname_d", objppfp.coachname);
                cmd.Parameters.AddWithValue("title_d", objppfp.title);
                cmd.Parameters.AddWithValue("subtitle_d", objppfp.subtitle);

                cmd.Parameters.AddWithValue("url_d", (videourl==null || videourl == "") ? "":videourl);


                cmd.Parameters.AddWithValue("orgpdfname_d", objppfp.orgfilename);
                cmd.Parameters.AddWithValue("newpdfname_d", objppfp.newfilename);

                cmd.Parameters.AddWithValue("created_by", objppfp.createdby);
                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();
                con.Close();
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


        [HttpGet]
        [Route("Bindjourneytabledata")]
        public string Bindjourneytabledata()
        {
            string json = "";
            DataSet ds = new DataSet();
            JourneyDataResponse ObjGSPDR = new JourneyDataResponse();
            List<GetJourneyData> ListGSPD = new List<GetJourneyData>();

            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getjourneydata_new", con);
                cmd.CommandType = CommandType.StoredProcedure;

                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGSPDR.Statue = true;
                    ObjGSPDR.Message = "Data Found";
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        GetJourneyData ObjGSPD = new GetJourneyData();

                        ObjGSPD.journeyid = Convert.ToInt32(row["journeyid"]);
                        ObjGSPD.coachtype = Convert.ToString(row["coachtype"]);
                        ObjGSPD.coachname = Convert.ToString(row["coachname"]);
                        ObjGSPD.title = Convert.ToString(row["title"]);
                        ObjGSPD.subtitle = Convert.ToString(row["subtitle"]);

                        if(Convert.ToString(row["videourl"]) == null || Convert.ToString(row["videourl"]) == null)
                        {
                            ObjGSPD.videourl = "N/A";
                        }
                        else
                        {
                            ObjGSPD.videourl = Convert.ToString(row["videourl"]);

                        }


                        ObjGSPD.docname = "http://admin.careerprabhu.com/" + "lifecoachactivity/" + Convert.ToString(row["docname"]);

                        if (Convert.ToString(row["docname"]) == "" || Convert.ToString(row["docname"]) == null)
                        {
                            ObjGSPD.docname = "";
                        }

                        ListGSPD.Add(ObjGSPD);
                    }
                    ObjGSPDR.data = ListGSPD;
                }
                else
                {
                    ObjGSPDR.Statue = false;
                    ObjGSPDR.Message = "Something went wrong";
                }
            }
            catch (Exception e)
            {
                ObjGSPDR.Statue = false;
                ObjGSPDR.Message = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(ObjGSPDR, settings);
            return json;
        }



        [HttpGet]
        [Route("GetEditjourneyData")]
        public string GetEditjourneyData([FromHeader] GetJourneyEditData obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetJOurneyEditResponse ObjGER = new GetJOurneyEditResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("editJourneydata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("journeyid_d", obj.journeyid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGER.Status = true;
                    ObjGER.Message = "Data Found";
                    GetJourneyEditData ObjGED = new GetJourneyEditData();

                    ObjGED.journeyid = Convert.ToInt32(ds.Tables[0].Rows[0]["journeyid"]);

                    ObjGED.coachtypeid = Convert.ToInt32(ds.Tables[0].Rows[0]["coachtypeid"]);
                    ObjGED.coachid = Convert.ToInt32(ds.Tables[0].Rows[0]["coachid"]);
                    ObjGED.title = Convert.ToString(ds.Tables[0].Rows[0]["title"]);
                    ObjGED.subtitle = Convert.ToString(ds.Tables[0].Rows[0]["subtitle"]);
                    if(Convert.ToString(ds.Tables[0].Rows[0]["videourl"]) == null || Convert.ToString(ds.Tables[0].Rows[0]["videourl"]) == "")
                    {
                        ObjGED.videourl = "";

                    }
                    else
                    {
                        ObjGED.videourl = Convert.ToString(ds.Tables[0].Rows[0]["videourl"]);

                    }

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
        [Route("updatejourneydata")]
        public async Task<IActionResult> updatejourneydata([FromForm] IFormFile pdf, [FromForm] string journeyid,
      [FromForm] string coachtypeid, [FromForm] string orgpdfname, [FromForm] string coachname, [FromForm] string title, [FromForm] string videourl,
      [FromForm] string subtitle, [FromForm] string createdby)

        {
            string json = "";
            string result = "";
            string prevpdfguid = "";
            string pdffilename = "";

            DataSet ds = new DataSet();
            SaveJourneyResponse objppfr = new SaveJourneyResponse();
            journeyParam objppfp = new journeyParam();


            if (pdf != null)
            {
                try
                {
                    prevpdfguid = Guid.NewGuid().ToString();
                    pdffilename = prevpdfguid + pdf.FileName;

                    var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "lifecoachactivity");
                    if (pdf.Length > 0)
                    {
                        var filePath = Path.Combine(uploads, pdffilename);

                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            await pdf.CopyToAsync(fileStream);
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
                prevpdfguid = "";
                pdffilename = "";
            }
            objppfp.journeyid = Convert.ToInt32(journeyid);
            objppfp.coachtypeid = Convert.ToInt32(coachtypeid);
            objppfp.coachname = Convert.ToInt32(coachname);
            objppfp.title = Convert.ToString(title);
            objppfp.subtitle = Convert.ToString(subtitle);

            objppfp.createdby = Convert.ToInt32(createdby);
            if (orgpdfname == "" || orgpdfname == null)
            {
                objppfp.orgfilename = "";
            }
            else
            {
                objppfp.orgfilename = Convert.ToString(orgpdfname);
            }

            try
            {
                if (prevpdfguid == "")
                {
                    prevpdfguid = "";
                }
                else
                {
                    objppfp.newfilename = prevpdfguid;
                }

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("updatejourney", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("journeyid_d", objppfp.journeyid);
                cmd.Parameters.AddWithValue("coachtypeid_d", objppfp.coachtypeid);
                cmd.Parameters.AddWithValue("coachname_d", objppfp.coachname);
                cmd.Parameters.AddWithValue("title_d", objppfp.title);
                cmd.Parameters.AddWithValue("subtitle_d", objppfp.subtitle);
                cmd.Parameters.AddWithValue("url_d", (videourl ==null || videourl == "") ?"":videourl);

                cmd.Parameters.AddWithValue("orgpdfname_d", objppfp.orgfilename);
                cmd.Parameters.AddWithValue("newpdfname_d", objppfp.newfilename);

                cmd.Parameters.AddWithValue("created_by", objppfp.createdby);
                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();
                con.Close();
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



        [HttpPost]
        [Route("Deletejourneydata")]
        public string Deletejourneydata([FromBody] journeyParam obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            SaveActivityResponse ObjAMR = new SaveActivityResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("deletejourneydata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("journeyid_id", obj.journeyid);


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

        //API for save article data
        [HttpPost]
        [Route("savearticledata")]
        public async Task<IActionResult> savearticledata([FromForm] IFormFile pdf, [FromForm] string articleid,
      [FromForm] string coachtypeid, [FromForm] string orgpdfname, [FromForm] string coachname, [FromForm] string title, [FromForm] string videourl,
      [FromForm] string subtitle, [FromForm] string createdby)

        {
            string json = "";
            string result = "";
            string prevpdfguid = "";
            string pdffilename = "";

            DataSet ds = new DataSet();
            SaveArtileResponse objppfr = new SaveArtileResponse();
            ArticleParam objppfp = new ArticleParam();


            if (pdf != null)
            {
                try
                {
                    prevpdfguid = Guid.NewGuid().ToString();
                    pdffilename = prevpdfguid + pdf.FileName;

                    var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "lifecoachactivity");
                    if (pdf.Length > 0)
                    {
                        var filePath = Path.Combine(uploads, pdffilename);

                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            await pdf.CopyToAsync(fileStream);
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
                prevpdfguid = "";
                pdffilename = "";
            }

            objppfp.coachtypeid = Convert.ToInt32(coachtypeid);
            objppfp.coachname = Convert.ToInt32(coachname);
            objppfp.title = Convert.ToString(title);
            objppfp.subtitle = Convert.ToString(subtitle);

            objppfp.createdby = Convert.ToInt32(createdby);
            if (orgpdfname == "" || orgpdfname == null)
            {
                objppfp.orgfilename = "";
            }
            else
            {
                objppfp.orgfilename = Convert.ToString(orgpdfname);
            }


            try
            {
                if (prevpdfguid == "")
                {
                    prevpdfguid = "";
                }
                else
                {
                    objppfp.newfilename = prevpdfguid;
                }

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("savepactivityactivity", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("articleid_d", objppfp.articleid);
                cmd.Parameters.AddWithValue("coachtypeid_d", objppfp.coachtypeid);
                cmd.Parameters.AddWithValue("coachname_d", objppfp.coachname);
                cmd.Parameters.AddWithValue("title_d", objppfp.title);
                cmd.Parameters.AddWithValue("subtitle_d", objppfp.subtitle);

                cmd.Parameters.AddWithValue("url_d", (videourl ==null || videourl == "") ?"":videourl);


                cmd.Parameters.AddWithValue("orgpdfname_d", objppfp.orgfilename);
                cmd.Parameters.AddWithValue("newpdfname_d", objppfp.newfilename);

                cmd.Parameters.AddWithValue("created_by", objppfp.createdby);
                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();
                con.Close();
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


        [HttpGet]
        [Route("BindArticletabledata")]
        public string BindArticletabledata()
        {
            string json = "";
            DataSet ds = new DataSet();
            ArticleDataResponse ObjGSPDR = new ArticleDataResponse();
            List<GetArticleData> ListGSPD = new List<GetArticleData>();

            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getarticledata_new", con);
                cmd.CommandType = CommandType.StoredProcedure;

                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGSPDR.Statue = true;
                    ObjGSPDR.Message = "Data Found";
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        GetArticleData ObjGSPD = new GetArticleData();

                        ObjGSPD.articleid = Convert.ToInt32(row["articleid"]);
                        ObjGSPD.coachtype = Convert.ToString(row["coachtype"]);
                        ObjGSPD.coachname = Convert.ToString(row["coachname"]);
                        ObjGSPD.title = Convert.ToString(row["title"]);
                        ObjGSPD.subtitle = Convert.ToString(row["subtitle"]);

                        if(Convert.ToString(row["videourl"]) == null || Convert.ToString(row["videourl"]) == "")
                        {
                            ObjGSPD.videourl = "N/A";

                        }
                        else
                        {
                            ObjGSPD.videourl = Convert.ToString(row["videourl"]);

                        }

                        ObjGSPD.docname = "http://admin.careerprabhu.com/" + "lifecoachactivity/" + Convert.ToString(row["docname"]);

                        if (Convert.ToString(row["docname"]) == "" || Convert.ToString(row["docname"]) == null)
                        {
                            ObjGSPD.docname = "";
                        }

                        ListGSPD.Add(ObjGSPD);
                    }
                    ObjGSPDR.data = ListGSPD;
                }
                else
                {
                    ObjGSPDR.Statue = false;
                    ObjGSPDR.Message = "Something went wrong";
                }
            }
            catch (Exception e)
            {
                ObjGSPDR.Statue = false;
                ObjGSPDR.Message = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(ObjGSPDR, settings);
            return json;
        }




        [HttpGet]
        [Route("GetEditArticleidData")]
        public string GetEditArticleidData([FromHeader] GetArticleEditData obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetArticleEditResponse ObjGER = new GetArticleEditResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("editarticledata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("articleid_d", obj.articleid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGER.Status = true;
                    ObjGER.Message = "Data Found";
                    GetArticleEditData ObjGED = new GetArticleEditData();

                    ObjGED.articleid = Convert.ToInt32(ds.Tables[0].Rows[0]["articleid"]);

                    ObjGED.coachtypeid = Convert.ToInt32(ds.Tables[0].Rows[0]["coachtypeid"]);
                    ObjGED.coachid = Convert.ToInt32(ds.Tables[0].Rows[0]["coachid"]);
                    ObjGED.title = Convert.ToString(ds.Tables[0].Rows[0]["title"]);
                    ObjGED.subtitle = Convert.ToString(ds.Tables[0].Rows[0]["subtitle"]);
                    if (Convert.ToString(ds.Tables[0].Rows[0]["videourl"]) =="" || Convert.ToString(ds.Tables[0].Rows[0]["videourl"]) == null)
                    {
                        ObjGED.videourl = "";
                    }
                    else
                    {
                        ObjGED.videourl = Convert.ToString(ds.Tables[0].Rows[0]["videourl"]);
                    }
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
        [Route("updatearticledata")]
        public async Task<IActionResult> updatearticledata([FromForm] IFormFile pdf, [FromForm] string articleid,
   [FromForm] string coachtypeid, [FromForm] string orgpdfname, [FromForm] string coachname, [FromForm] string title, [FromForm] string videourl,
   [FromForm] string subtitle, [FromForm] string createdby)

        {
            string json = "";
            string result = "";
            string prevpdfguid = "";
            string pdffilename = "";

            DataSet ds = new DataSet();
            SaveArtileResponse objppfr = new SaveArtileResponse();
            ArticleParam objppfp = new ArticleParam();


            if (pdf != null)
            {
                try
                {
                    prevpdfguid = Guid.NewGuid().ToString();
                    pdffilename = prevpdfguid + pdf.FileName;

                    var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "lifecoachactivity");
                    if (pdf.Length > 0)
                    {
                        var filePath = Path.Combine(uploads, pdffilename);

                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            await pdf.CopyToAsync(fileStream);
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
                prevpdfguid = "";
                pdffilename = "";
            }
            objppfp.articleid = Convert.ToInt32(articleid);
            objppfp.coachtypeid = Convert.ToInt32(coachtypeid);
            objppfp.coachname = Convert.ToInt32(coachname);
            objppfp.title = Convert.ToString(title);
            objppfp.subtitle = Convert.ToString(subtitle);

            objppfp.createdby = Convert.ToInt32(createdby);
            if (orgpdfname == "" || orgpdfname == null)
            {
                objppfp.orgfilename = "";
            }
            else
            {
                objppfp.orgfilename = Convert.ToString(orgpdfname);
            }

            try
            {
                if (prevpdfguid == "")
                {
                    prevpdfguid = "";
                }
                else
                {
                    objppfp.newfilename = prevpdfguid;
                }

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("updatearticle", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("articleid_d", objppfp.articleid);
                cmd.Parameters.AddWithValue("coachtypeid_d", objppfp.coachtypeid);
                cmd.Parameters.AddWithValue("coachname_d", objppfp.coachname);
                cmd.Parameters.AddWithValue("title_d", objppfp.title);
                cmd.Parameters.AddWithValue("subtitle_d", objppfp.subtitle);
                cmd.Parameters.AddWithValue("url_d", (videourl==null || videourl == "") ?"":videourl);

                cmd.Parameters.AddWithValue("orgpdfname_d", objppfp.orgfilename);
                cmd.Parameters.AddWithValue("newpdfname_d", objppfp.newfilename);

                cmd.Parameters.AddWithValue("created_by", objppfp.createdby);
                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();
                con.Close();
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


        [HttpPost]
        [Route("DeleteArticledata")]
        public string DeleteArticledata([FromBody] ArticleParam obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            SaveArtileResponse objppfr = new SaveArtileResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("deletearticledata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("articleid_id", obj.articleid);


                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();
                con.Close();
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
            return json;
        }





    }
    public class CoachtypeResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<CoachTypeData> data { get; set; }
    }
    public class CoachTypeData
    {
        public Int32 topicid { get; set; }
        public string topiname { get; set; }
    }
    public class GetCoachData
    {
        public Int32 coachtypeid { get; set; }
 
    }
    public class CoachResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<CoachData> data { get; set; }
    }
    public class CoachData
    {
 
        public Int32 interviewid { get; set; }
        public string coachname { get; set; }
    }

    public class SaveActivityResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
    }
    public class InterviewParam
    {

        public Int32 lifeinterviewid { get; set; } = 0;
        public Int32 coachtypeid { get; set; }
        public Int32 coachname { get; set; } = 0;
        public string title { get; set; } = "";
        public string subtitle { get; set; } = "";
     
        public string orgfilename { get; set; } = "";
        public string newfilename { get; set; } = "";


        public Int32 createdby { get; set; }
        public string message { get; set; } = "";


    }

    public class LifeInterviewDataResponse
    {
        public bool Statue { get; set; }
        public string Message { get; set; }

        public List<LifeInteviewData> data { get; set; }


    }
    public class LifeInteviewData
    {
        public Int32 liveinterviewid { get; set; } = 0;
        public string coachtype { get; set; } 
        public string coachname { get; set; } 
        public string title { get; set; } 
        public string subtitle { get; set; }
        public string videourl { get; set; }

        public string orgpdfname { get; set; } 
        public string newpdfname { get; set; } 

        public string docname { get; set; }


    }
    public class GetInterviewEditResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public GetInterviewEditData data { get; set; }
    }
    public class GetInterviewEditData
    {
        public Int32 lifeinterviewid { get; set; } = 0;
        public Int32 coachtypeid { get; set; } = 0;
        public Int32 coachid { get; set; }
        public string title { get; set; } 
        public string subtitle { get; set; }
        public string videourl { get; set; }


    }
    public class SaveJourneyResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
    }
    public class journeyParam
    {

        public Int32 journeyid { get; set; } = 0;
        public Int32 coachtypeid { get; set; }
        public Int32 coachname { get; set; } = 0;
        public string title { get; set; } = "";
        public string subtitle { get; set; } = "";

        public string orgfilename { get; set; } = "";
        public string newfilename { get; set; } = "";


        public Int32 createdby { get; set; }
        public string message { get; set; } = "";


    }
    public class JourneyDataResponse
    {
        public bool Statue { get; set; }
        public string Message { get; set; }

        public List<GetJourneyData> data { get; set; }


    }
    public class GetJourneyData
    {
        public Int32 journeyid { get; set; } = 0;
        public string coachtype { get; set; }
        public string coachname { get; set; }
        public string title { get; set; }
        public string subtitle { get; set; }
        public string videourl { get; set; }

        public string orgpdfname { get; set; }
        public string newpdfname { get; set; }

        public string docname { get; set; }


    }
    public class GetJOurneyEditResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public GetJourneyEditData data { get; set; }
    }
    public class GetJourneyEditData
    {
        public Int32 journeyid { get; set; } = 0;
        public Int32 coachtypeid { get; set; } = 0;
        public Int32 coachid { get; set; }
        public string title { get; set; }
        public string subtitle { get; set; }
        public string videourl { get; set; }


    }
    public class SaveArtileResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
    }
    public class ArticleParam
    {

        public Int32 articleid { get; set; } = 0;
        public Int32 coachtypeid { get; set; }
        public Int32 coachname { get; set; } = 0;
        public string title { get; set; } = "";
        public string subtitle { get; set; } = "";

        public string orgfilename { get; set; } = "";
        public string newfilename { get; set; } = "";


        public Int32 createdby { get; set; }
        public string message { get; set; } = "";


    }
    public class ArticleDataResponse
    {
        public bool Statue { get; set; }
        public string Message { get; set; }

        public List<GetArticleData> data { get; set; }


    }
    public class GetArticleData
    {
        public Int32 articleid { get; set; } = 0;
        public string coachtype { get; set; }
        public string coachname { get; set; }
        public string title { get; set; }
        public string subtitle { get; set; }
        public string videourl { get; set; }
        public string orgpdfname { get; set; }
        public string newpdfname { get; set; }

        public string docname { get; set; }


    }
    public class GetArticleEditResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public GetArticleEditData data { get; set; }
    }
    public class GetArticleEditData
    {
        public Int32 articleid { get; set; } = 0;
        public Int32 coachtypeid { get; set; } = 0;
        public Int32 coachid { get; set; }
        public string title { get; set; }
        public string subtitle { get; set; }
        public string videourl { get; set; }


    }

}
