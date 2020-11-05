using System;
using System.Data;
using System.Configuration;
using System.Web;

using System.Net;
using System.IO;
using System.Net.Mail;


//using System.Web.Mail;

/// <summary>
/// Summary description for emailsending
/// </summary>
public class emailsending
{
    
    //public void SendTestEmail(string ttt, int stuid, string to, string toptext, string centre, string timing, string ondate, string pcno)
    //{
    //    MailMessage mailMessage = new MailMessage();
    //    mailMessage.From = "administrator@hitbullseye.co.in";

    //    mailMessage.Subject = ttt;
    //    mailMessage.BodyFormat = MailFormat.Html;
        
    //    mailMessage.To = to;
    //    SmtpMail.SmtpServer = "mail.hitbullseye.co.in";
        
    //    //
    //    commonclass clscon = new commonclass();
    //    string stuname = clscon.Return_string("select studentname from studentdetail where studentid=" + stuid + "");
    //    if (centre == "Online")
    //    {
    //        mailMessage.Body = "<TABLE style='WIDTH: 840px'><TBODY><TR><TD style='WIDTH: 22px; HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right width=10 colSpan=3><img src='http://hitbullseye.com/Images/bullseye.JPG' alt='Bulls Eye'/></TD><TD style='WIDTH: 70px; HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1>&nbsp;&nbsp;&nbsp;&nbsp; </TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right width=10 colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=4 class=lboldnew'>" + ttt + "</TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; TEXT-ALIGN: left' align=right></TD><TD style='TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; TEXT-ALIGN: left' align=left bgColor=#c7e290>User ID</TD><TD style='WIDTH: 126px' align=left bgColor=#c7e290>" + stuid + "</TD><TD style='WIDTH: 70px' align=left bgColor=#c7e290>Name</TD><TD align=left bgColor=#c7e290>" + stuname + "</TD><TD align=left></TD></TR><TR><TD style='WIDTH: 22px; TEXT-ALIGN: left' align=right></TD><TD style='TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; TEXT-ALIGN: left' align=left bgColor=#9bbb59>Test Centre</TD><TD align=left bgColor=#9bbb59 colSpan=3>" + centre + "</TD><TD align=left colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: left' align=right></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; HEIGHT: 21px; TEXT-ALIGN: left' align=left bgColor=#c7e290>Test Timing</TD><TD style='WIDTH: 126px; HEIGHT: 21px' align=left bgColor=#c7e290>" + timing + "</TD><TD style='WIDTH: 70px; HEIGHT: 21px' align=left bgColor=#c7e290>Test Name</TD><TD style='WIDTH: 179px; HEIGHT: 21px' align=left bgColor=#c7e290>" + toptext + "</TD><TD style='WIDTH: 179px; HEIGHT: 21px' align=left>&nbsp;&nbsp;&nbsp;&nbsp; </TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: left' align=right></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; HEIGHT: 21px; TEXT-ALIGN: left' align=left bgColor=#9bbb59>Test Date</TD><TD style='WIDTH: 126px; HEIGHT: 21px' align=left bgColor=#9bbb59>" + ondate + "</TD><TD style='WIDTH: 70px; HEIGHT: 21px' align=left bgColor=#9bbb59></TD><TD style='HEIGHT: 21px' align=left bgColor=#9bbb59></TD><TD style='HEIGHT: 21px' align=left></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: left' align=right></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: left' align=right width=10></TD><TD style='HEIGHT: 21px' align=left colSpan=4>General Instructions for the Test:</TD><TD style='HEIGHT: 21px' align=left colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>1.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>You can also cancel/Reschedule the booked test within certain time limit. Please go through the detailed Directions for the same given on the scheduling home page.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>2</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>In case a student fails to appear after booking a test more than twice, he/she she will be disqualified from the entire test series.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>3</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>Bulls eye holds the right to disqualify a candidate from the individual test/ complete test series incase he/she is found in any unfair practice/ mobile phone usage during the test.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR></TBODY></TABLE>";
    //    }
    //    else
    //    {
    //        mailMessage.Body = "<TABLE style='WIDTH: 840px'><TBODY><TR><TD style='WIDTH: 22px; HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right width=10 colSpan=3><img src='http://hitbullseye.com/Images/bullseye.JPG' alt='Bulls Eye'/></TD><TD style='WIDTH: 70px; HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1>&nbsp;&nbsp;&nbsp;&nbsp; </TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right width=10 colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=4 class=lboldnew'>" + ttt + "</TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; TEXT-ALIGN: left' align=right></TD><TD style='TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; TEXT-ALIGN: left' align=left bgColor=#c7e290>User ID</TD><TD style='WIDTH: 126px' align=left bgColor=#c7e290>" + stuid + "</TD><TD style='WIDTH: 70px' align=left bgColor=#c7e290>Name</TD><TD align=left bgColor=#c7e290>" + stuname + "</TD><TD align=left></TD></TR><TR><TD style='WIDTH: 22px; TEXT-ALIGN: left' align=right></TD><TD style='TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; TEXT-ALIGN: left' align=left bgColor=#9bbb59>Test Centre</TD><TD align=left bgColor=#9bbb59 colSpan=3>" + centre + "</TD><TD align=left colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: left' align=right></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; HEIGHT: 21px; TEXT-ALIGN: left' align=left bgColor=#c7e290>Test Timing</TD><TD style='WIDTH: 126px; HEIGHT: 21px' align=left bgColor=#c7e290>" + timing + "</TD><TD style='WIDTH: 70px; HEIGHT: 21px' align=left bgColor=#c7e290>Test Name</TD><TD style='WIDTH: 179px; HEIGHT: 21px' align=left bgColor=#c7e290>" + toptext + "</TD><TD style='WIDTH: 179px; HEIGHT: 21px' align=left>&nbsp;&nbsp;&nbsp;&nbsp; </TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: left' align=right></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; HEIGHT: 21px; TEXT-ALIGN: left' align=left bgColor=#9bbb59>Test Date</TD><TD style='WIDTH: 126px; HEIGHT: 21px' align=left bgColor=#9bbb59>" + ondate + "</TD><TD style='WIDTH: 70px; HEIGHT: 21px' align=left bgColor=#9bbb59>PC No.</TD><TD style='HEIGHT: 21px' align=left bgColor=#9bbb59>" + pcno + "</TD><TD style='HEIGHT: 21px' align=left></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: left' align=right></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: left' align=right width=10></TD><TD style='HEIGHT: 21px' align=left colSpan=4>General Instructions for the Test:</TD><TD style='HEIGHT: 21px' align=left colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>1.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>Please carry one of the following as your ID proof whenever you shall be appearing for a  test (Bulls eye I-Card /Driving license/ PAN Card/Company or College I-Card /Voter I-Card). This I Card must clearly bear your First Name, Father’s Name & DOB. Without the valid document you will not be allowed to take the test under any circumstances.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>2.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>You should reach the test venue at least 15 minutes before the start of the test. Under no circumstances latecomers will not be entertained.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>3.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>You are required to bring your pen, pencil, and eraser.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>4.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>You can also cancel/Reschedule the booked test within certain time limit. Please go through the detailed Directions for the same given on the scheduling home page.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>5.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>In case a student fails to appear after booking a test more than twice, he/she she will be disqualified from the entire test series.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>6.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>Bulls eye holds the right to disqualify a candidate from the individual test/ complete test series incase he/she is found in any unfair practice/ mobile phone usage during the test.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR></TBODY></TABLE>";
    //    }
    //    //
       
