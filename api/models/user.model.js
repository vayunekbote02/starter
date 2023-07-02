const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  quote: { type: String },
});

const UserModel = new mongoose.model("users", User);

module.exports = UserModel;
