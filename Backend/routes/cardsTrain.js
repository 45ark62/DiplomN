const express = require("express");
const router = express.Router();
const controller = require("../controllers/cardsTrain");
//localhost:8000/api/auth/login
router.get("/", controller.getAll);
//localhost:8000/api/auth/register
router.get("/:CardId", controller.getCardById);

module.exports = router;
