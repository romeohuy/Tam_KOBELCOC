//Contact Form
$("#contactForm").on('submit', function (e) {
    if (e.isDefaultPrevented()) {
        //form invalid
    } else {
        e.preventDefault();

        StartSubmitButtonSpinner();

        var requestFormData = {
            FirstName: $("#fname").val(),
            LastName: $("#lname").val(),
            Email: $("#email").val(),
            Phone: $("#phone").val(),
            Company: $("#company").val(),
            Address: $("#address").val(),
            City: $("#city").val(),
            State: $("#state").val(),
            Zip: $("#zip").val(),
            InquiryType: $("input[name=inquiry]").val(),
            Product: $("#product").val(),
            SerialNumber: $("#serialnumber").val(),
            Comments: $("#comments").val(),
            CaptchaResponse: $("#g-recaptcha-response").val()
        }

        $.ajax({
            url: '/api/ContactRequest/',
            type: 'POST',
            data: JSON.stringify(requestFormData),
            contentType: "application/json;charset=utf-8",
            success: function (data) {
				ga('send', 'event', 'forms', 'submit', 'success');
                $("#contactForm").slideUp();
                $("#contactThankYou").show();
            },
            error: function (message) {
                if (message.responseText == "Invalid Captcha Response") {
                    StopSubmitButtonSpinner();

                    $(".recaptcha-form-group").addClass("has-error");

                    return;
                }
                ga('send', 'event', 'forms', 'submit', 'failure');
                $("#contactForm").slideUp();
                $("#contactError").show();
                console.log('Error: ' + JSON.stringify(message));
            }
        });

        return false;
    }
})

// Create a new instance of ladda for the specified button
var ladda_ContactFormSubmit = $('#submit').ladda();

function StartSubmitButtonSpinner() {
    // Start loading
    ladda_ContactFormSubmit.ladda('start');
}

function StopSubmitButtonSpinner() {
    ladda_ContactFormSubmit.ladda('stop');
}