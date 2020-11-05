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
    [Route("api/boards")]
    public class boards : Controller
    {
        IConfiguration _iconfiguration;
        public boards(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
        }
       
        [HttpPost]
        [Route("SaveBoards")]
        public string SaveBoards([FromForm] string boardid,
             [FromForm] string boardname, [FromForm] string createdby)

        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            BoardsResponse ObjAMR = new BoardsResponse();
            Boardsdata objAmp = new Boardsdata();

            objAmp.boardid = Convert.ToInt32(boardid);
            objAmp.boardname = Convert.ToString(boardname);

            objAmp.createdby = Convert.ToInt32(createdby);

            try
            {


                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Saveboards", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("boardid_d", objAmp.boardid);
                cmd.Parameters.AddWithValue("boardname_d", objAmp.boardname);

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
            GetSavedboardsResponse ObjGSTDR = new GetSavedboardsResponse();
            List<GetSavedboardsData> ListGSTD = new List<GetSavedboardsData>();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getsaveboardsdata", con);
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
                        GetSavedboardsData ObjGSTD = new GetSavedboardsData();
                        ObjGSTD.boardid = Convert.ToInt32(row["boardid"]);
                        ObjGSTD.boardname = Convert.ToString(row["boardname"]);
                        
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
        public string GetEditedData([FromHeader] Getboardid obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetboardEditResponse ObjGER = new GetboardEditResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("editboardsdata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("boardid_D", obj.boardid);

                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGER.Status = true;
                    ObjGER.Message = "Data Found";
                    GetboardEditData ObjGED = new GetboardEditData();
                    ObjGED.boardid = Convert.ToInt32(ds.Tables[0].Rows[0]["boardid"]);
                   
                    ObjGED.boardname = Convert.ToString(ds.Tables[0].Rows[0]["boardname"]);



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
        [Route("UpdateBoards")]
        public string UpdateBoards([FromForm] string boardid,
           [FromForm] string boardname, [FromForm] string createdby)


        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            BoardsResponse ObjAMR = new BoardsResponse();
            Boardsdata objAmp = new Boardsdata();

            objAmp.boardid = Convert.ToInt32(boardid);
            objAmp.boardname = Convert.ToString(boardname);

            objAmp.createdby = Convert.ToInt32(createdby);


            try
            {


                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("UpdateboardsData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("boardid_d", objAmp.boardid);
                cmd.Parameters.AddWithValue("boardname_d", objAmp.boardname);


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
        public string DeleteActivities([FromBody] GetboardEditData obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            GetboardEditData ObjAMR = new GetboardEditData();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("DeleteboardRecord", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("boardid_d", obj.boardid);

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





 
        public class BoardsResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
        }
        public class Boardsdata
        {
            public Int32 boardid { get; set; }
            
            public string boardname { get; set; }


            public Int32 createdby { get; set; }


        }
        public class GetSavedboardsResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }

            public List<GetSavedboardsData> data { get; set; }
        }
        public class GetSavedboardsData
        {
            public Int32 boardid { get; set; }

            public string boardname { get; set; }


        }
        public class Getboardid
        {
            public int boardid { get; set; }
        }
        public class GetboardEditResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public GetboardEditData data { get; set; }
        }
        public class GetboardEditData
        {
            public Int32 boardid { get; set; }
            
            public string boardname { get; set; }
            public Int32 createdby { get; set; }
            public bool Status { get; set; }
            public string Message { get; set; }
        }

    }
}

