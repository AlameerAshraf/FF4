var mail = require('nodemailer');
var exported = module.exports = {} ;

var sendmail = mail.createTransport({
    host : 'smtp.gmail.com',
    port : '587',
    secure : false , 
    auth : {
        user : 'integratoCorp@gmail.com',
        pass : 'integratoCorp2017**'
    }
});


exported.Print = function(){
    console.log("Alameer Ashraf"); 
}

exported.NotifyViaMail = function(name ,mail, subject , text ){
    var mailoptions = {
        from : name ,
        to : "Alameerelnagar94@gmail.com" ,
        subject : subject ,
        text : text + "from :" + mail
    };
    sendmail.sendMail(mailoptions,(err,info) => {
        if(err){
            console.log(err);
        }
        else {
            console.log("Message Sent Successfully" + info.messageId , info.response); 
        }
    })
}