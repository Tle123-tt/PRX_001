const jwt = require("jsonwebtoken");

const generateAccessToken = (uid, role) =>
  jwt.sign({ _id: uid, role }, process.env.JWT_TOKEN, { expiresIn: "15d" });
const generateRefreshToken = (uid) =>
  jwt.sign({ _id: uid }, process.env.JWT_TOKEN, { expiresIn: "60d" });

module.exports = {
  generateAccessToken,
  generateRefreshToken
};