    //    try
    //    {
    //        SmtpMail.Send(mailMessage);
    //    }

    //    catch
    //    {

    //    }

    //}



    //public void SendPIEmail(string ttt, int stuid, string to, string toptext, string centre, string timing, string ondate, string pcno)
    //{
    //    try
    //    {
            
    //    //////
    //        MailMessage mailMessage = new MailMessage();
    //        mailMessage.From = "administrator@hitbullseye.co.in";

    //        mailMessage.Subject = ttt;
    //        mailMessage.BodyFormat = MailFormat.Html;
           
    //        mailMessage.To = to;
    //        SmtpMail.SmtpServer = "mail.hitbullseye.co.in";
        
    //        commonclass clscon = new commonclass();
    //        string stuname = clscon.Return_string("select studentname from studentdetail where studentid=" + stuid + "");
    //        //

    //        mailMessage.Body = "<TABLE style='WIDTH: 840px'><TBODY><TR><TD style='WIDTH: 22px; HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right width=10 colSpan=3><img src='http://hitbullseye.com/Images/bullseye.JPG' alt='Bulls Eye'/></TD><TD style='WIDTH: 70px; HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1>&nbsp;&nbsp;&nbsp;&nbsp; </TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right width=10 colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=4 class=lboldnew'>" + ttt + "</TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; TEXT-ALIGN: left' align=right></TD><TD style='TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; TEXT-ALIGN: left' align=left bgColor=#c7e290>User ID</TD><TD style='WIDTH: 126px' align=left bgColor=#c7e290>" + stuid + "</TD><TD style='WIDTH: 70px' align=left bgColor=#c7e290>Name</TD><TD align=left bgColor=#c7e290>" + stuname + "</TD><TD align=left></TD></TR><TR><TD style='WIDTH: 22px; TEXT-ALIGN: left' align=right></TD><TD style='TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; TEXT-ALIGN: left' align=left bgColor=#9bbb59>PI Centre</TD><TD align=left bgColor=#9bbb59 colSpan=3>" + centre + "</TD><TD align=left colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: left' align=right></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; HEIGHT: 21px; TEXT-ALIGN: left' align=left bgColor=#c7e290>PI Timing</TD><TD style='WIDTH: 126px; HEIGHT: 21px' align=left bgColor=#c7e290>" + timing + "</TD><TD style='WIDTH: 70px; HEIGHT: 21px' align=left bgColor=#c7e290>PI Title</TD><TD style='WIDTH: 179px; HEIGHT: 21px' align=left bgColor=#c7e290>" + toptext + "</TD><TD style='WIDTH: 179px; HEIGHT: 21px' align=left>&nbsp;&nbsp;&nbsp;&nbsp; </TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: left' align=right></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; HEIGHT: 21px; TEXT-ALIGN: left' align=left bgColor=#9bbb59>PI Date</TD><TD style='WIDTH: 126px; HEIGHT: 21px' align=left bgColor=#9bbb59>" + ondate + "</TD><TD style='WIDTH: 70px; HEIGHT: 21px' align=left bgColor=#9bbb59>Room No.</TD><TD style='HEIGHT: 21px' align=left bgColor=#9bbb59>" + pcno + "</TD><TD style='HEIGHT: 21px' align=left></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: left' align=right></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: left' align=right width=10></TD><TD style='HEIGHT: 21px' align=left colSpan=4>General Instructions for the PI:</TD><TD style='HEIGHT: 21px' align=left colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>1.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>Please carry your completely filled Resume as provided with Bull Persona. Interview will NOT be conducted under any circumstances without completely filled Resume. Copy of the Resume can be also downloaded from the link provided in the PI booking Panel.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>2.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>We recommend you to wear Formal dress to get the real feel of the interview.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>3.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>Report for the booked PI at least 15 minutes before the starting time of the PI. Latecomers will not be allowed.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>4.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>A student can take only 2 interviews in the whole PI practice cycle. The duration of each PI will be approximately 20 minutes.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>5.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>Kindly check the booking history after booking/canceling/Rescheduling a PI.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>6.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>Bulls eye holds the right to disqualify a candidate from a PI /complete PI series incase he/she is found in any unfair practice/conduct during the whole PI process.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR></TBODY></TABLE>";
    //        try
    //        {
    //            SmtpMail.Send(mailMessage);
    //        }

    //        catch
    //        {

    //        }
    //    }
    //    catch
    //    {
    //    }

    //}
    //public void SendGDEmailK(string ttt, int stuid, string to, string toptext, string centre, string timing, string ondate, string pcno)
    //{
    //    try
    //    {
    //        //
    //        MailMessage mailMessage = new MailMessage();
    //        mailMessage.From = "administrator@hitbullseye.co.in";

    //        mailMessage.Subject = ttt;
    //        mailMessage.BodyFormat = MailFormat.Html;

    //        mailMessage.To = to;
    //        SmtpMail.SmtpServer = "mail.hitbullseye.co.in";

    //        commonclass clscon = new commonclass();
    //        string stuname = clscon.Return_string("select studentname from studentdetail where studentid=" + stuid + "");

