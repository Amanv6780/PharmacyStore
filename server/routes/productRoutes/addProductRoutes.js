// products can be added by store admins only
// products can be viewed by Higher Admin , and users

const express = require("express");
const { productModel } = require("../../models/ProductModel");
const { authMiddleware } = require("../../middleware/authMiddleware");
const productRouter = express.Router();

//todo - make it paginated
productRouter.get(
  "/getall",
  authMiddleware(["user", "mainAdmin", "storeAdmin"]),
  async (req, res) => {
    // return first num products from the response

    try {
      // const currProducts = await productModel.find({});
      const currProducts = await productModel.find({}).populate("storeId", "username");

      return res.status(200).json({
        currProducts,
      });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({
        message: e.message,
      });
    }
  }
);

productRouter.get(
  "/getbystore",
  authMiddleware(["storeAdmin"]),
  async (req, res) => {
    try {
      const currentProducts = await productModel.find({ storeId: req.user.id });

      return res.status(200).json({
        currentProducts,
      });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({
        message: e.message,
      });
    }
  }
);

// !! important need to add middleware here
productRouter.post("/add", authMiddleware(["storeAdmin"]), async (req, res) => {
  try {
    const productDetails = req.body;
    console.log(req.user);
    const response = await productModel.create({
      ...productDetails,
      storeId: req.user.id,
    });

    // generalise the response add function in controllers
    return res.json({
      id: response._id,
      productName: response.productName,
      msg: "created successfully",
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      msg: e.message,
    });
  }
});

/// needs fixing
productRouter.put(
  "/update",
  authMiddleware(["storeAdmin"]),
  async (req, res) => {
    try {
      const updatedProduct = req.body;
      const response = await productModel.updateOne(
        { _id: updatedProduct._id, storeId: req.user._id },
        { $set: updatedProduct }
      );

      // generalise the response add function in controllers
      return res.status(200).json({
        message: "product updated",
        id: response._id,
        productName: response.productName,
      });
    } catch (e) {
      return res.status(500).json({
        msg: e.message,
      });
    }
  }
);




productRouter.get('/:id', async (req, res) => {

  try {

    const id = req.params.id
    const currItem = await productModel.findById(id)
    return res.json(currItem)



  } catch (e) {
    return res.status(500).json({
      msg: e.message
    })
  }

})



productRouter.put('/updateproduct/:id',authMiddleware(['storeAdmin']),async (req, res) => {
  try {
    
    const currUpdate = req.body;
    const id = req.params.id
 


    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      currUpdate,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    return res.status(200).json(updatedProduct);

  } catch (e) {
    return res.status(500).json({
      msg: e.message
    });
  }
});




productRouter.delete('/deleteproduct/:id', authMiddleware(['storeAdmin']), async (req, res) => {
  try {
    const productId = req.params.id;


    const deletedProduct = await productModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = productRouter;






module.exports = {
  productRouter,
};
