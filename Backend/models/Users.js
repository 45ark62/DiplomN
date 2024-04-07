const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//ниже мы должны описать поля,которые нам нужны
const usersSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  primaryTestScore: {
    type: Number,
    default: "0",
  },
});
module.exports = mongoose.model("users", usersSchema);
