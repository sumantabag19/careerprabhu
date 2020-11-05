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
    [Route("api/InstituteMaster")]
    public class InstituteMaster : Controller
    {
        IConfiguration _iconfiguration;
        public InstituteMaster(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
        }


        [HttpPost]
        [Route("Upload")]
        public string Upload([FromBody]ExcellSchoolData obj)
        {
            AddGroupClass ObjClass = new AddGroupClass();
            ExcellSchoolData nxt = new ExcellSchoolData();
            List<SchoolData> lst = new List<SchoolData>();
            string json = "";
            try
            {


                if (obj.schoolDatas.Count > 0)
                {
                    SchoolData tst = new SchoolData();
                    int stateid=0;
                    int contid=0;
                    int contid1 = 0;
                    int locid1 = 0;
                    int cityid1 = 0;
                    // tst.boardname = Convert.ToString(obj.schoolDatas[0].boardname);
                    //Execqry("delete from tbl_entrancecareer where examid=" + Convert.ToInt32(examid));


                    try
                    {
                        for (int i = 0; i < obj.schoolDatas.Count; i++)
                        {
                            tst.country = Convert.ToString(obj.schoolDatas[0].country);
                            int cid = Return_Int("select countryid from tbl_countrymaster where countryname= '" + Convert.ToString(obj.schoolDatas[i].country).Trim() + "'");
                            int sid = Return_Int("select locationid from tbl_location where location='" + Convert.ToString(obj.schoolDatas[i].state).Trim() + "'and countryid=" + cid);
                            int city_id = Return_Int("select cityid from tbl_careercitymaster where cityname='" + Convert.ToString(obj.schoolDatas[i].city).Trim() + "'and countryid=" + cid + " and locationid=" + sid);
                            if (cid != 0 && city_id != 0 && sid != 0)
                            {
                                int univid = Return_Int("select universityid from tbl_university where universityname='" + Convert.ToString(obj.schoolDatas[i].university).Trim() + "' and countryid=" + cid + " and locationid=" + sid + " and cityid=" + city_id);
                                if (univid == 0)
                                {
                                    Execqry("insert into tbl_university(countryid,locationid,universityname,cityid)values(" + Convert.ToInt32(cid) + ", " + Convert.ToInt32(sid) + ",'" + Convert.ToString(obj.schoolDatas[i].university).Trim() + "'," + Convert.ToInt32(city_id) + ")");
                                }



                            }


                            //  Execqry("insert into tbl_entrancecareer(examid,streamid)values(" + Convert.ToInt32(examid) + ", " + Convert.ToInt32(streamlist[i]) + ")");
                        }
                    }
                    catch(Exception ex)
                    {

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



















        //Api for bind country
        [HttpGet]
        [Route("Bindcountry")]
        public string Bindcountry()
        {
            DataSet ds = new DataSet();
            string json = "";
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

        //save location
        [HttpPost]
        [Route("SaveLocation")]
        public string SaveLocation([FromBody] Locationparam obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            Locationparam objss = new Locationparam();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("SaveLocation", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("locationid_d", obj.locationid);
                cmd.Parameters.AddWithValue("countryid_d", obj.countryid);
                cmd.Parameters.AddWithValue("location_name", obj.location);
                //cmd.Parameters.AddWithValue("createdby_d", obj.createdby);
                
                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();
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


        //Api for bind location
        [HttpPost]
        [Route("BindLocation")]
        public string BindLocation([FromBody] GetLocationData data)
        {
            GetLocationResponse GSR = new GetLocationResponse();
            List<GetLocationData> ListGSD = new List<GetLocationData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindLocation", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("countryid_d", data.countryid);
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
                        GetLocationData GSD = new GetLocationData();
                        GSD.locationid = Convert.ToInt32(row["locationid"]);
                        GSD.location = Convert.ToString(row["location"]);
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



        //save city
        [HttpPost]
        [Route("SaveCity")]
        public string SaveCity([FromBody] Cityparam obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            Cityparam objss = new Cityparam();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("SaveCity", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("city_d", obj.cityid);
                cmd.Parameters.AddWithValue("locationid_d", obj.locationid);
                cmd.Parameters.AddWithValue("countryid_d", obj.countryid);
                cmd.Parameters.AddWithValue("city_name", obj.cityname);
                //cmd.Parameters.AddWithValue("createdby_d", obj.createdby);

                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();
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

        //API for bind city

        [HttpPost]
        [Route("BindCity")]
        public string BindCity([FromBody] GetCityData data)
        {
            GetCityResponse GSR = new GetCityResponse();
            List<GetCityData> ListGSD = new List<GetCityData>();
            string json = "";
            DataSet ds = new DataSet();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("BindCityDetail", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("countryid_d", data.countryid);
                cmd.Parameters.AddWithValue("locationid_d", data.locationid);
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
                        GetCityData GSD = new GetCityData();
                        GSD.cityname = Convert.ToString(row["cityname"]);
                        GSD.cityid = Convert.ToInt32(row["cityid"]);
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




        //Api for save university
        [HttpPost]
        [Route("SaveUniversity")]
        public string SaveUniversity([FromBody] Universiynparam obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            Universiynparam objss = new Universiynparam();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("SaveUniversity", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("universityid_d", obj.universityid);
                cmd.Parameters.AddWithValue("locationid_d", obj.locationid);
                cmd.Parameters.AddWithValue("countryid_d", obj.countryid);
                cmd.Parameters.AddWithValue("cityid_d", obj.cityid);
                cmd.Parameters.AddWithValue("university_d", obj.university);
                //cmd.Parameters.AddWithValue("createdby_d", obj.createdby);

                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();
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

        //Api for getting university detail
        [HttpGet]
        [Route("GetUniversityData")]
        public string GetUniversityData([FromHeader] Universiynparam obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            Universiynparam objss = new Universiynparam();
            List<GetSavedUniversityData> ListGSTD = new List<GetSavedUniversityData>();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("GetUniversityData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {

                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        GetSavedUniversityData ObjGSTD = new GetSavedUniversityData();
                        ObjGSTD.universityid = Convert.ToInt32(row["universityid"]);
                        ObjGSTD.country = Convert.ToString(row["countryname"]);
                        ObjGSTD.location = Convert.ToString(row["location"]);
                        ObjGSTD.cityname = Convert.ToString(row["cityname"]);
                        ObjGSTD.univercityname = Convert.ToString(row["universityname"]);
                        ListGSTD.Add(ObjGSTD);
                    }
                    objss.data = ListGSTD;
                }
                else
                {

                }
            }
            catch (Exception e)
            {
                string msg = e.Message;
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(objss, settings);
            return json;
        }

        //Api for edit data

        [HttpGet]
        [Route("EditUniversityData")]
        public string EditUniversityData([FromHeader] EditUniversityResponse data)
        {
            DataSet ds = new DataSet();
            EditUniversityResponse ESSR = new EditUniversityResponse();
            string json = "";
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("edituniversitydata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("universityid_d", data.universityid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();

                if (ds.Tables[0].Rows.Count > 0)
                {
                    ESSR.universityid = Convert.ToInt32(ds.Tables[0].Rows[0]["universityid"]);
                
                    ESSR.countryid = Convert.ToInt32(ds.Tables[0].Rows[0]["countryid"]);
                    ESSR.countryname = Convert.ToString(ds.Tables[0].Rows[0]["countryname"]);
                    ESSR.locationid = Convert.ToInt32(ds.Tables[0].Rows[0]["locationid"]);
                    ESSR.location = Convert.ToString(ds.Tables[0].Rows[0]["location"]);
                    ESSR.cityid = Convert.ToInt32(ds.Tables[0].Rows[0]["cityid"]);
                    ESSR.cityname = Convert.ToString(ds.Tables[0].Rows[0]["cityname"]);
                    ESSR.universityname = Convert.ToString(ds.Tables[0].Rows[0]["universityname"]);
                   


                    ESSR.Status = true;
                    ESSR.Message = "Data found";
                }
                else
                {
                    ESSR.Status = false;
                    ESSR.Message = "Something went wrong";

                }


            }
            catch (Exception ex)
            {
                ESSR.Status = false;
                ESSR.Message = ex.Message;

            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(ESSR, settings);
            return json;
        }

        //Api for update data
        [HttpPost]
        [Route("UpdateUniversity")]
        public string UpdateUniversity([FromBody] Universiynparam obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            Universiynparam objss = new Universiynparam();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Updateuniversity", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("universityid_d", obj.universityid);
                cmd.Parameters.AddWithValue("locationid_d", obj.locationid);
                cmd.Parameters.AddWithValue("countryid_d", obj.countryid);
                cmd.Parameters.AddWithValue("cityid_d", obj.cityid);
                cmd.Parameters.AddWithValue("university_d", obj.university);
                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();
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

        //Api for delete summer school
        [HttpPost]
        [Route("DeleteUniversity")]
        public string DeleteUniversity([FromBody] DeleteUniversity data)
        {

            DeleteUniversity delsum = new DeleteUniversity();
            DataSet ds = new DataSet();
            string json = "";
            string result = "";
            if (data == null)
            {

                delsum.Status = false;
                delsum.Message = "Something went wrong";
            }
            else
            {
                try
                {
                    delsum.Status = true;
                    MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                    MySqlCommand cmd = new MySqlCommand("DeleteUniversity", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("message", "");
                    cmd.Parameters["message"].Direction = ParameterDirection.Output;
                    cmd.Parameters.AddWithValue("universityid_d", data.universityid);


                    con.Open();
                    cmd.ExecuteScalar();
                    result = cmd.Parameters["message"].Value.ToString();
                    con.Close();
                    delsum.Message = result;

                }
                catch (Exception e)
                {
                    delsum.Status = false;
                    delsum.Message = e.Message;

                }
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(delsum, settings);
            return json;
        }



    }

    //class for saved location
    public class Locationparam
    {

        public Int32 locationid { get; set; }
        public Int32 countryid { get; set; }
        public string location { get; set; }
        public Int32 createdby { get; set; }
        public string Message { get; set; } = "";
        public Boolean Status { get; set; }

    }
    //class for bind location
    public class GetLocationResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetLocationData> data { get; set; }
    }
    public class GetLocationData
    {
        public Int32 countryid { get; set; }
        public string location { get; set; }
        public Int32 locationid { get; set; }
    }
    //class for save city
    public class Cityparam
    {
        public Int32 cityid { get; set; }
        public Int32 locationid { get; set; }
        public Int32 countryid { get; set; }
        public string cityname { get; set; }
        public Int32 createdby { get; set; }
        public string Message { get; set; } = "";
        public Boolean Status { get; set; }

    }
    //class for bind city
    public class GetCityResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<GetCityData> data { get; set; }
    }
    public class GetCityData
    {
        public Int32 countryid { get; set; }
        
        public Int32 locationid { get; set; }
        public Int32 cityid { get; set; }
        public string cityname { get; set; }

    }
    //class for save university
    public class Universiynparam
    {

        public Int32 universityid { get; set; }
        public Int32 countryid { get; set; }
        
        public Int32 locationid { get; set; }
        public Int32 cityid { get; set; }
        public string university { get; set; }
        public string Message { get; set; } = "";
        public Boolean Status { get; set; }
        public List<GetSavedUniversityData> data { get; set; }

    }
    //class for get saved data
    public class GetSavedUniversityData
    {
        public Int32 universityid { get; set; }
        public string location { get; set; }
        public string country { get; set; }
        public string cityname { get; set; }

        public string univercityname { get; set; }
 
    }

    //class for edit university
    public class EditUniversityResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public Int32 universityid { get; set; }
     
        public Int32 countryid { get; set; }
        public string countryname { get; set; }
        public Int32 locationid { get; set; }
        public string location { get; set; }
        public Int32 cityid { get; set; }
        public string cityname { get; set; }
        public string universityname { get; set; }
     



    }

    //class for delete 
    public class DeleteUniversity
    {

        public Int32 universityid { get; set; }
        public bool Status { get; set; }
        public string Message { get; set; }

    }
    public class ExcellSchoolData
    {
        public List<SchoolData> schoolDatas { get; set; }
    }
    public class SchoolData
    {
        public string country { get; set; }
        public string state { get; set; }
        public string city { get; set; }
        public string university { get; set; }
       
    }
    public class AddGroupClass
    {
        public bool Status { get; set; }
        public string Message { get; set; }


    }
}
