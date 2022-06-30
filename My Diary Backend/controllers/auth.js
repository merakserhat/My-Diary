const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { json } = require("express");
require("dotenv").config();

module.exports.register = async (req, res, next) => {
  const { email, password } = req.body;

  if (hasValidationErrors(req, res)) {
    return;
  }

  if (await userExists(email, res)) {
    return;
  }

  const hashedPassword = bcrypt.hashSync(password, 12);

  const user = new User({
    email,
    password: hashedPassword,
  });

  user
    .save()
    .then((result) => {
      res.status(201).json({ message: "User created!", userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const hasValidationErrors = (req, res) => {
  const errors = validationResult(req);
  //It is about email
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    res.status(422).json({
      error: {
        message: "Enter a valid email",
        type: "email",
      },
    });
    return true;
  }
  return false;
};

const userExists = async (email, res) => {
  const oldUser = await User.findOne({ email });

  if (oldUser) {
    res.status(401).json({
      error: {
        type: "email",
        message: "Email already exists",
      },
    });
    return true;
  }
  return false;
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("A user with this email could not be found.");
    error.statusCode = 401;
    error.type = "email";
    return next(error);
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (isPasswordValid) {
    const payload = {
      email: user.email,
      userId: user._id.toString(),
    };
    const expiresIn = "1y";
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn,
    });
    res.status(200).json({ token, email, expiresIn });
  } else {
    const error = new Error("Wrong password");
    error.statusCode = 401;
    error.type = "password";
    return next(error);
  }
};

module.exports.getResetLink = async (req, res, next) => {
  const email = req.body.email;
  console.log("email");
  console.log(req.body);

  if (hasValidationErrors(req, res)) {
    return;
  }

  if (!email) {
    const error = new Error("Missing parameters");
    error.statusCode = 403;
    error.type = "missing parameters";
    next(error);
  }

  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("A user with this email could not be found.");
    error.statusCode = 401;
    error.type = "email";
    return next(error);
  }

  let token;
  try {
    const buffer = crypto.randomBytes(32);
    token = buffer.toString("hex");
  } catch (err) {
    return next(err);
  }

  user.resetToken = token;
  user.resetTokenExpirationTime = Date.now() + 1000 * 60 * 60;

  try {
    await user.save();

    //TODO: send an email in here
    res.json({ link: `http://localhost:3000/auth/reset/${token}` });
  } catch (err) {
    return next(err);
  }
};

module.exports.validateResetToken = async (req, res, next) => {
  const token = req.body.token;

  const tokenValidationError = await getTokenValidationError(token);
  if (tokenValidationError.error) {
    next(tokenValidationError.error);
  }

  res.json({ message: "Token is valid" });
};

const getTokenValidationError = async (token) => {
  if (!token) {
    const error = new Error("Missing parameters");
    error.statusCode = 403;
    error.type = "missing parameters";
    return { error, user: null };
  }

  const user = await User.findOne({ resetToken: token });
  if (!user) {
    const error = new Error("Password reset token is not valid.");
    error.statusCode = 401;
    error.type = "invalid token";
    return { error, user: null };
  }

  if (user.resetTokenExpirationTime < Date.now()) {
    const error = new Error("Password reset token is expired.");
    error.statusCode = 401;
    error.type = "token expired";
    return { error, user: null };
  }

  return { error: null, user };
};

module.exports.resetPassword = async (req, res, next) => {
  const token = req.body.token;
  const password = req.body.password;

  const errors = validationResult(req);
  //It is about email
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    res.status(422).json({
      error: {
        message: "Enter a valid password",
        type: "password",
      },
    });
  }

  const tokenValidationError = await getTokenValidationError(token);
  if (tokenValidationError.error) {
    return next(tokenValidationError.error);
  }

  const user = tokenValidationError.user;

  const hashedPassword = bcrypt.hashSync(password, 12);

  user.password = hashedPassword;

  try {
    await user.save();

    //TODO: send an email in here
    res.json({ message: "Password successfully updated!" });
  } catch (err) {
    return next(err);
  }
};
