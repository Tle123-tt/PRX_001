const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    numberView: {
      type: Number,
      default: 0,
    },
    // isLiked: {
    //   type: Boolean,
    //   debugger: false,
    // },
    // isDisliked: {
    //   type: Boolean,
    //   default: false,
    // },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "dta_user",
      },
    ],
    dislikes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "dta_user",
      },
    ],
    image: {
      type: String,
      default:
        "https://png.pngtree.com/thumb_back/fw800/background/20190221/ourmid/pngtree-purple-blue-simple-gradient-background-image_16162.jpg",
    },
    author: {
      type: String,
      default: "admin",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Blog = mongoose.model("dta_blog", blogSchema);

module.exports = Blog;
