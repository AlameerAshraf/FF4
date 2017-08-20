var mail = require('nodemailer');
var EmailTemplate = require('email-templates').EmailTemplate
var path = require('path')

var templateDir = path.join(__dirname + '/../Pages/', 'templates');


var exported = module.exports = {};


var sendmail = mail.createTransport({
    host: 'smtp.gmail.com',
    port: '587',
    secure: false,
    auth: {
        user: 'integratoCorp@gmail.com',
        pass: 'integratoCorp2017**'
    }
});



exported.NotifyViaMail = function (IncomingObject) {
    var MailToSent;
    var tempmail = new EmailTemplate(templateDir)
    var maildetails = {
        Receiver: IncomingObject.Receiver ,
        MailPurpose: IncomingObject.MailPurpose,
        Sender: IncomingObject.Sender,
        FirstMessage : IncomingObject.FirstMessage ,
        ButtonDetection : IncomingObject.ButtonDetection , 
        ButtonMessage : (IncomingObject.ButtonMessage == null ? "" : IncomingObject.ButtonMessage)  ,
        ButtonLink : IncomingObject.ButtonLink,
        Link : IncomingObject.Link,
        LinkMessage : IncomingObject.LinkMessage   ,
        FooterMessage : IncomingObject.FooterMessage,
        Subject : IncomingObject.Subject,
        to : IncomingObject.To
    }
    var MailPromise = new Promise(function (resolve, reject) {
        tempmail.render(maildetails, function (err, result) {
            if (!err) {
                resolve(result);
            }
            else {
                reject(err);
            }
        })
    })

    MailPromise.then(function (result) {
        var mailoptions = {
            from: IncomingObject.name,
            to: IncomingObject.To ,
            subject: IncomingObject.Subject,
            text: "",
            html: result.html
        };

        sendmail.sendMail(mailoptions, (err, info) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Message Sent Successfully" + info.messageId, info.response);
            }
        })
    })


}


