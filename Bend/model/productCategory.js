const mongoose = require("mongoose");

const productCategorySchema = new mongoose.Schema(
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

const productCategory = mongoose.model(
  "dta_productcategory",
  productCategorySchema
);

module.exports = productCategory;
