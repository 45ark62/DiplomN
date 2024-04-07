const PTestRezult = require("../models/PtestRezult");
const user = require("../models/Users");
const errorHandler = require("../utils/errorHandler");
const mongoose = require("mongoose");

module.exports.getPtestRezult = async function (req, res) {
  try {
    const userHistoryAll = await PTestRezult.find({ userId: req.user.id }).sort(
      { date: -1 }
    ); // Сортируем по убыванию даты
    res.status(200).json(userHistoryAll);
  } catch (error) {
    errorHandler(res, error);
  }
};
//создание попытки первичного теста
module.exports.createPTestScore = async function (req, res) {
  try {
    const createScore = await new PTestRezult({
      userId: req.user.id,
      score: req.body.score,
      attempt: req.body.attempt,
      date: new Date(),
      testName: req.body.testName,
      scoreInPercent: req.body.scoreInPercent,
    }).save();
    res.status(201).json(createScore);
  } catch (error) {
    errorHandler(res, error);
  }
};
