using System;
using System.Collections.Generic;
using System.Data;
//using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using MySql.Data.MySqlClient;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace CareerPrabhu.WebAPI
{
    [Route("api/Login")]
    public class Login : Controller
    {
        IConfiguration _iconfiguration;
        public Login(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
        }

        [HttpPost]
        [Route("LoginManager")]
        public string LoginManager([FromBody] GetLoginData data)
        {
            string json = "";
            LoginData login = new LoginData();
            LoginResponse res = new LoginResponse();
            DataSet ds = new DataSet();

            if (data.UserName == "" || data.Password == "" || data.Password == null || data.UserName == null)
            {
                login.Status = false;
                login.Message = "Invalid UserName Or Password";
            }

            
            else
            { 
                    try
                    { 
                        string UserName = data.UserName;
                        string Password = data.Password;

                        MySqlConnection con = new SoftwareConnection(_iconfiguration).GetConnection();
                        MySqlCommand cmd = new MySqlCommand("LoginManager", con);
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("UserName_d", UserName);
                        cmd.Parameters.AddWithValue("Pwd_d", Password);
                        con.Open();
                        MySqlDataAdapter da = new MySqlDataAdapter();
                        da.SelectCommand = cmd;
                        da.Fill(ds);
                        con.Close();

                        if (ds.Tables.Count > 0)
                        {
                            json = JsonConvert.SerializeObject(ds.Tables[0], Formatting.Indented);
                            res.Token = GetToken(Convert.ToInt32(ds.Tables[0].Rows[0]["userid"]));
                            res.userid = Convert.ToInt32(ds.Tables[0].Rows[0]["userid"]);// Same As DataBase column Name 
                            res.username = ds.Tables[0].Rows[0]["username"].ToString();// Storing Data Base data into Local Variable
                            res.roleid = Convert.ToInt32(ds.Tables[0].Rows[0]["roleid"]);
                            res.cityid = Convert.ToInt32(ds.Tables[0].Rows[0]["cityid"]);
                            login.Status = true;
                            login.Message= "You are successfully logged in.";
                            login.res = res;
             
                        }
                        else
                        {
                            login.Status = false;
                            login.Message = "UserName or Password is incorrect.";
                        }

                    }
                    catch(Exception e)
                    {
                        login.Status = false;
                        login.Message = e.Message;

                    }
            }
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            json = JsonConvert.SerializeObject(login,settings);

            return json;
        }
        //Function for creating TOKEN
        private string GetToken(int UserId)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_iconfiguration.GetSection("ConnectionStrings").GetSection("KEY").Value.ToString());
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, UserId.ToString())
                }),
                Expires = DateTime.Now.AddHours(Convert.ToInt32(_iconfiguration.GetSection("ConnectionStrings").GetSection("TimeOut").Value)),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }


    }

    //For getting Data from Angular 
    public class GetLoginData
    {
        public string UserName { get; set; } = "";
        public string Password { get; set; } = "";
        
    }

    //Assign Status And Message And Objet Of LoginResponse Class,It will Send to Angular In response 
    public class LoginData
    {
        public Boolean Status { get; set; }
        public string Message { get; set; }
        public LoginResponse res { get; set; }
    }

    //Get Data From DataBase And Bind Here 
    public class LoginResponse
    {
        public string Token { get; set; }
        public int userid { get; set; }
        public string username { get; set; }
        public int roleid { get; set; }
        public int cityid { get; set; }
    }
}
