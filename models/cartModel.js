const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user_id:String,
    items:[
        {


        }
    ]

  
});
const cart = mongoose.model("cart", cartSchema);
module.exports = cart;
