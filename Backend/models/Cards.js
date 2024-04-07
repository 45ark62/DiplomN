const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//ниже мы должны описать поля,которые нам нужны
const cardsSchema = new Schema({
  typeTrain: { type: Number, required: true },
  mediaPhoto: { type: String, default: "" },
  mediaVideo: { type: String, required: true },
  Name: {
    type: String,
    required: true,
  },
  questionArray: [
    {
      level: { type: Number, required: true },

      mediaPhoto: {
        type: String,
      },
      task: { type: String, required: true },
      textquestion: { type: String, required: true },
      answer: { type: String, required: true },
    },
  ],
});
module.exports = mongoose.model("cards", cardsSchema);
