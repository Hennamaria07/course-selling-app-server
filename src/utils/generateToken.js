const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (email) => {
    return jwt.sign({ data: email, succes: true }, process.env.ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: "1d",
    });
  };

  module.exports = generateToken