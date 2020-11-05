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
    [Route("api/uploadprevyearmaterial")]
    public class uploadprevyearmaterial : Controller
    {
        IConfiguration _iconfiguration;
        private IHostingEnvironment _hostingEnvironment;
        string pdffilename = "";
        string imagefilename = "";
        string pdfpath = "";
        string imagepath = "";
        string prevpdfguid = "";
        string previmageguid = "";


        string samplepdffilename = "";
        string sampleimagefilename = "";
        string samplepdfpath = "";
        string sampleimagepath = "";
        string samplepdfguid = "";
        string sampleimageguid = "";

        public uploadprevyearmaterial(IConfiguration iconfiguration, IHostingEnvironment hosting)
        {
            _iconfiguration = iconfiguration;
            _hostingEnvironment = hosting;
        }
        //Api for bind preprotary category
        [HttpGet]
        [Route("bindprepcategory")]
        public string Bindprepcategory()
        {
            GetprepratoryuploadResponse GIAR = new GetprepratoryuploadResponse();
            List<GetprepratoryuploadData> ListGIAD = new List<GetprepratoryuploadData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("bindprepcategory", con);
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
                        GetprepratoryuploadData GIAD = new GetprepratoryuploadData();
                        GIAD.prepid = Convert.ToInt32(row["prepid"]);
                        GIAD.categoryname = Convert.ToString(row["categoryname"]);
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

        //Api for bind title
        [HttpPost]
        [Route("bindtitle")]
        public string Bindtitle([FromBody] GettitleData data)
        {
            GettitleResponse GSR = new GettitleResponse();
            List<GettitleData> ListGSD = new List<GettitleData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("bindtitle", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("prep_id", data.prepid);
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
                        GettitleData GSD = new GettitleData();
                        GSD.prepnameid = Convert.ToInt32(row["prepnameid"]);
                        GSD.prepname = Convert.ToString(row["prepname"]);
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


        //save portfolio data
        [HttpPost]
        [Route("savepreviousyeardata")]
        public async Task<IActionResult> Savepreviousyeardata([FromForm] IFormFile pdf, [FromForm] IFormFile image, [FromForm] string prevyearid,
       [FromForm] string prepid, [FromForm] string prepnameid, [FromForm] string pname, [FromForm] string ptext, 
       [FromForm] string purl, [FromForm] string orgpdfname, [FromForm] string orgimagename, [FromForm] string createdby)

        {
            string json = "";
            string result = "";

            DataSet ds = new DataSet();
            PersonalPreviousyearResponse objppfr = new PersonalPreviousyearResponse();
            PersonalPreviousyearParam objppfp = new PersonalPreviousyearParam();




            try
            {
                prevpdfguid = Guid.NewGuid().ToString();
                pdffilename = prevpdfguid + pdf.FileName;

                var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "previousyearpdf");
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
            try
            {
                previmageguid = Guid.NewGuid().ToString();
                imagefilename = previmageguid + image.FileName;

                var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "prviousyearimage");
                if (image.Length > 0)
                {
                    var filePath = Path.Combine(uploads, imagefilename);
                    imagepath = filePath;
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await image.CopyToAsync(fileStream);
                    }
                }
            }
            catch (Exception e)
            {
                string Message = e.Message;
            }



            objppfp.prevyearid = Convert.ToInt32(prevyearid);
            objppfp.prepid = Convert.ToInt32(prepid);
            objppfp.prepnameid = Convert.ToInt32(prepnameid);
            objppfp.pname = Convert.ToString(pname);
            objppfp.ptext = Convert.ToString(ptext);
            objppfp.purl = Convert.ToString(purl);
            
            objppfp.orgpdfname = Convert.ToString(orgpdfname);
            objppfp.orgimagename = Convert.ToString(orgimagename);
            objppfp.createdby = Convert.ToInt32(createdby);


            try
            {

                objppfp.newpdfname = prevpdfguid;
                objppfp.newimagename = previmageguid;
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("saveprevyearpage", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("prevyearid", objppfp.prevyearid);
                cmd.Parameters.AddWithValue("prepid", objppfp.prepid);
                cmd.Parameters.AddWithValue("prepnameid", objppfp.prepnameid);
                cmd.Parameters.AddWithValue("pname", objppfp.pname);
                cmd.Parameters.AddWithValue("ptext", objppfp.ptext);
                cmd.Parameters.AddWithValue("purl", objppfp.purl);

                
                cmd.Parameters.AddWithValue("orgpdfname", objppfp.orgpdfname);
                cmd.Parameters.AddWithValue("newpdfname", objppfp.newpdfname);
                cmd.Parameters.AddWithValue("orgimagename", objppfp.orgimagename);
                cmd.Parameters.AddWithValue("newimagename", objppfp.newimagename);



                cmd.Parameters.AddWithValue("pdfpath", pdfpath);
                cmd.Parameters.AddWithValue("imagepath", imagepath);

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


        //update prevyear data
        [HttpPost]
        [Route("updatepreviousyeardata")]
        public async Task<IActionResult> Updatepreviousyeardata([FromForm] IFormFile pdf, [FromForm] IFormFile image, [FromForm] string prevyearid,
       [FromForm] string prepid, [FromForm] string prepnameid, [FromForm] string pname, [FromForm] string ptext,
       [FromForm] string purl, [FromForm] string orgpdfname, [FromForm] string orgimagename, [FromForm] string createdby)

        {
            string json = "";
            string result = "";

            DataSet ds = new DataSet();
            PersonalPreviousyearResponse objppfr = new PersonalPreviousyearResponse();
            PersonalPreviousyearParam objppfp = new PersonalPreviousyearParam();



            if (pdf != null)
            {
                try
                {
                    prevpdfguid = Guid.NewGuid().ToString();
                    pdffilename = prevpdfguid + pdf.FileName;

                    var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "previousyearpdf");
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

            if (image != null)
            {
                try
                {
                    previmageguid = Guid.NewGuid().ToString();
                    imagefilename = previmageguid + image.FileName;

                    var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "prviousyearimage");
                    if (image.Length > 0)
                    {
                        var filePath = Path.Combine(uploads, imagefilename);
                        imagepath = filePath;
                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            await image.CopyToAsync(fileStream);
                        }
                    }
                }
                catch (Exception e)
                {
                    string Message = e.Message;
                }
            }
            else { }
           



            objppfp.prevyearid = Convert.ToInt32(prevyearid);
            objppfp.prepid = Convert.ToInt32(prepid);
            objppfp.prepnameid = Convert.ToInt32(prepnameid);
            objppfp.pname = Convert.ToString(pname);
            objppfp.ptext = Convert.ToString(ptext);
            objppfp.purl = Convert.ToString(purl);

            //objppfp.orgpdfname = Convert.ToString(orgpdfname);
            //objppfp.orgimagename = Convert.ToString(orgimagename);
            objppfp.createdby = Convert.ToInt32(createdby);


            if (orgpdfname == null)
            {
                objppfp.orgpdfname = "";
            }
            else
            {
                objppfp.orgpdfname = Convert.ToString(orgpdfname);
            }
            if (orgimagename == null)
            {
                objppfp.orgimagename = "";
            }
            else
            {
                objppfp.orgimagename = Convert.ToString(orgimagename);
            }


            try
            {

                if (prevpdfguid == "")
                {
                    objppfp.newpdfname = "";
                }
                else
                {
                    objppfp.newpdfname = prevpdfguid;
                }
                if (previmageguid == "")
                {
                    objppfp.newimagename = "";
                }
                else
                {
                    objppfp.newimagename = previmageguid;
                }




                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("updateprevyearpage", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("prevyear_id", objppfp.prevyearid);
                cmd.Parameters.AddWithValue("prep_id", objppfp.prepid);
                cmd.Parameters.AddWithValue("prepname_id", objppfp.prepnameid);
                cmd.Parameters.AddWithValue("p_name", objppfp.pname);
                cmd.Parameters.AddWithValue("p_text", objppfp.ptext);
                cmd.Parameters.AddWithValue("p_url", objppfp.purl);


                cmd.Parameters.AddWithValue("org_pdfname", objppfp.orgpdfname);
                cmd.Parameters.AddWithValue("new_pdfname", objppfp.newpdfname);
                cmd.Parameters.AddWithValue("org_imagename", objppfp.orgimagename);
                cmd.Parameters.AddWithValue("new_imagename", objppfp.newimagename);



                cmd.Parameters.AddWithValue("pdf_path", pdfpath);
                cmd.Parameters.AddWithValue("image_path", imagepath);

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
            GetSavedPrevDataResponse ObjGSPDR = new GetSavedPrevDataResponse();
            List<GetSavedPrevEssayData> ListGSPD = new List<GetSavedPrevEssayData>();

            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getsaveprevyeardata", con);
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
                        GetSavedPrevEssayData ObjGSPD = new GetSavedPrevEssayData();

                        ObjGSPD.prevyearid = Convert.ToInt32(row["prevyearid"]);
                        ObjGSPD.categoryname = Convert.ToString(row["categoryname"]);
                        ObjGSPD.prepname = Convert.ToString(row["prepname"]);
                        ObjGSPD.pname = Convert.ToString(row["pname"]);
                        ObjGSPD.ptext = Convert.ToString(row["ptext"]);
                        //ObjGSPD.purl = Convert.ToString(row["purl"]);

                        ObjGSPD.purl = GetYouTubeId(Convert.ToString(row["purl"]));
                        ObjGSPD.purl = ObjGSPD.purl;
                        //ObjGSPD.newpdfname = Convert.ToString(row["newpdfname"]);
                        //ObjGSPD.newimagename = Convert.ToString(row["newimagename"]);
                        ObjGSPD.docname = "http://admin.careerprabhu.com/" + "previousyearpdf/" + Convert.ToString(row["filename"]);
                        ObjGSPD.imagename = "http://admin.careerprabhu.com/" + "prviousyearimage/" + Convert.ToString(row["imagename"]);
                        if(Convert.ToString(row["filename"]) =="" || Convert.ToString(row["filename"]) == null)
                        {
                            ObjGSPD.docname="";
                        }
                        if (Convert.ToString(row["imagename"]) == "" || Convert.ToString(row["imagename"]) == null)
                        {
                            ObjGSPD.imagename="";
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



        //bind all table data
        [HttpPost]
        [Route("BindAllTableData")]
        public string BindAllTableData([FromBody] GetAllUploadData objppfp)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetOverallResponse ObjOverall = new GetOverallResponse();
            //GetSavedPrevDataResponse ObjGSPDR = new GetSavedPrevDataResponse();
            List<GetSavedPrevEssayData> ListGSPD = new List<GetSavedPrevEssayData>();

            //GetSavedSampleDataResponse ObjGSPDR1 = new GetSavedSampleDataResponse();
            List<GetSavedSampleData> ListGSPD1 = new List<GetSavedSampleData>();

            //GetSavedMockDataResponse ObjGSPDR2 = new GetSavedMockDataResponse();
            List<GetSavedMockData> ListGSPD2 = new List<GetSavedMockData>();

            //GetSavedAdhocDataResponse ObjGSPDR3 = new GetSavedAdhocDataResponse();
            List<GetSavedAdhocData> ListGSPD3 = new List<GetSavedAdhocData>();

            //GetSavedResourceResponse ObjGSPDR4 = new GetSavedResourceResponse();
            List<GetSavedResourceData> ListGSPD4 = new List<GetSavedResourceData>();

            //GetSavedFreeResponse ObjGSPDR5 = new GetSavedFreeResponse();
            List<GetSavedFreeData> ListGSPDA5 = new List<GetSavedFreeData>();

            //GetSavedPaidResponse ObjGSPDR6 = new GetSavedPaidResponse();
            List<GetSavedPaidData> ListGSPDA6 = new List<GetSavedPaidData>();

            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getsaveoveralldata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("prep_id", objppfp.prepid);
                cmd.Parameters.AddWithValue("prepname_id", objppfp.prepnameid);

                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();

                //prepvioys year start
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjOverall.Statue = true;
                    ObjOverall.Message = "Data Found";
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        GetSavedPrevEssayData ObjGSPD = new GetSavedPrevEssayData();

                        ObjGSPD.prevyearid = Convert.ToInt32(row["prevyearid"]);
                        ObjGSPD.categoryname = Convert.ToString(row["categoryname"]);
                        ObjGSPD.prepname = Convert.ToString(row["prepname"]);
                        ObjGSPD.pname = Convert.ToString(row["pname"]);
                        ObjGSPD.ptext = Convert.ToString(row["ptext"]);
                        //ObjGSPD.purl = Convert.ToString(row["purl"]);

                        ObjGSPD.purl = GetYouTubeId(Convert.ToString(row["purl"]));
                        ObjGSPD.purl = ObjGSPD.purl;
                        ObjGSPD.docname = "http://admin.careerprabhu.com/" + "previousyearpdf/" + Convert.ToString(row["filename"]);
                        ObjGSPD.imagename = "http://admin.careerprabhu.com/" + "prviousyearimage/" + Convert.ToString(row["imagename"]);
                        if (Convert.ToString(row["filename"]) == "" || Convert.ToString(row["filename"]) == null)
                        {
                            ObjGSPD.docname = "";
                        }
                        if (Convert.ToString(row["imagename"]) == "" || Convert.ToString(row["imagename"]) == null)
                        {
                            ObjGSPD.imagename = "";
                        }
                        ListGSPD.Add(ObjGSPD);

                    }
                    ObjOverall.data1 = ListGSPD;
                }
                else
                {
                    ObjOverall.Statue = false;
                    ObjOverall.Message = "Something went wrong";

                  
                }
                //previous year end

                //sample paper start
                if (ds.Tables[1].Rows.Count > 0)
                {
                    ObjOverall.Statue = true;
                    ObjOverall.Message = "Data Found";
                    foreach (DataRow row in ds.Tables[1].Rows)
                    {



                        GetSavedSampleData ObjGSPD1 = new GetSavedSampleData();

                        ObjGSPD1.sampleid = Convert.ToInt32(row["sampleid"]);
                        ObjGSPD1.categoryname = Convert.ToString(row["categoryname"]);
                        ObjGSPD1.prepname = Convert.ToString(row["prepname"]);
                        ObjGSPD1.sname = Convert.ToString(row["sname"]);
                        ObjGSPD1.stext = Convert.ToString(row["stext"]);
                        // ObjGSPD.surl = Convert.ToString(row["surl"]);

                        ObjGSPD1.surl = GetYouTubeId(Convert.ToString(row["surl"]));
                        ObjGSPD1.surl =  ObjGSPD1.surl;

                        //ObjGSPD1.docname = "http://careerprabhu.cybraintech.com/" + "samplepdf/" + Convert.ToString(row["filename"]);
                        //ObjGSPD1.imagename = "http://careerprabhu.cybraintech.com/" + "sampleimage/" + Convert.ToString(row["imagename"]);
                        //if (Convert.ToString(row["filename"]) == "" || Convert.ToString(row["filename"]) == null)
                        //{
                        //    ObjGSPD1.docname = "";
                        //}
                        //if (Convert.ToString(row["imagename"]) == "" || Convert.ToString(row["imagename"]) == null)
                        //{
                        //    ObjGSPD1.imagename = "";
                        //}


                        ListGSPD1.Add(ObjGSPD1);

                    }

                    ObjOverall.data2 = ListGSPD1;

                }
                else
                {
                    ObjOverall.Statue = false;
                    ObjOverall.Message = "Something went wrong";
                }

                //sample paper end

                //mock test start
                if (ds.Tables[2].Rows.Count > 0)
                {
                    ObjOverall.Statue = true;
                    ObjOverall.Message = "Data Found";
                    foreach (DataRow row in ds.Tables[2].Rows)
                    {
                        GetSavedMockData ObjGSPD2 = new GetSavedMockData();

                        ObjGSPD2.mockid = Convert.ToInt32(row["mockid"]);
                        ObjGSPD2.categoryname = Convert.ToString(row["categoryname"]);
                        ObjGSPD2.prepname = Convert.ToString(row["prepname"]);
                        ObjGSPD2.mname = Convert.ToString(row["mname"]);
                        ObjGSPD2.mtext = Convert.ToString(row["mtext"]);
                        ObjGSPD2.murl = Convert.ToString(row["murl"]);

                        ObjGSPD2.murl = GetYouTubeId(Convert.ToString(row["murl"]));
                        ObjGSPD2.murl = ObjGSPD2.murl;


                        ListGSPD2.Add(ObjGSPD2);

                    }

                    ObjOverall.data3 = ListGSPD2;

                }
                else
                {
                    ObjOverall.Statue = false;
                    ObjOverall.Message = "Something went wrong";
                }
                //mock test end

                //adhoc material start
                if (ds.Tables[3].Rows.Count > 0)
                {
                    ObjOverall.Statue = true;
                    ObjOverall.Message = "Data Found";
                    foreach (DataRow row in ds.Tables[3].Rows)
                    {
                        GetSavedAdhocData ObjGSPD3 = new GetSavedAdhocData();
                        ObjGSPD3.adhocid = Convert.ToInt32(row["adhocid"]);
                        ObjGSPD3.categoryname = Convert.ToString(row["categoryname"]);
                        ObjGSPD3.prepname = Convert.ToString(row["prepname"]);
                        ObjGSPD3.aname = Convert.ToString(row["aname"]);
                        ObjGSPD3.atext = Convert.ToString(row["atext"]);
                        //ObjGSPD.aurl = Convert.ToString(row["aurl"]);
                        ObjGSPD3.aurl = GetYouTubeId(Convert.ToString(row["aurl"]));
                        ObjGSPD3.aurl = ObjGSPD3.aurl;
                        ListGSPD3.Add(ObjGSPD3);

                    }

                    ObjOverall.data4 = ListGSPD3;

                }
                else
                {
                    ObjOverall.Statue = false;
                    ObjOverall.Message = "Something went wrong";
                }
                //adhocmaterial end

                //resource start
                if (ds.Tables[4].Rows.Count > 0)
                {
                    ObjOverall.Statue = true;
                    ObjOverall.Message = "Data Found";
                    foreach (DataRow row in ds.Tables[4].Rows)
                    {
                        GetSavedResourceData ObjGSPD4 = new GetSavedResourceData();

                        ObjGSPD4.resourceid = Convert.ToInt32(row["resourceid"]);
                        ObjGSPD4.categoryname = Convert.ToString(row["categoryname"]);
                        ObjGSPD4.prepname = Convert.ToString(row["prepname"]);
                        ObjGSPD4.rname = Convert.ToString(row["rname"]);
                        ObjGSPD4.rtext = Convert.ToString(row["rtext"]);
                        //ObjGSPD.rurl = Convert.ToString(row["rurl"]);

                        ObjGSPD4.rurl = GetYouTubeId(Convert.ToString(row["rurl"]));
                        ObjGSPD4.rurl =  ObjGSPD4.rurl;

                        ObjGSPD4.author = Convert.ToString(row["author"]);
                        ObjGSPD4.description = Convert.ToString(row["description"]);
                        ObjGSPD4.publish = Convert.ToString(row["publish"]);
                        ListGSPD4.Add(ObjGSPD4);
                    }
                    ObjOverall.data5 = ListGSPD4;
                }
                else
                {
                    ObjOverall.Statue = false;
                    ObjOverall.Message = "Something went wrong";
                }
                //resource end

                //free material data start

                if (ds.Tables[5].Rows.Count > 0)
                {
                    ObjOverall.Statue = true;
                    ObjOverall.Message = "Data Found";
                    foreach (DataRow row in ds.Tables[5].Rows)
                    {


                        GetSavedFreeData ObjGSPD5 = new GetSavedFreeData();

                        ObjGSPD5.freeid = Convert.ToInt32(row["freeid"]);
                        ObjGSPD5.categoryname = Convert.ToString(row["categoryname"]);
                        ObjGSPD5.prepname = Convert.ToString(row["prepname"]);
                        ObjGSPD5.fname = Convert.ToString(row["fname"]);
                        ObjGSPD5.ftext = Convert.ToString(row["ftext"]);
                        //ObjGSPD.furl = Convert.ToString(row["furl"]);

                        ObjGSPD5.furl = GetYouTubeId(Convert.ToString(row["furl"]));
                        ObjGSPD5.furl = ObjGSPD5.furl;

                        ObjGSPD5.fdescription = Convert.ToString(row["fdescription"]);
                        ListGSPDA5.Add(ObjGSPD5);
                    }
                    ObjOverall.data6 = ListGSPDA5;
                }
                else
                {
                    ObjOverall.Statue = false;
                    ObjOverall.Message = "Something went wrong";
                }

                //free material end

                //paid material data start

                if (ds.Tables[6].Rows.Count > 0)
                {
                    ObjOverall.Statue = true;
                    ObjOverall.Message = "Data Found";
                    foreach (DataRow row in ds.Tables[6].Rows)
                    {


                        GetSavedPaidData ObjGSPD6 = new GetSavedPaidData();

                        ObjGSPD6.paidid = Convert.ToInt32(row["paidid"]);
                        ObjGSPD6.categoryname = Convert.ToString(row["categoryname"]);
                        ObjGSPD6.prepname = Convert.ToString(row["prepname"]);
                        ObjGSPD6.paidname = Convert.ToString(row["paidname"]);
                        ObjGSPD6.paidtext = Convert.ToString(row["paidtext"]);
                        //ObjGSPD.paidurl = Convert.ToString(row["paidurl"]);

                        ObjGSPD6.paidurl = GetYouTubeId(Convert.ToString(row["paidurl"]));
                        ObjGSPD6.paidurl =  ObjGSPD6.paidurl;

                        ObjGSPD6.paiddescription = Convert.ToString(row["paiddescription"]);


                        ListGSPDA6.Add(ObjGSPD6);
                    }

                    ObjOverall.data7 = ListGSPDA6;
                }
                else
                {
                    ObjOverall.Statue = false;
                    ObjOverall.Message = "Something went wrong";
                }
                //paid material data end





            }
            catch (Exception e)
            {
                ObjOverall.Statue = false;
                ObjOverall.Message = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(ObjOverall, settings);
            return json;
        }



        //Api for get video id
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

        //edit previous year data
        [HttpGet]
        [Route("GetEditprevyearData")]
        public string GetEditprevyearData([FromHeader] GetPrevEditData obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetPrevEditResponse ObjGER = new GetPrevEditResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("editprevyeardata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("previd", obj.prevyearid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGER.Status = true;
                    ObjGER.Message = "Data Found";
                    GetPrevEditData ObjGED = new GetPrevEditData();

                    ObjGED.prevyearid = Convert.ToInt32(ds.Tables[0].Rows[0]["prevyearid"]);

                    ObjGED.prepid = Convert.ToInt32(ds.Tables[0].Rows[0]["prepid"]);
                    ObjGED.prepnameid = Convert.ToInt32(ds.Tables[0].Rows[0]["prepnameid"]);
                    ObjGED.pname = Convert.ToString(ds.Tables[0].Rows[0]["pname"]);
                    ObjGED.ptext = Convert.ToString(ds.Tables[0].Rows[0]["ptext"]);
                    ObjGED.purl = Convert.ToString(ds.Tables[0].Rows[0]["purl"]);


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
        [Route("Deleteprevyeardata")]
        public string Deleteprevyeardata([FromBody] PersonalPreviousyearParam obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            PersonalPreviousyearResponse ObjAMR = new PersonalPreviousyearResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Deleteprevyeardata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("prev_id", obj.prevyearid);

               
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

        //Api start for sample paper

        //save sample paper

        [HttpPost]
        [Route("savesampledata")]
        public async Task<IActionResult> Savesampledata([FromForm] IFormFile pdf, [FromForm] IFormFile image, [FromForm] string sampleid,
      [FromForm] string prepid, [FromForm] string prepnameid, [FromForm] string sname, [FromForm] string stext,
      [FromForm] string surl, [FromForm] string orgpdfname, [FromForm] string orgimagename, [FromForm] string createdby)

        {
            string json = "";
            string result = "";

            DataSet ds = new DataSet();
            PersonalSampleResponse objppfr = new PersonalSampleResponse();
            PersonalSampleParam objppfp = new PersonalSampleParam();




            try
            {
                samplepdfguid = Guid.NewGuid().ToString();
                samplepdffilename = samplepdfguid + pdf.FileName;

                var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "samplepdf");
                if (pdf.Length > 0)
                {
                    var filePath = Path.Combine(uploads, samplepdffilename);
                    samplepdfpath = filePath;
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
            try
            {
                sampleimageguid = Guid.NewGuid().ToString();
                sampleimagefilename = sampleimageguid + image.FileName;

                var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "sampleimage");
                if (image.Length > 0)
                {
                    var filePath = Path.Combine(uploads, sampleimagefilename);
                    sampleimagepath = filePath;
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await image.CopyToAsync(fileStream);
                    }
                }
            }
            catch (Exception e)
            {
                string Message = e.Message;
            }



            objppfp.sampleid = Convert.ToInt32(sampleid);
            objppfp.prepid = Convert.ToInt32(prepid);
            objppfp.prepnameid = Convert.ToInt32(prepnameid);
            objppfp.sname = Convert.ToString(sname);
            objppfp.stext = Convert.ToString(stext);
            objppfp.surl = Convert.ToString(surl);

            objppfp.orgpdfname = Convert.ToString(orgpdfname);
            objppfp.orgimagename = Convert.ToString(orgimagename);
            objppfp.createdby = Convert.ToInt32(createdby);


            try
            {

                objppfp.newpdfname = samplepdfguid;
                objppfp.newimagename = sampleimageguid;
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("savesamplepage", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("sampleid", objppfp.sampleid);
                cmd.Parameters.AddWithValue("prepid", objppfp.prepid);
                cmd.Parameters.AddWithValue("prepnameid", objppfp.prepnameid);
                cmd.Parameters.AddWithValue("sname", objppfp.sname);
                cmd.Parameters.AddWithValue("stext", objppfp.stext);
                cmd.Parameters.AddWithValue("surl", objppfp.surl);


                cmd.Parameters.AddWithValue("orgpdfname", objppfp.orgpdfname);
                cmd.Parameters.AddWithValue("newpdfname", objppfp.newpdfname);
                cmd.Parameters.AddWithValue("orgimagename", objppfp.orgimagename);
                cmd.Parameters.AddWithValue("newimagename", objppfp.newimagename);



                cmd.Parameters.AddWithValue("pdfpath", samplepdfpath);
                cmd.Parameters.AddWithValue("imagepath", sampleimagepath);

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

        //get data for bind sample table
        [HttpGet]
        [Route("Bindsampletabledata")]
        public string Bindsampletabledata()
        {
            string json = "";
            DataSet ds = new DataSet();
            GetSavedSampleDataResponse ObjGSPDR = new GetSavedSampleDataResponse();
            List<GetSavedSampleData> ListGSPD = new List<GetSavedSampleData>();

            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getsavesampledata", con);
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
                        GetSavedSampleData ObjGSPD = new GetSavedSampleData();

                        ObjGSPD.sampleid = Convert.ToInt32(row["sampleid"]);
                        ObjGSPD.categoryname = Convert.ToString(row["categoryname"]);
                        ObjGSPD.prepname = Convert.ToString(row["prepname"]);
                        ObjGSPD.sname = Convert.ToString(row["sname"]);
                        ObjGSPD.stext = Convert.ToString(row["stext"]);
                        ObjGSPD.surl = Convert.ToString(row["surl"]);

                       // ObjGSPD.surl = GetYouTubeId(Convert.ToString(row["surl"]));
                       // ObjGSPD.surl = "https://www.youtube.com/embed/"+ObjGSPD.surl;

                        ObjGSPD.docname = "http://admin.careerprabhu.com/" + "samplepdf/" + Convert.ToString(row["filename"]);
                        ObjGSPD.imagename = "http://admin.careerprabhu.com/" + "sampleimage/" + Convert.ToString(row["imagename"]);
                        if (Convert.ToString(row["filename"]) == "" || Convert.ToString(row["filename"]) == null)
                        {
                            ObjGSPD.docname = "";
                        }
                        if (Convert.ToString(row["imagename"]) == "" || Convert.ToString(row["imagename"]) == null)
                        {
                            ObjGSPD.imagename = "";
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

        //edit sample test data
        [HttpGet]
        [Route("GetEditsampleData")]
        public string GetEditsampleData([FromHeader] GetSampleEditData obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetSampleEditResponse ObjGER = new GetSampleEditResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("editsampledata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("sample_id", obj.sampleid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGER.Status = true;
                    ObjGER.Message = "Data Found";
                    GetSampleEditData ObjGED = new GetSampleEditData();

                    ObjGED.sampleid = Convert.ToInt32(ds.Tables[0].Rows[0]["sampleid"]);

                    ObjGED.prepid = Convert.ToInt32(ds.Tables[0].Rows[0]["prepid"]);
                    ObjGED.prepnameid = Convert.ToInt32(ds.Tables[0].Rows[0]["prepnameid"]);
                    ObjGED.sname = Convert.ToString(ds.Tables[0].Rows[0]["sname"]);
                    ObjGED.stext = Convert.ToString(ds.Tables[0].Rows[0]["stext"]);
                    ObjGED.surl = Convert.ToString(ds.Tables[0].Rows[0]["surl"]);


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

        //update sample paper

        [HttpPost]
        [Route("updatesampledata")]
        public async Task<IActionResult> Updatesampledata([FromForm] IFormFile pdf, [FromForm] IFormFile image, [FromForm] string sampleid,
      [FromForm] string prepid, [FromForm] string prepnameid, [FromForm] string sname, [FromForm] string stext,
      [FromForm] string surl, [FromForm] string orgpdfname, [FromForm] string orgimagename, [FromForm] string createdby)

        {
            string json = "";
            string result = "";

            DataSet ds = new DataSet();
            PersonalSampleResponse objppfr = new PersonalSampleResponse();
            PersonalSampleParam objppfp = new PersonalSampleParam();



            if (pdf != null)
            {
                try
                {
                    samplepdfguid = Guid.NewGuid().ToString();
                    samplepdffilename = samplepdfguid + pdf.FileName;

                    var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "samplepdf");
                    if (pdf.Length > 0)
                    {
                        var filePath = Path.Combine(uploads, samplepdffilename);
                        samplepdfpath = filePath;
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

            if (image != null)
            {
                try
                {
                    sampleimageguid = Guid.NewGuid().ToString();
                    sampleimagefilename = sampleimageguid + image.FileName;

                    var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "sampleimage");
                    if (image.Length > 0)
                    {
                        var filePath = Path.Combine(uploads, sampleimagefilename);
                        sampleimagepath = filePath;
                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            await image.CopyToAsync(fileStream);
                        }
                    }
                }
                catch (Exception e)
                {
                    string Message = e.Message;
                }
            }
            else { }
           



            objppfp.sampleid = Convert.ToInt32(sampleid);
            objppfp.prepid = Convert.ToInt32(prepid);
            objppfp.prepnameid = Convert.ToInt32(prepnameid);
            objppfp.sname = Convert.ToString(sname);
            objppfp.stext = Convert.ToString(stext);
            objppfp.surl = Convert.ToString(surl);

            //objppfp.orgpdfname = Convert.ToString(orgpdfname);
            //objppfp.orgimagename = Convert.ToString(orgimagename);
            objppfp.createdby = Convert.ToInt32(createdby);


            if (orgpdfname == null)
            {
                objppfp.orgpdfname = "";
            }
            else
            {
                objppfp.orgpdfname = Convert.ToString(orgpdfname);
            }
            if (orgimagename == null)
            {
                objppfp.orgimagename = "";
            }
            else
            {
                objppfp.orgimagename = Convert.ToString(orgimagename);
            }



            try
            {

                //objppfp.newpdfname = samplepdfguid;
                //objppfp.newimagename = sampleimageguid;


                if (samplepdfguid == "")
                {
                    objppfp.newpdfname = "";
                }
                else
                {
                    objppfp.newpdfname = samplepdfguid;
                }
                if (sampleimageguid == "")
                {
                    objppfp.newimagename = "";
                }
                else
                {
                    objppfp.newimagename = sampleimageguid;
                }


                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("updatesamplepage", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("sample_id", objppfp.sampleid);
                cmd.Parameters.AddWithValue("prep_id", objppfp.prepid);
                cmd.Parameters.AddWithValue("prepname_id", objppfp.prepnameid);
                cmd.Parameters.AddWithValue("s_name", objppfp.sname);
                cmd.Parameters.AddWithValue("s_text", objppfp.stext);
                cmd.Parameters.AddWithValue("s_url", objppfp.surl);


                cmd.Parameters.AddWithValue("org_pdfname", objppfp.orgpdfname);
                cmd.Parameters.AddWithValue("new_pdfname", objppfp.newpdfname);
                cmd.Parameters.AddWithValue("org_imagename", objppfp.orgimagename);
                cmd.Parameters.AddWithValue("new_imagename", objppfp.newimagename);



                cmd.Parameters.AddWithValue("pdf_path", samplepdfpath);
                cmd.Parameters.AddWithValue("image_path", sampleimagepath);

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
        //delete sample data
        [HttpPost]
        [Route("Deletesampledata")]
        public string Deletesampledata([FromBody] PersonalSampleParam obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            PersonalSampleResponse ObjAMR = new PersonalSampleResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Deletesampledata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("sample_id", obj.sampleid);


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


        // Mock test Api start 

        //save mock test

        [HttpPost]
        [Route("savemockdata")]
        public IActionResult Savemockdata([FromForm] string mockid,
      [FromForm] string prepid, [FromForm] string prepnameid, [FromForm] string mname, [FromForm] string mtext,
      [FromForm] string murl, [FromForm] string createdby)

        {
            string json = "";
            string result = "";

            DataSet ds = new DataSet();
            PersonalMockResponse objppfr = new PersonalMockResponse();
            PersonalMockParam objppfp = new PersonalMockParam();




            objppfp.mockid = Convert.ToInt32(mockid);
            objppfp.prepid = Convert.ToInt32(prepid);
            objppfp.prepnameid = Convert.ToInt32(prepnameid);
            objppfp.mname = Convert.ToString(mname);
            objppfp.mtext = Convert.ToString(mtext);
            objppfp.murl = Convert.ToString(murl);

            objppfp.createdby = Convert.ToInt32(createdby);


            try
            {

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("savemockpage", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("mockid", objppfp.mockid);
                cmd.Parameters.AddWithValue("prepid", objppfp.prepid);
                cmd.Parameters.AddWithValue("prepnameid", objppfp.prepnameid);
                cmd.Parameters.AddWithValue("mname", objppfp.mname);
                cmd.Parameters.AddWithValue("mtext", objppfp.mtext);
                cmd.Parameters.AddWithValue("murl", objppfp.murl);


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
        //get mock test data
        [HttpGet]
        [Route("Bindmocktabledata")]
        public string Bindmocktabledata()
        {
            string json = "";
            DataSet ds = new DataSet();
            GetSavedMockDataResponse ObjGSPDR = new GetSavedMockDataResponse();
            List<GetSavedMockData> ListGSPD = new List<GetSavedMockData>();

            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getsavemockdata", con);
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
                        GetSavedMockData ObjGSPD = new GetSavedMockData();

                        ObjGSPD.mockid = Convert.ToInt32(row["mockid"]);
                        ObjGSPD.categoryname = Convert.ToString(row["categoryname"]);
                        ObjGSPD.prepname = Convert.ToString(row["prepname"]);
                        ObjGSPD.mname = Convert.ToString(row["mname"]);
                        ObjGSPD.mtext = Convert.ToString(row["mtext"]);
                        ObjGSPD.murl = Convert.ToString(row["murl"]);

                        ObjGSPD.murl = GetYouTubeId(Convert.ToString(row["murl"]));
                        ObjGSPD.murl = "https://www.youtube.com/embed/"+ObjGSPD.murl;


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

        //edit mock data
        //edit previous year data
        [HttpGet]
        [Route("GetEditmockData")]
        public string GetEditmockData([FromHeader] GetMockTestEditData obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetMockTestEditResponse ObjGER = new GetMockTestEditResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("editmockdata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("mock_id", obj.mockid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGER.Status = true;
                    ObjGER.Message = "Data Found";
                    GetMockTestEditData ObjGED = new GetMockTestEditData();

                    ObjGED.mockid = Convert.ToInt32(ds.Tables[0].Rows[0]["mockid"]);

                    ObjGED.prepid = Convert.ToInt32(ds.Tables[0].Rows[0]["prepid"]);
                    ObjGED.prepnameid = Convert.ToInt32(ds.Tables[0].Rows[0]["prepnameid"]);
                    ObjGED.mname = Convert.ToString(ds.Tables[0].Rows[0]["mname"]);
                    ObjGED.mtext = Convert.ToString(ds.Tables[0].Rows[0]["mtext"]);
                    ObjGED.murl = Convert.ToString(ds.Tables[0].Rows[0]["murl"]);


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

        //update mock test data
        [HttpPost]
        [Route("updatemockdata")]
        public IActionResult Updatemockdata([FromForm] string mockid,
      [FromForm] string prepid, [FromForm] string prepnameid, [FromForm] string mname, [FromForm] string mtext,
      [FromForm] string murl, [FromForm] string createdby)

        {
            string json = "";
            string result = "";

            DataSet ds = new DataSet();
            PersonalMockResponse objppfr = new PersonalMockResponse();
            PersonalMockParam objppfp = new PersonalMockParam();




            objppfp.mockid = Convert.ToInt32(mockid);
            objppfp.prepid = Convert.ToInt32(prepid);
            objppfp.prepnameid = Convert.ToInt32(prepnameid);
            objppfp.mname = Convert.ToString(mname);
            objppfp.mtext = Convert.ToString(mtext);
            objppfp.murl = Convert.ToString(murl);

            objppfp.createdby = Convert.ToInt32(createdby);


            try
            {

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("updatemockpage", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("mock_id", objppfp.mockid);
                cmd.Parameters.AddWithValue("prepid", objppfp.prepid);
                cmd.Parameters.AddWithValue("prepnameid", objppfp.prepnameid);
                cmd.Parameters.AddWithValue("mname", objppfp.mname);
                cmd.Parameters.AddWithValue("mtext", objppfp.mtext);
                cmd.Parameters.AddWithValue("murl", objppfp.murl);


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

        //delete mock test data
        [HttpPost]
        [Route("Deletemockdata")]
        public string Deletemockdata([FromBody] PersonalMockParam obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            PersonalMockResponse ObjAMR = new PersonalMockResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Deletemockdata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("mock_id", obj.mockid);


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

        //api start for adhoc material

        //save adhoc material
        [HttpPost]
        [Route("saveadhocdata")]
        public async Task<IActionResult> Saveadhocdata([FromForm] IFormFile pdf, [FromForm] IFormFile image,[FromForm] string adhocid,
     [FromForm] string prepid, [FromForm] string prepnameid, [FromForm] string aname, [FromForm] string atext,
     [FromForm] string aurl, [FromForm] string orgpdfname, [FromForm] string orgimagename, [FromForm] string createdby)

        {
            string json = "";
            string result = "";

            DataSet ds = new DataSet();
            PersonalAdhocResponse objppfr = new PersonalAdhocResponse();
            PersonalAdhocParam objppfp = new PersonalAdhocParam();



            try
            {
                samplepdfguid = Guid.NewGuid().ToString();
                samplepdffilename = samplepdfguid + pdf.FileName;

                var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "samplepdf");
                if (pdf.Length > 0)
                {
                    var filePath = Path.Combine(uploads, samplepdffilename);
                    samplepdfpath = filePath;
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
            try
            {
                sampleimageguid = Guid.NewGuid().ToString();
                sampleimagefilename = sampleimageguid + image.FileName;

                var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "sampleimage");
                if (image.Length > 0)
                {
                    var filePath = Path.Combine(uploads, sampleimagefilename);
                    sampleimagepath = filePath;
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await image.CopyToAsync(fileStream);
                    }
                }
            }
            catch (Exception e)
            {
                string Message = e.Message;
            }



            objppfp.adhocid = Convert.ToInt32(adhocid);
            objppfp.prepid = Convert.ToInt32(prepid);
            objppfp.prepnameid = Convert.ToInt32(prepnameid);
            objppfp.aname = Convert.ToString(aname);
            objppfp.atext = Convert.ToString(atext);
            objppfp.aurl = Convert.ToString(aurl);

            objppfp.createdby = Convert.ToInt32(createdby);


            try
            {

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("saveadhocpage", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("adhocid", objppfp.adhocid);
                cmd.Parameters.AddWithValue("prepid", objppfp.prepid);
                cmd.Parameters.AddWithValue("prepnameid", objppfp.prepnameid);
                cmd.Parameters.AddWithValue("aname", objppfp.aname);
                cmd.Parameters.AddWithValue("atext", objppfp.atext);
                cmd.Parameters.AddWithValue("aurl", objppfp.aurl);
                cmd.Parameters.AddWithValue("orgpdfname", orgpdfname);
                cmd.Parameters.AddWithValue("newpdfname", samplepdfguid);
                cmd.Parameters.AddWithValue("orgimagename", orgimagename);
                cmd.Parameters.AddWithValue("newimagename", sampleimageguid);





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

        //bind adhoc material data
        [HttpGet]
        [Route("Bindadhoctabledata")]
        public string Bindadhoctabledata()
        {
            string json = "";
            DataSet ds = new DataSet();
            GetSavedAdhocDataResponse ObjGSPDR = new GetSavedAdhocDataResponse();
            List<GetSavedAdhocData> ListGSPD = new List<GetSavedAdhocData>();

            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getsaveadhocdata", con);
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
                        GetSavedAdhocData ObjGSPD = new GetSavedAdhocData();

                        ObjGSPD.adhocid = Convert.ToInt32(row["adhocid"]);
                        ObjGSPD.categoryname = Convert.ToString(row["categoryname"]);
                        ObjGSPD.prepname = Convert.ToString(row["prepname"]);
                        ObjGSPD.aname = Convert.ToString(row["aname"]);
                        ObjGSPD.atext = Convert.ToString(row["atext"]);
                        ObjGSPD.aurl = Convert.ToString(row["aurl"]);
                        // ObjGSPD.aurl = GetYouTubeId(Convert.ToString(row["aurl"]));
                        // ObjGSPD.aurl = "https://www.youtube.com/embed/" + ObjGSPD.aurl;



                        ObjGSPD.docname = "http://admin.careerprabhu.com/" + "samplepdf/" + Convert.ToString(row["filename"]);
                        ObjGSPD.imagename = "http://admin.careerprabhu.com/" + "sampleimage/" + Convert.ToString(row["imagename"]);
                        if (Convert.ToString(row["filename"]) == "" || Convert.ToString(row["filename"]) == null)
                        {
                            ObjGSPD.docname = "";
                        }
                        if (Convert.ToString(row["imagename"]) == "" || Convert.ToString(row["imagename"]) == null)
                        {
                            ObjGSPD.imagename = "";
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
        [Route("GetEditadhocData")]
        public string GetEditadhocData([FromHeader] GetAdhocTestEditData obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetAdhocTestEditResponse ObjGER = new GetAdhocTestEditResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("editadhocdata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("adhoc_id", obj.adhocid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGER.Status = true;
                    ObjGER.Message = "Data Found";
                    GetAdhocTestEditData ObjGED = new GetAdhocTestEditData();

                    ObjGED.adhocid = Convert.ToInt32(ds.Tables[0].Rows[0]["adhocid"]);

                    ObjGED.prepid = Convert.ToInt32(ds.Tables[0].Rows[0]["prepid"]);
                    ObjGED.prepnameid = Convert.ToInt32(ds.Tables[0].Rows[0]["prepnameid"]);
                    ObjGED.aname = Convert.ToString(ds.Tables[0].Rows[0]["aname"]);
                    ObjGED.atext = Convert.ToString(ds.Tables[0].Rows[0]["atext"]);
                    ObjGED.aurl = Convert.ToString(ds.Tables[0].Rows[0]["aurl"]);


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

        //update adhoc material
        [HttpPost]
        [Route("updateadhocdata")]
        public async Task<IActionResult> Updateadhocdata([FromForm] IFormFile pdf, [FromForm] IFormFile image,[FromForm] string adhocid,
    [FromForm] string prepid, [FromForm] string prepnameid, [FromForm] string aname, [FromForm] string atext,
    [FromForm] string aurl, [FromForm] string orgpdfname, [FromForm] string orgimagename, [FromForm] string createdby)

        {
            string json = "";
            string result = "";

            DataSet ds = new DataSet();
            PersonalAdhocResponse objppfr = new PersonalAdhocResponse();
            PersonalAdhocParam objppfp = new PersonalAdhocParam();

            if (pdf != null)
            {
                try
                {
                    samplepdfguid = Guid.NewGuid().ToString();
                    samplepdffilename = samplepdfguid + pdf.FileName;

                    var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "samplepdf");
                    if (pdf.Length > 0)
                    {
                        var filePath = Path.Combine(uploads, samplepdffilename);
                        samplepdfpath = filePath;
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

            if (image != null)
            {
                try
                {
                    sampleimageguid = Guid.NewGuid().ToString();
                    sampleimagefilename = sampleimageguid + image.FileName;

                    var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "sampleimage");
                    if (image.Length > 0)
                    {
                        var filePath = Path.Combine(uploads, sampleimagefilename);
                        sampleimagepath = filePath;
                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            await image.CopyToAsync(fileStream);
                        }
                    }
                }
                catch (Exception e)
                {
                    string Message = e.Message;
                }
            }
            else { }


            objppfp.adhocid = Convert.ToInt32(adhocid);
            objppfp.prepid = Convert.ToInt32(prepid);
            objppfp.prepnameid = Convert.ToInt32(prepnameid);
            objppfp.aname = Convert.ToString(aname);
            objppfp.atext = Convert.ToString(atext);
            objppfp.aurl = Convert.ToString(aurl);

            objppfp.createdby = Convert.ToInt32(createdby);

            if (orgpdfname == null)
            {
                orgpdfname = "";
            }
            else
            {
                orgpdfname = Convert.ToString(orgpdfname);
            }
            if (orgimagename == null)
            {
                orgimagename = "";
            }
            else
            {
                orgimagename = Convert.ToString(orgimagename);
            }


            try
            {




                if (samplepdfguid == "")
                {
                    samplepdfguid = "";
                }
                else
                {
                  
                }
                if (sampleimageguid == "")
                {
                    sampleimageguid = "";
                }
                else
                {
                    
                }

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("updateadhocpage", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("adhoc_id", objppfp.adhocid);
                cmd.Parameters.AddWithValue("prepid", objppfp.prepid);
                cmd.Parameters.AddWithValue("prepnameid", objppfp.prepnameid);
                cmd.Parameters.AddWithValue("aname", objppfp.aname);
                cmd.Parameters.AddWithValue("atext", objppfp.atext);
                cmd.Parameters.AddWithValue("aurl", objppfp.aurl);
                cmd.Parameters.AddWithValue("org_pdfname", orgpdfname);
                cmd.Parameters.AddWithValue("new_pdfname", samplepdfguid);
                cmd.Parameters.AddWithValue("org_imagename", orgimagename);
                cmd.Parameters.AddWithValue("new_imagename", sampleimageguid);


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

        //delete adhoc material
        [HttpPost]
        [Route("Deleteadhocdata")]
        public string Deleteadhocdata([FromBody] PersonalAdhocParam obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            PersonalAdhocResponse ObjAMR = new PersonalAdhocResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Deleteadhocdata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("adhoc_id", obj.adhocid);


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

        //API for prepratory resources start here

        //save resources
        [HttpPost]
        [Route("saveresourcedata")]
        public IActionResult Saveresourcedata([FromForm] string resourceid,
   [FromForm] string prepid, [FromForm] string prepnameid, [FromForm] string rname, [FromForm] string rtext,
   [FromForm] string rurl, [FromForm] string author, [FromForm] string publish, [FromForm] string description, [FromForm] string createdby)

        {
            string json = "";
            string result = "";

            DataSet ds = new DataSet();
            PersonalResourceResponse objppfr = new PersonalResourceResponse();
            PersonalResourceParam objppfp = new PersonalResourceParam();




            objppfp.resourceid = Convert.ToInt32(resourceid);
            objppfp.prepid = Convert.ToInt32(prepid);
            objppfp.prepnameid = Convert.ToInt32(prepnameid);
            objppfp.rname = Convert.ToString(rname);
            objppfp.rtext = Convert.ToString(rtext);
            objppfp.rurl = Convert.ToString(rurl);

            objppfp.author = Convert.ToString(author);
            objppfp.publish = Convert.ToString(publish);
            objppfp.description = Convert.ToString(description);

            objppfp.createdby = Convert.ToInt32(createdby);


            try
            {

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("saveresourcepage", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("resourceid", objppfp.resourceid);
                cmd.Parameters.AddWithValue("prepid", objppfp.prepid);
                cmd.Parameters.AddWithValue("prepnameid", objppfp.prepnameid);
                cmd.Parameters.AddWithValue("rname", objppfp.rname);
                cmd.Parameters.AddWithValue("rtext", objppfp.rtext);
                cmd.Parameters.AddWithValue("rurl", objppfp.rurl);

                cmd.Parameters.AddWithValue("author", objppfp.author);
                cmd.Parameters.AddWithValue("publish", objppfp.publish);
                cmd.Parameters.AddWithValue("description", objppfp.description);


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

        //bind table of resource
        [HttpGet]
        [Route("Bindresourcetabledata")]
        public string Bindresourcetabledata()
        {
            string json = "";
            DataSet ds = new DataSet();
            GetSavedResourceResponse ObjGSPDR = new GetSavedResourceResponse();
            List<GetSavedResourceData> ListGSPD = new List<GetSavedResourceData>();

            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getsaveresourceata", con);
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
                        GetSavedResourceData ObjGSPD = new GetSavedResourceData();

                        ObjGSPD.resourceid = Convert.ToInt32(row["resourceid"]);
                        ObjGSPD.categoryname = Convert.ToString(row["categoryname"]);
                        ObjGSPD.prepname = Convert.ToString(row["prepname"]);
                        ObjGSPD.rname = Convert.ToString(row["rname"]);
                        ObjGSPD.rtext = Convert.ToString(row["rtext"]);
                        //ObjGSPD.rurl = Convert.ToString(row["rurl"]);

                        ObjGSPD.rurl = GetYouTubeId(Convert.ToString(row["rurl"]));
                        ObjGSPD.rurl = "https://www.youtube.com/embed/"+ObjGSPD.rurl;

                        ObjGSPD.author = Convert.ToString(row["author"]);
                        ObjGSPD.description = Convert.ToString(row["description"]);
                        ObjGSPD.publish = Convert.ToString(row["publish"]);

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

        //edit prepratoy resource data
        [HttpGet]
        [Route("GetEditresourceData")]
        public string GetEditresourceData([FromHeader] GetResourceEditData obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetResourceEditResponse ObjGER = new GetResourceEditResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("editresourcedata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("resource_id", obj.resourceid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGER.Status = true;
                    ObjGER.Message = "Data Found";
                    GetResourceEditData ObjGED = new GetResourceEditData();

                    ObjGED.resourceid = Convert.ToInt32(ds.Tables[0].Rows[0]["resourceid"]);

                    ObjGED.prepid = Convert.ToInt32(ds.Tables[0].Rows[0]["prepid"]);
                    ObjGED.prepnameid = Convert.ToInt32(ds.Tables[0].Rows[0]["prepnameid"]);
                    ObjGED.rname = Convert.ToString(ds.Tables[0].Rows[0]["rname"]);
                    ObjGED.rtext = Convert.ToString(ds.Tables[0].Rows[0]["rtext"]);
                    ObjGED.rurl = Convert.ToString(ds.Tables[0].Rows[0]["rurl"]);
                    ObjGED.author = Convert.ToString(ds.Tables[0].Rows[0]["author"]);
                    ObjGED.publish = Convert.ToString(ds.Tables[0].Rows[0]["publish"]);
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

        //update resource data
        [HttpPost]
        [Route("updateresourcedata")]
        public IActionResult Updateresourcedata([FromForm] string resourceid,
   [FromForm] string prepid, [FromForm] string prepnameid, [FromForm] string rname, [FromForm] string rtext,
   [FromForm] string rurl, [FromForm] string author, [FromForm] string publish, [FromForm] string description, [FromForm] string createdby)

        {
            string json = "";
            string result = "";

            DataSet ds = new DataSet();
            PersonalResourceResponse objppfr = new PersonalResourceResponse();
            PersonalResourceParam objppfp = new PersonalResourceParam();




            objppfp.resourceid = Convert.ToInt32(resourceid);
            objppfp.prepid = Convert.ToInt32(prepid);
            objppfp.prepnameid = Convert.ToInt32(prepnameid);
            objppfp.rname = Convert.ToString(rname);
            objppfp.rtext = Convert.ToString(rtext);
            objppfp.rurl = Convert.ToString(rurl);

            objppfp.author = Convert.ToString(author);
            objppfp.publish = Convert.ToString(publish);
            objppfp.description = Convert.ToString(description);

            objppfp.createdby = Convert.ToInt32(createdby);


            try
            {

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("updateresourcepage", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("resource_id", objppfp.resourceid);
                cmd.Parameters.AddWithValue("prepid", objppfp.prepid);
                cmd.Parameters.AddWithValue("prepnameid", objppfp.prepnameid);
                cmd.Parameters.AddWithValue("rname", objppfp.rname);
                cmd.Parameters.AddWithValue("rtext", objppfp.rtext);
                cmd.Parameters.AddWithValue("rurl", objppfp.rurl);

                cmd.Parameters.AddWithValue("author", objppfp.author);
                cmd.Parameters.AddWithValue("publish", objppfp.publish);
                cmd.Parameters.AddWithValue("description", objppfp.description);


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

        //delete resource data
        [HttpPost]
        [Route("Deleteresourcedata")]
        public string Deleteresourcedata([FromBody] PersonalResourceParam obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            PersonalAdhocResponse ObjAMR = new PersonalAdhocResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Deleteresourcedata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("resource_id", obj.resourceid);


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


        //API start for online free links
        //Api for save free links

        [HttpPost]
        [Route("savefreedata")]
        public IActionResult Savefreedata([FromForm] string freeid,
  [FromForm] string prepid, [FromForm] string prepnameid, [FromForm] string fname, [FromForm] string ftext,
  [FromForm] string furl, [FromForm] string fdescription, [FromForm] string createdby)

        {
            string json = "";
            string result = "";

            DataSet ds = new DataSet();
            PersonalFreeResponse objppfr = new PersonalFreeResponse();
            PersonalFreeParam objppfp = new PersonalFreeParam();




            objppfp.freeid = Convert.ToInt32(freeid);
            objppfp.prepid = Convert.ToInt32(prepid);
            objppfp.prepnameid = Convert.ToInt32(prepnameid);
            objppfp.fname = Convert.ToString(fname);
            objppfp.ftext = Convert.ToString(ftext);
            objppfp.furl = Convert.ToString(furl);
            objppfp.fdescription = Convert.ToString(fdescription);

            objppfp.createdby = Convert.ToInt32(createdby);


            try
            {

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("savefreepage", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("freeid", objppfp.freeid);
                cmd.Parameters.AddWithValue("prepid", objppfp.prepid);
                cmd.Parameters.AddWithValue("prepnameid", objppfp.prepnameid);
                cmd.Parameters.AddWithValue("fname", objppfp.fname);
                cmd.Parameters.AddWithValue("ftext", objppfp.ftext);
                cmd.Parameters.AddWithValue("furl", objppfp.furl);
;
                cmd.Parameters.AddWithValue("fdescription", objppfp.fdescription);


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

        //APi bind free link data
        [HttpGet]
        [Route("Bindfreetabledata")]
        public string Bindfreetabledata()
        {
            string json = "";
            DataSet ds = new DataSet();
            GetSavedFreeResponse ObjGSPDR = new GetSavedFreeResponse();
            List<GetSavedFreeData> ListGSPDA = new List<GetSavedFreeData>();

            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getsavefreedata", con);
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
                        GetSavedFreeData ObjGSPD = new GetSavedFreeData();

                        ObjGSPD.freeid = Convert.ToInt32(row["freeid"]);
                        ObjGSPD.categoryname = Convert.ToString(row["categoryname"]);
                        ObjGSPD.prepname = Convert.ToString(row["prepname"]);
                        ObjGSPD.fname = Convert.ToString(row["fname"]);
                        ObjGSPD.ftext = Convert.ToString(row["ftext"]);
                        //ObjGSPD.furl = Convert.ToString(row["furl"]);

                        ObjGSPD.furl = GetYouTubeId(Convert.ToString(row["furl"]));
                        ObjGSPD.furl = "https://www.youtube.com/embed/"+ObjGSPD.furl;

                        ObjGSPD.fdescription = Convert.ToString(row["fdescription"]);


                        ListGSPDA.Add(ObjGSPD);
                    }
                    ObjGSPDR.data = ListGSPDA;
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

        //API for edit free links

        [HttpGet]
        [Route("GetEditfreeData")]
        public string GetEditfreeData([FromHeader] GetFreeEditData obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetFreeEditResponse ObjGER = new GetFreeEditResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("editfreedata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("free_id", obj.freeid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGER.Status = true;
                    ObjGER.Message = "Data Found";
                    GetFreeEditData ObjGED = new GetFreeEditData();

                    ObjGED.freeid = Convert.ToInt32(ds.Tables[0].Rows[0]["freeid"]);

                    ObjGED.prepid = Convert.ToInt32(ds.Tables[0].Rows[0]["prepid"]);
                    ObjGED.prepnameid = Convert.ToInt32(ds.Tables[0].Rows[0]["prepnameid"]);
                    ObjGED.fname = Convert.ToString(ds.Tables[0].Rows[0]["fname"]);
                    ObjGED.ftext = Convert.ToString(ds.Tables[0].Rows[0]["ftext"]);
                    ObjGED.furl = Convert.ToString(ds.Tables[0].Rows[0]["furl"]);
                   
                    ObjGED.fdescription = Convert.ToString(ds.Tables[0].Rows[0]["fdescription"]);


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

        //API for upate free links
        [HttpPost]
        [Route("updatefreedata")]
        public IActionResult Updatefreedata([FromForm] string freeid,
[FromForm] string prepid, [FromForm] string prepnameid, [FromForm] string fname, [FromForm] string ftext,
[FromForm] string furl, [FromForm] string fdescription, [FromForm] string createdby)

        {
            string json = "";
            string result = "";

            DataSet ds = new DataSet();
            PersonalFreeResponse objppfr = new PersonalFreeResponse();
            PersonalFreeParam objppfp = new PersonalFreeParam();




            objppfp.freeid = Convert.ToInt32(freeid);
            objppfp.prepid = Convert.ToInt32(prepid);
            objppfp.prepnameid = Convert.ToInt32(prepnameid);
            objppfp.fname = Convert.ToString(fname);
            objppfp.ftext = Convert.ToString(ftext);
            objppfp.furl = Convert.ToString(furl);
            objppfp.fdescription = Convert.ToString(fdescription);

            objppfp.createdby = Convert.ToInt32(createdby);


            try
            {

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("updatefreepage", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("free_id", objppfp.freeid);
                cmd.Parameters.AddWithValue("prepid", objppfp.prepid);
                cmd.Parameters.AddWithValue("prepnameid", objppfp.prepnameid);
                cmd.Parameters.AddWithValue("fname", objppfp.fname);
                cmd.Parameters.AddWithValue("ftext", objppfp.ftext);
                cmd.Parameters.AddWithValue("furl", objppfp.furl);
                ;
                cmd.Parameters.AddWithValue("fdescription", objppfp.fdescription);


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

        //Api for delete free links
        [HttpPost]
        [Route("Deletefreedata")]
        public string Deletefreedata([FromBody] PersonalFreeParam obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            PersonalFreeResponse ObjAMR = new PersonalFreeResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Deletefreedata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("free_id", obj.freeid);


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

        //Api start for  paid link

        //save paid link

        [HttpPost]
        [Route("savepaiddata")]
        public IActionResult Savepaiddata([FromForm] string paidid,
 [FromForm] string prepid, [FromForm] string prepnameid, [FromForm] string paidname, [FromForm] string paidtext,
 [FromForm] string paidurl, [FromForm] string paiddescription, [FromForm] string createdby)

        {
            string json = "";
            string result = "";

            DataSet ds = new DataSet();
            PersonalPaidResponse objppfr = new PersonalPaidResponse();
            PersonalPaidParam objppfp = new PersonalPaidParam();




            objppfp.paidid = Convert.ToInt32(paidid);
            objppfp.prepid = Convert.ToInt32(prepid);
            objppfp.prepnameid = Convert.ToInt32(prepnameid);
            objppfp.paidname = Convert.ToString(paidname);
            objppfp.paidtext = Convert.ToString(paidtext);
            objppfp.paidurl = Convert.ToString(paidurl);
            objppfp.paiddescription = Convert.ToString(paiddescription);

            objppfp.createdby = Convert.ToInt32(createdby);


            try
            {

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("savepaidpage", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("paidid", objppfp.paidid);
                cmd.Parameters.AddWithValue("prepid", objppfp.prepid);
                cmd.Parameters.AddWithValue("prepnameid", objppfp.prepnameid);
                cmd.Parameters.AddWithValue("paidname", objppfp.paidname);
                cmd.Parameters.AddWithValue("paidtext", objppfp.paidtext);
                cmd.Parameters.AddWithValue("paidurl", objppfp.paidurl);
                ;
                cmd.Parameters.AddWithValue("paiddescription", objppfp.paiddescription);


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

        //bind paid link table
        [HttpGet]
        [Route("Bindpaidtabledata")]
        public string Bindpaidtabledata()
        {
            string json = "";
            DataSet ds = new DataSet();
            GetSavedPaidResponse ObjGSPDR = new GetSavedPaidResponse();
            List<GetSavedPaidData> ListGSPDA = new List<GetSavedPaidData>();

            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getsavepaiddata", con);
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
                        GetSavedPaidData ObjGSPD = new GetSavedPaidData();

                        ObjGSPD.paidid = Convert.ToInt32(row["paidid"]);
                        ObjGSPD.categoryname = Convert.ToString(row["categoryname"]);
                        ObjGSPD.prepname = Convert.ToString(row["prepname"]);
                        ObjGSPD.paidname = Convert.ToString(row["paidname"]);
                        ObjGSPD.paidtext = Convert.ToString(row["paidtext"]);
                        //ObjGSPD.paidurl = Convert.ToString(row["paidurl"]);

                        ObjGSPD.paidurl = GetYouTubeId(Convert.ToString(row["paidurl"]));
                        ObjGSPD.paidurl = "https://www.youtube.com/embed/" + ObjGSPD.paidurl;

                        ObjGSPD.paiddescription = Convert.ToString(row["paiddescription"]);


                        ListGSPDA.Add(ObjGSPD);
                    }
                    ObjGSPDR.data = ListGSPDA;
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

        //edit paid links
        [HttpGet]
        [Route("GetEditpaidData")]
        public string GetEditpaidData([FromHeader] GetPaidEditData obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetPaidEditResponse ObjGER = new GetPaidEditResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("editpaiddata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("paid_id", obj.paidid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGER.Status = true;
                    ObjGER.Message = "Data Found";
                    GetPaidEditData ObjGED = new GetPaidEditData();

                    ObjGED.paidid = Convert.ToInt32(ds.Tables[0].Rows[0]["paidid"]);

                    ObjGED.prepid = Convert.ToInt32(ds.Tables[0].Rows[0]["prepid"]);
                    ObjGED.prepnameid = Convert.ToInt32(ds.Tables[0].Rows[0]["prepnameid"]);
                    ObjGED.paidname = Convert.ToString(ds.Tables[0].Rows[0]["paidname"]);
                    ObjGED.paidtext = Convert.ToString(ds.Tables[0].Rows[0]["paidtext"]);
                    ObjGED.paidurl = Convert.ToString(ds.Tables[0].Rows[0]["paidurl"]);

                    ObjGED.paiddescription = Convert.ToString(ds.Tables[0].Rows[0]["paiddescription"]);


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


        //api for update links

        [HttpPost]
        [Route("updatepaiddata")]
        public IActionResult Updatepaiddata([FromForm] string paidid,
[FromForm] string prepid, [FromForm] string prepnameid, [FromForm] string paidname, [FromForm] string paidtext,
[FromForm] string paidurl, [FromForm] string paiddescription, [FromForm] string createdby)

        {
            string json = "";
            string result = "";

            DataSet ds = new DataSet();
            PersonalPaidResponse objppfr = new PersonalPaidResponse();
            PersonalPaidParam objppfp = new PersonalPaidParam();




            objppfp.paidid = Convert.ToInt32(paidid);
            objppfp.prepid = Convert.ToInt32(prepid);
            objppfp.prepnameid = Convert.ToInt32(prepnameid);
            objppfp.paidname = Convert.ToString(paidname);
            objppfp.paidtext = Convert.ToString(paidtext);
            objppfp.paidurl = Convert.ToString(paidurl);
            objppfp.paiddescription = Convert.ToString(paiddescription);

            objppfp.createdby = Convert.ToInt32(createdby);


            try
            {

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("updatepaidpage", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("paid_id", objppfp.paidid);
                cmd.Parameters.AddWithValue("prepid", objppfp.prepid);
                cmd.Parameters.AddWithValue("prepnameid", objppfp.prepnameid);
                cmd.Parameters.AddWithValue("paidname", objppfp.paidname);
                cmd.Parameters.AddWithValue("paidtext", objppfp.paidtext);
                cmd.Parameters.AddWithValue("paidurl", objppfp.paidurl);
                ;
                cmd.Parameters.AddWithValue("paiddescription", objppfp.paiddescription);


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

        //api for delete paid links

        [HttpPost]
        [Route("Deletepaiddata")]
        public string Deletepaiddata([FromBody] PersonalPaidParam obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            PersonalPaidResponse ObjAMR = new PersonalPaidResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Deletepaiddata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("paid_id", obj.paidid);


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
    //class for bind prepratorycategory



    //get overall bind response
    public class GetAllUploadData
    {
        public Int32 prepid { get; set; }
        public string prepnameid { get; set; }
    }

    public class GetOverallResponse
    {
        public bool Statue { get; set; }
        public string Message { get; set; }

        public List<GetSavedPrevEssayData> data1 { get; set; }
        public List<GetSavedSampleData> data2 { get; set; }
        public List<GetSavedMockData> data3 { get; set; }
        public List<GetSavedAdhocData> data4 { get; set; }
        public List<GetSavedResourceData> data5 { get; set; }
        public List<GetSavedFreeData> data6 { get; set; }
        public List<GetSavedPaidData> data7 { get; set; }

    }


    public class GetprepratoryuploadResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetprepratoryuploadData> data { get; set; }
    }
    public class GetprepratoryuploadData
    {
        public Int32 prepid { get; set; }
        public string categoryname { get; set; }
    }

    //class for bind title
    public class GettitleResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GettitleData> data { get; set; }
    }
    public class GettitleData
    {
        public Int32 prepnameid { get; set; }
        public string prepname { get; set; }
        public Int32 prepid { get; set; }
    }

    //class for save previous year paper
    public class PersonalPreviousyearResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
    }
    public class PersonalPreviousyearParam
    {

        public Int32 prevyearid { get; set; } = 0;
        public Int32 prepid { get; set; } = 0;
        public Int32 prepnameid { get; set; } = 0;
        public string pname { get; set; } = "";
        public string ptext { get; set; } = "";
        public string purl { get; set; } = "";


        public string orgpdfname { get; set; } = "";
        public string newpdfname { get; set; } = "";
        public string orgimagename { get; set; } = "";
        public string newimagename { get; set; } = "";

        public Int32 createdby { get; set; }
        public string message { get; set; } = "";
        public string pdftoupload { get; set; }

    }

    //class for bind table
    public class GetSavedPrevDataResponse
    {
        public bool Statue { get; set; }
        public string Message { get; set; }

        public List<GetSavedPrevEssayData> data { get; set; }


    }
    public class GetSavedPrevEssayData
    {
        public Int32 prevyearid { get; set; } = 0;
        public Int32 prepid { get; set; } = 0;
        public Int32 prepnameid { get; set; } = 0;
        public string pname { get; set; } = "";
        public string ptext { get; set; } = "";
        public string purl { get; set; } = "";
        public string categoryname { get; set; } = "";
        public string prepname { get; set; } = "";


        public string orgpdfname { get; set; } = "";
        public string newpdfname { get; set; } = "";
        public string orgimagename { get; set; } = "";
        public string newimagename { get; set; } = "";

        public Int32 createdby { get; set; }
        public string message { get; set; } = "";
        public string pdftoupload { get; set; }
        public string docname { get; set; }
        public string imagename { get; set; }

    }

    //class for edit previous year data
    public class GetPrevEditResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public GetPrevEditData data { get; set; }
    }
    public class GetPrevEditData
    {
        public Int32 prevyearid { get; set; } = 0;
        public Int32 prepid { get; set; } = 0;
        public string categoryname { get; set; } = "";
        public Int32 prepnameid { get; set; } = 0;
        public string prepname { get; set; } = "";
        public string pname { get; set; } = "";
        public string ptext { get; set; } = "";
        public string purl { get; set; } = "";
 
    }


    //classes start for sample paper

        //save sample paper
    public class PersonalSampleResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
    }
    public class PersonalSampleParam
    {

        public Int32 sampleid { get; set; } = 0;
        public Int32 prepid { get; set; } = 0;
        public Int32 prepnameid { get; set; } = 0;
        public string sname { get; set; } = "";
        public string stext { get; set; } = "";
        public string surl { get; set; } = "";


        public string orgpdfname { get; set; } = "";
        public string newpdfname { get; set; } = "";
        public string orgimagename { get; set; } = "";
        public string newimagename { get; set; } = "";

        public Int32 createdby { get; set; }
        public string message { get; set; } = "";
        public string pdftoupload { get; set; }

    }
    //class for bind sample table
    public class GetSavedSampleDataResponse
    {
        public bool Statue { get; set; }
        public string Message { get; set; }

        public List<GetSavedSampleData> data { get; set; }

    }
    public class GetSavedSampleData
    {
        public Int32 sampleid { get; set; } = 0;
        public Int32 prepid { get; set; } = 0;
        public Int32 prepnameid { get; set; } = 0;
        public string sname { get; set; } = "";
        public string stext { get; set; } = "";
        public string surl { get; set; } = "";
        public string categoryname { get; set; } = "";
        public string prepname { get; set; } = "";


        public string orgpdfname { get; set; } = "";
        public string newpdfname { get; set; } = "";
        public string orgimagename { get; set; } = "";
        public string newimagename { get; set; } = "";

        public Int32 createdby { get; set; }
        public string message { get; set; } = "";
        public string pdftoupload { get; set; }
        public string docname { get; set; }
        public string imagename { get; set; }

    }
    //class for edit sample paper data
    public class GetSampleEditResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public GetSampleEditData data { get; set; }
    }
    public class GetSampleEditData
    {
        public Int32 sampleid { get; set; } = 0;
        public Int32 prepid { get; set; } = 0;
        public string categoryname { get; set; } = "";
        public Int32 prepnameid { get; set; } = 0;
        public string prepname { get; set; } = "";
        public string sname { get; set; } = "";
        public string stext { get; set; } = "";
        public string surl { get; set; } = "";

    }


    //classes for mock test

    //save mock test class
    public class PersonalMockResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
    }
    public class PersonalMockParam
    {

        public Int32 mockid { get; set; } = 0;
        public Int32 prepid { get; set; } = 0;
        public Int32 prepnameid { get; set; } = 0;
        public string mname { get; set; } = "";
        public string mtext { get; set; } = "";
        public string murl { get; set; } = "";



        public Int32 createdby { get; set; }
        public string message { get; set; } = "";


    }

    //bind mock test data
    public class GetSavedMockDataResponse
    {
        public bool Statue { get; set; }
        public string Message { get; set; }

        public List<GetSavedMockData> data { get; set; }

    }
    public class GetSavedMockData
    {
        public Int32 mockid { get; set; } = 0;
        public Int32 prepid { get; set; } = 0;
        public Int32 prepnameid { get; set; } = 0;
        public string mname { get; set; } = "";
        public string mtext { get; set; } = "";
        public string murl { get; set; } = "";
        public string categoryname { get; set; } = "";
        public string prepname { get; set; } = "";


        public Int32 createdby { get; set; }
        public string message { get; set; } = "";
   

    }
    //class for edit mock data
    public class GetMockTestEditResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public GetMockTestEditData data { get; set; }
    }
    public class GetMockTestEditData
    {
        public Int32 mockid { get; set; } = 0;
        public Int32 prepid { get; set; } = 0;
        public string categoryname { get; set; } = "";
        public Int32 prepnameid { get; set; } = 0;
        public string prepname { get; set; } = "";
        public string mname { get; set; } = "";
        public string mtext { get; set; } = "";
        public string murl { get; set; } = "";

    }

    //classes for adhoc material

        //save adhoc material class
    public class PersonalAdhocResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
    }
    public class PersonalAdhocParam
    {

        public Int32 adhocid { get; set; } = 0;
        public Int32 prepid { get; set; } = 0;
        public Int32 prepnameid { get; set; } = 0;
        public string aname { get; set; } = "";
        public string atext { get; set; } = "";
        public string aurl { get; set; } = "";



        public Int32 createdby { get; set; }
        public string message { get; set; } = "";


    }

    //bind adhoc data
    public class GetSavedAdhocDataResponse
    {
        public bool Statue { get; set; }
        public string Message { get; set; }

        public List<GetSavedAdhocData> data { get; set; }

    }
    public class GetSavedAdhocData
    {
        public Int32 adhocid { get; set; } = 0;
        public Int32 prepid { get; set; } = 0;
        public Int32 prepnameid { get; set; } = 0;
        public string aname { get; set; } = "";
        public string atext { get; set; } = "";
        public string aurl { get; set; } = "";
        public string categoryname { get; set; } = "";
        public string prepname { get; set; } = "";
        public string docname { get; set; } = "";
        public string imagename { get; set; } = "";

        public Int32 createdby { get; set; }
        public string message { get; set; } = "";


    }

    //class for edit adhoc data
    public class GetAdhocTestEditResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public GetAdhocTestEditData data { get; set; }
    }
    public class GetAdhocTestEditData
    {
        public Int32 adhocid { get; set; } = 0;
        public Int32 prepid { get; set; } = 0;
        public string categoryname { get; set; } = "";
        public Int32 prepnameid { get; set; } = 0;
        public string prepname { get; set; } = "";
        public string aname { get; set; } = "";
        public string atext { get; set; } = "";
        public string aurl { get; set; } = "";

    }


    //class of prepratory resources start

    public class PersonalResourceResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
    }
    public class PersonalResourceParam
    {

        public Int32 resourceid { get; set; } = 0;
        public Int32 prepid { get; set; } = 0;
        public Int32 prepnameid { get; set; } = 0;
        public string rname { get; set; } = "";
        public string rtext { get; set; } = "";
        public string rurl { get; set; } = "";
        public string author { get; set; } = "";
        public string publish { get; set; } = "";
        public string description { get; set; } = "";


        public Int32 createdby { get; set; }
        public string message { get; set; } = "";


    }

    //bind resource data

    public class GetSavedResourceResponse
    {
        public bool Statue { get; set; }
        public string Message { get; set; }

        public List<GetSavedResourceData> data { get; set; }

    }
    public class GetSavedResourceData
    {
        public Int32 resourceid { get; set; } = 0;
        public Int32 prepid { get; set; } = 0;
        public Int32 prepnameid { get; set; } = 0;
        public string rname { get; set; } = "";
        public string rtext { get; set; } = "";
        public string rurl { get; set; } = "";
        public string author { get; set; } = "";
        public string description { get; set; } = "";
        public string publish { get; set; } = "";

        public string categoryname { get; set; } = "";
        public string prepname { get; set; } = "";


        public Int32 createdby { get; set; }
        public string message { get; set; } = "";


    }

    //class for edit resource
    public class GetResourceEditResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public GetResourceEditData data { get; set; }
    }
    public class GetResourceEditData
    {
        public Int32 resourceid { get; set; } = 0;
        public Int32 prepid { get; set; } = 0;
        public string categoryname { get; set; } = "";
        public Int32 prepnameid { get; set; } = 0;
        public string prepname { get; set; } = "";
        public string rname { get; set; } = "";
        public string rtext { get; set; } = "";
        public string rurl { get; set; } = "";

        public string author { get; set; } = "";
        public string publish { get; set; } = "";
        public string description { get; set; } = "";

    }


    //classes for free link start

    //class for save free link
    public class PersonalFreeResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
    }
    public class PersonalFreeParam
    {

        public Int32 freeid { get; set; } = 0;
        public Int32 prepid { get; set; } = 0;
        public Int32 prepnameid { get; set; } = 0;
        public string fname { get; set; } = "";
        public string ftext { get; set; } = "";
        public string furl { get; set; } = "";
       
        public string fdescription { get; set; } = "";


        public Int32 createdby { get; set; }
        public string message { get; set; } = "";


    }

    //class for bind free data
    public class GetSavedFreeResponse
    {
        public bool Statue { get; set; }
        public string Message { get; set; }

        public List<GetSavedFreeData> data { get; set; }

    }
    public class GetSavedFreeData
    {
        public Int32 freeid { get; set; } = 0;
        public Int32 prepid { get; set; } = 0;
        public Int32 prepnameid { get; set; } = 0;
        public string fname { get; set; } = "";
        public string ftext { get; set; } = "";
        public string furl { get; set; } = "";
    
        public string fdescription { get; set; } = "";


        public string categoryname { get; set; } = "";
        public string prepname { get; set; } = "";


        public Int32 createdby { get; set; }
        public string message { get; set; } = "";


    }


    //class for edit free data
    public class GetFreeEditResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public GetFreeEditData data { get; set; }
    }
    public class GetFreeEditData
    {
        public Int32 freeid { get; set; } = 0;
        public Int32 prepid { get; set; } = 0;
        public string categoryname { get; set; } = "";
        public Int32 prepnameid { get; set; } = 0;
        public string prepname { get; set; } = "";
        public string fname { get; set; } = "";
        public string ftext { get; set; } = "";
        public string furl { get; set; } = "";

        public string fdescription { get; set; } = "";

    }

    //classes for paid links

    //class for save paid link
    public class PersonalPaidResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
    }
    public class PersonalPaidParam
    {

        public Int32 paidid { get; set; } = 0;
        public Int32 prepid { get; set; } = 0;
        public Int32 prepnameid { get; set; } = 0;
        public string paidname { get; set; } = "";
        public string paidtext { get; set; } = "";
        public string paidurl { get; set; } = "";

        public string paiddescription { get; set; } = "";


        public Int32 createdby { get; set; }
        public string message { get; set; } = "";


    }

    //class for bind paid data
    public class GetSavedPaidResponse
    {
        public bool Statue { get; set; }
        public string Message { get; set; }

        public List<GetSavedPaidData> data { get; set; }

    }
    public class GetSavedPaidData
    {
        public Int32 paidid { get; set; } = 0;
        public Int32 prepid { get; set; } = 0;
        public Int32 prepnameid { get; set; } = 0;
        public string paidname { get; set; } = "";
        public string paidtext { get; set; } = "";
        public string paidurl { get; set; } = "";

        public string paiddescription { get; set; } = "";


        public string categoryname { get; set; } = "";
        public string prepname { get; set; } = "";


        public Int32 createdby { get; set; }
        public string message { get; set; } = "";


    }

    //class for edit paid links
    public class GetPaidEditResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public GetPaidEditData data { get; set; }
    }
    public class GetPaidEditData
    {
        public Int32 paidid { get; set; } = 0;
        public Int32 prepid { get; set; } = 0;
        public string categoryname { get; set; } = "";
        public Int32 prepnameid { get; set; } = 0;
        public string prepname { get; set; } = "";
        public string paidname { get; set; } = "";
        public string paidtext { get; set; } = "";
        public string paidurl { get; set; } = "";

        public string paiddescription { get; set; } = "";

    }


}
