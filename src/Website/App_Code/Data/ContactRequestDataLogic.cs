using Composite.Data;
using RazorEngine;
using RazorEngine.Templating;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ContactRequestDataLogic
/// </summary>
public class ContactRequestDataLogic
{
    public Kobelco.ContactRequest SaveContactUsRequest(ContactRequestDTO dto)
    {
        using (var c = new DataConnection())
        {
            var entity = c.CreateNew<Kobelco.ContactRequest>();
            entity.Id = Guid.NewGuid();
            entity.DateSubmitted = DateTime.Now;
            entity.FirstName = dto.FirstName;
            entity.LastName = dto.LastName;
            entity.Email = dto.Email;
            entity.Phone = dto.Phone;
            entity.Company = dto.Company;
            entity.Address = dto.Address;
            entity.City = dto.City;
            entity.State = dto.State;
            entity.Zip = dto.Zip;
            entity.InquiryType = dto.InquiryType;
            entity.Product = dto.Product;
            entity.SerialNumber = dto.SerialNumber;
            entity.Message = dto.Comments;

            c.Add(entity);

            return entity;
        }
    }

    public List<Kobelco.ContactRequest> GetAll()
    {
        List<Kobelco.ContactRequest> entities = new List<Kobelco.ContactRequest>();
        using (DataConnection connection = new DataConnection())
        {
            entities = connection.Get<Kobelco.ContactRequest>().OrderByDescending(x => x.DateSubmitted).ToList();
        }

        return entities;
    }

    public void SendNotificationEmail(ContactRequestDTO entity)
    {
        string fromEmail = ConfigurationManager.AppSettings["MailFromAddress"].ToString();
        string toEmail = ConfigurationManager.AppSettings["ContactUsToAddress"].ToString();
        string subject = "New Contact Us Submission";
        string messageBody = FormatMessageBody(entity);

        try
        {
            MailUtility mail = new MailUtility();

            mail.SendContactRequestEmail(fromEmail, toEmail, subject, messageBody);
        }
        catch (Exception ex)
        {
            Composite.Core.Log.LogError("Error sending notification email. re: " + entity.Email, ex);
        }
    }

    private string FormatMessageBody(ContactRequestDTO entity)
    {
        var template = File.ReadAllText(System.Web.Hosting.HostingEnvironment.MapPath("~/EmailTemplates/ContactUsTemplate.html"));
        var result = Engine.Razor.RunCompile(template, "ContactRequestSubmit", entity.GetType(), entity);

        return result;
    }
}