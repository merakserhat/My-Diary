const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const diarySchema = new Schema({
  title: { required: true, type: String },
  text: { required: true, type: String },
  date: { required: true, type: Date },
  userId: { required: true, type: String },
});

module.exports = mongoose.model("diary", diarySchema);
