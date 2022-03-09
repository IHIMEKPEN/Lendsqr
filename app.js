const express = require("express");
var mysql      = require('mysql'); 

const app = express();
const url = " mysql://b3a376e1086f60:cf91152e@us-cdbr-east-05.cleardb.net/heroku_ad7e80e651ce74d?reconnect=true";

var connection = mysql.createConnection({
    host     : 'us-cdbr-east-05.cleardb.net',
    username : 'b3a376e1086f60',
    password : 'cf91152e',
    database : 'heroku_ad7e80e651ce74d'
  });
   
  connection.connect();
//   mysql.connect(url);
   
  