    //        mailMessage.Body = "<TABLE style='WIDTH: 840px'><TBODY><TR><TD style='WIDTH: 22px; HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right width=10 colSpan=3><img src='http://hitbullseye.com/Images/bullseye.JPG' alt='Bulls Eye'/></TD><TD style='WIDTH: 70px; HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1>&nbsp;&nbsp;&nbsp;&nbsp; </TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right width=10 colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=4 class=lboldnew'>" + ttt + "</TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; TEXT-ALIGN: left' align=right></TD><TD style='TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; TEXT-ALIGN: left' align=left bgColor=#c7e290>User ID</TD><TD style='WIDTH: 126px' align=left bgColor=#c7e290>" + stuid + "</TD><TD style='WIDTH: 70px' align=left bgColor=#c7e290>Name</TD><TD align=left bgColor=#c7e290>" + stuname + "</TD><TD align=left></TD></TR><TR><TD style='WIDTH: 22px; TEXT-ALIGN: left' align=right></TD><TD style='TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; TEXT-ALIGN: left' align=left bgColor=#9bbb59>GD Centre</TD><TD align=left bgColor=#9bbb59 colSpan=3>" + centre + "</TD><TD align=left colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: left' align=right></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; HEIGHT: 21px; TEXT-ALIGN: left' align=left bgColor=#c7e290>GD Timing</TD><TD style='WIDTH: 126px; HEIGHT: 21px' align=left bgColor=#c7e290>" + timing + "</TD><TD style='WIDTH: 70px; HEIGHT: 21px' align=left bgColor=#c7e290>GD Title</TD><TD style='WIDTH: 179px; HEIGHT: 21px' align=left bgColor=#c7e290>" + toptext + "</TD><TD style='WIDTH: 179px; HEIGHT: 21px' align=left>&nbsp;&nbsp;&nbsp;&nbsp; </TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: left' align=right></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; HEIGHT: 21px; TEXT-ALIGN: left' align=left bgColor=#9bbb59>GD Date</TD><TD style='WIDTH: 126px; HEIGHT: 21px' align=left bgColor=#9bbb59>" + ondate + "</TD><TD style='WIDTH: 70px; HEIGHT: 21px' align=left bgColor=#9bbb59>Room No.</TD><TD style='HEIGHT: 21px' align=left bgColor=#9bbb59>" + pcno + "</TD><TD style='HEIGHT: 21px' align=left></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: left' align=right></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: left' align=right width=10></TD><TD style='HEIGHT: 21px' align=left colSpan=4>General Instructions for the GD:</TD><TD style='HEIGHT: 21px' align=left colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>1.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>Kindly dress formally & carry your dully filled application form and all necessary certificates for the interview process along with CAT/MAT score card.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>2.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>Kindly reach on time at the venue and do not be late for the selection process.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>3.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>Keep in mind that you can select a maximum of 5 institutes to appear for Group Discussions and Personal Interviews. In case you are interested in applying to more B-Schools, it would be the Institute’s discretion to entertain your application on the spot.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>4.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>For direction to the seminar hall/GD venue, Contact help desk stall Kaleidoscope fair.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR></TBODY></TABLE>";
    //        try
    //        {
    //            SmtpMail.Send(mailMessage);
    //        }

    //        catch
    //        {

    //        }
    //        //
    //        //////new
    //        ////MailMessage mailMessage = new MailMessage();
    //        ////SmtpClient smp = new SmtpClient();
    //        ////NetworkCredential cred = new NetworkCredential("postmaster", "");
    //        //////smp.Host = "mail.hitbullseye.com";
    //        ////smp.Host = "127.0.0.1";

    //        ////smp.Port = 25;
    //        ////smp.UseDefaultCredentials = true;
    //        ////smp.Credentials = cred;

    //        ////MailAddress fromAddress = new MailAddress("admin@hitbullseye.com");
    //        ////mailMessage.From = fromAddress;
    //        ////mailMessage.Subject = ttt;
    //        ////mailMessage.IsBodyHtml = true;
    //        ////mailMessage.Body = "<TABLE style='WIDTH: 840px'><TBODY><TR><TD style='WIDTH: 22px; HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right width=10 colSpan=3><img src='http://hitbullseye.com/Images/bullseye.JPG' alt='Bulls Eye'/></TD><TD style='WIDTH: 70px; HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1>&nbsp;&nbsp;&nbsp;&nbsp; </TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right width=10 colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=4 class=lboldnew'>" + ttt + "</TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; TEXT-ALIGN: left' align=right></TD><TD style='TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; TEXT-ALIGN: left' align=left bgColor=#c7e290>User ID</TD><TD style='WIDTH: 126px' align=left bgColor=#c7e290>" + stuid + "</TD><TD style='WIDTH: 70px' align=left bgColor=#c7e290>Name</TD><TD align=left bgColor=#c7e290>" + stuname + "</TD><TD align=left></TD></TR><TR><TD style='WIDTH: 22px; TEXT-ALIGN: left' align=right></TD><TD style='TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; TEXT-ALIGN: left' align=left bgColor=#9bbb59>Test Centre</TD><TD align=left bgColor=#9bbb59 colSpan=3>" + centre + "</TD><TD align=left colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: left' align=right></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; HEIGHT: 21px; TEXT-ALIGN: left' align=left bgColor=#c7e290>Test Timing</TD><TD style='WIDTH: 126px; HEIGHT: 21px' align=left bgColor=#c7e290>" + timing + "</TD><TD style='WIDTH: 70px; HEIGHT: 21px' align=left bgColor=#c7e290>Test Name</TD><TD style='WIDTH: 179px; HEIGHT: 21px' align=left bgColor=#c7e290>" + toptext + "</TD><TD style='WIDTH: 179px; HEIGHT: 21px' align=left>&nbsp;&nbsp;&nbsp;&nbsp; </TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: left' align=right></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; HEIGHT: 21px; TEXT-ALIGN: left' align=left bgColor=#9bbb59>Test Date</TD><TD style='WIDTH: 126px; HEIGHT: 21px' align=left bgColor=#9bbb59>" + ondate + "</TD><TD style='WIDTH: 70px; HEIGHT: 21px' align=left bgColor=#9bbb59>PC No.</TD><TD style='HEIGHT: 21px' align=left bgColor=#9bbb59>" + pcno + "</TD><TD style='HEIGHT: 21px' align=left></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: left' align=right></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: left' align=right width=10></TD><TD style='HEIGHT: 21px' align=left colSpan=4>General Instructions for the Test:</TD><TD style='HEIGHT: 21px' align=left colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>1.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>Please carry one of the following as your ID proof whenever you shall be appearing for a  test (Bulls eye I-Card /Driving license/ PAN Card/Company or College I-Card /Voter I-Card). This I Card must clearly bear your First Name, Father’s Name & DOB. Without the valid document you will not be allowed to take the test under any circumstances.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>2.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>You should reach the test venue at least 15 minutes before the start of the test. Under no circumstances latecomers will not be entertained.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>3.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>You are required to bring your pen, pencil, and eraser.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>4.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>You can also cancel/Reschedule the booked test within certain time limit. Please go through the detailed Directions for the same given on the scheduling home page.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>5.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>In case a student fails to appear after booking a test more than twice, he/she she will be disqualified from the entire test series.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>6.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>Bulls eye holds the right to disqualify a candidate from the individual test/ complete test series incase he/she is found in any unfair practice/ mobile phone usage during the test.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR></TBODY></TABLE>";
    //        ////mailMessage.To.Add(to);


    //        ////smp.Send(mailMessage);
    //        //

    //    }
    //    catch
    //    {
    //    }

