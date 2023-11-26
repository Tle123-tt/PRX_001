const router = require("express").Router();
const BlogCategory=require("../controller/blogCategory")
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], BlogCategory.createCategory);
router.get("/", BlogCategory.getCategory);
router.put("/:bcid", [verifyAccessToken, isAdmin], BlogCategory.updateCategory);
router.delete("/:bcid", [verifyAccessToken, isAdmin], BlogCategory.deleteCategory);

module.exports = router;