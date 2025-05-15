const jwt = require("jsonwebtoken");

exports.createUserAccessToken = (userTokenData) => {
  // console.log("payload",userTokenData)
  try {
    return jwt.sign(userTokenData, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  } catch (e) {
    return e;
  }
};
