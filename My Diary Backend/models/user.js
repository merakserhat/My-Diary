const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { required: true, type: String },
  password: { required: true, type: String },
  resetToken: String,
  resetTokenExpirationTime: Date,
  diary: [
    {
      type: String,
      ref: "Page",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