    //}
    //public void SendGDEmail(string ttt, int stuid, string to, string toptext, string centre, string timing, string ondate, string pcno)
    //{
    //    try
    //    {
    //        //
    //        MailMessage mailMessage = new MailMessage();
    //        mailMessage.From = "administrator@hitbullseye.co.in";

    //        mailMessage.Subject = ttt;
    //        mailMessage.BodyFormat = MailFormat.Html;

    //        mailMessage.To = to;
    //        SmtpMail.SmtpServer = "mail.hitbullseye.co.in";

    //        commonclass clscon = new commonclass(); 
    //        string stuname = clscon.Return_string("select studentname from studentdetail where studentid=" + stuid + "");
          
    //        mailMessage.Body = "<TABLE style='WIDTH: 840px'><TBODY><TR><TD style='WIDTH: 22px; HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right width=10 colSpan=3><img src='http://hitbullseye.com/Images/bullseye.JPG' alt='Bulls Eye'/></TD><TD style='WIDTH: 70px; HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1>&nbsp;&nbsp;&nbsp;&nbsp; </TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right width=10 colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=4 class=lboldnew'>" + ttt + "</TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; TEXT-ALIGN: left' align=right></TD><TD style='TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; TEXT-ALIGN: left' align=left bgColor=#c7e290>User ID</TD><TD style='WIDTH: 126px' align=left bgColor=#c7e290>" + stuid + "</TD><TD style='WIDTH: 70px' align=left bgColor=#c7e290>Name</TD><TD align=left bgColor=#c7e290>" + stuname + "</TD><TD align=left></TD></TR><TR><TD style='WIDTH: 22px; TEXT-ALIGN: left' align=right></TD><TD style='TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; TEXT-ALIGN: left' align=left bgColor=#9bbb59>GD Centre</TD><TD align=left bgColor=#9bbb59 colSpan=3>" + centre + "</TD><TD align=left colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: left' align=right></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; HEIGHT: 21px; TEXT-ALIGN: left' align=left bgColor=#c7e290>GD Timing</TD><TD style='WIDTH: 126px; HEIGHT: 21px' align=left bgColor=#c7e290>" + timing + "</TD><TD style='WIDTH: 70px; HEIGHT: 21px' align=left bgColor=#c7e290>GD Title</TD><TD style='WIDTH: 179px; HEIGHT: 21px' align=left bgColor=#c7e290>" + toptext + "</TD><TD style='WIDTH: 179px; HEIGHT: 21px' align=left>&nbsp;&nbsp;&nbsp;&nbsp; </TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: left' align=right></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; HEIGHT: 21px; TEXT-ALIGN: left' align=left bgColor=#9bbb59>GD Date</TD><TD style='WIDTH: 126px; HEIGHT: 21px' align=left bgColor=#9bbb59>" + ondate + "</TD><TD style='WIDTH: 70px; HEIGHT: 21px' align=left bgColor=#9bbb59>Room/Hall</TD><TD style='HEIGHT: 21px' align=left bgColor=#9bbb59>" + pcno + "</TD><TD style='HEIGHT: 21px' align=left></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: left' align=right></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: left' align=right width=10></TD><TD style='HEIGHT: 21px' align=left colSpan=4>General Instructions for the GD:</TD><TD style='HEIGHT: 21px' align=left colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>1.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>Please carry one of the following as your ID proof whenever you shall be appearing for a GD(Bulls eye I-Card /Driving license/ PAN Card/Company or College I-Card /Voter I-Card). This I-Card must clearly bear your First Name, Father’s Name & DOB. Without the valid document you will not be allowed to appear in the GD under any circumstances.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>2.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>It is recommend to come prepared for the GD. The topics for the day are attached in PDF file/ Click on the link to see the daily GD topics.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>3.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>You should reach the GD venue at least 15 minutes before the start of the test. Under no circumstances latecomers will not be entertained.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>4.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>You are required to bring your pen, pencil, and eraser etc. No material will be provided at the GD venue.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>5.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>You can also cancel GD slot within certain time limit. Please go through the detailed Directions for the same given on the scheduling home page.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>6.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>Bulls eye holds the right to disqualify a candidate from a GD/ complete GD series incase he/she is found in any unfair practice/conduct during the whole GD process.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR></TBODY></TABLE>";
    //        try
    //        {
    //            SmtpMail.Send(mailMessage);
    //        }

    //        catch
    //        {

    //        }    
    //        //
    //        //////new
    //        ////MailMessage mailMessage = new MailMessage();
    //        ////SmtpClient smp = new SmtpClient();
    //        ////NetworkCredential cred = new NetworkCredential("postmaster", "");
    //        //////smp.Host = "mail.hitbullseye.com";
    //        ////smp.Host = "127.0.0.1";

    //        ////smp.Port = 25;
    //        ////smp.UseDefaultCredentials = true;
    //        ////smp.Credentials = cred;

    //        ////MailAddress fromAddress = new MailAddress("admin@hitbullseye.com");
    //        ////mailMessage.From = fromAddress;
    //        ////mailMessage.Subject = ttt;
    //        ////mailMessage.IsBodyHtml = true;
    //        ////mailMessage.Body = "<TABLE style='WIDTH: 840px'><TBODY><TR><TD style='WIDTH: 22px; HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right width=10 colSpan=3><img src='http://hitbullseye.com/Images/bullseye.JPG' alt='Bulls Eye'/></TD><TD style='WIDTH: 70px; HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1>&nbsp;&nbsp;&nbsp;&nbsp; </TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right width=10 colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=4 class=lboldnew'>" + ttt + "</TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; TEXT-ALIGN: left' align=right></TD><TD style='TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; TEXT-ALIGN: left' align=left bgColor=#c7e290>User ID</TD><TD style='WIDTH: 126px' align=left bgColor=#c7e290>" + stuid + "</TD><TD style='WIDTH: 70px' align=left bgColor=#c7e290>Name</TD><TD align=left bgColor=#c7e290>" + stuname + "</TD><TD align=left></TD></TR><TR><TD style='WIDTH: 22px; TEXT-ALIGN: left' align=right></TD><TD style='TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; TEXT-ALIGN: left' align=left bgColor=#9bbb59>Test Centre</TD><TD align=left bgColor=#9bbb59 colSpan=3>" + centre + "</TD><TD align=left colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: left' align=right></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; HEIGHT: 21px; TEXT-ALIGN: left' align=left bgColor=#c7e290>Test Timing</TD><TD style='WIDTH: 126px; HEIGHT: 21px' align=left bgColor=#c7e290>" + timing + "</TD><TD style='WIDTH: 70px; HEIGHT: 21px' align=left bgColor=#c7e290>Test Name</TD><TD style='WIDTH: 179px; HEIGHT: 21px' align=left bgColor=#c7e290>" + toptext + "</TD><TD style='WIDTH: 179px; HEIGHT: 21px' align=left>&nbsp;&nbsp;&nbsp;&nbsp; </TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: left' align=right></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; HEIGHT: 21px; TEXT-ALIGN: left' align=left bgColor=#9bbb59>Test Date</TD><TD style='WIDTH: 126px; HEIGHT: 21px' align=left bgColor=#9bbb59>" + ondate + "</TD><TD style='WIDTH: 70px; HEIGHT: 21px' align=left bgColor=#9bbb59>PC No.</TD><TD style='HEIGHT: 21px' align=left bgColor=#9bbb59>" + pcno + "</TD><TD style='HEIGHT: 21px' align=left></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: left' align=right></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: left' align=right width=10></TD><TD style='HEIGHT: 21px' align=left colSpan=4>General Instructions for the Test:</TD><TD style='HEIGHT: 21px' align=left colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>1.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>Please carry one of the following as your ID proof whenever you shall be appearing for a  test (Bulls eye I-Card /Driving license/ PAN Card/Company or College I-Card /Voter I-Card). This I Card must clearly bear your First Name, Father’s Name & DOB. Without the valid document you will not be allowed to take the test under any circumstances.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>2.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>You should reach the test venue at least 15 minutes before the start of the test. Under no circumstances latecomers will not be entertained.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>3.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>You are required to bring your pen, pencil, and eraser.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>4.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>You can also cancel/Reschedule the booked test within certain time limit. Please go through the detailed Directions for the same given on the scheduling home page.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>5.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>In case a student fails to appear after booking a test more than twice, he/she she will be disqualified from the entire test series.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>6.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>Bulls eye holds the right to disqualify a candidate from the individual test/ complete test series incase he/she is found in any unfair practice/ mobile phone usage during the test.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR></TBODY></TABLE>";
    //        ////mailMessage.To.Add(to);


