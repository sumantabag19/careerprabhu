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
    [Route("api/portfolio")]
    public class portfolio : Controller
    {
        private IHostingEnvironment _hostingEnvironment;

        IConfiguration _iconfiguration;
        string videofilename = "";
        string pdffilename = "";
        string videopath = "";
        string pdfpath = "";
        string pdfguid = "";
        public portfolio(IConfiguration iconfiguration, IHostingEnvironment hosting)
        {
            _iconfiguration = iconfiguration;
            _hostingEnvironment = hosting;
        }


        //Api for bind intrest area
        [HttpGet]
        [Route("bindintrestarea")]
        public string Bindintrestarea()
        {
            GetIntrestAreaResponse GIAR = new GetIntrestAreaResponse();
            List<GetIntrestAreaData> ListGIAD = new List<GetIntrestAreaData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Bindintrestarea_portfolio", con);
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
                        GetIntrestAreaData GIAD = new GetIntrestAreaData();
                        GIAD.repositoryid = Convert.ToInt32(row["repositoryid"]);
                        GIAD.repositoryname = Convert.ToString(row["repositoryname"]);
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

        //save portfolio data
        [HttpPost]
        [Route("saveportfoliodata")]
        public async Task<IActionResult> Saveportfoliodata([FromForm] IFormFile pdf, [FromForm] string portfolioid,
       [FromForm] string repositoryid, [FromForm] string intrestarea, [FromForm] string videolink,[FromForm] string orgpdfname, [FromForm] string createdby)

        {
            string json = "";
            string result = "";

            DataSet ds = new DataSet();
            PersonalPortfolioResponse objppfr = new PersonalPortfolioResponse();
            PersonalPortfolioParam objppfp = new PersonalPortfolioParam();

            if(pdf!=null)
            {
                try
                {
                    pdfguid = Guid.NewGuid().ToString();
                    pdffilename = pdfguid + pdf.FileName;

                    var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploadportfoliopdf");
                    if (pdf.Length > 0)
                    {
                        var filePath = Path.Combine(uploads, pdffilename);
                        pdfpath = filePath;
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
            }
           

            



            objppfp.portfolioid = Convert.ToInt32(portfolioid);
            objppfp.repositoryid = Convert.ToInt32(repositoryid);
            objppfp.intrestarea = Convert.ToString(intrestarea);
            objppfp.videolink = Convert.ToString(videolink);
           // objppfp.orgpdfname = Convert.ToString(orgpdfname);
            objppfp.createdby = Convert.ToInt32(createdby);
            if (orgpdfname == null || orgpdfname == "")
            {
                objppfp.orgpdfname = "";
            }
            else
            {
                objppfp.orgpdfname = Convert.ToString(orgpdfname);
            }


            try
            {
                if (pdfguid == "")
                {
                    objppfp.newpdfname = "";
                }
                else
                {
                    objppfp.newpdfname = pdfguid;
                }
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("saveportfolio", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("portfolioid", objppfp.portfolioid);
                cmd.Parameters.AddWithValue("repositoryid", objppfp.repositoryid);
                cmd.Parameters.AddWithValue("intrestarea", objppfp.intrestarea);

                cmd.Parameters.AddWithValue("videolink", objppfp.videolink);
                cmd.Parameters.AddWithValue("orgpdfname", objppfp.orgpdfname);
                
                cmd.Parameters.AddWithValue("newpdfname", objppfp.newpdfname);
                

                
                cmd.Parameters.AddWithValue("pdfpath", pdfpath);

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


        //get data for bind table
        [HttpGet]
        [Route("Bindtabledata")]
        public string Bindtabledata()
        {
            string json = "";
            DataSet ds = new DataSet();
            GetSavedPortfolioDataResponse ObjGSPDR = new GetSavedPortfolioDataResponse();
            List<GetSavedPortfolioEssayData> ListGSPD = new List<GetSavedPortfolioEssayData>();

            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Getportfoliodata", con);
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
                        GetSavedPortfolioEssayData ObjGSPD = new GetSavedPortfolioEssayData();

                        ObjGSPD.portfolioid = Convert.ToInt32(row["portfolioid"]);
                        ObjGSPD.repositoryname = Convert.ToString(row["repositoryname"]);
                        ObjGSPD.intrestarea = Convert.ToString(row["intrestarea"]);
                        ObjGSPD.videolink = Convert.ToString(row["videolink"]);

                        //ObjGSPD.videolink = GetYouTubeId(Convert.ToString(row["videolink"]));
                        //ObjGSPD.videolink = "https://www.youtube.com/embed/" + ObjGSPD.videolink;

                        ObjGSPD.path = Convert.ToString(row["pdfpath"]);




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
                MySqlCommand cmd = new MySqlCommand("editportfolio", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pof_id", obj.portfolioid);
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

                    ObjGED.portfolioid = Convert.ToInt32(ds.Tables[0].Rows[0]["portfolioid"]);

                    ObjGED.repositoryid = Convert.ToInt32(ds.Tables[0].Rows[0]["repositoryid"]);
                    ObjGED.repositoryname = Convert.ToString(ds.Tables[0].Rows[0]["repositoryname"]);
                    
                    ObjGED.intrestarea = Convert.ToString(ds.Tables[0].Rows[0]["intrestarea"]);
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

        //update portfolio

        [HttpPost]
        [Route("updateportfoliodata")]
        public async Task<IActionResult> Updateportfoliodata([FromForm] IFormFile pdf, [FromForm] string portfolioid,
  [FromForm] string repositoryid, [FromForm] string intrestarea, [FromForm] string videolink, [FromForm] string orgpdfname, [FromForm] string createdby)

        {
            string json = "";
            string result = "";

            DataSet ds = new DataSet();
            PersonalPortfolioResponse objppfr = new PersonalPortfolioResponse();
            PersonalPortfolioParam objppfp = new PersonalPortfolioParam();



            if (pdf!= null)
            {
                try
                {
                    pdfguid = Guid.NewGuid().ToString();
                    pdffilename = pdfguid + pdf.FileName;

                    var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploadportfoliopdf");
                    if (pdf.Length > 0)
                    {
                        var filePath = Path.Combine(uploads, pdffilename);
                        pdfpath = filePath;
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
               



            objppfp.portfolioid = Convert.ToInt32(portfolioid);
            objppfp.repositoryid = Convert.ToInt32(repositoryid);
            objppfp.intrestarea = Convert.ToString(intrestarea);
            objppfp.videolink = Convert.ToString(videolink);
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
                MySqlCommand cmd = new MySqlCommand("updateportfolio", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("portfolio_id", objppfp.portfolioid);
                cmd.Parameters.AddWithValue("repository_id", objppfp.repositoryid);
                cmd.Parameters.AddWithValue("intrest_area", objppfp.intrestarea);

                cmd.Parameters.AddWithValue("video_link", objppfp.videolink);
                cmd.Parameters.AddWithValue("orgpdf_name", objppfp.orgpdfname);

                cmd.Parameters.AddWithValue("newpdf_name", objppfp.newpdfname);



                cmd.Parameters.AddWithValue("pdf_path", pdfpath);

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
        [Route("DeleteActivity")]
        public string DeleteActivities([FromBody] PersonalPortfolioParam obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            PersonalPortfolioResponse ObjAMR = new PersonalPortfolioResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Deleteportfolio", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("pof_id", obj.portfolioid);

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




        //class for bind intrest area

        public class GetIntrestAreaResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public List<GetIntrestAreaData> data { get; set; }
        }
        public class GetIntrestAreaData
        {
            public Int32 repositoryid { get; set; }
            public string repositoryname { get; set; }
        }

        //class for save portfolio
        public class PersonalPortfolioResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
        }
        public class PersonalPortfolioParam
        {

            public Int32 portfolioid { get; set; } = 0;
            public Int32 repositoryid { get; set; } = 0;
            public string intrestarea { get; set; } = "";
            public string videolink { get; set; } = "";

            public string orgpdfname { get; set; } = "";
            public string newpdfname { get; set; } = "";
            
            public Int32 createdby { get; set; }
            public string message { get; set; } = "";
            public string pdftoupload { get; set; }

        }

        //class for bind table
        public class GetSavedPortfolioDataResponse
        {
            public bool Statue { get; set; }
            public string Message { get; set; }

            public List<GetSavedPortfolioEssayData> data { get; set; }

        }
        public class GetSavedPortfolioEssayData
        {
            public Int32 portfolioid { get; set; }
            public string repositoryname { get; set; }
            public string intrestarea { get; set; }
            public string videolink { get; set; }
            public string path { get; set; }
    

        }

        //class for edit
        public class Geteditrecord
        {

            public Int32 portfolioid { get; set; } = 0;

        }
        public class GetEditResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public GetEditData data { get; set; }
        }
        public class GetEditData
        {
            public Int32 portfolioid { get; set; }

            
            public string intrestarea { get; set; }
            public Int32 repositoryid { get; set; }
            public string repositoryname { get; set; }

            public string videolink { get; set; }
           
        }

    }
}
