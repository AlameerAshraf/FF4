$(function(){
    $("[name='Projs']").click(function(){
        $("#portfolioModal1").modal("show"); 
        var pName = $("#portfolioModal1").find("#pName");
        var pTech = $("#portfolioModal1").find("#pTech");
        var pImg = $("#portfolioModal1").find("img");

        pName.html($(this).find("#pName").html());
        pTech.html($(this).find("#pTech").html());
        var ImagSrc = $(this).find("img").attr("src");
        pImg.attr("src" , ImagSrc);
    })

    $("[name='CloseModel']").click(function () {
         $("#portfolioModal1").modal("hide"); 
    })

})();