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
    [Route("api/personalessay")]
    public class personalessay : Controller
    {
        private IHostingEnvironment _hostingEnvironment;

        IConfiguration _iconfiguration;
        string videofilename = "";
        string pdffilename = "";
        string videopath = "";
        string pdfpath = "";
        string pdfguid = "";
        public personalessay(IConfiguration iconfiguration, IHostingEnvironment hosting)
        {
            _iconfiguration = iconfiguration;
            _hostingEnvironment = hosting;
        }

        //Api for bind class
        [HttpGet]
        [Route("bindclass")]
        public string Bindclass()
        {
            GetClassResponse GCR = new GetClassResponse();
            List<GetClassData> ListGCD = new List<GetClassData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Bindclass", con);
                cmd.CommandType = CommandType.StoredProcedure;
                
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    GCR.Status = true;
                    GCR.Message = "Data Found";
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        GetClassData GCD = new GetClassData();
                        GCD.class_id = Convert.ToInt32(row["class_id"]);
                        GCD.class_name = Convert.ToString(row["class_name"]);
                        ListGCD.Add(GCD);
                    }
                    GCR.data = ListGCD;
                }
                else
                {
                    GCR.Status = false;
                    GCR.Message = "Something went wrong";
                }
            }
            catch (Exception e)
            {
                GCR.Status = false;
                GCR.Message = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(GCR, settings);
            return json;
        }


        //Api for bind subject
        [HttpPost]
        [Route("bindsubject")]
        public string Bindsubject([FromBody] GetSubjectData data)
        {
            GetSubjectResponse GSR = new GetSubjectResponse();
            List<GetSubjectData> ListGSD = new List<GetSubjectData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("bindsubject", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("classid", data.classid);
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
                        GetSubjectData GSD = new GetSubjectData();
                        GSD.subject_id = Convert.ToInt32(row["subject_id"]);
                        GSD.subjectname = Convert.ToString(row["subjectname"]);
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


        //save personal essay data
        [HttpPost]
        [Route("savepersonalessay")]
        public async Task<IActionResult> SavePlannActivityAsync([FromForm] IFormFile image, [FromForm] string personalessayid,
        [FromForm] string subjectid, [FromForm] string orgvideoname, [FromForm] string orgimagename, [FromForm] string createdby, [FromForm] string classid)

        {
            string json = "";
            string result = "";
            
            DataSet ds = new DataSet();
            PersonalEssayManagerResponse objpemr = new PersonalEssayManagerResponse();
            PersonalEssayManagerParam objpemp = new PersonalEssayManagerParam();


            //try
            //{
            //    videofilename = Guid.NewGuid().ToString() + video.FileName;

            //    var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploadpersonalessayvideo");
            //    if (video.Length > 0)
            //    {
            //        var filePath = Path.Combine(uploads, videofilename);
            //        videopath = filePath;
            //        using (var fileStream = new FileStream(filePath, FileMode.Create))
            //        {
            //            await video.CopyToAsync(fileStream);
            //        }
            //    }
            //}
            //catch (Exception e)
            //{
            //    string Message = e.Message;
            //}

            try
            {
                pdfguid = Guid.NewGuid().ToString();
                pdffilename = pdfguid + image.FileName;

                var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploadpersonalessaypdf");
                if (image.Length > 0)
                {
                    var filePath = Path.Combine(uploads, pdffilename);
                    pdfpath = filePath;
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



            objpemp.personalessayid = Convert.ToInt32(personalessayid);
            objpemp.schoolid = Convert.ToInt32(subjectid);
            objpemp.orgvideoname = Convert.ToString(orgvideoname);
            objpemp.orgipdfname = Convert.ToString(orgimagename);
            objpemp.createdby = Convert.ToInt32(createdby);
            objpemp.classid = Convert.ToInt32(classid);

            try
            {
                
                objpemp.newipdfname = pdfguid;
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("savepersonalessay", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
              
                cmd.Parameters.AddWithValue("personalessayid", objpemp.personalessayid);
                cmd.Parameters.AddWithValue("schoolid", objpemp.schoolid);
                cmd.Parameters.AddWithValue("classid", objpemp.classid);
                cmd.Parameters.AddWithValue("orgpdfname", objpemp.orgipdfname);
                cmd.Parameters.AddWithValue("orgvideoname", objpemp.orgvideoname);
                cmd.Parameters.AddWithValue("newpdfname", objpemp.newipdfname);
                

                
                cmd.Parameters.AddWithValue("pdfpath", pdfpath);

                cmd.Parameters.AddWithValue("created_by", objpemp.createdby);
                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();
                con.Close();
                objpemr.Status = true;
                objpemr.Message = result;
            }
            catch (Exception e)
            {
                objpemr.Status = false;
                objpemr.Message = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(objpemr, settings);
            return Ok(JsonConvert.SerializeObject(json, Formatting.Indented));

        }


        //get data for bind table
        [HttpGet]
        [Route("Bindtabledata")]
        public string Bindtabledata()
        {
            string json = "";
            DataSet ds = new DataSet();
            GetSavedPersonalEssayDataResponse ObjGSPEDR = new GetSavedPersonalEssayDataResponse();
            List<GetSavedPersonalEssayData> ListGSPED = new List<GetSavedPersonalEssayData>();
            
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Getpersonalessaydata", con);
                cmd.CommandType = CommandType.StoredProcedure;
               
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGSPEDR.Statue = true;
                    ObjGSPEDR.Message = "Data Found";
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        GetSavedPersonalEssayData ObjGSPED = new GetSavedPersonalEssayData();
                       
                        ObjGSPED.personalessayid = Convert.ToInt32(row["personalessayid"]);
                        ObjGSPED.ClassnName = Convert.ToString(row["ClassName"]);
                        ObjGSPED.SubjectName = Convert.ToString(row["SubjectName"]);
                        ObjGSPED.Video = Convert.ToString(row["orgvideoname"]);

                        //ObjGSPED.Video = GetYouTubeId(Convert.ToString(row["orgvideoname"]));
                        //ObjGSPED.Video = "https://www.youtube.com/embed/" + ObjGSPED.Video;


                        //ObjGSPED.Video = Convert.ToString(ds.Tables[0].Rows[0]["vpath"]);
                        //ObjGSPED.pdf = Convert.ToString(ds.Tables[0].Rows[0]["pdfpath"]);



                        //ObjGSPED.Video = Convert.ToString(row["newvideoname"]);
                        //ObjGSPED.pdf = Convert.ToString(row["newpdfname"]);
                        //ObjGSPED.orgVideo = Convert.ToString(row["orgvideoname"]);
                        //ObjGSPED.orgpdf = Convert.ToString(row["orgpdfname"]);



                        ListGSPED.Add(ObjGSPED);
                    }
                    ObjGSPEDR.data = ListGSPED;
                }
                else
                {
                    ObjGSPEDR.Statue = false;
                    ObjGSPEDR.Message = "Something went wrong";
                }
            }
            catch (Exception e)
            {
                ObjGSPEDR.Statue = false;
                ObjGSPEDR.Message = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(ObjGSPEDR, settings);
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
                MySqlCommand cmd = new MySqlCommand("editpersonalessay", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pe_id", obj.personalessayid);
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
                 
                    ObjGED.personalessayid = Convert.ToInt32(ds.Tables[0].Rows[0]["personalessayid"]);
            
                    ObjGED.classid = Convert.ToInt32(ds.Tables[0].Rows[0]["classid"]);
                    ObjGED.classname = Convert.ToString(ds.Tables[0].Rows[0]["classname"]);
                    ObjGED.subjectid = Convert.ToInt32(ds.Tables[0].Rows[0]["subjectid"]);
                    ObjGED.subjectname = Convert.ToString(ds.Tables[0].Rows[0]["subjectname"]);
                    ObjGED.VideoName = Convert.ToString(ds.Tables[0].Rows[0]["orgvideoname"]);




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


        //update personal essay
        [HttpPost]
        [Route("updatepersonalessay")]
        public async Task<IActionResult> updatepersonalessay([FromForm] IFormFile image, [FromForm] string personalessayid,
        [FromForm] string subjectid, [FromForm] string orgvideoname, [FromForm] string orgimagename, [FromForm] string createdby, [FromForm] string classid)

        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            PersonalEssayManagerResponse objpemr = new PersonalEssayManagerResponse();
            PersonalEssayManagerParam objpemp = new PersonalEssayManagerParam();


            //try
            //{
            //    videofilename = Guid.NewGuid().ToString() + video.FileName;

            //    var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploadpersonalessayvideo");
            //    if (video.Length > 0)
            //    {
            //        var filePath = Path.Combine(uploads, videofilename);
            //        videopath = filePath;
            //        using (var fileStream = new FileStream(filePath, FileMode.Create))
            //        {
            //            await video.CopyToAsync(fileStream);
            //        }
            //    }
            //}
            //catch (Exception e)
            //{
            //    string Message = e.Message;
            //}


            if (image != null)
            {
                try
                {
                    pdfguid = Guid.NewGuid().ToString();
                    pdffilename = pdfguid + image.FileName;

                    var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploadpersonalessaypdf");
                    if (image.Length > 0)
                    {
                        var filePath = Path.Combine(uploads, pdffilename);
                        pdfpath = filePath;
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
               



            objpemp.personalessayid = Convert.ToInt32(personalessayid);
            objpemp.schoolid = Convert.ToInt32(subjectid);
            objpemp.orgvideoname = Convert.ToString(orgvideoname);
            //objpemp.orgipdfname = Convert.ToString(orgimagename);
            objpemp.createdby = Convert.ToInt32(createdby);
            objpemp.classid = Convert.ToInt32(classid);

            if (orgimagename == null)
            {
                objpemp.orgipdfname = "";
            }
            else
            {
                objpemp.orgipdfname = Convert.ToString(orgimagename);
            }



            try
            {
               // objpemp.newvideoname = pdfguid;

                if (pdfguid == "")
                {
                    objpemp.newvideoname = "";
                }
                else
                {
                    objpemp.newvideoname = pdfguid;
                }

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("updatepersonalessay", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("personalessay_id", objpemp.personalessayid);
                cmd.Parameters.AddWithValue("school_id", objpemp.schoolid);
                cmd.Parameters.AddWithValue("class_id", objpemp.classid);
                cmd.Parameters.AddWithValue("orgpdf_name", objpemp.orgipdfname);
                cmd.Parameters.AddWithValue("orgvideo_name", objpemp.orgvideoname);
                cmd.Parameters.AddWithValue("newpdf_name", objpemp.newipdfname);
                

                
                cmd.Parameters.AddWithValue("pdf_path", pdfpath);

                cmd.Parameters.AddWithValue("created_by", objpemp.createdby);
                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();
                con.Close();
                objpemr.Status = true;
                objpemr.Message = result;
            }
            catch (Exception e)
            {
                objpemr.Status = false;
                objpemr.Message = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(objpemr, settings);
            return Ok(JsonConvert.SerializeObject(json, Formatting.Indented));

        }

        //delete record

        [HttpPost]
        [Route("DeleteActivity")]
        public string DeleteActivities([FromBody] PersonalEssayManagerParam obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            PersonalEssayManagerResponse ObjAMR = new PersonalEssayManagerResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Deletepersonalessay", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("p_id", obj.personalessayid);
              
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








        //classes
        public class GetClassResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public List<GetClassData> data { get; set; }
        }
        public class GetClassData
        {
            public Int32 class_id { get; set; }
            public string class_name { get; set; }
        }
        public class GetSubjectResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public List<GetSubjectData> data { get; set; }
        }
        public class GetSubjectData
        {
            public Int32 subject_id { get; set; }
            public string subjectname { get; set; }
            public Int32 classid { get; set; }
        }



        public class PersonalEssayManagerResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
        }
        public class PersonalEssayManagerParam
        {
        
            public Int32 personalessayid { get; set; } = 0;
            public Int32 schoolid { get; set; } = 0;
            public Int32 classid { get; set; } = 0;

            public string orgvideoname { get; set; } = "";
            public string newvideoname { get; set; } = "";
            public string orgipdfname { get; set; } = "";
            public string newipdfname { get; set; } = "";
            public Int32 createdby { get; set; }
            public string message { get; set; } = "";
            public string videotoupload { get; set; }
            public string pdftoupload { get; set; }

        }


        public class GetSavedPersonalEssayDataResponse
        {
            public bool Statue { get; set; }
            public string Message { get; set; }

            public List<GetSavedPersonalEssayData> data { get; set; }
            
        }
        public class GetSavedPersonalEssayData
        {
            public Int32 personalessayid { get; set; }
            public string SubjectName { get; set; }
            public string ClassnName { get; set; }      
            public string Video { get; set; }
            public string pdf { get; set; }
            public string orgVideo { get; set; }
            public string orgpdf { get; set; }
            public GetEditVideo data1 { get; set; }

        }
        public class Geteditrecord
        {
  
            public Int32 personalessayid { get; set; } = 0;
          
        }
        public class GetEditResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public GetEditData data { get; set; }
        }
        public class GetEditData
        {
            public Int32 personalessayid { get; set; }
           
            public Int32 classid { get; set; }
            public string classname { get; set; }
            public Int32 subjectid { get; set; }
            public string subjectname { get; set; }
  
            public string VideoName { get; set; }
            public string NewVideoName { get; set; }
            public string pdfname { get; set; }
            public string newpdfname { get; set; }
        }
        public class GetEditVideo
        {
            public string VideoName { get; set; }
            public string pdfname { get; set; }
        }





    }
}
