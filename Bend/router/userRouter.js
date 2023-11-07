const router = require("express").Router();
const User = require("../controller/userController");
const { verifyAccessToken } = require("../middlewares/verifyToken");

router.post("/register", User.register);
router.post("/login", User.login);
router.get("/current", verifyAccessToken, User.getCurrent);
router.post("/refreshtoken", User.refreshAccessToken);
router.get("/logout",User.logout);


module.exports = router;
