using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CareerPrabhu.WebAPI
{
    [Route("api/samplesop")]
    public class samplesop : Controller
    {
        IConfiguration _iconfiguration;
        private IHostingEnvironment _hostingEnvironment;
        public samplesop(IConfiguration iconfiguration, IHostingEnvironment hosting)
        {
            _iconfiguration = iconfiguration;
            _hostingEnvironment = hosting;
        }

        //API for bind intrest area
       
        [HttpGet]
        [Route("BindSopIntrest")]
        public string BindSopIntrest()
        {
            BindIntrestResponse GIAR = new BindIntrestResponse();
            List<BindIntrestData> ListGIAD = new List<BindIntrestData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindSopIntrest", con);
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
                        BindIntrestData GIAD = new BindIntrestData();
                        GIAD.intrestid = Convert.ToInt32(row["intrestid"]);
                        GIAD.intrestname = Convert.ToString(row["intrestname"]);
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

        //Api for save sample sop
        [HttpPost]
        [Route("SaveSampleSopData")]
        public string SaveSampleSopData([FromForm] string samplesopid,
      [FromForm] string intrestid, [FromForm] string title, [FromForm] string description, string createdby)

        {
            string json = "";
            string result = "";
            int maxid = 0;
            string qry = "";

            DataSet ds = new DataSet();
            DataSet ds1 = new DataSet();
            SampleSopResponse objppfr = new SampleSopResponse();
            SampleSopParam objppfp = new SampleSopParam();

            objppfp.samplesopid = Convert.ToInt32(samplesopid);
            objppfp.intrestid = Convert.ToString(intrestid);
            objppfp.title = Convert.ToString(title);
            objppfp.description = Convert.ToString(description);

            objppfp.createdby = Convert.ToInt32(createdby);
        

            char[] spearator = { ',', ' ' };


            string[] intrestlist = objppfp.intrestid.Split(spearator,
               StringSplitOptions.RemoveEmptyEntries);
       
            try
            {
                

                // objppfp.newpdfname = prevpdfguid;

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("savesamplesopdata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("samplesopid_d", objppfp.samplesopid);
                cmd.Parameters.AddWithValue("intrestid_d", objppfp.intrestid);
                cmd.Parameters.AddWithValue("title_d", objppfp.title);
                cmd.Parameters.AddWithValue("description_d", objppfp.description);
                

                cmd.Parameters.AddWithValue("created_by", objppfp.createdby);
                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();


                //save data in other table start

                try
                {
                    if (intrestlist.Length > 0)
                    {

                        qry = "SELECT MAX(samplesopid) as samplesop_id FROM tbl_samplesop";

                        MySqlCommand cmd1 = new MySqlCommand(qry, con);

                        MySqlDataAdapter da1 = new MySqlDataAdapter();
                        da1.SelectCommand = cmd1;
                        da1.Fill(ds1);
                        con.Close();
                        if (ds1.Tables[0].Rows.Count > 0)
                        {
                            maxid = Convert.ToInt32(ds1.Tables[0].Rows[0]["samplesop_id"]);
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


                if (intrestlist.Length > 0)
                {
                    Execqry("delete from tbl_samplesopintrest where samplesopid=" + maxid);
                    for (int i = 0; i < intrestlist.Length; i++)
                    {

                        Execqry("insert into tbl_samplesopintrest(samplesopid,intrestid)values(" + maxid + ", " + Convert.ToInt32(intrestlist[i]) + ")");
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
            return json;

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

        //API for get data for bind
        [HttpGet]
        [Route("BindSampleSopData")]
        public string BindSampleSopData()
        {
            string json = "";
            DataSet ds = new DataSet();
            GetSavedSampleSopResponse ObjGSPDR = new GetSavedSampleSopResponse();
            List<GetSavedSampleSopData> ListGSPD = new List<GetSavedSampleSopData>();

            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("GetSampleSopData", con);
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
                        GetSavedSampleSopData ObjGSPD = new GetSavedSampleSopData();

                        ObjGSPD.samplesopid = Convert.ToInt32(row["samplesopid"]);
                        
                        ObjGSPD.intrestname = Convert.ToString(row["intrestid"]);
                        ObjGSPD.title = Convert.ToString(row["title"]);
                        ObjGSPD.description = Convert.ToString(row["description"]);
                       

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

        //Api for edit data
        [HttpGet]
        [Route("EditSampleSop")]
        public string EditSampleSop([FromHeader] EditSampleSopData data)
        {
            DataSet ds = new DataSet();
            EditSampleSopDataResponse edr = new EditSampleSopDataResponse();
            List<SampleSopEditData> sd = new List<SampleSopEditData>();
            string json = "";
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("EditSampleSop", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("samplesopid_d", data.samplesopid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();

                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        SampleSopEditData sed = new SampleSopEditData();
                        sed.samplesopid = Convert.ToInt32(row["samplesopid"]);
                        sed.intrestid = row["intrestid"].ToString();
                        
                        sed.title = row["title"].ToString();
                        sed.description = row["description"].ToString();
                  


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

        //API for update sample sop
        [HttpPost]
        [Route("UpdateSampleSopData")]
        public string UpdateSampleSopData([FromForm] string samplesopid,
      [FromForm] string intrestid, [FromForm] string title, [FromForm] string description, string createdby)

        {
            string json = "";
            string result = "";
            int maxid = 0;
            string qry = "";

            DataSet ds = new DataSet();
            DataSet ds1 = new DataSet();
            SampleSopResponse objppfr = new SampleSopResponse();
            SampleSopParam objppfp = new SampleSopParam();

            objppfp.samplesopid = Convert.ToInt32(samplesopid);
            objppfp.intrestid = Convert.ToString(intrestid);
            objppfp.title = Convert.ToString(title);
            objppfp.description = Convert.ToString(description);

            objppfp.createdby = Convert.ToInt32(createdby);


            char[] spearator = { ',', ' ' };


            string[] intrestlist = objppfp.intrestid.Split(spearator,
               StringSplitOptions.RemoveEmptyEntries);

            try
            {


                // objppfp.newpdfname = prevpdfguid;

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("UpdateSampleSop", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("samplesopid_d", objppfp.samplesopid);
                cmd.Parameters.AddWithValue("intrestid_d", objppfp.intrestid);
                cmd.Parameters.AddWithValue("title_d", objppfp.title);
                cmd.Parameters.AddWithValue("description_d", objppfp.description);


                cmd.Parameters.AddWithValue("created_by", objppfp.createdby);
                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();


                


                if (intrestlist.Length > 0)
                {
                    Execqry("delete from tbl_samplesopintrest where samplesopid=" + objppfp.samplesopid);
                    for (int i = 0; i < intrestlist.Length; i++)
                    {

                        Execqry("insert into tbl_samplesopintrest(samplesopid,intrestid)values(" + objppfp.samplesopid + ", " + Convert.ToInt32(intrestlist[i]) + ")");
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
            return json;

        }

        //API for delete samplesop data
        [HttpPost]
        [Route("DeleteSampleSopData")]
        public string DeleteSampleSopData([FromBody] DeleteSampleSopParam obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            DeleteSampleSopParam ObjAMR = new DeleteSampleSopParam();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("DeleteSampleSopData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("samplesopid_d", obj.samplesopid);


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
    //class for bind intrest area for multi checkbox
    public class BindIntrestResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<BindIntrestData> data { get; set; }
    }
    public class BindIntrestData
    {
        public Int32 intrestid { get; set; }
        public string intrestname { get; set; }
    }

    //class for save
    public class SampleSopResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
    }
    public class SampleSopParam
    {

        public Int32 samplesopid { get; set; } = 0;

        public string title { get; set; } = "";
        public string description { get; set; } = "";

        public string intrestid { get; set; } = "";
     


        public Int32 createdby { get; set; }
        public string message { get; set; } = "";


    }

    //class for get data for display
    public class GetSavedSampleSopResponse
    {
        public bool Statue { get; set; }
        public string Message { get; set; }

        public List<GetSavedSampleSopData> data { get; set; }

    }
    public class GetSavedSampleSopData
    {
        public Int32 samplesopid { get; set; } = 0;

        public string intrestid { get; set; } = "";
        public string intrestname { get; set; } = "";
        public string title { get; set; } = "";
        public string description { get; set; } = "";
      


    }

    //class for edit data
    public class EditSampleSopData
    {
        public int samplesopid { get; set; }
    }
    public class EditSampleSopDataResponse
    {
        public bool Status { get; set; } = false;
        public string Message { get; set; } = "";
        public List<SampleSopEditData> data { get; set; }
    }
    public class SampleSopEditData
    {
        public int samplesopid { get; set; }
        public string intrestid { get; set; }
        public string intrestname { get; set; }
        public string title { get; set; }
        public string description { get; set; }



      
    }

    //delete samplesop data
    public class DeleteSampleSopParam
    {
        public bool Status { get; set; } = false;
        public string Message { get; set; } = "";
        public Int32 samplesopid { get; set; }
    }

}
