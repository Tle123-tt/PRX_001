const mongoose = require("mongoose");
const bcrybt = require("bcrypt");
const crypto = require("crypto");

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
      // unquie: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      default: "user",
    },
    cart: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "product",
        },
        quantity:Number,
        language:String,

      },
    ],
    address: String,
    wishlist: [
      {
        type: mongoose.Types.ObjectId,
        ref: "product",
      },
    ],
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
    return await bcrybt.compare(password, this.password);
  },
  createPasswordChangedToken: function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.passwordResetExpires = Date.now() + 15 * 60 * 1000;
    return resetToken;
  },
};

const User = mongoose.model("dta_user", userModel);

module.exports = User;
