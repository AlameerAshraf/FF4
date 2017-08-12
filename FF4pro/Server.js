var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var url = require('url');
var path = require('path');
var app = express();
var localtunnel = require('localtunnel');
var BodyParser = require('body-parser');
var MailHandler = require('./self_modules/SendMail.js');

var client = mongodb.MongoClient;
var dbaccessurl = "mongodb://127.0.0.1:27017/ff4";


app.set("view engine", "ejs");
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/css'));
//app.use(fileUpload());
//app.use(session({ secret: 'ssshhhhh' }));




client.connect(dbaccessurl, function (err, db) {
    if (err) {
        console.log("Error Happend in db");
    }
    else {
        // var tunnel = localtunnel(1337, function (err, tunnel) {
        //     if (!err) {
        //         console.log(tunnel.url);
        //     }
        // });

        app.get("/", function (req, res) {
            res.render(__dirname + "/Pages/index.ejs");
        })

        app.post("/Contactus", (req, res) => {
            var maildetailstransfer = {
                Receiver: "Clients Reviwes",
                MailPurpose: "are an admin in Integrato . So Please give a full attention to the mail and notify the rest of team !",
                Sender: req.body.data.name,
                FirstMessage: "This Message is sent from client :" + " " + req.body.data.name,
                ButtonDetection: false,
                ButtonMessage: " ",
                Link: "client mail :" + req.body.data.email,
                LinkMessage: req.body.data.message,
                FooterMessage: "Please give full attention to this message and try to solve the client problem as possible as you can , and tell other team about this message , client phone number " +req.body.data.phone ,
                name : req.body.data.name
            }

            MailHandler.NotifyViaMail(maildetailstransfer);
        })

        app.get("/test", (req, res) => {
            MailHandler.test();
            res.render(__dirname + "/Pages/Templates/Email.ejs", {
                Username: "Alameer"
            })
        })
    }
});


app.use(express.static("./Static"));
app.use(express.static("./Scripts"));
app.listen(1337);