const express = require("express");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth");
const diaryRoute = require("./routes/diary");
const isAuth = require("./utils/is-auth");
const errorHandler = require("./utils/error-handler");

require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/test", isAuth, (req, res, next) => {
  console.log("test");
  res.json({ message: "you did" });
});

//#region Routes
app.use("/auth", authRoute);
app.use("/diary", diaryRoute);
//#endregion

app.use(errorHandler);

//#region DataBase and server
console.log(process.env.MONGODB_URI);
mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    console.log(result);
    app.listen(8080);
  })
  .catch((err) => {
    console.log("hata");
    console.log(err);
  });
//#endregion
