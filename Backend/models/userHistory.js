const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//ниже мы должны описать поля,которые нам нужны
const userHistorySchema = new Schema({
  userId: { ref: "users", type: Schema.Types.ObjectId },

  testId: { ref: "cards", type: Schema.Types.ObjectId },
  
  attempt: { type: Number, default: 0 },
  score: { type: Number },
  date: { type: Date },
  testName: { type: String },
});
module.exports = mongoose.model("userHistory", userHistorySchema);
