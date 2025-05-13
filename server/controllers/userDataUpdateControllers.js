const { SaltRounds } = require("../configs/Constants");
const { userModel } = require("../models/Usermodel");
const bcrypt = require('bcrypt')
async function updateUserController(req, res) {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ msg: "Unauthorized: No user ID found." });
    }

    const curUser = await userModel.findById(userId);
    if (!curUser) {
      return res.status(404).json({ msg: "User not found." });
    }

    const { username, email, firstName, lastName } = req.body;

    // Validate required fields
    if (
      !username?.trim() ||
      !email?.trim() ||
      !firstName?.trim() ||
      !lastName?.trim()
    ) {
      return res.status(400).json({
        msg: "All fields (username, email, firstName, lastName) are required.",
      });
    }

    const updateData = {
      username: username.trim(),
      email: email.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    };

    const response = await userModel.updateOne({ _id: userId }, updateData);

    return res.status(200).json({
      msg: "User updated successfully.",
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Server error: " + e.message,
    });
  }
}


async function forgotPasswordController(req, res) {
  try {
    const {username, securityAnswer,password, securityQuestion} = req.body

    
    const user = await userModel.findOne({ username, securityAnswer, securityQuestion });

  
    if (!user) {
      return res.status(400).json({
        msg: "User doesn't exist",
      });
    }

   
    const hashedPassword = await bcrypt.hash(password, SaltRounds);


    await userModel.updateOne({ username }, { password: hashedPassword });


    return res.status(200).json({
      msg: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
}


module.exports={
    updateUserController,
    forgotPasswordController
}