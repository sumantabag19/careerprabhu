using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;


namespace CareerPrabhu
{
    public class SoftwareConnection : Controller
    {
        IConfiguration Icon;

        public SoftwareConnection(IConfiguration ICon)
        {
            Icon = ICon;
        }

        public MySqlConnection GetConnection()
        {

            MySqlConnection con = new MySqlConnection(Icon.GetSection("ConnectionStrings").GetSection("con").Value.ToString());
            //SqlConnection con = new SqlConnection(Icon.GetSection("ConnectionStrings").GetSection("con").Value.ToString());
            return con;
        }
    }
}
