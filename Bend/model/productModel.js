const mongoose = require("mongoose");

const productModel = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
    },
    slug: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
    },
    desctription: {
      type: String,
      require: true,
    },
    publiser: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    quantity: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    language: {
      type: String,
      enum: ["English", "VietNamese"],
    },
    rating: [
      {
        star: { type: String },
        postedBy: { type: mongoose.Types.ObjectId, ref: "user" },
        comment: { type: String },
      },
    ],
    totalRating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("dta_product", productModel);

module.exports = Product;
