const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const authRoutes = require("./routes/auth");
const cardsRoutes = require("./routes/cards");
const cardsTrainRoutes = require("./routes/cardsTrain");
const testsRoutes = require("./routes/tests");
const userHistoryRoutes = require("./routes/userHistory");
const trainHistoryRoutes = require("./routes/TrainHistory");
const PtestRezult = require("./routes/PtestRezult");
const keys = require("./config/keys");
const app = express();

mongoose
  .connect(keys.MongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

app.use(passport.initialize());
require("./middleware/passport")(passport);

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/cards", cardsRoutes);
app.use("/api/cardsTrain", cardsTrainRoutes);
app.use("/api/tests", testsRoutes);
app.use("/api/userHistory", userHistoryRoutes);
app.use("/api/trainHistory", trainHistoryRoutes);
app.use("/api/Ptest", PtestRezult);
module.exports = app;
//логин и пароль от монго дб
//ElviraRE
//FysUEvoG9ZoAkTlL
