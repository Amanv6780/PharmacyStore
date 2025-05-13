const express = require('express')
const { getUserDetails } = require('../../controllers/edituserController')
const { authMiddleware } = require('../../middleware/authMiddleware')


const getUserRouter = express.Router()



getUserRouter.get('/',authMiddleware(['user','storeAdmin']),async(req,res)=>{

    await getUserDetails(req,res)

})



module.exports = {
    getUserRouter
}