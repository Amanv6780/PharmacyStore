const  mongoose  = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productQuantity: {
    type: Number,
    default: 0,
  },
  CartQuantity:{
    type: Number,
    default : 1
  },
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "userModel",
  },
  price: {
    type: Number,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  rating: {
    type : Number,
    
  }
});

const productModel = mongoose.model("productModel", ProductSchema);

module.exports = {
  productModel,
};
