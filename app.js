const express = require("express");
// require("dotenv").config();//to use environmental variables
const app = express();
const bodyParser = require("body-parser")



app.use(bodyParser.json());
app.use('/static', express.static('static'))
app.use(express.json());



const users = require("./routers/users.js");
app.use('/users', users);

app.get("/signup", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/login.html");
});


module.exports = app;