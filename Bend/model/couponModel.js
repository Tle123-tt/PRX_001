const mongoose = require("mongoose"); // Erase if already required

var couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    discound: {
      type: String,
      required: true,
    },
    expiry: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Coupon = mongoose.model("dta_coupon", couponSchema);

module.exports=Coupon