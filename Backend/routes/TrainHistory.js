const express = require("express");
const router = express.Router();
const controller = require("../controllers/TrainHistory");
const passport = require("passport");
//история всех попыток по всем тестам пользователя
router.get(
  "/",
  passport.authenticate("jwt", { session: false }), //паспорт добавляем,когда надо закрыть роут для неавторизированного пользователя
  controller.getUserHistory
);
//получение попыток по одному тесту
router.get(
  "/:testId",
  passport.authenticate("jwt", { session: false }),
  controller.getAtemptsByTestId
);
//получение последней попытки по тесту
router.get(
  "/lastAttempt/:testId",
  passport.authenticate("jwt", { session: false }),
  controller.latestAttempt
);
//получение лучшей попытки по тесту
router.get(
  "/bestAttempt/:testId",
  passport.authenticate("jwt", { session: false }),
  controller.getBestAttempt
);
//получение последней попытки
router.get(
  "/lastAttempt/:testId",
  passport.authenticate("jwt", { session: false }),
  controller.getLatestAttempt
);
//получение среднего балла по тесту за весь период
router.get(
  "/average/:testId",
  passport.authenticate("jwt", { session: false }),
  controller.getAverage
);
//получение среднего балла по тесту за последние 2 недели
router.get(
  "/averageLastTwoWeeks/:testId",
  passport.authenticate("jwt", { session: false }),
  controller.getAverageScoreLastTwoWeeks
);
//создание попытки из теста
router.post(
  "/:testId",
  passport.authenticate("jwt", { session: false }),
  controller.createAtemptsByTestId
);

module.exports = router;
