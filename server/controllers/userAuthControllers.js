const { JWT_SECRET, SaltRounds } = require("../configs/Constants");
const { userModel } = require("../models/Usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



async function createUser(userDetails) {
  if (await verifyUser(userDetails)) {
    const hash = await bcrypt.hash(userDetails.password, SaltRounds
      
    );
    const currentUserDetails = {
      ...userDetails,
      password: hash,
    };
    const createdUser = await userModel.create(currentUserDetails);
    console.log(createdUser);
    return {resp : createJwt(createdUser.toObject()),role:createdUser.role};
  } else {
    console.log("User already exists");
    return { token: null, role: null }; 
  }
}

async function verifyUser(userDetails) {
  // Verify if the user already exists
  const existingUsers = await userModel.find({
    username: userDetails.username,
  });
  return existingUsers.length === 0; 
}

function createJwt(userDetails) {

  const currentDetails = {
    ...userDetails,
    id: userDetails._id
  }

  const token = jwt.sign(currentDetails, JWT_SECRET, { expiresIn: "1h" });
  return token ; // Return the token inside an object
}

async function checkUser(userDetails) {
  const user = await userModel.findOne({ username: userDetails.username, email: userDetails.email });

  if (!user) {
    console.log("User not found");
    return { token: null, role: null }; 
  }

  const result = await bcrypt.compare(userDetails.password, user.password);

  if (result) {
    const tkn = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET
    );
    return { token: tkn, role: user.role }; 
  } else {
    console.log("Incorrect password");
    return { token: null, role: null }; 
  }
}

module.exports = {
  createUser,
  checkUser,
};