    //        ////smp.Send(mailMessage);
    //        //

    //    }
    //    catch
    //    {
    //    }

    //}
    //public void SendTestEmailN(string ttt, int stuid, string to, string toptext, string centre, string timing, string ondate, string pcno)
    //{
    //    try
    //    {

    //        MailMessage mailMessage = new MailMessage();
    //        mailMessage.From = "administrator@hitbullseye.co.in";

    //        mailMessage.Subject = ttt;
    //        mailMessage.BodyFormat = MailFormat.Html;

    //        mailMessage.To = to;
    //        SmtpMail.SmtpServer = "mail.hitbullseye.co.in";
    //        commonclass clscon = new commonclass();
    //        string stuname = clscon.Return_string("select studentname from studentdetail where studentid=" + stuid + "");
    //        //
    //        mailMessage.Body = "<TABLE style='WIDTH: 840px'><TBODY><TR><TD style='WIDTH: 22px; HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right width=10 colSpan=3><img src='http://hitbullseye.com/Images/bullseye.JPG' alt='Bulls Eye'/></TD><TD style='WIDTH: 70px; HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1>&nbsp;&nbsp;&nbsp;&nbsp; </TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right width=10 colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=4 class=lboldnew'>" + ttt + "</TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; TEXT-ALIGN: left' align=right></TD><TD style='TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; TEXT-ALIGN: left' align=left bgColor=#c7e290>User ID</TD><TD style='WIDTH: 126px' align=left bgColor=#c7e290>" + stuid + "</TD><TD style='WIDTH: 70px' align=left bgColor=#c7e290>Name</TD><TD align=left bgColor=#c7e290>" + stuname + "</TD><TD align=left></TD></TR><TR><TD style='WIDTH: 22px; TEXT-ALIGN: left' align=right></TD><TD style='TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; TEXT-ALIGN: left' align=left bgColor=#9bbb59>Test Centre</TD><TD align=left bgColor=#9bbb59 colSpan=3>" + centre + "</TD><TD align=left colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: left' align=right></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; HEIGHT: 21px; TEXT-ALIGN: left' align=left bgColor=#c7e290>Test Timing</TD><TD style='WIDTH: 126px; HEIGHT: 21px' align=left bgColor=#c7e290>" + timing + "</TD><TD style='WIDTH: 70px; HEIGHT: 21px' align=left bgColor=#c7e290>Test Name</TD><TD style='WIDTH: 179px; HEIGHT: 21px' align=left bgColor=#c7e290>" + toptext + "</TD><TD style='WIDTH: 179px; HEIGHT: 21px' align=left>&nbsp;&nbsp;&nbsp;&nbsp; </TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: left' align=right></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; HEIGHT: 21px; TEXT-ALIGN: left' align=left bgColor=#9bbb59>Test Date</TD><TD style='WIDTH: 126px; HEIGHT: 21px' align=left bgColor=#9bbb59>" + ondate + "</TD><TD style='WIDTH: 70px; HEIGHT: 21px' align=left bgColor=#9bbb59>PC No.</TD><TD style='HEIGHT: 21px' align=left bgColor=#9bbb59>" + pcno + "</TD><TD style='HEIGHT: 21px' align=left></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: left' align=right></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: left' align=right width=10></TD><TD style='HEIGHT: 21px' align=left colSpan=4>General Instructions for the Test:</TD><TD style='HEIGHT: 21px' align=left colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>1.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>Please carry one of the following as your ID proof whenever you shall be appearing for a  test (Bulls eye I-Card /Driving license/ PAN Card/Company or College I-Card /Voter I-Card). This I Card must clearly bear your First Name, Father’s Name & DOB. Without the valid document you will not be allowed to take the test under any circumstances.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>2.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>You should reach the test venue at least 15 minutes before the start of the test. Under no circumstances latecomers will not be entertained.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>3.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>You are required to bring your pen, pencil, and eraser.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>4.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>A student appearing for this test wouldn’t be eligible to take any subsequent scholarships tests.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1>5.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>Bulls eye holds the right to disqualify a candidate from entitlement to any kind of scholarship incase he/she is found in any unfair practice/ mobile phone usage during the test.</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR></TBODY></TABLE>";
    //        try
    //        {
    //            SmtpMail.Send(mailMessage);
    //        }

    //        catch
    //        {

    //        }    
     
    //        //
    //    }
    //    catch
    //    {
    //    }

    //}
    //public void SendTestEmailSimple(string to, string toptext)
    //{
    //    try
    //    {


    //        MailMessage objMailMsg = new MailMessage("mail@cybrain.co.in", to);


    //        objMailMsg.Subject = "Bulls Eye";
    //        objMailMsg.Body = "<table width='604' border='1'><tr><td colspan='2' class='boldtext'><span class='lbold'>Bulls Eye</span>-<strong>" + toptext + "</strong></td></tr></table>";
    //        objMailMsg.Priority = MailPriority.High;
    //        objMailMsg.IsBodyHtml = true;

