const router = require("express").Router();
const Coupon = require("../controller/couponController");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], Coupon.createCoupon);

module.exports = router;