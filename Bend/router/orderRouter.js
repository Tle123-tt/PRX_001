const router = require("express").Router();
const Order = require("../controller/orderController");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", verifyAccessToken, Order.createOrder);
router.put("/status/:oid", [verifyAccessToken, isAdmin], Order.updateOrder);
router.get("/admin", [verifyAccessToken], Order.getUserOrder);

module.exports = router;
