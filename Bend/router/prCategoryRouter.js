const router = require("express").Router();
const PrductCategory=require("../controller/prductCategory")
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], PrductCategory.createCategory);
router.get("/", PrductCategory.getCategory);
router.put("/:pcid", [verifyAccessToken, isAdmin], PrductCategory.updateCategory);
router.delete("/:pcid", [verifyAccessToken, isAdmin], PrductCategory.deleteCategory);

module.exports = router;