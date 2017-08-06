var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var url = require('url');
var download = require('download-file');
var session = require('express-session');
var path = require('path');
var app = express();
var localtunnel = require('localtunnel');
var BodyParser = require('body-parser');
var fileUpload = require('express-fileupload');

var client = mongodb.MongoClient; 
var dbaccessurl = "mongodb://127.0.0.1:27017/ff4"; 


app.set("view engine", "ejs");
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/css'));
app.use(fileUpload());
app.use(session({ secret: 'ssshhhhh' }));




client.connect(dbaccessurl, function (err, db) {
    if (err){
        console.log("Error Happend in db");
    }
    else {
        var tunnel = localtunnel(1337, function (err, tunnel) {
            if (!err) {
                console.log(tunnel.url);
            }
        });

        app.get("/",function(req,res){
           res.render(__dirname + "/Pages/index.ejs");
        })
    }
}); 


app.use(express.static("./Static"));
app.use(express.static("./Scripts"));
app.listen(1337);