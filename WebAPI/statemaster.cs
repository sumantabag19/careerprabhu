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
    [Route("api/statemaster")]
    //PartnerRegistration
    public class statemaster : Controller
    {
        IConfiguration _iconfiguration;
        public statemaster(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
        }




        [HttpPost]
        [Route("Upload")]
        public string Upload([FromBody]ExcellSchoolData_state obj)
        {
            AddGroupClass ObjClass = new AddGroupClass();
            ExcellSchoolData_state nxt = new ExcellSchoolData_state();
            List<SchoolData_state> lst = new List<SchoolData_state>();
            string json = "";
            try
            {


                if (obj.schoolDatas.Count > 0)
                {
                    SchoolData tst = new SchoolData();
                 
                    // tst.boardname = Convert.ToString(obj.schoolDatas[0].boardname);
                    //Execqry("delete from tbl_entrancecareer where examid=" + Convert.ToInt32(examid));
                    for (int i = 0; i < obj.schoolDatas.Count; i++)
                    {
                        int cid = Return_Int("select countryid from tbl_countrymaster where countryname= '" + Convert.ToString(obj.schoolDatas[i].country).Trim() + "'");
                        if (cid != 0)
                        {
                            int sid = Return_Int("select locationid from tbl_location where location='" + Convert.ToString(obj.schoolDatas[i].state).Trim() + "'and countryid=" + cid);
                            if (sid == 0)
                            {
                                Execqry("insert into tbl_location(countryid,location)values(" + Convert.ToInt32(cid) + ", '" + Convert.ToString(obj.schoolDatas[i].state).Trim() + "')");
                               
                            }

                           

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






















        [HttpPost]
        [Route("BindCountry")]
        public string BindCountry()
        {
            bindcountryResponse GSR = new bindcountryResponse();
            List<bindcountry> ListGSD = new List<bindcountry>();
            string json = "";
            DataSet ds = new DataSet();
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
                if (ds.Tables[0].Rows.Count > 0)
                {
                    GSR.Status = true;
                    GSR.Message = "Data Found";
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        bindcountry GSD = new bindcountry();
                        GSD.countryid = Convert.ToInt32(row["countryid"]);
                        GSD.countryname = Convert.ToString(row["countryname"]);
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
        [Route("Savestatemaster")]
        public string Savestatemaster([FromForm] string locationid,
           [FromForm] string countryid, string statename, [FromForm] string createdby)

        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            SavecityResponses ObjAMR = new SavecityResponses();
            Savecity objAmp = new Savecity();

            objAmp.locationid = Convert.ToInt32(locationid);
            objAmp.countryid = Convert.ToInt32(countryid);
            objAmp.statename = Convert.ToString(statename);

            objAmp.createdby = Convert.ToInt32(createdby);


            try
            {


                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("SaveLocation", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("locationid_d", objAmp.locationid);
                cmd.Parameters.AddWithValue("countryid_d", objAmp.countryid);

                cmd.Parameters.AddWithValue("location_name", objAmp.statename);

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
            GetSavedcityResponses ObjGSTDR = new GetSavedcityResponses();
            List<GetSavedcity> ListGSTD = new List<GetSavedcity>();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getsavestatemaster", con);
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
                        GetSavedcity ObjGSTD = new GetSavedcity();
                        ObjGSTD.locationid = Convert.ToInt32(row["locationid"]);
                        ObjGSTD.country = Convert.ToString(row["countryname"]);
                        ObjGSTD.state = Convert.ToString(row["location"]);

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
        public string GetEditedData([FromHeader] GetlocationId obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetcityEditResponses ObjGER = new GetcityEditResponses();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("editstatemasterdata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("locationid_d", obj.locationid);

                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGER.Status = true;
                    ObjGER.Message = "Data Found";
                    GetcityEdit ObjGED = new GetcityEdit();
                    ObjGED.locationid = Convert.ToInt32(ds.Tables[0].Rows[0]["locationid"]);
                    ObjGED.countryid = Convert.ToInt32(ds.Tables[0].Rows[0]["countryid"]);
                    ObjGED.statename = Convert.ToString(ds.Tables[0].Rows[0]["location"]);


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
        [Route("Updatestatemaster")]
        public string Updatestatemaster([FromForm] string locationid,
          [FromForm] string countryid,  [FromForm] string statename, [FromForm] string createdby)


        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            SavecityResponses ObjAMR = new SavecityResponses();
            Savecity objAmp = new Savecity();

            objAmp.locationid = Convert.ToInt32(locationid);
            objAmp.countryid = Convert.ToInt32(countryid);
            objAmp.statename = Convert.ToString(statename);

            objAmp.createdby = Convert.ToInt32(createdby);




            try
            {


                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("updatestatemaster", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("locationid_d", objAmp.locationid);
                cmd.Parameters.AddWithValue("countryid_d", objAmp.countryid);

                cmd.Parameters.AddWithValue("location_name", objAmp.statename);

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
        public string DeleteActivities([FromBody] GetcityEdit obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            GetcityEdit ObjAMR = new GetcityEdit();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("DeletestateRecord", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("locationid_d", obj.locationid);
                cmd.Parameters.AddWithValue("location_name", obj.statename);
                cmd.Parameters.AddWithValue("countryid_d", obj.countryid);

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
    public class bindcountryResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<bindcountry> data { get; set; }
    }
    public class bindcountry
    {

        public string countryname { get; set; }
        public Int32 countryid { get; set; }
    }
   


    public class SavecityResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
    }
    public class Savecity
    {
        public string statename { get; set; }
        public Int32 countryid { get; set; }
        public Int32 locationid { get; set; }
        public Int32 createdby { get; set; }


    }
    public class GetSavedcityResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }

        public List<GetSavedcity> data { get; set; }
    }
    public class GetSavedcity
    {
        public Int32 locationid { get; set; }
        public string country { get; set; }
        public string state { get; set; }

    }
    public class GetlocationId
    {
        public int locationid { get; set; }
    }
    public class GetcityEditResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public GetcityEdit data { get; set; }
    }
    public class GetcityEdit
    {
        public Int32 locationid { get; set; }

        public string statename { get; set; }
        public Int32 countryid { get; set; }


        public Int32 createdby { get; set; }
        public bool Status { get; set; }
        public string Message { get; set; }
    }



    public class ExcellSchoolData_state
    {
        public List<SchoolData_state> schoolDatas { get; set; }
    }
    public class SchoolData_state
    {
        public string country { get; set; }
        public string state { get; set; }
       

    }

}


