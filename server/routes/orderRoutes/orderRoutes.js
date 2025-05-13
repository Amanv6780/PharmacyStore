const express = require("express");
const { authMiddleware } = require("../../middleware/authMiddleware");

const {
  getOrdersByUser,
 createOrder,
 deleteOneOrder,
 getOrderByStore,
 updateStatusController,
 discountController,
} = require("../../controllers/orderControllers");

const orderRouter = express.Router();

orderRouter.get("/getorders", authMiddleware(["user"]), async (req, res) => {
  await getOrdersByUser(req, res);
});


orderRouter.post("/createorder", authMiddleware(["user"]), async (req, res) => {
  await createOrder(req, res);
});


orderRouter.delete('/deleteone/:id',authMiddleware(["user"]),async(req,res)=>{
  await deleteOneOrder(req,res)
})

orderRouter.get("/getorderbystore", authMiddleware(["storeAdmin"]), async (req, res) => {
  await getOrderByStore(req,res)
});


orderRouter.put('/updatestatus/:id', authMiddleware(["storeAdmin"]),async(req,res)=>{
  await updateStatusController(req,res)
})


orderRouter.get('/checkdis',authMiddleware(['user']),async(req,res)=>{

  await discountController(req,res)

})

module.exports = {
  orderRouter,
};
