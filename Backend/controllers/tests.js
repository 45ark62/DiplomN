const PTest = require("../models/PrimaryTest");
const STest = require("../models/SecondaryTest");

const errorHandler = require("../utils/errorHandler");
const mongoose = require("mongoose");
module.exports.primaryTest = async function (req, res) {
  try {
    const prTest = await PTest.find();
    res.status(200).json(prTest);
  } catch (error) {
    errorHandler(res, error);
  }
};
module.exports.secondaryTest = async function (req, res) {
  try {
    const sTest = await STest.find();
    res.status(200).json(sTest);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.CreatePrimaryTest = async function (req, res) {
  try {
    const arrayQuestions = req.body.arrayQuestions.map((question) => {
      return {
        question: question.question,
        answer: question.answer,
      };
    });

    const pTest = await new PTest({
      mediaTask: req.body.mediaTask,
      textTask: req.body.textTask,
      timeShow: req.body.timeShow,
      arrayQuestions: arrayQuestions,
      answer: req.body.answer,
    }).save();

    res.status(201).json(pTest);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.CreateSecondaryTest = async function (req, res) {
  try {
    const arrayQuestions = req.body.arrayQuestions.map((question) => {
      return {
        question: question.question,
        answer: question.answer,
      };
    });

    const sTest = await new PTest({
      mediaTask: req.body.mediaTask,
      textTask: req.body.textTask,
      timeShow: req.body.timeShow,
      arrayQuestions: arrayQuestions,
      answer: req.body.answer,
    }).save();

    res.status(201).json(sTest);
  } catch (error) {
    errorHandler(res, error);
  }
};
