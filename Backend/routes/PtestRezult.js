const express = require("express");
const router = express.Router();
const controller = require("../controllers/PtestRezult");
const passport = require("passport");
//история всех попыток по всем тестам пользователя

router.get(
  "/",
  passport.authenticate("jwt", { session: false }), //паспорт добавляем,когда надо закрыть роут для неавторизированного пользователя
  controller.getPtestRezult
);

//создание первичного тестирования

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.createPTestScore
);

module.exports = router;
