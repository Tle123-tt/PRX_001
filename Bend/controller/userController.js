const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const sendMail = require("../ultils/sendMail");
const crypto = require("crypto");

const register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  if (!email || !password || !firstname || !lastname) {
    return res.status(400).json({
      sucess: false,
      mes: "Missing inputs",
    });
  }
  const user = await User.findOne({ email });
  if (user) {
    throw new Error("User has existed");
  } else {
    const responses = await User.create(req.body);

    return res.status(200).json({
      sucess: responses ? true : false,
      data: responses,
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      sucess: false,
      mes: "Missing inputs",
    });
  }
  const response = await User.findOne({ email });
  if (response && (await response.isCorrectPassword(password))) {
    const { password, role, refreshToken, ...userData } = response.toObject();
    const accessToken = generateAccessToken(response._id, role);
    const NewrefreshToken = generateRefreshToken(response._id);
    //Lưu refreshToken vào database
    await User.findByIdAndUpdate(
      response._id,
      { refreshToken: NewrefreshToken },
      { new: true }
    );
    //Lưu refreshToken vào cookie
    res.cookie("RefreshToken", NewrefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      sucess: true,
      message: "Đăng nhập thành công",
      response:response,
      accessToken: accessToken,
    });
  } else {
    throw new Error("Invalid credentials!");
  }
});

const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select("-refreshToken -password -role");
  return res.status(200).json({
    success: user ? true : false,
    rs: user ? user : "User not found",
  });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  console.log(req.cookies.RefreshToken);
  if (!cookie && !cookie.RefreshToken)
    throw new Error("No refresh token in cookies");
  const rs = await jwt.verify(cookie.RefreshToken, process.env.JWT_TOKEN);
  const response = await User.findOne({
    _id: rs._id,
    refreshToken: cookie.RefreshToken,
  });
  return res.status(200).json({
    success: response ? true : false,
    newAccessToken: response
      ? generateAccessToken(response._id, response.role)
      : "Refresh token not matched",
  });
  // await jwt.verify(
  //   cookie.RefreshToken,
  //   process.env.JWT_TOKEN,
  //   async (err, doc) => {
  //     if (err) throw new Error("Invalid refresh token", console.log(err));
  //     const response = await User.findOne({
  //       _id: doc._id,
  //       refreshToken: cookie.RefreshToken,
  //     });
  //     return res.status(200).json({
  //       success: response ? true : false,
  //       newAccessToken: response
  //         ? generateAccessToken(response._id, response.role)
  //         : "Refresh token not matched",
  //     });
  //   }
  // );
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  console.log("RefreshToken", req.cookies.RefreshToken);
  if (!cookie || !cookie.RefreshToken)
    throw new Error("No refresh token in cookies");
  await User.findOneAndUpdate(
    { refreshToken: cookie.RefreshToken },
    { refreshToken: "" },
    { new: true }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    success: true,
    mes: "Logout is done",
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.query;
  if (!email) throw new Error("Missing email");
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  const resetToken = user.createPasswordChangedToken();
  await user.save();
  const html = `Vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.
  <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Bấm vào đây</a>`;
  const data = {
    email,
    html,
  };
  const rs = await sendMail(data);
  return res.status(200).json({
    success: true,
    rs,
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  if (!password || !token) throw new Error("Missing imputs");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Invalid reset token");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordChangedAt = Date.now();
  user.passwordResetExpires = undefined;
  await user.save();
  return res.status(200).json({
    success: user ? true : false,
    mes: user ? "Update password" : "Something went wrong",
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const response = await User.find().select("-refreshToken -password -role");
  return res.status(200).json({
    success: response ? true : false,
    users: response,
  });
});

const deleteUsers = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  if (!_id) throw new Error("Missing imputs");
  const response = await User.findByIdAndDelete(_id);
  return res.status(200).json({
    success: response ? true : false,
    deleteUsers: response ? `user with email ${response.email}` : `No user delete`,
  });
});

const updateUsers = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id || Object.keys(req.body).length === 0) throw new Error("Missing imputs");
  const response = await User.findByIdAndUpdate(_id, req.body, {new: true}).select('-password -role -refreshToken');
  return res.status(200).json({
    success: response ? true : false,
    updateUsers: response ? response:'Some thing went wrong',
  });
});

const updateUsersbyAdmin = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing imputs");
  const response = await User.findByIdAndUpdate(uid, req.body, {new: true}).select('-password -role -refreshToken');
  return res.status(200).json({
    success: response ? true : false,
    updateUsers: response ? response:'Some thing went wrong',
  });
});


module.exports = {
  register,
  login,
  getCurrent,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUsers,
  updateUsers,
  updateUsersbyAdmin
};
