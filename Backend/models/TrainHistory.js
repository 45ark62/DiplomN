const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//ниже мы должны описать поля,которые нам нужны
const TrainHistorySchema = new Schema({
  userId: { ref: "users", type: Schema.Types.ObjectId },

  testId: { ref: "cardsTrain", type: Schema.Types.ObjectId },

  attempt: { type: Number, default: 0 },
  score: { type: Number },
  date: { type: Date },
  testName: { type: String },
  time: { type: String },
});
module.exports = mongoose.model("TrainHistory", TrainHistorySchema);
