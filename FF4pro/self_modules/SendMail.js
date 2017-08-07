var mail = require('nodemailer');


var sendmail = mail.createTransport({
    host : 'smtp.gmail.com',
    port : '1337',
    secure : true , 
    auth : {
        user : 'integratoCorp@gmail.com',
        pass : 'integratoCorp2017**'
    }
});

