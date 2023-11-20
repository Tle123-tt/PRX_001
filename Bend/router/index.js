const UserRouter = require("./userRouter");
const ProductRouter = require("./productRouter");
const {notFound,errHandler}=require('../middlewares/errHandle')

const initRoutes=(app)=>{
    app.use('/api/user/', UserRouter)
    app.use('/api/product/', ProductRouter)
    
    app.use(notFound)
    app.use(errHandler)
}

module.exports=initRoutes