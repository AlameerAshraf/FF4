$(function () {
    $("#langdete").click(function () {
        var CurrentLang = $(this).attr("langdete");
        if  ($(this).attr("langdete") == "en") {
            window.location.replace("http://localhost:1337/ServiceRequest?lang=ar");
        }
        else if ($(this).attr("langdete") == "ar") {
            window.location.replace("http://localhost:1337/ServiceRequest?lang=en");
        }
    });

});