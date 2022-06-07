const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String, default: null },
  date_joined: Date,
  phone: { type: String, default: null },
});
const user = mongoose.model("user", userSchema);
module.exports = user;
