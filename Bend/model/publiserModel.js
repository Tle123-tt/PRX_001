const mongoose = require("mongoose"); // Erase if already required

var brandSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.model("dta_brand", brandSchema);

module.exports = Brand;
