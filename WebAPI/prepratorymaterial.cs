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
    [Route("api/prepratorymaterial")]
    public class prepratorymaterial : Controller
    {
        
            IConfiguration _iconfiguration;
        private IHostingEnvironment _hostingEnvironment;
        string pdffilename = "";
        string prevpdfguid = "";
        string pdfpath = "";
        public prepratorymaterial(IConfiguration iconfiguration, IHostingEnvironment hosting)
            {
                _iconfiguration = iconfiguration;
            _hostingEnvironment = hosting;
        }

            [HttpGet]
            [Route("GetPrepClass")]
            public string GetPrepClass()
            {
                GetPrepClassResponse GCR = new GetPrepClassResponse();
                List<GetPrepClassData> ListGCD = new List<GetPrepClassData>();
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
                        GCR.status = true;
                        GCR.message = "Data Found";
                        foreach (DataRow row in ds.Tables[0].Rows)
                        {
                            GetPrepClassData GCD = new GetPrepClassData();
                            GCD.classid = Convert.ToInt32(row["class_id"]);
                            GCD.classname = Convert.ToString(row["class_name"]);

                            ListGCD.Add(GCD);
                        }
                    }
                    else
                    {
                        GCR.status = false;
                        GCR.message = "Something went wrong";
                    }
                    GCR.data = ListGCD;

                }
                catch (Exception e)
                {
                    GCR.status = false;
                    GCR.message = e.Message;
                }
                JsonSerializerSettings settings = new JsonSerializerSettings();
                settings.NullValueHandling = NullValueHandling.Ignore;
                json = JsonConvert.SerializeObject(GCR, settings);
                return json;
            }



        [HttpGet]
        [Route("BindLogo")]
        public string BindLogo()
        {
            GetLogoResponse GCR = new GetLogoResponse();
            List<GetLogota> ListGCD = new List<GetLogota>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindLogoList", con);
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
                        GetLogota GCD = new GetLogota();
                        GCD.logoid = Convert.ToString(row["logoid"]);
                        GCD.logoname = Convert.ToString(row["logoname"]);

                        ListGCD.Add(GCD);
                    }
                }
                else
                {
                    GCR.Status = false;
                    GCR.Message = "Something went wrong";
                }
                GCR.data = ListGCD;

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




        //Get saved data
        [HttpGet]
            [Route("GetPrepSavedData")]
            public string GetPrepSavedData()
            {
                string json = "";
                GetSavedPrepDataResponse ObjGSDR = new GetSavedPrepDataResponse();
                List<GetSavedPrepData> ListGSD = new List<GetSavedPrepData>();
                DataSet ds = new DataSet();
                try
                {
                    MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                    MySqlCommand cmd = new MySqlCommand("Prep_GetSavedData", con);
                    con.Open();
                    MySqlDataAdapter da = new MySqlDataAdapter();
                    da.SelectCommand = cmd;
                    da.Fill(ds);
                    con.Close();
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        ObjGSDR.Status = true;
                        ObjGSDR.Message = "success";

                        
                        foreach (DataRow row in ds.Tables[0].Rows)
                        {
                        GetSavedPrepData ObjGSD = new GetSavedPrepData();
                        ObjGSD.Id = Convert.ToInt32(row["ID"]);
                            ObjGSD.ClassName = Convert.ToString(row["Class"]);
                            ObjGSD.Stream = Convert.ToString(row["Stream"]);
                            ObjGSD.Topic = Convert.ToString(row["Categoryname"]);
                            //ObjGSD.docname =  Convert.ToString(row["docname"]);
                        if (Convert.ToString(row["docname"]) == "olympiad")
                        {
                            ObjGSD.logo1 = "http://admin.careerprabhu.com/" + "Logo/" + "olympiad_1.png";
                        }

                        if (Convert.ToString(row["docname"]) == "scholarship")
                        {
                            ObjGSD.logo1 = "http://admin.careerprabhu.com/" + "Logo/" + "scholarship_1.png";
                        }

                        if (Convert.ToString(row["docname"]) == "Entrance")
                        {
                            ObjGSD.logo1 = "http://admin.careerprabhu.com/" + "Logo/" + "Entrance.png";
                        }
                        if (Convert.ToString(row["docname"]) == "competiotion")
                        {
                            ObjGSD.logo1 = "http://admin.careerprabhu.com/" + "Logo/" + "competiotion_1.png";
                        }



                        ListGSD.Add(ObjGSD);
                        }
                    ObjGSDR.data = ListGSD;
                }
                    else
                    {
                        ObjGSDR.Status = false;
                        ObjGSDR.Message = "No data found";
                    }
                }
                catch (Exception e)
                {
                    ObjGSDR.Status = false;
                    ObjGSDR.Message = e.Message;
                }
                JsonSerializerSettings settings = new JsonSerializerSettings();
                settings.NullValueHandling = NullValueHandling.Ignore;
                json = JsonConvert.SerializeObject(ObjGSDR, settings);
                return json;
            }
            //Get Streams
            [HttpGet]
            [Route("GetPrepStream")]
            public string GetPrepStream()
            {
                string json = "";
                GetPrepStreamResponse ObjGSR = new GetPrepStreamResponse();
                List<GetPrepStreamsData> ListGSD = new List<GetPrepStreamsData>();
                DataSet ds = new DataSet();
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

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        ObjGSR.status = true;
                        ObjGSR.message = "Data Found";
                        foreach (DataRow row in ds.Tables[0].Rows)
                        {
                            GetPrepStreamsData GSD = new GetPrepStreamsData();
                            GSD.streamid = Convert.ToInt32(row["Stream_Id"]);
                            GSD.streamname = Convert.ToString(row["Stream_Name"]);

                            ListGSD.Add(GSD);
                        }
                    }
                    else
                    {
                        ObjGSR.status = false;
                        ObjGSR.message = "Something went wrong";
                    }
                    ObjGSR.data = ListGSD;
                }
                catch (Exception e)
                {
                    ObjGSR.status = false;
                    ObjGSR.message = e.Message;
                }
                JsonSerializerSettings settings = new JsonSerializerSettings();
                settings.NullValueHandling = NullValueHandling.Ignore;
                json = JsonConvert.SerializeObject(ObjGSR, settings);
                return json;
            }
        //This API For Save Prepratory details
        [HttpPost]
            [Route("SavePrepratory")]
            public async Task<IActionResult> SavePrepratory([FromForm] IFormFile pdf, [FromForm] string acttype, [FromForm] string classid, [FromForm] string streamid, [FromForm] string topic,
       [FromForm] string createdby, [FromForm] string ID, [FromForm] string orgpdfname, [FromForm] string logoid)
            {


                GetPrepDataResponse GWDR = new GetPrepDataResponse();
                //SubscriptionData Sd = new SubscriptionData();
                DataSet ds = new DataSet();
                string json = "";
                string result = "";

            try
            {
                prevpdfguid = Guid.NewGuid().ToString();
                pdffilename = prevpdfguid + pdf.FileName;

                var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "Logo");
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
                        MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                        MySqlCommand cmd = new MySqlCommand("PrepratoryManager", con);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("message", "");
                        cmd.Parameters["message"].Direction = ParameterDirection.Output;
                        cmd.Parameters.AddWithValue("acttype", acttype);
                        cmd.Parameters.AddWithValue("classid", classid);
                        cmd.Parameters.AddWithValue("streamid", streamid);
                        cmd.Parameters.AddWithValue("categoryname_c", topic);
                        cmd.Parameters.AddWithValue("createdby", Convert.ToInt32(createdby));
                        cmd.Parameters.AddWithValue("prep_id", Convert.ToInt32(ID));
                        cmd.Parameters.AddWithValue("orgfilename_d", prevpdfguid);
                        cmd.Parameters.AddWithValue("newfilename_d", orgpdfname);
                        con.Open();
                        cmd.ExecuteScalar();
                        result = cmd.Parameters["message"].Value.ToString();
                        con.Close();
                        GWDR.status = true;
                        GWDR.Message = result;

                    }
                    catch (Exception e)
                    {
                        GWDR.status = false;
                        GWDR.Message = e.Message;

                    }
                
                JsonSerializerSettings settings = new JsonSerializerSettings();
                settings.NullValueHandling = NullValueHandling.Ignore;
                json = JsonConvert.SerializeObject(GWDR, settings);
                return Ok(json);
            }
            //Update Strream Data
            [HttpPost]
            [Route("UpdatePrepratory")]
            public async Task<IActionResult> UpdatePrepratory([FromForm] IFormFile pdf, [FromForm] string acttype, [FromForm] string classid, [FromForm] string streamid, [FromForm] string topic,
       [FromForm] string createdby, [FromForm] string ID, [FromForm] string orgpdfname)
            {

                UpdatePrepResponse SObjUWR = new UpdatePrepResponse();
                DataSet ds = new DataSet();
                string json = "";
                string result = "";
            if (pdf != null)
            {
                try
                {
                    prevpdfguid = Guid.NewGuid().ToString();
                    pdffilename = prevpdfguid + pdf.FileName;

                    var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "Logo");
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
              
                prevpdfguid = "";

            }


            try
                    {

                SObjUWR.Status = true;
                        MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                        MySqlCommand cmd = new MySqlCommand("PrepratoryManager", con);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("message", "");
                        cmd.Parameters["message"].Direction = ParameterDirection.Output;
                        cmd.Parameters.AddWithValue("prep_id", Convert.ToInt32(ID));
                cmd.Parameters.AddWithValue("acttype", acttype);
                cmd.Parameters.AddWithValue("classid", classid);
                cmd.Parameters.AddWithValue("streamid", streamid);
                cmd.Parameters.AddWithValue("categoryname_c", topic);
                cmd.Parameters.AddWithValue("createdby", Convert.ToInt32(createdby));
               
                cmd.Parameters.AddWithValue("orgfilename_d", prevpdfguid);
                cmd.Parameters.AddWithValue("newfilename_d", orgpdfname);
                con.Open();
                        cmd.ExecuteScalar();
                        result = cmd.Parameters["message"].Value.ToString();
                        con.Close();
                        SObjUWR.Message = result;

                    }
                    catch (Exception e)
                    {
                        SObjUWR.Status = false;
                        SObjUWR.Message = e.Message;

                    }
                
                JsonSerializerSettings settings = new JsonSerializerSettings();
                settings.NullValueHandling = NullValueHandling.Ignore;
                json = JsonConvert.SerializeObject(SObjUWR, settings);
                return Ok(json);
            }

        //delete Prepratory Data
        [HttpPost]
            [Route("deletePrep")]
            public string DeletePrep([FromBody] GetPrepData data)
            {

                UpdatePrepResponse SObjUWR = new UpdatePrepResponse();
                DataSet ds = new DataSet();
                string json = "";
                string result = "";
                if (data == null)
                {

                    SObjUWR.Status = false;
                    SObjUWR.Message = "Something went wrong";
                }
                else
                {
                    try
                    {
                        SObjUWR.Status = true;
                        MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                        MySqlCommand cmd = new MySqlCommand("PrepratoryManager", con);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("message", "");
                        cmd.Parameters["message"].Direction = ParameterDirection.Output;
                        cmd.Parameters.AddWithValue("prep_id", data.ID);
                        cmd.Parameters.AddWithValue("acttype", data.acttype);
                        cmd.Parameters.AddWithValue("classid", data.classid);
                        cmd.Parameters.AddWithValue("streamid", data.streamid);
                        cmd.Parameters.AddWithValue("categoryname_c", data.topic);
                        cmd.Parameters.AddWithValue("createdby", data.createdby);
                        cmd.Parameters.AddWithValue("orgfilename_d","");
                        cmd.Parameters.AddWithValue("newfilename_d", "");
                    con.Open();
                        cmd.ExecuteScalar();
                        result = cmd.Parameters["message"].Value.ToString();
                        con.Close();
                        SObjUWR.Message = result;

                    }
                    catch (Exception e)
                    {
                        SObjUWR.Status = false;
                        SObjUWR.Message = e.Message;

                    }
                }
                JsonSerializerSettings settings = new JsonSerializerSettings();
                settings.NullValueHandling = NullValueHandling.Ignore;
                json = JsonConvert.SerializeObject(SObjUWR, settings);
                return json;
            }
        //EditPrepratory
        [HttpGet]
            [Route("EditPrepratory")]
            public string EditPrepratory([FromHeader] EditPrepRequest data)
            {
                DataSet ds = new DataSet();
                EditPrepResponse EWR = new EditPrepResponse();                                
                string json = "";
                try
                {
                    MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                    MySqlCommand cmd = new MySqlCommand("Prepratory_EditSavedData", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("prep_id", data.ID);
                    con.Open();
                    MySqlDataAdapter da = new MySqlDataAdapter();
                    da.SelectCommand = cmd;
                    da.Fill(ds);
                    con.Close();

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        EditPrepData EWD = new EditPrepData();
                        EWD.ID = Convert.ToInt32(ds.Tables[0].Rows[0]["ID"]);
                        EWD.Classid = Convert.ToString(ds.Tables[0].Rows[0]["class_id"]);
                        EWD.streamId = Convert.ToString(ds.Tables[0].Rows[0]["stream_id"]);
                        EWD.Topic = Convert.ToString(ds.Tables[0].Rows[0]["categoryname"]);
                        EWD.selectedlogo = Convert.ToString(ds.Tables[0].Rows[0]["newfilename"]);

                    EWR.data = EWD;
                        EWR.Status = true;
                        EWR.Message = "Data found";
                    }
                    else
                    {
                        EWR.Status = false;
                        EWR.Message = "Something went wrong";

                    }


                }
                catch (Exception ex)
                {
                    EWR.Status = false;
                    EWR.Message = ex.Message;

                }
                JsonSerializerSettings settings = new JsonSerializerSettings();
                settings.NullValueHandling = NullValueHandling.Ignore;
                json = JsonConvert.SerializeObject(EWR, settings);
                return json;
            }

        
    }



    //classes

    public class GetPrepClassResponse
    {
        public bool status { get; set; } = false;
        public string message { get; set; } = "";
        public List<GetPrepClassData> data { get; set; }
    }
    public class GetPrepClassData
    {
        public int classid { get; set; }
        public string classname { get; set; }
    }

    public class GetPrepStreamResponse
    {
        public bool status { get; set; } = false;
        public string message { get; set; } = "";
        public List<GetPrepStreamsData> data { get; set; }
    }
    public class GetPrepStreamsData
    {
        public Int32 streamid { get; set; }
        public string streamname { get; set; }
    }
    public class GetPrepDataResponse
    {
        public bool status { get; set; }
        public string Message { get; set; }
    }
    public class GetPrepData
    {
        public string acttype { get; set; }
        public string classid { get; set; }
        public string streamid { get; set; }
        public string topic { get; set; }
        public Int32 createdby { get; set; }
        public Int32 ID { get; set; } = 0;
    }
    public class GetSavedPrepDataResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetSavedPrepData> data { get; set; }
    }
    public class GetSavedPrepData
    {
        public Int32 Id { get; set; }
        public string ClassName { get; set; }
        public string Stream { get; set; }
        public string Topic { get; set; }
        public string docname { get; set; }
        public string logo1 { get; set; }
        public string logo2 { get; set; }

    }
    public class EditPrepResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public EditPrepData data { get; set; }
    }
    public class EditPrepData
    {
        public Int32 ID { get; set; }
        public string Classid { get; set; }
        public string streamId { get; set; }
        public string Topic { get; set; }
        public string selectedlogo { get; set; }
    }
    public class EditPrepRequest
    {
        public Int32 ID { get; set; }
    }
    public class UpdatePrepResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public string orgpdfname { get; set; }
    }




    public class GetLogota
    {
        public string logoname { get; set; }
      
        public string logoid { get; set; }
    }
    public class GetLogoResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetLogota> data { get; set; }
    }
}
