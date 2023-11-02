const UserRouter = require("./userRouter");
const {notFound,errHandler}=require('../middlewares/errHandle')

const initRoutes=(app)=>{
    app.use('/api/user/', UserRouter)
    
    app.use(notFound)
    app.use(errHandler)
}

module.exports=initRoutes