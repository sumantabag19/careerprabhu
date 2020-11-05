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
    [Route("api/paidfeature")]
    public class paidfeature : Controller
    {
        IConfiguration _iconfiguration;
        private IHostingEnvironment _hostingEnvironment;

        string pdffilename = "";
        string pdfpath = "";
        string guid = "";
        string photoguid_stu = "";
        string pdffilename_stu = "";
        string photoguid = "";
        string pdfguid = "";
        public paidfeature(IConfiguration iconfiguration, IHostingEnvironment hosting)
        {
            _iconfiguration = iconfiguration;
            _hostingEnvironment = hosting;
        }

        [HttpGet]
        [Route("BindCategory")]
        public string BindCategory()
        {
            DataSet ds = new DataSet();
            string json = "";
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindCategory", con);
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


        [HttpGet]
        [Route("BindClass")]
        public string BindClass()
        {
            DataSet ds = new DataSet();
            string json = "";
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindClassApi", con);
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


        [HttpGet]
        [Route("BindStream")]
        public string BindStream()
        {
            DataSet ds = new DataSet();
            string json = "";
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
        [Route("savepaidfeature")]
        public async Task<IActionResult> savepaidfeature([FromForm] IFormFile photo, [FromForm] IFormFile photo_d, [FromForm] string categoryid,
    [FromForm] string fees, [FromForm] string gst, [FromForm] string convinencefees,[FromForm] string orgphotoname, [FromForm] string orgphotoname_d,
    [FromForm] string link, [FromForm] string descirption, [FromForm] string isstudent, [FromForm] string isparents,
     [FromForm] string name, string schoolname, [FromForm] string classid, [FromForm] string streamid, [FromForm] string video, [FromForm] string testimonils, [FromForm] string createdby)
        {
            string json = "";
            string result = "";
            int maxid = 0;
            string qry = "";
            string uploadDirectory = "";

            DataSet ds = new DataSet();
            DataSet ds1 = new DataSet();
            PaidFeatureResponse objppfr = new PaidFeatureResponse();
            paidFeatureParam objppfp = new paidFeatureParam();



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
            if (photo_d != null)
            {
                try
                {
                    photoguid_stu = Guid.NewGuid().ToString();
                    pdffilename_stu = photoguid_stu + photo_d.FileName;


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
                    if (photo_d.Length > 0)
                    {
                        var filePath = Path.Combine(uploadDirectory, pdffilename);

                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            await photo_d.CopyToAsync(fileStream);
                        }
                    }
                }
                catch (Exception e)
                {
                    string Message = e.Message;
                }
            }

            objppfp.categoryid = Convert.ToInt32(categoryid);
            objppfp.fees = Convert.ToInt32(fees);
            objppfp.gst = Convert.ToInt32(gst);
            objppfp.convinencefees = Convert.ToInt32(convinencefees);
            objppfp.link = Convert.ToString(link);
            objppfp.description = Convert.ToString(descirption);


            objppfp.isparent = Convert.ToInt32(isparents);
            objppfp.isstudent = Convert.ToInt32(isstudent);
            objppfp.studentname = Convert.ToString(name);
            objppfp.schoolname = Convert.ToString(schoolname);
            objppfp.classid = Convert.ToInt32(classid);
            objppfp.streamid = Convert.ToInt32(streamid);
            objppfp.video = Convert.ToString(video);
            objppfp.testimonials = Convert.ToString(testimonils);



            objppfp.createdby = Convert.ToInt32(createdby);
            if (orgphotoname == null)
            {
                objppfp.orgphotoname_category = "";
            }
            else
            {
                objppfp.orgphotoname_category = Convert.ToString(orgphotoname);
            }
            if (orgphotoname_d == null)
            {
                objppfp.orgphotoname_stu = "";

            }
            else
            {
                objppfp.orgphotoname_stu = Convert.ToString(orgphotoname_d);
            }


            try
            {
                if (photoguid == "")
                {
                    objppfp.newphotoname_cat = "";
                }
                else
                {
                    objppfp.newphotoname_cat = photoguid;
                }
                if (photoguid_stu == "")
                {
                    objppfp.newphotoname_stu = "";
                }
                else
                {
                    objppfp.newphotoname_stu = photoguid_stu;
                }


                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("savefeaturedata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("categoryid_d", objppfp.categoryid);
                cmd.Parameters.AddWithValue("fees_d", objppfp.fees);
                cmd.Parameters.AddWithValue("gst_d", objppfp.gst);
                cmd.Parameters.AddWithValue("convinencefees_d", objppfp.convinencefees);
                cmd.Parameters.AddWithValue("link_d", objppfp.link);
                cmd.Parameters.AddWithValue("orgphotoname_cat", objppfp.orgphotoname_category);
                cmd.Parameters.AddWithValue("newphotoname_cat", objppfp.newphotoname_cat);
                cmd.Parameters.AddWithValue("orgphotoname_stu", objppfp.orgphotoname_stu);
                cmd.Parameters.AddWithValue("newphotoname_stu", objppfp.newphotoname_stu);
                cmd.Parameters.AddWithValue("description_d", objppfp.description);
                cmd.Parameters.AddWithValue("isparent_d", objppfp.isparent);
                cmd.Parameters.AddWithValue("isstudent_d", objppfp.isstudent);
                cmd.Parameters.AddWithValue("studentname_d", objppfp.studentname);
                cmd.Parameters.AddWithValue("schoolname_d", objppfp.schoolname);
                cmd.Parameters.AddWithValue("classid_d", objppfp.classid);
                cmd.Parameters.AddWithValue("streamid_d", objppfp.streamid);
                cmd.Parameters.AddWithValue("video_d", objppfp.video);
                cmd.Parameters.AddWithValue("testimonial_d", objppfp.testimonials);
                cmd.Parameters.AddWithValue("created_by", objppfp.createdby);
                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();


                con.Close();

                if (result == "Success")
                {
                    objppfr.Status = true;
                    objppfr.Message = result;
                }
                else
                {
                    objppfr.Status = false;
                    objppfr.Message = result;
                }
        


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


    }

    public class PaidFeatureResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
    }
    public class paidFeatureParam
    {

        public Int32 featureid { get; set; }
        public Int32 categoryid { get; set; }
        public Int32 fees { get; set; }
        public Int32 gst { get; set; }
        public Int32 convinencefees { get; set; }
        public string orgphotoname_category { get; set; }
        public string orgphotoname_stu { get; set; }
        public string link { get; set; } 
        public Int32 isparent { get; set; } 
        public Int32 isstudent { get; set; }
        public string studentname { get; set; }
        public string schoolname { get; set; } 
        public Int32 classid { get; set; }
        public Int32 streamid { get; set; }
        public string video { get; set; }
        public Int32 createdby { get; set; }
        public string description { get; set; }
        public string testimonials { get; set; }
        public string newphotoname_cat { get; set; }
        public string newphotoname_stu { get; set; }


    }



}
