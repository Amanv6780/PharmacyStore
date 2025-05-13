const { userModel } = require("../models/Usermodel");

async function editUserController(req,res) {

    const userId = req.user.id
    try {
      const updates  = req.body;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
      }

      const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found." });
      }

      res
        .status(200)
        .json({ message: "User updated successfully.", user: updatedUser });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal server error." });
    }
    
}





const getUserDetails = async (req, res) => {
  const userId = req.user.id;

  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { editUserController,getUserDetails };

    
