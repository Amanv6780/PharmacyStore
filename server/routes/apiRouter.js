const express = require("express");
const { userAuthRouter } = require("./userRoutes/userAuthRoutes");
const { productRouter } = require("./productRoutes/addProductRoutes");
const { orderRouter } = require("./orderRoutes/orderRoutes");
const { profileRouter } = require("./edituserprofiles/profilerouter");
const {userRouter} = require("./userRoutes/getUser");
const { updateUserRouter } = require("./userRoutes/userDataUpdate");


const apiRouter = express.Router();
    
apiRouter.use("/auth", userAuthRouter);
apiRouter.use('/products',productRouter)
apiRouter.use('/orders',orderRouter)
apiRouter.use('/profile',profileRouter)
apiRouter.use('/getusers',userRouter)
apiRouter.use('/updateuser', updateUserRouter)

module.exports = { apiRouter };
