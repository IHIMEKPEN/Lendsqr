var mysql = require('mysql');
require("dotenv").config();//to use environmental variables

var db_config = { 
    host: process.env.HOST, 
    user: process.env.USER, 
    password: process.env.PASSWORD, 
    database: process.env.DATABASE, };

// var connection = mysql.createConnection(db_config);
// var connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config);

  connection.connect(function(err) {
    if (err) {
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000);
    }else{
        console.log("connection is successfull");
    }
  });
  connection.on("error", function(err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}
handleDisconnect();


module.exports = connection