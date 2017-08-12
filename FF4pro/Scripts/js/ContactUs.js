$(function () {

    $("#ContactUsForm").on("click", function () {
        var data = {
            "data" : 
            {
                "name": $("[name='Name']").val(),
                "email": $("[name='Email']").val(),
                "phone": $("[name='Phone']").val(),
                "message": $("[name='message']").val()
            }
        };

        console.log(data);

        $.ajax({
            type: "POST",
            url: "http://localhost:1337/Contactus",
            // contentType: false,
            // processData: false,
            data: data,
            success: function (res) {
                alert("Done");
                console.log(travel);
            },
            Error: function (err) {
                console.log("Bad");
            }
        });
    });
})();