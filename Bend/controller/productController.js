const { response } = require("express");
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

  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (matchedEl) => `$${matchedEl}`
  );
  const formatedQueries = JSON.parse(queryString);
  console.log(formatedQueries);

  if (queries?.title)
    formatedQueries.title = { $regex: queries.title, $options: "i" };
  let queryComand = Product.find(formatedQueries);

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryComand = queryComand.sort(sortBy);
  }

  if (req.body.fields) {
    const fields = req.body.fields.split(",").json(" ");
    queryComand = queryComand.select(fields);
  }

  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryComand.skip(skip).limit(limit);

  queryComand
    .then(async (response) => {
      const counts = await Product.find(formatedQueries).countDocuments();
      return res.status(200).json({
        success: response ? true : false,
        Products: response ? response : "Cannot get product",
        counts,
      });
    })
    .catch((err) => {
      if (err) throw new Error(err.message);
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

const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, pid } = req.body;

  if (!star || !pid) throw new Error("Missing inputs");
  const ratingProduct = await Product.findById(pid);
  const alreadyRating = ratingProduct?.rating?.find(
    (el) => el.postedBy === _id
  );

  if (alreadyRating) {
    await Product.updateOne(
      {
        rating: { $elemMatch: alreadyRating },
      },
      {
        $set: { "rating.$.start": star, "rating.$.comment": comment },
      },
      { new: true }
    );
  } else {
    const response = await Product.findByIdAndUpdate(
      pid,
      {
        $push: { rating: { star, comment, postedBy: _id } },
      },
      { new: true }
    );
  }

  const updateProduct = await Product.findById(pid);
  const ratingCount = updateProduct.rating.length;
  const sumRatings = updateProduct.rating.reduce(
    (sum, el) => sum + +el.star,
    0
  );
  updateProduct.totalRating = Math.round((sumRatings * 10) / ratingCount) / 10;

  await updateProduct.save();

  return res.status(200).json({
    status: true,
    updateProduct,
  });
});

const uploadImagesProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!req.files) throw new Error("Missing inputs");
  const response = await Product.findByIdAndUpdate(pid, {
    $push: { images: { $each: req.files.map((el) => el.path) } },
  });
  return res.json({
    status: response ? true : false,
    updateProduct: response ? response : "Cannot upload images product",
  });
});

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  rating,
  uploadImagesProduct,
};
