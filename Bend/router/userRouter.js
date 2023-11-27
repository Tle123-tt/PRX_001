const router = require("express").Router();
const User = require("../controller/userController");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/register", User.register);
router.post("/login", User.login);
router.get("/current", verifyAccessToken, User.getCurrent);
router.post("/refreshtoken", User.refreshAccessToken);
router.get("/logout", verifyAccessToken, User.logout);
router.get("/forgotpassword", User.forgotPassword);
router.put("/resetpassword", User.resetPassword);
router.get("/", [verifyAccessToken, isAdmin], User.getUsers);
router.delete("/", [verifyAccessToken, isAdmin], User.deleteUsers);
router.put("/address",[verifyAccessToken], User.updateAddressUser);
router.put("/cart",[verifyAccessToken], User.updateCart);
router.put("/current",[verifyAccessToken], User.updateUsers);
router.put("/:uid",[verifyAccessToken, isAdmin], User.updateUsersbyAdmin);


module.exports = router;
