const express = require("express");
const connection = require("./connection.js"); //import module created ' connection.js'
require("dotenv").config();//to use environmental variables
const app = express();
const bodyParser=require("body-parser")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require('path');
const http = require("http");

// var db_config = mysql.createConnection({
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
    // setTimeout(handleDisconnect, 2000);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});


// function handleDisconnect() {
//   // connection = mysql.createConnection(db_config); // Recreate the connection, since
//                                                   // the old one cannot be reused.

//   connection.connect(function(err) {              // The server is either down
//     if(err) {                                     // or restarting (takes a while sometimes).
//       console.log('error when connecting to db:', err);
//       setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
//     }                                     // to avoid a hot loop, and to allow our node script to
//   });                                     // process asynchronous requests in the meantime.
//                                           // If you're also serving http, display a 503 error.
//   connection.on('error', function(err) {
//     console.log('db error', err);
//     if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
//       handleDisconnect();                         // lost due to either server restart, or a
//     } else {                                      // connnection idle timeout (the wait_timeout
//       throw err;                                  // server variable configures this)
//     }
//   });
// }

// handleDisconnect();


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