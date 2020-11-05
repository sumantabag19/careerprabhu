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
    [Route("api/EntranceExam")]
    public class EntranceExam : Controller
    {
        private IHostingEnvironment _hostingEnvironment;
        IConfiguration _iconfiguration;
        public EntranceExam(IConfiguration iconfiguration, IHostingEnvironment hosting)
        {
            _iconfiguration = iconfiguration;
            _hostingEnvironment = hosting;
        }

        //Api for bind stream
        [HttpGet]
        [Route("GetStream")]
        public string GetStream()
        {
            string json = "";
            GetEntranceStreamResponse ObjGSR = new GetEntranceStreamResponse();
            List<GetStreamsDataEntrance> ListGSD = new List<GetStreamsDataEntrance>();
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("WebinarManager_GetStream", con);
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
                        GetStreamsDataEntrance GSD = new GetStreamsDataEntrance();
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

        //API for save exam detail
        [HttpPost]
        [Route("SaveExam")]
        public string SaveExam([FromForm] string examid,
            [FromForm] string startdate, [FromForm] string streamid, [FromForm] string examname, [FromForm] string createdby)
        {
            string json = "";
            string result = "";
            string qry = "";
            int maxid = 0;
            DataSet ds = new DataSet();
            DataSet ds1 = new DataSet();
            SaveExamResponse objss = new SaveExamResponse();
            char[] spearator = { ',', ' ' };
            string[] streamlist = streamid.Split(spearator,
               StringSplitOptions.RemoveEmptyEntries);
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("saveentranceexam", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("examid_id", Convert.ToInt32(examid));
                cmd.Parameters.AddWithValue("startdate_d", startdate);
                cmd.Parameters.AddWithValue("streamid_d", streamid);
                cmd.Parameters.AddWithValue("examname_d", examname);
                cmd.Parameters.AddWithValue("created_by", createdby);
                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();
                try
                {
                    if (streamlist.Length > 0)
                    {

                        qry = "SELECT MAX(examid) as exam_id FROM tbl_entranceexam";

                        MySqlCommand cmd1 = new MySqlCommand(qry, con);

                        MySqlDataAdapter da1 = new MySqlDataAdapter();
                        da1.SelectCommand = cmd1;
                        da1.Fill(ds1);
                        con.Close();
                        if (ds1.Tables[0].Rows.Count > 0)
                        {
                            maxid = Convert.ToInt32(ds1.Tables[0].Rows[0]["exam_id"]);
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

                if (streamlist.Length > 0)
                {
                    Execqry("delete from tbl_entrancecareer where examid=" + maxid);
                    for (int i = 0; i < streamlist.Length; i++)
                    {

                        Execqry("insert into tbl_entrancecareer(examid,streamid)values(" + maxid + ", " + Convert.ToInt32(streamlist[i]) + ")");
                    }

                }

                con.Close();
                objss.Status = true;
                objss.Message = result;
            }
            catch (Exception e)
            {
                objss.Status = false;
                objss.Message = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(objss, settings);
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



        //Bind table data 
        [HttpGet]
        [Route("GetSavedData")]
        public string GetSavedActivityData()
        {
            string json = "";
            DataSet ds = new DataSet();
            GetExamResponse ObjGSTDR = new GetExamResponse();
            List<GetSavedExamData> ListGSTD = new List<GetSavedExamData>();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("GetSavedExamData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGSTDR.Statue = true;
                    ObjGSTDR.Message = "Data Found";
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        GetSavedExamData ObjGSTD = new GetSavedExamData();
                        ObjGSTD.examid = Convert.ToInt32(row["examid"]);                        
                        ObjGSTD.startdate = Convert.ToString(row["startdate"]);
                        ObjGSTD.streamid = Convert.ToString(row["streamid"]);
                        ObjGSTD.examname = Convert.ToString(row["examname"]);
                       
                        ListGSTD.Add(ObjGSTD);
                    }
                    ObjGSTDR.data = ListGSTD;
                }
                else
                {
                    ObjGSTDR.Statue = false;
                    ObjGSTDR.Message = "Something went wrong";
                }
            }
            catch (Exception e)
            {
                ObjGSTDR.Statue = false;
                ObjGSTDR.Message = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(ObjGSTDR, settings);
            return json;
        }


        //API for edit data
        [HttpGet]
        [Route("GetEditData")]
        public string GetEditedData([FromHeader] GetExamid obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetExamEditResponse ObjGER = new GetExamEditResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("EditExamData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("examid_d", obj.examid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGER.Status = true;
                    ObjGER.Message = "Data Found";
                    GetExamEditData ObjGED = new GetExamEditData();
                    ObjGED.examid = Convert.ToInt32(ds.Tables[0].Rows[0]["examid"]);
                    ObjGED.startdate = Convert.ToString(ds.Tables[0].Rows[0]["startdate"]);
                    ObjGED.examname = Convert.ToString(ds.Tables[0].Rows[0]["examname"]);
                    ObjGED.streamId = Convert.ToString(ds.Tables[0].Rows[0]["streamid"]);
                  
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


        //API for update entrance exam data
        [HttpPost]
        [Route("UpdateExam")]
        public string UpdateExam([FromForm] string examid,
            [FromForm] string startdate, [FromForm] string streamid, [FromForm] string examname, [FromForm] string createdby)
        {
            string json = "";
            string result = "";
            string qry = "";
            int maxid = 0;
            DataSet ds = new DataSet();
            DataSet ds1 = new DataSet();
            SaveExamResponse objss = new SaveExamResponse();
            char[] spearator = { ',', ' ' };
            string[] streamlist = streamid.Split(spearator,
               StringSplitOptions.RemoveEmptyEntries);
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("updateentranceexam", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("examid_id", Convert.ToInt32(examid));
                cmd.Parameters.AddWithValue("startdate_d", startdate);
                cmd.Parameters.AddWithValue("streamid_d", streamid);
                cmd.Parameters.AddWithValue("examname_d", examname);
                cmd.Parameters.AddWithValue("created_by", createdby);
                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();
              

                if (streamlist.Length > 0)
                {
                    Execqry("delete from tbl_entrancecareer where examid=" + Convert.ToInt32(examid));
                    for (int i = 0; i < streamlist.Length; i++)
                    {

                        Execqry("insert into tbl_entrancecareer(examid,streamid)values(" + Convert.ToInt32(examid) + ", " + Convert.ToInt32(streamlist[i]) + ")");
                    }

                }

                con.Close();
                objss.Status = true;
                objss.Message = result;
            }
            catch (Exception e)
            {
                objss.Status = false;
                objss.Message = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(objss, settings);
            return json;
        }

        //API for delete eam data[HttpPost]
        [Route("DeleteActivity")]
        public string DeleteActivities([FromBody] GetExamDeleteResponse obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            GetExamDeleteResponse ObjAMR = new GetExamDeleteResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("DeleteEntranceExamDetail", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("examid_id", obj.examid);
   
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
    public class GetEntranceStreamResponse
    {
        public bool status { get; set; } = false;
        public string message { get; set; } = "";
        public List<GetStreamsDataEntrance> data { get; set; }
    }
    public class GetStreamsDataEntrance
    {
        public Int32 streamid { get; set; }
        public string streamname { get; set; }
    }
    public class SaveExamResponse
    {
        public string Message { get; set; } = "";
        public Boolean Status { get; set; }
    }
    public class GetExamData
    {
        public Int32 examid { get; set; } 
        public string startdate { get; set; }
        public string streamid { get; set; }
        public string examname { get; set; }
    }
    public class GetExamResponse
    {
        public bool Statue { get; set; }
        public string Message { get; set; }

        public List<GetSavedExamData> data { get; set; }
    }
    public class GetSavedExamData
    {
        public Int32 examid { get; set; }
        public string startdate { get; set; }
        public string streamid { get; set; }
        public string examname { get; set; }

    }
    public class GetExamid
    {
        public Int32 examid { get; set; }
    }

    public class GetExamEditResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public GetExamEditData data { get; set; }
    }
    public class GetExamEditData
    {
        public Int32 examid { get; set; }
        public string startdate { get; set; }
        public string examname { get; set; }
        public string streamId { get; set; }
       
    }
    public class GetExamDeleteResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public int examid { get; set; }
    }
}
