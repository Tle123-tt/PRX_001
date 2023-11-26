const Coupon = require("../model/couponModel");
const asyncHandler = require("express-async-handler");

const createCoupon = asyncHandler(async (req, res) => {
  const { name, discound, expiry } = req.body;
  if (!name || !discound || !expiry) throw new Error("Missing inputs");
  const response = await Coupon.create({
    ...req.body,
    expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000,
  });
  return res.json({
    success: response ? true : false,
    createCoupon: response ? response : "Cannot create new blog",
  });
});

module.exports = {
  createCoupon,
};
