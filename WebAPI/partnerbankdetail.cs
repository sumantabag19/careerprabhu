using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace CareerPrabhu.WebAPI
{
    [Route("api/partnerbankdetail")]
    public class partnerbankdetail : Controller
    {
        IConfiguration _iconfiguration;
        public partnerbankdetail(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
        }
        [HttpPost]
        [Route("Savepartnerbankdetail")]
        public string Savepartnerbankdetail([FromForm] string partnerid,
           [FromForm] string accountname, [FromForm] string accountno,
           [FromForm] string ifsccode, [FromForm] string bankname, [FromForm] string branch, [FromForm] string accounttype, [FromForm] string createdby)

        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            saveaccountResponse ObjAMR = new saveaccountResponse();
            saveaccountdata objAmp = new saveaccountdata();

            objAmp.partnerid = Convert.ToInt32(partnerid);
            objAmp.accountname = Convert.ToString(accountname);
            objAmp.accountno = Convert.ToString(accountno);
            objAmp.ifsccode = Convert.ToString(ifsccode);

            objAmp.bankname = Convert.ToString(bankname);
            objAmp.branch = Convert.ToString(branch);
            objAmp.accounttype = Convert.ToInt32(accounttype);
            objAmp.createdby = Convert.ToInt32(createdby);

            try
            {


                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Savepartnerbankdetail", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("partnerid_d", objAmp.partnerid);
                cmd.Parameters.AddWithValue("accountname_d", objAmp.accountname);
                cmd.Parameters.AddWithValue("accountno_d", objAmp.accountno);
                cmd.Parameters.AddWithValue("ifsccode_d", objAmp.ifsccode);
                cmd.Parameters.AddWithValue("bankname_d", objAmp.bankname);
                cmd.Parameters.AddWithValue("branch_d", objAmp.branch);
                cmd.Parameters.AddWithValue("accounttype_d", objAmp.accounttype);

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
        [Route("GetSavedData")]
        public string GetSavedData([FromForm] string createdby)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetSavedPartnerbankResponse ObjGSTDR = new GetSavedPartnerbankResponse();
            List<GetSavedPartnerbankData> ListGSTD = new List<GetSavedPartnerbankData>();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getsavebankpartnerdetaildata", con);
                cmd.Parameters.AddWithValue("createdby_d", createdby);
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
                        GetSavedPartnerbankData ObjGSTD = new GetSavedPartnerbankData();
                        ObjGSTD.partnerid = Convert.ToInt32(row["partnerid"]);
                        ObjGSTD.partnername = Convert.ToString(row["partnername"]);

                        ObjGSTD.accountname = Convert.ToString(row["accountname"]);
                        ObjGSTD.accountno = Convert.ToString(row["accountno"]);
                        ObjGSTD.ifsccode = Convert.ToString(row["ifsccode"]);
                        ObjGSTD.bankname = Convert.ToString(row["bankname"]);
                        ObjGSTD.branch = Convert.ToString(row["branch"]);
                        ObjGSTD.accounttype = Convert.ToString(row["accounttype"]);

                        

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
        public string GetEditedData([FromHeader] GetpartnerId obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetaccountEditResponse ObjGER = new GetaccountEditResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("editaccountdata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("partnerid_D", obj.partnerid);

                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGER.Status = true;
                    ObjGER.Message = "Data Found";
                    GetaccountEditData ObjGED = new GetaccountEditData();
                    ObjGED.partnerid = Convert.ToInt32(ds.Tables[0].Rows[0]["partnerid"]);
                    ObjGED.accountname = Convert.ToString(ds.Tables[0].Rows[0]["accountname"]);
                    ObjGED.accountno = Convert.ToString(ds.Tables[0].Rows[0]["accountno"]);

                    ObjGED.ifsccode = Convert.ToString(ds.Tables[0].Rows[0]["ifsccode"]);
                    ObjGED.bankname = Convert.ToString(ds.Tables[0].Rows[0]["bankname"]);
                    ObjGED.branch = Convert.ToString(ds.Tables[0].Rows[0]["branch"]);

                    ObjGED.accounttype = Convert.ToInt32(ds.Tables[0].Rows[0]["accounttype"]);



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
        [Route("UpdateAccount")]
        public string UpdateAccount([FromForm] string partnerid,
           [FromForm] string accountname, [FromForm] string accountno,
           [FromForm] string ifsccode, [FromForm] string bankname, [FromForm] string branch, [FromForm] string accounttype, [FromForm] string createdby)


        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            saveaccountResponse ObjAMR = new saveaccountResponse();
            saveaccountdata objAmp = new saveaccountdata();

            objAmp.partnerid = Convert.ToInt32(partnerid);
            objAmp.accountname = Convert.ToString(accountname);
            objAmp.accountno = Convert.ToString(accountno);
            objAmp.ifsccode = Convert.ToString(ifsccode);

            objAmp.bankname = Convert.ToString(bankname);
            objAmp.branch = Convert.ToString(branch);
            objAmp.accounttype = Convert.ToInt32(accounttype);
            objAmp.createdby = Convert.ToInt32(createdby);
           

            try
            {


                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Updatebankaccount", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("partnerid_d", objAmp.partnerid);
                cmd.Parameters.AddWithValue("accountname_d", objAmp.accountname);
                cmd.Parameters.AddWithValue("accountno_d", objAmp.accountno);
                cmd.Parameters.AddWithValue("ifsccode_d", objAmp.ifsccode);
                cmd.Parameters.AddWithValue("bankname_d", objAmp.bankname);
                cmd.Parameters.AddWithValue("branch_d", objAmp.branch);
                cmd.Parameters.AddWithValue("accounttype_d", objAmp.accounttype);

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
        public string DeleteActivities([FromBody] GetaccountEditData obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            GetaccountEditData ObjAMR = new GetaccountEditData();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("DeleteaccountRecord", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("partnerid_d", obj.partnerid);

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

        public class saveaccountResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
        }
        public class saveaccountdata
        {
            public Int32 partnerid { get; set; }
          
            public string accountname { get; set; }

            public string accountno { get; set; }

            public string ifsccode { get; set; }
            public string bankname { get; set; }
            public string branch { get; set; }
            public Int32 accounttype { get; set; }
            public Int32 createdby { get; set; }


        }
        public class GetSavedPartnerbankResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }

            public List<GetSavedPartnerbankData> data { get; set; }
        }
        public class GetSavedPartnerbankData
        {
            public Int32 partnerid { get; set; }
            public string partnername { get; set; }

            public string accountname { get; set; }

            public string accountno { get; set; }

            public string ifsccode { get; set; }
            public string bankname { get; set; }
            public string branch { get; set; }
            public string accounttype { get; set; }
        }
        public class GetpartnerId
        {
            public int partnerid { get; set; }
        }
        public class GetaccountEditResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public GetaccountEditData data { get; set; }
        }
        public class GetaccountEditData
        {
            public Int32 partnerid { get; set; }

            public string accountname { get; set; }

            public string accountno { get; set; }

            public string ifsccode { get; set; }
            public string bankname { get; set; }
            public string branch { get; set; }
            public Int32 accounttype { get; set; }
            public Int32 createdby { get; set; }
            public bool Status { get; set; }
            public string Message { get; set; }
        }

    }
}
