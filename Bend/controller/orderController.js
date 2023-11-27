const Coupon=require("../model/couponModel");
const Order = require("../model/oderModel");
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { coupon } = req.body;
  const userCart = await User.findById(_id)
    .select("cart")
    .populate("cart.product", "title price");
  console.log(userCart);
  const products = userCart?.cart?.map((el) => ({
    product: el.product._id,
    count: el.quantity,
    language: el.language,
  }));
  let total = userCart?.cart?.reduce(
    (sum, el) => el.product.price * el.quantity + sum,
    0
  );
  const createData={products, total, oderBy: _id}
  if (coupon) {
    const selectedCoupon=await Coupon.findById(coupon)
    total = Math.round((total * (1 - +selectedCoupon.discound / 100)) / 1000) * 1000 || total;
    createData.total=total
    createData.coupon=coupon
  }
  const rs = await Order.create(createData);
  return res.json({
    success: rs ? true : false,
    rs: rs ? rs : "Some thing wrong",
  });
});

const updateOrder = asyncHandler(async (req, res) => {
  const { oid } = req.params;
  const { status } = req.body;
  if (!status) throw new Error("Missing inputs");

  const response = await Order.findByIdAndUpdate(oid, { status }, { new: true });
  
  return res.json({
    success: response ? true : false,
    response: response ? response : "Some thing wrong",
  });
});

const getUserOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const response = await Order.find({oderBy:_id});

  return res.json({
    success: response ? true : false,
    response: response ? response : "Some thing wrong",
  });
});

const getOrder = asyncHandler(async (req, res) => {
  const response = await Order.find();

  return res.json({
    success: response ? true : false,
    response: response ? response : "Some thing wrong",
  });
});

module.exports = { 
  createOrder, 
  updateOrder,
  getUserOrder,
  getOrder
 };
