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
    [Route("api/guideline")]
    public class guideline : Controller
    {
        IConfiguration _iconfiguration;
        private IHostingEnvironment _hostingEnvironment;


        public guideline(IConfiguration iconfiguration, IHostingEnvironment hosting)
        {
            _iconfiguration = iconfiguration;
            _hostingEnvironment = hosting;
        }
        [HttpGet]
        [Route("bindpage")]
        public string bindpage()
        {
            GetpageResponse GIAR = new GetpageResponse();
            List<GetPageData> ListGIAD = new List<GetPageData>();
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
                        GetPageData GIAD = new GetPageData();
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

        //API for save professional seek master
        [HttpPost]
        [Route("Saveguideline")]
        public string Saveguideline([FromForm] string regdid, [FromForm] string pageid,
           [FromForm] string guideline, [FromForm] string createdby)

        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            guidelineResponse ObjAMR = new guidelineResponse();
            guidelinedata objAmp = new guidelinedata();

            objAmp.regdid = Convert.ToInt32(regdid);
            objAmp.pageid = Convert.ToInt32(pageid);

            objAmp.guideline = Convert.ToString(guideline);

            objAmp.createdby = Convert.ToInt32(createdby);

            try
            {


                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Saveguideline", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("regdid_d", objAmp.regdid);
                cmd.Parameters.AddWithValue("page_id", objAmp.pageid);

                cmd.Parameters.AddWithValue("guideline_d", objAmp.guideline);

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
            GetSavedguidelineResponse ObjGSTDR = new GetSavedguidelineResponse();
            List<GetSavedguidelinedata> ListGSTD = new List<GetSavedguidelinedata>();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getsaveguidelinedata", con);
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
                        GetSavedguidelinedata ObjGSTD = new GetSavedguidelinedata();
                        ObjGSTD.regdid = Convert.ToInt32(row["regdid"]);
                        ObjGSTD.pagename = Convert.ToString(row["pagename"]);

                        //ObjGSTD.stream = Convert.ToString(row["streamname"]);
                        ObjGSTD.guideline = Convert.ToString(row["guideline"]);



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
        public string GetEditedData([FromHeader] Getregdid obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetguidelineEditResponse ObjGER = new GetguidelineEditResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("editguidelinedata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("regdid_D", obj.regdid);

                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGER.Status = true;
                    ObjGER.Message = "Data Found";
                    GetguidelineEditData ObjGED = new GetguidelineEditData();
                    ObjGED.regdid = Convert.ToInt32(ds.Tables[0].Rows[0]["regdid"]);
                    ObjGED.pageid = Convert.ToInt32(ds.Tables[0].Rows[0]["pageid"]);

                    ObjGED.guideline = Convert.ToString(ds.Tables[0].Rows[0]["guideline"]);



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
        [Route("Updateguideline")]
        public string Updateguideline([FromForm] string regdid, [FromForm] string pageid,
           string guideline, [FromForm] string createdby)


        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            guidelineResponse ObjAMR = new guidelineResponse();
            guidelinedata objAmp = new guidelinedata();

            objAmp.regdid = Convert.ToInt32(regdid);
            objAmp.pageid = Convert.ToInt32(pageid);

            objAmp.guideline = Convert.ToString(guideline);

            objAmp.createdby = Convert.ToInt32(createdby);

            try
            {


                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("UpdateguidelineData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("regdid_d", objAmp.regdid);
                cmd.Parameters.AddWithValue("page_id", objAmp.pageid);

                cmd.Parameters.AddWithValue("guideline_d", objAmp.guideline);

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
        public string DeleteActivities([FromBody] GetguidelineEditData obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            GetguidelineEditData ObjAMR = new GetguidelineEditData();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("DeleteguidelineRecord", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("regdid_d", obj.regdid);

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

        public class GetpageResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public List<GetPageData> data { get; set; }
        }
        public class GetPageData
        {
            public Int32 pageid { get; set; }
            public string pagename { get; set; }
        }

        public class guidelineResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
        }
        public class guidelinedata
        {
            public Int32 regdid { get; set; }
            public Int32 pageid { get; set; } = 0;
            
            public string guideline { get; set; }
           

            public Int32 createdby { get; set; }


        }
        public class GetSavedguidelineResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }

            public List<GetSavedguidelinedata> data { get; set; }
        }
        public class GetSavedguidelinedata
        {
            public Int32 regdid { get; set; }
            public string pagename { get; set; }


            public string guideline { get; set; }

        }
        public class Getregdid
        {
            public int regdid { get; set; }
        }
        public class GetguidelineEditResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public GetguidelineEditData data { get; set; }
        }
        public class GetguidelineEditData
        {
            public Int32 regdid { get; set; }
            public string pagename { get; set; }
            public Int32 pageid { get; set; }

            public string guideline { get; set; }
            public Int32 createdby { get; set; }
            public bool Status { get; set; }
            public string Message { get; set; }
        }
    }
}


