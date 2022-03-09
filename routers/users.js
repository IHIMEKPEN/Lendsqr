const express = require("express");
const router = express.Router();
const connection = require("../connection.js"); //import module created ' connection.js'
const bodyParser = require("body-parser");
router.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: true })
app.use(express.urlencoded());

// get all users from database
router.get('/all',(req,res)=>{
    
    try{
        // console.log('get request')
        // res.send('get request')
        connection.query(`Select * from users`, (err, result) => {
            if (!err) {
                res.send(result.rows);
              }
            });
          connection.end;

    }catch(err){
        res.send('Error' +err)
    }
})




// Add New User to database
router.post("/signup", urlencodedParser, (req, res) => {
  const user = req.body;
//   let insertQuery = `insert into users(email, username, fullname) 
//                        values('${user.email}', '${user.username}','${user.fullname}')`;
//   const responseData = {
//     Status: "Successful",
//     Message: `Account created ${user.username}`,
//   };

//   const jsonContent = JSON.stringify(responseData);
//   connection.query(insertQuery, (err, result) => {
//     if (!err) {
//       res.send(jsonContent);
//     } else {
//       console.log(err.message);
//     }
//   });
//   connection.end;
console.log('Got body:', req.body);
res.sendStatus(200);
});



// Update User by id Details api

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

module.exports = router