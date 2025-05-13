const mongoose = require("mongoose");

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/testproject1");
    console.log("db connected");
  } catch (e) {
    console.log("error connecting db");
  }
}

module.exports = { main };
