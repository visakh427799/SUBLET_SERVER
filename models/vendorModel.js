const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String, default: null },
  date_joined: Date,
  phone: { type: String, default: null },
  is_approved:Boolean,
});
const vendor = mongoose.model("vendor", vendorSchema);
module.exports = vendor;