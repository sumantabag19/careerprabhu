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
    [Route("api/lifecoachesinfo")]
    public class lifecoachesinfo : Controller
    {
        IConfiguration _iconfiguration;
        private IHostingEnvironment _hostingEnvironment;
        public lifecoachesinfo(IConfiguration iconfiguration, IHostingEnvironment hosting)
        {
            _iconfiguration = iconfiguration;
            _hostingEnvironment = hosting;
        }


        //Api for bind coachtype

        [HttpGet]
        [Route("BindCoachType")]
        public string BindCoachType()
        {
            CoachtypeResponses GIAR = new CoachtypeResponses();
            List<CoachTypeDatas> ListGIAD = new List<CoachTypeDatas>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindTopic_new", con);
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
                        CoachTypeDatas GIAD = new CoachTypeDatas();
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
        public string BindCoach([FromBody] GetCoachDatas data)
        {
            CoachResponses GSR = new CoachResponses();
            List<CoachDatas> ListGSD = new List<CoachDatas>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("bindcoach_new", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("Coachtype_d", data.coachtype);
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
                        CoachDatas GSD = new CoachDatas();
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
       [FromForm] string coachtypeid, [FromForm] string orgpdfname, [FromForm] string coachname, [FromForm] string title,
       [FromForm] string subtitle, [FromForm] string createdby)

        {
            string json = "";
            string result = "";
            string prevpdfguid = "";
            string pdffilename = "";

            DataSet ds = new DataSet();
            SaveActivityResponses objppfr = new SaveActivityResponses();
            InterviewParams objppfp = new InterviewParams();


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
                MySqlCommand cmd = new MySqlCommand("saveplifeinterviewactivity_new", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("lifeinterviewid_d", objppfp.lifeinterviewid);
                cmd.Parameters.AddWithValue("coachtypeid_d", objppfp.coachtypeid);
                cmd.Parameters.AddWithValue("coachname_d", objppfp.coachname);
                cmd.Parameters.AddWithValue("title_d", objppfp.title);
                cmd.Parameters.AddWithValue("subtitle_d", objppfp.subtitle);



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
            LifeInterviewDataResponses ObjGSPDR = new LifeInterviewDataResponses();
            List<LifeInteviewDatas> ListGSPD = new List<LifeInteviewDatas>();

            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getlifeinterviewdata_new", con);
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
                        LifeInteviewDatas ObjGSPD = new LifeInteviewDatas();

                        ObjGSPD.liveinterviewid = Convert.ToInt32(row["lifeinterviewid"]);
                        ObjGSPD.coachtype = Convert.ToString(row["coachtype"]);
                        ObjGSPD.coachname = Convert.ToString(row["coachname"]);
                        ObjGSPD.title = Convert.ToString(row["title"]);
                        ObjGSPD.subtitle = Convert.ToString(row["subtitle"]);

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
        public string GetEditInterviewData([FromHeader] GetInterviewEditDatas obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetInterviewEditResponses ObjGER = new GetInterviewEditResponses();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("editLifeinterviewdata_new", con);
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
                    GetInterviewEditDatas ObjGED = new GetInterviewEditDatas();

                    ObjGED.lifeinterviewid = Convert.ToInt32(ds.Tables[0].Rows[0]["lifeinterviewid"]);

                    ObjGED.coachtypeid = Convert.ToInt32(ds.Tables[0].Rows[0]["coachtypeid"]);
                    ObjGED.coachid = Convert.ToInt32(ds.Tables[0].Rows[0]["coachid"]);
                    ObjGED.title = Convert.ToString(ds.Tables[0].Rows[0]["title"]);
                    ObjGED.subtitle = Convert.ToString(ds.Tables[0].Rows[0]["subtitle"]);

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
       [FromForm] string coachtypeid, [FromForm] string orgpdfname, [FromForm] string coachname, [FromForm] string title,
       [FromForm] string subtitle, [FromForm] string createdby)

        {
            string json = "";
            string result = "";
            string prevpdfguid = "";
            string pdffilename = "";

            DataSet ds = new DataSet();
            SaveActivityResponses objppfr = new SaveActivityResponses();
            InterviewParams objppfp = new InterviewParams();


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
                MySqlCommand cmd = new MySqlCommand("updatelifeinterview_new", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("lifeinterviewid_d", objppfp.lifeinterviewid);
                cmd.Parameters.AddWithValue("coachtypeid_d", objppfp.coachtypeid);
                cmd.Parameters.AddWithValue("coachname_d", objppfp.coachname);
                cmd.Parameters.AddWithValue("title_d", objppfp.title);
                cmd.Parameters.AddWithValue("subtitle_d", objppfp.subtitle);

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
        public string Deleteinterviewdata([FromBody] InterviewParams obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            SaveActivityResponses ObjAMR = new SaveActivityResponses();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("deleteinterviewdata_new", con);
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
      [FromForm] string coachtypeid, [FromForm] string orgpdfname, [FromForm] string coachname, [FromForm] string title,
      [FromForm] string subtitle, [FromForm] string createdby)

        {
            string json = "";
            string result = "";
            string prevpdfguid = "";
            string pdffilename = "";

            DataSet ds = new DataSet();
            SaveJourneyResponses objppfr = new SaveJourneyResponses();
            journeyParams objppfp = new journeyParams();


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
                MySqlCommand cmd = new MySqlCommand("saveplifejourneyactivity_new", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("journeyid_d", objppfp.journeyid);
                cmd.Parameters.AddWithValue("coachtypeid_d", objppfp.coachtypeid);
                cmd.Parameters.AddWithValue("coachname_d", objppfp.coachname);
                cmd.Parameters.AddWithValue("title_d", objppfp.title);
                cmd.Parameters.AddWithValue("subtitle_d", objppfp.subtitle);



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
            JourneyDataResponses ObjGSPDR = new JourneyDataResponses();
            List<GetJourneyDatas> ListGSPD = new List<GetJourneyDatas>();

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
                        GetJourneyDatas ObjGSPD = new GetJourneyDatas();

                        ObjGSPD.journeyid = Convert.ToInt32(row["journeyid"]);
                        ObjGSPD.coachtype = Convert.ToString(row["coachtype"]);
                        ObjGSPD.coachname = Convert.ToString(row["coachname"]);
                        ObjGSPD.title = Convert.ToString(row["title"]);
                        ObjGSPD.subtitle = Convert.ToString(row["subtitle"]);

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
        public string GetEditjourneyData([FromHeader] GetJourneyEditDatas obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetJOurneyEditResponses ObjGER = new GetJOurneyEditResponses();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("editJourneydata_new", con);
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
                    GetJourneyEditDatas ObjGED = new GetJourneyEditDatas();

                    ObjGED.journeyid = Convert.ToInt32(ds.Tables[0].Rows[0]["journeyid"]);

                    ObjGED.coachtypeid = Convert.ToInt32(ds.Tables[0].Rows[0]["coachtypeid"]);
                    ObjGED.coachid = Convert.ToInt32(ds.Tables[0].Rows[0]["coachid"]);
                    ObjGED.title = Convert.ToString(ds.Tables[0].Rows[0]["title"]);
                    ObjGED.subtitle = Convert.ToString(ds.Tables[0].Rows[0]["subtitle"]);

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
      [FromForm] string coachtypeid, [FromForm] string orgpdfname, [FromForm] string coachname, [FromForm] string title,
      [FromForm] string subtitle, [FromForm] string createdby)

        {
            string json = "";
            string result = "";
            string prevpdfguid = "";
            string pdffilename = "";

            DataSet ds = new DataSet();
            SaveJourneyResponses objppfr = new SaveJourneyResponses();
            journeyParams objppfp = new journeyParams();


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
                MySqlCommand cmd = new MySqlCommand("updatejourney_new", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("journeyid_d", objppfp.journeyid);
                cmd.Parameters.AddWithValue("coachtypeid_d", objppfp.coachtypeid);
                cmd.Parameters.AddWithValue("coachname_d", objppfp.coachname);
                cmd.Parameters.AddWithValue("title_d", objppfp.title);
                cmd.Parameters.AddWithValue("subtitle_d", objppfp.subtitle);

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
        public string Deletejourneydata([FromBody] journeyParams obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            SaveActivityResponses ObjAMR = new SaveActivityResponses();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("deletejourneydata_new", con);
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
      [FromForm] string coachtypeid, [FromForm] string orgpdfname, [FromForm] string coachname, [FromForm] string title,
      [FromForm] string subtitle, [FromForm] string createdby)

        {
            string json = "";
            string result = "";
            string prevpdfguid = "";
            string pdffilename = "";

            DataSet ds = new DataSet();
            SaveArtileResponses objppfr = new SaveArtileResponses();
            ArticleParams objppfp = new ArticleParams();


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
                MySqlCommand cmd = new MySqlCommand("savepactivityactivity_new", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("articleid_d", objppfp.articleid);
                cmd.Parameters.AddWithValue("coachtypeid_d", objppfp.coachtypeid);
                cmd.Parameters.AddWithValue("coachname_d", objppfp.coachname);
                cmd.Parameters.AddWithValue("title_d", objppfp.title);
                cmd.Parameters.AddWithValue("subtitle_d", objppfp.subtitle);



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
            ArticleDataResponses ObjGSPDR = new ArticleDataResponses();
            List<GetArticleDatas> ListGSPD = new List<GetArticleDatas>();

            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getarticlesdata_new", con);
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
                        GetArticleDatas ObjGSPD = new GetArticleDatas();

                        ObjGSPD.articleid = Convert.ToInt32(row["articleid"]);
                        ObjGSPD.coachtype = Convert.ToString(row["coachtype"]);
                        ObjGSPD.coachname = Convert.ToString(row["coachname"]);
                        ObjGSPD.title = Convert.ToString(row["title"]);
                        ObjGSPD.subtitle = Convert.ToString(row["subtitle"]);

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
        public string GetEditArticleidData([FromHeader] GetArticleEditDatas obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetArticleEditResponses ObjGER = new GetArticleEditResponses();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("editarticledata_new", con);
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
                    GetArticleEditDatas ObjGED = new GetArticleEditDatas();

                    ObjGED.articleid = Convert.ToInt32(ds.Tables[0].Rows[0]["articleid"]);

                    ObjGED.coachtypeid = Convert.ToInt32(ds.Tables[0].Rows[0]["coachtypeid"]);
                    ObjGED.coachid = Convert.ToInt32(ds.Tables[0].Rows[0]["coachid"]);
                    ObjGED.title = Convert.ToString(ds.Tables[0].Rows[0]["title"]);
                    ObjGED.subtitle = Convert.ToString(ds.Tables[0].Rows[0]["subtitle"]);

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
   [FromForm] string coachtypeid, [FromForm] string orgpdfname, [FromForm] string coachname, [FromForm] string title,
   [FromForm] string subtitle, [FromForm] string createdby)

        {
            string json = "";
            string result = "";
            string prevpdfguid = "";
            string pdffilename = "";

            DataSet ds = new DataSet();
            SaveArtileResponses objppfr = new SaveArtileResponses();
            ArticleParams objppfp = new ArticleParams();


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
                MySqlCommand cmd = new MySqlCommand("updatearticle_new", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("articleid_d", objppfp.articleid);
                cmd.Parameters.AddWithValue("coachtypeid_d", objppfp.coachtypeid);
                cmd.Parameters.AddWithValue("coachname_d", objppfp.coachname);
                cmd.Parameters.AddWithValue("title_d", objppfp.title);
                cmd.Parameters.AddWithValue("subtitle_d", objppfp.subtitle);

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
        public string DeleteArticledata([FromBody] ArticleParams obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            SaveArtileResponses objppfr = new SaveArtileResponses();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("deletearticledata_new", con);
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
    public class CoachtypeResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<CoachTypeDatas> data { get; set; }
    }
    public class CoachTypeDatas
    {
        public Int32 topicid { get; set; }
        public string topiname { get; set; }
    }
    public class GetCoachDatas
    {
        public Int32 coachtype { get; set; }

    }
    public class CoachResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<CoachDatas> data { get; set; }
    }
    public class CoachDatas
    {

        public Int32 interviewid { get; set; }
        public string coachname { get; set; }
    }

    public class SaveActivityResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
    }
    public class InterviewParams
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

    public class LifeInterviewDataResponses
    {
        public bool Statue { get; set; }
        public string Message { get; set; }

        public List<LifeInteviewDatas> data { get; set; }


    }
    public class LifeInteviewDatas
    {
        public Int32 liveinterviewid { get; set; } = 0;
        public string coachtype { get; set; }
        public string coachname { get; set; }
        public string title { get; set; }
        public string subtitle { get; set; }

        public string orgpdfname { get; set; }
        public string newpdfname { get; set; }

        public string docname { get; set; }


    }
    public class GetInterviewEditResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public GetInterviewEditDatas data { get; set; }
    }
    public class GetInterviewEditDatas
    {
        public Int32 lifeinterviewid { get; set; } = 0;
        public Int32 coachtypeid { get; set; } = 0;
        public Int32 coachid { get; set; }
        public string title { get; set; }
        public string subtitle { get; set; }


    }
    public class SaveJourneyResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
    }
    public class journeyParams
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
    public class JourneyDataResponses
    {
        public bool Statue { get; set; }
        public string Message { get; set; }

        public List<GetJourneyDatas> data { get; set; }


    }
    public class GetJourneyDatas
    {
        public Int32 journeyid { get; set; } = 0;
        public string coachtype { get; set; }
        public string coachname { get; set; }
        public string title { get; set; }
        public string subtitle { get; set; }

        public string orgpdfname { get; set; }
        public string newpdfname { get; set; }

        public string docname { get; set; }


    }
    public class GetJOurneyEditResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public GetJourneyEditDatas data { get; set; }
    }
    public class GetJourneyEditDatas
    {
        public Int32 journeyid { get; set; } = 0;
        public Int32 coachtypeid { get; set; } = 0;
        public Int32 coachid { get; set; }
        public string title { get; set; }
        public string subtitle { get; set; }


    }
    public class SaveArtileResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
    }
    public class ArticleParams
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
    public class ArticleDataResponses
    {
        public bool Statue { get; set; }
        public string Message { get; set; }

        public List<GetArticleDatas> data { get; set; }


    }
    public class GetArticleDatas
    {
        public Int32 articleid { get; set; } = 0;
        public string coachtype { get; set; }
        public string coachname { get; set; }
        public string title { get; set; }
        public string subtitle { get; set; }

        public string orgpdfname { get; set; }
        public string newpdfname { get; set; }

        public string docname { get; set; }


    }
    public class GetArticleEditResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public GetArticleEditDatas data { get; set; }
    }
    public class GetArticleEditDatas
    {
        public Int32 articleid { get; set; } = 0;
        public Int32 coachtypeid { get; set; } = 0;
        public Int32 coachid { get; set; }
        public string title { get; set; }
        public string subtitle { get; set; }


    }

}
