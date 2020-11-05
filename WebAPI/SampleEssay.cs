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
    [Route("api/SampleEssay")]
    public class SampleEssay : Controller
    {
        IConfiguration _iconfiguration;
        private IHostingEnvironment _hostingEnvironment;
        string prevpdfguid = "";
        string pdffilename = "";

        public SampleEssay(IConfiguration iconfiguration, IHostingEnvironment hosting)
        {
            _iconfiguration = iconfiguration;
            _hostingEnvironment = hosting;
        }
        //Api for bind all multicheckbox data
        [HttpGet]
        [Route("GetData")]
        public string GetData()
        {
            string json = "";
            DataSet ds = new DataSet();
            MultiCheckboxResponse1 objClass = new MultiCheckboxResponse1();
            List<GetData1_ForBindCountry> objResponsestate = new List<GetData1_ForBindCountry>();
            List<GetData1_ForBindLocation> objResponsecity = new List<GetData1_ForBindLocation>();
            List<GetData1_ForBindUniversity> objResponseschool = new List<GetData1_ForBindUniversity>();

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
                        GetData1_ForBindCountry state = new GetData1_ForBindCountry();
                        state.countryid = Convert.ToInt32(row["countryid"]);
                        state.countryname = Convert.ToString(row["countryname"]);

                        objResponsestate.Add(state);
                    }
                    foreach (DataRow row in ds.Tables[1].Rows)
                    {
                        GetData1_ForBindLocation city = new GetData1_ForBindLocation();
                        city.locationid = Convert.ToInt32(row["locationid"]);
                        city.location = Convert.ToString(row["location"]);

                        objResponsecity.Add(city);
                    }
                    foreach (DataRow row in ds.Tables[2].Rows)
                    {
                        GetData1_ForBindUniversity school = new GetData1_ForBindUniversity();
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
                objClass.universitydata = objResponseschool;

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

        //API for save sample essay
        [HttpPost]
        [Route("SaveSampleEssayData")]
        public async Task<IActionResult> SaveSampleEssayData([FromForm] IFormFile pdf, [FromForm] string sampleessayid,
     [FromForm] string essaydetail, [FromForm] string essaytitle, [FromForm] string link,
      [FromForm] string description, [FromForm] string orgpdfname, [FromForm] string countryid, [FromForm] string locationid,
      [FromForm] string universityid, [FromForm] string createdby)

        {
            string json = "";
            string result = "";
            int maxid = 0;
            string qry = "";

            DataSet ds = new DataSet();
            DataSet ds1 = new DataSet();
            SampleEssayResponse objppfr = new SampleEssayResponse();
            SampleEssayParam objppfp = new SampleEssayParam();



            if (pdf != null)
            {
                try
                {
                    prevpdfguid = Guid.NewGuid().ToString();
                    pdffilename = prevpdfguid + pdf.FileName;

                    var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploadpersonalessaypdf");
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





            objppfp.sampleessayid = Convert.ToInt32(sampleessayid);
            objppfp.essaytitle = Convert.ToString(essaytitle);
            objppfp.essaydetail = Convert.ToString(essaydetail);
            objppfp.link = Convert.ToString(link);
            objppfp.description = Convert.ToString(description);
            objppfp.countryid = Convert.ToString(countryid);
            objppfp.locationid = Convert.ToString(locationid);
            objppfp.universityid = Convert.ToString(universityid);
            //objppfp.orgpdfname = Convert.ToString(orgpdfname);

            objppfp.createdby = Convert.ToInt32(createdby);
            if (orgpdfname == null)
            {
                objppfp.orgpdfname = "";
            }
            else
            {
                objppfp.orgpdfname = Convert.ToString(orgpdfname);
            }





            char[] spearator = { ',', ' ' };


            string[] countrylist = objppfp.countryid.Split(spearator,
               StringSplitOptions.RemoveEmptyEntries);
            string[] lolcationlist = objppfp.locationid.Split(spearator,
               StringSplitOptions.RemoveEmptyEntries);
            string[] universitylist = objppfp.universityid.Split(spearator,
               StringSplitOptions.RemoveEmptyEntries);


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

                // objppfp.newpdfname = prevpdfguid;

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("SaveSampleEssayData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("sampleessayid_d", objppfp.sampleessayid);
                cmd.Parameters.AddWithValue("essaytitle_d", objppfp.essaytitle);
                cmd.Parameters.AddWithValue("essaydetail_d", objppfp.essaydetail);

                cmd.Parameters.AddWithValue("description_d", objppfp.description);
                cmd.Parameters.AddWithValue("countryid_d", objppfp.countryid);
                cmd.Parameters.AddWithValue("locationid_d", objppfp.locationid);
                cmd.Parameters.AddWithValue("universityid_d", objppfp.universityid);
              
                cmd.Parameters.AddWithValue("link_d", objppfp.link);

                cmd.Parameters.AddWithValue("orgpdfname_d", objppfp.orgpdfname);
                cmd.Parameters.AddWithValue("newpdfname_d", objppfp.newpdfname);

                cmd.Parameters.AddWithValue("created_by", objppfp.createdby);
                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();


                //save data in other table start

                try
                {
                    if (countrylist.Length > 0)
                    {

                        qry = "SELECT MAX(sampleessayid) as sam_id FROM tbl_sampleessay";

                        MySqlCommand cmd1 = new MySqlCommand(qry, con);

                        MySqlDataAdapter da1 = new MySqlDataAdapter();
                        da1.SelectCommand = cmd1;
                        da1.Fill(ds1);
                        con.Close();
                        if (ds1.Tables[0].Rows.Count > 0)
                        {
                            maxid = Convert.ToInt32(ds1.Tables[0].Rows[0]["sam_id"]);
                        }
                        else
                        {
                            maxid = 0;
                        }

                    }
                    else
                    {

                    }
                }
                catch (Exception ex)
                {
                    string msg = ex.Message;
                }

                if (countrylist.Length > 0)
                {
                    Execqry("delete from tbl_essaycountry where sampleessayid=" + maxid);
                    for (int i = 0; i < countrylist.Length; i++)
                    {

                        Execqry("insert into tbl_essaycountry(sampleessayid,countryid)values(" + maxid + ", " + Convert.ToInt32(countrylist[i]) + ")");
                    }

                }
                if (lolcationlist.Length > 0)
                {
                    Execqry("delete from tbl_essaylocation where sampleessayid=" + maxid);
                    for (int i = 0; i < lolcationlist.Length; i++)
                    {

                        Execqry("insert into tbl_essaylocation(sampleessayid,locationid)values(" + maxid + ", " + Convert.ToInt32(lolcationlist[i]) + ")");
                    }
                }
                if (universitylist.Length > 0)
                {
                    Execqry("delete from tbl_essayuniversity where sampleessayid=" + maxid);
                    for (int i = 0; i < universitylist.Length; i++)
                    {

                        Execqry("insert into tbl_essayuniversity(sampleessayid,universityid)values(" + maxid + ", " + Convert.ToInt32(universitylist[i]) + ")");
                    }
                }



                //save data in other table end


                //con.Close();
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
        [Route("BindSampleEssayData")]
        public string BindSampleEssayData()
        {
            string json = "";
            DataSet ds = new DataSet();
            GetSavedSampleEssayResponse ObjGSPDR = new GetSavedSampleEssayResponse();
            List<GetSavedSampleEssayData> ListGSPD = new List<GetSavedSampleEssayData>();

            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("GetSampleEssayData", con);
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
                        GetSavedSampleEssayData ObjGSPD = new GetSavedSampleEssayData();

                        ObjGSPD.sampleessayid = Convert.ToInt32(row["sampleessayid"]);
                        ObjGSPD.essaytitle = Convert.ToString(row["essaytitle"]);
                        ObjGSPD.countryname = Convert.ToString(row["countryid"]);
                        ObjGSPD.location = Convert.ToString(row["locationid"]);
                        ObjGSPD.universityname = Convert.ToString(row["universityid"]);
                        ObjGSPD.description = Convert.ToString(row["description"]);
                        ObjGSPD.essaydetail = Convert.ToString(row["essaydetail"]);
                        ObjGSPD.link = Convert.ToString(row["link"]);

                        if(Convert.ToString(row["filename"]) == "" || Convert.ToString(row["filename"])== null)
                        {
                            ObjGSPD.pdfname = "";
                        }
                        else
                        {
                            ObjGSPD.pdfname = "http://admin.careerprabhu.com/" + "uploadpersonalessaypdf/" + Convert.ToString(row["filename"]);
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

        //API for edit sample essay data 
        [HttpGet]
        [Route("EditSampleEssay")]
        public string EditSampleEssay([FromHeader] EditSampleEssayData data)
        {
            DataSet ds = new DataSet();
            EditSampleEssayDataResponse edr = new EditSampleEssayDataResponse();
            List<SampleEssayEditData> sd = new List<SampleEssayEditData>();
            string json = "";
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("EditSampleEssay", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("sampleessayid_d", data.sampleessayid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();

                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        SampleEssayEditData sed = new SampleEssayEditData();
                        sed.sampleessayid = Convert.ToInt32(row["sampleessayid"]);
                        sed.countryid = row["countryid"].ToString();
                        //sed.countryname = row["countryname"].ToString();
                        sed.locationid = row["locationid"].ToString();
                        //sed.location = row["location"].ToString();
                        sed.universityid = row["universityid"].ToString();
                        sed.essaytitle = row["essaytitle"].ToString();
                        sed.description = row["guideline"].ToString();
                        sed.link = row["link"].ToString();
              
                        sed.essaydetail = row["essaydetail"].ToString();


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

        //API for update sample essay data
        [HttpPost]
        [Route("UpdateSampleEssayData")]
        public async Task<IActionResult> UpdateSampleEssayData([FromForm] IFormFile pdf, [FromForm] string sampleessayid,
     [FromForm] string essaydetail, [FromForm] string essaytitle, [FromForm] string link,
      [FromForm] string description, [FromForm] string orgpdfname, [FromForm] string countryid, [FromForm] string locationid,
      [FromForm] string universityid, [FromForm] string createdby)

        {
            string json = "";
            string result = "";
          
            DataSet ds = new DataSet();
            DataSet ds1 = new DataSet();
            SampleEssayResponse objppfr = new SampleEssayResponse();
            SampleEssayParam objppfp = new SampleEssayParam();



            if (pdf != null)
            {
                try
                {
                    prevpdfguid = Guid.NewGuid().ToString();
                    pdffilename = prevpdfguid + pdf.FileName;

                    var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploadpersonalessaypdf");
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



            objppfp.sampleessayid = Convert.ToInt32(sampleessayid);
            objppfp.essaytitle = Convert.ToString(essaytitle);
            objppfp.essaydetail = Convert.ToString(essaydetail);
            objppfp.link = Convert.ToString(link);
            objppfp.description = Convert.ToString(description);
            objppfp.countryid = Convert.ToString(countryid);
            objppfp.locationid = Convert.ToString(locationid);
            objppfp.universityid = Convert.ToString(universityid);
            //objppfp.orgpdfname = Convert.ToString(orgpdfname);

            objppfp.createdby = Convert.ToInt32(createdby);
            if (orgpdfname == null)
            {
                objppfp.orgpdfname = "";
            }
            else
            {
                objppfp.orgpdfname = Convert.ToString(orgpdfname);
            }





            char[] spearator = { ',', ' ' };


            string[] countrylist = objppfp.countryid.Split(spearator,
               StringSplitOptions.RemoveEmptyEntries);
            string[] lolcationlist = objppfp.locationid.Split(spearator,
               StringSplitOptions.RemoveEmptyEntries);
            string[] universitylist = objppfp.universityid.Split(spearator,
               StringSplitOptions.RemoveEmptyEntries);


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

                // objppfp.newpdfname = prevpdfguid;

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("UpdateSampleEssay", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("sampleessayid_d", objppfp.sampleessayid);
                cmd.Parameters.AddWithValue("essaytitle_d", objppfp.essaytitle);
                cmd.Parameters.AddWithValue("essaydetail_d", objppfp.essaydetail);

                cmd.Parameters.AddWithValue("description_d", objppfp.description);
                cmd.Parameters.AddWithValue("countryid_d", objppfp.countryid);
                cmd.Parameters.AddWithValue("locationid_d", objppfp.locationid);
                cmd.Parameters.AddWithValue("universityid_d", objppfp.universityid);

                cmd.Parameters.AddWithValue("link_d", objppfp.link);

                cmd.Parameters.AddWithValue("orgpdfname_d", objppfp.orgpdfname);
                cmd.Parameters.AddWithValue("newpdfname_d", objppfp.newpdfname);

                cmd.Parameters.AddWithValue("created_by", objppfp.createdby);
                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();



                if (countrylist.Length > 0)
                {
                    Execqry("delete from tbl_essaycountry where sampleessayid=" + objppfp.sampleessayid);
                    for (int i = 0; i < countrylist.Length; i++)
                    {

                        Execqry("insert into tbl_essaycountry(sampleessayid,countryid)values(" + objppfp.sampleessayid + ", " + Convert.ToInt32(countrylist[i]) + ")");
                    }

                }
                if (lolcationlist.Length > 0)
                {
                    Execqry("delete from tbl_essaylocation where sampleessayid=" + objppfp.sampleessayid);
                    for (int i = 0; i < lolcationlist.Length; i++)
                    {

                        Execqry("insert into tbl_essaylocation(sampleessayid,locationid)values(" + objppfp.sampleessayid + ", " + Convert.ToInt32(lolcationlist[i]) + ")");
                    }
                }
                if (universitylist.Length > 0)
                {
                    Execqry("delete from tbl_essayuniversity where sampleessayid=" + objppfp.sampleessayid);
                    for (int i = 0; i < universitylist.Length; i++)
                    {

                        Execqry("insert into tbl_essayuniversity(sampleessayid,universityid)values(" + objppfp.sampleessayid + ", " + Convert.ToInt32(universitylist[i]) + ")");
                    }
                }


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

        //API for delete sample essay data
        [HttpPost]
        [Route("DeleteSampleEssayData")]
        public string DeleteSampleEssayData([FromBody] DeleteSampleEssayParam obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            DeleteSampleEssayParam ObjAMR = new DeleteSampleEssayParam();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("DeleteSampleEssayData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("sampleessayid_d", obj.sampleessayid);


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


    //class for bind all multi checkbox
    public class MultiCheckboxResponse1
    {
        public bool status { get; set; } = false;
        public string message { get; set; } = "";
        public List<GetData1_ForBindCountry> countrydata { get; set; }
        public List<GetData1_ForBindLocation> locationdata { get; set; }
        public List<GetData1_ForBindUniversity> universitydata { get; set; }
    }
    public class GetData1_ForBindCountry
    {
        public int countryid { get; set; }
        public string countryname { get; set; }
    }
    public class GetData1_ForBindLocation
    {
        public int locationid { get; set; }
        public string location { get; set; }
    }
    public class GetData1_ForBindUniversity
    {
        public int universityid { get; set; }
        public string universityname { get; set; }
    }

    //class for save sample essay data
    public class SampleEssayResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
    }
    public class SampleEssayParam
    {

        public Int32 sampleessayid { get; set; } = 0;
        public string essaytitle { get; set; } = "";
        public string essaydetail { get; set; } = "";
        public string link { get; set; } = "";
        public string description { get; set; } = "";
        public string countryid { get; set; } = "";
        public string locationid { get; set; } = "";
        public string universityid { get; set; } = "";


        public string orgpdfname { get; set; } = "";
        public string newpdfname { get; set; } = "";


        public Int32 createdby { get; set; }
        public string message { get; set; } = "";


    }

    //bind table data
    public class GetSavedSampleEssayResponse
    {
        public bool Statue { get; set; }
        public string Message { get; set; }

        public List<GetSavedSampleEssayData> data { get; set; }

    }
    public class GetSavedSampleEssayData
    {
        public Int32 sampleessayid { get; set; } = 0;

        public string essaydetail { get; set; } = "";
        public string essaytitle { get; set; } = "";
        public string description { get; set; } = "";
        public string link { get; set; } = "";
        public string pdfname { get; set; } = "";
        public string countryname { get; set; } = "";
        public string location { get; set; } = "";
        public string universityname { get; set; } = "";

        public Int32 createdby { get; set; }
        public string message { get; set; } = "";


    }
    //class for edit sample essay data
    public class EditSampleEssayData
    {
        public int sampleessayid { get; set; }
    }
    public class EditSampleEssayDataResponse
    {
        public bool Status { get; set; } = false;
        public string Message { get; set; } = "";
        public List<SampleEssayEditData> data { get; set; }
    }
    public class SampleEssayEditData
    {
        public int sampleessayid { get; set; }
        public string countryid { get; set; }
        public string countryname { get; set; }
        public string locationid { get; set; }
        public string location { get; set; }
        public string universityid { get; set; }
        public string universityname { get; set; }
        public string link { get; set; }
        public string essaytitle { get; set; }
        public string essaydetail { get; set; }
        public string description { get; set; }

    }
    public class DeleteSampleEssayParam
    {
        public bool Status { get; set; } = false;
        public string Message { get; set; } = "";
        public Int32 sampleessayid { get; set; }
    }
}
