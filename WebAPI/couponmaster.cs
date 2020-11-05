using Microsoft.AspNetCore.Hosting;
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
    [Route("api/couponmaster")]
    public class couponmaster : Controller
    {
        private IHostingEnvironment _hostingEnvironment;
        IConfiguration _iconfiguration;
        public couponmaster(IConfiguration iconfiguration, IHostingEnvironment hosting)
        {
            _iconfiguration = iconfiguration;
            _hostingEnvironment = hosting;
        }
        [HttpPost]
        [Route("SaveCoupon")]
        public string SaveCoupon([FromForm] string couponid,
            [FromForm] string expirydate, [FromForm] string couponname, [FromForm] string discount, [FromForm] string createdby)
        {
            string json = "";
            string result = "";

            DataSet ds = new DataSet();
            SaveCouponResponse objss = new SaveCouponResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("Savecoupon", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("couponid_d", Convert.ToInt32(couponid));
                cmd.Parameters.AddWithValue("expirydate_d", expirydate);
                cmd.Parameters.AddWithValue("coupon_name", couponname);
                cmd.Parameters.AddWithValue("discount_d", Convert.ToInt32(discount));
                cmd.Parameters.AddWithValue("createdby_d", Convert.ToInt32(createdby));
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
        [HttpGet]
        [Route("GetSavedData")]
        public string GetSavedActivityData()
        {
            string json = "";
            DataSet ds = new DataSet();
            GetCouponResponse ObjGSTDR = new GetCouponResponse();
            List<GetCouponData> ListGSTD = new List<GetCouponData>();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("GetSavedCouponData", con);
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
                        GetCouponData ObjGSTD = new GetCouponData();
                        ObjGSTD.couponid = Convert.ToInt32(row["couponid"]);
                        ObjGSTD.expirydate = Convert.ToString(row["expirydate"]);
                        ObjGSTD.couponname = Convert.ToString(row["couponname"]);
                        ObjGSTD.discount = Convert.ToInt32(row["discount"]);

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
        public string GetEditedData([FromHeader] GetCouponid obj)
        {
            string json = "";
            DataSet ds = new DataSet();
            GetCouponEditResponse ObjGER = new GetCouponEditResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("EditcouponData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("couponid_d", obj.couponid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ObjGER.Status = true;
                    ObjGER.Message = "Data Found";
                    GetCouponEditData ObjGED = new GetCouponEditData();
                    ObjGED.couponid = Convert.ToInt32(ds.Tables[0].Rows[0]["couponid"]);
                    ObjGED.expirydate = Convert.ToString(ds.Tables[0].Rows[0]["expirydate"]);
                    ObjGED.couponname = Convert.ToString(ds.Tables[0].Rows[0]["couponname"]);
                    ObjGED.discount = Convert.ToInt32(ds.Tables[0].Rows[0]["discount"]);

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
        [Route("UpdateCoupon")]
        public string UpdateExam([FromForm] string couponid,
            [FromForm] string expirydate, [FromForm] string couponname, [FromForm] string discount, [FromForm] string createdby)
        {
            string json = "";
            string result = "";
            
            DataSet ds = new DataSet();
            SaveCouponResponse objss = new SaveCouponResponse();

            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("updatecoupon", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("couponid_d", Convert.ToInt32(couponid));
                cmd.Parameters.AddWithValue("expirydate_d", expirydate);
                cmd.Parameters.AddWithValue("coupon_name", couponname);
                cmd.Parameters.AddWithValue("discount_d", Convert.ToInt32(discount));
                cmd.Parameters.AddWithValue("createdby_d", createdby);
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
        [Route("DeleteActivity")]
        public string DeleteActivities([FromBody] GetCouponDeleteResponse obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            GetCouponDeleteResponse ObjAMR = new GetCouponDeleteResponse();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("DeleteCouponDetail", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("couponid_d", obj.couponid);

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
    public class SaveCouponResponse
    {
        public string Message { get; set; } = "";
        public Boolean Status { get; set; }
    }
    public class GetCouponData
    {
        public Int32 couponid { get; set; }
        public string expirydate { get; set; }
        public string couponname { get; set; }
        public int discount { get; set; }

    }
    public class GetCouponResponse
    {
        public bool Statue { get; set; }
        public string Message { get; set; }

        public List<GetCouponData> data { get; set; }
    }
    public class GetCouponEditResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public GetCouponEditData data { get; set; }
    }
    public class GetCouponEditData
    {
        public Int32 couponid { get; set; }
        public string expirydate { get; set; }
        public string couponname { get; set; }
        public int discount { get; set; }
    }
    public class GetCouponid
    {
        public Int32 couponid { get; set; }
    }
    public class GetCouponDeleteResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public int couponid { get; set; }
    }
}
