const blogCategory = require("../model/blogCategory");
const asyncHandler = require("express-async-handler");

const createCategory = asyncHandler(async (req, res) => {
  const response = await blogCategory.create(req.body);
  return res.json({
    success: response ? true : false,
    createCategory: response ? response : "Cannot create new blog-category",
  });
});

const getCategory = asyncHandler(async (req, res) => {
  const response = await blogCategory.find().select("title _id");
  return res.json({
    success: response ? true : false,
    productCategory: response ? response : "Cannot get blog-category",
  });
});

const updateCategory = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  const response = await blogCategory.findByIdAndUpdate(bcid, req.body, {
    new: true,
  });
  return res.json({
    success: response ? true : false,
    updateCategory: response ? response : "Cannot update blog-category",
  });
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  const response = await blogCategory.findByIdAndDelete(bcid);
  return res.json({
    success: response ? true : false,
    updateCategory: response ? response : "Cannot delete blog-category",
  });
});

module.exports = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
