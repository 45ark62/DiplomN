const cards = require("../models/Cards");
const errorHandler = require("../utils/errorHandler");
module.exports.getAll = async function (req, res) {
  try {
    const Cards = await cards.find();
    res.status(200).json(Cards);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.getCardById = async function (req, res) {
  const Cards = await cards.findById(req.params.CardId);
  res.status(200).json(Cards);
  try {
  } catch (error) {
    errorHandler(res, error);
  }
};
