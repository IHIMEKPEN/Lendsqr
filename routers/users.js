const express = require("express");
const router = express.Router();
const connection = require("../connection.js"); //import module created ' connection.js'
const bodyParser = require("body-parser");
router.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: true });
// router.use(express.urlencoded());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function handleDisconnect() {
  console.log('handleDisconnect()');
  connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.
  connection.connect(function(err) {              // The server is either down
  if(err) {                                      // or restarting (takes a while sometimes).
      console.log(' Error when connecting to db:', err);
      setTimeout(handleDisconnect, 1000);         // We introduce a delay before attempting to reconnect,
  }                                               // to avoid a hot loop, and to allow our node script to
  });                                             // process asynchronous requests in the meantime.
                                                  // If you're also serving http, display a 503 error.

  connection.on('  Database Error', function(err) {
      console.log('db error: ' + err.code, err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
          handleDisconnect();                       // lost due to either server restart, or a
      } else {                                      // connnection idle timeout (the wait_timeout
          throw err;                                // server variable configures this)
      }
  });
}

//signup
router.post("/signup", urlencodedParser, async (req, res) => {
  const user = req.body;

  // Validate user input
  if (
    !(
      user.email &&
      user.password &&
      user.password2 &&
      user.fullname &&
      user.username
    )
  ) {
    res.status(400).send("All input is required");
    return;
  }
  //Check passwords match
  if (user.password != user.password2) {
    console.log("Passwords dont match");
    // errors.push({ msg: "Passwords dont match" });
    res.send({ message: "Passwords dont match" });
  } 
  if(user.password === user.password2){
  connection.query("SELECT COUNT(*) AS cnt FROM users WHERE email = ? " , 
user.email , function(err , data){
   if(err){
       console.log(err);
   }   
   else{
       if(data[0].cnt > 0){  
             // Already exist 
             res.send({ message: "user already exist in database" });
       }
       else {
        bcrypt.hash(user.password, 10, function (err, hash) {
          let insertQuery = `insert into users(email, username, fullname, password) 
                           values('${user.email}', '${user.username}','${user.fullname}' , '${hash}') `;
          const responseData = {
            Status: "Successful",
            Message: `Account created ${user.username}`,
          };
    
          const jsonContent = JSON.stringify(responseData);
          connection.query(insertQuery, (err, result) => {
            if (!err) {
              res.send(jsonContent);
              return;
              // res.redirect("/sendfunds", jsonContent);
            } else {
              console.log(err.message);
              return;
            }
          });
          connection.end;
        });
      }
   }
})}
});

//fund wallet
router.put("/fundwallet", urlencodedParser, async (req, res) => {
  let user = req.body;
  // console.log(user)
  let updateQuery = `update users
                       set 
                       wallet = wallet+'${user.amount}'                       
                       where email LIKE '${user.email}'`;

  connection.query(updateQuery, (err, result) => {
    const responseData = {
      Status: "Successful",
      Message: `Accounted funded with ${user.amount} in ${user.email}`,
    };

    const jsonContent = JSON.stringify(responseData);
    if (!err) {
      res.send(jsonContent);
    } else {
      console.log(err.message);
    }
  });
  connection.end;
  // }
});

//withdraw from wallet
router.put("/withdraw", urlencodedParser, async (req, res) => {
  let user = req.body;
  // console.log(user)
  let updateQuery = `update users
                       set 
                       wallet = wallet-'${user.amount}'                       
                       where email LIKE '${user.email}'`;

  connection.query(updateQuery, (err, result) => {
    const responseData = {
      Status: "Successful",
      Message: `Withdrawl of  ${user.amount} from ${user.email} Successful`,
      Prompt: "Take your cash ",
    };

    const jsonContent = JSON.stringify(responseData);
    if (!err) {
      res.send(jsonContent);
    } else {
      console.log(err.message);
    }
  });
  connection.end;
  // }
});

//fund wallet
router.put("/transferfund", urlencodedParser, async (req, res) => {
  let user = req.body;
  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      let updateQuery = `update users
                       set 
                       wallet = wallet-'${user.amount}'                       
                       where email LIKE '${user.fromemail}'`;

      connection.query(updateQuery, (err, result) => {
        const responseData = {
          Status: "Successful",
          Message: `  ${user.amount} transferred to  ${user.toemail} from ${user.fromemail} `,
        };

        const jsonContent = JSON.stringify(responseData);
        if (!err) {
          res.send(jsonContent);
          return;
        } else {
          console.log(err.message);
        }
      });
      connection.end;
    } else {
      let updateQuery = ` update users
                       set 
                       wallet = wallet+ '${user.amount}'                       
                       where email LIKE '${user.toemail}'`;

      connection.query(updateQuery, (err, result) => {
        const responseData = {
          Status: "Successful",
          Message: `  ${user.amount} transferred to  ${user.toemail} from ${user.fromemail} `,
        };
        const jsonContent = JSON.stringify(responseData);
        if (!err) {
          // res.send(jsonContent);
          // return;
        } else {
          console.log(err.message);
        }
      });
      connection.end;
    }
  }

  // }
});

module.exports = router;
