const jwt = require("jsonwebtoken");

module.exports = {
gentoken : function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15h" });
  
  }
  
  };


