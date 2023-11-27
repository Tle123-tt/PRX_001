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

const getCoupon = asyncHandler(async (req, res) => {
  const response = await Coupon.find();
  return res.json({
    success: response ? true : false,
    createCoupon: response ? response : "Cannot get blog",
  });
});

const updateCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body.expiry)
    req.body.expiry = Date.now() + +req.body.expiry * 24 * 60 * 60 * 1000;
  const response = await Coupon.findByIdAndUpdate(cid, req.body, { new: true });
  return res.json({
    success: response ? true : false,
    createCoupon: response ? response : "Cannot update blog",
  });
});

const deleteCoupon = asyncHandler(async (req, res) => {
  const { cid} = req.params;
  const response = await Coupon.findByIdAndDelete(cid);
  return res.json({
    success: response ? true : false,
    createCoupon: response ? response : "Cannot create new blog",
  });
});

module.exports = {
  createCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon
};
