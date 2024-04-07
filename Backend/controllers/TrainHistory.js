const TrainHistory = require("../models/TrainHistory");
const user = require("../models/Users");
const errorHandler = require("../utils/errorHandler");
const mongoose = require("mongoose");
//получение всех попыток по всем тестам пользователя
module.exports.getUserHistory = async function (req, res) {
  try {
    const userHistoryAll = await TrainHistory.find({
      userId: req.user.id,
    }).sort({ date: -1 }); // Сортируем по убыванию даты
    res.status(200).json(userHistoryAll);
  } catch (error) {
    errorHandler(res, error);
  }
};
//получение всех попыток по айди теста пользователя
module.exports.getAtemptsByTestId = async function (req, res) {
  try {
    const userId = req.user._id; //mongoose.Types.ObjectId(req.user.id);
    const testId = req.params.testId; // mongoose.Types.ObjectId(req.params.testId);

    const attempts = await TrainHistory.find({
      userId: userId,
      testId: testId,
    }).sort({ date: -1 }); // Сортируем по убыванию даты
    res.status(200).json(attempts);
  } catch (error) {
    errorHandler(res, error);
  }
};
//создание попытки по тесту
module.exports.createAtemptsByTestId = async function (req, res) {
  try {
    const createAttempts = await new TrainHistory({
      userId: req.user.id,
      testId: req.params.testId,
      attempt: req.body.attempt,
      score: req.body.score,
      date: new Date(),
      testName: req.body.testName,
      time: req.body.time,
    }).save();
    res.status(201).json(createAttempts);
  } catch (error) {
    errorHandler(res, error);
  }
};
//создание попытки первичного теста
module.exports.createPTestScore = async function (req, res) {
  try {
    const createScore = await new TrainHistory({
      userId: req.user.id,
      primaryTestScore: req.params.primaryTestScore,
    }).save();
    res.status(201).json(createScore);
  } catch (error) {
    errorHandler(res, error);
  }
};
//получение номера последней попытки по тесту
module.exports.latestAttempt = async function (req, res) {
  try {
    const latestAttempt = await TrainHistory.findOne({
      userId: req.user.id,
      testId: req.params.testId,
    })
      .sort({ date: -1 })
      .limit(1);

    res.status(200).json(latestAttempt);
  } catch (error) {
    errorHandler(res, error);
  }
};
//расчет среднего попыток по тесту за весь период
module.exports.getAverage = async function (req, res) {
  try {
    const testId = new mongoose.Types.ObjectId(req.params.testId);

    const averageScore = await TrainHistory.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.user.id),
          testId: testId,
        },
      },
      {
        $group: {
          _id: "$testId",
          averageScore: { $avg: "$score" },
        },
      },
    ]);

    if (averageScore.length > 0) {
      res.status(200).json({ averageScore: averageScore[0].averageScore });
    } else {
      res
        .status(404)
        .json({ message: "Данные для расчета среднего не найдены" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};
//расчет среднего попыток по тесту за последние 2 недели
module.exports.getAverageScoreLastTwoWeeks = async function (req, res) {
  try {
    const testId = new mongoose.Types.ObjectId(req.params.testId);

    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    const averageScore = await TrainHistory.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.user.id),
          testId: testId,
          date: { $gte: twoWeeksAgo },
        },
      },
      {
        $group: {
          _id: "$testId",
          averageScore: { $avg: "$score" },
        },
      },
    ]);

    if (averageScore.length > 0) {
      res.status(200).json({ averageScore: averageScore[0].averageScore });
    } else {
      res.status(404).json({
        message:
          "Данные для расчета среднего балла не найдены за последние две недели",
      });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};
// получение лучшей попытки по времени и баллам за весь период
module.exports.getBestAttempt = async function (req, res) {
  try {
    const testId = new mongoose.Types.ObjectId(req.params.testId);

    const bestAttempt = await TrainHistory.findOne({
      userId: new mongoose.Types.ObjectId(req.user.id),
      testId: testId,
    })
      .sort({ score: -1, time: 1 })
      .limit(1);

    if (bestAttempt) {
      res.status(200).json(bestAttempt);
    } else {
      res.status(404).json({
        message: "Лучшие данные для попытки не найдены за весь период времени",
      });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};
//получение последней попытки
module.exports.getLatestAttempt = async function (req, res) {
  try {
    const testId = new mongoose.Types.ObjectId(req.params.testId);

    const latestAttempt = await TrainHistory.findOne({
      userId: new mongoose.Types.ObjectId(req.user.id),
      testId: testId,
    })
      .sort({ date: -1 })
      .limit(1);

    if (latestAttempt) {
      res.status(200).json(latestAttempt);
    } else {
      res.status(404).json({
        message:
          "Данные для последней попытки не найдены за весь период времени",
      });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};
