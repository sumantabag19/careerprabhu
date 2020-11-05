using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CareerPrabhu.WebAPI
{
    [Route("api/prepratoryname")]
    public class prepratoryname : Controller
    {
        IConfiguration _iconfiguration;
        public prepratoryname(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
        }

        //get prep calss

        [HttpGet]
        [Route("GetPrepClass")]
        public string GetPrepClass()
        {
            GetPrepNameClassResponse GCR = new GetPrepNameClassResponse();
            List<GetPrepNameClassData> ListGCD = new List<GetPrepNameClassData>();
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
                        GetPrepNameClassData GCD = new GetPrepNameClassData();
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



        //Get Streams
        [HttpGet]
        [Route("GetPrepStream")]
        public string GetPrepStream()
        {
            string json = "";
            GetPrepNameStreamResponse ObjGSR = new GetPrepNameStreamResponse();
            List<GetPrepNameStreamsData> ListGSD = new List<GetPrepNameStreamsData>();
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
                        GetPrepNameStreamsData GSD = new GetPrepNameStreamsData();
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

        //Get Streams
        [HttpGet]
        [Route("GetPrepCareer")]
        public string GetPrepCareer()
        {
            string json = "";
            GetPrepNameCareerResponse ObjGSR = new GetPrepNameCareerResponse();
            List<GetPrepNameCareerData> ListGSD = new List<GetPrepNameCareerData>();
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("bindcareer", con);
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
                        GetPrepNameCareerData GSD = new GetPrepNameCareerData();
                        GSD.careerid = Convert.ToInt32(row["careerid"]);
                        GSD.careername = Convert.ToString(row["careername"]);

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

        //Api for bind preprotary category
        [HttpGet]
        [Route("bindprepcategory")]
        public string Bindprepcategory()
        {
            GetprepratorycategoryResponse GIAR = new GetprepratorycategoryResponse();
            List<GetprepratorycategoryData> ListGIAD = new List<GetprepratorycategoryData>();
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
                        GetprepratorycategoryData GIAD = new GetprepratorycategoryData();
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
        //This API For Save Prepratory details
        [HttpPost]
        [Route("SavePrepname")]
        public string SavePrepname([FromBody] SavePrepNameData data)
        {

            SavePrepNameDataResponse GWDR = new SavePrepNameDataResponse();
            //SubscriptionData Sd = new SubscriptionData();
            DataSet ds = new DataSet();
            string json = "";
            string result = "";
            if (data == null)
            {
                json = "Something went wrong";
                GWDR.status = false;
                GWDR.Message = "Something went wrong";
            }
            else
            {
                try
                {
                    MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                    MySqlCommand cmd = new MySqlCommand("SavePrepName", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("message", "");
                    cmd.Parameters["message"].Direction = ParameterDirection.Output;
                    cmd.Parameters.AddWithValue("prepnameid", data.prepnameidi);
                    cmd.Parameters.AddWithValue("prepid_p", data.prepid);
                    cmd.Parameters.AddWithValue("classid", data.classid);
                    cmd.Parameters.AddWithValue("streamid", data.streamid);
                    cmd.Parameters.AddWithValue("careerid", data.careerid);
                    cmd.Parameters.AddWithValue("description", data.description);
                    cmd.Parameters.AddWithValue("prepname_p", data.prepname);
                    cmd.Parameters.AddWithValue("created_by", data.createdby);
                    
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
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(GWDR, settings);
            return json;
        }

        //update prepname
        //This API For Save Prepratory details
        [HttpPost]
        [Route("UpdatePrepName")]
        public string UpdatePrepName([FromBody] UpdatePrepNameData data)
        {

            UpdatePrepNameDataResponse GWDR = new UpdatePrepNameDataResponse();
            //SubscriptionData Sd = new SubscriptionData();
            DataSet ds = new DataSet();
            string json = "";
            string result = "";
            if (data == null)
            {
                json = "Something went wrong";
                GWDR.status = false;
                GWDR.Message = "Something went wrong";
            }
            else
            {
                try
                {
                    MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                    MySqlCommand cmd = new MySqlCommand("UpdatePrepName", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("message", "");
                    cmd.Parameters["message"].Direction = ParameterDirection.Output;
                    cmd.Parameters.AddWithValue("prepname_id", data.prepnameid);
                    cmd.Parameters.AddWithValue("prepid_p", data.prepid);
                    cmd.Parameters.AddWithValue("classid", data.classid);
                    cmd.Parameters.AddWithValue("streamid", data.streamid);
                    cmd.Parameters.AddWithValue("careerid", data.careerid);
                    cmd.Parameters.AddWithValue("description", data.description);
                    cmd.Parameters.AddWithValue("prepname_p", data.prepname);
                    cmd.Parameters.AddWithValue("created_by", data.createdby);

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
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(GWDR, settings);
            return json;
        }





        //bind table data

        //Get saved data
        [HttpGet]
        [Route("GetPrepSavedData")]
        public string GetPrepSavedData()
        {
            string json = "";
            GetSavedPrepNameDataResponse ObjGSDR = new GetSavedPrepNameDataResponse();
            List<GetSavedPrepNameData> ListGSD = new List<GetSavedPrepNameData>();
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Prepname_GetSavedData", con);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGSDR.Status = true;
                    ObjGSDR.Message = "success";

                    GetSavedPrepNameData ObjGSD = new GetSavedPrepNameData();
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        ObjGSD.prepnameid = Convert.ToInt32(row["prepnameid"]);
                        ObjGSD.prepname = Convert.ToString(row["prepname"]);
                        //ObjGSD.classname = Convert.ToString(row["classname"]);
                        //ObjGSD.streamname = Convert.ToString(row["streamname"]);
                        //ObjGSD.careername = Convert.ToString(row["careername"]);
                        ObjGSD.categoryname = Convert.ToString(row["categoryname"]);
                        ObjGSD.description = Convert.ToString(row["description"]);

                        ListGSD.Add(ObjGSD);
                    }
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
            json = JsonConvert.SerializeObject(ds.Tables[0], settings);
            return json;
        }


        //EditPrepratory
        [HttpGet]
        [Route("EditPrepratory")]
        public string EditPrepratory([FromHeader] EditPrepNameData data)
        {
            DataSet ds = new DataSet();
            EditPrepNameResponse EWR = new EditPrepNameResponse();
            string json = "";
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("edit_prepnamedata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("prepname_id", data.prepnameid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();

                if (ds.Tables[0].Rows.Count > 0)
                {
                    EditPrepNameData EWD = new EditPrepNameData();
                    EWD.prepnameid = Convert.ToInt32(ds.Tables[0].Rows[0]["prepnameid"]);
                    EWD.prepid = Convert.ToInt32(ds.Tables[0].Rows[0]["prepid"]);
                    EWD.categoryname = Convert.ToString(ds.Tables[0].Rows[0]["categoryname"]);
                    EWD.classid = Convert.ToString(ds.Tables[0].Rows[0]["class_id"]);
                    EWD.streamid = Convert.ToString(ds.Tables[0].Rows[0]["stream_id"]);
                    EWD.careerid = Convert.ToString(ds.Tables[0].Rows[0]["career_id"]);
                    EWD.description = Convert.ToString(ds.Tables[0].Rows[0]["description"]);
                    EWD.prepname = Convert.ToString(ds.Tables[0].Rows[0]["prepname"]);
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


        //delete prepname record
        [HttpPost]
        [Route("DeletePrepname")]
        public string DeletePrepname([FromBody] UpdatePrepNameData obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            SavePrepNameDataResponse ObjAMR = new SavePrepNameDataResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Deleteprepname", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("prepname_id", obj.prepnameid);

                cmd.Parameters.AddWithValue("created_by", obj.createdby);
                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();
                con.Close();
                ObjAMR.status = true;
                ObjAMR.Message = result;
            }
            catch (Exception e)
            {
                ObjAMR.status = false;
                ObjAMR.Message = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(ObjAMR, settings);
            return json;
        }



    }



    //classes


    //class for class multi select
    public class GetPrepNameClassResponse
    {
        public bool status { get; set; } = false;
        public string message { get; set; } = "";
        public List<GetPrepNameClassData> data { get; set; }
    }
    public class GetPrepNameClassData
    {
        public int classid { get; set; }
        public string classname { get; set; }
    }

    //class for stream multi select
    public class GetPrepNameStreamResponse
    {
        public bool status { get; set; } = false;
        public string message { get; set; } = "";
        public List<GetPrepNameStreamsData> data { get; set; }
    }
    public class GetPrepNameStreamsData
    {
        public Int32 streamid { get; set; }
        public string streamname { get; set; }
    }

    //class for career multi select
    public class GetPrepNameCareerResponse
    {
        public bool status { get; set; } = false;
        public string message { get; set; } = "";
        public List<GetPrepNameCareerData> data { get; set; }
    }
    public class GetPrepNameCareerData
    {
        public Int32 careerid { get; set; }
        public string careername { get; set; }
    }
    //class for bind prepratorycategory

    public class GetprepratorycategoryResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetprepratorycategoryData> data { get; set; }
    }
    public class GetprepratorycategoryData
    {
        public Int32 prepid { get; set; }
        public string categoryname { get; set; }
    }
    //class for save prepratory name
    public class SavePrepNameDataResponse
    {
        public bool status { get; set; }
        public string Message { get; set; }
    }
    public class SavePrepNameData
    {
        public Int32 prepnameidi { get; set; }
        public Int32 prepid { get; set; }
        public string classid { get; set; }
        public string streamid { get; set; }
        public string careerid { get; set; }
        public string description { get; set; }
        public string prepname { get; set; }
        public Int32 createdby { get; set; }
        
    }
    //class for bind table
    public class GetSavedPrepNameDataResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetSavedPrepNameData> data { get; set; }
    }
    public class GetSavedPrepNameData
    {
        public Int32 prepnameid { get; set; }
        public string prepname { get; set; }
        public string classname { get; set; }
        public string streamname { get; set; }
        public string careername { get; set; }
        public string description { get; set; }
        public string categoryname { get; set; }

    }

    //class for edit prep data

    public class EditPrepNameResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public EditPrepNameData data { get; set; }
    }
    public class EditPrepNameData
    {
        public Int32 prepnameid { get; set; }
        public Int32 prepid { get; set; }
        public string categoryname { get; set; }
        public string classid { get; set; }
        public string streamid { get; set; }
        public string careerid { get; set; }
        public string description { get; set; }
        public string prepname { get; set; }
    }

    //class for update prep name
    //class for save prepratory name
    public class UpdatePrepNameDataResponse
    {
        public bool status { get; set; }
        public string Message { get; set; }
    }
    public class UpdatePrepNameData
    {
        public Int32 prepnameid { get; set; }
        public Int32 prepid { get; set; }
        public string classid { get; set; }
        public string streamid { get; set; }
        public string careerid { get; set; }
        public string description { get; set; }
        public string prepname { get; set; }
        public Int32 createdby { get; set; }

    }
}
