const express = require("express");
const { userModel } = require("../../models/Usermodel");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { updateUserController, forgotPasswordController } = require("../../controllers/userDataUpdateControllers");

const updateUserRouter = express.Router();

updateUserRouter.put(
  "/updateinfo",
  authMiddleware(["user", "storeAdmin"]),
  async (req, res) => {
    await updateUserController(req,res)
  }
);

updateUserRouter.put('/forgotpassword', async(req,res)=>{


  await forgotPasswordController(req,res)
})



module.exports = {
  updateUserRouter
}












