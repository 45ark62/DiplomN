const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//ниже мы должны описать поля,которые нам нужны
const cardsTrainSchema = new Schema({
  mediaPhoto: { type: String, default: "" },
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
module.exports = mongoose.model("cardsTrain", cardsTrainSchema);
