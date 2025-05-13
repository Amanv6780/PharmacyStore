
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    Amount: {
      type: Number,
      required: true,
    },
    CartQuantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "productModel",
    },
    orderStatus: {
      type: String,
      enum: ["delivered", "notdelivered"],
      default: "notdelivered",
    },
    productQuantity: {
      type: Number,
      required: true,
    },
    orderedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "userModel",
    },
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "userModel",
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("OrderModel", OrderSchema);

module.exports = {
  OrderModel,
};