    //        //prepare to send mail via SMTP transport
    //        SmtpClient objSMTPClient = new SmtpClient();
    //        objSMTPClient.UseDefaultCredentials = true;
    //        objSMTPClient.DeliveryMethod = SmtpDeliveryMethod.PickupDirectoryFromIis;
    //        objSMTPClient.Send(objMailMsg);

         
    //    }
    //    catch (Exception ex)
    //    {

    //    }
    //}
    //public void SendWorkshopEmail(string to, string toptext, string title, string ddate, string tttime, string venue)
    //{
    //    try
    //    {


    //        MailMessage mailMessage = new MailMessage();
    //        mailMessage.From = "administrator@hitbullseye.co.in";

    //        mailMessage.Subject = "Bulls Eye";
    //        mailMessage.BodyFormat = MailFormat.Html;

    //        mailMessage.To = to;
    //        SmtpMail.SmtpServer = "mail.hitbullseye.co.in"; 
         
                
    //                mailMessage.Body = "<table width='604' border='1'><tr><td colspan='2' class='boldtext'><span class='lbold'>Bulls Eye</span>-<strong>" + toptext + "</strong></td></tr><tr><td width='233'>Title</td><td width='355'>" + title + "</td></tr><tr><td>Workshop Date</td><td>" + ddate + "</td></tr><tr><td>Timing</td><td>" + tttime + "</td></tr><tr><td>Venue:- </td><td>" + venue + "</td></tr><tr><td>Direction For Test</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>You Have To Bring This</td></tr><tr><td>&nbsp;</td><td>You Have To Bring This</td></tr></table>";
    //                try
    //                {
    //                    SmtpMail.Send(mailMessage);
    //                }

    //                catch
    //                {

    //                }

    //    }
    //    catch (Exception ex)
    //    {

    //    }
    //}
    //public void sendworkshopemailwid(int stuid, int wid, string toptext)
    //{
    //    MailMessage mailMessage = new MailMessage();
    //    mailMessage.From = "administrator@hitbullseye.co.in";

       
    //    mailMessage.BodyFormat = MailFormat.Html;

        
    //    SmtpMail.SmtpServer = "mail.hitbullseye.co.in"; 
         
    //    commonclass clscon = new commonclass();
    //    DataSet ds = new DataSet();
    //    string stuname = clscon.Return_string("select studentname from studentdetail where studentid=" + stuid + "");
    //    clscon.Return_DS(ds, "select * from workshopbookingslots where wid=" + wid + "");
    //    string wtitle = clscon.Return_string("Select workshoptitle from workshopbooking where workshopid=" + Convert.ToInt32(ds.Tables[0].Rows[0]["workshopid"]) + "");
    //    toptext = toptext + " - Workshop Name:" + wtitle;
    //    int venue = Convert.ToInt32(ds.Tables[0].Rows[0]["venueid"]);
    //    string wvenue = clscon.Return_string("select venue from venuemasterworkshop where venueid=" + venue + "");
    //    int facid = Convert.ToInt32(ds.Tables[0].Rows[0]["facultyid"]);
    //    string Directions = ds.Tables[0].Rows[0]["directions"].ToString();
    //    string faculity = clscon.Return_string("select facultyname from workshopfacultymaster where facultyid=" + facid + "");
    //    DateTime tdate;
    //    tdate = Convert.ToDateTime(ds.Tables[0].Rows[0]["wstartdate"]);
    //    string wsdt, wenddt;
    //    wsdt = tdate.ToString("yyyy/MM/dd");
    //    TimeSpan tstime, tetime;
    //    tstime = (TimeSpan)(ds.Tables[0].Rows[0]["starttime"]);
    //    tetime = (TimeSpan)(ds.Tables[0].Rows[0]["endtime"]);
    //    String td;
    //    td = tdate.ToString("D");
    //    string wdate = td;
    //    string wtime = clscon.ConvertTimeHSAMPM(tstime.ToString()) + " - " + clscon.ConvertTimeHSAMPM(tetime.ToString());
    //    try
    //    {
    //        //GODADDY EMAIL
            
    //         //mailMessage.Body = "<table width='604' border='1'><tr><td colspan='2' class='boldtext'><span class='lbold'>Bulls Eye</span>-<strong>" + toptext + "</strong></td></tr><tr><td width='233'>Title</td><td width='355'>" + wtitle + "</td></tr><tr><td>Workshop Date</td><td>" + wdate + "</td></tr><tr><td>Timing</td><td>" + wtime + "</td></tr><tr><td>Venue:- </td><td>" + wvenue + "</td></tr><tr><td>Direction For Test</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>You Have To Bring This</td></tr><tr><td>&nbsp;</td><td>You Have To Bring This</td></tr></table>";
    //        string des = clscon.Return_string("select des from workshopbookingslots where wid=" + wid + "");
    //        string firstpart = "<TABLE style='WIDTH: 840px'><TBODY><TR><TD style='WIDTH: 22px; HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right width=10 colSpan=3><img src='http://hitbullseye.com/Images/bullseye.JPG' alt='Bulls Eye'/></TD><TD style='WIDTH: 70px; HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1>&nbsp;&nbsp;&nbsp;&nbsp; </TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right width=10 colSpan=1></TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=4 class=lboldnew'>" + toptext + "</TD><TD style='HEIGHT: 40px; TEXT-ALIGN: left' align=right colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; TEXT-ALIGN: left' align=right></TD><TD style='TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; TEXT-ALIGN: left' align=left bgColor=#c7e290>User ID</TD><TD style='WIDTH: 126px' align=left bgColor=#c7e290>" + stuid + "</TD><TD style='WIDTH: 70px' align=left bgColor=#c7e290>Name</TD><TD align=left bgColor=#c7e290>" + stuname + "</TD><TD align=left></TD></TR><TR><TD style='WIDTH: 22px; TEXT-ALIGN: left' align=right></TD><TD style='TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; TEXT-ALIGN: left' align=left bgColor=#9bbb59>Workshop Centre</TD><TD align=left bgColor=#9bbb59 colSpan=3>" + wvenue + "</TD><TD align=left colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: left' align=right></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; HEIGHT: 21px; TEXT-ALIGN: left' align=left bgColor=#c7e290>Timing</TD><TD style='WIDTH: 126px; HEIGHT: 21px' align=left bgColor=#c7e290>" + wtime + "</TD><TD style='WIDTH: 100px; HEIGHT: 21px' align=left bgColor=#c7e290>Workshop Code</TD><TD style='WIDTH: 179px; HEIGHT: 21px' align=left bgColor=#c7e290>" + ds.Tables[0].Rows[0]["code"].ToString() + "</TD><TD style='WIDTH: 179px; HEIGHT: 21px' align=left>&nbsp;&nbsp;&nbsp;&nbsp; </TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: left' align=right></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: left' align=right width=10></TD><TD style='WIDTH: 13%; HEIGHT: 21px; TEXT-ALIGN: left' align=left bgColor=#9bbb59>On Date</TD><TD style='WIDTH: 126px; HEIGHT: 21px' align=left bgColor=#9bbb59>" + wdate + "</TD><TD style='WIDTH: 70px; HEIGHT: 21px' align=left bgColor=#9bbb59>Faculty</TD><TD style='HEIGHT: 21px' align=left bgColor=#9bbb59>" + faculity + "</TD><TD style='HEIGHT: 21px' align=left></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: left' align=right></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: left' align=right width=10></TD><TD style='HEIGHT: 21px' align=left colSpan=4><b>Description:</b></TD><TD style='HEIGHT: 21px' align=left colSpan=1></TD></TR><TR><TD style='WIDTH: 22px; HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' vAlign=top align=right width=10 colSpan=1></TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=4>" + des + "</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR></TBODY></TABLE>";

