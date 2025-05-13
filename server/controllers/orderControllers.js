const { productModel } = require("../models/ProductModel");

const { OrderModel } = require("../models/OrdersModel");

async function getOrdersByUser(req, res) {
  try {
    const orders = await OrderModel.find({ orderedBy: req.user.id });

    if (!orders) {
      return res.status(400).json({
        message: "empty",
      });
    } else {
      return res.status(200).json(orders);
    }
  } catch (e) {
    return res.status(500).json(e);
  }
}




async function getOrderByStore(req,res) {

  try{

    const orders = await OrderModel.find({storeId:req.user.id})

   res.status(200).json(orders)



  }catch(e){
    res.status(500).json({
      message : e.message
    })
  }
  
}







async function createOrder(req, res) {
  try {
    const orders = req.body;
    const userId = req.user.id;

    const errors = [];

    // Check each product's stock
    for (let item of orders) {
      const product = await productModel.findById(item._id);

      if (!product) {
        errors.push({
          productId: item._id,
          message: "Product not found."
        });
        continue;
      }

      if (item.CartQuantity > product.productQuantity) {
        errors.push({
          productId: item._id,
          productName: product.productName,
          message: `Only ${product.productQuantity} in stock, but ${item.CartQuantity} requested.`
        });
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Some items cannot be ordered due to stock issues.",
        errors
      });
    }

    // Prepare and insert orders
    const finalOrders = orders.map(({ _id, ...rest }) => ({
      ...rest,
      productId:_id,
      orderedBy: userId
    }));

    const savedOrders = await OrderModel.insertMany(finalOrders);

    // Reduce stock
    for (let item of orders) {
      await productModel.findByIdAndUpdate(item._id, {
        $inc: { productQuantity: -item.CartQuantity }
      });
    }

    res.status(200).json(savedOrders);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}


async function deleteOneOrder(req, res) {
  try {

    const order = await OrderModel.findOne({
      _id: req.params.id,
      orderedBy: req.user.id,
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    
    const product = await productModel.findById(order.productId); // assuming productId is stored in the order

    if (product) {
      product.productQuantity += order.CartQuantity;
      await product.save();
    }

    // Delete the order
    await OrderModel.deleteOne({ _id: req.params.id, orderedBy: req.user.id });

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Server error while deleting order" });
  }
}




async function updateStatusController(req, res) {
  try {
    const storeId = req.user.id;
    const orderId = req.params.id;

    // console.log(storeId);
    // console.log(orderId);

    const order = await OrderModel.findOneAndUpdate(
      { _id: orderId, storeId: storeId }, 
      { orderStatus: "delivered" }, 
      { new: true } 
    );

    if (!orderId) {
      return res
        .status(404)
        .json({ message: "Order not found or unauthorized" });
    }

    return res.status(200).json({ message: "Order status updated", orderId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}


const discountController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false });

    if (user.discount === 1) {
      user.discount = 0;
      await user.save();
      return res.json({ success: true });
    }

    res.json({ success: false });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};









module.exports = {
  getOrdersByUser,
  createOrder,
  deleteOneOrder,
  getOrderByStore,
  updateStatusController,
  discountController
};
