const {response}=require("express");
const Product = require("../model/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createProduct = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const newProduct = await Product.create(req.body);
  return res.status(200).json({
    success: newProduct ? true : false,
    createProduct: newProduct ? newProduct : "Cannot create new product",
  });
});

const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product.findById(pid);
  return res.status(200).json({
    success: product ? true : false,
    Product: product ? product : "Cannot get product",
  });
});

const getProducts = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const excludefields = ["limit", "sort", "page", "fields"];
  excludefields.forEach((el) => delete queries[el]);
  let queryString = JSON.stringify();
  queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchedEl) => `$${matchedEl}`);
  const formateQueries = JSON.parse(queryString);
  if (queries?.title)
    formateQueries.title = { $regex: queries.title, $option: "i" };
  let queryComand=Product.find(formateQueries);
  queryComand.exec((err, response)=>{
    
  })
    // const products = await Product.find();
  return res.status(200).json({
    success: products ? true : false,
    Products: products ? products : "Cannot get product",
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const updateproduct = await Product.findByIdAndUpdate(pid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: updateproduct ? true : false,
    updateProduct: updateproduct ? updateproduct : "Cannot update product",
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const deleteproduct = await Product.findByIdAndDelete(pid);
  return res.status(200).json({
    success: deleteproduct ? true : false,
    deleteProduct: deleteproduct ? deleteproduct : "Cannot delete product",
  });
});

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
