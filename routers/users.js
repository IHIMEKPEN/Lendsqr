const express = require("express");
const router = express.Router();
const connection = require("../connection.js"); //import module created ' connection.js'
const bodyParser = require("body-parser");
router.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: true });
// router.use(express.urlencoded());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// get all users from database
router.get("/all", async (req, res) => {
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
router.post("/signup", urlencodedParser, async (req, res) => {
  const user = req.body;

  // Validate user input
  if (!(user.email && user.password && user.fullname && user.username)) {
    res.status(400).send("All input is required");
  } else {
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
  }
  
});

//login

router.post("/login", urlencodedParser, async (req, res) => {
  // Our login logic starts here

  // Get user input
  const userlogin = req.body;
  console.log(userlogin);

  try {
    const row = connection.query(
      `SELECT * FROM users WHERE email LIKE '${userlogin.email}'`
    );
    // const jsonContent = JSON.stringify(row);
    console.log("row " + row);
    if (row.length === 0) {
      return res.status(422).json({
        message: "Invalid email address",
      });
    }

    const passMatch = await bcrypt.compare(userlogin.password, row[0].password);
    if (!passMatch) {
      return res.status(422).json({
        message: "Incorrect password",
      });
    }

    const theToken = jwt.sign({ id: row[0].id }, "the-super-strong-secrect", {
      expiresIn: "1h",
    });

    return res.json({
      token: theToken,
    });
  } catch (err) {
    res.send("Error" + err);
  }

  // Our login logic ends here
});

module.exports = router;
