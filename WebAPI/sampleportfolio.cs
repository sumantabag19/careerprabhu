using System;
using System.Collections.Generic;
using System.Configuration;
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
    [Route("api/SamplePortfolio")]
    public class sampleportfolio : Controller
    {
        IConfiguration _iconfiguration;
        private IHostingEnvironment _hostingEnvironment;
        string prevpdfguid = "";
        string pdffilename = "";
     
        public sampleportfolio(IConfiguration iconfiguration, IHostingEnvironment hosting)
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


        [HttpGet]
        [Route("Bindcountry")]
        public string Bindcountry()
        {
            DataSet ds = new DataSet();
            string json = "";
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindCountry", con);
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
        [Route("BindLocation")]
        public string BindLocation([FromBody] GetSummerLocationData1 data)
        {
            GetSummerLocationResponse GSR = new GetSummerLocationResponse();
            List<GetSummerLocationData> ListGSD = new List<GetSummerLocationData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindLocation", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("countryid_d", data.countryid);
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
                        GetSummerLocationData GSD = new GetSummerLocationData();
                        GSD.locationid = Convert.ToInt32(row["locationid"]);
                        GSD.location = Convert.ToString(row["location"]);
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
        [Route("BindCity")]
        public string BindCity([FromBody] GetSummerCityData1 data)
        {
            GetSummerCityResponse GSR = new GetSummerCityResponse();
            List<GetSummerCityData> ListGSD = new List<GetSummerCityData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindCityCareer", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("countryid_d", data.countryid);
                cmd.Parameters.AddWithValue("locationid_d", data.locationid);
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
                        GetSummerCityData GSD = new GetSummerCityData();
                        GSD.cityid = Convert.ToInt32(row["cityid"]);
                        GSD.cityname = Convert.ToString(row["cityname"]);
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
        [Route("BindUniversity")]
        public string BindUniversity([FromBody] GetSummerUniversityData1 data)
        {
            GetSummerUniversityResponse GSR = new GetSummerUniversityResponse();
            List<GetSummerUniversityData> ListGSD = new List<GetSummerUniversityData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindSummerUniversity", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("countryid_d", data.countryid);
                cmd.Parameters.AddWithValue("locationid_d", data.locationid);
                cmd.Parameters.AddWithValue("cityid_d", data.cityid);
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
                        GetSummerUniversityData GSD = new GetSummerUniversityData();
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








        //Api for bind trait
        [HttpGet]
        [Route("BindTrait")]
        public string BindTrait()
        {
            BindTraitResponse GIAR = new BindTraitResponse();
            List<BindTraitData> ListGIAD = new List<BindTraitData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindTrait", con);
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
                        BindTraitData GIAD = new BindTraitData();
                        GIAD.traitid = Convert.ToInt32(row["traitid"]);
                        GIAD.trait = Convert.ToString(row["trait"]);
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

        //Api for bind all multicheckbox data
        [HttpGet]
        [Route("GetData")]
        public string GetData()
        {
            string json = "";
            DataSet ds = new DataSet();
            MultiCheckboxResponse objClass = new MultiCheckboxResponse();
            List<GetData_ForBindCountry> objResponsestate = new List<GetData_ForBindCountry>();
            List<GetData_ForBindLocation> objResponsecity = new List<GetData_ForBindLocation>();
            List<GetData_ForBindUniversity> objResponseschool = new List<GetData_ForBindUniversity>();
            
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getDataForBindMultiCheckbox", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();


                if (ds.Tables[0].Rows.Count > 0)
                {
                    objClass.status = true;
                    objClass.message = "data found";
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        GetData_ForBindCountry state = new GetData_ForBindCountry();
                        state.countryid = Convert.ToInt32(row["countryid"]);
                        state.countryname = Convert.ToString(row["countryname"]);

                        objResponsestate.Add(state);
                    }
                    foreach (DataRow row in ds.Tables[1].Rows)
                    {
                        GetData_ForBindLocation city = new GetData_ForBindLocation();
                        city.locationid = Convert.ToInt32(row["locationid"]);
                        city.location = Convert.ToString(row["location"]);

                        objResponsecity.Add(city);
                    }
                    foreach (DataRow row in ds.Tables[2].Rows)
                    {
                        GetData_ForBindUniversity school = new GetData_ForBindUniversity();
                        school.universityid = Convert.ToInt32(row["universityid"]);
                        school.universityname = Convert.ToString(row["universityname"]);

                        objResponseschool.Add(school);
                    }
                    
                    
                }
                else
                {
                    objClass.status = false;
                    objClass.message = "Something went wrong";
                }

                objClass.countrydata = objResponsestate;
                objClass.locationdata = objResponsecity;
                objClass.universitydata= objResponseschool;
              
            }
            catch (Exception ex)
            {
                objClass.status = false;
                objClass.message = ex.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(objClass, settings);
            return json;
        }

        //Api for country filter
        [HttpGet]
        [Route("GetCountryFilter")]
        public string GetCountryFilter([FromHeader] GetCountryFilterData data)
        {

            MultiCheckBooxFilterCountryData mcf = new MultiCheckBooxFilterCountryData();
            List<GetData_ForBindLocation> city = new List<GetData_ForBindLocation>();
            DataSet ds = new DataSet();
            string json = "";
            string qry = "";
            string countryid = data.countryid;
            try
            {


                if (data.countryid != "" && data.countryid != null)
                {
                    qry = "select countryid,locationid,location from tbl_location where 1=1";
                    qry = qry + " and tbl_location.countryid in (" + countryid + ")";
                }
                else
                    qry = "select countryid,locationid,location from tbl_location";

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand(qry, con);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();

                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        GetData_ForBindLocation fdc = new GetData_ForBindLocation();
                        fdc.locationid = Convert.ToInt32(row["locationid"]);
                        fdc.location = row["location"].ToString();
                        city.Add(fdc);
                    }

                    mcf.Status = true;
                    mcf.Message = "Data found";
                    mcf.locationdata = city;


                }
            }
            catch (Exception e)
            {
                mcf.Status = false;
                mcf.Message = e.Message;

            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(mcf, settings);
            return json;
        }

        //Api for university filter
        [HttpGet]
        [Route("GetUniversityFilter")]
        public string GetUniversityFilter([FromHeader] GetUniversityFilterData data)
        {

            MultiCheckBoxFilterUniversityData mcf = new MultiCheckBoxFilterUniversityData();
            List<UniversityFilterData> school = new List<UniversityFilterData>();
            DataSet ds = new DataSet();
            string json = "";
            string qry = "";
            string countryid = data.countryid == null ? "" : data.countryid;
            try
            {
                if (data.countryid != "" && (data.locationid == null ? "" : data.locationid) == "")
                {
                    qry = "SELECT universityid,universityname FROM tbl_university WHERE 1 = 1 AND tbl_university.countryid IN(" + countryid + ")";
                }
                if (data.countryid == "" && (data.locationid == null ? "" : data.locationid) != "")
                {
                    qry = "SELECT universityid,universityname FROM tbl_university WHERE 1 = 1 AND tbl_university.locationid IN(" + data.locationid + ")";
                }

                if (data.countryid != "" && (data.locationid == null ? "" : data.locationid) != "")
                {

                    qry = "SELECT universityid,universityname FROM tbl_university WHERE 1 = 1 AND tbl_university.locationid IN(" + data.locationid + ") AND" +
                                                                                         " tbl_university.countryid IN(" + countryid + ")";
                }
                if (data.countryid == "" && (data.locationid == null ? "" : data.locationid) == "")
                {
                    qry = "SELECT universityid,universityname FROM tbl_university WHERE 1 = 1";

                }

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand(qry, con);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();

                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        UniversityFilterData fdc = new UniversityFilterData();
                        fdc.universityid = Convert.ToInt32(row["universityid"]);
                        fdc.universityname = row["universityname"].ToString();
                        school.Add(fdc);
                    }

                    mcf.Status = true;
                    mcf.Message = "Data found";
                    mcf.universitydata = school;

                }
            }
            catch (Exception e)
            {
                mcf.Status = false;
                mcf.Message = e.Message;

            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(mcf, settings);
            return json;
        }

        //save portfolio data
        [HttpPost]
        [Route("SaveSamplePortfolioData")]
        public async Task<IActionResult> SaveSamplePortfolioData([FromForm] IFormFile pdf, [FromForm] string sampleportfolioid, [FromForm] string languageid,
       [FromForm] string traitid,[FromForm] string subtrait, [FromForm] string guideline,[FromForm] string description, [FromForm] string link,
        [FromForm] string orgpdfname, [FromForm] string countryid, [FromForm] string locationid,
        [FromForm] string universityid, [FromForm] string createdby,[FromForm] string cityid)

        {
            string json = "";
            string result = "";
            int maxid = 0;
            string qry = "";

            DataSet ds = new DataSet();
            DataSet ds1 = new DataSet();
            SamplePortfolioResponse objppfr = new SamplePortfolioResponse();
            SamplePortfolioParam objppfp = new SamplePortfolioParam();


            if (pdf != null)
            {
                try
                {
                    prevpdfguid = Guid.NewGuid().ToString();
                    pdffilename = prevpdfguid + pdf.FileName;

                    var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "sampleportfoliopdf");
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
             
           

            objppfp.sampleportfolioid = Convert.ToInt32(sampleportfolioid);
            objppfp.traitid = Convert.ToInt32(traitid);
            objppfp.cityid = Convert.ToInt32(cityid);
            objppfp.guideline = Convert.ToString(guideline);
            objppfp.link = Convert.ToString(link);
            objppfp.countryid = Convert.ToInt32(countryid);
            objppfp.locationid = Convert.ToInt32(locationid);
            objppfp.universityid = Convert.ToInt32(universityid);
            objppfp.subtrait = Convert.ToString(subtrait);
            objppfp.description = Convert.ToString(description);
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
                if (prevpdfguid == "")
                {
                    objppfp.newpdfname = "";
                }
                else
                {
                    objppfp.newpdfname = prevpdfguid;
                }

                
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("SaveSamplePortfolioData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("sampleportfolioid_d", objppfp.sampleportfolioid);
                cmd.Parameters.AddWithValue("traitid_d", objppfp.traitid);
                cmd.Parameters.AddWithValue("subtrait_d", objppfp.subtrait);
                cmd.Parameters.AddWithValue("countryid_d", objppfp.countryid);
                cmd.Parameters.AddWithValue("locationid_d", objppfp.locationid);
                cmd.Parameters.AddWithValue("universityid_d", objppfp.universityid);
                cmd.Parameters.AddWithValue("cityid_d", objppfp.cityid);
                cmd.Parameters.AddWithValue("languageid_d", Convert.ToInt32(languageid));
                cmd.Parameters.AddWithValue("guideline_d", objppfp.guideline);
                cmd.Parameters.AddWithValue("description_d", objppfp.description);
                cmd.Parameters.AddWithValue("link_d", objppfp.link);

                cmd.Parameters.AddWithValue("orgpdfname_d", objppfp.orgpdfname);
                cmd.Parameters.AddWithValue("newpdfname_d", objppfp.newpdfname);

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


        //get data for display
        [HttpGet]
        [Route("BindSamplePortfolioData")]
        public string BindSamplePortfolioData()
        {
            string json = "";
            DataSet ds = new DataSet();
            GetSavedSamplePortfolioResponse ObjGSPDR = new GetSavedSamplePortfolioResponse();
            List<GetSavedSamplePortfolioData> ListGSPD = new List<GetSavedSamplePortfolioData>();

            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("GetSamplePortfolioData", con);
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
                        GetSavedSamplePortfolioData ObjGSPD = new GetSavedSamplePortfolioData();

                        ObjGSPD.sampleportfolioid = Convert.ToInt32(row["sampleportfolioid"]);
                        ObjGSPD.traitname = Convert.ToString(row["trait"]);
                        ObjGSPD.subtrait = Convert.ToString(row["subtrait"]);
                        ObjGSPD.countryname = Convert.ToString(row["countryname"]);
                        ObjGSPD.location = Convert.ToString(row["location"]);
                        ObjGSPD.cityname = Convert.ToString(row["cityname"]);
                        ObjGSPD.universityname = Convert.ToString(row["universityname"]);
                        ObjGSPD.guideline = Convert.ToString(row["guideline"]);
                        ObjGSPD.link = Convert.ToString(row["link"]);
                        ObjGSPD.description = Convert.ToString(row["description"]);
                        ObjGSPD.pdfname = "http://admin.careerprabhu.com/" + "sampleportfoliopdf/" + Convert.ToString(row["filename"]);



                        if (Convert.ToString(row["filename"]) == "")
                        {
                            ObjGSPD.pdfname = "";
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

        //Api for edit sample portfolio data
        [HttpGet]
        [Route("EditSamplePortfolio")]
        public string EditSamplePortfolio([FromHeader] EditSamplePortfolioData data)
        {
            DataSet ds = new DataSet();
            EditSamplePortfolioDataResponse edr = new EditSamplePortfolioDataResponse();
            List<SamplePortfolioEditData> sd = new List<SamplePortfolioEditData>();
            string json = "";
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("EditSamplePortfolio", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("sampleportfolioid_d", data.sampleportfolioid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();

                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        SamplePortfolioEditData sed = new SamplePortfolioEditData();
                        sed.sampleportfolioid = Convert.ToInt32(row["sampleportfolioid"]);
                        sed.countryid = Convert.ToInt32(row["countryid"].ToString());
                 
                        sed.locationid = Convert.ToInt32(row["locationid"].ToString());
                        //sed.location = row["location"].ToString();
                        sed.universityid = Convert.ToInt32(row["universityid"].ToString());
                        sed.cityid = Convert.ToInt32(row["cityid"].ToString());
                        //sed.universityname = row["universityname"].ToString();
                        sed.guideline = row["guideline"].ToString();
                        sed.link = row["link"].ToString();
                        sed.traitid = Convert.ToInt32(row["traitid"]);
                        sed.description = row["description"].ToString();
                        sed.subtrait = row["subtrait"].ToString();
                        if(row["languageid"]==null)
                        {
                            sed.languageid = 0;
                        }
                        else
                        {
                            sed.languageid = Convert.ToInt32(row["languageid"]);
                        }
                        sd.Add(sed);

                    }
                    edr.Status = true;
                    edr.Message = "Data found";
                    edr.data = sd;
                }
                else
                {
                    edr.Status = false;
                    edr.Message = "Something went wrong";

                }


            }
            catch (Exception ex)
            {
                edr.Status = false;
                edr.Message = ex.Message;

            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(edr, settings);
            return json;
        }

        //Api for update sample portfolio
        [HttpPost]
        [Route("UpdateSamplePortfolioData")]
        public async Task<IActionResult> UpdateSamplePortfolioData([FromForm] IFormFile pdf, [FromForm] string sampleportfolioid, [FromForm] string languageid,
       [FromForm] string traitid, [FromForm] string subtrait, [FromForm] string guideline, [FromForm] string description, [FromForm] string link,
        [FromForm] string orgpdfname, [FromForm] string countryid, [FromForm] string locationid,
        [FromForm] string universityid, [FromForm] string createdby, [FromForm] string cityid)

        {
            string json = "";
            string result = "";

            DataSet ds = new DataSet();
            SamplePortfolioResponse objppfr = new SamplePortfolioResponse();
            SamplePortfolioParam objppfp = new SamplePortfolioParam();



            if (pdf != null)
            {
                try
                {
                    prevpdfguid = Guid.NewGuid().ToString();
                    pdffilename = prevpdfguid + pdf.FileName;

                    var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "sampleportfoliopdf");
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
            objppfp.sampleportfolioid = Convert.ToInt32(sampleportfolioid);
            objppfp.traitid = Convert.ToInt32(traitid);
            objppfp.cityid = Convert.ToInt32(cityid);
            objppfp.guideline = Convert.ToString(guideline);
            objppfp.link = Convert.ToString(link);
            objppfp.countryid = Convert.ToInt32(countryid);
            objppfp.locationid = Convert.ToInt32(locationid);
            objppfp.universityid = Convert.ToInt32(universityid);
            objppfp.subtrait = Convert.ToString(subtrait);
            objppfp.description = Convert.ToString(description);
            objppfp.createdby = Convert.ToInt32(createdby);

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

                if (prevpdfguid == "")
                {
                    objppfp.newpdfname = "";
                }
                else
                {
                    objppfp.newpdfname = prevpdfguid;
                }

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("UpdateSamplePortfolio", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("sampleportfolioid_d", objppfp.sampleportfolioid);
                cmd.Parameters.AddWithValue("traitid_d", objppfp.traitid);
                cmd.Parameters.AddWithValue("subtrait_d", objppfp.subtrait);
                cmd.Parameters.AddWithValue("countryid_d", objppfp.countryid);
                cmd.Parameters.AddWithValue("locationid_d", objppfp.locationid);
                cmd.Parameters.AddWithValue("universityid_d", objppfp.universityid);
                cmd.Parameters.AddWithValue("cityid_d", objppfp.cityid);
                cmd.Parameters.AddWithValue("guideline_d", objppfp.guideline);
                cmd.Parameters.AddWithValue("description_d", objppfp.description);
                cmd.Parameters.AddWithValue("link_d", objppfp.link);
                cmd.Parameters.AddWithValue("languageid_d", Convert.ToInt32(languageid));
                cmd.Parameters.AddWithValue("orgpdfname_d", objppfp.orgpdfname);
                cmd.Parameters.AddWithValue("newpdfname_d", objppfp.newpdfname);

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

        //Api for delete sample portfolio data

        [HttpPost]
        [Route("DeleteSamplePortfolioData")]
        public string DeleteSamplePortfolioData([FromBody] DeleteSamplePortfolioParam obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            DeleteSamplePortfolioParam ObjAMR = new DeleteSamplePortfolioParam();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("DeleteSamplePortfolioData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("sampleportfolioid_d", obj.sampleportfolioid);


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
    //class for bind trait
    public class BindTraitResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<BindTraitData> data { get; set; }
    }
    public class BindTraitData
    {
        public Int32 traitid { get; set; }
        public string trait { get; set; }
    }

    //class for bind all multi checkbox
    public class MultiCheckboxResponse
    {
        public bool status { get; set; } = false;
        public string message { get; set; } = "";
        public List<GetData_ForBindCountry> countrydata { get; set; }
        public List<GetData_ForBindLocation> locationdata { get; set; }
        public List<GetData_ForBindUniversity> universitydata { get; set; }
    }
    public class GetData_ForBindCountry
    {
        public int countryid { get; set; }
        public string countryname { get; set; }
    }
    public class GetData_ForBindLocation
    {
        public int locationid { get; set; }
        public string location { get; set; }
    }
    public class GetData_ForBindUniversity
    {
        public int universityid { get; set; }
        public string universityname { get; set; }
    }

    //class for city filter
    public class MultiCheckBooxFilterCountryData
    {
        public bool Status { get; set; } = false;
        public string Message { get; set; } = "";
        public List<GetData_ForBindLocation> locationdata { get; set; }

    }
    public class GetCountryFilterData
    {
        public string countryid { get; set; } = "";

    }

    //class for university filter
    public class GetUniversityFilterData
    {
        public string countryid { get; set; } = "";
        public string locationid { get; set; } = "";
    }
    public class MultiCheckBoxFilterUniversityData
    {
        public bool Status { get; set; } = false;
        public string Message { get; set; } = "";
        public List<UniversityFilterData> universitydata { get; set; }
    }
    public class UniversityFilterData
    {
        public int universityid { get; set; } = 0;
        public string universityname { get; set; } = "";
    }

    //save sample portfolio data
    public class SamplePortfolioResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
    }
    public class SamplePortfolioParam
    {

        public Int32 sampleportfolioid { get; set; } = 0;
        public Int32 traitid { get; set; }
        public string subtrait { get; set; }

        public string guideline { get; set; }
        public string description { get; set; }
        public string link { get; set; } = "";
        public Int32 countryid { get; set; } 
        public Int32 locationid { get; set; }
        public Int32 universityid { get; set; }
        public Int32 cityid { get; set; }


        public string orgpdfname { get; set; } = "";
        public string newpdfname { get; set; } = "";


        public Int32 createdby { get; set; }
        public string message { get; set; } = "";
 

    }

    //bind table data
    public class GetSavedSamplePortfolioResponse
    {
        public bool Statue { get; set; }
        public string Message { get; set; }

        public List<GetSavedSamplePortfolioData> data { get; set; }

    }
    public class GetSavedSamplePortfolioData
    {
        public Int32 sampleportfolioid { get; set; } = 0;
       
        public string traitname { get; set; } = "";
        public string subtrait { get; set; }
        public string guideline { get; set; } = "";
        public string link { get; set; } = "";
        public string pdfname { get; set; } = "";
        public string countryname { get; set; } = "";
        public string location { get; set; } = "";
        public string cityname { get; set; }
        public string description { get; set; }

        public string universityname { get; set; } = "";

        public Int32 createdby { get; set; }
        public string message { get; set; } = "";
 

    }

    //edit sample portfolio data
    public class EditSamplePortfolioData
    {
        public int sampleportfolioid { get; set; }
    }
    public class EditSamplePortfolioDataResponse
    {
        public bool Status { get; set; } = false;
        public string Message { get; set; } = "";
        public List<SamplePortfolioEditData> data { get; set; }
    }
    public class SamplePortfolioEditData
    {
        public int sampleportfolioid { get; set; }
        public Int32 countryid { get; set; }
        public Int32 languageid { get; set; }
        public Int32 locationid { get; set; }
        public Int32 cityid { get; set; }

        public Int32 universityid { get; set; }
        public string subtrait { get; set; }
        public string link { get; set; }
      
        public int traitid { get; set; }
        public string description { get; set; }

        public string guideline { get; set; }
    }
    //delete sample portfolio data
    public class DeleteSamplePortfolioParam
    {
        public bool Status { get; set; } = false;
        public string Message { get; set; } = "";
        public Int32 sampleportfolioid { get; set; }
    }

}
