const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
 user_id:String,
 appartment_id:String,
 vendor_id:String,
 date_from:String,
 date_to:String,
 payment_status:Boolean,
 total_price:Number,
 no_days:Number,
 no_days_left:Number,
});
const rental = mongoose.model("rental", rentalSchema);
module.exports = rental;