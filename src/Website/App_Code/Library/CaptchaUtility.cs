using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

/// <summary>
/// Summary description for CaptchaUtility
/// </summary>
public class CaptchaUtility
{
    public void ValidateCaptcha(string recaptchaClientResponse, string recaptchaSecret)
    {
        var client = new RestClient("https://www.google.com");

        var request = new RestRequest("recaptcha/api/siteverify", Method.POST);
        request.AddParameter("secret", recaptchaSecret);
        request.AddParameter("response", recaptchaClientResponse);

        IRestResponse<RecaptchaResponseDTO> recaptchaResponse = client.Execute<RecaptchaResponseDTO>(request);

        if (recaptchaResponse.Data.Success == false)
        {
            var response = new HttpResponseMessage(HttpStatusCode.InternalServerError);
            response.Content = new StringContent("Invalid Captcha Response");

            throw new HttpResponseException(response);
        }
    }
}