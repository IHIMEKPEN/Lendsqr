const express = require("express");
var mysql      = require('mysql'); 

const app = express();
const url =
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'me',
//     password : 'secret',
//     database : 'my_db'
//   });
   
//   connection.connect();
  mysql.connect(url);
   
  