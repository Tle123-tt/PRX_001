const router = require("express").Router();
const Blog = require("../controller/blogController");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], Blog.createBlog);
router.get("/", Blog.getBlogs);

router.get("/one/:bid",Blog.getBlog)
router.put("/liked/:bid", verifyAccessToken, Blog.likeBlog);
router.put("/disliked/:bid", verifyAccessToken, Blog.dislikeBlog);
router.put("/:bid", [verifyAccessToken, isAdmin], Blog.updateBlog);

module.exports = router;
