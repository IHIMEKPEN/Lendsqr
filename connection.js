var mysql = require('mysql');
require("dotenv").config();//to use environmental variables

var db_config = { 
    host: 'us-cdbr-east-05.cleardb.net', 
    user: 'b3a376e1086f60', 
    password: 'cf91152e', 
    database: 'heroku_ad7e80e651ce74d', };

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