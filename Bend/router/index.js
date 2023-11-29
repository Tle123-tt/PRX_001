const UserRouter = require("./userRouter");
const ProductRouter = require("./productRouter");
const ProductCategory = require("./prCategoryRouter");
const BlogCategory = require("./blogCategoryRouter");
const BlogRouter = require("./blogRouter");
const BrandRouter = require("./brandRouter");
const CouponRouter = require("./couponRouter");
const OrderRouter = require("./orderRouter");
const { notFound, errHandler } = require("../middlewares/errHandle");

const initRoutes = (app) => {
  app.use("/api/user/", UserRouter);
  app.use("/api/product/", ProductRouter);
  app.use("/api/prcategory", ProductCategory);
  app.use("/api/blogcategory", BlogCategory);
  app.use("/api/blog", BlogRouter);
  app.use("/api/brand", BrandRouter);
  app.use("/api/coupon", CouponRouter);
  app.use("/api/order",OrderRouter)

  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRoutes; 
