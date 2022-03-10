const express = require("express");
const router = express.Router();
const connection = require("../connection.js"); //import module created ' connection.js'
const bodyParser = require("body-parser");
router.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: true });
// router.use(express.urlencoded());
const bcrypt = require("bcryptjs");

// get all users from database
router.get("/all", (req, res) => {
  try {
    // console.log('get request')
    // res.send('get request')
    connection.query(`Select * from users`, (err, result) => {
      if (!err) {
        res.send(result.rows);
      }
    });
    connection.end;
  } catch (err) {
    res.send("Error" + err);
  }
});

//signup
router.post("/signup", urlencodedParser, (req, res) => {
  const user = req.body;

  // Validate user input
  if (!(user.email && user.password && user.fullname && user.username)) {
    res.status(400).send("All input is required");
  }

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
        // res.redirect("/sendfunds", jsonContent);
      } else {
        console.log(err.message);
      }
    });
    connection.end;
  });
  // console.log('Got body:', req.body);
  // res.sendStatus(200);
});

// Update User by username

router.put("/users/:username", (req, res) => {
  let user = req.body;
  let updateQuery = `update users
                         set fullname = '${user.fullname}',
                         email = '${user.email}'
                         
                         where username = ${user.username}`;

  connection.query(updateQuery, (err, result) => {
    const responseData = {
      Status: "Successful",
      Message: `${user.username} your info has been updated`,
    };

    const jsonContent = JSON.stringify(responseData);
    if (!err) {
      res.send(jsonContent);
    } else {
      console.log(err.message);
    }
  });
  connection.end;
});

module.exports = router;
