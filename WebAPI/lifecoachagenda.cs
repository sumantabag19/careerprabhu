using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace CareerPrabhu.WebAPI
{
    [Route("api/lifecoachagenda")]
    //PartnerRegistration
    public class lifecoachagenda : Controller
    {
        IConfiguration _iconfiguration;
        public lifecoachagenda(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
        }

        [HttpGet]
        [Route("BindTopic")]
        public string BindTopic()
        {
            DataSet ds = new DataSet();
            string json = "";
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindTopic_new", con);
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
        [Route("Savelifecoachagenda")]
        public string Savelifecoachagenda([FromForm] string coachid,
           [FromForm] string coachtype, string agenda, [FromForm] string createdby)

        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            SavecoachResponses ObjAMR = new SavecoachResponses();
            Savecoach objAmp = new Savecoach();

            objAmp.coachid = Convert.ToInt32(coachid);
            objAmp.coachtype = Convert.ToInt32(coachtype);
            objAmp.agenda = Convert.ToString(agenda);

            objAmp.createdby = Convert.ToInt32(createdby);


            try
            {


                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("savecoachagenda", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("coachid_d", objAmp.coachid);
                cmd.Parameters.AddWithValue("coachtype_d", objAmp.coachtype);

                cmd.Parameters.AddWithValue("agenda_d", objAmp.agenda);

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
            GetSavedcoachResponses ObjGSTDR = new GetSavedcoachResponses();
            List<GetSavedcoach> ListGSTD = new List<GetSavedcoach>();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getsavecoachagenda", con);
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
                        GetSavedcoach ObjGSTD = new GetSavedcoach();
                        ObjGSTD.coachid = Convert.ToInt32(row["coachid"]);
                        ObjGSTD.coachtype = Convert.ToString(row["topicname"]);
                        ObjGSTD.agenda = Convert.ToString(row["agenda"]);

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
        public string GetEditedData([FromHeader] GetcoachId obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetcoachEditResponses ObjGER = new GetcoachEditResponses();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("editcoachmasterdata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("coachid_d", obj.coachid);

                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGER.Status = true;
                    ObjGER.Message = "Data Found";
                    GetcoachEdit ObjGED = new GetcoachEdit();
                    ObjGED.coachid = Convert.ToInt32(ds.Tables[0].Rows[0]["coachid"]);
                    ObjGED.coachtype = Convert.ToInt32(ds.Tables[0].Rows[0]["coachtype"]);
                    ObjGED.agenda = Convert.ToString(ds.Tables[0].Rows[0]["agenda"]);


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
        [Route("Updatelifecoachagenda")]
        public string Updatelifecoachagenda([FromForm] string coachid,
          [FromForm] string coachtype, [FromForm] string agenda, [FromForm] string createdby)


        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            SavecoachResponses ObjAMR = new SavecoachResponses();
            Savecoach objAmp = new Savecoach();

            objAmp.coachid = Convert.ToInt32(coachid);
            objAmp.coachtype = Convert.ToInt32(coachtype);
            objAmp.agenda = Convert.ToString(agenda);

            objAmp.createdby = Convert.ToInt32(createdby);




            try
            {


                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("updatecoachmaster", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("coachid_d", objAmp.coachid);
                cmd.Parameters.AddWithValue("coachtype_d", objAmp.coachtype);

                cmd.Parameters.AddWithValue("agenda_d", objAmp.agenda);

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
        public string DeleteActivities([FromBody] GetcoachEdit obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            GetcoachEdit ObjAMR = new GetcoachEdit();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("DeletecoachRecord", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("coachid_d", obj.coachid);
               

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



    public class SavecoachResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
    }
    public class Savecoach
    {
        public string agenda { get; set; }
        public Int32 coachtype { get; set; }
        public Int32 coachid { get; set; }
        public Int32 createdby { get; set; }


    }
    public class GetSavedcoachResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }

        public List<GetSavedcoach> data { get; set; }
    }
    public class GetSavedcoach
    {
        public Int32 coachid { get; set; }
        public string coachtype { get; set; }
        public string agenda { get; set; }

    }
    public class GetcoachId
    {
        public int coachid { get; set; }
    }
    public class GetcoachEditResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public GetcoachEdit data { get; set; }
    }
    public class GetcoachEdit
    {
        public Int32 coachid { get; set; }

        public string agenda { get; set; }
        public Int32 coachtype { get; set; }


        public Int32 createdby { get; set; }
        public bool Status { get; set; }
        public string Message { get; set; }
    }

}


