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
    const accesstoken = generateAccessToken(response._id, role);
    const refreshtoken = generateRefreshToken(response._id);
    //Lưu refreshToken vào database
    await User.findByIdAndUpdate(response._id, { refreshtoken }, { new: true });
    //Lưu refreshToken vào cookie
    res.cookie("RefreshToken", refreshtoken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      sucess: true,
      message: "Đăng nhập thành công",
      accesstoken: accesstoken,
      refreshtoken: refreshtoken,
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
    success: false,
    rs: user ? user : "User not found",
  });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie && !cookie.refreshtoken) throw new Error("No refresh token in cookies");
  jwt.verify(cookie.refreshtoken, process.env.JWT_TOKEN,async (err, decode)=>{
    if (err) throw new Error('Invalid refresh token')
    const response = await User.findOne({_id: decode._id, refreshtoken: cookie.refreshtoken})
    return res.status(200).json({
      success: response ? true: false,
      newAccessToken: response ? generateAccessToken(response._id, response.role):'Refresh token not matched'
    })
  }) 
});  

module.exports = { register, login, getCurrent, refreshAccessToken };

 