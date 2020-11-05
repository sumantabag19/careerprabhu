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
    [Route("api/resetpassword")]
    public class resetpassword : Controller
    {
        IConfiguration _iconfiguration;
        public resetpassword(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
        }

        [HttpPost]
        [Route("Updatepassword")]
        public string Updatepassword([FromForm] string confirmpassword, [FromForm] string currentpwd,
             [FromForm] string createdby)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            UpdatepasswordResponse ObjAMR = new UpdatepasswordResponse();
            UpdatePasswordData objAmp = new UpdatePasswordData();


            objAmp.confirmpassword = Convert.ToString(confirmpassword);


            objAmp.createdby = Convert.ToInt32(createdby);


            try
            {


                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("UpdatePasswordData_New", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
      

              
                cmd.Parameters.AddWithValue("currentpassword_d", objAmp.confirmpassword);
                cmd.Parameters.AddWithValue("checkpwd", currentpwd);
                cmd.Parameters.AddWithValue("created_by", objAmp.createdby);
                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();
                con.Close();

                if(result== "Successfully Updated")
                {
                    ObjAMR.Status = true;
                    ObjAMR.Message = result;
                }
                else
                {

                    ObjAMR.Status = false;
                    ObjAMR.Message = result;
                }


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
        public class UpdatepasswordResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
        }
        public class UpdatePasswordData
        {
            public string confirmpassword { get; set; }
            
            public Int32 createdby { get; set; }


        }
    }
}
