const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    error.type = "unauthorized";
    throw error;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodedToken) {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      error.type = "unauthorized";
      throw error;
    }

    req.userId = decodedToken.userId;
    console.log(req.userId);
    next();
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

module.exports = isAuth;
