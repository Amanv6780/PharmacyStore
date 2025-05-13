const express = require("express");
const putUserRouter = express.Router();

const { authMiddleware } = require("../../middleware/authMiddleware");

putUserRouter.put(
  "/",
  authMiddleware(["user", "storeAdmin"]),
  async (req, res) => {
    await editUserController(req, res);
  }
);

module.exports = { putUserRouter };
