const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const { User } = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

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
    const { password, role, ...userData } = response.toObject();
    const accessToken = generateAccessToken(response._id, role);
    const refreshToken = generateRefreshToken(response._id);
    //Lưu refreshToken vào database
    await User.findByIdAndUpdate(
      response._id,
      { refreshToken: refreshToken },
      { new: true }
    );
    //Lưu refreshToken vào cookie
    res.cookie("RefreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      sucess: true,
      message: "Đăng nhập thành công",
      accessToken: accessToken,
      // refreshToken: refreshToken,
    });
  } else {
    throw new Error("Invalid credentials!");
  }
});

const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById({ _id }).select(
    "-refreshToken -password -role"
  );
  return res.status(200).json({
    success: user ? true : false,
    rs: user ? user : "User not found",
  });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  // const cookie = req.cookies;
  // if (!cookie && !cookie.refreshToken)
  //   throw new Error("No refresh token in cookies");
  // await jwt.verify(
  //   cookie.refreshToken,
  //   process.env.JWT_TOKEN,
  //   async (err, doc) => {
  //     if (err) throw new Error('Invalid refresh token');
  //     const response = await User.findOne({
  //       _id: doc._id,
  //       refreshToken: cookie.refreshToken,
  //     });
  //     return res.status(200).json({
  //       success: response ? true : false,
  //       newAccessToken: response
  //         ? generateAccessToken(response._id, response.role)
  //         : 'Refresh token not matched',
  //     });
  //   }
  // );
  // Lấy token từ cookies
  const cookie = req.cookies;
  // Check xem có token hay không
  if (!cookie && !cookie.refreshToken)
    throw new Error("No refresh token in cookies");
  // Check token có hợp lệ hay không
  const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_TOKEN);
  const response = await User.findOne({
    _id: rs._id,
    refreshToken: cookie.refreshToken,
  });
  return res.status(200).json({
    success: response ? true : false,
    newAccessToken: response
      ? generateAccessToken(response._id, response.role)
      : "Refresh token not matched",
  });
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refreshToken)
    throw new Error("No refresh token in cookies");
  await User.findByIdAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: "" },
    { new: true }
  );
  res.clearCookie("refreshToken",{
    httpOnly:true,
    secure: true
  });
  return res.status(200).json({
    success: true,
    mes:'Logout is done'
  })
});

module.exports = { register, login, getCurrent, refreshAccessToken, logout };
