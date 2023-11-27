const router = require("express").Router();
const Coupon = require("../controller/couponController");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], Coupon.createCoupon);
router.get("/", Coupon.getCoupon);

router.put("/:cid", [verifyAccessToken, isAdmin], Coupon.updateCoupon);
router.delete("/:cid", [verifyAccessToken, isAdmin], Coupon.deleteCoupon);

module.exports = router;
