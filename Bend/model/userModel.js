const mongoose = require("mongoose");
const bcrybt = require("bcrypt");

const userModel = new mongoose.Schema(
  {
    firstname: {
      type: String,
      require: true,
    },
    lastname: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unquie: true,
    },
    mobile: {
      type: String,
      require: true,
      unquie: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      default: true,
    },
    cart: {
      type: Array,
      default: [],
    },
    address: [{ type: mongoose.Types.ObjectId, ref: "Address" }],
    wishlist: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
    isBlocked: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    passwordChangedAt: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userModel.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = bcrybt.genSaltSync(10);
  this.password = await bcrybt.hash(this.password, salt);
});

userModel.methods = {
  isCorrectPassword: async function (password) {
    return await bcrybt.compare(password, this.password)
  },
};

const User = mongoose.model("dta_user", userModel);

module.exports = User ;
