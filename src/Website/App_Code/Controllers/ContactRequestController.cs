using System;
using System.Configuration;
using System.Web.Http;

/// <summary>
/// Validates the recaptcha input, save contact to cms database, prepare and send email.
/// </summary>
namespace Api
{
    public class ContactRequestController : ApiController
    {
        public Kobelco.ContactRequest PostRequest(ContactRequestDTO dto)
        {
            CaptchaUtility captchaUtility = new CaptchaUtility();
            string recaptchaSecret = ConfigurationManager.AppSettings["recaptchaSecretKey"];
            captchaUtility.ValidateCaptcha(dto.CaptchaResponse, recaptchaSecret);

            ContactRequestDataLogic dataLogic = new ContactRequestDataLogic();
            Kobelco.ContactRequest entity = dataLogic.SaveContactUsRequest(dto);
            dataLogic.SendNotificationEmail(dto);

            return entity;
        }
    }
}