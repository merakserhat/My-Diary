const express = require("express");
const authController = require("../controllers/auth");
const { body } = require("express-validator");
const User = require("../models/user");

const router = express.Router();

router.post("/login", authController.login);

router.put(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .trim()
      .normalizeEmail(),
    body("password").trim().isLength({ min: 6 }),
  ],

  authController.register
);

router.post(
  "/get-reset-link",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .trim()
      .normalizeEmail(),
  ],

  authController.getResetLink
);

router.post("/validate-reset-token", authController.validateResetToken);
router.put(
  "/reset-password",
  body("password").trim().isLength({ min: 6 }),
  authController.resetPassword
);

module.exports = router;
