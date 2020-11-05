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
    [Route("api/placement")]
    public class placement : Controller
    {
        IConfiguration _iconfiguration;
        public placement(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
        }




        [HttpPost]
        [Route("Upload")]
        public string Upload([FromBody]ExcellSchoolData_placement obj)
        {
            AddGroupClass_placement ObjClass = new AddGroupClass_placement();
            ExcellSchoolData_placement nxt = new ExcellSchoolData_placement();
            List<SchoolData_placement> lst = new List<SchoolData_placement>();
            string json = "";
            try
            {


                if (obj.schoolDatas.Count > 0)
                {
                    SchoolData_placement tst = new SchoolData_placement();


                    for (int i = 0; i < obj.schoolDatas.Count; i++)
                    {
                        
                        int streamid = Return_Int("select stream_id from tbl_streammaster where stream_name= '" + Convert.ToString(obj.schoolDatas[i].stream) + "'");
                        int stateid = Return_Int("select state_id from tbl_states where state_name='" + Convert.ToString(obj.schoolDatas[i].state) + "'");
                        int cityid = Return_Int("select city_id from tbl_cities where city_name='" + Convert.ToString(obj.schoolDatas[i].city) + "'");
                        int acaid = Return_Int("select academicid from tbl_academinyear where academicyear='" + Convert.ToString(obj.schoolDatas[i].academicyear) + "'");
                       



                        Execqry("insert into tbl_addplacedstudent(stateid,cityid,yearid,streamid,studentname,mobileno,fathername,university,college,course,specialization)values" +
                            "(" + Convert.ToInt32(stateid) + "," + Convert.ToInt32(cityid) + "," + Convert.ToInt32(acaid) + "," + Convert.ToInt32(streamid) + ",'" + Convert.ToString(obj.schoolDatas[i].studentname) + "','" + Convert.ToString(obj.schoolDatas[i].mobileno) + "','" + Convert.ToString(obj.schoolDatas[i].fathername) + "','"+ Convert.ToString(obj.schoolDatas[i].university) + "','"+ Convert.ToString(obj.schoolDatas[i].college) + "','"+ Convert.ToString(obj.schoolDatas[i].course) + "','"+ Convert.ToString(obj.schoolDatas[i].specialization) + "')");




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
        [Route("Bindstate")]
        public string Bindstate()
        {
            GetStuStateResponse GSR = new GetStuStateResponse();
            List<GetStuStateData> ListGSD = new List<GetStuStateData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindState", con);
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
                        GetStuStateData GSD = new GetStuStateData();
                        GSD.stateid = Convert.ToInt32(row["state_id"]);
                        GSD.state = Convert.ToString(row["state_name"]);
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
        [Route("BindCity")]
        public string BindCity([FromBody] GetStuCityData data)
        {
            GetStuCityResponse GSR = new GetStuCityResponse();
            List<GetStuCityData> ListGSD = new List<GetStuCityData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindCity", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("stateid", data.stateid);
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
                        GetStuCityData GSD = new GetStuCityData();
                        GSD.cityname = Convert.ToString(row["city_name"]);
                        GSD.cityid = Convert.ToInt32(row["city_id"]);
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


        //[HttpPost]
        //[Route("BindSchool")]
        //public string BindSchool([FromBody] GetStuSchoolData data)
        //{
        //    GetStuSchoolResponse GSR = new GetStuSchoolResponse();
        //    List<GetStuSchoolData> ListGSD = new List<GetStuSchoolData>();
        //    string json = "";
        //    DataSet ds = new DataSet();
        //    try
        //    {
        //        MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
        //        MySqlCommand cmd = new MySqlCommand("BindSchool", con);
        //        cmd.CommandType = CommandType.StoredProcedure;

        //        cmd.Parameters.AddWithValue("stateid", data.stateid);
        //        cmd.Parameters.AddWithValue("cityid", data.cityid);
        //        con.Open();
        //        MySqlDataAdapter da = new MySqlDataAdapter();
        //        da.SelectCommand = cmd;
        //        da.Fill(ds);
        //        con.Close();
        //        if (ds.Tables[0].Rows.Count > 0)
        //        {
        //            GSR.Status = true;
        //            GSR.Message = "Data Found";
        //            foreach (DataRow row in ds.Tables[0].Rows)
        //            {
        //                GetStuSchoolData GSD = new GetStuSchoolData();
        //                GSD.schoolname = Convert.ToString(row["school_name"]);
        //                GSD.schoolid = Convert.ToInt32(row["school_id"]);
        //                ListGSD.Add(GSD);
        //            }
        //            GSR.data = ListGSD;
        //        }
        //        else
        //        {
        //            GSR.Status = false;
        //            GSR.Message = "Something went wrong";
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        GSR.Status = false;
        //        GSR.Message = e.Message;
        //    }
        //    JsonSerializerSettings settings = new JsonSerializerSettings();
        //    settings.NullValueHandling = NullValueHandling.Ignore;
        //    json = JsonConvert.SerializeObject(GSR, settings);
        //    return json;
        //}

        [HttpPost]
        [Route("BindStream")]
        public string BindStream()
        {
            GetStuStreamResponse GSR = new GetStuStreamResponse();
            List<GetStuStreamData> ListGSD = new List<GetStuStreamData>();
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
                        GetStuStreamData GSD = new GetStuStreamData();
                        GSD.streamid = Convert.ToInt32(row["Stream_id"]);
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
        [Route("BindYear")]
        public string BindYear()
        {
            GetStuAcaResponse GSR = new GetStuAcaResponse();
            List<GetStuAcaData> ListGSD = new List<GetStuAcaData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindAcademicYear", con);
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
                        GetStuAcaData GSD = new GetStuAcaData();
                        GSD.academicid = Convert.ToInt32(row["academicid"]);
                        GSD.academicyear = Convert.ToString(row["academicyear"]);
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
        [Route("SavePlacement")]
        public string SavePlacement([FromForm] string placedid,
           [FromForm] string stateid, [FromForm] string cityid, [FromForm] string streamid,
           [FromForm] string yearid, [FromForm] string studentname, [FromForm] string mobileno, [FromForm] string fathername,
           [FromForm] string university, [FromForm] string collegename, [FromForm] string course, [FromForm] string specialization, [FromForm] string createdby)

        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            PlacementManagerResponse ObjAMR = new PlacementManagerResponse();
            PlacementManagerParam objAmp = new PlacementManagerParam();

            objAmp.placedid = Convert.ToInt32(placedid);
            objAmp.stateid = Convert.ToInt32(stateid);
            objAmp.cityid = Convert.ToInt32(cityid);
            //objAmp.schoolid = Convert.ToInt32(schoolid);
            objAmp.yearid = Convert.ToInt32(yearid);
            objAmp.streamid = Convert.ToInt32(streamid);
            objAmp.studentname = Convert.ToString(studentname);
            objAmp.mobileno = Convert.ToString(mobileno);

            objAmp.fathername = Convert.ToString(fathername);
            objAmp.university = Convert.ToString(university);

            objAmp.college = Convert.ToString(collegename);
            objAmp.course = Convert.ToString(course);
            objAmp.specialization = Convert.ToString(specialization);
            objAmp.createdby = Convert.ToInt32(createdby);

            try
            {


                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("SavePlacementData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("placedid_d", objAmp.placedid);
                cmd.Parameters.AddWithValue("stateid_d", objAmp.stateid);
                cmd.Parameters.AddWithValue("cityid_d", objAmp.cityid);
                cmd.Parameters.AddWithValue("streamid_d", objAmp.streamid);
                //cmd.Parameters.AddWithValue("schoolid_d", objAmp.schoolid);
                cmd.Parameters.AddWithValue("yearid_d", objAmp.yearid);
                cmd.Parameters.AddWithValue("studentname_d", objAmp.studentname);
                cmd.Parameters.AddWithValue("mobileno_d", objAmp.mobileno);

                cmd.Parameters.AddWithValue("fathername_d", objAmp.fathername);
                cmd.Parameters.AddWithValue("university_d", objAmp.university);
                cmd.Parameters.AddWithValue("college_d", objAmp.college);
                cmd.Parameters.AddWithValue("course_d", objAmp.course);
                cmd.Parameters.AddWithValue("special_d", objAmp.specialization);
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
            GetSavedPlacementDataResponse ObjGSTDR = new GetSavedPlacementDataResponse();
            List<GetSavedPlacementData> ListGSTD = new List<GetSavedPlacementData>();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getsaveplacementdata", con);
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
                        GetSavedPlacementData ObjGSTD = new GetSavedPlacementData();
                        ObjGSTD.placedid = Convert.ToInt32(row["placedid"]);
                        ObjGSTD.state = Convert.ToString(row["statename"]);
                        ObjGSTD.city = Convert.ToString(row["cityname"]);
                       // ObjGSTD.school = Convert.ToString(row["schoolname"]);
                        ObjGSTD.university = Convert.ToString(row["university"]);
                        ObjGSTD.college = Convert.ToString(row["college"]);
                        ObjGSTD.course = Convert.ToString(row["course"]);
                        ObjGSTD.specialization = Convert.ToString(row["specialization"]);
                        ObjGSTD.academicyear = Convert.ToString(row["academicyear"]);
                        ObjGSTD.stream = Convert.ToString(row["streamname"]);
                        ObjGSTD.studentname = Convert.ToString(row["studentname"]);
                        ObjGSTD.mobileno = Convert.ToString(row["mobileno"]);
                        ObjGSTD.fathername = Convert.ToString(row["fathername"]);



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


        [HttpGet]
        [Route("GetEditData")]
        public string GetEditedData([FromHeader] GetPlacedId obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetPlacedEditResponse ObjGER = new GetPlacedEditResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("editplacementdata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("placedid_D", obj.placedid);
              
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGER.Status = true;
                    ObjGER.Message = "Data Found";
                    GetPlacedEditData ObjGED = new GetPlacedEditData();
                    ObjGED.placedid = Convert.ToInt32(ds.Tables[0].Rows[0]["placedid"]);
                    ObjGED.stateid = Convert.ToInt32(ds.Tables[0].Rows[0]["stateid"]);
                    ObjGED.cityid = Convert.ToInt32(ds.Tables[0].Rows[0]["cityid"]);

                    //ObjGED.schoolid = Convert.ToInt32(ds.Tables[0].Rows[0]["schoolid"]);
                    ObjGED.yearid = Convert.ToInt32(ds.Tables[0].Rows[0]["yearid"]);

                    
                    ObjGED.streamid = Convert.ToInt32(ds.Tables[0].Rows[0]["streamid"]);
                    ObjGED.studentname = Convert.ToString(ds.Tables[0].Rows[0]["studentname"]);
                    ObjGED.mobileno = Convert.ToString(ds.Tables[0].Rows[0]["mobileno"]);
                    
                    ObjGED.fathername = Convert.ToString(ds.Tables[0].Rows[0]["fathername"]);
                    
                    ObjGED.university = Convert.ToString(ds.Tables[0].Rows[0]["university"]);
                    
                    ObjGED.college = Convert.ToString(ds.Tables[0].Rows[0]["college"]);
                    ObjGED.course = Convert.ToString(ds.Tables[0].Rows[0]["course"]);

                    ObjGED.specialization = Convert.ToString(ds.Tables[0].Rows[0]["specialization"]);
                    
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
        [Route("UpdatePlacement")]
        public string UpdatePlacement([FromForm] string placedid,
        [FromForm] string stateid,  [FromForm] string cityid, [FromForm] string streamid,
        [FromForm] string yearid, [FromForm] string studentname, [FromForm] string mobileno, [FromForm] string fathername,
        [FromForm] string university, [FromForm] string collegename, [FromForm] string course, [FromForm] string specialization, [FromForm] string createdby)

        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            PlacementManagerResponse ObjAMR = new PlacementManagerResponse();
            PlacementManagerParam objAmp = new PlacementManagerParam();

            objAmp.placedid = Convert.ToInt32(placedid);
            objAmp.stateid = Convert.ToInt32(stateid);
            objAmp.cityid = Convert.ToInt32(cityid);
            //objAmp.schoolid = Convert.ToInt32(schoolid);
            objAmp.yearid = Convert.ToInt32(yearid);
            objAmp.streamid = Convert.ToInt32(streamid);
            objAmp.studentname = Convert.ToString(studentname);
            objAmp.mobileno = Convert.ToString(mobileno);

            objAmp.fathername = Convert.ToString(fathername);
            objAmp.university = Convert.ToString(university);

            objAmp.college = Convert.ToString(collegename);
            objAmp.course = Convert.ToString(course);
            objAmp.specialization = Convert.ToString(specialization);
            objAmp.createdby = Convert.ToInt32(createdby);

            try
            {


                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("UpdatePlacementData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("placedid_d", objAmp.placedid);
                cmd.Parameters.AddWithValue("stateid_d", objAmp.stateid);
                cmd.Parameters.AddWithValue("cityid_d", objAmp.cityid);
                cmd.Parameters.AddWithValue("streamid_d", objAmp.streamid);
                //cmd.Parameters.AddWithValue("schoolid_d", objAmp.schoolid);
                cmd.Parameters.AddWithValue("yearid_d", objAmp.yearid);
                cmd.Parameters.AddWithValue("studentname_d", objAmp.studentname);
                cmd.Parameters.AddWithValue("mobileno_d", objAmp.mobileno);

                cmd.Parameters.AddWithValue("fathername_d", objAmp.fathername);
                cmd.Parameters.AddWithValue("university_d", objAmp.university);
                cmd.Parameters.AddWithValue("college_d", objAmp.college);
                cmd.Parameters.AddWithValue("course_d", objAmp.course);
                cmd.Parameters.AddWithValue("special_d", objAmp.specialization);
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
        public string DeleteActivities([FromBody] GetPlacedEditData obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            GetPlacedEditData ObjAMR = new GetPlacedEditData();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("DeletePlacementRecord", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("placedid_d", obj.placedid);
             
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




    public class GetPlacedEditResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public GetPlacedEditData data { get; set; }
    }
    public class GetPlacedEditData
    {
        public Int32 placedid { get; set; }
        public Int32 stateid { get; set; }
        public Int32 cityid { get; set; }
        public Int32 schoolid { get; set; }
        public Int32 yearid { get; set; }
        public Int32 streamid { get; set; }

        public string studentname { get; set; }

        public string mobileno { get; set; }

        public string fathername { get; set; }
        public string university { get; set; }
        public string college { get; set; }
        public string course { get; set; }
        public string specialization { get; set; }
        public Int32 createdby { get; set; }
        public bool Status { get; set; }
        public string Message { get; set; }
    }
    public class GetPlacedId {
        public int placedid { get; set; }
    }


    public class GetStuStateResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetStuStateData> data { get; set; }
    }
    public class GetStuStateData
    {

        public string state { get; set; }
        public Int32 stateid { get; set; }
    }
    public class GetStuCityResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetStuCityData> data { get; set; }
    }
    public class GetStuCityData
    {
        public Int32 stateid { get; set; }
        public Int32 cityid { get; set; }
        public string cityname { get; set; }

    }
    public class GetStuSchoolResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetStuSchoolData> data { get; set; }
    }
    public class GetStuSchoolData
    {
        public Int32 stateid { get; set; }
        public Int32 cityid { get; set; }
        public Int32 schoolid { get; set; }
        public string schoolname { get; set; }

    }
    public class GetStuStreamResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetStuStreamData> data { get; set; }
    }
    public class GetStuStreamData
    {

        public string streamname { get; set; }
        public Int32 streamid { get; set; }
    }
    public class GetStuAcaResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetStuAcaData> data { get; set; }
    }
    public class GetStuAcaData
    {

        public string academicyear { get; set; }
        public Int32 academicid { get; set; }
    }
    public class PlacementManagerResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
    }
    public class PlacementManagerParam
    {
        public Int32 placedid { get; set; }
        public Int32 stateid { get; set; } 
        public Int32 cityid { get; set; } 
        public Int32 schoolid { get; set; }
        public Int32 yearid { get; set; }
        public Int32 streamid { get; set; }

        public string studentname { get; set; } 

        public string mobileno { get; set; } 

        public string fathername { get; set; } 
        public string university { get; set; }
        public string college { get; set; }
        public string course { get; set; }
        public string specialization { get; set; }
        public Int32 createdby { get; set; }
    

    }
    public class GetSavedPlacementDataResponse
    {
        public bool Statue { get; set; }
        public string Message { get; set; }

        public List<GetSavedPlacementData> data { get; set; }
    }
    public class GetSavedPlacementData
    {
        public Int32 placedid { get; set; }
        public string state { get; set; }
        public string city { get; set; }
        public string school { get; set; } = "";
        public string stream { get; set; } = "";
        public string academicyear { get; set; }
        public string studentname { get; set; }
        public string mobileno { get; set; }
        public string fathername { get; set; }
        public string university { get; set; }
        public string college { get; set; }
        public string course { get; set; }
        public string specialization { get; set; }

    }

    public class ExcellSchoolData_placement
    {
        public List<SchoolData_placement> schoolDatas { get; set; }
    }
    public class SchoolData_placement
    {
        public string studentname { get; set; }
        public string mobileno { get; set; }
        public string fathername { get; set; }
        public string state { get; set; }
        public string city { get; set; }
        public string university { get; set; }
        public string college { get; set; }
        public string stream { get; set; }
        public string course { get; set; }
        public string specialization { get; set; }
        public string academicyear { get; set; }
    }
    public class AddGroupClass_placement
    {
        public bool Status { get; set; }
        public string Message { get; set; }


    }


}
