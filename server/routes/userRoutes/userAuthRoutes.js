const express = require("express");
const bcrypt = require('bcrypt')
const {
  createUser,
  checkUser,
} = require("../../controllers/userAuthControllers");
const { userModel } = require("../../models/Usermodel");

const userAuthRouter = express.Router();

userAuthRouter.post("/register", async (req, res) => {
  try {
    const userDetails = req.body;
    const { resp, role } = await createUser(userDetails);


    


    if (!resp) {
      return res.status(400).json({
        msg: "User already exists", // Clearer message for existing user
      });
    }
    console.log(role);
    return res.json({ resp, role: role }); // Send token and role in response
  } catch (e) {
    return res.status(500).json({ message: e.message || e });
  }
});

userAuthRouter.post("/signin", async (req, res) => {
  try {
    const userDetails = req.body;
    const { token, role } = await checkUser(userDetails);

    if (!token) {
      return res.status(400).json({
        msg: "Invalid username or password", // Clearer message for login failure
      });
    }

    return res.json({ resp: token, role }); // Send token and role in response
  } catch (e) {
    return res.status(500).json({ message: e.message || e });
  }
});












module.exports = { userAuthRouter };
