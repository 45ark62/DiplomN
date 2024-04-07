const express = require("express");
const router = express.Router();
const controller = require("../controllers/tests");
//localhost:8000/api/auth/login
router.get("/primaryTest", controller.primaryTest);
router.post("/primaryTest", controller.CreatePrimaryTest);
//localhost:8000/api/auth/register
router.get("/secondaryTest", controller.secondaryTest);
router.post("/secondaryTest", controller.CreateSecondaryTest);

module.exports = router;
