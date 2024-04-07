const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//ниже мы должны описать поля,которые нам нужны
const PrimarytestSchema = new Schema({
  mediaTask: { type: String, default: "" },
  textTask: {
    type: String,
    default: "",
  },

  timeShow: {
    type: Number,
    default: "0",
  },
  mediaType: { type: String },
  arrayQuestions: [
    {
      question: { type: String },
      answer: { type: String },
    },
  ],
  answer: { type: String, default: "" },
});
module.exports = mongoose.model("Ptest", PrimarytestSchema);
