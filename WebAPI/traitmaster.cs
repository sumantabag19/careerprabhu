using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;

namespace CareerPrabhu.WebAPI
{
    [Route("api/traitmaster")]
    public class traitmaster: Controller
    {
        IConfiguration _iconfiguration;
        public traitmaster(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
        }

        //save trait
        [HttpPost]
        [Route("SaveTraitDetail")]
        public string SaveTraitDetail([FromBody] SaveTraitdata data)
        {

            GetTraitDataResponse GRD = new GetTraitDataResponse();
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
                    MySqlCommand cmd = new MySqlCommand("TraitManager", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("message", "");
                    cmd.Parameters["message"].Direction = ParameterDirection.Output;
                    cmd.Parameters.AddWithValue("acttype", data.acttype);

                    cmd.Parameters.AddWithValue("trait_name", data.trait);

                    cmd.Parameters.AddWithValue("trait_id", data.traitid);
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

        //bind table data
        //Get saved data

        [HttpGet]
        [Route("GetrepositorySavedData")]
        public string GetSavedData()
        {
            string json = "";
            GetSavedTraitDataResponse ObjGSDR = new GetSavedTraitDataResponse();
            List<GetSavedTraitData> ListGSD = new List<GetSavedTraitData>();
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Trait_GetSavedData", con);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGSDR.Status = true;
                    ObjGSDR.Message = "success";

                    GetSavedTraitData ObjGSD = new GetSavedTraitData();
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        ObjGSD.traitid = Convert.ToInt32(row["traitid"]);
                        ObjGSD.trait = Convert.ToString(row["trait"]);

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

        //edit trait data
        [HttpGet]
        [Route("EditTrait")]
        public string EditTrait([FromHeader] EditTraitResponse data)
        {
            DataSet ds = new DataSet();
            EditTraitResponse ERD = new EditTraitResponse();
            string json = "";
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Trait_EditSavedData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("trait_id", data.traitid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();

                if (ds.Tables[0].Rows.Count > 0)
                {
                    ERD.traitid = Convert.ToInt32(ds.Tables[0].Rows[0]["traitid"]);
                    ERD.traitname = Convert.ToString(ds.Tables[0].Rows[0]["trait"]);


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

        //update trait data
        [HttpPost]
        [Route("UpdateTrait")]
        public string UpdateTrait([FromBody] SaveTraitdata data)
        {

            GetTraitDataResponse SObjUWR = new GetTraitDataResponse();
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
                    MySqlCommand cmd = new MySqlCommand("TraitManager", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("message", "");
                    cmd.Parameters["message"].Direction = ParameterDirection.Output;
                    cmd.Parameters.AddWithValue("trait_id", data.traitid);
                    cmd.Parameters.AddWithValue("acttype", data.acttype);

                    cmd.Parameters.AddWithValue("trait_name", data.trait);

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

        //delete trait data
        [HttpPost]
        [Route("deleteTrait")]
        public string DeleteTrait([FromBody] DeleteTrait data)
        {

            DeleteTrait delrepo = new DeleteTrait();
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
                    MySqlCommand cmd = new MySqlCommand("TraitManager", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("message", "");
                    cmd.Parameters["message"].Direction = ParameterDirection.Output;
                    cmd.Parameters.AddWithValue("trait_id", data.traitid);
                    cmd.Parameters.AddWithValue("acttype", data.acttype);

                    cmd.Parameters.AddWithValue("trait_name", data.trait);

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

    //classes start from here

        //class for save trait
    public class SaveTraitdata
    {
        public string acttype { get; set; }

        public string trait { get; set; }

        public Int32 traitid { get; set; } = 0;
    }
    public class GetTraitDataResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
    }

    //bind table data
    public class GetSavedTraitDataResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }

        public List<GetSavedTraitData> data { get; set; }

    }
    public class GetSavedTraitData
    {
        public Int32 traitid { get; set; }
        public string trait { get; set; }
       

    }
    //edit trait data class
    public class EditTraitResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public Int32 traitid { get; set; }

        public string traitname { get; set; }

    }
    //delete trait data
    public class DeleteTrait
    {
        public string acttype { get; set; }
        public Int32 traitid { get; set; }
        public string trait { get; set; }
        public bool Status { get; set; }
        public string Message { get; set; }
    }
}
