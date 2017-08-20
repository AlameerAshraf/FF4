var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var url = require('url');
var path = require('path');
var app = express();
var localtunnel = require('localtunnel');
var BodyParser = require('body-parser');
var fs = require('fs');
var MailHandler = require('./self_modules/SendMail.js');
var ResourceControl = require('./self_modules/ResourceControl.js');

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
        //     console.log(err);
        // });



        app.get(["/", "/Index", "/Home"], function (req, res) {
            res.render(__dirname + "/Pages/index.ejs");
        });



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
                FooterMessage: "Please give full attention to this message and try to solve the client problem as possible as you can , and tell other team about this message , client phone number " + req.body.data.phone,
                name: req.body.data.name,
                Subject: "Clients Reviwes Mail From IntegratoCorp." ,
                To : "alameerelnagar94@gmail.com,alamiir.ashraf@gmail.com,arsany.nagy.hakim@gmail.com"
            }

            MailHandler.NotifyViaMail(maildetailstransfer);
        });




        app.get(new RegExp("ServiceRequest(\\.(?:htm|html))?(\\?.*)?$"), (req, res) => {

            var queryData = url.parse(req.url, true).query;
            var lang = queryData.lang;
            var RequestedPage = "ServiceRequest";

            var LoadedResources = ResourceControl.LoadResources(lang, RequestedPage);

            LoadedResources.then((result) => {
                res.render(__dirname + "/Pages/ServiceRequest", result);
            })

        });


        var applications = db.collection("Apps");
        app.post("/SubmitApp", (req, res) => {
            var States = { "viewd": "viewd", "inprogress": "inprogress", "notviewd": "notviewd", "completed": "completed", "delivered": "delivered", "intest": "intest", "returned": "returned" };

            var SubmittedApp = {
                "name": req.body.name,
                "mail": req.body.email,
                "phone1": req.body.phone1,
                "phone2": req.body.phone2,
                "address": req.body.address,
                "locationmeet": req.body.location,
                "price": req.body.price,
                "datedeliver": req.body.datedeliver,
                "BusinessScopeDdl": req.body.BusinessScopeDdl,
                "SoftwareTypeDdl": req.body.SoftwareTypeDdl,
                "timetomeet": req.body.timetomeet,
                "urgent": req.body.urgent,
                "desc": req.body.desc,
                "AppCode": Math.floor(Math.random() * 1000),
                "State": States.notviewd
            }

            applications.insertOne(SubmittedApp, (err, rese) => {
                if (!err) {
                    res.render(__dirname + "/Pages/Confirmation", {
                        "err": 0,
                        "AppCode": rese.ops[0].AppCode,
                        "Mail": rese.ops[0].mail,
                        "Phone": rese.ops[0].phone1,
                        "phone2": rese.ops[0].phone2,
                        "Message" : 0
                    });

                    var maildetailstransfer = {
                        Receiver: "Your job in the right hands",
                        MailPurpose: "are requested a software application from integrato , and the job assigned successfully the team will take the rest.",
                        Sender: "Integrato Technical Team",
                        FirstMessage: "We are looking forward to meet you Mr." +" "+ req.body.name,
                        ButtonDetection: true,
                        ButtonMessage: "Show Job status",
                        ButtonLink : "http://localhost:1337/CheckRequest/" + rese.ops[0].AppCode,
                        Link: "",
                        LinkMessage: "your job code is  :" + rese.ops[0].AppCode,
                        FooterMessage: "please save this message and the job code to be able to check the state of yoir project and make the process of serving you easy and efficent",
                        name: "Integrato Technical Team",
                        Subject: "Your software successfully assigned to Integrato Corp. team",
                        To : req.body.email
                    }

                    MailHandler.NotifyViaMail(maildetailstransfer); 
                }
                else
                    res.render(__dirname + "/Pages/Confirmation", { "err": 0  , "Message" : 0});
            });

        })

        app.get("/CheckRequest/:JobCode", (req, res) => {
            var Code = req.params.JobCode;
            console.log(Code);
            db.collection("Apps").findOne({ "AppCode": parseInt(Code) }, (err, rese) => {
                res.render(__dirname + "/Pages/Confirmation",{"err" : 0 , "Message" : 1 , "state" : "Bad" })
            })
        })

    }
});



app.use(express.static("./Static"));
app.use(express.static("./Scripts"));
app.use(express.static("./bower_components"));

app.listen(1337);