const express = require("express");
const { userModel } = require("../../models/Usermodel"); // Adjust path based on your project structure
const { getUserDetails } = require("../../controllers/edituserController");
const { authMiddleware } = require("../../middleware/authMiddleware");
const userRouter = express.Router();

// Get all users
userRouter.get("/allusers",authMiddleware(['mainAdmin']), async (req, res) => {
  try {
    // Query all users
    const users = await userModel.find();  // This fetches all users from the database

    // If no users found, return a 404 error
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    // Return the found users
    res.status(200).json({ users });  // Sending the users in the response
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error while fetching users" });
  }
});

module.exports = {userRouter};


userRouter.get('/user', authMiddleware(["user","storeAdmin"]) ,async(req,res)=>{
   return await getUserDetails(req,res)
})