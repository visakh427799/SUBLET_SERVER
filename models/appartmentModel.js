const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appartmentSchema = new Schema({
 vendor_id:String,
 name:String,
 photo:String,
 phone:Number,
 address:String,
 no_rooms:Number,
 city:String,
 pincode:Number,
 street:String,
 price:Number,
 google_map_url:String,
 is_booked:Boolean

});
const appartment = mongoose.model("appartment", appartmentSchema);
module.exports = appartment;