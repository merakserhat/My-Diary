const Diary = require("../models/diary");
const mongoose = require("mongoose");
const { json } = require("express");

const ITEMS_PER_PAGE = 20;

module.exports.getList = async (req, res, next) => {
  const pageNumber = req.query.page ? req.query.page : 1;
  const diaries = await Diary.find({ userId: req.userId })
    .skip((pageNumber - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE)
    .sort({ date: -1 });

  const diaryCount = await Diary.countDocuments({ userId: req.userId });

  const extractedDiaries = extractTextFromDiaries(diaries);

  res.json({ diaries: extractedDiaries, diaryCount });
};

const extractTextFromDiaries = (diaries) => {
  for (const diary of diaries) {
    diary.text = undefined;
  }
  return diaries;
};

module.exports.getOne = async (req, res, next) => {
  const filter = getQueryFilter(req.query, next);
  filter.userId = req.userId;

  const diary = await Diary.findOne(filter);

  if (diary) {
    res.json(diary);
  } else {
    const error = new Error("Diary not found");
    error.statusCode = 404;
    error.type = "not found";
    next(error);
  }
};

module.exports.write = async (req, res, next) => {
  //date format: mm-dd-yyyy
  const { date, title, text } = req.body;
  if (!date || !title || !text) {
    const error = new Error("Missing parameters");
    error.statusCode = 403;
    error.type = "missing parameters";
    next(error);
  }

  const oldDiary = await Diary.findOne({ date: date });
  console.log(oldDiary);
  console.log(date);
  if (oldDiary) {
    const error = new Error("A diary already exists for this date.");
    error.statusCode = 403;
    error.type = "invalid date";
    next(error);
  } else {
    const dateIsValid = validateDate(new Date(date));
    if (!dateIsValid) {
      const error = new Error("You can't write any diary for this date!");
      error.statusCode = 403;
      error.type = "invalid date";
      next(error);
    } else {
      const diary = new Diary({
        userId: req.userId,
        date: new Date(date),
        title,
        text,
      });
      diary
        .save()
        .then((result) => {
          res
            .status(201)
            .json({ message: "You have writen diary!", diary: result });
        })
        .catch((err) => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
    }
  }
};

module.exports.edit = async (req, res, next) => {
  //date format: mm-dd-yyyy
  const { date, title, text, diaryId } = req.body;

  if (!date || !title || !text || !diaryId) {
    const error = new Error("Missing parameters");
    error.statusCode = 403;
    error.type = "missing parameters";
    next(error);
  }

  const oldDiary = await Diary.findOne({
    date: date,
    _id: diaryId,
    userId: req.userId,
  });
  console.log(oldDiary);
  console.log(date);
  if (oldDiary) {
    oldDiary.text = text;
    oldDiary.title = title;
    oldDiary
      .save()
      .then((result) => {
        res
          .status(201)
          .json({ message: "You have edited diary!", diary: result });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  } else {
    const error = new Error("A diary already exists for this date.");
    error.statusCode = 403;
    error.type = "invalid date";
    next(error);
  }
};

module.exports.delete = async (req, res, next) => {
  const { date, diaryId } = req.body;

  if (!date || !diaryId) {
    const error = new Error("Missing parameters");
    error.statusCode = 403;
    error.type = "missing parameters";
    next(error);
  }

  // const oldDiary = await Diary.findOne({
  //   date: date,
  //   _id: diaryId,
  //   userId: req.userId,
  // });

  Diary.deleteOne({
    date: date,
    _id: diaryId,
    userId: req.userId,
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      const error = new Error("Diary could not found");
      error.statusCode = 404;
      error.type = "not found";
      next(error);
    });

  // if (oldDiary) {
  //   oldDiary.remo;
  // } else {
  //   const error = new Error("A diary already exists for this date.");
  //   error.statusCode = 403;
  //   error.type = "invalid date";
  //   next(error);
  // }
};

const validateDate = (date) => {
  const now = new Date();
  if (now.getTime() < date.getTime()) {
    return false;
  }

  const hourTolerance = 2;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 2);
  yesterday.setHours(24 - hourTolerance, 0, 0, 0);

  if (yesterday.getTime() > date.getTime()) {
    return false;
  }

  return true;
};

const getQueryFilter = (query, next) => {
  const _idString = query._id;
  const date = query.date;

  if (_idString) {
    try {
      const filter = { _id: new mongoose.Types.ObjectId(_idString) };
      return filter;
    } catch (error) {
      error.message = "Diary id is not valid!";
      error.statusCode = 403;
      error.type = "invalid id";
      next(error);
    }
  } else if (date) {
    const filter = { date };
    return filter;
  } else {
    const error = new Error("Filter must be assigned!");
    error.type = "invalid arguments";
    error.statusCode = 403;
    next(error);
  }
};
