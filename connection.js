var mysql     = require('mysql'); 
require("dotenv").config();//to use environmental variables


var connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);



module.exports = connection