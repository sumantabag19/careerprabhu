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

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CareerPrabhu.WebAPI
{
    [Route("api/collegerepository")]
    public class collegerepository : Controller
    {
        private IHostingEnvironment _hostingEnvironment;

        IConfiguration _iconfiguration;
        string imagefilename = "";
        string imageguid = "";
        public collegerepository(IConfiguration iconfiguration, IHostingEnvironment hosting)
        {
            _iconfiguration = iconfiguration;
            _hostingEnvironment = hosting;
        }


        [HttpPost]
        [Route("Upload")]
        public string Upload([FromBody]ExcellSchoolData_repository obj)
        {
            AddGroupClass_repository ObjClass = new AddGroupClass_repository();
            ExcellSchoolData_repository nxt = new ExcellSchoolData_repository();
            List<SchoolData_repository> lst = new List<SchoolData_repository>();
            string json = "";
            int status = 0;
            try
            {


                if (obj.schoolDatas.Count > 0)
                {
                    SchoolData_repository tst = new SchoolData_repository();


                    for (int i = 0; i < obj.schoolDatas.Count; i++)
                    {
                        
                        int careerid = Return_Int("select listing_id from tbl_careerlistings where heading= '" + Convert.ToString(obj.schoolDatas[i].career).Trim() + "'");
                        int collegeid = Return_Int("select universityid from tbl_university where universityname='" + Convert.ToString(obj.schoolDatas[i].college).Trim() + "'");
                        int languageid = Return_Int("select languageid from tbl_language where languagetype='" + Convert.ToString(obj.schoolDatas[i].language).Trim() + "'");
                        string url = (Convert.ToString(obj.schoolDatas[i].videolink) == "" || Convert.ToString(obj.schoolDatas[i].videolink) == null) ? "" : Convert.ToString(obj.schoolDatas[i].videolink);

                        int check = Return_Int("select count(*) from tbl_collegerepository where collegename=" + Convert.ToInt32(collegeid) + " and careerid=" + Convert.ToInt32(careerid) + " and languageid=" + Convert.ToInt32(languageid)+ " and published="+1);

                        if (check > 0)
                        {

                        }
                        else
                        {
                            Execqry("insert into tbl_collegerepository(collegename,careerid,languageid,videourl,description,published)values" +
                         "(" + Convert.ToInt32(collegeid) + "," + Convert.ToInt32(careerid) + "," + Convert.ToInt32(languageid) + ",'" + Convert.ToString(url) + "','" + Convert.ToString(obj.schoolDatas[i].description) + "'," + 1 + ")");



                        }




                        //  Execqry("insert into tbl_entrancecareer(examid,streamid)values(" + Convert.ToInt32(examid) + ", " + Convert.ToInt32(streamlist[i]) + ")");
                    }
                    ObjClass.Status = true;
                    ObjClass.Message = "Data Import Completed";
                }


                else
                {
                    ObjClass.Status = false;
                    ObjClass.Message = "Something Went Wrong";
                }
            }
            catch (Exception ex)
            {
                var msg = ex.Message;
                ObjClass.Status = false;
                ObjClass.Message = ("Something Went Wrong").ToString(); ;
            }

            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(ObjClass, settings);

            return json;
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


        public int Return_Int(string st)
        {
            MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
            int code = 0;
            if (con.State == ConnectionState.Closed)
            {
                con.Open();
            }

            MySqlCommand cmd = new MySqlCommand(st, con);
            MySqlDataReader dr = cmd.ExecuteReader();
            if (dr.HasRows == true)
            {
                dr.Read();
                if (dr[0] is DBNull)
                {
                }
                else
                {
                    code = Convert.ToInt32(dr[0]);
                }


            }
            dr.Close();
            con.Close();
            return (code);
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
        //API for bind user type
        [HttpPost]
        [Route("Bindcollege")]
        public string Bindcollege()
        {
            GetCollegeResponses GSR = new GetCollegeResponses();
            List<GetCollegeData> ListGSD = new List<GetCollegeData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Bindcollege", con);
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
                        GetCollegeData GSD = new GetCollegeData();
                        GSD.universityid = Convert.ToInt32(row["universityid"]);
                        GSD.universityname = Convert.ToString(row["universityname"]);
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
        [Route("BindCareer")]
        public string BindCareer()
        {
            GetCareerResponses GSR = new GetCareerResponses();
            List<GetCareerData> ListGSD = new List<GetCareerData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindCareerListing", con);
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
                        GetCareerData GSD = new GetCareerData();
                        GSD.careerid = Convert.ToInt32(row["listing_id"]);
                        GSD.careername = Convert.ToString(row["heading"]);
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
        //For Save Activity
        //[HttpPost]
        //[Route("savecollegerepository")]
        //public string savecollegerepository([FromBody] collegerepositorydata obj)
        //{
        //    string json = "";
        //    string result = "";
        //    DataSet ds = new DataSet();


        //    collegerepositoryResponse ObjAMR = new collegerepositoryResponse();



        //    try
        //    {
        //        MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
        //        MySqlCommand cmd = new MySqlCommand("Saverepository", con);
        //        cmd.CommandType = CommandType.StoredProcedure;
        //        cmd.Parameters.AddWithValue("message", "");
        //        cmd.Parameters["message"].Direction = ParameterDirection.Output;
                
        //        cmd.Parameters.AddWithValue("repositoryid_d", obj.repositoryid);

        //        cmd.Parameters.AddWithValue("careerid_d", obj.careerid);
        //        cmd.Parameters.AddWithValue("org_imagename", obj.orgimagename);
        //        cmd.Parameters.AddWithValue("new_imagename", obj.newimagename);
        //        cmd.Parameters.AddWithValue("description_d", obj.description);

        //        cmd.Parameters.AddWithValue("created_by", obj.createdby);
        //        con.Open();
        //        cmd.ExecuteScalar();
        //        result = cmd.Parameters["message"].Value.ToString();
        //        con.Close();
        //        ObjAMR.Status = true;
        //        ObjAMR.Message = result;
        //    }
        //    catch (Exception e)
        //    {
        //        ObjAMR.Status = false;
        //        ObjAMR.Message = e.Message;
        //    }
        //    JsonSerializerSettings settings = new JsonSerializerSettings();
        //    settings.NullValueHandling = NullValueHandling.Ignore;
        //    json = JsonConvert.SerializeObject(ObjAMR, settings);
        //    return json;
        //}
        [HttpPost]
        [Route("savecollegerepository")]
        public async Task<IActionResult> savecollegerepository([FromForm] IFormFile image, [FromForm] string repositoryid, [FromForm] string collegename,
            [FromForm] string careerid, [FromForm] string description,
             [FromForm] string orgimagename, [FromForm] string videourl, [FromForm] string languageid, [FromForm] string createdby)
        //public string SavePlannedActivities([FromBody] ActivityManagerParam obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            collegerepositoryResponse ObjAMR = new collegerepositoryResponse();
            collegerepositorydata objAmp = new collegerepositorydata();


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


            objAmp.repositoryid = Convert.ToInt32(repositoryid);
            objAmp.collegename = Convert.ToInt32(collegename);

            objAmp.careerid = Convert.ToInt32(careerid);
            objAmp.description = Convert.ToString(description);
            objAmp.videourl = Convert.ToString(videourl);

            if (orgimagename == null)
            {
                objAmp.orgimagename = "";
            }
            else
            {
                objAmp.orgimagename = Convert.ToString(orgimagename);
            }





            objAmp.createdby = Convert.ToInt32(createdby);

            try
            {
                //objAmp.newvideoname = Guid.NewGuid().ToString();
                if (imageguid == "")
                {
                    objAmp.newimagename = "";
                }
                else
                {
                    objAmp.newimagename = imageguid;
                }

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Saverepository", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("repositoryid_d", objAmp.repositoryid);
                cmd.Parameters.AddWithValue("collegename_d", objAmp.collegename);
                cmd.Parameters.AddWithValue("languageid_d",Convert.ToInt32(languageid));
                cmd.Parameters.AddWithValue("careerid_d", objAmp.careerid);
                cmd.Parameters.AddWithValue("org_imagename", objAmp.orgimagename);
                cmd.Parameters.AddWithValue("new_imagename", objAmp.newimagename);
                cmd.Parameters.AddWithValue("videourl_d", objAmp.videourl);

                cmd.Parameters.AddWithValue("description_d", objAmp.description);

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



        //end save plan activity

        // For Getting Saved Dopic Detail
        [HttpGet]
        [Route("GetSavedData")]
        public string GetSavedData()
        {
            string json = "";
            DataSet ds = new DataSet();
            GetSavedcollegerepository ObjGSTDR = new GetSavedcollegerepository();
            List<GetSavedcollegerepositoryData> ListGSTD = new List<GetSavedcollegerepositoryData>();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getsaverepository", con);
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
                        GetSavedcollegerepositoryData ObjGSTD = new GetSavedcollegerepositoryData();
                        ObjGSTD.repositoryid = Convert.ToInt32(row["repositoryid"]);
                        ObjGSTD.university = Convert.ToString(row["universityname"]);

                        ObjGSTD.career = Convert.ToString(row["careername"]);
                        if(Convert.ToString(row["language"]) =="" || Convert.ToString(row["language"]) == null)
                        {
                            ObjGSTD.language = "N/A";
                        }
                        else
                        {
                            ObjGSTD.language = Convert.ToString(row["language"]);
                        }

                       
                        ObjGSTD.description = Convert.ToString(row["description"]);
                        ObjGSTD.videourl = Convert.ToString(row["videourl"]);



                        if (Convert.ToString(row["image"]) == "")
                        {
                            ObjGSTD.Image = "";
                        }
                        else
                        {
                            ObjGSTD.Image = "http://admin.careerprabhu.com/" + "uploadimages/" + Convert.ToString(row["image"]);
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


        //For Getting Edit data
        [HttpGet]
        [Route("GetEditData")]
        public string GetEditedData([FromHeader] Getrepositoryid obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetrepositoryEditResponse ObjGER = new GetrepositoryEditResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("editrepository", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("repositoryid_D", obj.repositoryid);

                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGER.Status = true;
                    ObjGER.Message = "Data Found";
                    GetrepositoryEditData ObjGED = new GetrepositoryEditData();
                    ObjGED.repositoryid = Convert.ToInt32(ds.Tables[0].Rows[0]["repositoryid"]);
                    ObjGED.collegename = Convert.ToString(ds.Tables[0].Rows[0]["collegename"]);

                    ObjGED.careerid = Convert.ToInt32(ds.Tables[0].Rows[0]["careerid"]);
                    ObjGED.languageid = Convert.ToInt32(ds.Tables[0].Rows[0]["languageid"]);
                    ObjGED.description = Convert.ToString(ds.Tables[0].Rows[0]["description"]);
                    ObjGED.ImageName = Convert.ToString(ds.Tables[0].Rows[0]["OrgImageName"]);
                    ObjGED.NewImageName = Convert.ToString(ds.Tables[0].Rows[0]["NewImageName"]);
                    ObjGED.videourl = Convert.ToString(ds.Tables[0].Rows[0]["videourl"]);



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
        [Route("updatecollegerepository")]
        public async Task<IActionResult> updatecollegerepository([FromForm] IFormFile image, [FromForm] string repositoryid, [FromForm] string collegename,
            [FromForm] string careerid, [FromForm] string description,
             [FromForm] string orgimagename, [FromForm] string videourl, [FromForm] string languageid,  [FromForm] string createdby)


        
            {
                string json = "";
                string result = "";
                DataSet ds = new DataSet();
                collegerepositoryResponse ObjAMR = new collegerepositoryResponse();
                collegerepositorydata objAmp = new collegerepositorydata();


                if (orgimagename != null)
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


                objAmp.repositoryid = Convert.ToInt32(repositoryid);
                objAmp.collegename = Convert.ToInt32(collegename);

                objAmp.careerid = Convert.ToInt32(careerid);
                objAmp.description = Convert.ToString(description);
                objAmp.videourl = Convert.ToString(videourl);


            if (orgimagename == null || orgimagename == "")
                {
                    objAmp.orgimagename = "";
                }
                else
                {
                    objAmp.orgimagename = Convert.ToString(orgimagename);
                }





                objAmp.createdby = Convert.ToInt32(createdby);

                try
                {
                    //objAmp.newvideoname = Guid.NewGuid().ToString();
                    if (imageguid == "" || imageguid == null)
                    {
                        objAmp.newimagename = "";
                    }
                    else
                    {
                        objAmp.newimagename = imageguid;
                    }

                    MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                    MySqlCommand cmd = new MySqlCommand("updaterepository", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("message", "");
                    cmd.Parameters["message"].Direction = ParameterDirection.Output;
                    cmd.Parameters.AddWithValue("repositoryid_d", objAmp.repositoryid);
                    cmd.Parameters.AddWithValue("collegename_d", objAmp.collegename);
                cmd.Parameters.AddWithValue("languageid_d", Convert.ToInt32(languageid));
                cmd.Parameters.AddWithValue("careerid_d", objAmp.careerid);
                    cmd.Parameters.AddWithValue("org_imagename", objAmp.orgimagename);
                    cmd.Parameters.AddWithValue("new_imagename", objAmp.newimagename);
                   cmd.Parameters.AddWithValue("videourl_d", objAmp.videourl);

                   cmd.Parameters.AddWithValue("description_d", objAmp.description);

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
        [Route("DeleteActivity")]
        public string DeleteActivities([FromBody] collegerepositorydata obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            collegerepositoryResponse ObjAMR = new collegerepositoryResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Deleterepository", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("repositoryid_d", obj.repositoryid);
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
        public class GetCollegeResponses
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public List<GetCollegeData> data { get; set; }
        }
        public class GetCollegeData
        {

            public Int32 universityid { get; set; }
            public string universityname { get; set; }

        }

        //respons and data class
        public class GetCareerResponses
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public List<GetCareerData> data { get; set; }
        }
        public class GetCareerData
        {

            public Int32 careerid { get; set; }
            public string careername { get; set; }

        }
        public class GetSavedcollegerepository
        {
            public bool Status { get; set; }
            public string Message { get; set; }

            public List<GetSavedcollegerepositoryData> data { get; set; }
        }
        public class GetSavedcollegerepositoryData
        {
            public Int32 repositoryid { get; set; }
            public string language { get; set; }
            public string career { get; set; }
            public string university { get; set; }
            public string description { get; set; }
            public string Image { get; set; }
            public string newImage { get; set; }
            public string videourl { get; set; }

        }
       
        public class collegerepositoryResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
        }
        public class collegerepositorydata
        {
            public Int32 repositoryid { get; set; } = 0;
            //public string collegename { get; set; }

            public Int32 collegename { get; set; } = 0;

            public Int32 careerid { get; set; }
            public string description { get; set; }
            public string orgimagename { get; set; } = "";
            public string newimagename { get; set; } = "";
            public Int32 createdby { get; set; }
            public string message { get; set; } = "";
            
            public string imagetoupload { get; set; }
            public string videourl { get; set; } = "";

        }
        public class Getrepositoryid
        {
            public int repositoryid { get; set; }
        }
        public class GetrepositoryEditResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public GetrepositoryEditData data { get; set; }
        }
        public class GetrepositoryEditData
        {
            public Int32 repositoryid { get; set; }
            public string collegename { get; set; }
            public Int32 languageid { get; set; }
            public Int32 careerid { get; set; }

            public string description { get; set; }
            public string ImageName { get; set; }

            public string NewImageName { get; set; }
            public string videourl { get; set; }

            public Int32 createdby { get; set; }
           
        }
        public class ExcellSchoolData_repository
        {
            public List<SchoolData_repository> schoolDatas { get; set; }
        }
        public class SchoolData_repository
        {
            public string career { get; set; }
            public string college { get; set; }
            public string language { get; set; }
            public string description { get; set; }
            public string videolink { get; set; }
       
        }
        public class AddGroupClass_repository
        {
            public bool Status { get; set; }
            public string Message { get; set; }


        }


        //class for get class

    }
}

