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
    [Route("api/sopintrestmaster")]
    public class SopIntrestMaster : Controller
    {
        IConfiguration _iconfiguration;
        public SopIntrestMaster(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
        }

        //Save sop intrest area
        [HttpPost]
        [Route("SaveSopIntrestDetail")]
        public string SaveSopIntrestDetail([FromBody] SaveSopIntrestdata data)
        {

            GetSopIntrestDataResponse GRD = new GetSopIntrestDataResponse();
            //SubscriptionData Sd = new SubscriptionData();
            DataSet ds = new DataSet();
            string json = "";
            string result = "";
            if (data == null)
            {
                json = "Something went wrong";
                GRD.Status = false;
                GRD.Message = "Something went wrong";
            }
            else
            {
                try
                {
                    MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                    MySqlCommand cmd = new MySqlCommand("SopIntrestManager", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("message", "");
                    cmd.Parameters["message"].Direction = ParameterDirection.Output;
                    cmd.Parameters.AddWithValue("acttype", data.acttype);

                    cmd.Parameters.AddWithValue("intrest_name", data.intrestname);

                    cmd.Parameters.AddWithValue("intrest_id", data.intrestid);
                    con.Open();
                    cmd.ExecuteScalar();
                    result = cmd.Parameters["message"].Value.ToString();
                    con.Close();
                    GRD.Status = true;
                    GRD.Message = result;

                }
                catch (Exception e)
                {
                    GRD.Status = false;
                    GRD.Message = e.Message;

                }
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(GRD, settings);
            return json;
        }


        //get sop intrest data

        [HttpGet]
        [Route("GetSopIntrestSavedData")]
        public string GetSavedData()
        {
            string json = "";
            GetSavedSopIntrestDataResponse ObjGSDR = new GetSavedSopIntrestDataResponse();
            List<GetSavedSopIntrestData> ListGSD = new List<GetSavedSopIntrestData>();
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("SopIntrest_GetSavedData", con);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGSDR.Status = true;
                    ObjGSDR.Message = "success";

                    GetSavedSopIntrestData ObjGSD = new GetSavedSopIntrestData();
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        ObjGSD.intrestid = Convert.ToInt32(row["intrestid"]);
                        ObjGSD.intrestname = Convert.ToString(row["intrestname"]);

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

        //edit sop intrest area
        [HttpGet]
        [Route("EditSopIntrest")]
        public string EditSopIntrest([FromHeader] EditSopIntrestResponse data)
        {
            DataSet ds = new DataSet();
            EditSopIntrestResponse ERD = new EditSopIntrestResponse();
            string json = "";
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("SopIntrest_EditSavedData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("intrest_id", data.intrestid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();

                if (ds.Tables[0].Rows.Count > 0)
                {
                    ERD.intrestid = Convert.ToInt32(ds.Tables[0].Rows[0]["intrestid"]);
                    ERD.intrestname = Convert.ToString(ds.Tables[0].Rows[0]["intrestname"]);


                    ERD.Status = true;
                    ERD.Message = "Data found";
                }
                else
                {
                    ERD.Status = false;
                    ERD.Message = "Something went wrong";

                }


            }
            catch (Exception ex)
            {
                ERD.Status = false;
                ERD.Message = ex.Message;

            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(ERD, settings);
            return json;
        }

        //update sop intrest area
        [HttpPost]
        [Route("UpdateSopIntrestDetail")]
        public string UpdateSopIntrestDetail([FromBody] SaveSopIntrestdata data)
        {

            GetSopIntrestDataResponse SObjUWR = new GetSopIntrestDataResponse();
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
                    MySqlCommand cmd = new MySqlCommand("SopIntrestManager", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("message", "");
                    cmd.Parameters["message"].Direction = ParameterDirection.Output;
                    cmd.Parameters.AddWithValue("intrest_id", data.intrestid);
                    cmd.Parameters.AddWithValue("acttype", data.acttype);

                    cmd.Parameters.AddWithValue("intrest_name", data.intrestname);

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

        //delete sopintrest data
        [HttpPost]
        [Route("deleteSopIntrest")]
        public string deleteSopIntrest([FromBody] DeleteSopIntrest data)
        {

            DeleteSopIntrest delrepo = new DeleteSopIntrest();
            DataSet ds = new DataSet();
            string json = "";
            string result = "";
            if (data == null)
            {

                delrepo.Status = false;
                delrepo.Message = "Something went wrong";
            }
            else
            {
                try
                {
                    delrepo.Status = true;
                    MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                    MySqlCommand cmd = new MySqlCommand("SopIntrestManager", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("message", "");
                    cmd.Parameters["message"].Direction = ParameterDirection.Output;
                    cmd.Parameters.AddWithValue("intrest_id", data.intrestid);
                    cmd.Parameters.AddWithValue("acttype", data.acttype);

                    cmd.Parameters.AddWithValue("intrest_name", data.intrestname);

                    con.Open();
                    cmd.ExecuteScalar();
                    result = cmd.Parameters["message"].Value.ToString();
                    con.Close();
                    delrepo.Message = result;

                }
                catch (Exception e)
                {
                    delrepo.Status = false;
                    delrepo.Message = e.Message;

                }
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(delrepo, settings);
            return json;
        }
    }

    //classes start for SOP intrest area

    //class for save intrest area
    public class SaveSopIntrestdata
    {
        public string acttype { get; set; }

        public string intrestname { get; set; }

        public Int32 intrestid { get; set; } = 0;
    }
    public class GetSopIntrestDataResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
    }

    //class for get data
    public class GetSavedSopIntrestDataResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }

        public List<GetSavedSopIntrestData> data { get; set; }

    }
    public class GetSavedSopIntrestData
    {
        public Int32 intrestid { get; set; }
        public string intrestname { get; set; }


    }

    //class for edit sop intrest
    public class EditSopIntrestResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public Int32 intrestid { get; set; }

        public string intrestname { get; set; }

    }

    //class for delete sopintrest
    public class DeleteSopIntrest
    {
        public string acttype { get; set; }
        public Int32 intrestid { get; set; }
        public string intrestname { get; set; }
        public bool Status { get; set; }
        public string Message { get; set; }
    }
}
