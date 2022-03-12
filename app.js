const express = require("express");
const connection = require("./connection.js"); //import module created ' connection.js'
require("dotenv").config();//to use environmental variables
const app = express();
const bodyParser=require("body-parser")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require('path');
const http = require("http");

// var con = mysql.createConnection({
//     host     : 'us-cdbr-east-05.cleardb.net',
//     username : 'b3a376e1086f60',
//     password : 'cf91152e',
//     database : 'heroku_ad7e80e651ce74d'
//   });
   
app.use(bodyParser.json());
app.use('/static', express.static('static'))
app.use(express.json());

// production

// This code creates a server listening at the  port specified
app.listen(process.env.PORT, process.env.LOCAL_ADDRESS, () => {
  console.log(`Server is now listening at port ${process.env.PORT}`);
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});


const users =require("./routers/users.js");
app.use('/users',users);

app.get("/signup", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/login.html");
});
app.get("/wallet", function (req, res) {
  res.sendFile(__dirname + "/account.html");
});

module.exports = app;