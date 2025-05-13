const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // consider making this unique too
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "storeAdmin", "mainAdmin"],
    required: true,
    default: "user",
  },
  verification: {
    type: String,
    enum: ["verified", "unverified"],
    default: "unverified",
  },
  securityQuestion: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    default: 1,
  },

  securityAnswer: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("userModel", userSchema);

module.exports = {
  userModel,
};
