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
    [Route("api/uploadvideopdf")]
    public class uploadvideopdf : Controller
    {
        private IHostingEnvironment _hostingEnvironment;

        IConfiguration _iconfiguration;
        string pdfguid = "";
        string pdffilename = "";



        public uploadvideopdf(IConfiguration iconfiguration, IHostingEnvironment hosting)
        {
            _iconfiguration = iconfiguration;
            _hostingEnvironment = hosting;
        }

        //API for bind page
        [HttpGet]
        [Route("bindpage")]
        public string Bindpage()
        {
            GetVideoPdfResponse GIAR = new GetVideoPdfResponse();
            List<GetUploadVideoPdfData> ListGIAD = new List<GetUploadVideoPdfData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindPage", con);
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
                        GetUploadVideoPdfData GIAD = new GetUploadVideoPdfData();
                        GIAD.pageid = Convert.ToInt32(row["pageid"]);
                        GIAD.pagename = Convert.ToString(row["pagename"]);
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
        [HttpGet]
        [Route("bindlanguage")]
        public string Bindlanguage()
        {
            GetVideoPdfResponses GIAR = new GetVideoPdfResponses();
            List<GetUploadVideoPdfData1> ListGIAD = new List<GetUploadVideoPdfData1>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindLanguage", con);
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
                        GetUploadVideoPdfData1 GIAD = new GetUploadVideoPdfData1();
                        GIAD.languageid = Convert.ToInt32(row["languageid"]);
                        GIAD.languagetype = Convert.ToString(row["languagetype"]);
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

        //Api for save upload video pdf
        [HttpPost]
        [Route("saveportfoliodata")]
        public async Task<IActionResult> Saveportfoliodata([FromForm] IFormFile pdf, [FromForm] string vid_pdfid,
      [FromForm] string pageid, [FromForm] string videolink, [FromForm] string orgpdfname, [FromForm] string languageid, [FromForm] string createdby)

        {
            string json = "";
            string result = "";

            DataSet ds = new DataSet();
            PersonalUploadVideoResponse objppfr = new PersonalUploadVideoResponse();
            PersonalUploadVideoParam objppfp = new PersonalUploadVideoParam();




            try
            {
                pdfguid = Guid.NewGuid().ToString();
                pdffilename = pdfguid + pdf.FileName;

                var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "masterupload");
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



            objppfp.video_pdfid = Convert.ToInt32(vid_pdfid);
            objppfp.pageid = Convert.ToInt32(pageid);
            objppfp.languageid = Convert.ToInt32(languageid);


            objppfp.videolink = Convert.ToString(videolink);
            objppfp.orgpdfname = Convert.ToString(orgpdfname);
            objppfp.createdby = Convert.ToInt32(createdby);


            try
            {

                objppfp.newpdfname = pdfguid;
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("saveuploadvideopdf", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("vidpdf_id", objppfp.video_pdfid);
                cmd.Parameters.AddWithValue("page_id", objppfp.pageid);


                cmd.Parameters.AddWithValue("video_link", objppfp.videolink);
                cmd.Parameters.AddWithValue("orgpdf_name", objppfp.orgpdfname);

                cmd.Parameters.AddWithValue("newpdf_name", objppfp.newpdfname);
                cmd.Parameters.AddWithValue("language_id", objppfp.languageid);


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
            return Ok(json);

        }

        //Bind table data
        [HttpGet]
        [Route("Bindtabledata")]
        public string Bindtabledata()
        {
            string json = "";
            DataSet ds = new DataSet();
            GetSavedUploadResponse ObjGSPDR = new GetSavedUploadResponse();
            List<GetSavedUploadData> ListGSPD = new List<GetSavedUploadData>();

            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Getuploaddata", con);
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
                        GetSavedUploadData ObjGSPD = new GetSavedUploadData();

                        ObjGSPD.vid_pdfid = Convert.ToInt32(row["vid_pdfid"]);
                        ObjGSPD.pagename = Convert.ToString(row["pagename"]);
                        ObjGSPD.languagetype = Convert.ToString(row["languagetype"]);

                        ObjGSPD.orgpdfname = Convert.ToString(row["orgpdfname"]);
                        ObjGSPD.videolink = Convert.ToString(row["videolink"]);

                        //ObjGSPD.videolink = GetYouTubeId(Convert.ToString(row["videolink"]));
                        //ObjGSPD.videolink = "https://www.youtube.com/embed/" + ObjGSPD.videolink;






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

        //edit data
        [HttpGet]
        [Route("GetEditData")]
        public string GetEditedData([FromHeader] Getuploadeditrecord obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetUploadEditResponse ObjGER = new GetUploadEditResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("editUpload", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("vidpdf_id", obj.vid_pdfid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGER.Status = true;
                    ObjGER.Message = "Data Found";
                    GetUploadEditData ObjGED = new GetUploadEditData();

                    ObjGED.vid_pdfid = Convert.ToInt32(ds.Tables[0].Rows[0]["vid_pdfid"]);

                    ObjGED.pageid = Convert.ToInt32(ds.Tables[0].Rows[0]["pageid"]);
                    ObjGED.pagename = Convert.ToString(ds.Tables[0].Rows[0]["pagename"]);
                    ObjGED.languageid = Convert.ToInt32(ds.Tables[0].Rows[0]["languageid"]);

                    ObjGED.languagetype = Convert.ToString(ds.Tables[0].Rows[0]["languagetype"]);



                    ObjGED.videolink = Convert.ToString(ds.Tables[0].Rows[0]["videolink"]);




                    //ObjGED.VideoName = Convert.ToString(ds.Tables[0].Rows[0]["OrgVideoName"]);
                    //ObjGED.NewVideoName = Convert.ToString(ds.Tables[0].Rows[0]["NewVideoName"]);

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

        //update upload record
        [HttpPost]
        [Route("updateportfoliodata")]
        public async Task<IActionResult> Updateportfoliodata([FromForm] IFormFile pdf, [FromForm] string vid_pdfid,
      [FromForm] string pageid, [FromForm] string videolink, [FromForm] string orgpdfname, [FromForm] string languageid, [FromForm] string createdby)

        {
            string json = "";
            string result = "";

            DataSet ds = new DataSet();
            PersonalUploadVideoResponse objppfr = new PersonalUploadVideoResponse();
            PersonalUploadVideoParam objppfp = new PersonalUploadVideoParam();



            if (pdf != null)
            {
                try
                {
                    pdfguid = Guid.NewGuid().ToString();
                    pdffilename = pdfguid + pdf.FileName;

                    var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "masterupload");
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
            else { }




            objppfp.video_pdfid = Convert.ToInt32(vid_pdfid);
            objppfp.pageid = Convert.ToInt32(pageid);

            objppfp.videolink = Convert.ToString(videolink);
            objppfp.languageid = Convert.ToInt32(languageid);

            // objppfp.orgpdfname = Convert.ToString(orgpdfname);
            objppfp.createdby = Convert.ToInt32(createdby);


            if (orgpdfname == null)
            {
                objppfp.orgpdfname = "";
            }
            else
            {
                objppfp.orgpdfname = Convert.ToString(orgpdfname);
            }


            try
            {

                //objppfp.newpdfname = pdfguid;
                if (pdfguid == "")
                {
                    objppfp.newpdfname = "";
                }
                else
                {
                    objppfp.newpdfname = pdfguid;
                }


                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("updateuploadvid", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("vidpdf_id", objppfp.video_pdfid);
                cmd.Parameters.AddWithValue("page_id", objppfp.pageid);


                cmd.Parameters.AddWithValue("video_link", objppfp.videolink);
                cmd.Parameters.AddWithValue("orgpdf_name", objppfp.orgpdfname);

                cmd.Parameters.AddWithValue("newpdf_name", objppfp.newpdfname);
                cmd.Parameters.AddWithValue("language_id", objppfp.languageid);






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
            return Ok(json);

        }

        //delete uplod data
        [HttpPost]
        [Route("DeleteActivity")]
        public string DeleteActivity([FromBody] PersonalUploadVideoParam obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            PersonalUploadVideoResponse ObjAMR = new PersonalUploadVideoResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Deleteuploadvideodata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("vid_id", obj.video_pdfid);


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

    //classes for upload video pdf 
    public class GetVideoPdfResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetUploadVideoPdfData> data { get; set; }
    }
    public class GetUploadVideoPdfData
    {
        public Int32 pageid { get; set; }
        public string pagename { get; set; }
    }
    public class GetVideoPdfResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetUploadVideoPdfData1> data { get; set; }
    }
    public class GetUploadVideoPdfData1
    {
        public Int32 languageid { get; set; }
        public string languagetype { get; set; }
    }
    //save upload video pdf
    public class PersonalUploadVideoResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
    }
    public class PersonalUploadVideoParam
    {

        public Int32 video_pdfid { get; set; } = 0;
        public Int32 pageid { get; set; } = 0;
        public Int32 languageid { get; set; }


        public string videolink { get; set; } = "";

        public string orgpdfname { get; set; } = "";
        public string newpdfname { get; set; } = "";

        public Int32 createdby { get; set; }
        public string message { get; set; } = "";



    }
    //class for bind table data
    public class GetSavedUploadResponse
    {
        public bool Statue { get; set; }
        public string Message { get; set; }

        public List<GetSavedUploadData> data { get; set; }

    }
    public class GetSavedUploadData
    {
        public Int32 vid_pdfid { get; set; }
        public string pagename { get; set; }
        public string languagetype { get; set; }

        public string orgpdfname { get; set; }
        public string videolink { get; set; }



    }

    //class for edit
    public class Getuploadeditrecord
    {

        public Int32 vid_pdfid { get; set; } = 0;

    }
    public class GetUploadEditResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public GetUploadEditData data { get; set; }
    }
    public class GetUploadEditData
    {
        public Int32 vid_pdfid { get; set; }



        public Int32 pageid { get; set; }
        public string pagename { get; set; }
        public Int32 languageid { get; set; }
        public string languagetype { get; set; }

        public string videolink { get; set; }

    }
}
