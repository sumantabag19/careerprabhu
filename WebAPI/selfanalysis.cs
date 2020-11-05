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
    [Route("api/selfanalysis")]
    public class selfanalysis : Controller
    {
        IConfiguration _iconfiguration;
        public selfanalysis(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
        }
        [HttpPost]
        [Route("Bindclass")]
        public string Bindclass()
        {
            GetClassResponses GSR = new GetClassResponses();
            List<GetClassesData> ListGSD = new List<GetClassesData>();
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
                    GSR.Status = true;
                    GSR.Message = "Data Found";
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        GetClassesData GSD = new GetClassesData();
                        GSD.classid = Convert.ToInt32(row["class_id"]);
                        GSD.classname = Convert.ToString(row["class_name"]);
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
        [Route("BindStream")]
        public string BindStream()
        {
            GetStreamResponses GSR = new GetStreamResponses();
            List<GetStreamData> ListGSD = new List<GetStreamData>();
            string json = "";
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
                    GSR.Status = true;
                    GSR.Message = "Data Found";
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        GetStreamData GSD = new GetStreamData();
                        GSD.streamid = Convert.ToInt32(row["Stream_Id"]);
                        GSD.streamname = Convert.ToString(row["Stream_Name"]);
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
        [Route("Saveselfanalysis")]
        public string Saveselfanalysis([FromForm] string analysisid,
           [FromForm] string classid, [FromForm] string streamid,
           [FromForm] string description, [FromForm] string instruction, [FromForm] string createdby)

        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            selfanalysisResponse ObjAMR = new selfanalysisResponse();
            selfanalysisdata objAmp = new selfanalysisdata();

            objAmp.analysisid = Convert.ToInt32(analysisid);
            objAmp.classid = Convert.ToInt32(classid);
            objAmp.streamid = Convert.ToInt32(streamid);
            objAmp.description = Convert.ToString(description);
            objAmp.instruction = Convert.ToString(instruction);

            objAmp.createdby = Convert.ToInt32(createdby);

            try
            {


                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Saveselfanalysis", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("analysisid_d", objAmp.analysisid);
                cmd.Parameters.AddWithValue("classid_d", objAmp.classid);
                cmd.Parameters.AddWithValue("streamid_d", objAmp.streamid);
                cmd.Parameters.AddWithValue("description_d", objAmp.description);
                cmd.Parameters.AddWithValue("instruction_d", objAmp.instruction);

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
            GetSavedselfanalysisResponse ObjGSTDR = new GetSavedselfanalysisResponse();
            List<GetSavedselfanalysisData> ListGSTD = new List<GetSavedselfanalysisData>();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getsaveselfanalysisdata", con);
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
                        GetSavedselfanalysisData ObjGSTD = new GetSavedselfanalysisData();
                        ObjGSTD.analysisid = Convert.ToInt32(row["analysisid"]);
                        ObjGSTD.classes = Convert.ToString(row["classname"]);
                        //ObjGSTD.stream = Convert.ToString(row["streamname"]);
                        ObjGSTD.description = Convert.ToString(row["description"]);
                        ObjGSTD.instruction = Convert.ToString(row["instruction"]);



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
        public string GetEditedData([FromHeader] GetanalysisId obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetanalysisEditResponse ObjGER = new GetanalysisEditResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("editanalysisdata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("analysisid_D", obj.analysisid);

                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGER.Status = true;
                    ObjGER.Message = "Data Found";
                    GetanalysisEditData ObjGED = new GetanalysisEditData();
                    ObjGED.analysisid = Convert.ToInt32(ds.Tables[0].Rows[0]["analysisid"]);
                    ObjGED.classid = Convert.ToInt32(ds.Tables[0].Rows[0]["classid"]);
                    ObjGED.streamid = Convert.ToInt32(ds.Tables[0].Rows[0]["streamid"]);

                     ObjGED.description = Convert.ToString(ds.Tables[0].Rows[0]["description"]);
                    ObjGED.instruction = Convert.ToString(ds.Tables[0].Rows[0]["instruction"]);

                    

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
        [Route("UpdateAnalysis")]
        public string UpdateAnalysis([FromForm] string analysisid,
           [FromForm] string classid, [FromForm] string streamid,
           [FromForm] string description, [FromForm] string instruction, [FromForm] string createdby)


        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            selfanalysisResponse ObjAMR = new selfanalysisResponse();
            selfanalysisdata objAmp = new selfanalysisdata();

            objAmp.analysisid = Convert.ToInt32(analysisid);
            objAmp.classid = Convert.ToInt32(classid);
            objAmp.streamid = Convert.ToInt32(streamid);
            objAmp.description = Convert.ToString(description);
            objAmp.instruction = Convert.ToString(instruction);

            objAmp.createdby = Convert.ToInt32(createdby);

            try
            {


                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("UpdateanalysisData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("analysisid_d", objAmp.analysisid);
                cmd.Parameters.AddWithValue("classid_d", objAmp.classid);
                cmd.Parameters.AddWithValue("streamid_d", objAmp.streamid);
                cmd.Parameters.AddWithValue("description_d", objAmp.description);
                cmd.Parameters.AddWithValue("instruction_d", objAmp.instruction);

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
        public string DeleteActivities([FromBody] GetanalysisEditData obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            GetanalysisEditData ObjAMR = new GetanalysisEditData();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("DeleteanalysisRecord", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("analysisid_d", obj.analysisid);

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





        public class GetClassResponses
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public List<GetClassesData> data { get; set; }
        }
        public class GetClassesData
        {

            public string classname { get; set; }
            public Int32 classid { get; set; }
        }
        public class GetStreamResponses
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public List<GetStreamData> data { get; set; }
        }
        public class GetStreamData
        {

            public Int32 streamid { get; set; }
            public string streamname { get; set; }

        }
        public class selfanalysisResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
        }
        public class selfanalysisdata
        {
            public Int32 analysisid { get; set; }
            public Int32 classid { get; set; }
            public Int32 streamid { get; set; }

            public string description { get; set; }

            public string instruction { get; set; }


            public Int32 createdby { get; set; }


        }
        public class GetSavedselfanalysisResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }

            public List<GetSavedselfanalysisData> data { get; set; }
        }
        public class GetSavedselfanalysisData
        {
            public Int32 analysisid { get; set; }

            public string classes { get; set; }
            public string stream { get; set; } = "";
            public string description { get; set; }
            public string instruction { get; set; }

        }
        public class GetanalysisId
        {
            public int analysisid { get; set; }
        }
        public class GetanalysisEditResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public GetanalysisEditData data { get; set; }
        }
        public class GetanalysisEditData
        {
            public Int32 analysisid { get; set; }
            public Int32 classid { get; set; }
            public Int32 streamid { get; set; }

            public string description { get; set; }

            public string instruction { get; set; }
            public Int32 createdby { get; set; }
            public bool Status { get; set; }
            public string Message { get; set; }
        }

    }
}
