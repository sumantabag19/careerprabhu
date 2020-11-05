
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;


namespace CareerPrabhu.WebAPI
{
    [Route("api/paidfeaturebackend")]
    public class paidfeaturebackend : Controller
    {
        private IHostingEnvironment _hostingEnvironment;

        IConfiguration _iconfiguration;
        string videofilename = "";
        string imagefilename = "";
        string imageguid = "";
        public paidfeaturebackend(IConfiguration iconfiguration, IHostingEnvironment hosting)
        {
            _iconfiguration = iconfiguration;
            _hostingEnvironment = hosting;
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



        [HttpPost]
        [Route("Bindclass")]
        public string Bindclass()
        {
            GetClassesResponses GSR = new GetClassesResponses();
            List<GetClassesData> ListGSD = new List<GetClassesData>();
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
                        GetClassesData GSD = new GetClassesData();
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
        [Route("BindProduct")]
        public string BindProduct()
        {
            GetProductResponses GSR = new GetProductResponses();
            List<GetProductData> ListGSD = new List<GetProductData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindPremiumProduct", con);
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
                        GetProductData GSD = new GetProductData();
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
        [HttpPost]
        [Route("Savetestimonial")]
        public async Task<IActionResult> Savetestimonial([FromForm] IFormFile image, [FromForm] IFormFile photo, [FromForm] string testimonialid, [FromForm] string productid,
              [FromForm] string name, [FromForm] string description,[FromForm] string languageid,
             [FromForm] string orgvideoname, [FromForm] string orgimagename, [FromForm] string orgprofileImageName, [FromForm] string createdby,  [FromForm] string testimonial)
        //public string SavePlannedActivities([FromBody] ActivityManagerParam obj)
        {
            string json = "";
            string result = "";
            string photoguid = "";
            string photofilename = "";
            DataSet ds = new DataSet();
            testimonaldataResponse ObjAMR = new testimonaldataResponse();
            testimonaldata objAmp = new testimonaldata();


            if (image != null)
            {
                try
                {
                    imageguid = Guid.NewGuid().ToString();
                    imagefilename = imageguid + image.FileName;

                    var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploadimages");
                    if (image.Length > 0)
                    {
                        var filePath = Path.Combine(uploads, imagefilename);
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
            else
            {

            }


            if (photo != null)
            {
                try
                {
                    photoguid = Guid.NewGuid().ToString();
                    photofilename = photoguid + photo.FileName;

                    var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploadimages");
                    if (photo.Length > 0)
                    {
                        var filePath = Path.Combine(uploads, photofilename);
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
            else
            {

            }


            objAmp.name = Convert.ToString(name);
            objAmp.testimonialid = Convert.ToInt32(testimonialid);

            objAmp.productid = Convert.ToInt32(productid);
            objAmp.description = Convert.ToString(description);
            objAmp.testimonial = Convert.ToString(testimonial);
            

            objAmp.orgvideoname = Convert.ToString(orgvideoname);
            if (orgimagename == null)
            {
                objAmp.orgimagename = "";
            }
            else
            {
                objAmp.orgimagename = Convert.ToString(orgimagename);
            }
            if (orgprofileImageName == null)
            {
                objAmp.orgprofileImageName = "";
            }
            else
            {
                objAmp.orgprofileImageName = Convert.ToString(orgprofileImageName);
            }






            objAmp.createdby = Convert.ToInt32(createdby);

            try
            {
               // objAmp.newvideoname = Guid.NewGuid().ToString();
                if (imageguid == "")
                {
                    objAmp.newimagename = "";
                }
                else
                {
                    objAmp.newimagename = imageguid;
                }
                if (photoguid == "")
                {
                    objAmp.newprofileImageName = "";
                }
                else
                {
                    objAmp.newprofileImageName = photoguid;
                }

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Savetestimonial", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("testimonialid_d", objAmp.testimonialid);

                cmd.Parameters.AddWithValue("productid_d", objAmp.productid);
                cmd.Parameters.AddWithValue("name_d", objAmp.name);
                cmd.Parameters.AddWithValue("description_d", objAmp.description);
                cmd.Parameters.AddWithValue("languageid_d", Convert.ToInt32(languageid));
                cmd.Parameters.AddWithValue("org_videoname", objAmp.orgvideoname);
                //cmd.Parameters.AddWithValue("new_videoname", objAmp.newvideoname);
                cmd.Parameters.AddWithValue("org_imagename", objAmp.orgimagename);
                cmd.Parameters.AddWithValue("new_imagename", objAmp.newimagename);
                cmd.Parameters.AddWithValue("org_profileimagename", objAmp.orgprofileImageName);
                cmd.Parameters.AddWithValue("new_profileimagename", objAmp.newprofileImageName);
                cmd.Parameters.AddWithValue("testimonial_d", objAmp.testimonial);
                
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
            return Ok(json);
        }

        [HttpPost]
        [Route("Updatetestimonial")]
        public async Task<IActionResult> Updatetestimonial([FromForm] IFormFile image, [FromForm] IFormFile photo, [FromForm] string testimonialid, [FromForm] string productid,
             [FromForm] string name, [FromForm] string description, [FromForm] string languageid,
            [FromForm] string orgvideoname, [FromForm] string orgimagename, [FromForm] string orgprofileImageName, [FromForm] string createdby, [FromForm] string testimonial)
        //public string SavePlannedActivities([FromBody] ActivityManagerParam obj)
        {
            string json = "";
            string result = "";
            string photoguid = "";
            string photofilename = "";
            DataSet ds = new DataSet();
            testimonaldataResponse ObjAMR = new testimonaldataResponse();
            testimonaldata objAmp = new testimonaldata();


            if (image != null)
            {
                try
                {
                    imageguid = Guid.NewGuid().ToString();
                    imagefilename = imageguid + image.FileName;

                    var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploadimages");
                    if (image.Length > 0)
                    {
                        var filePath = Path.Combine(uploads, imagefilename);
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
            else
            {

            }
            if (photo != null)
            {
                try
                {
                    photoguid = Guid.NewGuid().ToString();
                    photofilename = photoguid + photo.FileName;

                    var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploadimages");
                    if (photo.Length > 0)
                    {
                        var filePath = Path.Combine(uploads, photofilename);
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
            else
            {

            }

            objAmp.name = Convert.ToString(name);
            objAmp.testimonialid = Convert.ToInt32(testimonialid);

            objAmp.productid = Convert.ToInt32(productid);
            objAmp.description = Convert.ToString(description);
            objAmp.testimonial = Convert.ToString(testimonial);


            objAmp.orgvideoname = Convert.ToString(orgvideoname);
            if (orgimagename == null)
            {
                objAmp.orgimagename = "";
            }
            else
            {
                objAmp.orgimagename = Convert.ToString(orgimagename);
            }
            if (orgprofileImageName == null)
            {
                objAmp.orgprofileImageName = "";
            }
            else
            {
                objAmp.orgprofileImageName = Convert.ToString(orgprofileImageName);
            }





            objAmp.createdby = Convert.ToInt32(createdby);

            try
            {
               // objAmp.newvideoname = Guid.NewGuid().ToString();
                if (imageguid == "")
                {
                    objAmp.newimagename = "";
                }
                else
                {
                    objAmp.newimagename = imageguid;
                }
                if (photoguid == "")
                {
                    objAmp.newprofileImageName = "";
                }
                else
                {
                    objAmp.newprofileImageName = photoguid;
                }

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("updatetestimonal", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("testimonialid_d", objAmp.testimonialid);

                cmd.Parameters.AddWithValue("productid_d", objAmp.productid);
                cmd.Parameters.AddWithValue("name_d", objAmp.name);
                cmd.Parameters.AddWithValue("description_d", objAmp.description);
                cmd.Parameters.AddWithValue("languageid_d", Convert.ToInt32(languageid));
                cmd.Parameters.AddWithValue("org_videoname", objAmp.orgvideoname);
               // cmd.Parameters.AddWithValue("new_videoname", objAmp.newvideoname);
                cmd.Parameters.AddWithValue("org_imagename", objAmp.orgimagename);
                cmd.Parameters.AddWithValue("new_imagename", objAmp.newimagename);
                cmd.Parameters.AddWithValue("org_profileimagename", objAmp.orgprofileImageName);
                cmd.Parameters.AddWithValue("new_profileimagename", objAmp.newprofileImageName);
                cmd.Parameters.AddWithValue("testimonial_d", objAmp.testimonial);

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
            return Ok(json);
        }
        [HttpGet]
        [Route("GetSaveTestimonialData")]
        public string GetSaveTestimonialData()
        {
            string json = "";
            DataSet ds = new DataSet();
            GetSavedTestimonialResponse ObjGSTDR = new GetSavedTestimonialResponse();
            List<GetSavedTestimonialdata> ListGSTD = new List<GetSavedTestimonialdata>();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getsavetestimonial", con);
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
                        GetSavedTestimonialdata ObjGSTD = new GetSavedTestimonialdata();
                        ObjGSTD.testimonialid = Convert.ToInt32(row["testimonialid"]);
                        //ObjGSTD.productid = Convert.ToInt32(row["productid"]);
                        ObjGSTD.name = Convert.ToString(row["name"]);
                        ObjGSTD.description = Convert.ToString(row["description"]);
                        ObjGSTD.testimonial = Convert.ToString(row["testimonial"]);
                        ObjGSTD.Video = Convert.ToString(row["orgvideoname"]);

                        if (Convert.ToString(row["image"]) == "")
                        {
                            ObjGSTD.Image = "";
                        }
                        else
                        {
                            ObjGSTD.Image = "http://admin.careerprabhu.com/" + "uploadimages/" + Convert.ToString(row["image"]);
                        }
                        if (Convert.ToString(row["profileimage"]) == "")
                        {
                            ObjGSTD.profileImage = "";
                        }
                        else
                        {
                            ObjGSTD.profileImage = "http://admin.careerprabhu.com/" + "uploadimages/" + Convert.ToString(row["profileimage"]);
                        }


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
        [Route("GetTestimonialEditedData")]
        public string GetTestimonialEditedData([FromHeader] Gettestimonialid obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GettestimonialEditResponse ObjGER = new GettestimonialEditResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("edittestimonial", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("testimonialid_D", obj.testimonialid);

                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGER.Status = true;
                    ObjGER.Message = "Data Found";
                    GettestimonialEditData ObjGED = new GettestimonialEditData();
                    ObjGED.testimonialid = Convert.ToInt32(ds.Tables[0].Rows[0]["testimonialid"]);
                    ObjGED.productid = Convert.ToInt32(ds.Tables[0].Rows[0]["productid"]);
                    ObjGED.name = Convert.ToString(ds.Tables[0].Rows[0]["name"]);

                    if (ds.Tables[0].Rows[0]["languageid"] == null)
                    {
                        ObjGED.languageid = 0;
                    }
                    else
                    {
                        ObjGED.languageid = Convert.ToInt32(ds.Tables[0].Rows[0]["languageid"]);
                    }

                   

                    ObjGED.description = Convert.ToString(ds.Tables[0].Rows[0]["description"]);

                    ObjGED.testimonial = Convert.ToString(ds.Tables[0].Rows[0]["testimonial"]);
                    ObjGED.ImageName = Convert.ToString(ds.Tables[0].Rows[0]["OrgImageName"]);
                    ObjGED.NewImageName = Convert.ToString(ds.Tables[0].Rows[0]["NewImageName"]);
                    ObjGED.profileImageName = Convert.ToString(ds.Tables[0].Rows[0]["OrgprofileImageName"]);
                    ObjGED.NewprofileImageName = Convert.ToString(ds.Tables[0].Rows[0]["NewprofileImageName"]);
                    ObjGED.VideoName = Convert.ToString(ds.Tables[0].Rows[0]["OrgVideoName"]);


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
        [Route("DeletetestimonialActivity")]
        public string DeletetestimonialActivity([FromBody] GettestimonialEditData obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            GettestimonialEditData ObjAMR = new GettestimonialEditData();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("DeletetestimonialRecord", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("testimonialid_d", obj.testimonialid);

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
        [Route("Savepaidfeature")]
        public string Savepaidfeature([FromForm] string pricingid,
          [FromForm] string classid, [FromForm] string productid,
          [FromForm] string fees, [FromForm] string gst, [FromForm] string conveniencefees, [FromForm] string createdby)

        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            paidfeatureResponse ObjAMR = new paidfeatureResponse();
            paidfeaturedata objAmp = new paidfeaturedata();

            objAmp.pricingid = Convert.ToInt32(pricingid);
            objAmp.classid = Convert.ToInt32(classid);
            objAmp.productid = Convert.ToInt32(productid);
            objAmp.fees = Convert.ToString(fees);
            objAmp.gst = Convert.ToString(gst);
            objAmp.conveniencefees = Convert.ToString(conveniencefees);

            objAmp.createdby = Convert.ToInt32(createdby);

            try
            {


                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Savepricingcategory", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("pricingid_d", objAmp.pricingid);
                cmd.Parameters.AddWithValue("classid_d", objAmp.classid);
                cmd.Parameters.AddWithValue("productid_d", objAmp.productid);
                cmd.Parameters.AddWithValue("fees_d", objAmp.fees);
                cmd.Parameters.AddWithValue("gst_d", objAmp.gst);
                cmd.Parameters.AddWithValue("conveniencefees_d", objAmp.conveniencefees);

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
        [HttpGet]
        [Route("GetSavedData")]
        public string GetSavedData()
        {
            string json = "";
            DataSet ds = new DataSet();
            GetSavedpaidfeatureResponse ObjGSTDR = new GetSavedpaidfeatureResponse();
            List<GetSavedpaidfeaturedata> ListGSTD = new List<GetSavedpaidfeaturedata>();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getsavepricingcategory", con);
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
                        GetSavedpaidfeaturedata ObjGSTD = new GetSavedpaidfeaturedata();
                        ObjGSTD.pricingid = Convert.ToInt32(row["pricingid"]);
                        ObjGSTD.classes = Convert.ToString(row["classname"]);
                        ObjGSTD.product = Convert.ToString(row["productname"]);
                        ObjGSTD.fees = Convert.ToString(row["fees"]);
                        ObjGSTD.gst = Convert.ToString(row["gst"]);
                        ObjGSTD.conveniencefees = Convert.ToString(row["conveniencefees"]);



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
        public string GetEditedData([FromHeader] Getpricingid obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetpricingEditResponse ObjGER = new GetpricingEditResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("editpricingdata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pricingid_D", obj.pricingid);

                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGER.Status = true;
                    ObjGER.Message = "Data Found";
                    GetpricingEditData ObjGED = new GetpricingEditData();
                    ObjGED.pricingid = Convert.ToInt32(ds.Tables[0].Rows[0]["pricingid"]);
                    ObjGED.classid = Convert.ToInt32(ds.Tables[0].Rows[0]["classid"]);
                    ObjGED.productid = Convert.ToInt32(ds.Tables[0].Rows[0]["productid"]);

                    ObjGED.fees = Convert.ToString(ds.Tables[0].Rows[0]["fees"]);
                    ObjGED.gst = Convert.ToString(ds.Tables[0].Rows[0]["gst"]);
                    ObjGED.conveniencefees = Convert.ToString(ds.Tables[0].Rows[0]["conveniencefees"]);



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
        [Route("Updatepaidfeature")]
        public string Updatepaidfeature([FromForm] string pricingid,
          [FromForm] string classid, [FromForm] string productid,
          [FromForm] string fees, [FromForm] string gst, [FromForm] string conveniencefees, [FromForm] string createdby)


        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            paidfeatureResponse ObjAMR = new paidfeatureResponse();
            paidfeaturedata objAmp = new paidfeaturedata();

            objAmp.pricingid = Convert.ToInt32(pricingid);
            objAmp.classid = Convert.ToInt32(classid);
            objAmp.productid = Convert.ToInt32(productid);
            objAmp.fees = Convert.ToString(fees);
            objAmp.gst = Convert.ToString(gst);
            objAmp.conveniencefees = Convert.ToString(conveniencefees);
            objAmp.createdby = Convert.ToInt32(createdby);

            try
            {


                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("UpdatepricingData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("pricingid_d", objAmp.pricingid);
                cmd.Parameters.AddWithValue("classid_d", objAmp.classid);
                cmd.Parameters.AddWithValue("productid_d", objAmp.productid);
                cmd.Parameters.AddWithValue("fees_d", objAmp.fees);
                cmd.Parameters.AddWithValue("gst_d", objAmp.gst);
                cmd.Parameters.AddWithValue("conveniencefees_d", objAmp.conveniencefees);

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
        public string DeleteActivities([FromBody] GetpricingEditData obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            GetpricingEditData ObjAMR = new GetpricingEditData();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("DeletepricingRecord", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("pricingid_d", obj.pricingid);

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

        public class GetClassesResponses
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public List<GetClassesData> data { get; set; }
        }
        public class GetClassesData
        {

            public string classname { get; set; }
            public Int32 classid { get; set; }
        }
        public class GetProductResponses
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public List<GetProductData> data { get; set; }
        }
        public class GetProductData
        {

            public Int32 productid { get; set; }
            public string productname { get; set; }

        }
        public class testimonaldataResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
        }
        public class testimonaldata
        {
            public string name { get; set; }
            public string testimonial { get; set; }
            public Int32 testimonialid { get; set; }

            public Int32 productid { get; set; }
            public string description { get; set; }
            public string orgimagename { get; set; } = "";
            public string newimagename { get; set; } = "";
            public string orgprofileImageName { get; set; } = "";
            public string newprofileImageName { get; set; } = "";

            public string orgvideoname { get; set; } = "";
            public string newvideoname { get; set; } = "";
            public Int32 createdby { get; set; }
            

        }
        public class GetSavedTestimonialResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }

            public List<GetSavedTestimonialdata> data { get; set; }
        }
        public class GetSavedTestimonialdata
        {
            public string name { get; set; }
            public string testimonial { get; set; }
            public Int32 testimonialid { get; set; }

            public Int32 productid { get; set; }
            public string description { get; set; }
            public string Video { get; set; } 
            public string Image { get; set; } 
            public string profileImage { get; set; }
            public Int32 createdby { get; set; }

        }
        public class Gettestimonialid
        {
            public int testimonialid { get; set; }
        }
        public class GettestimonialEditResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public GettestimonialEditData data { get; set; }
        }
        public class GettestimonialEditData
        {
            public Int32 testimonialid { get; set; }
            public string name { get; set; }
            public string testimonial { get; set; }
            public Int32 languageid { get; set; }
            public Int32 productid { get; set; }
            public string description { get; set; }
            public string VideoName { get; set; }
            public string ImageName { get; set; }
            public string NewImageName { get; set; }
            public string profileImageName { get; set; }
            public string NewprofileImageName { get; set; }

            public Int32 createdby { get; set; }
            public bool Status { get; set; }
            public string Message { get; set; }
        }
        public class paidfeatureResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
        }
        
        public class paidfeaturedata
        {
            public Int32 pricingid { get; set; }
            public Int32 classid { get; set; }
            public Int32 productid { get; set; }

            public string fees { get; set; }

            public string gst { get; set; }
            public string conveniencefees { get; set; }


            public Int32 createdby { get; set; }


        }
        public class GetSavedpaidfeatureResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }

            public List<GetSavedpaidfeaturedata> data { get; set; }
        }
        public class GetSavedpaidfeaturedata
        {
            public Int32 pricingid { get; set; }

            public string classes { get; set; }
            public string product { get; set; } = "";
            public string fees { get; set; }
            public string gst { get; set; }
            public string conveniencefees { get; set; }

        }
        public class Getpricingid
        {
            public int pricingid { get; set; }
        }
        public class GetpricingEditResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public GetpricingEditData data { get; set; }
        }
        public class GetpricingEditData
        {
            public Int32 pricingid { get; set; }
            public Int32 classid { get; set; }
            public Int32 productid { get; set; }

            public string fees { get; set; }

            public string gst { get; set; }
            public string conveniencefees { get; set; }


            public Int32 createdby { get; set; }

            public bool Status { get; set; }
            public string Message { get; set; }
        }




    }
}
