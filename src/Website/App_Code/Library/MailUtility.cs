using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;

/// <summary>
/// Summary description for MailUtility
/// </summary>
public class MailUtility
{
    public void SendContactRequestEmail(String fromAddress, String toAddress, String subject, String messageBody)
    {
        MailMessage message = new MailMessage();

        message.From = new MailAddress(fromAddress);
        message.To.Add(toAddress);
        message.Subject = subject;
        message.Body = messageBody;
        message.IsBodyHtml = true;

        SmtpClient client = new SmtpClient();
        client.Send(message);
    }
}