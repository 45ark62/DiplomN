const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const keys = require("../config/keys");
const errorHandler = require("../utils/errorHandler");

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email });
  if (candidate) {
    const passwordResult = bcrypt.compareSync(
      req.body.password,
      candidate.password
    );
    if (passwordResult) {
      //генерация токена,пароли совпали
      const token = jwt.sign(
        {
          email: candidate.email,
          userId: candidate._id,
        },
        keys.JWT,
        { expiresIn: 60 * 60 * 24 }
      );
      res.status(200).json({
        token: `Bearer ${token}`,
        email: candidate.email, //оставь один токен,когда разберешься,как его расшифровать в фронте
        username: candidate.username,
        id: candidate._id,
      });
    } else {
      res.status(401).json({ message: "Пароли не совпадают.Попробуйте снова" });
    }
  } else {
    res.status(404).json({ message: "Пользователь с таким email не найден" });
  }
};

module.exports.register = async function (req, res) {
  //email password username

  const candidate = await User.findOne({ email: req.body.email });
  if (candidate) {
    //пользователь существует,выдать ошибку
    res
      .status(409)
      .json({ message: "Пользователь с таким email уже существует." });
  } else {
    //создаем пользователя
    const salt = bcrypt.genSaltSync(10); //переменная которая шифрует данные
    const password = req.body.password;
    const user = new User({
      email: req.body.email,
      username: req.body.username,
      password: bcrypt.hashSync(password, salt), //получаем хэш пароля пользователя и его сохрняем в бд
    });

    try {
      await user.save();
      res.status(201).json(user);
    } catch (e) {
      errorHandler(res, e);
    }
  }
};
