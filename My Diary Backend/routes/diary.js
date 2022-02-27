const express = require("express");
const diaryController = require("../controllers/diary");
const isAuth = require("../utils/is-auth");

const router = express.Router();

router.get("/list", isAuth, diaryController.getList);

router.get("/get-one", isAuth, diaryController.getOne);

router.post("/write", isAuth, diaryController.write);

router.put("/edit", isAuth, diaryController.edit);

router.delete("/delete", isAuth, diaryController.delete);

module.exports = router;