    //        //NEW

    //        DataSet ds1 = new DataSet();
    //        clscon.Return_DS(ds1, "select * from workshopparts where wid=" + wid + " order by partno");

    //        int venueid, facultyid;
    //        int r;
    //        string tblpart = "<Table width='700' border='1' bgcolor='#FFFFCC'><tr><td width='70'>Part No.: </td><td>On Date: </td><td>Start Time: </td><td>End Time: </td><td>Venue: </td><td>Faculty: </td></tr>";

    //        for (r = 0; r <= ds1.Tables[0].Rows.Count - 1; r++)
    //        {
    //            tblpart = tblpart + "<tr>";
    //            int pno = r + 1;
    //            venueid = Convert.ToInt32(ds1.Tables[0].Rows[r]["venueid"]);
    //            facultyid = Convert.ToInt32(ds1.Tables[0].Rows[r]["facultyid"]);
    //            string vipvenue = clscon.Return_string("select venue from venuemasterworkshop where venueid=" + venueid + "");
    //            string vipfaculty = clscon.Return_string("select facultyname from workshopfacultymaster where facultyid=" + facultyid + "");
    //            string vipstarttime = clscon.ConvertTimeHSAMPM(ds1.Tables[0].Rows[r]["starttime"].ToString());
    //            string vipendtime = clscon.ConvertTimeHSAMPM(ds1.Tables[0].Rows[r]["endtime"].ToString());
    //            tblpart = tblpart + "<td>" + pno.ToString() + "</td>";
    //            tblpart = tblpart + "<td>" + Convert.ToDateTime(ds1.Tables[0].Rows[r]["ondate"]).ToString("dd/MM/yyyy") + "</td>";
    //            tblpart = tblpart + "<td>" + vipstarttime + "</td>";
    //            tblpart = tblpart + "<td>" + vipendtime + "</td>";
    //            tblpart = tblpart + "<td>" + vipvenue + "</td>";
    //            tblpart = tblpart + "<td>" + vipfaculty + "</td>";
    //            tblpart = tblpart + "</tr>";
    //        }
    //        tblpart = tblpart + "<TR><TD style='HEIGHT: 21px' align=left colSpan=6><b>General Instructions for the Workshop:</b></TD><TD style='HEIGHT: 21px' align=left colSpan=1></TD></TR><TR><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=6>" + Directions + "</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR></Table>";
    //        if (ds1.Tables[0].Rows.Count >= 2)
    //        {
    //            string vrs = firstpart + tblpart;
    //            mailMessage.Body = vrs;
    //        }
    //        else
    //        {
    //            tblpart = "<Table><TR><TD style='HEIGHT: 21px' align=left colSpan=6><b>General Instructions for the Workshop:</b></TD><TD style='HEIGHT: 21px' align=left colSpan=1></TD></TR><TR><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=6>" + Directions + "</TD><TD style='HEIGHT: 21px; TEXT-ALIGN: justify' align=right colSpan=1></TD></TR></Table>";
    //            mailMessage.Body = firstpart + tblpart;
    //        }
    //        //END NEW
          
          

    //        ////

          
    //        mailMessage.To = clscon.Return_string("select studentemail from studentdetail where studentid=" + stuid + "");
    //        mailMessage.Subject ="Bulls Eye,Workshop Scheduling";
            
    //        try
    //        {
    //            SmtpMail.Send(mailMessage);
    //        }

    //        catch
    //        {

    //        }
 
    //        ////
    //    }
    //    catch (Exception ex)
    //    {

    //    }
    //}
    //public string sendworkshopmsg(int stuid, int wid, string toptext)
    //{

    //    string url = "";
    //    commonclass clscon = new commonclass();
    //    DataSet ds = new DataSet();
    //    clscon.Return_DS(ds, "select * from workshopbookingslots where wid=" + wid + "");
    //    //
    //    DataSet ds1 = new DataSet();
    //    clscon.Return_DS(ds1, "select * from workshopparts where wid=" + wid + " order by partno");
    //    string stuname = clscon.Return_string("select studentname from studentdetail where studentid=" + stuid + "");
    //    int facid = Convert.ToInt32(ds.Tables[0].Rows[0]["facultyid"]);
    //    string Directions = ds.Tables[0].Rows[0]["directions"].ToString();
    //    string code = ds.Tables[0].Rows[0]["code"].ToString();
    //    string faculity = clscon.Return_string("select facultyname from workshopfacultymaster where facultyid=" + facid + "");
    //    //
    //    string wtitle = clscon.Return_string("Select workshoptitle from workshopbooking where workshopid=" + Convert.ToInt32(ds.Tables[0].Rows[0]["workshopid"]) + "");

    //    int venue = Convert.ToInt32(ds.Tables[0].Rows[0]["venueid"]);
    //    string wvenue = clscon.Return_string("select venue from venuemasterworkshop where venueid=" + venue + "");
    //    DateTime tdate;
    //    tdate = Convert.ToDateTime(ds.Tables[0].Rows[0]["wstartdate"]);
    //    string wsdt, wenddt;
    //    wsdt = tdate.ToString("yyyy/MM/dd");
    //    TimeSpan tstime, tetime;
    //    tstime = (TimeSpan)(ds.Tables[0].Rows[0]["starttime"]);
    //    tetime = (TimeSpan)(ds.Tables[0].Rows[0]["endtime"]);
    //    String td;
    //    td = tdate.ToString("D");
    //    string wdate = td;
    //    string wtime = clscon.ConvertTimeHSAMPM(tstime.ToString()) + " - " + clscon.ConvertTimeHSAMPM(tetime.ToString());
    //    string mblno = clscon.Return_string("select studentmobile from studentdetail where studentid=" + stuid + "");
    //    String result = "";
    //    if ((mblno != "0") && (mblno != ""))
    //    {
    //        string read;
    //        string msg;
    //        if (ds1.Tables[0].Rows.Count >= 2)
    //        {
    //            msg = "" + toptext + ":" + wtitle + "," + code + ",Parts-" + ds1.Tables[0].Rows.Count + ",Stu ID-" + stuid + "," + wdate + "," + wtime + "," + wvenue + "," + faculity + ",view details online in workshop history";
    //        }
    //        else
    //        {
    //            msg = "" + toptext + ":" + wtitle + "," + code + ",Stu ID-" + stuid + "," + wdate + "," + wtime + "," + wvenue + "," + faculity + "";
    //        }
    //        if (msg.Contains("&") == true)
    //        {
    //            msg = msg.Replace("&", "and");
    //        }
    //        url = "http://203.129.203.243/blank/sms/user/urlsms.php?username=bullseye1&pass=rakeshrai&senderid=BullsEye& message=" + msg + " &dest_mobileno=" + mblno + "&response=Y";
        

