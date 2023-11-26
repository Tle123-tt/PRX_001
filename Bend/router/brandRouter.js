const router = require("express").Router();
const Brand = require("../controller/publiserController");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], Brand.createBrand);
router.get("/", Brand.getBrand);
router.put("/:bid", [verifyAccessToken, isAdmin], Brand.updateBrand);
router.delete("/:bid", [verifyAccessToken, isAdmin], Brand.deleteBrand);

module.exports = router;
