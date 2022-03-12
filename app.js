const express = require("express");
const connection = require("./connection.js"); //import module created ' connection.js'
require("dotenv").config();//to use environmental variables
const app = express();
const bodyParser=require("body-parser")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require('path');
const http = require("http");

  
   
app.use(bodyParser.json());
app.use('/static', express.static('static'))
app.use(express.json());

// production

// This code creates a server listening at the  port specified
app.listen(process.env.PORT || 5000, process.env.LOCAL_ADDRESS, () => {
  console.log(`Server is now listening at port ${process.env.PORT}`);
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    // setTimeout(handleDisconnect, 2000);
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


module.exports = app;