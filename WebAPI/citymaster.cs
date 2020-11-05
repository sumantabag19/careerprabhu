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
    [Route("api/citymaster")]
    //PartnerRegistration
    public class citymaster : Controller
    {
        IConfiguration _iconfiguration;
        public citymaster(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
        }





        [HttpPost]
        [Route("Upload")]
        public string Upload([FromBody]ExcellSchoolData_city obj)
        {
            AddGroupClass ObjClass = new AddGroupClass();
            ExcellSchoolData_city nxt = new ExcellSchoolData_city();
            List<SchoolData_city> lst = new List<SchoolData_city>();
            string json = "";
            try
            {


                if (obj.schoolDatas.Count > 0)
                {
                    SchoolData tst = new SchoolData();
                    try
                    {
                        for (int i = 0; i < obj.schoolDatas.Count; i++)
                        {
                            int cid = Return_Int("select countryid from tbl_countrymaster where countryname= '" + Convert.ToString(obj.schoolDatas[i].country).Trim() + "'");
                            int sid = Return_Int("select locationid from tbl_location where location='" + Convert.ToString(obj.schoolDatas[i].state).Trim() + "'and countryid=" + cid);
                            if (cid != 0 && sid != 0)
                            {
                                int city_id = Return_Int("select cityid from tbl_careercitymaster where cityname='" + Convert.ToString(obj.schoolDatas[i].city).Trim() + "'and countryid=" + cid + " and locationid=" + sid);
                                if (city_id == 0)
                                {
                                    Execqry("insert into tbl_careercitymaster(countryid,cityname,locationid)values(" + Convert.ToInt32(cid) + " ,'" + Convert.ToString(obj.schoolDatas[i].city).Trim() + "'," + Convert.ToInt32(sid) + ")");

                                }



                            }


                            //  Execqry("insert into tbl_entrancecareer(examid,streamid)values(" + Convert.ToInt32(examid) + ", " + Convert.ToInt32(streamlist[i]) + ")");
                        }
                        ObjClass.Status = true;
                        ObjClass.Message = "Data Import Completed";
                    }
                    catch(Exception ex)
                    {
                        ObjClass.Message = ex.Message;
                    }
                    // tst.boardname = Convert.ToString(obj.schoolDatas[0].boardname);
                    //Execqry("delete from tbl_entrancecareer where examid=" + Convert.ToInt32(examid));
                    
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
                ObjClass.Message = ex.Message;
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
            bindcountryResponses GSR = new bindcountryResponses();
            List<bindcountrydata> ListGSD = new List<bindcountrydata>();
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
                        bindcountrydata GSD = new bindcountrydata();
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
        [Route("Bindstate")]
        public string Bindstate([FromBody] bindstatedata data)
        {
            bindStateResponses GSR = new bindStateResponses();
            List<bindstatedata> ListGSD = new List<bindstatedata>();
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
                        bindstatedata GSD = new bindstatedata();
                        GSD.stateid = Convert.ToInt32(row["locationid"]);
                        GSD.statename = Convert.ToString(row["location"]);
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
        [Route("Savecitymaster")]
        public string Savecitymaster([FromForm] string cityid,
           [FromForm] string countryid, string stateid, [FromForm] string cityname, [FromForm] string createdby)

        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            SavecityResponse ObjAMR = new SavecityResponse();
            SavecityData objAmp = new SavecityData();

            objAmp.cityid = Convert.ToInt32(cityid);
            objAmp.countryid = Convert.ToInt32(countryid);
            objAmp.stateid = Convert.ToInt32(stateid);
            objAmp.cityname = Convert.ToString(cityname);
            
            objAmp.createdby = Convert.ToInt32(createdby);


            try
            {


                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("SaveCity", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("city_d", objAmp.cityid);
                cmd.Parameters.AddWithValue("countryid_d", objAmp.countryid);

                cmd.Parameters.AddWithValue("locationid_d", objAmp.stateid);
                cmd.Parameters.AddWithValue("city_name", objAmp.cityname);
               
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
            GetSavedcityResponse ObjGSTDR = new GetSavedcityResponse();
            List<GetSavedcityData> ListGSTD = new List<GetSavedcityData>();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getsavecitymaster", con);
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
                        GetSavedcityData ObjGSTD = new GetSavedcityData();
                        ObjGSTD.cityid = Convert.ToInt32(row["cityid"]);
                        ObjGSTD.country = Convert.ToString(row["countryname"]);
                        ObjGSTD.state = Convert.ToString(row["statename"]);
                        ObjGSTD.city = Convert.ToString(row["cityname"]);
                       
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
        public string GetEditedData([FromHeader] GetcityId obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetcityEditResponse ObjGER = new GetcityEditResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("editcitymasterdata", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("city_d", obj.cityid);

                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGER.Status = true;
                    ObjGER.Message = "Data Found";
                    GetcityEditData ObjGED = new GetcityEditData();
                    ObjGED.cityid = Convert.ToInt32(ds.Tables[0].Rows[0]["cityid"]);
                    ObjGED.countryid = Convert.ToInt32(ds.Tables[0].Rows[0]["countryid"]);
                    ObjGED.stateid = Convert.ToInt32(ds.Tables[0].Rows[0]["locationid"]);
                    ObjGED.cityname = Convert.ToString(ds.Tables[0].Rows[0]["cityname"]);

                   
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
        [Route("Updatecitymaster")]
        public string Updatecitymaster([FromForm] string cityid,
          [FromForm] string countryid, string stateid, [FromForm] string cityname, [FromForm] string createdby)


        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            SavecityResponse ObjAMR = new SavecityResponse();
            SavecityData objAmp = new SavecityData();

            objAmp.cityid = Convert.ToInt32(cityid);
            objAmp.countryid = Convert.ToInt32(countryid);
            objAmp.stateid = Convert.ToInt32(stateid);
            objAmp.cityname = Convert.ToString(cityname);

            objAmp.createdby = Convert.ToInt32(createdby);




            try
            {


                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("updatecitymaster", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("city_d", objAmp.cityid);
                cmd.Parameters.AddWithValue("countryid_d", objAmp.countryid);

                cmd.Parameters.AddWithValue("locationid_d", objAmp.stateid);
                cmd.Parameters.AddWithValue("cityname_d", objAmp.cityname);

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
        public string DeleteActivities([FromBody] GetcityEditData obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            GetcityEditData ObjAMR = new GetcityEditData();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("DeletecityRecord", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("cityid_d", obj.cityid);
                cmd.Parameters.AddWithValue("city_name", obj.cityname);
                cmd.Parameters.AddWithValue("countryid_d", obj.countryid);
                cmd.Parameters.AddWithValue("locationid_d", obj.stateid);

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
        [Route("GetSavedCountryData")]
        public string GetSavedCountryData()
        {
            string json = "";
            DataSet ds = new DataSet();
            GetSavedcountryResponse ObjGSTDR = new GetSavedcountryResponse();
            List<GetSavedcountryData> ListGSTD = new List<GetSavedcountryData>();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getsavecountrymaster", con);
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
                        GetSavedcountryData ObjGSTD = new GetSavedcountryData();
                        ObjGSTD.countryid = Convert.ToInt32(row["countryid"]);
                        ObjGSTD.countryname = Convert.ToString(row["countryname"]);
                        ObjGSTD.status = Convert.ToString(row["status_d"]);


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
        [Route("GetSavedPermissionData")]
        public string GetSavedPermissionData()
        {
            string json = "";
            DataSet ds = new DataSet();
            GetSavedPermissionResponse ObjGSTDR = new GetSavedPermissionResponse();
            List<GetSavedPermissionData> ListGSTD = new List<GetSavedPermissionData>();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("getsavepermissionmaster", con);
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
                        GetSavedPermissionData ObjGSTD = new GetSavedPermissionData();
                        ObjGSTD.permissionid = Convert.ToInt32(row["permissionid"]);
                        ObjGSTD.pagename = Convert.ToString(row["pagename"]);
                        ObjGSTD.status = Convert.ToString(row["status_d"]);


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






        [HttpPost]
        [Route("Inactivecountry")]
        public string Inactivecountry([FromBody] GetcountryEditData obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            GetcityEditData ObjAMR = new GetcityEditData();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("InactiveCountryRecord", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

               
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



        [HttpPost]
        [Route("Inactivepage")]
        public string Inactivepage([FromBody] GetcountryEditData obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            GetcityEditData ObjAMR = new GetcityEditData();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("InactivePermissionRecord", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;


                cmd.Parameters.AddWithValue("permissionid_d", obj.countryid);

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
    public class bindcountryResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<bindcountrydata> data { get; set; }
    }
    public class bindcountrydata
    {

        public string countryname { get; set; }
        public Int32 countryid { get; set; }
    }
    public class bindStateResponses
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<bindstatedata> data { get; set; }
    }
    public class bindstatedata
    {
        public Int32 countryid { get; set; }
        public string statename { get; set; }
        public Int32 stateid { get; set; }
    }
    

    public class SavecityResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
    }
    public class SavecityData
    {
        public Int32 stateid { get; set; }
        public string cityname { get; set; }
        public Int32 countryid { get; set; }
       public Int32 cityid { get; set; }
        
        public Int32 createdby { get; set; }


    }
    public class GetSavedcityResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }

        public List<GetSavedcityData> data { get; set; }
    }
    public class GetSavedcityData
    {
        public Int32 cityid { get; set; }
        public string country { get; set; }
        public string state { get; set; }
        public string city { get; set; }
       
    }
    public class GetcityId
    {
        public int cityid { get; set; }
    }
    public class GetcityEditResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public GetcityEditData data { get; set; }
    }
    public class GetcityEditData
    {
        public Int32 cityid { get; set; }


        public Int32 stateid { get; set; }
        public string cityname { get; set; }
        public Int32 countryid { get; set; }
       

        public Int32 createdby { get; set; }
        public bool Status { get; set; }
        public string Message { get; set; }
    }


    public class ExcellSchoolData_city
    {
        public List<SchoolData_city> schoolDatas { get; set; }
    }
    public class SchoolData_city
    {
        public string country { get; set; }
        public string state { get; set; }

        public string city { get; set; }

    }


    public class GetSavedPermissionResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }

        public List<GetSavedPermissionData> data { get; set; }
    }
    public class GetSavedPermissionData
    {
        public Int32 permissionid { get; set; }
        public string pagename { get; set; }

        public string status { get; set; }

    }




    public class GetSavedcountryResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }

        public List<GetSavedcountryData> data { get; set; }
    }
    public class GetSavedcountryData
    {
        public Int32 countryid { get; set; }
        public string countryname { get; set; }

        public string status { get; set; }

    }
    public class GetcountryEditData
    {
        public int countryid { get; set; }

    }
}

