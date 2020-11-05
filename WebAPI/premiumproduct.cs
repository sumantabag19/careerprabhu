using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CareerPrabhu.WebAPI
{

    [Route("api/premiumproduct")]
    public class premiumproduct : Controller
    {
        IConfiguration _iconfiguration;
        private IHostingEnvironment _hostingEnvironment;
        string prevpdfguid = "";
        string pdffilename = "";

        public premiumproduct(IConfiguration iconfiguration, IHostingEnvironment hosting)
        {
            _iconfiguration = iconfiguration;
            _hostingEnvironment = hosting;
        }

        //API for save professional seek master
        [HttpPost]
        [Route("SaveSopPropData")]
        public async Task<IActionResult> SaveSopPropData([FromForm] IFormFile image, [FromForm] string soppropid, [FromForm] string profname,


       [FromForm] string testimonial, [FromForm] string orgimagename, [FromForm] string createdby)

        {
            string json = "";
            string result = "";

            DataSet ds = new DataSet();

            SOPProfResponse objppfr = new SOPProfResponse();
            SampleProfParam objppfp = new SampleProfParam();



            if (image != null)
            {
                try
                {
                    prevpdfguid = Guid.NewGuid().ToString();
                    pdffilename = prevpdfguid + image.FileName;

                    var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "SOP");
                    if (image.Length > 0)
                    {
                        var filePath = Path.Combine(uploads, pdffilename);

                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            await image.CopyToAsync(fileStream);
                        }
                    }
                }
                catch (Exception e)
                {
                    string Message = e.Message;
                }
            }





            objppfp.soppropid = Convert.ToInt32(soppropid);
            objppfp.profname = Convert.ToString(profname);

            objppfp.testimonial = Convert.ToString(testimonial);


            objppfp.createdby = Convert.ToInt32(createdby);
            if (orgimagename == null)
            {
                objppfp.orgimagename = "";
            }
            else
            {
                objppfp.orgimagename = Convert.ToString(orgimagename);
            }



            try
            {
                if (prevpdfguid == "")
                {
                    objppfp.newimagename = "";
                }
                else
                {
                    objppfp.newimagename = prevpdfguid;
                }

                // objppfp.newpdfname = prevpdfguid;

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("SavePremium", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("soppropid_d", objppfp.soppropid);
                cmd.Parameters.AddWithValue("testimonial_d", objppfp.testimonial);
                cmd.Parameters.AddWithValue("name_d", objppfp.profname);

                cmd.Parameters.AddWithValue("orgimagename_d", objppfp.orgimagename);
                cmd.Parameters.AddWithValue("newimagename_d", objppfp.newimagename);

                cmd.Parameters.AddWithValue("created_by", objppfp.createdby);
                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();




                con.Close();
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
            return Ok(json);

        }

        //API for get data for display
        [HttpGet]
        [Route("BindSOPPropData")]
        public string BindSOPPropData()
        {
            string json = "";
            DataSet ds = new DataSet();
            GetSOPProfResponse ObjGSPDR = new GetSOPProfResponse();
            List<GetSOPPropData> ListGSPD = new List<GetSOPPropData>();

            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("GetProductData", con);
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
                        GetSOPPropData ObjGSPD = new GetSOPPropData();

                        ObjGSPD.soppropid = Convert.ToInt32(row["soppropid"]);
                        ObjGSPD.testimonial = Convert.ToString(row["testimonial"]);
                        ObjGSPD.testimonialname = Convert.ToString(row["testimonialname"]);
                        if (Convert.ToString(row["filename"]) == "" || Convert.ToString(row["filename"]) == null)
                        {
                            ObjGSPD.imagename = "N/A";
                        }
                        else
                        {
                            ObjGSPD.imagename = "http://admin.careerprabhu.com/" + "SOP/" + Convert.ToString(row["filename"]);
                        }
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

        //API for edit sop professional hel master
        //Api for edit sample portfolio data
        [HttpGet]
        [Route("EditSopProp")]
        public string EditSopProp([FromHeader] EditSopPropData data)
        {
            DataSet ds = new DataSet();
            EditSopPropResponse edr = new EditSopPropResponse();
            List<SopPropEditData> sd = new List<SopPropEditData>();
            string json = "";
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("EditProduct", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("soppropid_d", data.soppropid);
                con.Open();
                MySqlDataAdapter da = new MySqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(ds);
                con.Close();

                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        SopPropEditData sed = new SopPropEditData();
                        sed.soppropid = Convert.ToInt32(row["soppropid"]);
                        sed.testimonial = row["testimonial"].ToString();
                        sed.testimonialname = row["testimonialname"].ToString();


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


        //API for update professional seek master
        [HttpPost]
        [Route("UpdateSopPropData")]
        public async Task<IActionResult> UpdateSopPropData([FromForm] IFormFile image, [FromForm] string soppropid, [FromForm] string profname,

       [FromForm] string testimonial, [FromForm] string orgimagename, [FromForm] string createdby)

        {
            string json = "";
            string result = "";

            DataSet ds = new DataSet();

            SOPProfResponse objppfr = new SOPProfResponse();
            SampleProfParam objppfp = new SampleProfParam();



            if (image != null)
            {
                try
                {
                    prevpdfguid = Guid.NewGuid().ToString();
                    pdffilename = prevpdfguid + image.FileName;

                    var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "SOP");
                    if (image.Length > 0)
                    {
                        var filePath = Path.Combine(uploads, pdffilename);

                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            await image.CopyToAsync(fileStream);
                        }
                    }
                }
                catch (Exception e)
                {
                    string Message = e.Message;
                }
            }





            objppfp.soppropid = Convert.ToInt32(soppropid);

            objppfp.profname = Convert.ToString(profname);
            objppfp.testimonial = Convert.ToString(testimonial);


            objppfp.createdby = Convert.ToInt32(createdby);
            if (orgimagename == null)
            {
                objppfp.orgimagename = "";
            }
            else
            {
                objppfp.orgimagename = Convert.ToString(orgimagename);
            }



            try
            {
                if (prevpdfguid == "")
                {
                    objppfp.newimagename = "";
                }
                else
                {
                    objppfp.newimagename = prevpdfguid;
                }

                // objppfp.newpdfname = prevpdfguid;

                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("updateproduct", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;

                cmd.Parameters.AddWithValue("soppropid_d", objppfp.soppropid);
                cmd.Parameters.AddWithValue("testimonial_d", objppfp.testimonial);
                cmd.Parameters.AddWithValue("name_d", objppfp.profname);


                cmd.Parameters.AddWithValue("orgimagename_d", objppfp.orgimagename);
                cmd.Parameters.AddWithValue("newimagename_d", objppfp.newimagename);

                cmd.Parameters.AddWithValue("created_by", objppfp.createdby);
                con.Open();
                cmd.ExecuteScalar();
                result = cmd.Parameters["message"].Value.ToString();




                con.Close();
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
            return Ok(json);

        }


        //Api for delete Sop Prop data

        [HttpPost]
        [Route("DeleteSopProp")]
        public string DeleteSopProp([FromBody] DeleteSampleSopaParam obj)
        {
            string json = "";
            string result = "";
            DataSet ds = new DataSet();
            DeleteSampleSopaParam ObjAMR = new DeleteSampleSopaParam();
            try
            {
                MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                MySqlCommand cmd = new MySqlCommand("DeleteSopPropData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("message", "");
                cmd.Parameters["message"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("soppropid_d", obj.soppropid);


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
}