    //        String strPost = "";
    //        StreamWriter myWriter = null;

    //        HttpWebRequest objRequest = (HttpWebRequest)WebRequest.Create(url);
    //        objRequest.Method = "POST";
    //        objRequest.ContentLength = strPost.Length;
    //        objRequest.ContentType = "application/x-www-form-urlencoded";

    //        try
    //        {
    //            myWriter = new StreamWriter(objRequest.GetRequestStream());
    //            myWriter.Write(strPost);
    //        }
    //        catch (Exception e)
    //        {
    //            return e.Message;
    //        }
    //        finally
    //        {
    //            myWriter.Close();
    //        }

    //        HttpWebResponse objResponse = (HttpWebResponse)objRequest.GetResponse();
    //        using (StreamReader sr =
    //           new StreamReader(objResponse.GetResponseStream()))
    //        {
    //            result = sr.ReadToEnd();

    //            // Close and clean up the StreamReader
    //            sr.Close();
    //        }
    //    }
    //    return result;
       
    //}
    public string sendworkshopmsgKalidoscope(int stuid, int wid, string toptext)
    {
        string url = "";
        commonclass clscon = new commonclass();
        DataSet ds = new DataSet();
        clscon.Return_DS(ds, "select * from workshopbookingslots where wid=" + wid + "");
        //
        DataSet ds1 = new DataSet();
        clscon.Return_DS(ds1, "select * from workshopparts where wid=" + wid + " order by partno");
        string stuname = clscon.Return_string("select studentname from studentdetail where studentid=" + stuid + "");
        int facid = Convert.ToInt32(ds.Tables[0].Rows[0]["facultyid"]);
        string Directions = ds.Tables[0].Rows[0]["directions"].ToString();
        string code = ds.Tables[0].Rows[0]["code"].ToString();
        string faculity = clscon.Return_string("select facultyname from workshopfacultymaster where facultyid=" + facid + "");
        //
        string wtitle = clscon.Return_string("Select workshoptitle from workshopbooking where workshopid=" + Convert.ToInt32(ds.Tables[0].Rows[0]["workshopid"]) + "");
        int venue = Convert.ToInt32(ds.Tables[0].Rows[0]["venueid"]);
        string wvenue = clscon.Return_string("select venue from venuemasterworkshop where venueid=" + venue + "");
        DateTime tdate;
        tdate = Convert.ToDateTime(ds.Tables[0].Rows[0]["wstartdate"]);
        string wsdt;
        wsdt = tdate.ToString("yyyy/MM/dd");
        TimeSpan tstime, tetime;
        tstime = (TimeSpan)(ds.Tables[0].Rows[0]["starttime"]);
        tetime = (TimeSpan)(ds.Tables[0].Rows[0]["endtime"]);
        String td;
        td = tdate.ToString("D");
        string wdate = td;
        string wtime = clscon.ConvertTimeHSAMPM(tstime.ToString()) + " - " + clscon.ConvertTimeHSAMPM(tetime.ToString());
        string mblno = clscon.Return_string("select studentmobile from studentdetail where studentid=" + stuid + "");
        String result = "";
        if ((mblno != "0") && (mblno != ""))
        {
            string msg;
            if (ds1.Tables[0].Rows.Count >= 2)
            {
                msg = "" + toptext + "," + code + ",Parts-" + ds1.Tables[0].Rows.Count + ",Stu ID-" + stuid + "," + wdate + "," + wtime + "," + wvenue + "," + faculity + ",view details online in workshop history";
            }
            else
            {
                msg = "" + toptext + ",Stu ID-" + stuid + "," + wdate + "," + wtime + "," + wvenue + "," + faculity + "";
            }            
            url = clscon.Return_string("select apiurl FROM tbapisetting");
            string msgnew = msg;
            msgnew = msgnew.Replace("&", "amp;");
            msgnew = msgnew.Replace("#", ";hash");
            msgnew = msgnew.Replace("+", "plus;");
            msgnew = msgnew.Replace(",", "comma;");
            url = url.Replace("vipmsg", msgnew);
            url = url.Replace("vipmobilenos", mblno);
            String strPost = "";
            StreamWriter myWriter = null;
            HttpWebRequest objRequest = (HttpWebRequest)WebRequest.Create(url);
            objRequest.Method = "POST";
            objRequest.ContentLength = strPost.Length;
            objRequest.ContentType = "application/x-www-form-urlencoded";

            try
            {
                myWriter = new StreamWriter(objRequest.GetRequestStream());
                myWriter.Write(strPost);
            }
            catch (Exception e)
            {
                return e.Message;
            }
            finally
            {
                myWriter.Close();
            }

            HttpWebResponse objResponse = (HttpWebResponse)objRequest.GetResponse();
            using (StreamReader sr =
               new StreamReader(objResponse.GetResponseStream()))
            {
                result = sr.ReadToEnd();

                // Close and clean up the StreamReader
                sr.Close();
            }
        }
        return result;

    }
    public String readHtmlPage(string url)
    {
        String result = "";
        String strPost = "";
        StreamWriter myWriter = null;

        HttpWebRequest objRequest = (HttpWebRequest)WebRequest.Create(url);
        objRequest.Method = "POST";
        objRequest.ContentLength = strPost.Length;
        objRequest.ContentType = "application/x-www-form-urlencoded";

        try
        {
            myWriter = new StreamWriter(objRequest.GetRequestStream());
            myWriter.Write(strPost);
        }
        catch (Exception e)
        {
            return e.Message;
        }
        finally
        {
            try
            {
                myWriter.Close();

            }
            catch
            {
            }
        }

        HttpWebResponse objResponse = (HttpWebResponse)objRequest.GetResponse();
        using (StreamReader sr =
           new StreamReader(objResponse.GetResponseStream()))
        {
            result = sr.ReadToEnd();

            // Close and clean up the StreamReader
            sr.Close();
        }
        return result;
    }




    //new code

    


}
