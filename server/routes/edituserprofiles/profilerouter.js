const express = require('express');
const { getUserRouter } = require('./getUser');
const { putUserRouter } = require('./putUser');

const profileRouter = express.Router()



profileRouter.use('/getuser',getUserRouter)
profileRouter.use("/putuser",putUserRouter);


module.exports = {
    profileRouter
}