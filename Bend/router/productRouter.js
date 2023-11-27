const router = require("express").Router();
const Product = require("../controller/productController");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploader = require("../config/cloudinary.config");

router.post("/", [verifyAccessToken, isAdmin], Product.createProduct);
router.get("/", Product.getProducts);
router.put("/rating", verifyAccessToken, Product.rating);

router.put(
  "/uploadimage/:pid",
  [verifyAccessToken, isAdmin],
  uploader.array("images", 12),
  Product.uploadImagesProduct
);
router.put("/:pid", [verifyAccessToken, isAdmin], Product.updateProduct);
router.delete("/:pid", [verifyAccessToken, isAdmin], Product.deleteProduct);
router.get("/:pid", Product.getProduct);

module.exports = router;
