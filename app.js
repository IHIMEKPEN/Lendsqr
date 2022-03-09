const express = require("express");
var mysql      = require('mysql'); 
require("dotenv").config();//to use environmental variables


const app = express();
const url = " mysql://b3a376e1086f60:cf91152e@us-cdbr-east-05.cleardb.net/heroku_ad7e80e651ce74d?reconnect=true";

var connection = mysql.createConnection({
    host     : 'us-cdbr-east-05.cleardb.net',
    username : 'b3a376e1086f60',
    password : '',
    database : 'heroku_ad7e80e651ce74d'
  });
   

//   mysql.connect(url);
   
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