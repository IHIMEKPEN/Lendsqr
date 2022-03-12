const express = require("express");
const router = express.Router();
const connection = require("../connection.js"); //import module created ' connection.js'
const bodyParser = require("body-parser");
router.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: true });
// router.use(express.urlencoded());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15h" });
  
};

function auth(req,res,next) {
  const token = req.header('accessToken');
  if (!token) return res.status(401).send('Access Denied');
  try{
    const verified =jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    req.user=verified;
    next();
  }catch(err){
    res.status(400).send('Invalid Token');

  }
 
};


//login
router.post("/login", urlencodedParser, async (req, res) => {
  const user = req.body;

  // connection.getConnection ( async (err, connection)=> {
  //   if (err) throw (err)
  const sqlSearch = "Select * from users where email = ?"
  const search_query = connection.format(sqlSearch, [user.email])
  await connection.query(search_query, async (err, result) => {
    connection.end;
    //  connection.release()

    if (err) throw (err)
    if (result.length == 0) {
      console.log("--------> User does not exist")
      res.sendStatus(404)
    }
    else {
      const hashedPassword = result[0].password
      //get the hashedPassword from result
      if (await bcrypt.compare(user.password, hashedPassword)) {
        // console.log("---------> Login Successful")

        // console.log("---------> Generating accessToken")
        const token = generateAccessToken({ user: user.email })
        // console.log(token)
        res.header('accessToken', token ).send({ accessToken: token , Message:`${user.email} is logged in!`})
        
      }
      else {
        console.log("---------> Password Incorrect")
        res.send("Password incorrect!")
      } //end of bcrypt.compare()
    }//end of User exists i.e. results.length==0
  }) //end of connection.query()
  //  }) //end of db.connection()
}); //end of app.post()

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
  if (user.password === user.password2) {
    connection.query("SELECT COUNT(*) AS cnt FROM users WHERE email = ? ",
      user.email, function (err, data) {
        if (err) {
          console.log(err);
        }
        else {
          if (data[0].cnt > 0) {
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
                  res.send({
                    Status: "Successful",
                    Message: `Account created ${user.username}`,
                  });
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
      })
  }
});

//fund wallet
router.put("/fundwallet",auth, urlencodedParser, async (req, res) => {
  let user = req.body;
  // console.log(user)
  let updateQuery = `update users
                       set 
                       wallet = wallet+'${user.amount}'                       
                       where email LIKE '${user.email}'`;

  connection.query(updateQuery, (err, result) => {

    if (!err) {
      res.send({
        Status: "Successful",
        Message: `Accounted funded with ${user.amount} in ${user.email}`,
      });
    } else {
      console.log(err.message);
    }
  });
  connection.end;
  // }
});

//withdraw from wallet
router.put("/withdraw",auth, urlencodedParser, async (req, res) => {
  let user = req.body;
  // console.log(user)
  let updateQuery = `update users
                       set 
                       wallet = wallet-'${user.amount}'                       
                       where email LIKE '${user.email}'`;

  connection.query(updateQuery, (err, result) => {

    if (!err) {
      res.send({
        Status: "Successful",
        Message: `Withdrawl of ${user.amount} from ${user.email} Successful`,
        Prompt: "Take your cash ",
      });
    } else {
      console.log(err.message);
    }
  });
  connection.end;
  // }
});

//fund wallet
router.put("/transferfund",auth, urlencodedParser, async (req, res) => {
  let user = req.body;
  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      let updateQuery = `update users
                       set 
                       wallet = wallet-'${user.amount}'                       
                       where email LIKE '${user.fromemail}'`;

      connection.query(updateQuery, (err, result) => {

        if (!err) {
          res.send({
            Status: "Successful",
            Message: ` ${user.amount} transferred to ${user.toemail} from ${user.fromemail} `,
          });
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
