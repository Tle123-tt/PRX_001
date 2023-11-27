const mongoose = require("mongoose"); // Erase if already required

var orderSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref:'product'
      },
      count:Number,
      language:String
    },
  ],
  status: {
    type: String,
    default: "Processing",
    enum: ["Cancelled", "Processing", "Successed"],
  },
  total: Number,
  coupon:{
    type:mongoose.Types.ObjectId,
    ref:'coupon'
  },
  oderBy: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
